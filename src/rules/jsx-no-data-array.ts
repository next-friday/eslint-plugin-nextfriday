import { AST_NODE_TYPES, ESLintUtils } from "@typescript-eslint/utils";

import { getFileExtension } from "../utils";

import type { TSESTree } from "@typescript-eslint/utils";

const createRule = ESLintUtils.RuleCreator(
  (name) =>
    `https://github.com/next-friday/eslint-plugin-nextfriday/blob/main/docs/rules/${name.replaceAll("-", "_").toUpperCase()}.md`,
);

function isObjectLikeElement(node: TSESTree.Expression | TSESTree.SpreadElement | null): boolean {
  if (!node) {
    return false;
  }

  if (node.type === AST_NODE_TYPES.ObjectExpression) {
    return true;
  }

  if (node.type === AST_NODE_TYPES.TSAsExpression || node.type === AST_NODE_TYPES.TSSatisfiesExpression) {
    return isObjectLikeElement(node.expression);
  }

  return false;
}

function getArrayInitializer(init: TSESTree.Expression | null): TSESTree.ArrayExpression | null {
  if (!init) {
    return null;
  }

  if (init.type === AST_NODE_TYPES.ArrayExpression) {
    return init;
  }

  if (init.type === AST_NODE_TYPES.TSAsExpression || init.type === AST_NODE_TYPES.TSSatisfiesExpression) {
    return getArrayInitializer(init.expression);
  }

  return null;
}

const jsxNoDataArray = createRule({
  name: "jsx-no-data-array",
  meta: {
    type: "problem",
    docs: {
      description: "Disallow top-level arrays of object literals in .tsx/.jsx files (extract to a data file)",
    },
    schema: [],
    messages: {
      noDataArray:
        "Top-level array of object literals belongs in a data file (e.g. *.data.ts), not a .tsx/.jsx component file. Extract '{{ name }}' to a sibling data module.",
    },
  },
  defaultOptions: [],
  create(context) {
    const { filename } = context;
    const extension = getFileExtension(filename);

    if (extension !== "tsx" && extension !== "jsx") {
      return {};
    }

    return {
      "Program > VariableDeclaration > VariableDeclarator": function checkDeclarator(
        node: TSESTree.VariableDeclarator,
      ) {
        const arrayInit = getArrayInitializer(node.init);
        if (!arrayInit) {
          return;
        }

        const hasObjectElement = arrayInit.elements.some((element) => isObjectLikeElement(element));
        if (!hasObjectElement) {
          return;
        }

        const name = node.id.type === AST_NODE_TYPES.Identifier ? node.id.name : "<destructured>";

        context.report({
          node,
          messageId: "noDataArray",
          data: { name },
        });
      },
      "Program > ExportNamedDeclaration > VariableDeclaration > VariableDeclarator": function checkExportedDeclarator(
        node: TSESTree.VariableDeclarator,
      ) {
        const arrayInit = getArrayInitializer(node.init);
        if (!arrayInit) {
          return;
        }

        const hasObjectElement = arrayInit.elements.some((element) => isObjectLikeElement(element));
        if (!hasObjectElement) {
          return;
        }

        const name = node.id.type === AST_NODE_TYPES.Identifier ? node.id.name : "<destructured>";

        context.report({
          node,
          messageId: "noDataArray",
          data: { name },
        });
      },
    };
  },
});

export default jsxNoDataArray;
