import { AST_NODE_TYPES, ESLintUtils } from "@typescript-eslint/utils";

import type { TSESTree } from "@typescript-eslint/utils";

const createRule = ESLintUtils.RuleCreator(
  (name) =>
    `https://github.com/next-friday/eslint-plugin-nextfriday/blob/main/docs/rules/${name.replaceAll("-", "_").toUpperCase()}.md`,
);

function getPropertyName(prop: TSESTree.TypeElement): string | null {
  if (prop.type !== AST_NODE_TYPES.TSPropertySignature || prop.key.type !== AST_NODE_TYPES.Identifier) {
    return null;
  }

  return prop.key.name;
}

function isMembersSorted(members: TSESTree.TypeElement[]): boolean {
  const properties = members.filter(
    (member): member is TSESTree.TSPropertySignature =>
      member.type === AST_NODE_TYPES.TSPropertySignature && member.key.type === AST_NODE_TYPES.Identifier,
  );

  if (properties.length < 2) {
    return true;
  }

  const propertyInfo = properties.map((prop) => ({
    name: getPropertyName(prop)!,
    optional: prop.optional === true,
  }));

  const sorted = [...propertyInfo].sort((a, b) => {
    if (!a.optional && b.optional) {
      return -1;
    }
    if (a.optional && !b.optional) {
      return 1;
    }

    return a.name.localeCompare(b.name);
  });

  return propertyInfo.every((info, index) => info.name === sorted[index].name);
}

const sortTypeRequiredFirst = createRule({
  name: "sort-type-required-first",
  meta: {
    type: "suggestion",
    docs: {
      description:
        "Enforce required properties come before optional properties in TypeScript interfaces and type aliases, with alphabetical sorting within each group",
    },
    schema: [],
    messages: {
      unsortedTypeMembers:
        "Type members should be sorted with required properties first, then optional. Each group should be sorted alphabetically.",
    },
  },
  defaultOptions: [],
  create(context) {
    return {
      TSInterfaceDeclaration(node) {
        if (!isMembersSorted(node.body.body)) {
          context.report({ node, messageId: "unsortedTypeMembers" });
        }
      },
      TSTypeAliasDeclaration(node) {
        if (
          node.typeAnnotation.type === AST_NODE_TYPES.TSTypeLiteral &&
          !isMembersSorted(node.typeAnnotation.members)
        ) {
          context.report({ node, messageId: "unsortedTypeMembers" });
        }
      },
    };
  },
});

export default sortTypeRequiredFirst;
