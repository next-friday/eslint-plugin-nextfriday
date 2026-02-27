import { AST_NODE_TYPES, ESLintUtils } from "@typescript-eslint/utils";

import type { TSESTree } from "@typescript-eslint/utils";

const createRule = ESLintUtils.RuleCreator(
  (name) =>
    `https://github.com/next-friday/eslint-plugin-nextfriday/blob/main/docs/rules/${name.replaceAll("-", "_").toUpperCase()}.md`,
);

const enforceSortedDestructuring = createRule({
  name: "enforce-sorted-destructuring",
  meta: {
    type: "suggestion",
    docs: {
      description: "Enforce alphabetical sorting of destructured properties with defaults first",
    },
    fixable: "code",
    schema: [],
    messages: {
      unsortedDestructuring:
        "Destructured properties should be sorted alphabetically. Properties with defaults should come first, sorted alphabetically.",
    },
  },
  defaultOptions: [],
  create(context) {
    function getPropertyName(property: TSESTree.Property | TSESTree.RestElement): string | null {
      if (property.type === AST_NODE_TYPES.RestElement) {
        return null;
      }

      if (property.key.type === AST_NODE_TYPES.Identifier) {
        return property.key.name;
      }

      return null;
    }

    function hasDefaultValue(property: TSESTree.Property): boolean {
      return property.value.type === AST_NODE_TYPES.AssignmentPattern && Boolean(property.value.right);
    }

    function checkVariableDeclarator(node: TSESTree.VariableDeclarator) {
      if (node.id.type !== AST_NODE_TYPES.ObjectPattern) {
        return;
      }

      const { properties } = node.id;

      if (properties.length < 2) {
        return;
      }

      const propertyInfo = properties
        .map((prop) => {
          if (prop.type === AST_NODE_TYPES.RestElement) {
            return null;
          }
          return {
            property: prop,
            name: getPropertyName(prop),
            hasDefault: hasDefaultValue(prop),
          };
        })
        .filter((info): info is NonNullable<typeof info> => info !== null && info.name !== null);

      const sorted = [...propertyInfo].sort((a, b) => {
        if (a.hasDefault && !b.hasDefault) {
          return -1;
        }
        if (!a.hasDefault && b.hasDefault) {
          return 1;
        }

        return a.name!.localeCompare(b.name!);
      });

      const isSorted = propertyInfo.every((info, index) => info.name === sorted[index].name);

      if (!isSorted) {
        context.report({
          node: node.id,
          messageId: "unsortedDestructuring",
          fix(fixer) {
            const { sourceCode } = context;
            const sortedTexts = sorted.map((info) => sourceCode.getText(info.property));

            return propertyInfo.map((info, index) => fixer.replaceText(info.property, sortedTexts[index]));
          },
        });
      }
    }

    return {
      VariableDeclarator: checkVariableDeclarator,
    };
  },
});

export default enforceSortedDestructuring;
