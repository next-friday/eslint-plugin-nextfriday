import { ESLintUtils, TSESTree, AST_NODE_TYPES } from "@typescript-eslint/utils";

const createRule = ESLintUtils.RuleCreator(
  (name) =>
    `https://github.com/next-friday/eslint-plugin-nextfriday/blob/main/docs/rules/${name.replaceAll("-", "_").toUpperCase()}.md`,
);

const noComplexInlineReturn = createRule({
  name: "no-complex-inline-return",
  meta: {
    type: "suggestion",
    docs: {
      description: "Disallow complex inline expressions in return statements - prefer extracting to a const first",
    },
    messages: {
      noComplexInlineReturn:
        "Avoid returning complex expressions directly. Extract to a const variable first for better readability.",
    },
    schema: [],
  },
  defaultOptions: [],
  create(context) {
    const isComplexExpression = (node: TSESTree.Expression | null | undefined): boolean => {
      if (!node) return false;

      if (node.type === AST_NODE_TYPES.ConditionalExpression) {
        return true;
      }

      if (node.type === AST_NODE_TYPES.LogicalExpression) {
        return true;
      }

      if (node.type === AST_NODE_TYPES.NewExpression) {
        return true;
      }

      return false;
    };

    return {
      ReturnStatement(node) {
        if (node.argument && isComplexExpression(node.argument)) {
          context.report({
            node: node.argument,
            messageId: "noComplexInlineReturn",
          });
        }
      },
    };
  },
});

export default noComplexInlineReturn;
