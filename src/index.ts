import rawSonarjs from "eslint-plugin-sonarjs";
import rawUnicorn from "eslint-plugin-unicorn";

import packageJson from "../package.json" assert { type: "json" };

import booleanNamingPrefix from "./rules/boolean-naming-prefix";
import enforceCamelCase from "./rules/enforce-camel-case";
import enforceConstantCase from "./rules/enforce-constant-case";
import enforceCurlyNewline from "./rules/enforce-curly-newline";
import enforceHookNaming from "./rules/enforce-hook-naming";
import enforcePropertyCase from "./rules/enforce-property-case";
import enforcePropsSuffix from "./rules/enforce-props-suffix";
import enforceReadonlyComponentProps from "./rules/enforce-readonly-component-props";
import enforceServiceNaming from "./rules/enforce-service-naming";
import enforceSortedDestructuring from "./rules/enforce-sorted-destructuring";
import enforceTypeDeclarationOrder from "./rules/enforce-type-declaration-order";
import fileKebabCase from "./rules/file-kebab-case";
import jsxNewlineBetweenElements from "./rules/jsx-newline-between-elements";
import jsxNoInlineObjectProp from "./rules/jsx-no-inline-object-prop";
import jsxNoNewlineSingleLineElements from "./rules/jsx-no-newline-single-line-elements";
import jsxNoNonComponentFunction from "./rules/jsx-no-non-component-function";
import jsxNoTernaryNull from "./rules/jsx-no-ternary-null";
import jsxNoVariableInCallback from "./rules/jsx-no-variable-in-callback";
import jsxPascalCase from "./rules/jsx-pascal-case";
import jsxRequireSuspense from "./rules/jsx-require-suspense";
import jsxSimpleProps from "./rules/jsx-simple-props";
import jsxSortProps from "./rules/jsx-sort-props";
import newlineAfterMultilineBlock from "./rules/newline-after-multiline-block";
import newlineBeforeReturn from "./rules/newline-before-return";
import nextjsRequirePublicEnv from "./rules/nextjs-require-public-env";
import noComplexInlineReturn from "./rules/no-complex-inline-return";
import noDirectDate from "./rules/no-direct-date";
import noEmoji from "./rules/no-emoji";
import noEnvFallback from "./rules/no-env-fallback";
import noInlineDefaultExport from "./rules/no-inline-default-export";
import noInlineNestedObject from "./rules/no-inline-nested-object";
import noInlineReturnProperties from "./rules/no-inline-return-properties";
import noLazyIdentifiers from "./rules/no-lazy-identifiers";
import noLogicInParams from "./rules/no-logic-in-params";
import noMisleadingConstantCase from "./rules/no-misleading-constant-case";
import noNestedInterfaceDeclaration from "./rules/no-nested-interface-declaration";
import noNestedTernary from "./rules/no-nested-ternary";
import noRelativeImports from "./rules/no-relative-imports";
import noSingleCharVariables from "./rules/no-single-char-variables";
import preferAsyncAwait from "./rules/prefer-async-await";
import preferDestructuringParams from "./rules/prefer-destructuring-params";
import preferFunctionDeclaration from "./rules/prefer-function-declaration";
import preferGuardClause from "./rules/prefer-guard-clause";
import preferImportType from "./rules/prefer-import-type";
import preferInlineLiteralUnion from "./rules/prefer-inline-literal-union";
import preferInlineTypeExport from "./rules/prefer-inline-type-export";
import preferInterfaceOverInlineTypes from "./rules/prefer-interface-over-inline-types";
import preferJSXTemplateLiterals from "./rules/prefer-jsx-template-literals";
import preferNamedParamTypes from "./rules/prefer-named-param-types";
import preferReactImportTypes from "./rules/prefer-react-import-types";
import reactPropsDestructure from "./rules/react-props-destructure";
import requireExplicitReturnType from "./rules/require-explicit-return-type";
import sortExports from "./rules/sort-exports";
import sortImports from "./rules/sort-imports";
import sortTypeAlphabetically from "./rules/sort-type-alphabetically";
import sortTypeRequiredFirst from "./rules/sort-type-required-first";

