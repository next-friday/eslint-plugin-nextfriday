import { AST_NODE_TYPES, ESLintUtils } from "@typescript-eslint/utils";

import type { TSESTree } from "@typescript-eslint/utils";

const createRule = ESLintUtils.RuleCreator(
  (name) =>
    `https://github.com/next-friday/eslint-plugin-nextfriday/blob/main/docs/rules/${name.replaceAll("-", "_").toUpperCase()}.md`,
);

const GROUP_NAMES = ["", "external/alias re-export", "relative re-export", "local export"] as const;

function getExportGroup(node: TSESTree.ExportNamedDeclaration): number {
  if (!node.source) {
    return 3;
  }

  const source = node.source.value;

  if (source.startsWith(".")) {
    return 2;
  }

  return 1;
}

const sortExports = createRule({
  name: "sort-exports",
  meta: {
    type: "suggestion",
    docs: {
      description: "Enforce a consistent ordering of export groups",
    },
    fixable: "code",
    schema: [],
    messages: {
      unsortedExports:
        "Export group '{{current}}' should come before '{{previous}}'. Expected order: external/alias re-exports, relative re-exports, local exports.",
    },
  },
  defaultOptions: [],
  create(context) {
    function checkOrder(exports: { node: TSESTree.ExportNamedDeclaration; group: number }[]): void {
      const firstUnsorted = exports.find((entry, index) => index > 0 && entry.group < exports[index - 1].group);

      if (!firstUnsorted) {
        return;
      }

      const previous = exports[exports.indexOf(firstUnsorted) - 1];

      context.report({
        node: firstUnsorted.node,
        messageId: "unsortedExports",
        data: {
          current: GROUP_NAMES[firstUnsorted.group],
          previous: GROUP_NAMES[previous.group],
        },
        fix(fixer) {
          const { sourceCode } = context;
          const sorted = [...exports].sort((a, b) => a.group - b.group);
          const sortedTexts = sorted.map((entry) => sourceCode.getText(entry.node));

          return exports.map((entry, index) => fixer.replaceText(entry.node, sortedTexts[index]));
        },
      });
    }

    return {
      Program(node) {
        const exportGroups: { node: TSESTree.ExportNamedDeclaration; group: number }[] = [];

        node.body.forEach((statement) => {
          if (statement.type !== AST_NODE_TYPES.ExportNamedDeclaration || statement.declaration !== null) {
            if (exportGroups.length > 0) {
              checkOrder(exportGroups);
              exportGroups.length = 0;
            }

            return;
          }

          exportGroups.push({ node: statement, group: getExportGroup(statement) });
        });

        if (exportGroups.length > 0) {
          checkOrder(exportGroups);
        }
      },
    };
  },
});

export default sortExports;
