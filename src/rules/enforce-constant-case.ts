import { AST_NODE_TYPES, ESLintUtils } from "@typescript-eslint/utils";

import { isConfigFile } from "../utils";

import type { TSESTree } from "@typescript-eslint/utils";

const createRule = ESLintUtils.RuleCreator(
  (name) =>
    `https://github.com/next-friday/eslint-plugin-nextfriday/blob/main/docs/rules/${name.replaceAll("-", "_").toUpperCase()}.md`,
);

const SCREAMING_SNAKE_CASE_REGEX = /^[A-Z][A-Z0-9]*(?:_[A-Z0-9]+)*$/;
const SNAKE_CASE_REGEX = /^[a-z]+_[a-z0-9_]*$/;
const BOOLEAN_PREFIXES = ["is", "has", "should", "can", "did", "will", "was", "are", "does", "had"];

const toScreamingSnakeCase = (str: string): string =>
  str
    .replace(/([a-z])([A-Z])/g, "$1_$2")
    .replace(/([A-Z])([A-Z][a-z])/g, "$1_$2")
    .toUpperCase();

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

const isBooleanLiteral = (init: TSESTree.Expression): boolean =>
  init.type === AST_NODE_TYPES.Literal && typeof init.value === "boolean";

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

const isFunctionOrComponent = (init: TSESTree.Expression): boolean =>
  init.type === AST_NODE_TYPES.ArrowFunctionExpression || init.type === AST_NODE_TYPES.FunctionExpression;

const enforceConstantCase = createRule({
  name: "enforce-constant-case",
  meta: {
    type: "suggestion",
    docs: {
      description: "Enforce SCREAMING_SNAKE_CASE for global constant static values",
    },
    messages: {
      useScreamingSnakeCase: "Constant '{{ name }}' should use SCREAMING_SNAKE_CASE. Rename to '{{ suggestion }}'.",
      noSnakeCase: "Global constant '{{ name }}' should not use snake_case. Rename to '{{ suggestion }}'.",
    },
    schema: [],
  },
  defaultOptions: [],
  create(context) {
    if (isConfigFile(context.filename)) {
      return {};
    }

    return {
      VariableDeclaration(node) {
        if (node.kind !== "const" || !isGlobalScope(node)) {
          return;
        }

        node.declarations.forEach((declarator) => {
          if (declarator.id.type !== AST_NODE_TYPES.Identifier || !declarator.init) {
            return;
          }

          if (isFunctionOrComponent(declarator.init)) {
            return;
          }

          if (!isStaticValue(declarator.init)) {
            return;
          }

          const { name } = declarator.id;

          if (isBooleanLiteral(declarator.init) && startsWithBooleanPrefix(name)) {
            return;
          }

          if (SNAKE_CASE_REGEX.test(name)) {
            context.report({
              node: declarator.id,
              messageId: "noSnakeCase",
              data: { name, suggestion: toScreamingSnakeCase(name) },
            });

            return;
          }

          if (!SCREAMING_SNAKE_CASE_REGEX.test(name)) {
            context.report({
              node: declarator.id,
              messageId: "useScreamingSnakeCase",
              data: { name, suggestion: toScreamingSnakeCase(name) },
            });
          }
        });
      },
    };
  },
});

export default enforceConstantCase;
