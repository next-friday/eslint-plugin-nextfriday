import { ESLintUtils, TSESTree, AST_NODE_TYPES } from "@typescript-eslint/utils";

const createRule = ESLintUtils.RuleCreator(
  (name) =>
    `https://github.com/next-friday/eslint-plugin-nextfriday/blob/main/docs/rules/${name.replaceAll("-", "_").toUpperCase()}.md`,
);

const noLogicInParams = createRule({
  name: "no-logic-in-params",
  meta: {
    type: "suggestion",
    docs: {
      description: "Disallow logic or conditions in function parameters - extract to a const variable first",
    },
    messages: {
      noLogicInParams:
        "Avoid logic or conditions in function parameters. Extract to a const variable first for better readability.",
    },
    schema: [],
  },
  defaultOptions: [],
  create(context) {
    const isComplexExpression = (node: TSESTree.Expression | TSESTree.SpreadElement): boolean => {
      if (node.type === AST_NODE_TYPES.SpreadElement) {
        return false;
      }

      if (node.type === AST_NODE_TYPES.ConditionalExpression) {
        return true;
      }

      if (node.type === AST_NODE_TYPES.LogicalExpression) {
        return true;
      }

      if (node.type === AST_NODE_TYPES.BinaryExpression) {
        const logicalOperators = ["==", "===", "!=", "!==", "<", ">", "<=", ">=", "in", "instanceof"];
        return logicalOperators.includes(node.operator);
      }

      if (node.type === AST_NODE_TYPES.UnaryExpression) {
        return node.operator === "!";
      }

      return false;
    };

    return {
      CallExpression(node) {
        node.arguments.forEach((arg) => {
          if (isComplexExpression(arg)) {
            context.report({
              node: arg,
              messageId: "noLogicInParams",
            });
          }
        });
      },
      NewExpression(node) {
        node.arguments.forEach((arg) => {
          if (isComplexExpression(arg)) {
            context.report({
              node: arg,
              messageId: "noLogicInParams",
            });
          }
        });
      },
    };
  },
});

export default noLogicInParams;
