import noEmoji from "./rules/no-emoji";
import fileKebabCase from "./rules/file-kebab-case";
import jsxPascalCase from "./rules/jsx-pascal-case";
import preferDestructuringParams from "./rules/prefer-destructuring-params";
import noExplicitReturnType from "./rules/no-explicit-return-type";
import preferImportType from "./rules/prefer-import-type";
import mdFilenameCaseRestriction from "./rules/md-filename-case-restriction";

import type { TSESLint } from "@typescript-eslint/utils";

const rules: Record<string, TSESLint.RuleModule<string, readonly unknown[]>> = {
  "file-kebab-case": fileKebabCase,
  "jsx-pascal-case": jsxPascalCase,
  "md-filename-case-restriction": mdFilenameCaseRestriction,
  "no-emoji": noEmoji,
  "no-explicit-return-type": noExplicitReturnType,
  "prefer-destructuring-params": preferDestructuringParams,
  "prefer-import-type": preferImportType,
};

export default rules;
