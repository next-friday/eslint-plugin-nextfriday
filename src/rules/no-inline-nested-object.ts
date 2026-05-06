import { AST_NODE_TYPES, ESLintUtils } from "@typescript-eslint/utils";

import type { TSESTree } from "@typescript-eslint/utils";

const createRule = ESLintUtils.RuleCreator(
  (name) =>
    `https://github.com/next-friday/eslint-plugin-nextfriday/blob/main/docs/rules/${name.replaceAll("-", "_").toUpperCase()}.md`,
);

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
        "Require object or array values passed to functions, returned, or used as JSX attributes to span multiple lines when they contain nested objects or arrays",
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

    function checkValue(node: TSESTree.Node | null | undefined): void {
      if (!node) {
        return;
      }

      const inner = getInnerExpression(node);

      if (inner.type !== AST_NODE_TYPES.ObjectExpression && inner.type !== AST_NODE_TYPES.ArrayExpression) {
        return;
      }

      if (!inner.loc) {
        return;
      }

      const isMultiline = inner.loc.start.line !== inner.loc.end.line;
      if (isMultiline) {
        return;
      }

      if (!containsNestedStructure(inner)) {
        return;
      }

      const elements = inner.type === AST_NODE_TYPES.ObjectExpression ? inner.properties : inner.elements;

      context.report({
        node: inner,
        messageId: "requireMultiline",
        fix(fixer) {
          const valueLineText = sourceCode.lines[inner.loc.start.line - 1] ?? "";
          const lineIndentMatch = valueLineText.match(/^(\s*)/);
          const lineIndent = lineIndentMatch ? lineIndentMatch[1] : "";
          const innerIndent = `${lineIndent}  `;

          const elementTexts = elements
            .filter((el): el is NonNullable<typeof el> => el !== null)
            .map((el) => sourceCode.getText(el));

          const isObject = inner.type === AST_NODE_TYPES.ObjectExpression;
          const openChar = isObject ? "{" : "[";
          const closeChar = isObject ? "}" : "]";

          const formattedElements = elementTexts.map((text) => `${innerIndent}${text},`).join("\n");

          const newContent = `${openChar}\n${formattedElements}\n${lineIndent}${closeChar}`;

          return fixer.replaceText(inner, newContent);
        },
      });
    }

    function checkArguments(args: ReadonlyArray<TSESTree.CallExpressionArgument>): void {
      args.forEach((arg) => {
        if (arg.type === AST_NODE_TYPES.SpreadElement) {
          return;
        }
        checkValue(arg);
      });
    }

    return {
      CallExpression(node) {
        checkArguments(node.arguments);
      },
      NewExpression(node) {
        checkArguments(node.arguments);
      },
      ReturnStatement(node) {
        checkValue(node.argument);
      },
      ArrowFunctionExpression(node) {
        if (node.body.type !== AST_NODE_TYPES.BlockStatement) {
          checkValue(node.body);
        }
      },
      JSXExpressionContainer(node) {
        if (node.expression.type === AST_NODE_TYPES.JSXEmptyExpression) {
          return;
        }
        checkValue(node.expression);
      },
    };
  },
});

export default noInlineNestedObject;
