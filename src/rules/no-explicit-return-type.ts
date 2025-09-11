import { ESLintUtils } from "@typescript-eslint/utils";

import type { TSESTree } from "@typescript-eslint/utils";

const createRule = ESLintUtils.RuleCreator(
  (name) =>
    `https://github.com/next-friday/eslint-plugin-nextfriday/blob/main/docs/rules/${name.replace(/-/g, "_").toUpperCase()}.md`,
);

const noExplicitReturnType = createRule({
  name: "no-explicit-return-type",
  meta: {
    type: "suggestion",
    docs: {
      description: "Disallow explicit return types on functions",
    },
    fixable: "code",
    schema: [],
    messages: {
      noExplicitReturnType: "Remove explicit return type '{{returnType}}' - TypeScript can infer it automatically",
    },
  },
  defaultOptions: [],
  create(context) {
    const checkFunction = (
      node: TSESTree.FunctionDeclaration | TSESTree.FunctionExpression | TSESTree.ArrowFunctionExpression,
    ) => {
      if (node.returnType) {
        const returnTypeText = context.sourceCode.getText(node.returnType);
        context.report({
          node: node.returnType,
          messageId: "noExplicitReturnType",
          data: {
            returnType: returnTypeText,
          },
          fix(fixer) {
            return fixer.remove(node.returnType!);
          },
        });
      }
    };

    return {
      FunctionDeclaration: checkFunction,
      FunctionExpression: checkFunction,
      ArrowFunctionExpression: checkFunction,
    };
  },
});

export default noExplicitReturnType;
