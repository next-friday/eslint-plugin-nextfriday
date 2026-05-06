import { AST_NODE_TYPES, ESLintUtils } from "@typescript-eslint/utils";

import type { TSESTree } from "@typescript-eslint/utils";

const createRule = ESLintUtils.RuleCreator(
  (name) =>
    `https://github.com/next-friday/eslint-plugin-nextfriday/blob/main/docs/rules/${name.replaceAll("-", "_").toUpperCase()}.md`,
);

const NODE_BUILTINS = new Set([
  "assert",
  "async_hooks",
  "buffer",
  "child_process",
  "cluster",
  "console",
  "constants",
  "crypto",
  "dgram",
  "diagnostics_channel",
  "dns",
  "domain",
  "events",
  "fs",
  "http",
  "http2",
  "https",
  "inspector",
  "module",
  "net",
  "os",
  "path",
  "perf_hooks",
  "process",
  "punycode",
  "querystring",
  "readline",
  "repl",
  "stream",
  "string_decoder",
  "sys",
  "timers",
  "tls",
  "trace_events",
  "tty",
  "url",
  "util",
  "v8",
  "vm",
  "wasi",
  "worker_threads",
  "zlib",
]);

const GROUP_NAMES = [
  "",
  "side-effect",
  "builtin",
  "builtin type",
  "external",
  "external type",
  "internal alias",
  "internal alias type",
  "parent relative",
  "parent relative type",
  "relative",
  "relative type",
] as const;

function isTypeOnlyImport(node: TSESTree.ImportDeclaration): boolean {
  return node.importKind === "type" && node.specifiers.length > 0;
}

function getImportGroup(node: TSESTree.ImportDeclaration): number {
  const source = node.source.value;
  const isType = isTypeOnlyImport(node);

  if (node.specifiers.length === 0 && !isType) {
    return 1;
  }

  if (source.startsWith("node:") || NODE_BUILTINS.has(source.split("/")[0])) {
    return isType ? 3 : 2;
  }

  if (source.startsWith("@/") || source.startsWith("~/") || source.startsWith("#")) {
    return isType ? 7 : 6;
  }

  if (source.startsWith("../")) {
    return isType ? 9 : 8;
  }

  if (source.startsWith(".")) {
    return isType ? 11 : 10;
  }

  return isType ? 5 : 4;
}

const sortImports = createRule({
  name: "sort-imports",
  meta: {
    type: "suggestion",
    docs: {
      description: "Enforce a consistent ordering of import groups",
    },
    fixable: "code",
    schema: [],
    messages: {
      unsortedImports:
        "Import group '{{current}}' should come before '{{previous}}'. Expected order: side-effect, builtin, external, internal alias, parent relative, relative — each followed by its type imports.",
      missingBlankLine: "Expected a blank line before '{{current}}' imports (new group after '{{previous}}').",
    },
  },
  defaultOptions: [],
  create(context) {
    function getMainGroup(group: number): number {
      if (group === 1) return 1;
      return Math.floor((group - 2) / 2) + 2;
    }

    function checkBlankLines(imports: { node: TSESTree.ImportDeclaration; group: number }[]): void {
      const { sourceCode } = context;

      for (let i = 1; i < imports.length; i++) {
        const prev = imports[i - 1];
        const curr = imports[i];

        if (getMainGroup(prev.group) === getMainGroup(curr.group)) {
          continue;
        }

        if (curr.node.loc.start.line - prev.node.loc.end.line > 1) {
          continue;
        }

        context.report({
          node: curr.node,
          messageId: "missingBlankLine",
          data: {
            current: GROUP_NAMES[curr.group],
            previous: GROUP_NAMES[prev.group],
          },
          fix(fixer) {
            const firstToken = sourceCode.getFirstToken(curr.node);
            if (!firstToken) return null;
            return fixer.insertTextBefore(firstToken, "\n");
          },
        });
      }
    }

    function checkOrder(imports: { node: TSESTree.ImportDeclaration; group: number }[]): boolean {
      const isSorted = imports.every((entry, index) => index === 0 || entry.group >= imports[index - 1].group);

      if (isSorted) {
        return false;
      }

      const firstUnsorted = imports.find((entry, index) => index > 0 && entry.group < imports[index - 1].group);

      if (!firstUnsorted) {
        return;
      }

      const previous = imports[imports.indexOf(firstUnsorted) - 1];

      context.report({
        node: firstUnsorted.node,
        messageId: "unsortedImports",
        data: {
          current: GROUP_NAMES[firstUnsorted.group],
          previous: GROUP_NAMES[previous.group],
        },
        fix(fixer) {
          const { sourceCode } = context;
          const sorted = [...imports].sort((a, b) => a.group - b.group);
          const sortedTexts = sorted.map((entry) => sourceCode.getText(entry.node));

          return imports.map((entry, index) => fixer.replaceText(entry.node, sortedTexts[index]));
        },
      });

      return true;
    }

    return {
      Program(node) {
        const importGroups: { node: TSESTree.ImportDeclaration; group: number }[] = [];

        node.body.forEach((statement) => {
          if (statement.type !== AST_NODE_TYPES.ImportDeclaration) {
            if (importGroups.length > 0) {
              if (!checkOrder(importGroups)) {
                checkBlankLines(importGroups);
              }
              importGroups.length = 0;
            }

            return;
          }

          importGroups.push({ node: statement, group: getImportGroup(statement) });
        });

        if (importGroups.length > 0) {
          if (!checkOrder(importGroups)) {
            checkBlankLines(importGroups);
          }
        }
      },
    };
  },
});

export default sortImports;
