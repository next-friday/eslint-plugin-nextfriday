import { AST_NODE_TYPES, ESLintUtils } from "@typescript-eslint/utils";

import type { TSESTree } from "@typescript-eslint/utils";

const createRule = ESLintUtils.RuleCreator(
  (name) => `https://github.com/next-friday/eslint-plugin-nextfriday/blob/main/docs/rules/${name}.md`,
);

const preferImportType = createRule({
  name: "prefer-import-type",
  meta: {
    type: "suggestion",
    docs: {
      description: "Enforce using 'import type' for type-only imports",
    },
    fixable: "code",
    schema: [],
    messages: {
      preferImportType: "Use 'import type' for type-only imports",
    },
  },
  defaultOptions: [],
  create(context) {
    function checkImportDeclaration(node: TSESTree.ImportDeclaration) {
      if (node.importKind === "type") {
        return;
      }

      if (
        context.filename.includes(".test.") ||
        context.filename.includes(".spec.") ||
        context.filename.includes("__tests__")
      ) {
        return;
      }

      const isTypeOnlyImport = node.specifiers.every((specifier) => {
        if (specifier.type === AST_NODE_TYPES.ImportDefaultSpecifier) {
          return false;
        }
        if (specifier.type === AST_NODE_TYPES.ImportNamespaceSpecifier) {
          return false;
        }
        if (specifier.type === AST_NODE_TYPES.ImportSpecifier) {
          const importedName =
            specifier.imported.type === AST_NODE_TYPES.Identifier ? specifier.imported.name : specifier.imported.value;
          return (
            importedName[0] === importedName[0].toUpperCase() && !["ESLintUtils", "RuleTester"].includes(importedName)
          );
        }
        return false;
      });

      if (isTypeOnlyImport) {
        context.report({
          node,
          messageId: "preferImportType",
          fix(fixer) {
            const source = context.sourceCode.getText(node);
            const fixedSource = source.replace(/^import\s+/, "import type ");
            return fixer.replaceText(node, fixedSource);
          },
        });
      }
    }

    return {
      ImportDeclaration: checkImportDeclaration,
    };
  },
});

export default preferImportType;
