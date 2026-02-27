import { ESLintUtils, AST_NODE_TYPES } from "@typescript-eslint/utils";

import type { TSESTree } from "@typescript-eslint/utils";

const createRule = ESLintUtils.RuleCreator(
  (name) =>
    `https://github.com/next-friday/eslint-plugin-nextfriday/blob/main/docs/rules/${name.replaceAll("-", "_").toUpperCase()}.md`,
);

const TYPE_GROUP = {
  STRING: 1,
  NUMBER_BOOLEAN_NULL: 2,
  OBJECT_ARRAY: 3,
  FUNCTION: 4,
  JSX: 5,
  SHORTHAND: 6,
} as const;

const EXPRESSION_TYPE_TO_GROUP = new Map<AST_NODE_TYPES, number>([
  [AST_NODE_TYPES.TemplateLiteral, TYPE_GROUP.STRING],
  [AST_NODE_TYPES.ObjectExpression, TYPE_GROUP.OBJECT_ARRAY],
  [AST_NODE_TYPES.ArrayExpression, TYPE_GROUP.OBJECT_ARRAY],
  [AST_NODE_TYPES.ArrowFunctionExpression, TYPE_GROUP.FUNCTION],
  [AST_NODE_TYPES.FunctionExpression, TYPE_GROUP.FUNCTION],
  [AST_NODE_TYPES.JSXElement, TYPE_GROUP.JSX],
  [AST_NODE_TYPES.JSXFragment, TYPE_GROUP.JSX],
]);

function getLiteralGroup(value: TSESTree.Literal["value"]): number {
  if (typeof value === "string") {
    return TYPE_GROUP.STRING;
  }

  return TYPE_GROUP.NUMBER_BOOLEAN_NULL;
}

function getExpressionGroup(expression: TSESTree.Expression): number | null {
  if (expression.type === AST_NODE_TYPES.Literal) {
    return getLiteralGroup(expression.value);
  }

  if (expression.type === AST_NODE_TYPES.Identifier && expression.name === "undefined") {
    return TYPE_GROUP.NUMBER_BOOLEAN_NULL;
  }

  return EXPRESSION_TYPE_TO_GROUP.get(expression.type) ?? null;
}

function getTypeGroup(node: TSESTree.JSXAttribute): number | null {
  if (node.value === null) {
    return TYPE_GROUP.SHORTHAND;
  }

  if (node.value.type === AST_NODE_TYPES.Literal) {
    return getLiteralGroup(node.value.value);
  }

  if (node.value.type !== AST_NODE_TYPES.JSXExpressionContainer) {
    return null;
  }

  const { expression } = node.value;

  if (expression.type === AST_NODE_TYPES.JSXEmptyExpression) {
    return null;
  }

  return getExpressionGroup(expression);
}

function hasUnsortedProps(attributes: TSESTree.JSXOpeningElement["attributes"]): boolean {
  let lastGroup = 0;

  return attributes.some((attribute) => {
    if (attribute.type === AST_NODE_TYPES.JSXSpreadAttribute) {
      lastGroup = 0;

      return false;
    }

    const group = getTypeGroup(attribute);

    if (group === null) {
      return false;
    }

    if (group < lastGroup) {
      return true;
    }

    lastGroup = group;

    return false;
  });
}

const jsxSortProps = createRule({
  name: "jsx-sort-props",
  meta: {
    type: "suggestion",
    docs: {
      description:
        "Enforce JSX props are sorted by value type: strings, numbers/booleans, objects/arrays, functions, JSX elements, then shorthand booleans",
    },
    messages: {
      unsortedProps:
        "JSX props should be sorted by value type: strings, numbers/booleans/null, objects/arrays, functions, JSX elements, then shorthand booleans.",
    },
    schema: [],
  },
  defaultOptions: [],
  create(context) {
    return {
      JSXOpeningElement(node) {
        if (hasUnsortedProps(node.attributes)) {
          context.report({
            node,
            messageId: "unsortedProps",
          });
        }
      },
    };
  },
});

export default jsxSortProps;
