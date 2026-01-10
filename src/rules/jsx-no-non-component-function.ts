import { AST_NODE_TYPES, ESLintUtils } from "@typescript-eslint/utils";

import { getFileExtension } from "../utils";

import type { TSESTree } from "@typescript-eslint/utils";

const createRule = ESLintUtils.RuleCreator(
  (name) =>
    `https://github.com/next-friday/eslint-plugin-nextfriday/blob/main/docs/rules/${name.replaceAll("-", "_").toUpperCase()}.md`,
);

const jsxNoNonComponentFunction = createRule({
  name: "jsx-no-non-component-function",
  meta: {
    type: "problem",
    docs: {
      description: "Disallow non-component functions defined at top level in .tsx and .jsx files",
    },
    schema: [],
    messages: {
      noTopLevelFunction:
        "Non-component functions should not be defined at top level in .tsx/.jsx files. Either move it inside the component or extract it to a separate file.",
    },
  },
  defaultOptions: [],
  create(context) {
    const { filename } = context;
    const extension = getFileExtension(filename);

    if (extension !== "tsx" && extension !== "jsx") {
      return {};
    }

    function isReactComponent(node: TSESTree.ArrowFunctionExpression | TSESTree.FunctionDeclaration): boolean {
      const functionName = node.type === AST_NODE_TYPES.FunctionDeclaration && node.id ? node.id.name : null;

      if (functionName && /^[A-Z]/.test(functionName)) {
        return true;
      }

      if (node.returnType?.typeAnnotation) {
        const returnTypeNode = node.returnType.typeAnnotation;
        if (
          returnTypeNode.type === AST_NODE_TYPES.TSTypeReference &&
          returnTypeNode.typeName.type === AST_NODE_TYPES.Identifier
        ) {
          const typeName = returnTypeNode.typeName.name;
          if (typeName === "JSX" || typeName === "ReactElement" || typeName === "ReactNode") {
            return true;
          }
        }
      }

      return false;
    }

    function checkTopLevelFunction(
      node: TSESTree.ArrowFunctionExpression | TSESTree.FunctionDeclaration,
      declaratorNode?: TSESTree.VariableDeclarator,
    ) {
      if (isReactComponent(node)) {
        return;
      }

      const { parent } = node;
      if (!parent) {
        return;
      }

      if (
        parent.type === AST_NODE_TYPES.ExportDefaultDeclaration ||
        parent.type === AST_NODE_TYPES.ExportNamedDeclaration
      ) {
        return;
      }

      if (declaratorNode?.parent?.parent?.type === AST_NODE_TYPES.ExportNamedDeclaration) {
        return;
      }

      if (declaratorNode?.id.type === AST_NODE_TYPES.Identifier) {
        const varName = declaratorNode.id.name;
        if (/^[A-Z]/.test(varName)) {
          return;
        }
      }

      context.report({
        node: declaratorNode || node,
        messageId: "noTopLevelFunction",
      });
    }

    return {
      "Program > VariableDeclaration > VariableDeclarator > ArrowFunctionExpression": function checkArrowFunction(
        node: TSESTree.ArrowFunctionExpression,
      ) {
        const declarator = node.parent as TSESTree.VariableDeclarator;
        checkTopLevelFunction(node, declarator);
      },
      "Program > FunctionDeclaration": function checkFunctionDeclaration(node: TSESTree.FunctionDeclaration) {
        checkTopLevelFunction(node);
      },
    };
  },
});

export default jsxNoNonComponentFunction;
