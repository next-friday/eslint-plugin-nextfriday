import { AST_NODE_TYPES, ESLintUtils } from "@typescript-eslint/utils";

const createRule = ESLintUtils.RuleCreator(
  (name) =>
    `https://github.com/next-friday/eslint-plugin-nextfriday/blob/main/docs/rules/${name.replaceAll("-", "_").toUpperCase()}.md`,
);

const SCREAMING_SNAKE_CASE_REGEX = /^[A-Z][A-Z0-9]*(?:_[A-Z0-9]+)*$/;

const BOOLEAN_PREFIXES = ["is", "has", "should", "can", "did", "will", "was", "are", "does", "had"];

const toScreamingSnakeCase = (str: string): string =>
  str
    .replace(/([a-z])([A-Z])/g, "$1_$2")
    .replace(/([A-Z])([A-Z][a-z])/g, "$1_$2")
    .toUpperCase();

const isStaticTemplateLiteral = (node: { type: AST_NODE_TYPES; expressions?: unknown[] }): boolean =>
  node.type === AST_NODE_TYPES.TemplateLiteral && (node.expressions?.length ?? 0) === 0;

const startsWithBooleanPrefix = (name: string): boolean =>
  BOOLEAN_PREFIXES.some((prefix) => {
    if (!name.startsWith(prefix)) {
      return false;
    }

    if (name.length === prefix.length) {
      return true;
    }

    const nextChar = name.charAt(prefix.length);
    return nextChar === nextChar.toUpperCase() && nextChar !== nextChar.toLowerCase();
  });

const isBooleanLiteral = (init: { type: AST_NODE_TYPES; value?: unknown }): boolean =>
  init.type === AST_NODE_TYPES.Literal && typeof init.value === "boolean";

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
    const isStaticPrimitiveValue = (init: { type: AST_NODE_TYPES; expressions?: unknown[] }): boolean =>
      init.type === AST_NODE_TYPES.Literal ||
      init.type === AST_NODE_TYPES.UnaryExpression ||
      isStaticTemplateLiteral(init);

    return {
      VariableDeclaration(node) {
        if (node.kind !== "const") {
          return;
        }

        node.declarations.forEach((declarator) => {
          if (declarator.id.type !== AST_NODE_TYPES.Identifier || !declarator.init) {
            return;
          }

          if (!isStaticPrimitiveValue(declarator.init)) {
            return;
          }

          if (declarator.init.type === AST_NODE_TYPES.UnaryExpression) {
            const unary = declarator.init;
            if (unary.argument.type !== AST_NODE_TYPES.Literal) {
              return;
            }
          }

          const { name } = declarator.id;

          if (isBooleanLiteral(declarator.init) && startsWithBooleanPrefix(name)) {
            return;
          }

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
