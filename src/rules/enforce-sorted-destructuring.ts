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
    schema: [],
    messages: {
      unsortedDestructuring:
        "Destructured properties should be sorted alphabetically. Properties with defaults should come first, sorted by type (string, number, boolean, object) then alphabetically.",
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

    function getDefaultValueType(property: TSESTree.Property): string {
      if (!hasDefaultValue(property)) {
        return "none";
      }

      const assignmentPattern = property.value as TSESTree.AssignmentPattern;
      const { right } = assignmentPattern;

      if (!right) {
        return "none";
      }

      switch (right.type) {
        case AST_NODE_TYPES.Literal:
          if (typeof right.value === "string") {
            return "string";
          }
          if (typeof right.value === "number") {
            return "number";
          }
          if (typeof right.value === "boolean") {
            return "boolean";
          }
          return "other";
        case AST_NODE_TYPES.TemplateLiteral:
          return "string";
        case AST_NODE_TYPES.ObjectExpression:
        case AST_NODE_TYPES.ArrayExpression:
          return "object";
        default:
          return "other";
      }
    }

    function getTypeSortOrder(type: string): number {
      const order: Record<string, number> = {
        string: 0,
        number: 1,
        boolean: 2,
        object: 3,
        other: 4,
        none: 5,
      };
      return order[type] ?? 5;
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
            defaultType: getDefaultValueType(prop),
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

        if (a.hasDefault && b.hasDefault) {
          const typeComparison = getTypeSortOrder(a.defaultType) - getTypeSortOrder(b.defaultType);
          if (typeComparison !== 0) {
            return typeComparison;
          }
        }

        return a.name!.localeCompare(b.name!);
      });

      const isSorted = propertyInfo.every((info, index) => info.name === sorted[index].name);

      if (!isSorted) {
        context.report({
          node: node.id,
          messageId: "unsortedDestructuring",
        });
      }
    }

    return {
      VariableDeclarator: checkVariableDeclarator,
    };
  },
});

export default enforceSortedDestructuring;
