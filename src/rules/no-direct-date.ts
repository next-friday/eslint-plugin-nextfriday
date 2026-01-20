import { ESLintUtils, AST_NODE_TYPES } from "@typescript-eslint/utils";

const createRule = ESLintUtils.RuleCreator(
  (name) =>
    `https://github.com/next-friday/eslint-plugin-nextfriday/blob/main/docs/rules/${name.replaceAll("-", "_").toUpperCase()}.md`,
);

const noDirectDate = createRule({
  name: "no-direct-date",
  meta: {
    type: "problem",
    docs: {
      description: "Disallow direct usage of Date constructor and methods to enforce centralized date utilities",
    },
    messages: {
      noNewDate: "Avoid using 'new Date()'. Use a centralized date utility like dayjs instead.",
      noDateNow: "Avoid using 'Date.now()'. Use a centralized date utility like dayjs instead.",
      noDateParse: "Avoid using 'Date.parse()'. Use a centralized date utility like dayjs instead.",
    },
    schema: [],
  },
  defaultOptions: [],
  create(context) {
    return {
      NewExpression(node) {
        if (node.callee.type === AST_NODE_TYPES.Identifier && node.callee.name === "Date") {
          context.report({
            node,
            messageId: "noNewDate",
          });
        }
      },
      CallExpression(node) {
        if (
          node.callee.type === AST_NODE_TYPES.MemberExpression &&
          node.callee.object.type === AST_NODE_TYPES.Identifier &&
          node.callee.object.name === "Date" &&
          node.callee.property.type === AST_NODE_TYPES.Identifier
        ) {
          const methodName = node.callee.property.name;

          if (methodName === "now") {
            context.report({
              node,
              messageId: "noDateNow",
            });
          }

          if (methodName === "parse") {
            context.report({
              node,
              messageId: "noDateParse",
            });
          }
        }
      },
    };
  },
});

export default noDirectDate;
