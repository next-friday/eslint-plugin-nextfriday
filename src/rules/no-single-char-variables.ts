import { ESLintUtils, AST_NODE_TYPES, type TSESTree } from "@typescript-eslint/utils";

const createRule = ESLintUtils.RuleCreator(
  (name) =>
    `https://github.com/next-friday/eslint-plugin-nextfriday/blob/main/docs/rules/${name.replaceAll("-", "_").toUpperCase()}.md`,
);

const ALLOWED_IN_FOR_LOOPS = new Set(["i", "j", "k", "n"]);
const ALLOWED_UNDERSCORE = "_";

const isForLoopInit = (node: TSESTree.Node): boolean => {
  let current: TSESTree.Node | undefined = node;

  while (current) {
    const parentNode: TSESTree.Node | undefined = current.parent;

    if (!parentNode) {
      return false;
    }

    if (parentNode.type === AST_NODE_TYPES.ForStatement) {
      const { init } = parentNode;
      if (init && init === current) {
        return true;
      }
    }

    current = parentNode;
  }

  return false;
};

const isAllowedInContext = (name: string, node: TSESTree.Node): boolean => {
  if (name === ALLOWED_UNDERSCORE) {
    return true;
  }

  if (ALLOWED_IN_FOR_LOOPS.has(name) && isForLoopInit(node)) {
    return true;
  }

  return false;
};

const noSingleCharVariables = createRule({
  name: "no-single-char-variables",
  meta: {
    type: "suggestion",
    docs: {
      description: "Disallow single character variable and parameter names for better code readability",
    },
    messages: {
      noSingleChar:
        "Avoid single character variable name '{{name}}'. Use a descriptive name that clearly indicates the purpose.",
    },
    schema: [],
  },
  defaultOptions: [],
  create(context) {
    const checkIdentifier = (node: TSESTree.Identifier, declarationNode: TSESTree.Node) => {
      const { name } = node;

      if (name.length !== 1) {
        return;
      }

      if (isAllowedInContext(name, declarationNode)) {
        return;
      }

      context.report({
        node,
        messageId: "noSingleChar",
        data: { name },
      });
    };

    const checkPattern = (pattern: TSESTree.Node, declarationNode: TSESTree.Node) => {
      if (pattern.type === AST_NODE_TYPES.Identifier) {
        checkIdentifier(pattern, declarationNode);
      } else if (pattern.type === AST_NODE_TYPES.ObjectPattern) {
        pattern.properties.forEach((prop) => {
          if (prop.type === AST_NODE_TYPES.Property && prop.value.type === AST_NODE_TYPES.Identifier) {
            checkIdentifier(prop.value, declarationNode);
          } else if (prop.type === AST_NODE_TYPES.RestElement && prop.argument.type === AST_NODE_TYPES.Identifier) {
            checkIdentifier(prop.argument, declarationNode);
          }
        });
      } else if (pattern.type === AST_NODE_TYPES.ArrayPattern) {
        pattern.elements.forEach((element) => {
          if (element?.type === AST_NODE_TYPES.Identifier) {
            checkIdentifier(element, declarationNode);
          } else if (
            element?.type === AST_NODE_TYPES.RestElement &&
            element.argument.type === AST_NODE_TYPES.Identifier
          ) {
            checkIdentifier(element.argument, declarationNode);
          }
        });
      } else if (pattern.type === AST_NODE_TYPES.AssignmentPattern && pattern.left.type === AST_NODE_TYPES.Identifier) {
        checkIdentifier(pattern.left, declarationNode);
      } else if (pattern.type === AST_NODE_TYPES.RestElement && pattern.argument.type === AST_NODE_TYPES.Identifier) {
        checkIdentifier(pattern.argument, declarationNode);
      }
    };

    return {
      VariableDeclarator(node) {
        checkPattern(node.id, node);
      },
      FunctionDeclaration(node) {
        if (node.id) {
          checkIdentifier(node.id, node);
        }
        node.params.forEach((param) => checkPattern(param, node));
      },
      FunctionExpression(node) {
        if (node.id) {
          checkIdentifier(node.id, node);
        }
        node.params.forEach((param) => checkPattern(param, node));
      },
      ArrowFunctionExpression(node) {
        node.params.forEach((param) => checkPattern(param, node));
      },
      CatchClause(node) {
        if (node.param) {
          checkPattern(node.param, node);
        }
      },
    };
  },
});

export default noSingleCharVariables;
