import { ESLintUtils, AST_NODE_TYPES, type TSESTree } from "@typescript-eslint/utils";

const createRule = ESLintUtils.RuleCreator(
  (name) =>
    `https://github.com/next-friday/eslint-plugin-nextfriday/blob/main/docs/rules/${name.replaceAll("-", "_").toUpperCase()}.md`,
);

const KEYBOARD_ROWS = ["qwertyuiop", "asdfghjkl", "zxcvbnm", "1234567890"];

const MIN_LENGTH = 3;
const MIN_SEQUENCE_LENGTH = 4;

const hasRepeatedChars = (name: string): boolean => {
  const lowerName = name.toLowerCase();
  return lowerName.split("").some((char, index) => {
    if (index > lowerName.length - 3) {
      return false;
    }
    return char === lowerName[index + 1] && char === lowerName[index + 2];
  });
};

const hasKeyboardSequence = (name: string): boolean => {
  const lowerName = name.toLowerCase();
  if (lowerName.length < MIN_SEQUENCE_LENGTH) {
    return false;
  }

  return KEYBOARD_ROWS.some((row) => {
    const positions = Array.from({ length: row.length - MIN_SEQUENCE_LENGTH + 1 }, (_, i) => i);
    return positions.some((start) => {
      const sequence = row.slice(start, start + MIN_SEQUENCE_LENGTH);
      const reverseSequence = sequence.split("").reverse().join("");
      return lowerName.includes(sequence) || lowerName.includes(reverseSequence);
    });
  });
};

const isLazyIdentifier = (name: string): boolean => {
  if (name.length < MIN_LENGTH) {
    return false;
  }

  if (name.startsWith("_")) {
    return false;
  }

  if (hasRepeatedChars(name)) {
    return true;
  }

  if (hasKeyboardSequence(name)) {
    return true;
  }

  return false;
};

const noLazyIdentifiers = createRule({
  name: "no-lazy-identifiers",
  meta: {
    type: "problem",
    docs: {
      description: "Disallow lazy, meaningless variable names that hurt code readability",
    },
    messages: {
      noLazyIdentifier: "Avoid lazy identifier '{{name}}'. Use a descriptive name that clearly indicates the purpose.",
    },
    schema: [],
  },
  defaultOptions: [],
  create(context) {
    const checkIdentifier = (node: TSESTree.Identifier) => {
      const { name } = node;

      if (!isLazyIdentifier(name)) {
        return;
      }

      context.report({
        node,
        messageId: "noLazyIdentifier",
        data: { name },
      });
    };

    const checkPattern = (pattern: TSESTree.Node) => {
      if (pattern.type === AST_NODE_TYPES.Identifier) {
        checkIdentifier(pattern);
      } else if (pattern.type === AST_NODE_TYPES.ObjectPattern) {
        pattern.properties.forEach((prop) => {
          if (prop.type === AST_NODE_TYPES.Property && prop.value.type === AST_NODE_TYPES.Identifier) {
            checkIdentifier(prop.value);
          } else if (prop.type === AST_NODE_TYPES.RestElement && prop.argument.type === AST_NODE_TYPES.Identifier) {
            checkIdentifier(prop.argument);
          }
        });
      } else if (pattern.type === AST_NODE_TYPES.ArrayPattern) {
        pattern.elements.forEach((element) => {
          if (element?.type === AST_NODE_TYPES.Identifier) {
            checkIdentifier(element);
          } else if (
            element?.type === AST_NODE_TYPES.RestElement &&
            element.argument.type === AST_NODE_TYPES.Identifier
          ) {
            checkIdentifier(element.argument);
          }
        });
      } else if (pattern.type === AST_NODE_TYPES.AssignmentPattern && pattern.left.type === AST_NODE_TYPES.Identifier) {
        checkIdentifier(pattern.left);
      } else if (pattern.type === AST_NODE_TYPES.RestElement && pattern.argument.type === AST_NODE_TYPES.Identifier) {
        checkIdentifier(pattern.argument);
      }
    };

    return {
      VariableDeclarator(node) {
        checkPattern(node.id);
      },
      FunctionDeclaration(node) {
        if (node.id) {
          checkIdentifier(node.id);
        }
        node.params.forEach((param) => checkPattern(param));
      },
      FunctionExpression(node) {
        if (node.id) {
          checkIdentifier(node.id);
        }
        node.params.forEach((param) => checkPattern(param));
      },
      ArrowFunctionExpression(node) {
        node.params.forEach((param) => checkPattern(param));
      },
      CatchClause(node) {
        if (node.param) {
          checkPattern(node.param);
        }
      },
      ClassDeclaration(node) {
        if (node.id) {
          checkIdentifier(node.id);
        }
      },
      TSTypeAliasDeclaration(node) {
        checkIdentifier(node.id);
      },
      TSInterfaceDeclaration(node) {
        checkIdentifier(node.id);
      },
    };
  },
});

export default noLazyIdentifiers;
