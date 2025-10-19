import packageJson from "../package.json" assert { type: "json" };

import enforceReadonlyComponentProps from "./rules/enforce-readonly-component-props";
import fileKebabCase from "./rules/file-kebab-case";
import jsxPascalCase from "./rules/jsx-pascal-case";
import mdFilenameCaseRestriction from "./rules/md-filename-case-restriction";
import noComplexInlineReturn from "./rules/no-complex-inline-return";
import noEmoji from "./rules/no-emoji";
import noExplicitReturnType from "./rules/no-explicit-return-type";
import noLogicInParams from "./rules/no-logic-in-params";
import preferDestructuringParams from "./rules/prefer-destructuring-params";
import preferImportType from "./rules/prefer-import-type";
import preferInterfaceOverInlineTypes from "./rules/prefer-interface-over-inline-types";
import preferNamedParamTypes from "./rules/prefer-named-param-types";
import preferReactImportTypes from "./rules/prefer-react-import-types";
import reactPropsDestructure from "./rules/react-props-destructure";

import type { TSESLint } from "@typescript-eslint/utils";

const meta = {
  name: packageJson.name,
  version: packageJson.version,
} as const;

const rules = {
  "enforce-readonly-component-props": enforceReadonlyComponentProps,
  "file-kebab-case": fileKebabCase,
  "jsx-pascal-case": jsxPascalCase,
  "md-filename-case-restriction": mdFilenameCaseRestriction,
  "no-complex-inline-return": noComplexInlineReturn,
  "no-emoji": noEmoji,
  "no-explicit-return-type": noExplicitReturnType,
  "no-logic-in-params": noLogicInParams,
  "prefer-destructuring-params": preferDestructuringParams,
  "prefer-import-type": preferImportType,
  "prefer-interface-over-inline-types": preferInterfaceOverInlineTypes,
  "prefer-named-param-types": preferNamedParamTypes,
  "prefer-react-import-types": preferReactImportTypes,
  "react-props-destructure": reactPropsDestructure,
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
  "nextfriday/prefer-named-param-types": "warn",
  "nextfriday/prefer-react-import-types": "warn",
  "nextfriday/no-complex-inline-return": "warn",
  "nextfriday/no-logic-in-params": "warn",
} as const;

const baseRecommendedRules = {
  "nextfriday/no-emoji": "error",
  "nextfriday/file-kebab-case": "error",
  "nextfriday/md-filename-case-restriction": "error",
  "nextfriday/prefer-destructuring-params": "error",
  "nextfriday/no-explicit-return-type": "error",
  "nextfriday/prefer-import-type": "error",
  "nextfriday/prefer-named-param-types": "error",
  "nextfriday/prefer-react-import-types": "error",
  "nextfriday/no-complex-inline-return": "error",
  "nextfriday/no-logic-in-params": "error",
} as const;

const jsxRules = {
  "nextfriday/jsx-pascal-case": "warn",
  "nextfriday/prefer-interface-over-inline-types": "warn",
  "nextfriday/react-props-destructure": "warn",
  "nextfriday/enforce-readonly-component-props": "warn",
} as const;

const jsxRecommendedRules = {
  "nextfriday/jsx-pascal-case": "error",
  "nextfriday/prefer-interface-over-inline-types": "error",
  "nextfriday/react-props-destructure": "error",
  "nextfriday/enforce-readonly-component-props": "error",
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

export default nextfridayPlugin;

export { meta, configs, rules };
