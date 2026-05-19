import { AST_NODE_TYPES, ESLintUtils } from "@typescript-eslint/utils";

import { isConfigFile } from "../utils";

import type { TSESTree } from "@typescript-eslint/utils";

const createRule = ESLintUtils.RuleCreator(
  (name) =>
    `https://github.com/next-friday/eslint-plugin-nextfriday/blob/main/docs/rules/${name.replaceAll("-", "_").toUpperCase()}.md`,
);

const SCREAMING_SNAKE_CASE_REGEX = /^[A-Z][A-Z0-9]*(?:_[A-Z0-9]+)*$/;
const SNAKE_CASE_REGEX = /^[a-z]+_[a-z0-9_]*$/;

const toScreamingSnakeCase = (str: string): string =>
  str
    .replace(/([a-z])([A-Z])/g, "$1_$2")
    .replace(/([A-Z])([A-Z][a-z])/g, "$1_$2")
    .toUpperCase();

const isMagicLiteral = (init: TSESTree.Expression): boolean => {
  if (init.type === AST_NODE_TYPES.Literal) {
    return (
      typeof init.value === "string" ||
      typeof init.value === "number" ||
      typeof init.value === "bigint" ||
      "regex" in init
    );
  }

  if (init.type === AST_NODE_TYPES.UnaryExpression) {
    const { argument, operator } = init;
    if (operator !== "-" && operator !== "+") {
      return false;
    }
    return (
      argument.type === AST_NODE_TYPES.Literal &&
      (typeof argument.value === "number" || typeof argument.value === "bigint")
    );
  }

  if (init.type === AST_NODE_TYPES.NewExpression) {
    if (init.callee.type !== AST_NODE_TYPES.Identifier || init.callee.name !== "RegExp") {
      return false;
    }
    return init.arguments.every((arg) => arg.type === AST_NODE_TYPES.Literal && typeof arg.value === "string");
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

const enforceConstantCase = createRule({
  name: "enforce-constant-case",
  meta: {
    type: "suggestion",
    docs: {
      description: "Enforce SCREAMING_SNAKE_CASE for global magic-number, magic-text, bigint, and RegExp constants",
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

          if (!isMagicLiteral(declarator.init)) {
            return;
          }

          const { name } = declarator.id;

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
