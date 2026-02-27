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

const GROUP_NAMES = ["", "side-effect", "builtin", "external", "internal alias", "relative"] as const;

function getImportGroup(node: TSESTree.ImportDeclaration): number {
  const source = node.source.value;

  if (node.specifiers.length === 0 && node.importKind !== "type") {
    return 1;
  }

  if (source.startsWith("node:") || NODE_BUILTINS.has(source.split("/")[0])) {
    return 2;
  }

  if (source.startsWith("@/") || source.startsWith("~/") || source.startsWith("#")) {
    return 4;
  }

  if (source.startsWith(".")) {
    return 5;
  }

  return 3;
}

function isTypeOnlyImport(node: TSESTree.ImportDeclaration): boolean {
  return node.importKind === "type" && node.specifiers.length > 0;
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
        "Import group '{{current}}' should come before '{{previous}}'. Expected order: side-effect, builtin, external, internal alias, relative.",
    },
  },
  defaultOptions: [],
  create(context) {
    function checkOrder(imports: { node: TSESTree.ImportDeclaration; group: number }[]): void {
      const isSorted = imports.every((entry, index) => index === 0 || entry.group >= imports[index - 1].group);

      if (isSorted) {
        return;
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
    }

    return {
      Program(node) {
        const importGroups: { node: TSESTree.ImportDeclaration; group: number }[] = [];

        node.body.forEach((statement) => {
          if (statement.type !== AST_NODE_TYPES.ImportDeclaration) {
            if (importGroups.length > 0) {
              checkOrder(importGroups);
              importGroups.length = 0;
            }

            return;
          }

          if (isTypeOnlyImport(statement)) {
            return;
          }

          importGroups.push({ node: statement, group: getImportGroup(statement) });
        });

        if (importGroups.length > 0) {
          checkOrder(importGroups);
        }
      },
    };
  },
});

export default sortImports;
