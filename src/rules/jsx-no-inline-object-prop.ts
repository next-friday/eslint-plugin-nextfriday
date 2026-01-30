import { ESLintUtils, AST_NODE_TYPES } from "@typescript-eslint/utils";

const createRule = ESLintUtils.RuleCreator(
  (name) =>
    `https://github.com/next-friday/eslint-plugin-nextfriday/blob/main/docs/rules/${name.replaceAll("-", "_").toUpperCase()}.md`,
);

const jsxNoInlineObjectProp = createRule({
  name: "jsx-no-inline-object-prop",
  meta: {
    type: "suggestion",
    docs: {
      description: "Disallow inline object literals in JSX props - extract to const first",
    },
    messages: {
      noInlineObject:
        "Avoid inline object literals in JSX props. Extract to a const variable first for better readability and performance.",
    },
    schema: [],
  },
  defaultOptions: [],
  create(context) {
    return {
      JSXAttribute(node) {
        if (
          node.value?.type === AST_NODE_TYPES.JSXExpressionContainer &&
          node.value.expression.type === AST_NODE_TYPES.ObjectExpression
        ) {
          context.report({
            node: node.value,
            messageId: "noInlineObject",
          });
        }
      },
    };
  },
});

export default jsxNoInlineObjectProp;
