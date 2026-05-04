import path from "path";

import { AST_NODE_TYPES, ESLintUtils } from "@typescript-eslint/utils";

import type { TSESTree } from "@typescript-eslint/utils";

const createRule = ESLintUtils.RuleCreator(
  (name) =>
    `https://github.com/next-friday/eslint-plugin-nextfriday/blob/main/docs/rules/${name.replaceAll("-", "_").toUpperCase()}.md`,
);

const TEST_GLOBALS = new Set(["describe", "it", "test", "beforeEach", "beforeAll", "afterEach", "afterAll"]);

const enforceTestFilename = createRule({
  name: "enforce-test-filename",
  meta: {
    type: "suggestion",
    docs: {
      description: "Enforce that files containing test code are named *.test.ts or *.test.tsx",
    },
    messages: {
      requireTestFilename: "Files containing test code must be named *.test.ts or *.test.tsx.",
    },
    schema: [],
  },
  defaultOptions: [],
  create(context) {
    const basename = path.basename(context.filename);
    const isTestFile = basename.endsWith(".test.ts") || basename.endsWith(".test.tsx");

    if (isTestFile) return {};

    function isTestGlobalCall(node: TSESTree.CallExpression): boolean {
      return node.callee.type === AST_NODE_TYPES.Identifier && TEST_GLOBALS.has(node.callee.name);
    }

    let reported = false;

    return {
      CallExpression(node) {
        if (reported) return;
        if (!isTestGlobalCall(node)) return;

        reported = true;
        context.report({ node, messageId: "requireTestFilename" });
      },
    };
  },
});

export default enforceTestFilename;
