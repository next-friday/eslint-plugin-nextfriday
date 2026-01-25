import { ESLintUtils, TSESTree } from "@typescript-eslint/utils";

const createRule = ESLintUtils.RuleCreator(
  (name) =>
    `https://github.com/next-friday/eslint-plugin-nextfriday/blob/main/docs/rules/${name.replaceAll("-", "_").toUpperCase()}.md`,
);

type ProgramChild = TSESTree.ProgramStatement;

function checkStatements(
  statements: readonly ProgramChild[] | readonly TSESTree.Statement[],
  context: Parameters<ReturnType<typeof createRule>["create"]>[0],
): void {
  const { sourceCode } = context;

  statements.forEach((current, index) => {
    const next = statements[index + 1];

    if (!next) {
      return;
    }

    if (!current.loc || !next.loc) {
      return;
    }

    const isMultiline = current.loc.start.line !== current.loc.end.line;

    if (!isMultiline) {
      return;
    }

    const lineGap = next.loc.start.line - current.loc.end.line;

    if (lineGap < 2) {
      context.report({
        node: next,
        messageId: "requireNewline",
        fix(fixer) {
          const tokenBefore = sourceCode.getTokenBefore(next, {
            includeComments: true,
          });
          if (!tokenBefore) {
            return null;
          }
          return fixer.insertTextAfter(tokenBefore, "\n");
        },
      });
    }
  });
}

const newlineAfterMultilineBlock = createRule({
  name: "newline-after-multiline-block",
  meta: {
    type: "layout",
    docs: {
      description: "Require a blank line after multi-line statements before the next statement",
    },
    fixable: "whitespace",
    messages: {
      requireNewline: "A blank line is required after a multi-line statement before the next statement",
    },
    schema: [],
  },
  defaultOptions: [],
  create(context) {
    return {
      Program(node) {
        checkStatements(node.body, context);
      },
      BlockStatement(node) {
        checkStatements(node.body, context);
      },
    };
  },
});

export default newlineAfterMultilineBlock;
