import { ESLintUtils, AST_NODE_TYPES } from "@typescript-eslint/utils";

const createRule = ESLintUtils.RuleCreator(
  (name) =>
    `https://github.com/next-friday/eslint-plugin-nextfriday/blob/main/docs/rules/${name.replaceAll("-", "_").toUpperCase()}.md`,
);

const preferAsyncAwait = createRule({
  name: "prefer-async-await",
  meta: {
    type: "suggestion",
    docs: {
      description: "Enforce async/await over .then() promise chains for better readability and error handling",
    },
    messages: {
      preferAsyncAwait:
        "Prefer async/await over .then() chains. Async/await is more readable and provides better error handling with try/catch.",
    },
    schema: [],
  },
  defaultOptions: [],
  create(context) {
    return {
      CallExpression(node) {
        if (
          node.callee.type === AST_NODE_TYPES.MemberExpression &&
          node.callee.property.type === AST_NODE_TYPES.Identifier &&
          node.callee.property.name === "then"
        ) {
          context.report({
            node: node.callee.property,
            messageId: "preferAsyncAwait",
          });
        }
      },
    };
  },
});

export default preferAsyncAwait;
