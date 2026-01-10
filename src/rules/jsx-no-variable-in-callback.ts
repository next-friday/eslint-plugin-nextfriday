import { AST_NODE_TYPES, ESLintUtils } from "@typescript-eslint/utils";

import type { TSESTree } from "@typescript-eslint/utils";

const createRule = ESLintUtils.RuleCreator(
  (name) =>
    `https://github.com/next-friday/eslint-plugin-nextfriday/blob/main/docs/rules/${name.replaceAll("-", "_").toUpperCase()}.md`,
);

const jsxNoVariableInCallback = createRule({
  name: "jsx-no-variable-in-callback",
  meta: {
    type: "suggestion",
    docs: {
      description: "Disallow variable declarations inside callback functions within JSX",
    },
    schema: [],
    messages: {
      noVariableInCallback:
        "Variable declarations should not be inside callback functions within JSX. Extract the logic to a separate function outside the JSX.",
    },
  },
  defaultOptions: [],
  create(context) {
    function isInsideJSX(node: TSESTree.Node): boolean {
      let current = node.parent;
      while (current) {
        if (current.type === AST_NODE_TYPES.JSXElement || current.type === AST_NODE_TYPES.JSXFragment) {
          return true;
        }
        current = current.parent;
      }
      return false;
    }

    function isCallbackInJSX(node: TSESTree.ArrowFunctionExpression | TSESTree.FunctionExpression): boolean {
      if (!node.parent) {
        return false;
      }

      if (!isInsideJSX(node)) {
        return false;
      }

      if (
        node.parent.type === AST_NODE_TYPES.CallExpression ||
        node.parent.type === AST_NODE_TYPES.JSXExpressionContainer
      ) {
        return true;
      }

      if (node.parent.type === AST_NODE_TYPES.ArrayExpression && node.parent.parent) {
        if (
          node.parent.parent.type === AST_NODE_TYPES.CallExpression ||
          node.parent.parent.type === AST_NODE_TYPES.JSXExpressionContainer
        ) {
          return true;
        }
      }

      return false;
    }

    function checkFunctionBody(node: TSESTree.ArrowFunctionExpression | TSESTree.FunctionExpression) {
      if (!isCallbackInJSX(node)) {
        return;
      }

      const { body } = node;

      if (body.type !== AST_NODE_TYPES.BlockStatement) {
        return;
      }

      body.body.forEach((statement) => {
        if (statement.type === AST_NODE_TYPES.VariableDeclaration) {
          context.report({
            node: statement,
            messageId: "noVariableInCallback",
          });
        }
      });
    }

    return {
      ArrowFunctionExpression: checkFunctionBody,
      FunctionExpression: checkFunctionBody,
    };
  },
});

export default jsxNoVariableInCallback;
