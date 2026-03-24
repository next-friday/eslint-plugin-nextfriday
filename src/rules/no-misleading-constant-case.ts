import { AST_NODE_TYPES, ESLintUtils } from "@typescript-eslint/utils";

import type { TSESTree } from "@typescript-eslint/utils";

const createRule = ESLintUtils.RuleCreator(
  (name) =>
    `https://github.com/next-friday/eslint-plugin-nextfriday/blob/main/docs/rules/${name.replaceAll("-", "_").toUpperCase()}.md`,
);

const SCREAMING_SNAKE_CASE_REGEX = /^[A-Z][A-Z0-9]*(?:_[A-Z0-9]+)*$/;

const isAsConstAssertion = (node: TSESTree.Expression): boolean =>
  node.type === AST_NODE_TYPES.TSAsExpression &&
  node.typeAnnotation.type === AST_NODE_TYPES.TSTypeReference &&
  node.typeAnnotation.typeName.type === AST_NODE_TYPES.Identifier &&
  node.typeAnnotation.typeName.name === "const";

const isStaticValue = (init: TSESTree.Expression): boolean => {
  if (isAsConstAssertion(init)) {
    return true;
  }

  if (init.type === AST_NODE_TYPES.Literal) {
    return true;
  }

  if (init.type === AST_NODE_TYPES.UnaryExpression && init.argument.type === AST_NODE_TYPES.Literal) {
    return true;
  }

  if (init.type === AST_NODE_TYPES.TemplateLiteral && init.expressions.length === 0) {
    return true;
  }

  if (init.type === AST_NODE_TYPES.ArrayExpression) {
    return init.elements.every((el) => el !== null && el.type !== AST_NODE_TYPES.SpreadElement && isStaticValue(el));
  }

  if (init.type === AST_NODE_TYPES.ObjectExpression) {
    return init.properties.every(
      (prop) => prop.type === AST_NODE_TYPES.Property && isStaticValue(prop.value as TSESTree.Expression),
    );
  }

  return false;
};

const isGlobalScope = (node: TSESTree.VariableDeclaration): boolean => {
  const { parent } = node;

  if (parent.type === AST_NODE_TYPES.Program) {
    return true;
  }

  if (parent.type === AST_NODE_TYPES.ExportNamedDeclaration && parent.parent?.type === AST_NODE_TYPES.Program) {
    return true;
  }

  return false;
};

const noMisleadingConstantCase = createRule({
  name: "no-misleading-constant-case",
  meta: {
    type: "suggestion",
    docs: {
      description: "Disallow SCREAMING_SNAKE_CASE for non-constant or non-static values",
    },
    messages: {
      mutableScreamingCase:
        "Variable '{{ name }}' uses SCREAMING_SNAKE_CASE but is declared with '{{ kind }}'. Use camelCase for mutable bindings.",
      dynamicScreamingCase:
        "Constant '{{ name }}' uses SCREAMING_SNAKE_CASE but its value is not a static primitive. Use camelCase for dynamic or computed values.",
      localScreamingCase:
        "Local variable '{{ name }}' should use camelCase. SCREAMING_SNAKE_CASE is reserved for global constants.",
    },
    schema: [],
  },
  defaultOptions: [],
  create(context) {
    return {
      VariableDeclaration(node) {
        node.declarations.forEach((declarator) => {
          if (declarator.id.type !== AST_NODE_TYPES.Identifier) {
            return;
          }

          const { name } = declarator.id;

          if (!SCREAMING_SNAKE_CASE_REGEX.test(name)) {
            return;
          }

          if (node.kind === "let" || node.kind === "var") {
            context.report({
              node: declarator.id,
              messageId: "mutableScreamingCase",
              data: { name, kind: node.kind },
            });

            return;
          }

          if (!isGlobalScope(node)) {
            context.report({
              node: declarator.id,
              messageId: "localScreamingCase",
              data: { name },
            });

            return;
          }

          if (!declarator.init) {
            return;
          }

          if (!isStaticValue(declarator.init)) {
            context.report({
              node: declarator.id,
              messageId: "dynamicScreamingCase",
              data: { name },
            });
          }
        });
      },
    };
  },
});

export default noMisleadingConstantCase;
