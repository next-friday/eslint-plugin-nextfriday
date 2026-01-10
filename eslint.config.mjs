import eslintConfigAirbnbExtended from "eslint-config-airbnb-extended";
import eslintConfigPrettier from "eslint-config-prettier";
import eslintJs from "@eslint/js";
import eslintPluginImportX from "eslint-plugin-import-x";
import eslintPluginJest from "eslint-plugin-jest";
import eslintPluginPrettier from "eslint-plugin-prettier";
import eslintPluginSonarjs from "eslint-plugin-sonarjs";
import typescriptEslint from "typescript-eslint";

const createGlobalIgnoresConfig = () => [
  {
    name: "global/ignores",
    ignores: [".husky", ".git/**", "lib", "node_modules/**"],
  },
];

const createJavaScriptConfig = () => [
  {
    name: "js/config",
    ...eslintJs.configs.recommended,
  },
  eslintConfigAirbnbExtended.plugins.stylistic,
  eslintConfigAirbnbExtended.plugins.importX,
  ...eslintConfigAirbnbExtended.configs.base.recommended,
];

const createTypeScriptConfig = () => [
  {
    name: "typescript-eslint/plugin",
    plugins: {
      "@typescript-eslint": typescriptEslint.plugin,
    },
  },
  ...eslintConfigAirbnbExtended.configs.base.typescript,
  ...typescriptEslint.configs.recommended,
];

const createImportConfig = () => [
  {
    name: "import-x/order/rules",
    plugins: {
      import: eslintPluginImportX,
    },
    rules: {
      "import-x/order": [
        "warn",
        {
          groups: ["builtin", "external", "internal", "parent", "sibling", "index", "type"],
          pathGroups: [
            {
              pattern: "src/**",
              group: "internal",
              position: "before",
            },
            {
              pattern: "~/**",
              group: "external",
              position: "after",
            },
          ],
          "newlines-between": "always",
        },
      ],
    },
  },
];

const createSonarJSConfig = () => [
  {
    name: "sonarjs/config",
    plugins: {
      sonarjs: eslintPluginSonarjs,
    },
    rules: {
      ...eslintPluginSonarjs.configs["recommended-legacy"].rules,
    },
  },
];

const createJestConfig = () => [
  {
    name: "jest/config",
    plugins: {
      jest: eslintPluginJest,
    },
    languageOptions: {
      globals: eslintPluginJest.environments.globals.globals,
    },
    files: ["**/*.test.js", "**/*.test.ts"],
    ...eslintPluginJest.configs["flat/recommended"],
  },
  {
    name: "jest/template-literal-test-override",
    files: ["**/prefer-jsx-template-literals.test.ts"],
    rules: {
      "no-template-curly-in-string": "off",
      "no-useless-concat": "off",
    },
  },
];

const createPrettierConfig = () => [
  {
    name: "prettier/plugin/config",
    plugins: {
      prettier: eslintPluginPrettier,
    },
  },
  {
    name: "prettier/rules",
    rules: {
      ...eslintConfigPrettier.rules,
      "prettier/prettier": "error",
    },
  },
];

export default [
  ...createGlobalIgnoresConfig(),
  ...createJavaScriptConfig(),
  ...createTypeScriptConfig(),
  ...createImportConfig(),
  ...createSonarJSConfig(),
  ...createJestConfig(),
  ...createPrettierConfig(),
];
