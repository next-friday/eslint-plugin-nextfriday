import { ESLintUtils, AST_NODE_TYPES } from "@typescript-eslint/utils";

const createRule = ESLintUtils.RuleCreator(
  (name) =>
    `https://github.com/next-friday/eslint-plugin-nextfriday/blob/main/docs/rules/${name.replaceAll("-", "_").toUpperCase()}.md`,
);

const noNestedTernary = createRule({
  name: "no-nested-ternary",
  meta: {
    type: "suggestion",
    docs: {
      description: "Disallow nested ternary expressions",
    },
    messages: {
      noNestedTernary: "Nested ternary expressions are not allowed. Use a function with early returns instead.",
    },
    schema: [],
  },
  defaultOptions: [],
  create(context) {
    return {
      ConditionalExpression(node) {
        const { consequent, alternate } = node;

        if (consequent.type === AST_NODE_TYPES.ConditionalExpression) {
          context.report({
            node: consequent,
            messageId: "noNestedTernary",
          });
        }

        if (alternate.type === AST_NODE_TYPES.ConditionalExpression) {
          context.report({
            node: alternate,
            messageId: "noNestedTernary",
          });
        }
      },
    };
  },
});

export default noNestedTernary;
