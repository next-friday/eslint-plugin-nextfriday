import { AST_NODE_TYPES, ESLintUtils } from "@typescript-eslint/utils";

import type { TSESTree } from "@typescript-eslint/utils";

const createRule = ESLintUtils.RuleCreator(
  (name) =>
    `https://github.com/next-friday/eslint-plugin-nextfriday/blob/main/docs/rules/${name.replaceAll("-", "_").toUpperCase()}.md`,
);

const isInlineTypeSpecifier = (specifier: TSESTree.ImportClause): specifier is TSESTree.ImportSpecifier =>
  specifier.type === AST_NODE_TYPES.ImportSpecifier && specifier.importKind === "type";

const noInlineTypeImport = createRule({
  name: "no-inline-type-import",
  meta: {
    type: "suggestion",
    docs: {
      description:
        "Disallow inline 'type' markers on import specifiers. Use 'import type' or split into a separate type-only import statement.",
    },
    fixable: "code",
    messages: {
      noInlineTypeImport:
        "Avoid inline 'type' markers on import specifiers. Hoist to 'import type' or split into a separate type-only import statement.",
    },
    schema: [],
  },
  defaultOptions: [],
  create(context) {
    return {
      ImportDeclaration(node: TSESTree.ImportDeclaration) {
        const inlineTypeSpecifiers = node.specifiers.filter(isInlineTypeSpecifier);

        if (inlineTypeSpecifiers.length === 0) {
          return;
        }

        context.report({
          node,
          messageId: "noInlineTypeImport",
          fix(fixer) {
            if (node.importKind === "type") {
              return inlineTypeSpecifiers.map((specifier) =>
                fixer.removeRange([specifier.range[0], specifier.imported.range[0]]),
              );
            }

            const sourceText = context.sourceCode.getText(node.source);
            const fileText = context.sourceCode.text;

            const typeSpecifierTexts = inlineTypeSpecifiers.map((specifier) =>
              fileText.slice(specifier.imported.range[0], specifier.range[1]),
            );
            const typeImport = `import type { ${typeSpecifierTexts.join(", ")} } from ${sourceText};`;

            const valueSpecifiers = node.specifiers.filter(
              (specifier) => !(specifier.type === AST_NODE_TYPES.ImportSpecifier && specifier.importKind === "type"),
            );

            if (valueSpecifiers.length === 0) {
              return fixer.replaceText(node, typeImport);
            }

            const parts: string[] = [];
            const namedValueSpecifiers: TSESTree.ImportSpecifier[] = [];

            for (const specifier of valueSpecifiers) {
              if (specifier.type === AST_NODE_TYPES.ImportDefaultSpecifier) {
                parts.push(specifier.local.name);
              } else if (specifier.type === AST_NODE_TYPES.ImportNamespaceSpecifier) {
                parts.push(`* as ${specifier.local.name}`);
              } else if (specifier.type === AST_NODE_TYPES.ImportSpecifier) {
                namedValueSpecifiers.push(specifier);
              }
            }

            if (namedValueSpecifiers.length > 0) {
              const namedTexts = namedValueSpecifiers.map((specifier) => context.sourceCode.getText(specifier));
              parts.push(`{ ${namedTexts.join(", ")} }`);
            }

            const valueImport = `import ${parts.join(", ")} from ${sourceText};`;
            return fixer.replaceText(node, `${valueImport}\n${typeImport}`);
          },
        });
      },
    };
  },
});

export default noInlineTypeImport;
