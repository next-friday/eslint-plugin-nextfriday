import { AST_NODE_TYPES, ESLintUtils } from "@typescript-eslint/utils";

import type { TSESTree } from "@typescript-eslint/utils";

const createRule = ESLintUtils.RuleCreator(
  (name) =>
    `https://github.com/next-friday/eslint-plugin-nextfriday/blob/main/docs/rules/${name.replaceAll("-", "_").toUpperCase()}.md`,
);

function getTypeDeclarationName(node: TSESTree.Node): { name: string; position: number } | null {
  if (node.type === AST_NODE_TYPES.TSInterfaceDeclaration && node.id.type === AST_NODE_TYPES.Identifier) {
    return { name: node.id.name, position: node.range[0] };
  }

  if (node.type === AST_NODE_TYPES.TSTypeAliasDeclaration && node.id.type === AST_NODE_TYPES.Identifier) {
    return { name: node.id.name, position: node.range[0] };
  }

  return null;
}

const enforceTypeDeclarationOrder = createRule({
  name: "enforce-type-declaration-order",
  meta: {
    type: "suggestion",
    docs: {
      description: "Enforce that referenced types and interfaces are declared after the type that uses them",
    },
    fixable: undefined,
    schema: [],
    messages: {
      dependencyBeforeConsumer: "'{{dependency}}' should be declared after '{{consumer}}' which references it",
    },
  },
  defaultOptions: [],
  create(context) {
    const typeDeclarations = new Map<string, number>();
    const reported = new Set<string>();

    return {
      TSInterfaceDeclaration(node) {
        const info = getTypeDeclarationName(node);

        if (info) {
          typeDeclarations.set(info.name, info.position);
        }
      },

      TSTypeAliasDeclaration(node) {
        const info = getTypeDeclarationName(node);

        if (info) {
          typeDeclarations.set(info.name, info.position);
        }
      },

      "TSPropertySignature TSTypeReference": function checkTypeReference(node: TSESTree.TSTypeReference) {
        if (node.typeName.type !== AST_NODE_TYPES.Identifier) {
          return;
        }

        const referencedName = node.typeName.name;
        const referencedPosition = typeDeclarations.get(referencedName);

        if (referencedPosition === undefined) {
          return;
        }

        let current: TSESTree.Node | undefined = node.parent;

        while (current) {
          const consumerInfo = getTypeDeclarationName(current);

          if (consumerInfo) {
            if (referencedPosition < consumerInfo.position) {
              const reportKey = `${referencedName}-${consumerInfo.name}`;

              if (!reported.has(reportKey)) {
                reported.add(reportKey);
                context.report({
                  node: node.typeName,
                  messageId: "dependencyBeforeConsumer",
                  data: {
                    dependency: referencedName,
                    consumer: consumerInfo.name,
                  },
                });
              }
            }

            break;
          }

          current = current.parent;
        }
      },
    };
  },
});

export default enforceTypeDeclarationOrder;
