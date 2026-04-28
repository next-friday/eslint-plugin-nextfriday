import { AST_NODE_TYPES, ESLintUtils } from "@typescript-eslint/utils";

const createRule = ESLintUtils.RuleCreator(
  (name) =>
    `https://github.com/next-friday/eslint-plugin-nextfriday/blob/main/docs/rules/${name.replaceAll("-", "_").toUpperCase()}.md`,
);

const jsxSpreadPropsLast = createRule({
  name: "jsx-spread-props-last",
  meta: {
    type: "suggestion",
    docs: {
      description: "Enforce JSX spread attributes appear after all other props",
    },
    messages: {
      spreadNotLast: "JSX spread attributes must come after all other props.",
    },
    schema: [],
  },
  defaultOptions: [],
  create(context) {
    return {
      JSXOpeningElement(node) {
        const { attributes } = node;

        let lastNonSpreadIndex = -1;

        attributes.forEach((attribute, index) => {
          if (attribute.type !== AST_NODE_TYPES.JSXSpreadAttribute) {
            lastNonSpreadIndex = index;
          }
        });

        attributes.forEach((attribute, index) => {
          if (attribute.type === AST_NODE_TYPES.JSXSpreadAttribute && index < lastNonSpreadIndex) {
            context.report({
              node: attribute,
              messageId: "spreadNotLast",
            });
          }
        });
      },
    };
  },
});

export default jsxSpreadPropsLast;
