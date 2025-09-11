import { AST_NODE_TYPES, ESLintUtils } from "@typescript-eslint/utils";

import type { TSESTree } from "@typescript-eslint/utils";

const createRule = ESLintUtils.RuleCreator(
  (name) =>
    `https://github.com/next-friday/eslint-plugin-nextfriday/blob/main/docs/rules/${name.replace(/-/g, "_").toUpperCase()}.md`,
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

      if (node.specifiers.length === 0) {
        return;
      }

      const source = node.source.value;
      const isRuntimeImport =
        /\.(css|scss|sass|less|styl)(\?.*)?$/.test(source) ||
        /\.(png|jpg|jpeg|gif|svg|webp|ico|bmp)(\?.*)?$/.test(source) ||
        /\.(woff|woff2|ttf|eot|otf)(\?.*)?$/.test(source) ||
        /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/.test(source) ||
        /\.(json|txt|md|xml|yml|yaml)(\?.*)?$/.test(source) ||
        /^next\/(font|image|link|head|script|dynamic|router)/.test(source) ||
        source.includes("/font/") ||
        source === "react-dom" ||
        source === "react-dom/client" ||
        source === "react-dom/server" ||
        source.startsWith("@emotion/") ||
        source.startsWith("styled-components") ||
        source.includes("polyfill") ||
        source.includes("shim") ||
        source === "styled-jsx/css" ||
        source.startsWith("webpack/");

      if (isRuntimeImport) {
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

          const isKnownTypeOnly =
            (node.source.value === "@typescript-eslint/utils" && ["TSESTree", "RuleContext"].includes(importedName)) ||
            (node.source.value === "react" &&
              ["Component", "ComponentProps", "ReactNode", "FC", "JSX", "ReactElement", "PropsWithChildren"].includes(
                importedName,
              )) ||
            importedName.endsWith("Type") ||
            importedName.endsWith("Interface") ||
            importedName.endsWith("Props");

          return isKnownTypeOnly;
        }
        return false;
      });

      if (isTypeOnlyImport) {
        context.report({
          node,
          messageId: "preferImportType",
          fix(fixer) {
            const sourceText = context.sourceCode.getText(node);
            const fixedSource = sourceText.replace(/^import\s+/, "import type ");
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
