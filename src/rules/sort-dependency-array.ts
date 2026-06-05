import { AST_NODE_TYPES, ESLintUtils } from "@typescript-eslint/utils";

import type { TSESTree } from "@typescript-eslint/utils";

const createRule = ESLintUtils.RuleCreator(
  (name) =>
    `https://github.com/next-friday/eslint-plugin-nextfriday/blob/main/docs/rules/${name.replaceAll("-", "_").toUpperCase()}.md`,
);

const isHookName = (name: string): boolean => /^use[A-Z]/.test(name);

const sortDependencyArray = createRule({
  name: "sort-dependency-array",
  meta: {
    type: "suggestion",
    docs: {
      description: "Sort hook dependency arrays with non-callable dependencies first and callable dependencies last",
    },
    fixable: "code",
    schema: [],
    messages: {
      unsortedDependencyArray:
        "Hook dependency arrays should be sorted alphabetically with callable (function) dependencies last.",
    },
  },
  defaultOptions: [],
  create(context) {
    const services = ESLintUtils.getParserServices(context);
    const { sourceCode } = context;

    const isCallable = (node: TSESTree.Expression): boolean => {
      const type = services.getTypeAtLocation(node);
      return type.getCallSignatures().length > 0;
    };

    return {
      CallExpression(node: TSESTree.CallExpression) {
        if (node.callee.type !== AST_NODE_TYPES.Identifier || !isHookName(node.callee.name)) {
          return;
        }

        const lastArg = node.arguments[node.arguments.length - 1];

        if (!lastArg || lastArg.type !== AST_NODE_TYPES.ArrayExpression) {
          return;
        }

        const { elements } = lastArg;

        if (elements.length < 2) {
          return;
        }

        const sortable = elements.every(
          (element): element is TSESTree.Identifier | TSESTree.MemberExpression =>
            element !== null &&
            (element.type === AST_NODE_TYPES.Identifier || element.type === AST_NODE_TYPES.MemberExpression),
        );

        if (!sortable) {
          return;
        }

        const items = elements as (TSESTree.Identifier | TSESTree.MemberExpression)[];
        const decorated = items.map((element) => ({
          element,
          text: sourceCode.getText(element),
          callable: isCallable(element),
        }));

        const sorted = [...decorated].sort(
          (a, b) => Number(a.callable) - Number(b.callable) || a.text.localeCompare(b.text),
        );

        const isAlreadySorted = decorated.every((entry, index) => entry.element === sorted[index].element);

        if (isAlreadySorted) {
          return;
        }

        context.report({
          node: lastArg,
          messageId: "unsortedDependencyArray",
          fix(fixer) {
            return decorated.map((entry, index) => fixer.replaceText(entry.element, sorted[index].text));
          },
        });
      },
    };
  },
});

export default sortDependencyArray;
