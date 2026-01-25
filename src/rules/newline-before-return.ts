import { AST_NODE_TYPES, ESLintUtils, TSESTree } from "@typescript-eslint/utils";

const createRule = ESLintUtils.RuleCreator(
  (name) =>
    `https://github.com/next-friday/eslint-plugin-nextfriday/blob/main/docs/rules/${name.replaceAll("-", "_").toUpperCase()}.md`,
);

const newlineBeforeReturn = createRule({
  name: "newline-before-return",
  meta: {
    type: "layout",
    docs: {
      description: "Require a blank line before return statements",
    },
    fixable: "whitespace",
    messages: {
      requireNewline: "A blank line is required before return statements",
    },
    schema: [],
  },
  defaultOptions: [],
  create(context) {
    const { sourceCode } = context;

    function checkReturnStatement(node: TSESTree.ReturnStatement): void {
      const { parent } = node;

      if (!parent || parent.type !== AST_NODE_TYPES.BlockStatement) {
        return;
      }

      const { body: statements } = parent;
      const returnIndex = statements.indexOf(node);

      if (returnIndex <= 0) {
        return;
      }

      const previousStatement = statements[returnIndex - 1];

      if (!previousStatement.loc || !node.loc) {
        return;
      }

      const lineGap = node.loc.start.line - previousStatement.loc.end.line;

      if (lineGap < 2) {
        context.report({
          node,
          messageId: "requireNewline",
          fix(fixer) {
            const tokenBefore = sourceCode.getTokenBefore(node, {
              includeComments: true,
            });

            if (!tokenBefore) {
              return null;
            }

            return fixer.insertTextAfter(tokenBefore, "\n");
          },
        });
      }
    }

    return {
      ReturnStatement: checkReturnStatement,
    };
  },
});

export default newlineBeforeReturn;
