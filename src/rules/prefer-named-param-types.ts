import { AST_NODE_TYPES, ESLintUtils } from "@typescript-eslint/utils";

import type { TSESTree } from "@typescript-eslint/utils";

const createRule = ESLintUtils.RuleCreator(
  (name) =>
    `https://github.com/next-friday/eslint-plugin-nextfriday/blob/main/docs/rules/${name.replaceAll("-", "_").toUpperCase()}.md`,
);

const returnsJsx = (node: TSESTree.Node): boolean => {
  if (node.type === AST_NODE_TYPES.JSXElement || node.type === AST_NODE_TYPES.JSXFragment) {
    return true;
  }
  if (node.type === AST_NODE_TYPES.ConditionalExpression) {
    return returnsJsx(node.consequent) || returnsJsx(node.alternate);
  }
  if (node.type === AST_NODE_TYPES.LogicalExpression) {
    return returnsJsx(node.left) || returnsJsx(node.right);
  }
  return false;
};

const bodyReturnsJsx = (body: TSESTree.BlockStatement | TSESTree.Expression): boolean => {
  if (body.type !== AST_NODE_TYPES.BlockStatement) {
    return returnsJsx(body);
  }
  return body.body.some(
    (stmt) => stmt.type === AST_NODE_TYPES.ReturnStatement && stmt.argument !== null && returnsJsx(stmt.argument),
  );
};

const isReactComponentFunction = (
  node: TSESTree.FunctionDeclaration | TSESTree.FunctionExpression | TSESTree.ArrowFunctionExpression,
): boolean => bodyReturnsJsx(node.body);

const preferNamedParamTypes = createRule({
  name: "prefer-named-param-types",
  meta: {
    type: "suggestion",
    docs: {
      description: "Enforce named interfaces/types instead of inline object types for function parameters",
    },
    messages: {
      preferNamedParamTypes:
        "Use a named interface or type for object parameter types instead of inline type annotations",
    },
    schema: [],
  },
  defaultOptions: [],
  create(context) {
    function hasInlineObjectType(param: TSESTree.Parameter): boolean {
      if (param.type === AST_NODE_TYPES.AssignmentPattern) {
        return hasInlineObjectType(param.left);
      }

      if (param.type === AST_NODE_TYPES.ObjectPattern) {
        if (param.typeAnnotation?.typeAnnotation.type === AST_NODE_TYPES.TSTypeLiteral) {
          return true;
        }
      }

      if (param.type === AST_NODE_TYPES.Identifier) {
        if (param.typeAnnotation?.typeAnnotation.type === AST_NODE_TYPES.TSTypeLiteral) {
          return true;
        }
      }

      return false;
    }

    function checkFunction(
      node:
        | TSESTree.FunctionDeclaration
        | TSESTree.FunctionExpression
        | TSESTree.ArrowFunctionExpression
        | TSESTree.TSMethodSignature
        | TSESTree.MethodDefinition,
    ) {
      let params: TSESTree.Parameter[] = [];

      if ("params" in node) {
        params = node.params;
      } else if ("value" in node && node.value) {
        params = node.value.params;
      }

      if (
        (node.type === AST_NODE_TYPES.FunctionDeclaration ||
          node.type === AST_NODE_TYPES.FunctionExpression ||
          node.type === AST_NODE_TYPES.ArrowFunctionExpression) &&
        params.length === 1 &&
        params[0].type === AST_NODE_TYPES.Identifier &&
        isReactComponentFunction(node)
      ) {
        return;
      }

      params.forEach((param) => {
        if (hasInlineObjectType(param)) {
          context.report({
            node: param,
            messageId: "preferNamedParamTypes",
          });
        }
      });
    }

    return {
      FunctionDeclaration: checkFunction,
      FunctionExpression: checkFunction,
      ArrowFunctionExpression: checkFunction,
      TSMethodSignature: checkFunction,
      MethodDefinition: checkFunction,
    };
  },
});

export default preferNamedParamTypes;
