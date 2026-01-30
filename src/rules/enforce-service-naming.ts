import { ESLintUtils, TSESTree, AST_NODE_TYPES } from "@typescript-eslint/utils";

const createRule = ESLintUtils.RuleCreator(
  (name) =>
    `https://github.com/next-friday/eslint-plugin-nextfriday/blob/main/docs/rules/${name.replaceAll("-", "_").toUpperCase()}.md`,
);

const DISALLOWED_PREFIXES = ["get", "load"];

const enforceServiceNaming = createRule({
  name: "enforce-service-naming",
  meta: {
    type: "suggestion",
    docs: {
      description: "Enforce 'fetch' prefix for async functions in *.service.ts files instead of 'get' or 'load'",
    },
    messages: {
      usesFetchPrefix:
        "Use 'fetch' prefix instead of '{{ prefix }}' for service functions. Rename '{{ name }}' to '{{ suggestion }}'.",
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
      const matchedPrefix = DISALLOWED_PREFIXES.find(
        (prefix) => name.startsWith(prefix) && name.length > prefix.length,
      );

      if (matchedPrefix) {
        const restOfName = name.slice(matchedPrefix.length);
        const suggestion = `fetch${restOfName}`;

        context.report({
          node,
          messageId: "usesFetchPrefix",
          data: {
            prefix: matchedPrefix,
            name,
            suggestion,
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
