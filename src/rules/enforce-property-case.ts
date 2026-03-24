import { AST_NODE_TYPES, ESLintUtils } from "@typescript-eslint/utils";

import type { TSESTree } from "@typescript-eslint/utils";

const createRule = ESLintUtils.RuleCreator(
  (name) =>
    `https://github.com/next-friday/eslint-plugin-nextfriday/blob/main/docs/rules/${name.replaceAll("-", "_").toUpperCase()}.md`,
);

const SNAKE_CASE_REGEX = /^[a-z]+_[a-z0-9_]*$/;
const SCREAMING_SNAKE_CASE_REGEX = /^[A-Z][A-Z0-9]*(?:_[A-Z0-9]+)*$/;

const isInsideAsConst = (node: TSESTree.ObjectExpression): boolean => {
  const { parent } = node;

  if (
    parent.type === AST_NODE_TYPES.TSAsExpression &&
    parent.typeAnnotation.type === AST_NODE_TYPES.TSTypeReference &&
    parent.typeAnnotation.typeName.type === AST_NODE_TYPES.Identifier &&
    parent.typeAnnotation.typeName.name === "const"
  ) {
    return true;
  }

  if (parent.type === AST_NODE_TYPES.ArrayExpression) {
    const grandparent = parent.parent;

    if (
      grandparent?.type === AST_NODE_TYPES.TSAsExpression &&
      grandparent.typeAnnotation.type === AST_NODE_TYPES.TSTypeReference &&
      grandparent.typeAnnotation.typeName.type === AST_NODE_TYPES.Identifier &&
      grandparent.typeAnnotation.typeName.name === "const"
    ) {
      return true;
    }
  }

  return false;
};

const enforcePropertyCase = createRule({
  name: "enforce-property-case",
  meta: {
    type: "suggestion",
    docs: {
      description: "Enforce camelCase for unquoted object property keys",
    },
    messages: {
      useCamelCase:
        "Property '{{ name }}' should use camelCase. Use camelCase for object properties, or wrap in quotes if required by an API.",
    },
    schema: [],
  },
  defaultOptions: [],
  create(context) {
    return {
      Property(node) {
        if (node.parent.type !== AST_NODE_TYPES.ObjectExpression) {
          return;
        }

        if (isInsideAsConst(node.parent)) {
          return;
        }

        if (node.computed) {
          return;
        }

        if (node.key.type !== AST_NODE_TYPES.Identifier) {
          return;
        }

        const { name } = node.key;

        if (SNAKE_CASE_REGEX.test(name) || SCREAMING_SNAKE_CASE_REGEX.test(name)) {
          context.report({
            node: node.key,
            messageId: "useCamelCase",
            data: { name },
          });
        }
      },
    };
  },
});

export default enforcePropertyCase;
