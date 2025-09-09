import { AST_NODE_TYPES, ESLintUtils } from "@typescript-eslint/utils";

import type { TSESTree } from "@typescript-eslint/utils";

const createRule = ESLintUtils.RuleCreator(
  (name) => `https://github.com/next-friday/eslint-plugin-nextfriday/blob/main/docs/rules/${name}.md`,
);

const reactPropsDestructure = createRule({
  name: "react-props-destructure",
  meta: {
    type: "suggestion",
    docs: {
      description: "Enforce destructuring props inside React component body instead of parameters",
    },
    fixable: undefined,
    schema: [],
    messages: {
      noParameterDestructuring:
        "Destructure props inside component body instead of parameters. Use 'const { {{properties}} } = props;'",
    },
  },
  defaultOptions: [],
  create(context) {
    function hasJSXInConditional(node: TSESTree.ConditionalExpression): boolean {
      return (
        node.consequent.type === AST_NODE_TYPES.JSXElement ||
        node.consequent.type === AST_NODE_TYPES.JSXFragment ||
        node.alternate.type === AST_NODE_TYPES.JSXElement ||
        node.alternate.type === AST_NODE_TYPES.JSXFragment
      );
    }

    function hasJSXInLogical(node: TSESTree.LogicalExpression): boolean {
      return node.right.type === AST_NODE_TYPES.JSXElement || node.right.type === AST_NODE_TYPES.JSXFragment;
    }

    function hasJSXReturn(block: TSESTree.BlockStatement): boolean {
      return block.body.some((stmt) => {
        if (stmt.type === AST_NODE_TYPES.ReturnStatement && stmt.argument) {
          return (
            stmt.argument.type === AST_NODE_TYPES.JSXElement ||
            stmt.argument.type === AST_NODE_TYPES.JSXFragment ||
            (stmt.argument.type === AST_NODE_TYPES.ConditionalExpression && hasJSXInConditional(stmt.argument)) ||
            (stmt.argument.type === AST_NODE_TYPES.LogicalExpression && hasJSXInLogical(stmt.argument))
          );
        }
        return false;
      });
    }

    function isReactComponent(
      node: TSESTree.ArrowFunctionExpression | TSESTree.FunctionExpression | TSESTree.FunctionDeclaration,
    ) {
      // Check if function returns JSX
      if (node.type === AST_NODE_TYPES.ArrowFunctionExpression) {
        // Arrow function with direct JSX return: () => <div>
        if (node.body.type === AST_NODE_TYPES.JSXElement || node.body.type === AST_NODE_TYPES.JSXFragment) {
          return true;
        }

        // Arrow function with block body that returns JSX
        if (node.body.type === AST_NODE_TYPES.BlockStatement) {
          return hasJSXReturn(node.body);
        }
      } else if (node.type === AST_NODE_TYPES.FunctionExpression || node.type === AST_NODE_TYPES.FunctionDeclaration) {
        // Regular function/declaration with block body
        if (node.body && node.body.type === AST_NODE_TYPES.BlockStatement) {
          return hasJSXReturn(node.body);
        }
      }

      return false;
    }

    function checkFunction(
      node: TSESTree.ArrowFunctionExpression | TSESTree.FunctionExpression | TSESTree.FunctionDeclaration,
    ) {
      // Skip if not a React component
      if (!isReactComponent(node)) {
        return;
      }

      // Skip if no parameters or more than one parameter
      if (node.params.length !== 1) {
        return;
      }

      const param = node.params[0];

      // Check if parameter is object destructuring
      if (param.type === AST_NODE_TYPES.ObjectPattern) {
        // Extract destructured properties
        const properties = param.properties
          .filter((prop): prop is TSESTree.Property => prop.type === AST_NODE_TYPES.Property)
          .map((prop) => {
            if (prop.key.type === AST_NODE_TYPES.Identifier) {
              return prop.key.name;
            }
            return null;
          })
          .filter((name): name is string => name !== null);

        if (properties.length === 0) {
          return;
        }

        context.report({
          node: param,
          messageId: "noParameterDestructuring",
          data: {
            properties: properties.join(", "),
          },
        });
      }
    }

    return {
      ArrowFunctionExpression: checkFunction,
      FunctionExpression: checkFunction,
      FunctionDeclaration: checkFunction,
    };
  },
});

export default reactPropsDestructure;
