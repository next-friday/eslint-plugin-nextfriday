import { ESLintUtils, AST_NODE_TYPES, type TSESTree } from "@typescript-eslint/utils";

const createRule = ESLintUtils.RuleCreator(
  (name) =>
    `https://github.com/next-friday/eslint-plugin-nextfriday/blob/main/docs/rules/${name.replaceAll("-", "_").toUpperCase()}.md`,
);

const noInlineDefaultExport = createRule({
  name: "no-inline-default-export",
  meta: {
    type: "suggestion",
    docs: {
      description: "Disallow inline default exports. Prefer declaring first, then exporting separately.",
    },
    messages: {
      noInlineDefaultExport:
        "Avoid inline default export. Declare the {{type}} first, then export it separately: `export default {{name}};`",
      noAnonymousDefaultExport:
        "Avoid anonymous default export. Declare a named {{type}} first, then export it separately.",
    },
    schema: [],
  },
  defaultOptions: [],
  create(context) {
    return {
      ExportDefaultDeclaration(node: TSESTree.ExportDefaultDeclaration) {
        const { declaration } = node;

        if (declaration.type === AST_NODE_TYPES.FunctionDeclaration) {
          if (declaration.id) {
            context.report({
              node,
              messageId: "noInlineDefaultExport",
              data: { type: "function", name: declaration.id.name },
            });
          } else {
            context.report({
              node,
              messageId: "noAnonymousDefaultExport",
              data: { type: "function" },
            });
          }
        }

        if (declaration.type === AST_NODE_TYPES.ClassDeclaration) {
          if (declaration.id) {
            context.report({
              node,
              messageId: "noInlineDefaultExport",
              data: { type: "class", name: declaration.id.name },
            });
          } else {
            context.report({
              node,
              messageId: "noAnonymousDefaultExport",
              data: { type: "class" },
            });
          }
        }

        if (
          declaration.type === AST_NODE_TYPES.ArrowFunctionExpression ||
          declaration.type === AST_NODE_TYPES.FunctionExpression
        ) {
          context.report({
            node,
            messageId: "noAnonymousDefaultExport",
            data: { type: "function" },
          });
        }
      },
    };
  },
});

export default noInlineDefaultExport;
