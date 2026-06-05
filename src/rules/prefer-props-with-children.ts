import { AST_NODE_TYPES, ESLintUtils } from "@typescript-eslint/utils";

import { isJsxFile } from "../utils";

import type { TSESTree } from "@typescript-eslint/utils";

const createRule = ESLintUtils.RuleCreator(
  (name) =>
    `https://github.com/next-friday/eslint-plugin-nextfriday/blob/main/docs/rules/${name.replaceAll("-", "_").toUpperCase()}.md`,
);

const preferPropsWithChildren = createRule({
  name: "prefer-props-with-children",
  meta: {
    type: "suggestion",
    docs: {
      description: "Prefer PropsWithChildren over manually declaring a children property typed as ReactNode",
    },
    schema: [],
    messages: {
      usePropsWithChildren:
        "Use 'PropsWithChildren' instead of manually declaring a 'children' property typed as ReactNode (or a union/array of ReactNode).",
    },
  },
  defaultOptions: [],
  create(context) {
    if (!isJsxFile(context.filename)) return {};

    function isReactNodeType(typeNode: TSESTree.TypeNode | undefined): boolean {
      if (!typeNode) {
        return false;
      }
      if (typeNode.type === AST_NODE_TYPES.TSUnionType) {
        return typeNode.types.every((member) => isReactNodeType(member));
      }
      if (typeNode.type === AST_NODE_TYPES.TSArrayType) {
        return isReactNodeType(typeNode.elementType);
      }
      if (typeNode.type !== AST_NODE_TYPES.TSTypeReference) {
        return false;
      }
      const { typeName } = typeNode;
      if (typeName.type === AST_NODE_TYPES.Identifier) {
        return typeName.name === "ReactNode";
      }
      if (
        typeName.type === AST_NODE_TYPES.TSQualifiedName &&
        typeName.left.type === AST_NODE_TYPES.Identifier &&
        typeName.left.name === "React" &&
        typeName.right.type === AST_NODE_TYPES.Identifier &&
        typeName.right.name === "ReactNode"
      ) {
        return true;
      }
      return false;
    }

    function findChildrenReactNode(members: readonly TSESTree.TypeElement[]): TSESTree.TSPropertySignature | undefined {
      for (const member of members) {
        if (member.type !== AST_NODE_TYPES.TSPropertySignature) {
          continue;
        }
        if (member.key.type !== AST_NODE_TYPES.Identifier) {
          continue;
        }
        if (member.key.name !== "children") {
          continue;
        }
        if (!member.typeAnnotation) {
          continue;
        }
        if (isReactNodeType(member.typeAnnotation.typeAnnotation)) {
          return member;
        }
      }
      return undefined;
    }

    return {
      TSInterfaceDeclaration(node) {
        const childrenMember = findChildrenReactNode(node.body.body);
        if (childrenMember) {
          context.report({
            node: childrenMember,
            messageId: "usePropsWithChildren",
          });
        }
      },
      TSTypeLiteral(node) {
        const childrenMember = findChildrenReactNode(node.members);
        if (childrenMember) {
          context.report({
            node: childrenMember,
            messageId: "usePropsWithChildren",
          });
        }
      },
    };
  },
});

export default preferPropsWithChildren;
