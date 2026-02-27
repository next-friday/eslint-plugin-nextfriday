import { AST_NODE_TYPES, ESLintUtils } from "@typescript-eslint/utils";

import type { TSESTree } from "@typescript-eslint/utils";

const createRule = ESLintUtils.RuleCreator(
  (name) =>
    `https://github.com/next-friday/eslint-plugin-nextfriday/blob/main/docs/rules/${name.replaceAll("-", "_").toUpperCase()}.md`,
);

function isAlphabeticallySortedWithinGroups(members: TSESTree.TypeElement[]): boolean {
  const properties = members.filter(
    (member): member is TSESTree.TSPropertySignature =>
      member.type === AST_NODE_TYPES.TSPropertySignature && member.key.type === AST_NODE_TYPES.Identifier,
  );

  if (properties.length < 2) {
    return true;
  }

  const required = properties.filter((prop) => !prop.optional).map((prop) => (prop.key as TSESTree.Identifier).name);

  const optional = properties.filter((prop) => prop.optional).map((prop) => (prop.key as TSESTree.Identifier).name);

  const isRequiredSorted = required.every((name, index) => index === 0 || required[index - 1].localeCompare(name) <= 0);

  const isOptionalSorted = optional.every((name, index) => index === 0 || optional[index - 1].localeCompare(name) <= 0);

  return isRequiredSorted && isOptionalSorted;
}

const sortTypeAlphabetically = createRule({
  name: "sort-type-alphabetically",
  meta: {
    type: "suggestion",
    docs: {
      description:
        "Enforce alphabetical sorting of properties within required and optional groups in TypeScript interfaces and type aliases",
    },
    fixable: "code",
    schema: [],
    messages: {
      unsortedTypeMembers: "Type members should be sorted alphabetically within their required and optional groups.",
    },
  },
  defaultOptions: [],
  create(context) {
    function fixMembers(
      fixer: Parameters<NonNullable<Parameters<typeof context.report>[0]["fix"]>>[0],
      members: TSESTree.TypeElement[],
    ) {
      const { sourceCode } = context;
      const properties = members.filter(
        (member): member is TSESTree.TSPropertySignature =>
          member.type === AST_NODE_TYPES.TSPropertySignature && member.key.type === AST_NODE_TYPES.Identifier,
      );

      const required = properties.filter((prop) => !prop.optional);
      const optional = properties.filter((prop) => prop.optional);

      const sortedRequired = [...required].sort((a, b) =>
        (a.key as TSESTree.Identifier).name.localeCompare((b.key as TSESTree.Identifier).name),
      );
      const sortedOptional = [...optional].sort((a, b) =>
        (a.key as TSESTree.Identifier).name.localeCompare((b.key as TSESTree.Identifier).name),
      );

      const sortedMap = new Map<TSESTree.TSPropertySignature, string>();
      let reqIdx = 0;
      let optIdx = 0;

      properties.forEach((prop) => {
        if (!prop.optional) {
          sortedMap.set(prop, sourceCode.getText(sortedRequired[reqIdx]));
          reqIdx += 1;
        } else {
          sortedMap.set(prop, sourceCode.getText(sortedOptional[optIdx]));
          optIdx += 1;
        }
      });

      return properties
        .filter((prop) => sourceCode.getText(prop) !== sortedMap.get(prop))
        .map((prop) => fixer.replaceText(prop, sortedMap.get(prop)!));
    }

    return {
      TSInterfaceDeclaration(node) {
        if (!isAlphabeticallySortedWithinGroups(node.body.body)) {
          context.report({
            node,
            messageId: "unsortedTypeMembers",
            fix(fixer) {
              return fixMembers(fixer, node.body.body);
            },
          });
        }
      },
      TSTypeAliasDeclaration(node) {
        if (node.typeAnnotation.type !== AST_NODE_TYPES.TSTypeLiteral) {
          return;
        }

        const { members } = node.typeAnnotation;

        if (!isAlphabeticallySortedWithinGroups(members)) {
          context.report({
            node,
            messageId: "unsortedTypeMembers",
            fix(fixer) {
              return fixMembers(fixer, members);
            },
          });
        }
      },
    };
  },
});

export default sortTypeAlphabetically;
