import { ESLintUtils, TSESTree, AST_NODE_TYPES } from "@typescript-eslint/utils";

const createRule = ESLintUtils.RuleCreator(
  (name) =>
    `https://github.com/next-friday/eslint-plugin-nextfriday/blob/main/docs/rules/${name.replaceAll("-", "_").toUpperCase()}.md`,
);

const noRelativeImports = createRule({
  name: "no-relative-imports",
  meta: {
    type: "suggestion",
    docs: {
      description: "Disallow relative imports with parent directory traversal (../) - use absolute imports instead",
    },
    messages: {
      noRelativeImport:
        "Avoid relative imports with '../'. Use absolute imports (e.g., 'src/components/...') for better maintainability.",
    },
    schema: [],
  },
  defaultOptions: [],
  create(context) {
    const checkImportPath = (source: string, node: TSESTree.Node): void => {
      if (source.startsWith("../")) {
        context.report({
          node,
          messageId: "noRelativeImport",
        });
      }
    };

    return {
      ImportDeclaration(node) {
        if (node.source.type === AST_NODE_TYPES.Literal && typeof node.source.value === "string") {
          checkImportPath(node.source.value, node);
        }
      },
      ImportExpression(node) {
        if (node.source.type === AST_NODE_TYPES.Literal && typeof node.source.value === "string") {
          checkImportPath(node.source.value, node);
        }
      },
      ExportNamedDeclaration(node) {
        if (node.source?.type === AST_NODE_TYPES.Literal && typeof node.source.value === "string") {
          checkImportPath(node.source.value, node);
        }
      },
      ExportAllDeclaration(node) {
        if (node.source.type === AST_NODE_TYPES.Literal && typeof node.source.value === "string") {
          checkImportPath(node.source.value, node);
        }
      },
    };
  },
});

export default noRelativeImports;
