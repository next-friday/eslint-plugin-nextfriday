import packageJson from "../package.json" assert { type: "json" };

import booleanNamingPrefix from "./rules/boolean-naming-prefix";
import enforceReadonlyComponentProps from "./rules/enforce-readonly-component-props";
import enforceSortedDestructuring from "./rules/enforce-sorted-destructuring";
import fileKebabCase from "./rules/file-kebab-case";
import jsxPascalCase from "./rules/jsx-pascal-case";
import noDirectDate from "./rules/no-direct-date";
import jsxNoVariableInCallback from "./rules/jsx-no-variable-in-callback";
import mdFilenameCaseRestriction from "./rules/md-filename-case-restriction";
import noComplexInlineReturn from "./rules/no-complex-inline-return";
import noEmoji from "./rules/no-emoji";
import noEnvFallback from "./rules/no-env-fallback";
import requireExplicitReturnType from "./rules/require-explicit-return-type";
import jsxNoNonComponentFunction from "./rules/jsx-no-non-component-function";
import noLogicInParams from "./rules/no-logic-in-params";
import noSingleCharVariables from "./rules/no-single-char-variables";
import preferDestructuringParams from "./rules/prefer-destructuring-params";
import preferFunctionDeclaration from "./rules/prefer-function-declaration";
import preferImportType from "./rules/prefer-import-type";
import preferInterfaceOverInlineTypes from "./rules/prefer-interface-over-inline-types";
import preferJSXTemplateLiterals from "./rules/prefer-jsx-template-literals";
import preferNamedParamTypes from "./rules/prefer-named-param-types";
import preferReactImportTypes from "./rules/prefer-react-import-types";
import reactPropsDestructure from "./rules/react-props-destructure";

import type { TSESLint } from "@typescript-eslint/utils";

const meta = {
  name: packageJson.name,
  version: packageJson.version,
} as const;

const rules = {
  "boolean-naming-prefix": booleanNamingPrefix,
  "enforce-readonly-component-props": enforceReadonlyComponentProps,
  "enforce-sorted-destructuring": enforceSortedDestructuring,
  "file-kebab-case": fileKebabCase,
  "jsx-pascal-case": jsxPascalCase,
  "jsx-no-non-component-function": jsxNoNonComponentFunction,
  "jsx-no-variable-in-callback": jsxNoVariableInCallback,
  "md-filename-case-restriction": mdFilenameCaseRestriction,
  "no-complex-inline-return": noComplexInlineReturn,
  "no-direct-date": noDirectDate,
  "no-emoji": noEmoji,
  "no-env-fallback": noEnvFallback,
  "require-explicit-return-type": requireExplicitReturnType,
  "no-logic-in-params": noLogicInParams,
  "no-single-char-variables": noSingleCharVariables,
  "prefer-destructuring-params": preferDestructuringParams,
  "prefer-function-declaration": preferFunctionDeclaration,
  "prefer-import-type": preferImportType,
  "prefer-interface-over-inline-types": preferInterfaceOverInlineTypes,
  "prefer-jsx-template-literals": preferJSXTemplateLiterals,
  "prefer-named-param-types": preferNamedParamTypes,
  "prefer-react-import-types": preferReactImportTypes,
  "react-props-destructure": reactPropsDestructure,
} as const satisfies Record<string, TSESLint.RuleModule<string, readonly unknown[]>>;

const plugin = {
  meta,
  rules,
} as const;

const baseRules = {
  "nextfriday/boolean-naming-prefix": "warn",
  "nextfriday/no-emoji": "warn",
  "nextfriday/enforce-sorted-destructuring": "warn",
  "nextfriday/file-kebab-case": "warn",
  "nextfriday/md-filename-case-restriction": "warn",
  "nextfriday/prefer-destructuring-params": "warn",
  "nextfriday/prefer-function-declaration": "warn",
  "nextfriday/require-explicit-return-type": "warn",
  "nextfriday/prefer-import-type": "warn",
  "nextfriday/prefer-named-param-types": "warn",
  "nextfriday/prefer-react-import-types": "warn",
  "nextfriday/no-complex-inline-return": "warn",
  "nextfriday/no-direct-date": "warn",
  "nextfriday/no-logic-in-params": "warn",
  "nextfriday/no-env-fallback": "warn",
  "nextfriday/no-single-char-variables": "warn",
} as const;

const baseRecommendedRules = {
  "nextfriday/boolean-naming-prefix": "error",
  "nextfriday/no-emoji": "error",
  "nextfriday/enforce-sorted-destructuring": "error",
  "nextfriday/file-kebab-case": "error",
  "nextfriday/md-filename-case-restriction": "error",
  "nextfriday/prefer-destructuring-params": "error",
  "nextfriday/prefer-function-declaration": "error",
  "nextfriday/require-explicit-return-type": "error",
  "nextfriday/prefer-import-type": "error",
  "nextfriday/prefer-named-param-types": "error",
  "nextfriday/prefer-react-import-types": "error",
  "nextfriday/no-complex-inline-return": "error",
  "nextfriday/no-direct-date": "error",
  "nextfriday/no-logic-in-params": "error",
  "nextfriday/no-env-fallback": "error",
  "nextfriday/no-single-char-variables": "error",
} as const;

const jsxRules = {
  "nextfriday/jsx-pascal-case": "warn",
  "nextfriday/jsx-no-non-component-function": "warn",
  "nextfriday/jsx-no-variable-in-callback": "warn",
  "nextfriday/prefer-interface-over-inline-types": "warn",
  "nextfriday/prefer-jsx-template-literals": "warn",
  "nextfriday/react-props-destructure": "warn",
  "nextfriday/enforce-readonly-component-props": "warn",
} as const;

const jsxRecommendedRules = {
  "nextfriday/jsx-pascal-case": "error",
  "nextfriday/jsx-no-non-component-function": "error",
  "nextfriday/jsx-no-variable-in-callback": "error",
  "nextfriday/prefer-interface-over-inline-types": "error",
  "nextfriday/prefer-jsx-template-literals": "error",
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
