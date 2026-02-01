import { ESLintUtils, AST_NODE_TYPES } from "@typescript-eslint/utils";

const createRule = ESLintUtils.RuleCreator(
  (name) =>
    `https://github.com/next-friday/eslint-plugin-nextfriday/blob/main/docs/rules/${name.replaceAll("-", "_").toUpperCase()}.md`,
);

const jsxSimpleProps = createRule({
  name: "jsx-simple-props",
  meta: {
    type: "suggestion",
    docs: {
      description: "Enforce JSX props to only contain strings, simple variables, or ReactNode elements",
    },
    messages: {
      noComplexProp:
        "JSX props should only contain strings, simple variables, or ReactNode elements. Extract complex expressions to a variable first.",
    },
    schema: [],
  },
  defaultOptions: [],
  create(context) {
    const allowedExpressionTypes = new Set([
      AST_NODE_TYPES.Identifier,
      AST_NODE_TYPES.Literal,
      AST_NODE_TYPES.JSXElement,
      AST_NODE_TYPES.JSXFragment,
      AST_NODE_TYPES.MemberExpression,
      AST_NODE_TYPES.ArrowFunctionExpression,
      AST_NODE_TYPES.FunctionExpression,
    ]);

    return {
      JSXAttribute(node) {
        if (!node.value) {
          return;
        }

        if (node.value.type === AST_NODE_TYPES.Literal) {
          return;
        }

        if (node.value.type === AST_NODE_TYPES.JSXExpressionContainer) {
          const { expression } = node.value;

          if (expression.type === AST_NODE_TYPES.JSXEmptyExpression) {
            return;
          }

          if (!allowedExpressionTypes.has(expression.type)) {
            context.report({
              node: node.value,
              messageId: "noComplexProp",
            });
          }
        }
      },
    };
  },
});

export default jsxSimpleProps;
