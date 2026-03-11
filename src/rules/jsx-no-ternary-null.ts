import { AST_NODE_TYPES, ESLintUtils } from "@typescript-eslint/utils";

import type { TSESTree } from "@typescript-eslint/utils";

const createRule = ESLintUtils.RuleCreator(
  (name) =>
    `https://github.com/next-friday/eslint-plugin-nextfriday/blob/main/docs/rules/${name.replaceAll("-", "_").toUpperCase()}.md`,
);

function isNullOrUndefined(node: TSESTree.Node): boolean {
  if (node.type === AST_NODE_TYPES.Literal && node.value === null) {
    return true;
  }

  if (node.type === AST_NODE_TYPES.Identifier && node.name === "undefined") {
    return true;
  }

  return false;
}

const jsxNoTernaryNull = createRule({
  name: "jsx-no-ternary-null",
  meta: {
    type: "suggestion",
    docs: {
      description: "Enforce logical AND over ternary with null/undefined in JSX expressions",
    },
    fixable: "code",
    schema: [],
    messages: {
      preferLogicalAnd: "Use logical AND (&&) instead of ternary with null/undefined",
    },
  },
  defaultOptions: [],
  create(context) {
    return {
      JSXExpressionContainer(node: TSESTree.JSXExpressionContainer) {
        const { expression } = node;

        if (expression.type !== AST_NODE_TYPES.ConditionalExpression) {
          return;
        }

        const { test, consequent, alternate } = expression;

        if (isNullOrUndefined(alternate)) {
          const testText = context.sourceCode.getText(test);
          const consequentText = context.sourceCode.getText(consequent);

          context.report({
            node: expression,
            messageId: "preferLogicalAnd",
            fix(fixer) {
              return fixer.replaceText(expression, `${testText} && (${consequentText})`);
            },
          });
        } else if (isNullOrUndefined(consequent)) {
          const testText = context.sourceCode.getText(test);
          const alternateText = context.sourceCode.getText(alternate);

          context.report({
            node: expression,
            messageId: "preferLogicalAnd",
            fix(fixer) {
              return fixer.replaceText(expression, `!${testText} && (${alternateText})`);
            },
          });
        }
      },
    };
  },
});

export default jsxNoTernaryNull;
