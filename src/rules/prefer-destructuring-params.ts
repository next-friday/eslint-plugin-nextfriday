import { AST_NODE_TYPES, ESLintUtils } from "@typescript-eslint/utils";

import type { TSESTree } from "@typescript-eslint/utils";

const createRule = ESLintUtils.RuleCreator(
  (name) => `https://github.com/next-friday/eslint-plugin-nextfriday/blob/main/docs/rules/${name}.md`,
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
    const checkFunction = (
      node: TSESTree.FunctionDeclaration | TSESTree.FunctionExpression | TSESTree.ArrowFunctionExpression,
    ) => {
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
