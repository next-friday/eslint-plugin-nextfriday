import { AST_NODE_TYPES, ESLintUtils } from "@typescript-eslint/utils";

import type { TSESTree } from "@typescript-eslint/utils";

const createRule = ESLintUtils.RuleCreator(
  (name) =>
    `https://github.com/next-friday/eslint-plugin-nextfriday/blob/main/docs/rules/${name.replaceAll("-", "_").toUpperCase()}.md`,
);

const isTypeDeclaration = (node: TSESTree.Node): boolean =>
  node.type === AST_NODE_TYPES.TSInterfaceDeclaration || node.type === AST_NODE_TYPES.TSTypeAliasDeclaration;

const preferInlineTypeExport = createRule({
  name: "prefer-inline-type-export",
  meta: {
    type: "suggestion",
    docs: {
      description:
        "Require type and interface declarations to be exported inline rather than via a separate export statement",
    },
    fixable: "code",
    messages: {
      preferInlineExport: "Export '{{name}}' inline at its declaration instead of using a separate export statement.",
    },
    schema: [],
  },
  defaultOptions: [],
  create(context) {
    const typeDeclarations = new Map<string, TSESTree.Node>();

    function collectDeclaration(node: TSESTree.TSInterfaceDeclaration | TSESTree.TSTypeAliasDeclaration): void {
      if (node.parent.type !== AST_NODE_TYPES.ExportNamedDeclaration) {
        typeDeclarations.set(node.id.name, node);
      }
    }

    function reportSpecifier(
      specifier: TSESTree.ExportSpecifier,
      statement: TSESTree.ExportNamedDeclaration,
      declarationNode: TSESTree.Node,
    ): void {
      if (specifier.local.type !== AST_NODE_TYPES.Identifier) {
        return;
      }

      const { name } = specifier.local;

      context.report({
        node: specifier,
        messageId: "preferInlineExport",
        data: { name },
        fix(fixer) {
          const { sourceCode } = context;
          const declarationToken = sourceCode.getFirstToken(declarationNode);

          if (!declarationToken) {
            return null;
          }

          if (statement.specifiers.length === 1) {
            const nextToken = sourceCode.getTokenAfter(statement);
            const end = nextToken ? nextToken.range[0] : statement.range[1];

            return [fixer.insertTextBefore(declarationToken, "export "), fixer.removeRange([statement.range[0], end])];
          }

          const tokenBefore = sourceCode.getTokenBefore(specifier);
          const tokenAfter = sourceCode.getTokenAfter(specifier);

          if (!tokenBefore || !tokenAfter) {
            return null;
          }

          const isLastSpecifier = statement.specifiers.at(-1) === specifier;

          const removalRange: TSESTree.Range =
            isLastSpecifier && tokenBefore.value === ","
              ? [tokenBefore.range[0], specifier.range[1]]
              : [specifier.range[0], tokenAfter.range[1]];

          return [fixer.insertTextBefore(declarationToken, "export "), fixer.removeRange(removalRange)];
        },
      });
    }

    return {
      Program(node) {
        node.body.forEach((statement) => {
          if (
            statement.type === AST_NODE_TYPES.TSInterfaceDeclaration ||
            statement.type === AST_NODE_TYPES.TSTypeAliasDeclaration
          ) {
            collectDeclaration(statement);
          }
        });

        node.body.forEach((statement) => {
          if (statement.type !== AST_NODE_TYPES.ExportNamedDeclaration || statement.declaration !== null) {
            return;
          }

          statement.specifiers.forEach((specifier) => {
            if (specifier.local.type !== AST_NODE_TYPES.Identifier) {
              return;
            }

            const declarationNode = typeDeclarations.get(specifier.local.name);

            if (!declarationNode || !isTypeDeclaration(declarationNode)) {
              return;
            }

            reportSpecifier(specifier, statement, declarationNode);
          });
        });
      },
    };
  },
});

export default preferInlineTypeExport;
