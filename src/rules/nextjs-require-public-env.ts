import { ESLintUtils, AST_NODE_TYPES } from "@typescript-eslint/utils";

const createRule = ESLintUtils.RuleCreator(
  (name) =>
    `https://github.com/next-friday/eslint-plugin-nextfriday/blob/main/docs/rules/${name.replaceAll("-", "_").toUpperCase()}.md`,
);

const nextjsRequirePublicEnv = createRule({
  name: "nextjs-require-public-env",
  meta: {
    type: "problem",
    docs: {
      description: "Require NEXT_PUBLIC_ prefix for environment variables in client components",
    },
    messages: {
      requirePublicPrefix:
        "Environment variable '{{ name }}' must use NEXT_PUBLIC_ prefix in client components. Use 'NEXT_PUBLIC_{{ name }}' instead.",
    },
    schema: [],
  },
  defaultOptions: [],
  create(context) {
    let isClientComponent = false;

    return {
      Program(node) {
        const firstStatement = node.body[0];

        if (
          firstStatement?.type === AST_NODE_TYPES.ExpressionStatement &&
          firstStatement.expression.type === AST_NODE_TYPES.Literal &&
          firstStatement.expression.value === "use client"
        ) {
          isClientComponent = true;
        }
      },
      MemberExpression(node) {
        if (!isClientComponent) {
          return;
        }

        if (
          node.object.type === AST_NODE_TYPES.MemberExpression &&
          node.object.object.type === AST_NODE_TYPES.Identifier &&
          node.object.object.name === "process" &&
          node.object.property.type === AST_NODE_TYPES.Identifier &&
          node.object.property.name === "env" &&
          node.property.type === AST_NODE_TYPES.Identifier
        ) {
          const envVarName = node.property.name;

          if (!envVarName.startsWith("NEXT_PUBLIC_") && envVarName !== "NODE_ENV") {
            context.report({
              node: node.property,
              messageId: "requirePublicPrefix",
              data: {
                name: envVarName,
              },
            });
          }
        }
      },
    };
  },
});

export default nextjsRequirePublicEnv;
