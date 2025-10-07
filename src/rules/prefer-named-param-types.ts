import { AST_NODE_TYPES, ESLintUtils } from "@typescript-eslint/utils";

import type { TSESTree } from "@typescript-eslint/utils";

const createRule = ESLintUtils.RuleCreator(
  (name) =>
    `https://github.com/next-friday/eslint-plugin-nextfriday/blob/main/docs/rules/${name.replace(/-/g, "_").toUpperCase()}.md`,
);

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
