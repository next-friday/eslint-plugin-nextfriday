import { ESLintUtils, TSESTree, AST_NODE_TYPES } from "@typescript-eslint/utils";

const createRule = ESLintUtils.RuleCreator(
  (name) =>
    `https://github.com/next-friday/eslint-plugin-nextfriday/blob/main/docs/rules/${name.replaceAll("-", "_").toUpperCase()}.md`,
);

const noEnvFallback = createRule({
  name: "no-env-fallback",
  meta: {
    type: "problem",
    docs: {
      description: "Disallow fallback values for environment variables as they can be dangerous in production",
    },
    messages: {
      noEnvFallback:
        "Avoid using fallback values with process.env. Environment variables should fail explicitly when missing rather than silently using a default value.",
    },
    schema: [],
  },
  defaultOptions: [],
  create(context) {
    const isProcessEnvAccess = (node: TSESTree.Node): boolean => {
      if (node.type !== AST_NODE_TYPES.MemberExpression) {
        return false;
      }

      const { object } = node;
      if (object.type !== AST_NODE_TYPES.MemberExpression) {
        return false;
      }

      const processNode = object.object;
      const envNode = object.property;

      return (
        processNode.type === AST_NODE_TYPES.Identifier &&
        processNode.name === "process" &&
        envNode.type === AST_NODE_TYPES.Identifier &&
        envNode.name === "env"
      );
    };

    return {
      LogicalExpression(node) {
        if ((node.operator === "||" || node.operator === "??") && isProcessEnvAccess(node.left)) {
          context.report({
            node,
            messageId: "noEnvFallback",
          });
        }
      },
      ConditionalExpression(node) {
        if (isProcessEnvAccess(node.test)) {
          context.report({
            node,
            messageId: "noEnvFallback",
          });
        }
      },
    };
  },
});

export default noEnvFallback;
