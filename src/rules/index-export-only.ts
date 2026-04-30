import { AST_NODE_TYPES, ESLintUtils } from "@typescript-eslint/utils";

import { getBaseName } from "../utils";

import type { TSESTree } from "@typescript-eslint/utils";

const createRule = ESLintUtils.RuleCreator(
  (name) =>
    `https://github.com/next-friday/eslint-plugin-nextfriday/blob/main/docs/rules/${name.replaceAll("-", "_").toUpperCase()}.md`,
);

const isIndexFile = (filename: string): boolean => getBaseName(filename) === "index";

const isAllowedExportNamed = (node: TSESTree.ExportNamedDeclaration): boolean => {
  if (!node.declaration) {
    return true;
  }

  return (
    node.declaration.type === AST_NODE_TYPES.TSTypeAliasDeclaration ||
    node.declaration.type === AST_NODE_TYPES.TSInterfaceDeclaration
  );
};

const isAllowedExportDefault = (node: TSESTree.ExportDefaultDeclaration): boolean =>
  node.declaration.type === AST_NODE_TYPES.Identifier;

const isAllowedTopLevel = (node: TSESTree.ProgramStatement): boolean => {
  switch (node.type) {
    case AST_NODE_TYPES.ImportDeclaration:
    case AST_NODE_TYPES.ExportAllDeclaration:
    case AST_NODE_TYPES.TSTypeAliasDeclaration:
    case AST_NODE_TYPES.TSInterfaceDeclaration:
    case AST_NODE_TYPES.TSImportEqualsDeclaration:
      return true;
    case AST_NODE_TYPES.ExportNamedDeclaration:
      return isAllowedExportNamed(node);
    case AST_NODE_TYPES.ExportDefaultDeclaration:
      return isAllowedExportDefault(node);
    default:
      return false;
  }
};

const indexExportOnly = createRule({
  name: "index-export-only",
  meta: {
    type: "suggestion",
    docs: {
      description: "Restrict index files to imports, re-exports, and type declarations only.",
    },
    messages: {
      indexExportOnly:
        "Index files must contain only imports, re-exports, and type declarations. Move runtime code to a separate module and re-export it from here.",
    },
    schema: [],
  },
  defaultOptions: [],
  create(context) {
    if (!isIndexFile(context.filename)) {
      return {};
    }

    return {
      Program(node: TSESTree.Program) {
        for (const statement of node.body) {
          if (!isAllowedTopLevel(statement)) {
            context.report({
              node: statement,
              messageId: "indexExportOnly",
            });
          }
        }
      },
    };
  },
});

export default indexExportOnly;
