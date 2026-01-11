import path from "path";

import { ESLintUtils } from "@typescript-eslint/utils";

const createRule = ESLintUtils.RuleCreator(
  (name) =>
    `https://github.com/next-friday/eslint-plugin-nextfriday/blob/main/docs/rules/${name.replaceAll("-", "_").toUpperCase()}.md`,
);

const isPascalCase = (str: string) => /^[A-Z][a-zA-Z0-9]*$/.test(str) && !/^[A-Z]+$/.test(str);

const jsxPascalCase = createRule({
  name: "jsx-pascal-case",
  meta: {
    type: "problem",
    docs: {
      description: "Enforce PascalCase filenames for .jsx and .tsx files",
    },
    messages: {
      jsxPascalCase: "JSX/TSX file names must be PascalCase",
    },
    schema: [],
  },
  defaultOptions: [],
  create(context) {
    return {
      Program() {
        const { filename } = context;
        const ext = path.extname(filename);

        if (ext !== ".jsx" && ext !== ".tsx") {
          return;
        }

        const basename = path.basename(filename, ext);

        if (!isPascalCase(basename)) {
          context.report({
            loc: { line: 1, column: 0 },
            messageId: "jsxPascalCase",
          });
        }
      },
    };
  },
});

export default jsxPascalCase;
