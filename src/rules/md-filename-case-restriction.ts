import path from "path";

import { ESLintUtils } from "@typescript-eslint/utils";

const createRule = ESLintUtils.RuleCreator(
  (name) => `https://github.com/next-friday/eslint-plugin-nextfriday/blob/main/docs/rules/${name}.md`,
);

const mdFilenameCaseRestriction = createRule({
  name: "md-filename-case-restriction",
  meta: {
    type: "problem",
    docs: {
      description: "Enforce .md filenames to be SNAKE_CASE only",
    },
    messages: {
      invalidFilenameCase: "Markdown filename must be SNAKE_CASE (UPPERCASE with underscores). Found: '{{ filename }}'",
    },
    schema: [],
  },
  defaultOptions: [],
  create(context) {
    return {
      Program() {
        const { filename } = context;

        if (!filename.endsWith(".md")) {
          return;
        }

        const basename = path.basename(filename, ".md");

        function isSnakeCase(text: string): boolean {
          return /^[A-Z][A-Z0-9_]*$/.test(text);
        }

        function isValidCase(text: string): boolean {
          return isSnakeCase(text);
        }

        if (!isValidCase(basename)) {
          context.report({
            node: context.sourceCode.ast,
            messageId: "invalidFilenameCase",
            data: { filename: basename },
          });
        }
      },
    };
  },
});

export default mdFilenameCaseRestriction;
