import { AST_NODE_TYPES, ESLintUtils } from "@typescript-eslint/utils";

import type { TSESTree } from "@typescript-eslint/utils";

const createRule = ESLintUtils.RuleCreator(
  (name) =>
    `https://github.com/next-friday/eslint-plugin-nextfriday/blob/main/docs/rules/${name.replaceAll("-", "_").toUpperCase()}.md`,
);

function isLiteralUnionType(node: TSESTree.TypeNode): boolean {
  if (node.type !== AST_NODE_TYPES.TSUnionType) {
    return false;
  }

  return node.types.every(
    (member) =>
      member.type === AST_NODE_TYPES.TSLiteralType ||
      member.type === AST_NODE_TYPES.TSNullKeyword ||
      member.type === AST_NODE_TYPES.TSUndefinedKeyword,
  );
}

const preferInlineLiteralUnion = createRule({
  name: "prefer-inline-literal-union",
  meta: {
    type: "suggestion",
    docs: {
      description:
        "Enforce inlining literal union types in interface properties instead of using type aliases for better IDE hover information",
    },
    fixable: "code",
    schema: [],
    messages: {
      inlineLiteralUnion:
        "Inline the literal union type instead of using a type alias for better IDE hover information",
    },
  },
  defaultOptions: [],
  create(context) {
    const literalUnionAliases = new Map<string, TSESTree.TSTypeAliasDeclaration>();

    return {
      TSTypeAliasDeclaration(node) {
        if (isLiteralUnionType(node.typeAnnotation)) {
          literalUnionAliases.set(node.id.name, node);
        }
      },

      TSPropertySignature(node) {
        if (!node.typeAnnotation) {
          return;
        }

        const { typeAnnotation } = node.typeAnnotation;

        if (typeAnnotation.type !== AST_NODE_TYPES.TSTypeReference) {
          return;
        }

        if (typeAnnotation.typeName.type !== AST_NODE_TYPES.Identifier) {
          return;
        }

        const aliasName = typeAnnotation.typeName.name;
        const aliasDeclaration = literalUnionAliases.get(aliasName);

        if (!aliasDeclaration) {
          return;
        }

        const { sourceCode } = context;
        const unionText = sourceCode.getText(aliasDeclaration.typeAnnotation);

        context.report({
          node: typeAnnotation,
          messageId: "inlineLiteralUnion",
          fix(fixer) {
            return fixer.replaceText(typeAnnotation, unionText);
          },
        });
      },
    };
  },
});

export default preferInlineLiteralUnion;
