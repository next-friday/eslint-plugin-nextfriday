import { AST_NODE_TYPES, ESLintUtils } from "@typescript-eslint/utils";

import { isJsxFile } from "../utils";

import type { TSESTree } from "@typescript-eslint/utils";

const createRule = ESLintUtils.RuleCreator(
  (name) =>
    `https://github.com/next-friday/eslint-plugin-nextfriday/blob/main/docs/rules/${name.replaceAll("-", "_").toUpperCase()}.md`,
);

const preferInterfaceForComponentProps = createRule({
  name: "prefer-interface-for-component-props",
  meta: {
    type: "suggestion",
    docs: {
      description:
        "Enforce 'interface' over 'type' alias for component prop declarations in component files (*.tsx, *.jsx)",
    },
    fixable: "code",
    schema: [],
    messages: {
      preferInterface: "Component props '{{ name }}' should use 'interface' instead of 'type' alias.",
    },
  },
  defaultOptions: [],
  create(context) {
    if (!isJsxFile(context.filename)) {
      return {};
    }

    return {
      TSTypeAliasDeclaration(node: TSESTree.TSTypeAliasDeclaration) {
        if (node.id.type !== AST_NODE_TYPES.Identifier) {
          return;
        }
        if (!node.id.name.endsWith("Props")) {
          return;
        }
        if (node.typeAnnotation.type !== AST_NODE_TYPES.TSTypeLiteral) {
          return;
        }

        const { name } = node.id;

        context.report({
          node: node.id,
          messageId: "preferInterface",
          data: { name },
          fix(fixer) {
            const { sourceCode } = context;
            const typeText = sourceCode.getText(node.typeAnnotation);
            const typeParamsText = node.typeParameters ? sourceCode.getText(node.typeParameters) : "";
            const newText = `interface ${name}${typeParamsText} ${typeText}`;

            const tokenAfter = sourceCode.getTokenAfter(node);
            if (tokenAfter && tokenAfter.value === ";") {
              return fixer.replaceTextRange([node.range[0], tokenAfter.range[1]], newText);
            }
            return fixer.replaceText(node, newText);
          },
        });
      },
    };
  },
});

export default preferInterfaceForComponentProps;
