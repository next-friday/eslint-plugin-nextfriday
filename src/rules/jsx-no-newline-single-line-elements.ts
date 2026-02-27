import { AST_NODE_TYPES, ESLintUtils } from "@typescript-eslint/utils";

import type { TSESTree } from "@typescript-eslint/utils";

const createRule = ESLintUtils.RuleCreator(
  (name) =>
    `https://github.com/next-friday/eslint-plugin-nextfriday/blob/main/docs/rules/${name.replaceAll("-", "_").toUpperCase()}.md`,
);

function isJSXElementOrFragment(node: TSESTree.Node): boolean {
  return node.type === AST_NODE_TYPES.JSXElement || node.type === AST_NODE_TYPES.JSXFragment;
}

function isSingleLine(node: TSESTree.Node): boolean {
  return node.loc.start.line === node.loc.end.line;
}

const jsxNoNewlineSingleLineElements = createRule({
  name: "jsx-no-newline-single-line-elements",
  meta: {
    type: "layout",
    docs: {
      description: "Disallow empty lines between single-line sibling JSX elements",
    },
    fixable: "whitespace",
    schema: [],
    messages: {
      forbidNewline: "Unexpected empty line between single-line sibling JSX elements.",
    },
  },
  defaultOptions: [],
  create(context) {
    const { sourceCode } = context;

    function checkSiblings(children: TSESTree.JSXChild[]): void {
      const jsxElements = children.filter((child): child is TSESTree.JSXElement | TSESTree.JSXFragment =>
        isJSXElementOrFragment(child),
      );

      jsxElements.forEach((next, index) => {
        if (index === 0) {
          return;
        }

        const current = jsxElements[index - 1];

        if (!isSingleLine(current) || !isSingleLine(next)) {
          return;
        }

        const currentEndLine = current.loc.end.line;
        const nextStartLine = next.loc.start.line;
        const lineDiff = nextStartLine - currentEndLine;

        if (lineDiff < 2) {
          return;
        }

        context.report({
          node: next,
          messageId: "forbidNewline",
          fix(fixer) {
            const textBetween = sourceCode.getText().slice(current.range[1], next.range[0]);

            if (textBetween.includes("//") || textBetween.includes("/*")) {
              return null;
            }

            const indent = " ".repeat(next.loc.start.column);

            return fixer.replaceTextRange([current.range[1], next.range[0]], `\n${indent}`);
          },
        });
      });
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

export default jsxNoNewlineSingleLineElements;
