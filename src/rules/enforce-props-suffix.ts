import path from "path";

import { ESLintUtils, TSESTree, AST_NODE_TYPES } from "@typescript-eslint/utils";

const createRule = ESLintUtils.RuleCreator(
  (name) =>
    `https://github.com/next-friday/eslint-plugin-nextfriday/blob/main/docs/rules/${name.replaceAll("-", "_").toUpperCase()}.md`,
);

const enforcePropsSuffix = createRule({
  name: "enforce-props-suffix",
  meta: {
    type: "suggestion",
    docs: {
      description: "Enforce 'Props' suffix for interfaces and types in component files (*.tsx)",
    },
    messages: {
      missingPropsSuffix: "Interface/type '{{ name }}' should end with 'Props'. Rename to '{{ suggestion }}'.",
    },
    schema: [],
  },
  defaultOptions: [],
  create(context) {
    const { filename } = context;
    const ext = path.extname(filename);
    const isComponentFile = ext === ".tsx" || ext === ".jsx";

    if (!isComponentFile) {
      return {};
    }

    const checkTypeName = (name: string, node: TSESTree.Node): void => {
      if (!name.endsWith("Props")) {
        context.report({
          node,
          messageId: "missingPropsSuffix",
          data: {
            name,
            suggestion: `${name}Props`,
          },
        });
      }
    };

    return {
      TSInterfaceDeclaration(node) {
        if (node.id.type === AST_NODE_TYPES.Identifier) {
          checkTypeName(node.id.name, node.id);
        }
      },
      TSTypeAliasDeclaration(node) {
        if (node.id.type === AST_NODE_TYPES.Identifier) {
          if (node.typeAnnotation.type === AST_NODE_TYPES.TSTypeLiteral) {
            checkTypeName(node.id.name, node.id);
          }
        }
      },
    };
  },
});

export default enforcePropsSuffix;
