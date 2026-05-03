import { AST_NODE_TYPES, ESLintUtils } from "@typescript-eslint/utils";

import { getFileExtension } from "../utils";

import type { TSESTree } from "@typescript-eslint/utils";

const createRule = ESLintUtils.RuleCreator(
  (name) =>
    `https://github.com/next-friday/eslint-plugin-nextfriday/blob/main/docs/rules/${name.replaceAll("-", "_").toUpperCase()}.md`,
);

const ARRAY_RETURNING_METHODS = new Set(["map", "flatMap", "filter"]);

function hasRenderPrefix(name: string): boolean {
  if (!name.startsWith("render")) {
    return false;
  }
  if (name.length === "render".length) {
    return true;
  }
  const nextChar = name["render".length];
  return nextChar === nextChar.toUpperCase() && nextChar !== nextChar.toLowerCase();
}

function functionBodyReturnsJsx(body: TSESTree.BlockStatement | TSESTree.Expression): boolean {
  if (body.type === AST_NODE_TYPES.JSXElement || body.type === AST_NODE_TYPES.JSXFragment) {
    return true;
  }

  if (body.type === AST_NODE_TYPES.ConditionalExpression) {
    return isJsxProducingExpression(body.consequent) || isJsxProducingExpression(body.alternate);
  }

  if (body.type === AST_NODE_TYPES.LogicalExpression) {
    return isJsxProducingExpression(body.right);
  }

  if (body.type !== AST_NODE_TYPES.BlockStatement) {
    return false;
  }

  for (const statement of body.body) {
    if (statement.type === AST_NODE_TYPES.ReturnStatement && statement.argument) {
      if (isJsxProducingExpression(statement.argument)) {
        return true;
      }
    }
  }

  return false;
}

function isJsxProducingExpression(node: TSESTree.Expression): boolean {
  if (node.type === AST_NODE_TYPES.JSXElement || node.type === AST_NODE_TYPES.JSXFragment) {
    return true;
  }

  if (node.type === AST_NODE_TYPES.ConditionalExpression) {
    return isJsxProducingExpression(node.consequent) || isJsxProducingExpression(node.alternate);
  }

  if (node.type === AST_NODE_TYPES.LogicalExpression) {
    return isJsxProducingExpression(node.right);
  }

  if (node.type === AST_NODE_TYPES.ArrayExpression) {
    return node.elements.some((element) => {
      if (!element || element.type === AST_NODE_TYPES.SpreadElement) {
        return false;
      }
      return isJsxProducingExpression(element as TSESTree.Expression);
    });
  }

  if (node.type === AST_NODE_TYPES.ArrowFunctionExpression || node.type === AST_NODE_TYPES.FunctionExpression) {
    return functionBodyReturnsJsx(node.body);
  }

  if (node.type === AST_NODE_TYPES.CallExpression) {
    if (
      node.callee.type === AST_NODE_TYPES.MemberExpression &&
      node.callee.property.type === AST_NODE_TYPES.Identifier &&
      ARRAY_RETURNING_METHODS.has(node.callee.property.name)
    ) {
      const callback = node.arguments[0];
      if (
        callback &&
        (callback.type === AST_NODE_TYPES.ArrowFunctionExpression ||
          callback.type === AST_NODE_TYPES.FunctionExpression)
      ) {
        return functionBodyReturnsJsx(callback.body);
      }
    }
  }

  if (node.type === AST_NODE_TYPES.TSAsExpression || node.type === AST_NODE_TYPES.TSSatisfiesExpression) {
    return isJsxProducingExpression(node.expression);
  }

  return false;
}

function isPascalCase(name: string): boolean {
  return /^[A-Z]/.test(name);
}

function isComponentFunction(
  node: TSESTree.ArrowFunctionExpression | TSESTree.FunctionDeclaration | TSESTree.FunctionExpression,
): boolean {
  if (node.type === AST_NODE_TYPES.FunctionDeclaration && node.id && isPascalCase(node.id.name)) {
    return true;
  }

  const parent = node.parent;
  if (
    parent?.type === AST_NODE_TYPES.VariableDeclarator &&
    parent.id.type === AST_NODE_TYPES.Identifier &&
    isPascalCase(parent.id.name)
  ) {
    return true;
  }

  return false;
}

const enforceRenderNaming = createRule({
  name: "enforce-render-naming",
  meta: {
    type: "problem",
    docs: {
      description: "Enforce 'render' prefix for variables that hold or return JSX inside React components",
    },
    schema: [],
    messages: {
      missingRenderPrefix:
        "Variable '{{ name }}' holds JSX-producing content inside a component. Rename it to 'render{{ pascalName }}' so the intent is explicit.",
    },
  },
  defaultOptions: [],
  create(context) {
    const { filename } = context;
    const extension = getFileExtension(filename);

    if (extension !== "tsx" && extension !== "jsx") {
      return {};
    }

    const componentStack: boolean[] = [];

    function isInsideComponent(): boolean {
      return componentStack.some((value) => value);
    }

    function pushFunction(
      node: TSESTree.ArrowFunctionExpression | TSESTree.FunctionDeclaration | TSESTree.FunctionExpression,
    ) {
      componentStack.push(isComponentFunction(node));
    }

    function popFunction() {
      componentStack.pop();
    }

    return {
      ArrowFunctionExpression: pushFunction,
      FunctionDeclaration: pushFunction,
      FunctionExpression: pushFunction,
      "ArrowFunctionExpression:exit": popFunction,
      "FunctionDeclaration:exit": popFunction,
      "FunctionExpression:exit": popFunction,
      VariableDeclarator(node: TSESTree.VariableDeclarator) {
        if (!isInsideComponent()) {
          return;
        }

        if (node.id.type !== AST_NODE_TYPES.Identifier) {
          return;
        }

        if (!node.init) {
          return;
        }

        if (!isJsxProducingExpression(node.init)) {
          return;
        }

        const name = node.id.name;
        if (hasRenderPrefix(name)) {
          return;
        }

        const pascalName = name.charAt(0).toUpperCase() + name.slice(1);

        context.report({
          node: node.id,
          messageId: "missingRenderPrefix",
          data: { name, pascalName },
        });
      },
    };
  },
});

export default enforceRenderNaming;
