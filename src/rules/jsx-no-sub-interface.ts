import { AST_NODE_TYPES, ESLintUtils } from "@typescript-eslint/utils";

import { getFileExtension } from "../utils";

import type { TSESTree } from "@typescript-eslint/utils";

const createRule = ESLintUtils.RuleCreator(
  (name) =>
    `https://github.com/next-friday/eslint-plugin-nextfriday/blob/main/docs/rules/${name.replaceAll("-", "_").toUpperCase()}.md`,
);

const PROPS_WRAPPER_NAMES = new Set(["Readonly", "Required", "Partial", "PropsWithChildren", "NoInfer"]);

function unwrapWrapperType(node: TSESTree.TypeNode): TSESTree.TypeNode {
  if (
    node.type === AST_NODE_TYPES.TSTypeReference &&
    node.typeName.type === AST_NODE_TYPES.Identifier &&
    PROPS_WRAPPER_NAMES.has(node.typeName.name) &&
    node.typeArguments &&
    node.typeArguments.params.length > 0
  ) {
    return unwrapWrapperType(node.typeArguments.params[0]);
  }
  return node;
}

function getMainTypeName(typeNode: TSESTree.TypeNode | undefined): string | null {
  if (!typeNode) {
    return null;
  }
  const unwrapped = unwrapWrapperType(typeNode);
  if (unwrapped.type === AST_NODE_TYPES.TSTypeReference && unwrapped.typeName.type === AST_NODE_TYPES.Identifier) {
    return unwrapped.typeName.name;
  }
  return null;
}

function getComponentMainTypeName(
  node: TSESTree.ArrowFunctionExpression | TSESTree.FunctionDeclaration | TSESTree.FunctionExpression,
): string | null {
  const firstParam = node.params[0];
  if (!firstParam) {
    return null;
  }

  if ("typeAnnotation" in firstParam && firstParam.typeAnnotation) {
    return getMainTypeName(firstParam.typeAnnotation.typeAnnotation);
  }

  return null;
}

function isPascalCase(name: string): boolean {
  return /^[A-Z]/.test(name);
}

function getDeclarationFromExportWrapper(node: TSESTree.ProgramStatement): TSESTree.Node {
  if (node.type === AST_NODE_TYPES.ExportNamedDeclaration && node.declaration) {
    return node.declaration;
  }
  if (node.type === AST_NODE_TYPES.ExportDefaultDeclaration) {
    return node.declaration;
  }
  return node;
}

const jsxNoSubInterface = createRule({
  name: "jsx-no-sub-interface",
  meta: {
    type: "problem",
    docs: {
      description:
        "Disallow sub-interfaces and helper types in component files; keep only the main component props (extract the rest)",
    },
    schema: [],
    messages: {
      noSubInterface:
        "Sub-interface or helper type '{{ name }}' should not live in a component file. Extract it to a sibling module (e.g., a *.types.ts file or its own component file).",
    },
  },
  defaultOptions: [],
  create(context) {
    const { filename } = context;
    const extension = getFileExtension(filename);

    if (extension !== "tsx" && extension !== "jsx") {
      return {};
    }

    return {
      Program(programNode: TSESTree.Program) {
        const mainTypes = new Set<string>();
        const typeDeclarations: Array<{ name: string; node: TSESTree.Node }> = [];
        let componentCount = 0;

        for (const statement of programNode.body) {
          const declaration = getDeclarationFromExportWrapper(statement);

          if (
            declaration.type === AST_NODE_TYPES.FunctionDeclaration &&
            declaration.id &&
            isPascalCase(declaration.id.name)
          ) {
            componentCount += 1;
            const mainType = getComponentMainTypeName(declaration);
            if (mainType) {
              mainTypes.add(mainType);
            }
            continue;
          }

          if (declaration.type === AST_NODE_TYPES.VariableDeclaration) {
            for (const declarator of declaration.declarations) {
              if (declarator.id.type !== AST_NODE_TYPES.Identifier) {
                continue;
              }
              if (!isPascalCase(declarator.id.name)) {
                continue;
              }
              const init = declarator.init;
              if (
                init &&
                (init.type === AST_NODE_TYPES.ArrowFunctionExpression ||
                  init.type === AST_NODE_TYPES.FunctionExpression)
              ) {
                componentCount += 1;
                const mainType = getComponentMainTypeName(init);
                if (mainType) {
                  mainTypes.add(mainType);
                }
              }
            }
            continue;
          }

          if (declaration.type === AST_NODE_TYPES.TSInterfaceDeclaration) {
            typeDeclarations.push({ name: declaration.id.name, node: declaration });
            continue;
          }

          if (declaration.type === AST_NODE_TYPES.TSTypeAliasDeclaration) {
            typeDeclarations.push({ name: declaration.id.name, node: declaration });
            continue;
          }
        }

        if (componentCount === 0) {
          return;
        }

        for (const declaration of typeDeclarations) {
          if (mainTypes.has(declaration.name)) {
            continue;
          }

          context.report({
            node: declaration.node,
            messageId: "noSubInterface",
            data: { name: declaration.name },
          });
        }
      },
    };
  },
});

export default jsxNoSubInterface;
