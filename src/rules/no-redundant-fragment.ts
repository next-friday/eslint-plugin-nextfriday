import { AST_NODE_TYPES, ESLintUtils } from "@typescript-eslint/utils";

import type { TSESTree } from "@typescript-eslint/utils";

const createRule = ESLintUtils.RuleCreator(
  (name) =>
    `https://github.com/next-friday/eslint-plugin-nextfriday/blob/main/docs/rules/${name.replaceAll("-", "_").toUpperCase()}.md`,
);

function isFragmentName(name: TSESTree.JSXTagNameExpression): boolean {
  if (name.type === AST_NODE_TYPES.JSXIdentifier && name.name === "Fragment") {
    return true;
  }

  if (
    name.type === AST_NODE_TYPES.JSXMemberExpression &&
    name.object.type === AST_NODE_TYPES.JSXIdentifier &&
    name.object.name === "React" &&
    name.property.type === AST_NODE_TYPES.JSXIdentifier &&
    name.property.name === "Fragment"
  ) {
    return true;
  }

  return false;
}

function hasKeyAttribute(attributes: ReadonlyArray<TSESTree.JSXAttribute | TSESTree.JSXSpreadAttribute>): boolean {
  return attributes.some(
    (attribute) =>
      attribute.type === AST_NODE_TYPES.JSXAttribute &&
      attribute.name.type === AST_NODE_TYPES.JSXIdentifier &&
      attribute.name.name === "key",
  );
}

function countMeaningfulChildren(children: ReadonlyArray<TSESTree.JSXChild>): number {
  return children.filter((child) => {
    if (child.type === AST_NODE_TYPES.JSXText) {
      return child.value.trim() !== "";
    }
    return true;
  }).length;
}

const noRedundantFragment = createRule({
  name: "no-redundant-fragment",
  meta: {
    type: "problem",
    docs: {
      description: "Disallow Fragments that wrap zero or one child (unless a key prop is needed)",
    },
    schema: [],
    messages: {
      redundantFragment:
        "Fragment is redundant when wrapping {{ count }} child. Remove the Fragment or replace it with the child directly.",
    },
  },
  defaultOptions: [],
  create(context) {
    return {
      JSXFragment(node: TSESTree.JSXFragment) {
        const count = countMeaningfulChildren(node.children);
        if (count <= 1) {
          context.report({
            node,
            messageId: "redundantFragment",
            data: { count: String(count) },
          });
        }
      },
      JSXElement(node: TSESTree.JSXElement) {
        const opening = node.openingElement;
        if (!isFragmentName(opening.name)) {
          return;
        }

        if (hasKeyAttribute(opening.attributes)) {
          return;
        }

        const count = countMeaningfulChildren(node.children);
        if (count <= 1) {
          context.report({
            node,
            messageId: "redundantFragment",
            data: { count: String(count) },
          });
        }
      },
    };
  },
});

export default noRedundantFragment;
