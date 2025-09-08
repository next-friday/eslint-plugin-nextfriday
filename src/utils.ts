import { basename, extname } from "node:path";

import { AST_NODE_TYPES, type TSESTree } from "@typescript-eslint/utils";

type FunctionNode = TSESTree.FunctionDeclaration | TSESTree.FunctionExpression | TSESTree.ArrowFunctionExpression;

export const getFunctionParams = (node: FunctionNode) => node.params;

export const hasMultipleParams = (node: FunctionNode) => node.params.length > 1;

export const isDestructuredParam = (param: TSESTree.Parameter) =>
  param.type === AST_NODE_TYPES.ObjectPattern || param.type === AST_NODE_TYPES.ArrayPattern;

export const hasNonDestructuredParams = (node: FunctionNode) =>
  node.params.some(
    (param: TSESTree.Parameter) => !isDestructuredParam(param) && param.type !== AST_NODE_TYPES.RestElement,
  );

export const getFileExtension = (filename: string) => extname(filename).slice(1);

export const getBaseName = (filename: string) => basename(filename, extname(filename));

export const isJsFile = (filename: string) => {
  const ext = getFileExtension(filename);
  return ext === "js" || ext === "ts";
};

export const isJsxFile = (filename: string) => {
  const ext = getFileExtension(filename);
  return ext === "jsx" || ext === "tsx";
};

export const isConfigFile = (filename: string) => {
  const baseName = getBaseName(filename);
  return (
    /\.(config|rc|setup|spec|test)$/.test(baseName) ||
    /\.(config|rc|setup|spec|test)\./.test(filename) ||
    /^\.(eslintrc|babelrc|prettierrc)/.test(filename)
  );
};
