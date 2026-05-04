import { AST_NODE_TYPES, ESLintUtils } from "@typescript-eslint/utils";

import { isJsxFile } from "../utils";

import type { TSESTree } from "@typescript-eslint/utils";

const createRule = ESLintUtils.RuleCreator(
  (name) =>
    `https://github.com/next-friday/eslint-plugin-nextfriday/blob/main/docs/rules/${name.replaceAll("-", "_").toUpperCase()}.md`,
);

const GHOST_TAGS = new Set(["div", "span"]);

function isKeyAttribute(attribute: TSESTree.JSXAttribute | TSESTree.JSXSpreadAttribute): boolean {
  return (
    attribute.type === AST_NODE_TYPES.JSXAttribute &&
    attribute.name.type === AST_NODE_TYPES.JSXIdentifier &&
    attribute.name.name === "key"
  );
}

const noGhostWrapper = createRule({
  name: "no-ghost-wrapper",
  meta: {
    type: "problem",
    docs: {
      description:
        "Disallow bare <div> and <span> elements that have no meaningful attributes (Divitis / ghost wrappers)",
    },
    schema: [],
    messages: {
      noGhostWrapper:
        "Ghost <{{ tag }}> has no meaningful attributes. Use a Fragment (<>...</>), a semantic element (section, article, header, etc.), or add a meaningful attribute (className, role, data-*, ref, etc.). Note: 'key' alone does not count as meaningful.",
    },
  },
  defaultOptions: [],
  create(context) {
    if (!isJsxFile(context.filename)) return {};

    return {
      JSXOpeningElement(node: TSESTree.JSXOpeningElement) {
        if (node.name.type !== AST_NODE_TYPES.JSXIdentifier) {
          return;
        }

        const tagName = node.name.name;
        if (!GHOST_TAGS.has(tagName)) {
          return;
        }

        const meaningfulAttributes = node.attributes.filter((attribute) => !isKeyAttribute(attribute));

        if (meaningfulAttributes.length === 0) {
          context.report({
            node,
            messageId: "noGhostWrapper",
            data: { tag: tagName },
          });
        }
      },
    };
  },
});

export default noGhostWrapper;
