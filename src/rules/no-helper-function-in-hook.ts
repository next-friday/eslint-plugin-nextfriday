import path from "path";

import { AST_NODE_TYPES, ESLintUtils } from "@typescript-eslint/utils";

import type { TSESTree } from "@typescript-eslint/utils";

const createRule = ESLintUtils.RuleCreator(
  (name) =>
    `https://github.com/next-friday/eslint-plugin-nextfriday/blob/main/docs/rules/${name.replaceAll("-", "_").toUpperCase()}.md`,
);

const noHelperFunctionInHook = createRule({
  name: "no-helper-function-in-hook",
  meta: {
    type: "suggestion",
    docs: {
      description: "Disallow non-hook helper function definitions in hook files",
    },
    messages: {
      noHelperFunction: "Helper functions must not be defined in hook files. Extract to a separate utility file.",
    },
    schema: [],
  },
  defaultOptions: [],
  create(context) {
    const basename = path.basename(context.filename);
    const isHookFile = basename.endsWith(".hook.ts") || basename.endsWith(".hooks.ts");

    if (!isHookFile) return {};

    function isAtProgramLevel(node: TSESTree.Node): boolean {
      const { parent } = node;

      if (parent === undefined) return false;
      if (parent.type === AST_NODE_TYPES.Program) return true;
      if (parent.type !== AST_NODE_TYPES.ExportNamedDeclaration) return false;

      return parent.parent?.type === AST_NODE_TYPES.Program;
    }

    return {
      FunctionDeclaration(node: TSESTree.FunctionDeclaration) {
        if (!isAtProgramLevel(node)) return;
        if (node.id !== null && node.id.name.startsWith("use")) return;

        context.report({ node, messageId: "noHelperFunction" });
      },
      VariableDeclarator(node: TSESTree.VariableDeclarator) {
        if (node.parent.type !== AST_NODE_TYPES.VariableDeclaration) return;
        if (!isAtProgramLevel(node.parent)) return;

        if (
          node.init === null ||
          (node.init.type !== AST_NODE_TYPES.ArrowFunctionExpression &&
            node.init.type !== AST_NODE_TYPES.FunctionExpression)
        )
          return;

        if (node.id.type === AST_NODE_TYPES.Identifier && node.id.name.startsWith("use")) return;

        context.report({ node, messageId: "noHelperFunction" });
      },
    };
  },
});

export default noHelperFunctionInHook;
