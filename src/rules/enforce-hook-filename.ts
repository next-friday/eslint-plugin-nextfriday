import path from "path";

import { AST_NODE_TYPES, ESLintUtils } from "@typescript-eslint/utils";

import type { TSESTree } from "@typescript-eslint/utils";

const createRule = ESLintUtils.RuleCreator(
  (name) =>
    `https://github.com/next-friday/eslint-plugin-nextfriday/blob/main/docs/rules/${name.replaceAll("-", "_").toUpperCase()}.md`,
);

const enforceHookFilename = createRule({
  name: "enforce-hook-filename",
  meta: {
    type: "suggestion",
    docs: {
      description: "Enforce that files exporting custom hooks are named *.hook.ts or *.hooks.ts",
    },
    messages: {
      requireHookFilename: "'{{ name }}' is a custom hook and must be exported from a *.hook.ts or *.hooks.ts file.",
    },
    schema: [],
  },
  defaultOptions: [],
  create(context) {
    const basename = path.basename(context.filename);
    const isHookFile = basename.endsWith(".hook.ts") || basename.endsWith(".hooks.ts");

    if (isHookFile) return {};

    function reportIfHook(name: string, node: TSESTree.Node): void {
      if (name.startsWith("use") && name.length > 3 && /^use[A-Z]/.test(name)) {
        context.report({ node, messageId: "requireHookFilename", data: { name } });
      }
    }

    return {
      ExportNamedDeclaration(node) {
        if (node.declaration?.type === AST_NODE_TYPES.FunctionDeclaration && node.declaration.id) {
          reportIfHook(node.declaration.id.name, node.declaration.id);
        }

        if (node.declaration?.type === AST_NODE_TYPES.VariableDeclaration) {
          for (const declarator of node.declaration.declarations) {
            if (
              declarator.id.type === AST_NODE_TYPES.Identifier &&
              declarator.init !== null &&
              (declarator.init.type === AST_NODE_TYPES.ArrowFunctionExpression ||
                declarator.init.type === AST_NODE_TYPES.FunctionExpression)
            ) {
              reportIfHook(declarator.id.name, declarator.id);
            }
          }
        }
      },
      ExportDefaultDeclaration(node) {
        if (node.declaration.type === AST_NODE_TYPES.FunctionDeclaration && node.declaration.id !== null) {
          reportIfHook(node.declaration.id.name, node.declaration.id);
        }
      },
    };
  },
});

export default enforceHookFilename;
