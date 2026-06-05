import { AST_NODE_TYPES, ESLintUtils } from "@typescript-eslint/utils";

import type { TSESTree } from "@typescript-eslint/utils";

const createRule = ESLintUtils.RuleCreator(
  (name) =>
    `https://github.com/next-friday/eslint-plugin-nextfriday/blob/main/docs/rules/${name.replaceAll("-", "_").toUpperCase()}.md`,
);

type FunctionNode = TSESTree.FunctionDeclaration | TSESTree.FunctionExpression | TSESTree.ArrowFunctionExpression;

const isDefinitionFunction = (node: FunctionNode): boolean => {
  if (node.type === AST_NODE_TYPES.FunctionDeclaration) {
    return true;
  }

  return node.parent?.type === AST_NODE_TYPES.VariableDeclarator;
};

const preferBodyDestructuring = createRule({
  name: "prefer-body-destructuring",
  meta: {
    type: "suggestion",
    docs: {
      description: "Destructure a single object parameter in the function body instead of the signature",
    },
    schema: [],
    messages: {
      preferBodyDestructuring:
        "Destructure the parameter in the function body, not the signature. Use a single named parameter (e.g. 'props') and destructure on the first line.",
    },
  },
  defaultOptions: [],
  create(context) {
    const check = (node: FunctionNode) => {
      if (node.params.length !== 1) {
        return;
      }

      const [param] = node.params;

      if (param.type !== AST_NODE_TYPES.ObjectPattern) {
        return;
      }

      if (!isDefinitionFunction(node)) {
        return;
      }

      context.report({
        node: param,
        messageId: "preferBodyDestructuring",
      });
    };

    return {
      FunctionDeclaration: check,
      FunctionExpression: check,
      ArrowFunctionExpression: check,
    };
  },
});

export default preferBodyDestructuring;
