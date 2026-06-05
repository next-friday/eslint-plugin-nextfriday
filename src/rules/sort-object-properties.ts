import { AST_NODE_TYPES, ESLintUtils } from "@typescript-eslint/utils";

import type { TSESTree } from "@typescript-eslint/utils";

const createRule = ESLintUtils.RuleCreator(
  (name) =>
    `https://github.com/next-friday/eslint-plugin-nextfriday/blob/main/docs/rules/${name.replaceAll("-", "_").toUpperCase()}.md`,
);

const getPropertyName = (property: TSESTree.Property): string | null => {
  if (property.key.type === AST_NODE_TYPES.Identifier) {
    return property.key.name;
  }

  if (property.key.type === AST_NODE_TYPES.Literal) {
    return String(property.key.value);
  }

  return null;
};

const sortObjectProperties = createRule({
  name: "sort-object-properties",
  meta: {
    type: "suggestion",
    docs: {
      description: "Sort object literal properties with non-callable members first and callable members last",
    },
    fixable: "code",
    schema: [],
    messages: {
      unsortedObjectProperties:
        "Object properties should be sorted alphabetically with callable (function) properties last.",
    },
  },
  defaultOptions: [],
  create(context) {
    const services = ESLintUtils.getParserServices(context);
    const { sourceCode } = context;

    const isCallableProperty = (property: TSESTree.Property): boolean => {
      const type = services.getTypeAtLocation(property.value);
      return type.getCallSignatures().length > 0;
    };

    return {
      ObjectExpression(node: TSESTree.ObjectExpression) {
        const { properties } = node;

        if (properties.length < 2) {
          return;
        }

        const sortable = properties.every(
          (property) =>
            property.type === AST_NODE_TYPES.Property &&
            !property.computed &&
            !property.method &&
            property.kind === "init",
        );

        if (!sortable) {
          return;
        }

        const named = properties as TSESTree.Property[];
        const decorated = named.map((property) => ({
          property,
          name: getPropertyName(property),
          callable: isCallableProperty(property),
        }));

        if (decorated.some((entry) => entry.name === null)) {
          return;
        }

        const sorted = [...decorated].sort(
          (a, b) => Number(a.callable) - Number(b.callable) || (a.name as string).localeCompare(b.name as string),
        );

        const isAlreadySorted = decorated.every((entry, index) => entry.property === sorted[index].property);

        if (isAlreadySorted) {
          return;
        }

        context.report({
          node,
          messageId: "unsortedObjectProperties",
          fix(fixer) {
            return decorated.map((entry, index) =>
              fixer.replaceText(entry.property, sourceCode.getText(sorted[index].property)),
            );
          },
        });
      },
    };
  },
});

export default sortObjectProperties;
