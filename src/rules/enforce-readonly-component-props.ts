import { AST_NODE_TYPES, ESLintUtils } from "@typescript-eslint/utils";

import type { TSESTree } from "@typescript-eslint/utils";

const createRule = ESLintUtils.RuleCreator(
  (name) =>
    `https://github.com/next-friday/eslint-plugin-nextfriday/blob/main/docs/rules/${name.replaceAll("-", "_").toUpperCase()}.md`,
);

const enforceReadonlyComponentProps = createRule({
  name: "enforce-readonly-component-props",
  meta: {
    type: "suggestion",
    docs: {
      description: "Enforce Readonly wrapper for React component props when using named types or interfaces",
    },
    fixable: "code",
    schema: [],
    messages: {
      useReadonly: "Component props should be wrapped with Readonly<> for immutability",
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

    function isNamedType(node: TSESTree.TypeNode): boolean {
      return node.type === AST_NODE_TYPES.TSTypeReference;
    }

    function isAlreadyReadonly(node: TSESTree.TypeNode): boolean {
      if (node.type === AST_NODE_TYPES.TSTypeReference && node.typeName) {
        if (node.typeName.type === AST_NODE_TYPES.Identifier && node.typeName.name === "Readonly") {
          return true;
        }
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
        if (isNamedType(typeAnnotation) && !isAlreadyReadonly(typeAnnotation)) {
          const { sourceCode } = context;
          const typeText = sourceCode.getText(typeAnnotation);
          context.report({
            node: param.typeAnnotation,
            messageId: "useReadonly",
            fix(fixer) {
              return fixer.replaceText(typeAnnotation, `Readonly<${typeText}>`);
            },
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

export default enforceReadonlyComponentProps;
