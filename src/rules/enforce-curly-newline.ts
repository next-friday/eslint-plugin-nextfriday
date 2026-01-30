import { ESLintUtils, AST_NODE_TYPES } from "@typescript-eslint/utils";

const createRule = ESLintUtils.RuleCreator(
  (name) =>
    `https://github.com/next-friday/eslint-plugin-nextfriday/blob/main/docs/rules/${name.replaceAll("-", "_").toUpperCase()}.md`,
);

const enforceCurlyNewline = createRule({
  name: "enforce-curly-newline",
  meta: {
    type: "layout",
    docs: {
      description: "Enforce curly braces for multi-line if statements and forbid them for single-line",
    },
    fixable: "code",
    messages: {
      requireBraces: "Multi-line if statements must use curly braces.",
      forbidBraces: "Single-line if statements must not use curly braces.",
    },
    schema: [],
  },
  defaultOptions: [],
  create(context) {
    const { sourceCode } = context;

    return {
      IfStatement(node) {
        const { consequent } = node;
        const startLine = node.loc.start.line;
        const endLine = node.loc.end.line;
        const isSingleLine = startLine === endLine;
        const hasBraces = consequent.type === AST_NODE_TYPES.BlockStatement;

        if (isSingleLine && hasBraces) {
          if (consequent.body.length !== 1) {
            return;
          }

          const innerStatement = consequent.body[0];
          const innerText = sourceCode.getText(innerStatement);

          context.report({
            node: consequent,
            messageId: "forbidBraces",
            fix(fixer) {
              return fixer.replaceText(consequent, innerText);
            },
          });
        }

        if (!isSingleLine && !hasBraces) {
          context.report({
            node: consequent,
            messageId: "requireBraces",
            fix(fixer) {
              const consequentText = sourceCode.getText(consequent);
              const closingParen = sourceCode.getTokenBefore(consequent);

              if (!closingParen) {
                return null;
              }

              const ifStartLine = sourceCode.lines[startLine - 1];
              const indentRegex = /^(\s*)/;
              const indentMatch = indentRegex.exec(ifStartLine);
              const baseIndent = indentMatch ? indentMatch[1] : "";
              const bodyIndent = `${baseIndent}  `;
              const newText = ` {\n${bodyIndent}${consequentText.trim()}\n${baseIndent}}`;

              return fixer.replaceTextRange([closingParen.range[1], consequent.range[1]], newText);
            },
          });
        }
      },
    };
  },
});

export default enforceCurlyNewline;
