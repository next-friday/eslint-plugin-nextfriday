import { AST_NODE_TYPES, ESLintUtils } from "@typescript-eslint/utils";

const createRule = ESLintUtils.RuleCreator(
  (name) =>
    `https://github.com/next-friday/eslint-plugin-nextfriday/blob/main/docs/rules/${name.replaceAll("-", "_").toUpperCase()}.md`,
);

const noNestedInterfaceDeclaration = createRule({
  name: "no-nested-interface-declaration",
  meta: {
    type: "suggestion",
    docs: {
      description: "Disallow inline object type literals in interface or type properties",
    },
    fixable: undefined,
    schema: [],
    messages: {
      noNestedInterface: "Extract nested object type into a separate interface or type declaration",
    },
  },
  defaultOptions: [],
  create(context) {
    return {
      TSPropertySignature(node) {
        if (!node.typeAnnotation) {
          return;
        }

        const { typeAnnotation } = node.typeAnnotation;

        if (typeAnnotation.type === AST_NODE_TYPES.TSTypeLiteral) {
          context.report({
            node: typeAnnotation,
            messageId: "noNestedInterface",
          });

          return;
        }

        if (typeAnnotation.type === AST_NODE_TYPES.TSArrayType) {
          if (typeAnnotation.elementType.type === AST_NODE_TYPES.TSTypeLiteral) {
            context.report({
              node: typeAnnotation.elementType,
              messageId: "noNestedInterface",
            });
          }

          return;
        }

        if (typeAnnotation.type === AST_NODE_TYPES.TSTypeReference && typeAnnotation.typeArguments) {
          typeAnnotation.typeArguments.params.forEach((param) => {
            if (param.type === AST_NODE_TYPES.TSTypeLiteral) {
              context.report({
                node: param,
                messageId: "noNestedInterface",
              });
            }
          });
        }
      },
    };
  },
});

export default noNestedInterfaceDeclaration;
