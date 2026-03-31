import { AST_NODE_TYPES, ESLintUtils } from "@typescript-eslint/utils";

import type { TSESTree } from "@typescript-eslint/utils";

const createRule = ESLintUtils.RuleCreator(
  (name) =>
    `https://github.com/next-friday/eslint-plugin-nextfriday/blob/main/docs/rules/${name.replaceAll("-", "_").toUpperCase()}.md`,
);

const BANNED_PREFIXES: Record<string, string[]> = {
  delete: ["remove", "archive"],
  do: ["submit", "process"],
  handle: ["create", "verify"],
  set: ["update", "save", "patch"],
};

const enforceServiceNaming = createRule({
  name: "enforce-service-naming",
  meta: {
    type: "suggestion",
    docs: {
      description: "Ban misleading function name prefixes in *.service.ts files",
    },
    messages: {
      bannedPrefix:
        "Avoid '{{ prefix }}' prefix in service functions. Rename '{{ name }}' to use a more descriptive prefix (e.g. {{ suggestions }}).",
    },
    schema: [],
  },
  defaultOptions: [],
  create(context) {
    const { filename } = context;
    const isServiceFile = filename.endsWith(".service.ts");

    if (!isServiceFile) {
      return {};
    }

    const checkFunctionName = (name: string, node: TSESTree.Node): void => {
      const matchedPrefix = Object.keys(BANNED_PREFIXES).find(
        (prefix) =>
          name.startsWith(prefix) &&
          name.length > prefix.length &&
          name[prefix.length] === name[prefix.length]?.toUpperCase(),
      );

      if (matchedPrefix) {
        context.report({
          node,
          messageId: "bannedPrefix",
          data: {
            prefix: matchedPrefix,
            name,
            suggestions: BANNED_PREFIXES[matchedPrefix].join(", "),
          },
        });
      }
    };

    const checkExportedFunction = (
      node: TSESTree.FunctionDeclaration | TSESTree.ArrowFunctionExpression,
      id: TSESTree.Identifier | null,
    ): void => {
      if (!node.async || !id) {
        return;
      }

      checkFunctionName(id.name, id);
    };

    return {
      ExportNamedDeclaration(node) {
        if (node.declaration?.type === AST_NODE_TYPES.FunctionDeclaration && node.declaration.id) {
          checkExportedFunction(node.declaration, node.declaration.id);
        }

        if (node.declaration?.type === AST_NODE_TYPES.VariableDeclaration) {
          node.declaration.declarations.forEach((declarator) => {
            if (
              declarator.id.type === AST_NODE_TYPES.Identifier &&
              declarator.init?.type === AST_NODE_TYPES.ArrowFunctionExpression
            ) {
              checkExportedFunction(declarator.init, declarator.id);
            }
          });
        }
      },
    };
  },
});

export default enforceServiceNaming;
