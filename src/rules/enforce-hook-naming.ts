import path from "path";

import { ESLintUtils, TSESTree, AST_NODE_TYPES } from "@typescript-eslint/utils";

const createRule = ESLintUtils.RuleCreator(
  (name) =>
    `https://github.com/next-friday/eslint-plugin-nextfriday/blob/main/docs/rules/${name.replaceAll("-", "_").toUpperCase()}.md`,
);

const enforceHookNaming = createRule({
  name: "enforce-hook-naming",
  meta: {
    type: "suggestion",
    docs: {
      description: "Enforce 'use' prefix for functions in custom hook files (*.hook.ts, *.hooks.ts)",
    },
    messages: {
      missingUsePrefix: "Custom hook functions must start with 'use'. Rename '{{ name }}' to '{{ suggestion }}'.",
      defaultExportMissingUsePrefix:
        "Default export in hook files must start with 'use'. Rename '{{ name }}' to '{{ suggestion }}'.",
    },
    schema: [],
  },
  defaultOptions: [],
  create(context) {
    const { filename } = context;
    const basename = path.basename(filename);
    const isHookFile = basename.endsWith(".hook.ts") || basename.endsWith(".hooks.ts");

    if (!isHookFile) {
      return {};
    }

    const getSuggestion = (name: string): string => {
      const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1);

      return `use${capitalizedName}`;
    };

    const checkFunctionName = (
      name: string,
      node: TSESTree.Node,
      messageId: "missingUsePrefix" | "defaultExportMissingUsePrefix",
    ): void => {
      if (!name.startsWith("use")) {
        context.report({
          node,
          messageId,
          data: {
            name,
            suggestion: getSuggestion(name),
          },
        });
      }
    };

    return {
      ExportNamedDeclaration(node) {
        if (node.declaration?.type === AST_NODE_TYPES.FunctionDeclaration && node.declaration.id) {
          checkFunctionName(node.declaration.id.name, node.declaration.id, "missingUsePrefix");
        }

        if (node.declaration?.type === AST_NODE_TYPES.VariableDeclaration) {
          node.declaration.declarations.forEach((declarator) => {
            if (declarator.id.type === AST_NODE_TYPES.Identifier) {
              checkFunctionName(declarator.id.name, declarator.id, "missingUsePrefix");
            }
          });
        }
      },
      ExportDefaultDeclaration(node) {
        if (node.declaration.type === AST_NODE_TYPES.Identifier) {
          checkFunctionName(node.declaration.name, node.declaration, "defaultExportMissingUsePrefix");
        }

        if (node.declaration.type === AST_NODE_TYPES.FunctionDeclaration && node.declaration.id) {
          checkFunctionName(node.declaration.id.name, node.declaration.id, "defaultExportMissingUsePrefix");
        }
      },
    };
  },
});

export default enforceHookNaming;
