import { AST_NODE_TYPES, ESLintUtils } from "@typescript-eslint/utils";

import type { TSESTree } from "@typescript-eslint/utils";

const createRule = ESLintUtils.RuleCreator(
  (name) =>
    `https://github.com/next-friday/eslint-plugin-nextfriday/blob/main/docs/rules/${name.replaceAll("-", "_").toUpperCase()}.md`,
);

const SNAKE_CASE_REGEX = /^[a-z]+_[a-z0-9_]*$/;
const PASCAL_CASE_REGEX = /^[A-Z][a-zA-Z0-9]*$/;

const REACT_WRAPPERS = ["memo", "forwardRef", "lazy"];

const returnsJsx = (node: TSESTree.Node): boolean => {
  if (node.type === AST_NODE_TYPES.JSXElement || node.type === AST_NODE_TYPES.JSXFragment) {
    return true;
  }

  if (node.type === AST_NODE_TYPES.ConditionalExpression) {
    return returnsJsx(node.consequent) || returnsJsx(node.alternate);
  }

  if (node.type === AST_NODE_TYPES.LogicalExpression) {
    return returnsJsx(node.left) || returnsJsx(node.right);
  }

  return false;
};

const bodyReturnsJsx = (body: TSESTree.BlockStatement | TSESTree.Expression): boolean => {
  if (body.type !== AST_NODE_TYPES.BlockStatement) {
    return returnsJsx(body);
  }

  return body.body.some(
    (stmt) => stmt.type === AST_NODE_TYPES.ReturnStatement && stmt.argument !== null && returnsJsx(stmt.argument),
  );
};

const isComponentFunction = (init: TSESTree.Expression): boolean => {
  if (init.type === AST_NODE_TYPES.ArrowFunctionExpression || init.type === AST_NODE_TYPES.FunctionExpression) {
    return bodyReturnsJsx(init.body);
  }

  if (init.type === AST_NODE_TYPES.CallExpression) {
    const { callee } = init;

    if (callee.type === AST_NODE_TYPES.Identifier && REACT_WRAPPERS.includes(callee.name)) {
      return true;
    }

    if (
      callee.type === AST_NODE_TYPES.MemberExpression &&
      callee.object.type === AST_NODE_TYPES.Identifier &&
      callee.object.name === "React" &&
      callee.property.type === AST_NODE_TYPES.Identifier &&
      REACT_WRAPPERS.includes(callee.property.name)
    ) {
      return true;
    }
  }

  return false;
};

const isGlobalScope = (node: TSESTree.Node): boolean => {
  const declaration = node.parent;

  if (!declaration || declaration.type !== AST_NODE_TYPES.VariableDeclaration) {
    return false;
  }

  const { parent } = declaration;

  if (parent.type === AST_NODE_TYPES.Program) {
    return true;
  }

  if (parent.type === AST_NODE_TYPES.ExportNamedDeclaration && parent.parent?.type === AST_NODE_TYPES.Program) {
    return true;
  }

  return false;
};

const isStaticValue = (init: TSESTree.Expression): boolean => {
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

  if (
    init.type === AST_NODE_TYPES.TSAsExpression &&
    init.typeAnnotation.type === AST_NODE_TYPES.TSTypeReference &&
    init.typeAnnotation.typeName.type === AST_NODE_TYPES.Identifier &&
    init.typeAnnotation.typeName.name === "const"
  ) {
    return true;
  }

  return false;
};

const enforceCamelCase = createRule({
  name: "enforce-camel-case",
  meta: {
    type: "suggestion",
    docs: {
      description:
        "Enforce camelCase for variables and functions, ban snake_case, and restrict PascalCase to React components",
    },
    messages: {
      noSnakeCase: "Variable '{{ name }}' should not use snake_case. Use camelCase instead.",
      pascalCaseReserved:
        "Variable '{{ name }}' uses PascalCase but is not a React component. PascalCase is reserved for components.",
    },
    schema: [],
  },
  defaultOptions: [],
  create(context) {
    return {
      VariableDeclarator(node) {
        if (node.id.type !== AST_NODE_TYPES.Identifier) {
          return;
        }

        const { name } = node.id;

        if (SNAKE_CASE_REGEX.test(name)) {
          const declaration = node.parent;

          if (declaration.kind === "const" && isGlobalScope(node) && node.init && isStaticValue(node.init)) {
            return;
          }

          context.report({
            node: node.id,
            messageId: "noSnakeCase",
            data: { name },
          });

          return;
        }

        if (!node.init || !PASCAL_CASE_REGEX.test(name)) {
          return;
        }

        if (isComponentFunction(node.init)) {
          return;
        }

        if (
          node.init.type !== AST_NODE_TYPES.ArrowFunctionExpression &&
          node.init.type !== AST_NODE_TYPES.FunctionExpression &&
          node.init.type !== AST_NODE_TYPES.CallExpression
        ) {
          return;
        }

        context.report({
          node: node.id,
          messageId: "pascalCaseReserved",
          data: { name },
        });
      },
      FunctionDeclaration(node) {
        if (!node.id) {
          return;
        }

        const { name } = node.id;

        if (SNAKE_CASE_REGEX.test(name)) {
          context.report({
            node: node.id,
            messageId: "noSnakeCase",
            data: { name },
          });
        }
      },
    };
  },
});

export default enforceCamelCase;
