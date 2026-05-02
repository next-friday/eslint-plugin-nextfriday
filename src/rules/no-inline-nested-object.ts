import { AST_NODE_TYPES, ESLintUtils } from "@typescript-eslint/utils";

import type { TSESTree } from "@typescript-eslint/utils";

const createRule = ESLintUtils.RuleCreator(
  (name) =>
    `https://github.com/next-friday/eslint-plugin-nextfriday/blob/main/docs/rules/${name.replaceAll("-", "_").toUpperCase()}.md`,
);

function isObjectOrArray(node: TSESTree.Node): boolean {
  return (
    node.type === AST_NODE_TYPES.ObjectExpression ||
    node.type === AST_NODE_TYPES.ArrayExpression ||
    node.type === AST_NODE_TYPES.TSAsExpression
  );
}

function getInnerExpression(node: TSESTree.Node): TSESTree.Node {
  if (node.type === AST_NODE_TYPES.TSAsExpression) {
    return getInnerExpression(node.expression);
  }
  return node;
}

function isNestedStructure(node: TSESTree.Node): boolean {
  const inner = getInnerExpression(node);
  return inner.type === AST_NODE_TYPES.ObjectExpression || inner.type === AST_NODE_TYPES.ArrayExpression;
}

function containsNestedStructure(node: TSESTree.ObjectExpression | TSESTree.ArrayExpression): boolean {
  if (node.type === AST_NODE_TYPES.ObjectExpression) {
    return node.properties.some((prop) => {
      if (prop.type !== AST_NODE_TYPES.Property) return false;
      return isNestedStructure(prop.value);
    });
  }
  return node.elements.some((el) => {
    if (el === null) return false;
    return isNestedStructure(el);
  });
}

const noInlineNestedObject = createRule({
  name: "no-inline-nested-object",
  meta: {
    type: "layout",
    docs: {
      description:
        "Require object or array values that contain further nested objects or arrays to span multiple lines",
    },
    fixable: "whitespace",
    messages: {
      requireMultiline: "Inline collections containing nested objects or arrays should span multiple lines",
    },
    schema: [],
  },
  defaultOptions: [],
  create(context) {
    const { sourceCode } = context;

    return {
      Property(node) {
        if (!node.value || !isObjectOrArray(node.value)) {
          return;
        }

        const valueNode = getInnerExpression(node.value);

        if (valueNode.type !== AST_NODE_TYPES.ObjectExpression && valueNode.type !== AST_NODE_TYPES.ArrayExpression) {
          return;
        }

        if (!valueNode.loc) {
          return;
        }

        const isMultiline = valueNode.loc.start.line !== valueNode.loc.end.line;
        if (isMultiline) {
          return;
        }

        if (!containsNestedStructure(valueNode)) {
          return;
        }

        const elements = valueNode.type === AST_NODE_TYPES.ObjectExpression ? valueNode.properties : valueNode.elements;

        context.report({
          node: valueNode,
          messageId: "requireMultiline",
          fix(fixer) {
            const openBrace = sourceCode.getFirstToken(valueNode);
            const closeBrace = sourceCode.getLastToken(valueNode);

            if (!openBrace || !closeBrace) {
              return null;
            }

            const indent = " ".repeat(node.loc?.start.column ?? 0);
            const innerIndent = `${indent}  `;

            const elementTexts = elements
              .filter((el): el is NonNullable<typeof el> => el !== null)
              .map((el) => sourceCode.getText(el));

            const isObject = valueNode.type === AST_NODE_TYPES.ObjectExpression;
            const openChar = isObject ? "{" : "[";
            const closeChar = isObject ? "}" : "]";

            const formattedElements = elementTexts.map((text) => `${innerIndent}${text},`).join("\n");

            const newContent = `${openChar}\n${formattedElements}\n${indent}${closeChar}`;

            return fixer.replaceText(valueNode, newContent);
          },
        });
      },
    };
  },
});

export default noInlineNestedObject;