import type { TSESLint } from "@typescript-eslint/utils";

interface ExternalPlugin {
  default?: ExternalPlugin;
  configs: { recommended: { rules: Record<string, string> } };
}

const meta = {
  name: packageJson.name,
  version: packageJson.version,
} as const;

const rules = {
  "boolean-naming-prefix": booleanNamingPrefix,
  "enforce-camel-case": enforceCamelCase,
  "enforce-constant-case": enforceConstantCase,
  "enforce-curly-newline": enforceCurlyNewline,
  "enforce-hook-naming": enforceHookNaming,
  "enforce-property-case": enforcePropertyCase,
  "enforce-props-suffix": enforcePropsSuffix,
  "enforce-readonly-component-props": enforceReadonlyComponentProps,
  "enforce-service-naming": enforceServiceNaming,
  "enforce-sorted-destructuring": enforceSortedDestructuring,
  "enforce-type-declaration-order": enforceTypeDeclarationOrder,
  "file-kebab-case": fileKebabCase,
  "jsx-newline-between-elements": jsxNewlineBetweenElements,
  "jsx-no-inline-object-prop": jsxNoInlineObjectProp,
  "jsx-no-newline-single-line-elements": jsxNoNewlineSingleLineElements,
  "jsx-no-non-component-function": jsxNoNonComponentFunction,
  "jsx-no-ternary-null": jsxNoTernaryNull,
  "jsx-no-variable-in-callback": jsxNoVariableInCallback,
  "jsx-pascal-case": jsxPascalCase,
  "jsx-require-suspense": jsxRequireSuspense,
  "jsx-simple-props": jsxSimpleProps,
  "jsx-sort-props": jsxSortProps,
  "newline-after-multiline-block": newlineAfterMultilineBlock,
  "newline-before-return": newlineBeforeReturn,
  "nextjs-require-public-env": nextjsRequirePublicEnv,
  "no-complex-inline-return": noComplexInlineReturn,
  "no-direct-date": noDirectDate,
  "no-emoji": noEmoji,
  "no-env-fallback": noEnvFallback,
  "no-inline-default-export": noInlineDefaultExport,
  "no-inline-nested-object": noInlineNestedObject,
  "no-inline-return-properties": noInlineReturnProperties,
  "no-lazy-identifiers": noLazyIdentifiers,
  "no-logic-in-params": noLogicInParams,
  "no-misleading-constant-case": noMisleadingConstantCase,
  "no-nested-interface-declaration": noNestedInterfaceDeclaration,
  "no-nested-ternary": noNestedTernary,
  "no-relative-imports": noRelativeImports,
  "no-single-char-variables": noSingleCharVariables,
  "prefer-async-await": preferAsyncAwait,
  "prefer-destructuring-params": preferDestructuringParams,
  "prefer-function-declaration": preferFunctionDeclaration,
  "prefer-guard-clause": preferGuardClause,
  "prefer-import-type": preferImportType,
  "prefer-inline-literal-union": preferInlineLiteralUnion,
  "prefer-inline-type-export": preferInlineTypeExport,
  "prefer-interface-over-inline-types": preferInterfaceOverInlineTypes,
  "prefer-jsx-template-literals": preferJSXTemplateLiterals,
  "prefer-named-param-types": preferNamedParamTypes,
  "prefer-react-import-types": preferReactImportTypes,
  "react-props-destructure": reactPropsDestructure,
  "require-explicit-return-type": requireExplicitReturnType,
  "sort-exports": sortExports,
  "sort-imports": sortImports,
  "sort-type-alphabetically": sortTypeAlphabetically,
  "sort-type-required-first": sortTypeRequiredFirst,
} as const satisfies Record<string, TSESLint.RuleModule<string, readonly unknown[]>>;

const plugin = {
  meta,
  rules,
} as const;

