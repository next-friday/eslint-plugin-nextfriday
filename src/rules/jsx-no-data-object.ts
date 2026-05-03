import { AST_NODE_TYPES, ESLintUtils } from "@typescript-eslint/utils";

import { getFileExtension } from "../utils";

import type { TSESTree } from "@typescript-eslint/utils";

const createRule = ESLintUtils.RuleCreator(
  (name) =>
    `https://github.com/next-friday/eslint-plugin-nextfriday/blob/main/docs/rules/${name.replaceAll("-", "_").toUpperCase()}.md`,
);

function unwrapAssertion(node: TSESTree.Expression | null): TSESTree.Expression | null {
  if (!node) {
    return null;
  }

  if (node.type === AST_NODE_TYPES.TSAsExpression || node.type === AST_NODE_TYPES.TSSatisfiesExpression) {
    return unwrapAssertion(node.expression);
  }

  return node;
}

function isNestedValue(value: TSESTree.Expression | null): boolean {
  const unwrapped = unwrapAssertion(value);
  if (!unwrapped) {
    return false;
  }

  if (unwrapped.type === AST_NODE_TYPES.ObjectExpression) {
    return true;
  }

  if (unwrapped.type === AST_NODE_TYPES.ArrayExpression) {
    return unwrapped.elements.some((element) => {
      if (!element || element.type === AST_NODE_TYPES.SpreadElement) {
        return false;
      }
      const inner = unwrapAssertion(element);
      return inner?.type === AST_NODE_TYPES.ObjectExpression || inner?.type === AST_NODE_TYPES.ArrayExpression;
    });
  }

  return false;
}

function hasNestedProperty(object: TSESTree.ObjectExpression): boolean {
  return object.properties.some((property) => {
    if (property.type !== AST_NODE_TYPES.Property) {
      return false;
    }
    if (property.value.type === AST_NODE_TYPES.AssignmentPattern) {
      return false;
    }
    return isNestedValue(property.value as TSESTree.Expression);
  });
}

function getObjectInitializer(init: TSESTree.Expression | null): TSESTree.ObjectExpression | null {
  const unwrapped = unwrapAssertion(init);
  if (!unwrapped) {
    return null;
  }

  if (unwrapped.type === AST_NODE_TYPES.ObjectExpression) {
    return unwrapped;
  }

  return null;
}

const jsxNoDataObject = createRule({
  name: "jsx-no-data-object",
  meta: {
    type: "problem",
    docs: {
      description: "Disallow top-level nested object literals in .tsx/.jsx files (extract to a data file)",
    },
    schema: [],
    messages: {
      noDataObject:
        "Top-level nested object literal belongs in a data file (e.g. *.data.ts), not a .tsx/.jsx component file. Extract '{{ name }}' to a sibling data module.",
    },
  },
  defaultOptions: [],
  create(context) {
    const { filename } = context;
    const extension = getFileExtension(filename);

    if (extension !== "tsx" && extension !== "jsx") {
      return {};
    }

    function checkDeclarator(node: TSESTree.VariableDeclarator) {
      const objectInit = getObjectInitializer(node.init);
      if (!objectInit) {
        return;
      }

      if (!hasNestedProperty(objectInit)) {
        return;
      }

      const name = node.id.type === AST_NODE_TYPES.Identifier ? node.id.name : "<destructured>";

      context.report({
        node,
        messageId: "noDataObject",
        data: { name },
      });
    }

    return {
      "Program > VariableDeclaration > VariableDeclarator": checkDeclarator,
      "Program > ExportNamedDeclaration > VariableDeclaration > VariableDeclarator": checkDeclarator,
    };
  },
});

export default jsxNoDataObject;
