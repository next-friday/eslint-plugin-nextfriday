import { AST_NODE_TYPES, ESLintUtils } from "@typescript-eslint/utils";

import type { TSESTree } from "@typescript-eslint/utils";

const createRule = ESLintUtils.RuleCreator(
  (name) =>
    `https://github.com/next-friday/eslint-plugin-nextfriday/blob/main/docs/rules/${name.replace(/-/g, "_").toUpperCase()}.md`,
);

const preferDestructuringParams = createRule({
  name: "prefer-destructuring-params",
  meta: {
    type: "suggestion",
    docs: {
      description: "Enforce destructuring for functions with multiple parameters",
    },
    messages: {
      preferDestructuring: "Functions with multiple parameters should use destructuring",
    },
    schema: [],
  },
  defaultOptions: [],
  create(context) {
    const isCallbackFunction = (node: TSESTree.ArrowFunctionExpression | TSESTree.FunctionExpression) => {
      const { parent } = node;
      return parent?.type === AST_NODE_TYPES.CallExpression;
    };

    const isDeveloperFunction = (
      node: TSESTree.FunctionDeclaration | TSESTree.FunctionExpression | TSESTree.ArrowFunctionExpression,
    ) => {
      if (node.type === AST_NODE_TYPES.FunctionDeclaration) {
        return true;
      }

      if (node.type === AST_NODE_TYPES.FunctionExpression || node.type === AST_NODE_TYPES.ArrowFunctionExpression) {
        if (isCallbackFunction(node)) {
          return false;
        }

        const { parent } = node;
        return (
          parent?.type === AST_NODE_TYPES.VariableDeclarator ||
          parent?.type === AST_NODE_TYPES.AssignmentExpression ||
          parent?.type === AST_NODE_TYPES.Property ||
          parent?.type === AST_NODE_TYPES.MethodDefinition
        );
      }

      return false;
    };

    const checkFunction = (
      node: TSESTree.FunctionDeclaration | TSESTree.FunctionExpression | TSESTree.ArrowFunctionExpression,
    ) => {
      const { filename } = context;
      if (filename.includes("node_modules") || filename.includes(".d.ts")) {
        return;
      }

      if (!isDeveloperFunction(node)) {
        return;
      }

      if (node.type === AST_NODE_TYPES.FunctionDeclaration && node.id) {
        const functionName = node.id.name;
        if (functionName.startsWith("_") || functionName.includes("$") || /^[A-Z][a-zA-Z]*$/.test(functionName)) {
          return;
        }
      }

      if (node.params.length <= 1) {
        return;
      }

      const hasNonDestructuredParams = node.params.some(
        (param: TSESTree.Parameter) =>
          param.type !== AST_NODE_TYPES.ObjectPattern && param.type !== AST_NODE_TYPES.RestElement,
      );

      if (hasNonDestructuredParams) {
        context.report({
          node,
          messageId: "preferDestructuring",
        });
      }
    };

    return {
      FunctionDeclaration: checkFunction,
      FunctionExpression: checkFunction,
      ArrowFunctionExpression: checkFunction,
    };
  },
});

export default preferDestructuringParams;
