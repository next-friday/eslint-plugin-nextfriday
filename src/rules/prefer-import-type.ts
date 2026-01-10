import { AST_NODE_TYPES, ESLintUtils } from "@typescript-eslint/utils";

import type { TSESTree } from "@typescript-eslint/utils";

const createRule = ESLintUtils.RuleCreator(
  (name) =>
    `https://github.com/next-friday/eslint-plugin-nextfriday/blob/main/docs/rules/${name.replaceAll("-", "_").toUpperCase()}.md`,
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
    function isInTypeContext(node: TSESTree.Node | undefined): boolean {
      let current = node;
      while (current) {
        switch (current.type) {
          case AST_NODE_TYPES.TSTypeReference:
          case AST_NODE_TYPES.TSTypeAnnotation:
          case AST_NODE_TYPES.TSTypeParameterInstantiation:
          case AST_NODE_TYPES.TSInterfaceHeritage:
          case AST_NODE_TYPES.TSClassImplements:
          case AST_NODE_TYPES.TSTypeQuery:
          case AST_NODE_TYPES.TSTypeAssertion:
          case AST_NODE_TYPES.TSAsExpression:
          case AST_NODE_TYPES.TSSatisfiesExpression:
          case AST_NODE_TYPES.TSTypeAliasDeclaration:
          case AST_NODE_TYPES.TSInterfaceDeclaration:
          case AST_NODE_TYPES.TSTypeParameter:
          case AST_NODE_TYPES.TSQualifiedName:
            return true;

          case AST_NODE_TYPES.MemberExpression:
          case AST_NODE_TYPES.Identifier:
            current = current.parent;
            break;

          default:
            return false;
        }
      }
      return false;
    }

    function isUsedAsValue(localName: string, scope: ReturnType<typeof context.sourceCode.getScope>): boolean {
      const variable = scope.set.get(localName);
      if (!variable) {
        return false;
      }

      if (variable.references.length === 0) {
        return false;
      }

      return variable.references.some((ref) => {
        if (ref.isWrite()) {
          return false;
        }

        const { identifier } = ref;
        const { parent } = identifier;

        if (!parent) {
          return false;
        }

        if (isInTypeContext(parent)) {
          return false;
        }

        switch (parent.type) {
          case AST_NODE_TYPES.CallExpression:
          case AST_NODE_TYPES.NewExpression:
          case AST_NODE_TYPES.JSXOpeningElement:
          case AST_NODE_TYPES.JSXClosingElement:
          case AST_NODE_TYPES.MemberExpression:
          case AST_NODE_TYPES.VariableDeclarator:
          case AST_NODE_TYPES.TaggedTemplateExpression:
          case AST_NODE_TYPES.SpreadElement:
          case AST_NODE_TYPES.ExportSpecifier:
          case AST_NODE_TYPES.ArrayExpression:
          case AST_NODE_TYPES.ObjectExpression:
          case AST_NODE_TYPES.BinaryExpression:
          case AST_NODE_TYPES.LogicalExpression:
          case AST_NODE_TYPES.UnaryExpression:
          case AST_NODE_TYPES.ReturnStatement:
          case AST_NODE_TYPES.ArrowFunctionExpression:
          case AST_NODE_TYPES.ConditionalExpression:
          case AST_NODE_TYPES.AwaitExpression:
          case AST_NODE_TYPES.YieldExpression:
          case AST_NODE_TYPES.Property:
            return true;

          default:
            return false;
        }
      });
    }

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

      const scope = context.sourceCode.getScope(node);

      const isTypeOnlyImport = node.specifiers.every((specifier) => {
        if (specifier.type === AST_NODE_TYPES.ImportDefaultSpecifier) {
          return false;
        }
        if (specifier.type === AST_NODE_TYPES.ImportNamespaceSpecifier) {
          return false;
        }
        if (specifier.type === AST_NODE_TYPES.ImportSpecifier) {
          const localName = specifier.local.name;
          return !isUsedAsValue(localName, scope);
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
