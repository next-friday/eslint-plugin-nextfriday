import { ESLintUtils, AST_NODE_TYPES } from "@typescript-eslint/utils";

const createRule = ESLintUtils.RuleCreator(
  (name) =>
    `https://github.com/next-friday/eslint-plugin-nextfriday/blob/main/docs/rules/${name.replaceAll("-", "_").toUpperCase()}.md`,
);

const SCREAMING_SNAKE_CASE_REGEX = /^[A-Z][A-Z0-9]*(?:_[A-Z0-9]+)*$/;

const toScreamingSnakeCase = (str: string): string =>
  str
    .replace(/([a-z])([A-Z])/g, "$1_$2")
    .replace(/([A-Z])([A-Z][a-z])/g, "$1_$2")
    .toUpperCase();

const enforceConstantCase = createRule({
  name: "enforce-constant-case",
  meta: {
    type: "suggestion",
    docs: {
      description: "Enforce SCREAMING_SNAKE_CASE for constant primitive values",
    },
    messages: {
      useScreamingSnakeCase: "Constant '{{ name }}' should use SCREAMING_SNAKE_CASE. Rename to '{{ suggestion }}'.",
    },
    schema: [],
  },
  defaultOptions: [],
  create(context) {
    const isPrimitiveValue = (init: AST_NODE_TYPES): boolean =>
      init === AST_NODE_TYPES.Literal ||
      init === AST_NODE_TYPES.UnaryExpression ||
      init === AST_NODE_TYPES.TemplateLiteral;

    return {
      VariableDeclaration(node) {
        if (node.kind !== "const") {
          return;
        }

        node.declarations.forEach((declarator) => {
          if (declarator.id.type !== AST_NODE_TYPES.Identifier || !declarator.init) {
            return;
          }

          const initType = declarator.init.type;

          if (!isPrimitiveValue(initType)) {
            return;
          }

          if (initType === AST_NODE_TYPES.UnaryExpression) {
            const unary = declarator.init;
            if (unary.type !== AST_NODE_TYPES.UnaryExpression || unary.argument.type !== AST_NODE_TYPES.Literal) {
              return;
            }
          }

          const { name } = declarator.id;

          if (!SCREAMING_SNAKE_CASE_REGEX.test(name)) {
            context.report({
              node: declarator.id,
              messageId: "useScreamingSnakeCase",
              data: {
                name,
                suggestion: toScreamingSnakeCase(name),
              },
            });
          }
        });
      },
    };
  },
});

export default enforceConstantCase;
