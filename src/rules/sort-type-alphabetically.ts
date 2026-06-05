import { AST_NODE_TYPES, ESLintUtils } from "@typescript-eslint/utils";

import type { TSESTree } from "@typescript-eslint/utils";

const createRule = ESLintUtils.RuleCreator(
  (name) =>
    `https://github.com/next-friday/eslint-plugin-nextfriday/blob/main/docs/rules/${name.replaceAll("-", "_").toUpperCase()}.md`,
);

const getProperties = (members: TSESTree.TypeElement[]): TSESTree.TSPropertySignature[] =>
  members.filter(
    (member): member is TSESTree.TSPropertySignature =>
      member.type === AST_NODE_TYPES.TSPropertySignature && member.key.type === AST_NODE_TYPES.Identifier,
  );

const getMemberName = (member: TSESTree.TSPropertySignature): string => (member.key as TSESTree.Identifier).name;

const sortTypeAlphabetically = createRule({
  name: "sort-type-alphabetically",
  meta: {
    type: "suggestion",
    docs: {
      description:
        "Enforce sorting of type members within required and optional groups: non-callable alphabetical, then callable last",
    },
    fixable: "code",
    schema: [],
    messages: {
      unsortedTypeMembers:
        "Type members should be sorted alphabetically within their required and optional groups, with callable (function-typed) members last.",
    },
  },
  defaultOptions: [],
  create(context) {
    const services = ESLintUtils.getParserServices(context);
    const { sourceCode } = context;

    const isCallableMember = (member: TSESTree.TSPropertySignature): boolean => {
      const typeNode = member.typeAnnotation?.typeAnnotation;
      if (!typeNode) {
        return false;
      }
      const type = services.getTypeAtLocation(typeNode);
      return type.getCallSignatures().length > 0;
    };

    const compareMembers = (a: TSESTree.TSPropertySignature, b: TSESTree.TSPropertySignature): number =>
      Number(isCallableMember(a)) - Number(isCallableMember(b)) || getMemberName(a).localeCompare(getMemberName(b));

    const isSorted = (members: TSESTree.TypeElement[]): boolean => {
      const properties = getProperties(members);

      if (properties.length < 2) {
        return true;
      }

      const required = properties.filter((prop) => !prop.optional);
      const optional = properties.filter((prop) => prop.optional);
      const sortedRequired = [...required].sort(compareMembers);
      const sortedOptional = [...optional].sort(compareMembers);

      return (
        required.every((prop, index) => prop === sortedRequired[index]) &&
        optional.every((prop, index) => prop === sortedOptional[index])
      );
    };

    const fixMembers = (
      fixer: Parameters<NonNullable<Parameters<typeof context.report>[0]["fix"]>>[0],
      members: TSESTree.TypeElement[],
    ) => {
      const properties = getProperties(members);
      const required = properties.filter((prop) => !prop.optional);
      const optional = properties.filter((prop) => prop.optional);
      const sortedRequired = [...required].sort(compareMembers);
      const sortedOptional = [...optional].sort(compareMembers);

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
    };

    return {
      TSInterfaceDeclaration(node) {
        if (!isSorted(node.body.body)) {
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

        if (!isSorted(members)) {
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
