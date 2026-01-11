import { AST_NODE_TYPES, ESLintUtils } from "@typescript-eslint/utils";

import type { TSESTree } from "@typescript-eslint/utils";

const createRule = ESLintUtils.RuleCreator(
  (name) =>
    `https://github.com/next-friday/eslint-plugin-nextfriday/blob/main/docs/rules/${name.replaceAll("-", "_").toUpperCase()}.md`,
);

const preferJSXTemplateLiterals = createRule({
  name: "prefer-jsx-template-literals",
  meta: {
    type: "suggestion",
    docs: {
      description: "Enforce using template literals instead of mixing text and JSX expressions",
    },
    fixable: "code",
    schema: [],
    messages: {
      preferTemplate: "Use template literal instead of mixing text with JSX expressions",
    },
  },
  defaultOptions: [],
  create(context) {
    function handleTextBeforeExpression(textNode: TSESTree.JSXText, exprNode: TSESTree.JSXExpressionContainer) {
      const textValue = textNode.value;
      const trimmedText = textValue.trim();

      if (!trimmedText) {
        return;
      }

      const hasTextContent = trimmedText.length > 0 && textValue !== trimmedText;
      const hasNoTrailingSpace = trimmedText.length > 0 && /\S$/.test(textValue);

      if (!hasTextContent && !hasNoTrailingSpace) {
        return;
      }

      context.report({
        node: textNode,
        messageId: "preferTemplate",
        fix(fixer) {
          const textPart = textValue.trimEnd();
          const exprText = context.sourceCode.getText(exprNode.expression);
          const templateLiteral = `{\`${textPart}\${${exprText}}\`}`;

          return [fixer.replaceText(textNode, templateLiteral), fixer.remove(exprNode)];
        },
      });
    }

    function handleExpressionBeforeText(exprNode: TSESTree.JSXExpressionContainer, textNode: TSESTree.JSXText) {
      const textValue = textNode.value;
      const trimmedText = textValue.trim();

      if (!trimmedText) {
        return;
      }

      const startsWithNonWhitespace = /^\S/.test(trimmedText);

      if (!startsWithNonWhitespace) {
        return;
      }

      context.report({
        node: textNode,
        messageId: "preferTemplate",
        fix(fixer) {
          const exprText = context.sourceCode.getText(exprNode.expression);
          const textPart = textValue.trim();
          const templateLiteral = `{\`\${${exprText}}${textPart}\`}`;

          return [fixer.replaceText(exprNode, templateLiteral), fixer.remove(textNode)];
        },
      });
    }

    function checkJSXElement(node: TSESTree.JSXElement) {
      const { children } = node;

      if (children.length < 2) {
        return;
      }

      for (let i = 0; i < children.length - 1; i += 1) {
        const child = children[i];
        const nextChild = children[i + 1];

        if (!child || !nextChild) {
          return;
        }

        if (child.type === AST_NODE_TYPES.JSXText && nextChild.type === AST_NODE_TYPES.JSXExpressionContainer) {
          handleTextBeforeExpression(child, nextChild);
        } else if (child.type === AST_NODE_TYPES.JSXExpressionContainer && nextChild.type === AST_NODE_TYPES.JSXText) {
          handleExpressionBeforeText(child, nextChild);
        }
      }
    }

    return {
      JSXElement: checkJSXElement,
    };
  },
});

export default preferJSXTemplateLiterals;
