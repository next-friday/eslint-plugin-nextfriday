import { ESLintUtils, TSESTree, AST_NODE_TYPES } from "@typescript-eslint/utils";

const createRule = ESLintUtils.RuleCreator(
  (name) =>
    `https://github.com/next-friday/eslint-plugin-nextfriday/blob/main/docs/rules/${name.replaceAll("-", "_").toUpperCase()}.md`,
);

const jsxRequireSuspense = createRule({
  name: "jsx-require-suspense",
  meta: {
    type: "problem",
    docs: {
      description: "Require lazy-loaded components to be wrapped in Suspense",
    },
    messages: {
      requireSuspense:
        "Lazy component '{{ name }}' must be wrapped in <Suspense>. Add a Suspense boundary with a fallback prop.",
    },
    schema: [],
  },
  defaultOptions: [],
  create(context) {
    const lazyComponents = new Set<string>();

    const isInsideSuspense = (node: TSESTree.Node): boolean => {
      let current: TSESTree.Node | undefined = node.parent;

      while (current) {
        if (
          current.type === AST_NODE_TYPES.JSXElement &&
          current.openingElement.name.type === AST_NODE_TYPES.JSXIdentifier &&
          current.openingElement.name.name === "Suspense"
        ) {
          return true;
        }
        current = current.parent;
      }

      return false;
    };

    return {
      VariableDeclarator(node) {
        if (node.id.type === AST_NODE_TYPES.Identifier && node.init?.type === AST_NODE_TYPES.CallExpression) {
          const { callee } = node.init;

          const isLazyCall =
            (callee.type === AST_NODE_TYPES.Identifier && callee.name === "lazy") ||
            (callee.type === AST_NODE_TYPES.MemberExpression &&
              callee.object.type === AST_NODE_TYPES.Identifier &&
              callee.object.name === "React" &&
              callee.property.type === AST_NODE_TYPES.Identifier &&
              callee.property.name === "lazy");

          if (isLazyCall) {
            lazyComponents.add(node.id.name);
          }
        }
      },
      JSXOpeningElement(node) {
        if (node.name.type === AST_NODE_TYPES.JSXIdentifier) {
          const componentName = node.name.name;

          if (lazyComponents.has(componentName) && !isInsideSuspense(node)) {
            context.report({
              node,
              messageId: "requireSuspense",
              data: {
                name: componentName,
              },
            });
          }
        }
      },
    };
  },
});

export default jsxRequireSuspense;
