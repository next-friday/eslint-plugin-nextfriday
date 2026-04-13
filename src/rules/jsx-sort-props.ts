import { AST_NODE_TYPES, ESLintUtils } from "@typescript-eslint/utils";

import type { TSESLint, TSESTree } from "@typescript-eslint/utils";

const createRule = ESLintUtils.RuleCreator(
  (name) =>
    `https://github.com/next-friday/eslint-plugin-nextfriday/blob/main/docs/rules/${name.replaceAll("-", "_").toUpperCase()}.md`,
);

const TYPE_GROUP = {
  STRING: 1,
  HYPHENATED_STRING: 2,
  NUMBER_BOOLEAN_NULL: 3,
  EXPRESSION: 4,
  OBJECT_ARRAY: 5,
  FUNCTION: 6,
  JSX: 7,
  SHORTHAND: 8,
} as const;

const EXPRESSION_TYPE_TO_GROUP = new Map<AST_NODE_TYPES, number>([
  [AST_NODE_TYPES.ObjectExpression, TYPE_GROUP.OBJECT_ARRAY],
  [AST_NODE_TYPES.ArrayExpression, TYPE_GROUP.OBJECT_ARRAY],
  [AST_NODE_TYPES.ArrowFunctionExpression, TYPE_GROUP.FUNCTION],
  [AST_NODE_TYPES.FunctionExpression, TYPE_GROUP.FUNCTION],
  [AST_NODE_TYPES.JSXElement, TYPE_GROUP.JSX],
  [AST_NODE_TYPES.JSXFragment, TYPE_GROUP.JSX],
]);

function isHyphenatedName(node: TSESTree.JSXAttribute): boolean {
  return node.name.type === AST_NODE_TYPES.JSXIdentifier && node.name.name.includes("-");
}

function getStringGroup(node: TSESTree.JSXAttribute): number {
  return isHyphenatedName(node) ? TYPE_GROUP.HYPHENATED_STRING : TYPE_GROUP.STRING;
}

function getLiteralValueGroup(value: TSESTree.Literal["value"]): number | null {
  if (typeof value === "string") {
    return null;
  }

  return TYPE_GROUP.NUMBER_BOOLEAN_NULL;
}

function getExpressionGroup(expression: TSESTree.Expression): number | null {
  if (expression.type === AST_NODE_TYPES.Literal) {
    return getLiteralValueGroup(expression.value);
  }

  if (expression.type === AST_NODE_TYPES.TemplateLiteral) {
    return null;
  }

  if (expression.type === AST_NODE_TYPES.Identifier && expression.name === "undefined") {
    return TYPE_GROUP.NUMBER_BOOLEAN_NULL;
  }

  return EXPRESSION_TYPE_TO_GROUP.get(expression.type) ?? TYPE_GROUP.EXPRESSION;
}

function getTypeGroup(node: TSESTree.JSXAttribute): number | null {
  if (node.value === null) {
    return TYPE_GROUP.SHORTHAND;
  }

  if (node.value.type === AST_NODE_TYPES.Literal) {
    if (typeof node.value.value === "string") {
      return getStringGroup(node);
    }

    return TYPE_GROUP.NUMBER_BOOLEAN_NULL;
  }

  if (node.value.type !== AST_NODE_TYPES.JSXExpressionContainer) {
    return null;
  }

  const { expression } = node.value;

  if (expression.type === AST_NODE_TYPES.JSXEmptyExpression) {
    return null;
  }

  const group = getExpressionGroup(expression);

  if (group === null) {
    return getStringGroup(node);
  }

  return group;
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

function sortSegment(
  segment: TSESTree.JSXAttribute[],
  sourceCode: TSESLint.SourceCode,
  fixer: TSESLint.RuleFixer,
): TSESLint.RuleFix[] {
  const sorted = [...segment].sort((a, b) => (getTypeGroup(a) ?? 0) - (getTypeGroup(b) ?? 0));
  const sortedTexts = sorted.map((attr) => sourceCode.getText(attr));

  return segment
    .map((attr, i) => ({ attr, sortedText: sortedTexts[i] }))
    .filter(({ attr, sortedText }) => sourceCode.getText(attr) !== sortedText)
    .map(({ attr, sortedText }) => fixer.replaceText(attr, sortedText));
}

function getSegments(attributes: TSESTree.JSXOpeningElement["attributes"]): TSESTree.JSXAttribute[][] {
  const result: TSESTree.JSXAttribute[][] = [];
  let current: TSESTree.JSXAttribute[] = [];

  attributes.forEach((attr) => {
    if (attr.type === AST_NODE_TYPES.JSXSpreadAttribute) {
      if (current.length > 0) {
        result.push(current);
        current = [];
      }
    } else {
      current.push(attr);
    }
  });

  if (current.length > 0) {
    result.push(current);
  }

  return result;
}

const jsxSortProps = createRule({
  name: "jsx-sort-props",
  meta: {
    type: "suggestion",
    docs: {
      description:
        "Enforce JSX props are sorted by value type: strings, hyphenated strings, numbers/booleans, expressions, objects/arrays, functions, JSX elements, then shorthand booleans",
    },
    fixable: "code",
    messages: {
      unsortedProps:
        "JSX props should be sorted by value type: strings, hyphenated strings, numbers/booleans/null, expressions, objects/arrays, functions, JSX elements, then shorthand booleans.",
    },
    schema: [],
  },
  defaultOptions: [],
  create(context) {
    const { sourceCode } = context;

    return {
      JSXOpeningElement(node) {
        if (!hasUnsortedProps(node.attributes)) {
          return;
        }

        context.report({
          node,
          messageId: "unsortedProps",
          fix(fixer) {
            return getSegments(node.attributes).flatMap((segment) => sortSegment(segment, sourceCode, fixer));
          },
        });
      },
    };
  },
});

export default jsxSortProps;
