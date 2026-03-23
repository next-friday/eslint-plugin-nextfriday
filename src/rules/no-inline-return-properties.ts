import { AST_NODE_TYPES, ESLintUtils } from "@typescript-eslint/utils";

import type { TSESTree } from "@typescript-eslint/utils";

const createRule = ESLintUtils.RuleCreator(
  (name) =>
    `https://github.com/next-friday/eslint-plugin-nextfriday/blob/main/docs/rules/${name.replaceAll("-", "_").toUpperCase()}.md`,
);

const isShorthandProperty = (property: TSESTree.ObjectLiteralElement): boolean => {
  if (property.type === AST_NODE_TYPES.SpreadElement) {
    return true;
  }

  if (property.type !== AST_NODE_TYPES.Property) {
    return false;
  }

  return property.shorthand;
};

const noInlineReturnProperties = createRule({
  name: "no-inline-return-properties",
  meta: {
    type: "suggestion",
    docs: {
      description:
        "Require return object properties to use shorthand notation by extracting non-shorthand values to const variables",
    },
    messages: {
      noInlineProperty:
        "Property '{{ name }}' should use shorthand notation. Extract the value to a const variable before the return statement.",
    },
    schema: [],
  },
  defaultOptions: [],
  create(context) {
    return {
      ReturnStatement(node) {
        if (!node.argument || node.argument.type !== AST_NODE_TYPES.ObjectExpression) {
          return;
        }

        node.argument.properties.forEach((property) => {
          if (isShorthandProperty(property)) {
            return;
          }

          if (property.type !== AST_NODE_TYPES.Property) {
            return;
          }

          let keyName: string | null = null;

          if (property.key.type === AST_NODE_TYPES.Identifier) {
            keyName = property.key.name;
          } else if (property.key.type === AST_NODE_TYPES.Literal) {
            keyName = String(property.key.value);
          }

          context.report({
            node: property,
            messageId: "noInlineProperty",
            data: { name: keyName ?? "unknown" },
          });
        });
      },
    };
  },
});

export default noInlineReturnProperties;
