import { ESLintUtils, AST_NODE_TYPES, type TSESTree } from "@typescript-eslint/utils";

const createRule = ESLintUtils.RuleCreator(
  (name) =>
    `https://github.com/next-friday/eslint-plugin-nextfriday/blob/main/docs/rules/${name.replaceAll("-", "_").toUpperCase()}.md`,
);

type FunctionNode = TSESTree.FunctionDeclaration | TSESTree.FunctionExpression | TSESTree.ArrowFunctionExpression;

const isReactComponent = (node: FunctionNode): boolean => {
  if (node.type === AST_NODE_TYPES.ArrowFunctionExpression) {
    const { parent } = node;
    if (parent?.type === AST_NODE_TYPES.VariableDeclarator) {
      const { id } = parent;
      if (id.type === AST_NODE_TYPES.Identifier) {
        return /^[A-Z]/.test(id.name);
      }
    }
  }

  if (node.type === AST_NODE_TYPES.FunctionDeclaration && node.id) {
    return /^[A-Z]/.test(node.id.name);
  }

  return false;
};

const isCallbackFunction = (node: FunctionNode): boolean => {
  if (node.type === AST_NODE_TYPES.FunctionDeclaration) {
    return false;
  }

  const { parent } = node;

  if (!parent) {
    return false;
  }

  if (
    parent.type === AST_NODE_TYPES.CallExpression &&
    parent.arguments.includes(node as TSESTree.CallExpressionArgument)
  ) {
    return true;
  }

  if (parent.type === AST_NODE_TYPES.Property) {
    return true;
  }

  if (parent.type === AST_NODE_TYPES.ArrayExpression) {
    return true;
  }

  return false;
};

const getFunctionName = (node: FunctionNode): string | null => {
  if (node.type === AST_NODE_TYPES.FunctionDeclaration && node.id) {
    return node.id.name;
  }

  if (node.type === AST_NODE_TYPES.FunctionExpression && node.id) {
    return node.id.name;
  }

  if (
    (node.type === AST_NODE_TYPES.ArrowFunctionExpression || node.type === AST_NODE_TYPES.FunctionExpression) &&
    node.parent?.type === AST_NODE_TYPES.VariableDeclarator &&
    node.parent.id.type === AST_NODE_TYPES.Identifier
  ) {
    return node.parent.id.name;
  }

  return null;
};

const requireExplicitReturnType = createRule({
  name: "require-explicit-return-type",
  meta: {
    type: "suggestion",
    docs: {
      description: "Require explicit return types on functions for better code documentation and type safety",
    },
    messages: {
      missingReturnType:
        "Function '{{name}}' is missing an explicit return type. Add a return type annotation for better documentation.",
      missingReturnTypeAnonymous:
        "Function is missing an explicit return type. Add a return type annotation for better documentation.",
    },
    schema: [],
  },
  defaultOptions: [],
  create(context) {
    const checkFunction = (node: FunctionNode) => {
      if (node.returnType) {
        return;
      }

      if (isCallbackFunction(node)) {
        return;
      }

      if (isReactComponent(node)) {
        return;
      }

      const functionName = getFunctionName(node);

      if (functionName) {
        context.report({
          node,
          messageId: "missingReturnType",
          data: { name: functionName },
        });
      } else {
        context.report({
          node,
          messageId: "missingReturnTypeAnonymous",
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

export default requireExplicitReturnType;
