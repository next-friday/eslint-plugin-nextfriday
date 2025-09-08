import packageJson from "../package.json" assert { type: "json" };

import fileKebabCase from "./rules/file-kebab-case";
import jsxPascalCase from "./rules/jsx-pascal-case";
import mdFilenameCaseRestriction from "./rules/md-filename-case-restriction";
import noEmoji from "./rules/no-emoji";
import noExplicitReturnType from "./rules/no-explicit-return-type";
import preferDestructuringParams from "./rules/prefer-destructuring-params";
import preferImportType from "./rules/prefer-import-type";

import type { TSESLint } from "@typescript-eslint/utils";

const meta = {
  name: packageJson.name,
  version: packageJson.version,
} as const;

const rules = {
  "file-kebab-case": fileKebabCase,
  "jsx-pascal-case": jsxPascalCase,
  "md-filename-case-restriction": mdFilenameCaseRestriction,
  "no-emoji": noEmoji,
  "no-explicit-return-type": noExplicitReturnType,
  "prefer-destructuring-params": preferDestructuringParams,
  "prefer-import-type": preferImportType,
} as const satisfies Record<string, TSESLint.RuleModule<string, readonly unknown[]>>;

const plugin = {
  meta,
  rules,
} as const;

const baseRules = {
  "nextfriday/no-emoji": "warn",
  "nextfriday/file-kebab-case": "warn",
  "nextfriday/md-filename-case-restriction": "warn",
  "nextfriday/prefer-destructuring-params": "warn",
  "nextfriday/no-explicit-return-type": "warn",
  "nextfriday/prefer-import-type": "warn",
} as const;

const baseRecommendedRules = {
  "nextfriday/no-emoji": "error",
  "nextfriday/file-kebab-case": "error",
  "nextfriday/md-filename-case-restriction": "error",
  "nextfriday/prefer-destructuring-params": "error",
  "nextfriday/no-explicit-return-type": "error",
  "nextfriday/prefer-import-type": "error",
} as const;

const jsxRules = {
  "nextfriday/jsx-pascal-case": "warn",
} as const;

const jsxRecommendedRules = {
  "nextfriday/jsx-pascal-case": "error",
} as const;

const createConfig = (configRules: Record<string, string>) => ({
  plugins: {
    nextfriday: plugin,
  },
  rules: configRules,
});

const configs = {
  base: createConfig(baseRules),
  "base/recommended": createConfig(baseRecommendedRules),
  react: createConfig({
    ...baseRules,
    ...jsxRules,
  }),
  "react/recommended": createConfig({
    ...baseRecommendedRules,
    ...jsxRecommendedRules,
  }),
  nextjs: createConfig({
    ...baseRules,
    ...jsxRules,
  }),
  "nextjs/recommended": createConfig({
    ...baseRecommendedRules,
    ...jsxRecommendedRules,
  }),
} as const;

const nextfridayPlugin = {
  meta,
  configs,
  rules,
} as const;

export { meta, configs, rules };

export default nextfridayPlugin;
