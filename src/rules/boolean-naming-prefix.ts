import { ESLintUtils, AST_NODE_TYPES, type TSESTree } from "@typescript-eslint/utils";

const createRule = ESLintUtils.RuleCreator(
  (name) =>
    `https://github.com/next-friday/eslint-plugin-nextfriday/blob/main/docs/rules/${name.replaceAll("-", "_").toUpperCase()}.md`,
);

const BOOLEAN_PREFIXES = ["is", "has", "should", "can", "did", "will", "was", "are", "does", "had"];

const startsWithBooleanPrefix = (name: string): boolean => {
  const lowerName = name.toLowerCase();

  return BOOLEAN_PREFIXES.some((prefix) => {
    if (!lowerName.startsWith(prefix)) {
      return false;
    }

    if (name.length === prefix.length) {
      return true;
    }

    const nextChar = name.charAt(prefix.length);
    return nextChar === nextChar.toUpperCase();
  });
};

const isBooleanLiteral = (node: TSESTree.Expression): boolean =>
  node.type === AST_NODE_TYPES.Literal && typeof node.value === "boolean";

const isBooleanExpression = (node: TSESTree.Expression): boolean => {
  if (isBooleanLiteral(node)) {
    return true;
  }

  if (node.type === AST_NODE_TYPES.UnaryExpression && node.operator === "!") {
    return true;
  }

  if (node.type === AST_NODE_TYPES.BinaryExpression) {
    const comparisonOperators = ["===", "!==", "==", "!=", "<", ">", "<=", ">=", "in", "instanceof"];
    return comparisonOperators.includes(node.operator);
  }

  if (node.type === AST_NODE_TYPES.LogicalExpression) {
    return node.operator === "&&" || node.operator === "||";
  }

  return false;
};

const hasBooleanTypeAnnotation = (node: TSESTree.VariableDeclarator | TSESTree.Parameter): boolean => {
  if (node.type === AST_NODE_TYPES.Identifier) {
    const { typeAnnotation } = node;
    if (typeAnnotation?.typeAnnotation.type === AST_NODE_TYPES.TSBooleanKeyword) {
      return true;
    }
  }

  if ("id" in node && node.id.type === AST_NODE_TYPES.Identifier) {
    const { typeAnnotation } = node.id;
    if (typeAnnotation?.typeAnnotation.type === AST_NODE_TYPES.TSBooleanKeyword) {
      return true;
    }
  }

  return false;
};

const booleanNamingPrefix = createRule({
  name: "boolean-naming-prefix",
  meta: {
    type: "suggestion",
    docs: {
      description:
        "Enforce boolean variables and parameters to have a prefix like is, has, should, can, did, will for better readability",
    },
    messages: {
      missingPrefix:
        "Boolean variable '{{name}}' should have a prefix like is, has, should, can, did, or will. Example: 'is{{suggestedName}}' or 'has{{suggestedName}}'.",
    },
    schema: [],
  },
  defaultOptions: [],
  create(context) {
    const checkBooleanNaming = (name: string, node: TSESTree.Node) => {
      if (startsWithBooleanPrefix(name)) {
        return;
      }

      const suggestedName = name.charAt(0).toUpperCase() + name.slice(1);

      context.report({
        node,
        messageId: "missingPrefix",
        data: { name, suggestedName },
      });
    };

    return {
      VariableDeclarator(node) {
        if (node.id.type !== AST_NODE_TYPES.Identifier) {
          return;
        }

        const { name } = node.id;

        if (hasBooleanTypeAnnotation(node)) {
          checkBooleanNaming(name, node.id);
          return;
        }

        if (node.init && isBooleanExpression(node.init)) {
          checkBooleanNaming(name, node.id);
        }
      },
      FunctionDeclaration(node) {
        node.params.forEach((param) => {
          if (param.type === AST_NODE_TYPES.Identifier && hasBooleanTypeAnnotation(param)) {
            checkBooleanNaming(param.name, param);
          }

          if (param.type === AST_NODE_TYPES.AssignmentPattern) {
            if (param.left.type === AST_NODE_TYPES.Identifier && param.right && isBooleanLiteral(param.right)) {
              checkBooleanNaming(param.left.name, param.left);
            }
          }
        });
      },
      FunctionExpression(node) {
        node.params.forEach((param) => {
          if (param.type === AST_NODE_TYPES.Identifier && hasBooleanTypeAnnotation(param)) {
            checkBooleanNaming(param.name, param);
          }

          if (param.type === AST_NODE_TYPES.AssignmentPattern) {
            if (param.left.type === AST_NODE_TYPES.Identifier && param.right && isBooleanLiteral(param.right)) {
              checkBooleanNaming(param.left.name, param.left);
            }
          }
        });
      },
      ArrowFunctionExpression(node) {
        node.params.forEach((param) => {
          if (param.type === AST_NODE_TYPES.Identifier && hasBooleanTypeAnnotation(param)) {
            checkBooleanNaming(param.name, param);
          }

          if (param.type === AST_NODE_TYPES.AssignmentPattern) {
            if (param.left.type === AST_NODE_TYPES.Identifier && param.right && isBooleanLiteral(param.right)) {
              checkBooleanNaming(param.left.name, param.left);
            }
          }
        });
      },
    };
  },
});

export default booleanNamingPrefix;
