import { AST_NODE_TYPES, ESLintUtils } from "@typescript-eslint/utils";

import type { TSESTree } from "@typescript-eslint/utils";

const createRule = ESLintUtils.RuleCreator(
  (name) => `https://github.com/next-friday/eslint-plugin-nextfriday/blob/main/docs/rules/${name}.md`,
);

const preferInterfaceOverInlineTypes = createRule({
  name: "prefer-interface-over-inline-types",
  meta: {
    type: "suggestion",
    docs: {
      description: "Enforce interface declarations over inline type annotations for React component props",
    },
    fixable: undefined,
    schema: [],
    messages: {
      useInterface: "Use interface declaration for component props instead of inline type annotation",
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
    ): boolean {
      if (node.type === AST_NODE_TYPES.ArrowFunctionExpression) {
        if (node.body.type === AST_NODE_TYPES.JSXElement || node.body.type === AST_NODE_TYPES.JSXFragment) {
          return true;
        }
        if (node.body.type === AST_NODE_TYPES.BlockStatement) {
          return hasJSXReturn(node.body);
        }
      } else if (node.type === AST_NODE_TYPES.FunctionExpression || node.type === AST_NODE_TYPES.FunctionDeclaration) {
        if (node.body && node.body.type === AST_NODE_TYPES.BlockStatement) {
          return hasJSXReturn(node.body);
        }
      }
      return false;
    }

    function isInlineTypeAnnotation(node: TSESTree.TypeNode): boolean {
      if (node.type === AST_NODE_TYPES.TSTypeLiteral) {
        return true;
      }
      if (node.type === AST_NODE_TYPES.TSUnionType) {
        return node.types.some((type) => type.type === AST_NODE_TYPES.TSTypeLiteral);
      }
      return false;
    }

    function hasComplexProps(node: TSESTree.TypeNode): boolean {
      if (node.type === AST_NODE_TYPES.TSTypeLiteral) {
        if (node.members.length > 2) {
          return true;
        }
        return node.members.some((member) => {
          if (member.type === AST_NODE_TYPES.TSPropertySignature && member.typeAnnotation) {
            const typeNode = member.typeAnnotation.typeAnnotation;
            return (
              typeNode.type === AST_NODE_TYPES.TSTypeLiteral ||
              typeNode.type === AST_NODE_TYPES.TSUnionType ||
              typeNode.type === AST_NODE_TYPES.TSArrayType
            );
          }
          return false;
        });
      }
      return false;
    }

    function checkFunction(
      node: TSESTree.ArrowFunctionExpression | TSESTree.FunctionExpression | TSESTree.FunctionDeclaration,
    ) {
      if (!isReactComponent(node)) {
        return;
      }
      if (node.params.length !== 1) {
        return;
      }
      const param = node.params[0];
      if (param.type === AST_NODE_TYPES.Identifier && param.typeAnnotation) {
        const { typeAnnotation } = param.typeAnnotation;
        if (isInlineTypeAnnotation(typeAnnotation) && hasComplexProps(typeAnnotation)) {
          context.report({
            node: param.typeAnnotation,
            messageId: "useInterface",
          });
        }
      }
    }

    return {
      ArrowFunctionExpression: checkFunction,
      FunctionExpression: checkFunction,
      FunctionDeclaration: checkFunction,
    };
  },
});

export default preferInterfaceOverInlineTypes;