const baseRules = {
  "nextfriday/boolean-naming-prefix": "warn",
  "nextfriday/enforce-camel-case": "warn",
  "nextfriday/enforce-constant-case": "warn",
  "nextfriday/enforce-curly-newline": "warn",
  "nextfriday/enforce-hook-naming": "warn",
  "nextfriday/enforce-property-case": "warn",
  "nextfriday/enforce-service-naming": "warn",
  "nextfriday/enforce-sorted-destructuring": "warn",
  "nextfriday/enforce-type-declaration-order": "warn",
  "nextfriday/file-kebab-case": "warn",
  "nextfriday/newline-after-multiline-block": "warn",
  "nextfriday/newline-before-return": "warn",
  "nextfriday/no-complex-inline-return": "warn",
  "nextfriday/no-direct-date": "warn",
  "nextfriday/no-emoji": "warn",
  "nextfriday/no-env-fallback": "warn",
  "nextfriday/no-inline-default-export": "warn",
  "nextfriday/no-inline-nested-object": "warn",
  "nextfriday/no-inline-return-properties": "warn",
  "nextfriday/no-lazy-identifiers": "warn",
  "nextfriday/no-logic-in-params": "warn",
  "nextfriday/no-misleading-constant-case": "warn",
  "nextfriday/no-nested-interface-declaration": "warn",
  "nextfriday/no-nested-ternary": "warn",
  "nextfriday/no-relative-imports": "warn",
  "nextfriday/no-single-char-variables": "warn",
  "nextfriday/prefer-async-await": "warn",
  "nextfriday/prefer-destructuring-params": "warn",
  "nextfriday/prefer-function-declaration": "warn",
  "nextfriday/prefer-guard-clause": "warn",
  "nextfriday/prefer-import-type": "warn",
  "nextfriday/prefer-inline-literal-union": "warn",
  "nextfriday/prefer-inline-type-export": "warn",
  "nextfriday/prefer-named-param-types": "warn",
  "nextfriday/prefer-react-import-types": "warn",
  "nextfriday/require-explicit-return-type": "warn",
  "nextfriday/sort-exports": "warn",
  "nextfriday/sort-imports": "warn",
  "nextfriday/sort-type-alphabetically": "warn",
  "nextfriday/sort-type-required-first": "warn",
} as const;

const baseRecommendedRules = {
  "nextfriday/boolean-naming-prefix": "error",
  "nextfriday/enforce-camel-case": "error",
  "nextfriday/enforce-constant-case": "error",
  "nextfriday/enforce-curly-newline": "error",
  "nextfriday/enforce-hook-naming": "error",
  "nextfriday/enforce-property-case": "error",
  "nextfriday/enforce-service-naming": "error",
  "nextfriday/enforce-sorted-destructuring": "error",
  "nextfriday/enforce-type-declaration-order": "error",
  "nextfriday/file-kebab-case": "error",
  "nextfriday/newline-after-multiline-block": "error",
  "nextfriday/newline-before-return": "error",
  "nextfriday/no-complex-inline-return": "error",
  "nextfriday/no-direct-date": "error",
  "nextfriday/no-emoji": "error",
  "nextfriday/no-env-fallback": "error",
  "nextfriday/no-inline-default-export": "error",
  "nextfriday/no-inline-nested-object": "error",
  "nextfriday/no-inline-return-properties": "error",
  "nextfriday/no-lazy-identifiers": "error",
  "nextfriday/no-logic-in-params": "error",
  "nextfriday/no-misleading-constant-case": "error",
  "nextfriday/no-nested-interface-declaration": "error",
  "nextfriday/no-nested-ternary": "error",
  "nextfriday/no-relative-imports": "error",
  "nextfriday/no-single-char-variables": "error",
  "nextfriday/prefer-async-await": "error",
  "nextfriday/prefer-destructuring-params": "error",
  "nextfriday/prefer-function-declaration": "error",
  "nextfriday/prefer-guard-clause": "error",
  "nextfriday/prefer-import-type": "error",
  "nextfriday/prefer-inline-literal-union": "error",
  "nextfriday/prefer-inline-type-export": "error",
  "nextfriday/prefer-named-param-types": "error",
  "nextfriday/prefer-react-import-types": "error",
  "nextfriday/require-explicit-return-type": "error",
  "nextfriday/sort-exports": "error",
  "nextfriday/sort-imports": "error",
  "nextfriday/sort-type-alphabetically": "error",
  "nextfriday/sort-type-required-first": "error",
} as const;

