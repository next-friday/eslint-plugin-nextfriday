import path from "path";

import { ESLintUtils } from "@typescript-eslint/utils";

const createRule = ESLintUtils.RuleCreator(
  (name) =>
    `https://github.com/next-friday/eslint-plugin-nextfriday/blob/main/docs/rules/${name.replaceAll("-", "_").toUpperCase()}.md`,
);

const isKebabCase = (str: string) => {
  if (/\.(config|rc|setup|spec|test)$/.test(str) || /^[a-z0-9]+(?:-[a-z0-9]+)*\.[a-z0-9]+(?:-[a-z0-9]+)*$/.test(str)) {
    return /^[a-z0-9]+(?:-[a-z0-9]+)*(?:\.[a-z0-9]+(?:-[a-z0-9]+)*)*$/.test(str);
  }

  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(str);
};

const fileKebabCase = createRule({
  name: "file-kebab-case",
  meta: {
    type: "problem",
    docs: {
      description: "Enforce kebab-case filenames for .ts and .js files",
    },
    messages: {
      fileKebabCase: "File names must be kebab-case",
    },
    schema: [],
  },
  defaultOptions: [],
  create(context) {
    return {
      Program() {
        const { filename } = context;
        const ext = path.extname(filename);

        if (ext !== ".ts" && ext !== ".js") {
          return;
        }

        const basename = path.basename(filename, ext);

        if (!isKebabCase(basename)) {
          context.report({
            loc: { line: 1, column: 0 },
            messageId: "fileKebabCase",
          });
        }
      },
    };
  },
});

export default fileKebabCase;
