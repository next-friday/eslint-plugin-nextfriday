import { ESLintUtils, AST_NODE_TYPES, type TSESTree } from "@typescript-eslint/utils";

const createRule = ESLintUtils.RuleCreator(
  (name) =>
    `https://github.com/next-friday/eslint-plugin-nextfriday/blob/main/docs/rules/${name.replaceAll("-", "_").toUpperCase()}.md`,
);

const isTsFile = (filename: string): boolean => filename.endsWith(".ts") && !filename.endsWith(".d.ts");

const isCallbackContext = (node: TSESTree.ArrowFunctionExpression | TSESTree.FunctionExpression): boolean => {
  const { parent } = node;

  if (!parent) {
    return false;
  }

  if (parent.type === AST_NODE_TYPES.CallExpression && parent.arguments.includes(node)) {
    return true;
  }

  if (parent.type === AST_NODE_TYPES.NewExpression && parent.arguments.includes(node as TSESTree.Expression)) {
    return true;
  }

  if (parent.type === AST_NODE_TYPES.ReturnStatement) {
    return true;
  }

  if (parent.type === AST_NODE_TYPES.Property) {
    return true;
  }

  if (parent.type === AST_NODE_TYPES.ArrayExpression) {
    return true;
  }

  if (parent.type === AST_NODE_TYPES.ConditionalExpression) {
    return true;
  }

  if (parent.type === AST_NODE_TYPES.LogicalExpression) {
    return true;
  }

  if (parent.type === AST_NODE_TYPES.AssignmentExpression && parent.left !== node) {
    return true;
  }

  return false;
};

const preferFunctionDeclaration = createRule({
  name: "prefer-function-declaration",
  meta: {
    type: "suggestion",
    docs: {
      description:
        "Enforce function declarations over arrow functions assigned to variables in .ts files for better readability and hoisting",
    },
    messages: {
      preferDeclaration:
        "Use function declaration instead of arrow function. Replace 'const {{name}} = () => ...' with 'function {{name}}() ...'",
      preferDeclarationExpr:
        "Use function declaration instead of function expression. Replace 'const {{name}} = function() ...' with 'function {{name}}() ...'",
    },
    schema: [],
  },
  defaultOptions: [],
  create(context) {
    const { filename } = context;

    if (!isTsFile(filename)) {
      return {};
    }

    return {
      VariableDeclarator(node) {
        if (node.id.type !== AST_NODE_TYPES.Identifier) {
          return;
        }

        const { init } = node;

        if (!init) {
          return;
        }

        if (init.type === AST_NODE_TYPES.ArrowFunctionExpression) {
          if (isCallbackContext(init)) {
            return;
          }

          context.report({
            node: init,
            messageId: "preferDeclaration",
            data: { name: node.id.name },
          });
        }

        if (init.type === AST_NODE_TYPES.FunctionExpression) {
          if (isCallbackContext(init)) {
            return;
          }

          context.report({
            node: init,
            messageId: "preferDeclarationExpr",
            data: { name: node.id.name },
          });
        }
      },
    };
  },
});

export default preferFunctionDeclaration;
