import { AST_NODE_TYPES, ESLintUtils } from "@typescript-eslint/utils";

import type { TSESTree } from "@typescript-eslint/utils";

const createRule = ESLintUtils.RuleCreator(
  (name) =>
    `https://github.com/next-friday/eslint-plugin-nextfriday/blob/main/docs/rules/${name.replaceAll("-", "_").toUpperCase()}.md`,
);

function isRequiredBeforeOptional(members: TSESTree.TypeElement[]): boolean {
  const properties = members.filter(
    (member): member is TSESTree.TSPropertySignature =>
      member.type === AST_NODE_TYPES.TSPropertySignature && member.key.type === AST_NODE_TYPES.Identifier,
  );

  if (properties.length < 2) {
    return true;
  }

  const firstOptionalIndex = properties.findIndex((prop) => prop.optional);

  if (firstOptionalIndex === -1) {
    return true;
  }

  return properties.slice(firstOptionalIndex).every((prop) => prop.optional);
}

const sortTypeRequiredFirst = createRule({
  name: "sort-type-required-first",
  meta: {
    type: "suggestion",
    docs: {
      description:
        "Enforce required properties come before optional properties in TypeScript interfaces and type aliases",
    },
    fixable: "code",
    schema: [],
    messages: {
      unsortedTypeMembers: "Required type members should come before optional members.",
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
      const sorted = [...required, ...optional];

      const sortedTexts = sorted.map((prop) => sourceCode.getText(prop));

      return properties.map((prop, index) => fixer.replaceText(prop, sortedTexts[index]));
    }

    return {
      TSInterfaceDeclaration(node) {
        if (!isRequiredBeforeOptional(node.body.body)) {
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

        if (!isRequiredBeforeOptional(members)) {
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

export default sortTypeRequiredFirst;
