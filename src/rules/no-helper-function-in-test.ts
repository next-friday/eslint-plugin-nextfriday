import path from "path";

import { AST_NODE_TYPES, ESLintUtils } from "@typescript-eslint/utils";

import type { TSESTree } from "@typescript-eslint/utils";

const createRule = ESLintUtils.RuleCreator(
  (name) =>
    `https://github.com/next-friday/eslint-plugin-nextfriday/blob/main/docs/rules/${name.replaceAll("-", "_").toUpperCase()}.md`,
);

const noHelperFunctionInTest = createRule({
  name: "no-helper-function-in-test",
  meta: {
    type: "suggestion",
    docs: {
      description: "Disallow helper function definitions in test files",
    },
    messages: {
      noHelperFunction: "Helper functions must not be defined in test files. Extract to a separate utility file.",
    },
    schema: [],
  },
  defaultOptions: [],
  create(context) {
    const basename = path.basename(context.filename);
    const isTestFile = basename.endsWith(".test.ts") || basename.endsWith(".test.tsx");

    if (!isTestFile) return {};

    return {
      FunctionDeclaration(node: TSESTree.FunctionDeclaration) {
        if (node.parent.type === AST_NODE_TYPES.Program) {
          context.report({ node, messageId: "noHelperFunction" });
        }
      },
      VariableDeclarator(node: TSESTree.VariableDeclarator) {
        if (
          node.parent.type === AST_NODE_TYPES.VariableDeclaration &&
          node.parent.parent.type === AST_NODE_TYPES.Program &&
          node.init !== null &&
          (node.init.type === AST_NODE_TYPES.ArrowFunctionExpression ||
            node.init.type === AST_NODE_TYPES.FunctionExpression)
        ) {
          context.report({ node, messageId: "noHelperFunction" });
        }
      },
    };
  },
});

export default noHelperFunctionInTest;
