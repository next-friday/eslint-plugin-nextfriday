import { AST_NODE_TYPES, ESLintUtils } from "@typescript-eslint/utils";

import type { TSESTree } from "@typescript-eslint/utils";

const createRule = ESLintUtils.RuleCreator(
  (name) =>
    `https://github.com/next-friday/eslint-plugin-nextfriday/blob/main/docs/rules/${name.replaceAll("-", "_").toUpperCase()}.md`,
);

const jsxNewlineBetweenElements = createRule({
  name: "jsx-newline-between-elements",
  meta: {
    type: "layout",
    docs: {
      description: "Require empty lines between sibling JSX elements",
    },
    fixable: "whitespace",
    schema: [],
    messages: {
      requireNewline: "Expected empty line between sibling JSX elements",
    },
  },
  defaultOptions: [],
  create(context) {
    const { sourceCode } = context;

    function isJSXElementOrFragment(node: TSESTree.Node): boolean {
      if (node.type === AST_NODE_TYPES.JSXFragment) {
        return true;
      }
      if (node.type === AST_NODE_TYPES.JSXElement) {
        return node.closingElement !== null;
      }
      return false;
    }

    function isMultiLine(node: TSESTree.Node): boolean {
      return node.loc.start.line !== node.loc.end.line;
    }

    function checkSiblings(children: TSESTree.JSXChild[]) {
      const jsxElements = children.filter((child): child is TSESTree.JSXElement | TSESTree.JSXFragment =>
        isJSXElementOrFragment(child),
      );

      for (let i = 0; i < jsxElements.length - 1; i += 1) {
        const current = jsxElements[i];
        const next = jsxElements[i + 1];

        const needsNewline = isMultiLine(current) || isMultiLine(next);

        if (needsNewline) {
          const currentEndLine = current.loc.end.line;
          const nextStartLine = next.loc.start.line;
          const lineDiff = nextStartLine - currentEndLine;

          if (lineDiff < 2) {
            context.report({
              node: next,
              messageId: "requireNewline",
              fix(fixer) {
                const textBetween = sourceCode.getText().slice(current.range[1], next.range[0]);

                if (textBetween.includes("//") || textBetween.includes("/*")) {
                  return null;
                }

                return fixer.insertTextAfter(current, "\n");
              },
            });
          }
        }
      }
    }

    return {
      JSXElement(node) {
        if (node.children.length > 0) {
          checkSiblings(node.children);
        }
      },
      JSXFragment(node) {
        if (node.children.length > 0) {
          checkSiblings(node.children);
        }
      },
    };
  },
});

export default jsxNewlineBetweenElements;
