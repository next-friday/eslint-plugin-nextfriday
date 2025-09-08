import emojiRegex from "emoji-regex";
import { ESLintUtils } from "@typescript-eslint/utils";

const createRule = ESLintUtils.RuleCreator(
  (name) => `https://github.com/next-friday/eslint-plugin-nextfriday/blob/main/docs/rules/${name}.md`,
);

const noEmoji = createRule({
  name: "no-emoji",
  meta: {
    type: "problem",
    docs: {
      description: "Disallow emoji characters in source code",
    },
    messages: {
      noEmoji: "Emoji are not allowed in source code",
    },
    schema: [],
  },
  defaultOptions: [],
  create(context) {
    const { sourceCode } = context;

    return {
      Program() {
        const text = sourceCode.getText();
        const regex = emojiRegex();
        const matches = Array.from(text.matchAll(regex));

        matches.forEach((match) => {
          const loc = sourceCode.getLocFromIndex(match.index);

          context.report({
            loc,
            messageId: "noEmoji",
          });
        });
      },
    };
  },
});

export default noEmoji;