const jsxRules = {
  "nextfriday/enforce-props-suffix": "warn",
  "nextfriday/enforce-readonly-component-props": "warn",
  "nextfriday/jsx-newline-between-elements": "warn",
  "nextfriday/jsx-no-inline-object-prop": "warn",
  "nextfriday/jsx-no-newline-single-line-elements": "warn",
  "nextfriday/jsx-no-non-component-function": "warn",
  "nextfriday/jsx-no-ternary-null": "warn",
  "nextfriday/jsx-no-variable-in-callback": "warn",
  "nextfriday/jsx-pascal-case": "warn",
  "nextfriday/jsx-require-suspense": "warn",
  "nextfriday/jsx-simple-props": "warn",
  "nextfriday/jsx-sort-props": "warn",
  "nextfriday/prefer-interface-over-inline-types": "warn",
  "nextfriday/prefer-jsx-template-literals": "warn",
  "nextfriday/react-props-destructure": "warn",
} as const;

const jsxRecommendedRules = {
  "nextfriday/enforce-props-suffix": "error",
  "nextfriday/enforce-readonly-component-props": "error",
  "nextfriday/jsx-newline-between-elements": "error",
  "nextfriday/jsx-no-inline-object-prop": "error",
  "nextfriday/jsx-no-newline-single-line-elements": "error",
  "nextfriday/jsx-no-non-component-function": "error",
  "nextfriday/jsx-no-ternary-null": "error",
  "nextfriday/jsx-no-variable-in-callback": "error",
  "nextfriday/jsx-pascal-case": "error",
  "nextfriday/jsx-require-suspense": "error",
  "nextfriday/jsx-simple-props": "error",
  "nextfriday/jsx-sort-props": "error",
  "nextfriday/prefer-interface-over-inline-types": "error",
  "nextfriday/prefer-jsx-template-literals": "error",
  "nextfriday/react-props-destructure": "error",
} as const;

const nextjsOnlyRules = {
  "nextfriday/nextjs-require-public-env": "warn",
} as const;

const nextjsOnlyRecommendedRules = {
  "nextfriday/nextjs-require-public-env": "error",
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
    ...nextjsOnlyRules,
  }),
  "nextjs/recommended": createConfig({
    ...baseRecommendedRules,
    ...jsxRecommendedRules,
    ...nextjsOnlyRecommendedRules,
  }),
  get sonarjs() {
    const pluginSonarjs = ((rawSonarjs as ExternalPlugin).default ?? rawSonarjs) as ExternalPlugin;
    const sonarjsRules = pluginSonarjs.configs.recommended.rules;
    return [
      {
        name: "sonarjs/config",
        plugins: {
          sonarjs: pluginSonarjs as unknown as TSESLint.FlatConfig.Plugin,
        },
        rules: {
          ...sonarjsRules,
        },
      },
    ];
  },
  get unicorn() {
    const pluginUnicorn = ((rawUnicorn as ExternalPlugin).default ?? rawUnicorn) as ExternalPlugin;
    const unicornRules = pluginUnicorn.configs.recommended.rules;
    return [
      {
        name: "unicorn/config",
        plugins: {
          unicorn: pluginUnicorn as unknown as TSESLint.FlatConfig.Plugin,
        },
        rules: {
          ...unicornRules,
          "unicorn/filename-case": "off",
          "unicorn/prevent-abbreviations": "off",
        },
      },
      {
        name: "unicorn/jsx-tsx-exceptions",
        files: ["**/*.jsx", "**/*.tsx"],
        rules: {
          "unicorn/no-null": "off",
        },
      },
    ];
  },
};

const nextfridayPlugin = {
  meta,
  configs,
  rules,
} as const;

export default nextfridayPlugin;

export { meta, configs, rules };
