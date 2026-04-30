# eslint-plugin-nextfriday

A comprehensive ESLint plugin providing custom rules and configurations for Next Friday development workflows.

## Installation

```bash
npm install --save-dev eslint-plugin-nextfriday
# or
yarn add --dev eslint-plugin-nextfriday
# or
pnpm add -D eslint-plugin-nextfriday
```

## Usage

### Flat Config (ESLint 9+)

#### Base Configuration (for pure JS/TS projects)

```js
import nextfriday from "eslint-plugin-nextfriday";

export default [nextfriday.configs.base];
// or use the recommended preset (stricter)
export default [nextfriday.configs["base/recommended"]];
```

#### React Configuration

```js
import nextfriday from "eslint-plugin-nextfriday";

export default [nextfriday.configs.react];
// or use the recommended preset
export default [nextfriday.configs["react/recommended"]];
```

#### Next.js Configuration

```js
import nextfriday from "eslint-plugin-nextfriday";

export default [nextfriday.configs.nextjs];
// or use the recommended preset
export default [nextfriday.configs["nextjs/recommended"]];
```

### Extending a Preset with Rule Overrides

To use a preset and adjust individual rules, append a second config object after the preset. Later objects override earlier ones, so you can change severity, swap options, or add rules without re-declaring the entire preset.

For example, enforce PascalCase for React components via the `react/recommended` preset (which already runs `nextfriday/jsx-pascal-case` and `nextfriday/enforce-camel-case` as errors), and add a rule override on top:

```js
import nextfriday from "eslint-plugin-nextfriday";

export default [
  nextfriday.configs["react/recommended"],

  {
    rules: {
      "nextfriday/jsx-pascal-case": "error",
      "nextfriday/enforce-props-suffix": "error",
      "nextfriday/sort-imports": "warn",
    },
  },
];
```

The first object enables every rule in `react/recommended`. The second object reaffirms `jsx-pascal-case` (already enforced — useful when you want it loud and explicit), enables `enforce-props-suffix`, and downgrades `sort-imports` from error to warning.

### Manual Configuration

#### When to use manual configuration vs a preset

Reach for a preset (`base`, `react`, `nextjs`, or any `/recommended` variant) by default. Presets are curated, kept in sync with new rules as the plugin grows, and require almost no maintenance on your side.

Choose manual configuration when one of these applies:

| Scenario                                                                            | Why manual fits better                                                                                                              |
| ----------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| You only need a few specific rules                                                  | Presets enable the full set; manual lets you adopt rules one at a time.                                                             |
| You want to opt out of new rules added in future plugin releases                    | Manual configs are explicit — new rules added to a preset would automatically apply, manual configs don't change without your edit. |
| You're consolidating multiple ESLint plugins and want fine-grained per-rule control | Avoids preset rules conflicting with rules from other plugins.                                                                      |
| You're building a higher-level shared config for your org                           | You can hand-pick exactly which NextFriday rules to bundle into your own preset.                                                    |
| You're debugging a rule conflict                                                    | Manual makes the active rule set unambiguous.                                                                                       |

For every other case — new projects, gradual adoption, library code, application code — start from a preset and use [Extending a Preset with Rule Overrides](#extending-a-preset-with-rule-overrides) when you need to adjust specific rules.

#### Manual configuration example

```js
import nextfriday from "eslint-plugin-nextfriday";

export default [
  {
    plugins: {
      nextfriday,
    },
    rules: {
      // Variable Naming
      "nextfriday/no-single-char-variables": "error",
      "nextfriday/no-lazy-identifiers": "error",
      "nextfriday/boolean-naming-prefix": "error",
      "nextfriday/enforce-camel-case": "error",
      "nextfriday/enforce-constant-case": "error",
      "nextfriday/enforce-property-case": "error",
      "nextfriday/no-misleading-constant-case": "error",

      // File Naming
      "nextfriday/file-kebab-case": "error",
      "nextfriday/jsx-pascal-case": "error",

      // Code Style
      "nextfriday/no-emoji": "error",
      "nextfriday/prefer-destructuring-params": "error",
      "nextfriday/prefer-function-declaration": "error",
      "nextfriday/require-explicit-return-type": "error",
      "nextfriday/no-complex-inline-return": "error",
      "nextfriday/no-logic-in-params": "error",
      "nextfriday/enforce-hook-naming": "error",
      "nextfriday/enforce-service-naming": "error",
      "nextfriday/enforce-sorted-destructuring": "error",
      "nextfriday/no-env-fallback": "error",
      "nextfriday/no-inline-default-export": "error",
      "nextfriday/no-direct-date": "error",
      "nextfriday/newline-after-multiline-block": "error",
      "nextfriday/newline-before-return": "error",
      "nextfriday/no-inline-nested-object": "error",
      "nextfriday/no-inline-return-properties": "error",
      "nextfriday/prefer-async-await": "error",
      "nextfriday/enforce-curly-newline": "error",
      "nextfriday/no-nested-ternary": "error",
      "nextfriday/prefer-guard-clause": "error",

      // Import Optimization
      "nextfriday/no-relative-imports": "error",
      "nextfriday/prefer-import-type": "error",
      "nextfriday/prefer-react-import-types": "error",
      "nextfriday/sort-exports": "error",
      "nextfriday/sort-imports": "error",

      // Type Patterns
      "nextfriday/enforce-type-declaration-order": "error",
      "nextfriday/no-nested-interface-declaration": "error",
      "nextfriday/prefer-named-param-types": "error",
      "nextfriday/prefer-inline-literal-union": "error",
      "nextfriday/prefer-inline-type-export": "error",
      "nextfriday/prefer-interface-over-inline-types": "error",
      "nextfriday/sort-type-alphabetically": "error",
      "nextfriday/sort-type-required-first": "error",

      // React/JSX
      "nextfriday/jsx-newline-between-elements": "error",
      "nextfriday/jsx-no-inline-object-prop": "error",
      "nextfriday/jsx-no-newline-single-line-elements": "error",
      "nextfriday/jsx-no-non-component-function": "error",
      "nextfriday/jsx-no-ternary-null": "error",
      "nextfriday/jsx-no-variable-in-callback": "error",
      "nextfriday/jsx-require-suspense": "error",
      "nextfriday/jsx-simple-props": "error",
      "nextfriday/jsx-sort-props": "error",
      "nextfriday/jsx-spread-props-last": "error",
      "nextfriday/prefer-jsx-template-literals": "error",
      "nextfriday/react-props-destructure": "error",
      "nextfriday/enforce-props-suffix": "error",
      "nextfriday/enforce-readonly-component-props": "error",

      // Next.js
      "nextfriday/nextjs-require-public-env": "error",
    },
  },
];
```

> **Note:** This plugin requires ESLint 9+ and only supports the flat config format. Legacy `.eslintrc` configurations are not supported.

### Per-Directory Configuration

ESLint flat config is an array of config objects. Each object's `files` and `ignores` glob patterns scope its rules to a subset of the project. Use this to apply different rule severities to different directories.

```js
import nextfriday from "eslint-plugin-nextfriday";

export default [
  {
    files: ["src/components/**/*.{ts,tsx}"],
    ...nextfriday.configs["react/recommended"],
  },

  {
    files: ["src/utils/**/*.ts"],
    ...nextfriday.configs.base,
  },

  {
    files: ["src/legacy/**/*.{ts,tsx}"],
    ignores: ["src/legacy/**/*"],
  },

  {
    files: ["**/*.test.{ts,tsx}"],
    rules: {
      "nextfriday/require-explicit-return-type": "off",
      "nextfriday/no-single-char-variables": "off",
    },
  },
];
```

The first config block applies the strict `react/recommended` preset (errors) to component files. The second applies the looser `base` preset (warnings) to utilities. The third excludes legacy code from linting entirely. The fourth keeps lint enabled for tests but turns off rules that conflict with common test patterns.

### Migration Strategy

For an existing codebase with many violations, enable rules gradually instead of all at once. Three patterns, in order of how disruptive each is to your team:

**1. Start with the warn-level preset.** All rules surface as warnings, so the build still passes. Fix issues at your own pace, then switch to `/recommended`.

```js
import nextfriday from "eslint-plugin-nextfriday";

export default [nextfriday.configs.react];
```

**2. Lock-in a clean directory at a time.** Use `files` to apply `/recommended` (errors) only where the code is already clean, and the warn-level preset everywhere else.

```js
import nextfriday from "eslint-plugin-nextfriday";

export default [
  nextfriday.configs.react,

  {
    files: ["src/components/v2/**/*.{ts,tsx}", "src/lib/**/*.ts"],
    ...nextfriday.configs["react/recommended"],
  },
];
```

**3. Disable individual rules until the codebase is ready.** Re-declare specific rules with a lower severity (or `"off"`) after spreading the preset. Useful when one rule produces too much noise to fix at once.

```js
import nextfriday from "eslint-plugin-nextfriday";

export default [
  nextfriday.configs["react/recommended"],

  {
    rules: {
      "nextfriday/require-explicit-return-type": "warn",
      "nextfriday/sort-imports": "off",
    },
  },
];
```

Pair these with `ignores` to skip vendored or generated files entirely:

```js
{
  ignores: ["dist/**", "build/**", "**/*.generated.ts"],
}
```

#### Prioritize rules by impact

When the warn-level preset surfaces hundreds of violations, fix them in this order — high-impact rules catch real bugs, while low-impact rules are style preferences that can wait.

| Tier                                  | Examples                                                                                                                                                                           | Why first                                                                                                                       |
| ------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| High — correctness and runtime safety | `no-direct-date`, `no-env-fallback`, `nextjs-require-public-env`, `enforce-readonly-component-props`, `jsx-no-non-component-function`, `enforce-hook-naming`, `no-logic-in-params` | Each violation can mask a bug, leak config, or break React's rules of hooks. Fix before they ship.                              |
| Medium — structure and naming         | `boolean-naming-prefix`, `enforce-camel-case`, `enforce-constant-case`, `file-kebab-case`, `jsx-pascal-case`, `enforce-props-suffix`, `prefer-import-type`                         | No runtime impact, but inconsistent naming compounds review and onboarding cost. Fix once the high tier is clean.               |
| Low — formatting and ordering         | `sort-imports`, `sort-exports`, `sort-type-alphabetically`, `jsx-sort-props`, `newline-before-return`, `newline-after-multiline-block`, `no-emoji`                                 | Cosmetic. Most are auto-fixable, so a single `pnpm eslint --fix` pass typically clears the whole codebase. Save these for last. |

In practice: turn the high tier on as `"error"` first, leave the medium tier as `"warn"` while you migrate, and run the auto-fixers for the low tier in a single dedicated PR.

## Rules

> All rules in this plugin have no configurable options (`schema: []`). The only knob is severity — set each rule to `"error"`, `"warn"`, or `"off"`. Behavior is intentionally fixed so that the same rule means the same thing across every project.

### Variable Naming Rules

| Rule                                                                     | Description                                                           | Fixable |
| ------------------------------------------------------------------------ | --------------------------------------------------------------------- | ------- |
| [no-single-char-variables](docs/rules/NO_SINGLE_CHAR_VARIABLES.md)       | Disallow single character variable names (e.g., `d`, `u`, `l`)        | ❌      |
| [no-lazy-identifiers](docs/rules/NO_LAZY_IDENTIFIERS.md)                 | Disallow lazy identifiers like `xxx`, `asdf`, `qwerty`                | ❌      |
| [boolean-naming-prefix](docs/rules/BOOLEAN_NAMING_PREFIX.md)             | Enforce boolean variables to have prefix (is, has, should, can, etc.) | ❌      |
| [enforce-camel-case](docs/rules/ENFORCE_CAMEL_CASE.md)                   | Ban snake_case and restrict PascalCase to React components            | ❌      |
| [enforce-constant-case](docs/rules/ENFORCE_CONSTANT_CASE.md)             | Enforce SCREAMING_SNAKE_CASE for global static constant values        | ❌      |
| [enforce-property-case](docs/rules/ENFORCE_PROPERTY_CASE.md)             | Enforce camelCase for unquoted object property keys                   | ❌      |
| [no-misleading-constant-case](docs/rules/NO_MISLEADING_CONSTANT_CASE.md) | Disallow SCREAMING_SNAKE_CASE in local scope and for dynamic values   | ❌      |

### File Naming Rules

| Rule                                             | Description                                          | Fixable |
| ------------------------------------------------ | ---------------------------------------------------- | ------- |
| [file-kebab-case](docs/rules/FILE_KEBAB_CASE.md) | Enforce kebab-case filenames for .ts and .js files   | ❌      |
| [jsx-pascal-case](docs/rules/JSX_PASCAL_CASE.md) | Enforce PascalCase filenames for .jsx and .tsx files | ❌      |

### Code Style Rules

| Rule                                                                         | Description                                                            | Fixable |
| ---------------------------------------------------------------------------- | ---------------------------------------------------------------------- | ------- |
| [no-emoji](docs/rules/NO_EMOJI.md)                                           | Disallow emoji characters in source code                               | ❌      |
| [prefer-destructuring-params](docs/rules/PREFER_DESTRUCTURING_PARAMS.md)     | Enforce destructuring for functions with multiple parameters           | ❌      |
| [prefer-function-declaration](docs/rules/PREFER_FUNCTION_DECLARATION.md)     | Enforce function declarations over arrow functions in .ts files        | ❌      |
| [require-explicit-return-type](docs/rules/REQUIRE_EXPLICIT_RETURN_TYPE.md)   | Require explicit return types on functions for better documentation    | ❌      |
| [no-complex-inline-return](docs/rules/NO_COMPLEX_INLINE_RETURN.md)           | Disallow complex inline expressions in return - extract to const first | ❌      |
| [no-logic-in-params](docs/rules/NO_LOGIC_IN_PARAMS.md)                       | Disallow logic/conditions in function parameters - extract to const    | ❌      |
| [enforce-hook-naming](docs/rules/ENFORCE_HOOK_NAMING.md)                     | Enforce 'use' prefix for functions in \*.hook.ts files                 | ❌      |
| [enforce-service-naming](docs/rules/ENFORCE_SERVICE_NAMING.md)               | Enforce 'fetch' prefix for async functions in \*.service.ts files      | ❌      |
| [enforce-sorted-destructuring](docs/rules/ENFORCE_SORTED_DESTRUCTURING.md)   | Enforce alphabetical sorting of destructured properties                | ✅      |
| [no-env-fallback](docs/rules/NO_ENV_FALLBACK.md)                             | Disallow fallback values for environment variables                     | ❌      |
| [no-inline-default-export](docs/rules/NO_INLINE_DEFAULT_EXPORT.md)           | Disallow inline default exports - declare first, then export           | ❌      |
| [no-direct-date](docs/rules/NO_DIRECT_DATE.md)                               | Disallow direct usage of Date constructor and methods                  | ❌      |
| [newline-after-multiline-block](docs/rules/NEWLINE_AFTER_MULTILINE_BLOCK.md) | Require a blank line after multi-line statements                       | ✅      |
| [newline-before-return](docs/rules/NEWLINE_BEFORE_RETURN.md)                 | Require a blank line before return statements                          | ✅      |
| [no-inline-nested-object](docs/rules/NO_INLINE_NESTED_OBJECT.md)             | Require nested objects and arrays to span multiple lines               | ✅      |
| [no-inline-return-properties](docs/rules/NO_INLINE_RETURN_PROPERTIES.md)     | Require return object properties to use shorthand notation             | ❌      |
| [prefer-async-await](docs/rules/PREFER_ASYNC_AWAIT.md)                       | Enforce async/await over .then() promise chains                        | ❌      |
| [enforce-curly-newline](docs/rules/ENFORCE_CURLY_NEWLINE.md)                 | Enforce curly braces for multi-line if, forbid for single-line         | ✅      |
| [no-nested-ternary](docs/rules/NO_NESTED_TERNARY.md)                         | Disallow nested ternary expressions                                    | ❌      |
| [prefer-guard-clause](docs/rules/PREFER_GUARD_CLAUSE.md)                     | Enforce guard clause pattern instead of nested if statements           | ❌      |

### Import Optimization Rules

| Rule                                                                 | Description                                               | Fixable |
| -------------------------------------------------------------------- | --------------------------------------------------------- | ------- |
| [no-relative-imports](docs/rules/NO_RELATIVE_IMPORTS.md)             | Disallow relative imports with ../ - use absolute imports | ❌      |
| [prefer-import-type](docs/rules/PREFER_IMPORT_TYPE.md)               | Enforce using 'import type' for type-only imports         | ✅      |
| [prefer-react-import-types](docs/rules/PREFER_REACT_IMPORT_TYPES.md) | Enforce direct imports from 'react' instead of React.X    | ✅      |
| [sort-exports](docs/rules/SORT_EXPORTS.md)                           | Enforce a consistent ordering of export groups            | ✅      |
| [sort-imports](docs/rules/SORT_IMPORTS.md)                           | Enforce a consistent ordering of import groups            | ✅      |

### Type Pattern Rules

| Rule                                                                                   | Description                                                      | Fixable |
| -------------------------------------------------------------------------------------- | ---------------------------------------------------------------- | ------- |
| [enforce-type-declaration-order](docs/rules/ENFORCE_TYPE_DECLARATION_ORDER.md)         | Enforce referenced types are declared after their consumer       | ❌      |
| [no-nested-interface-declaration](docs/rules/NO_NESTED_INTERFACE_DECLARATION.md)       | Disallow inline object types in interface/type properties        | ❌      |
| [prefer-named-param-types](docs/rules/PREFER_NAMED_PARAM_TYPES.md)                     | Enforce named types for function parameters with object types    | ❌      |
| [prefer-inline-literal-union](docs/rules/PREFER_INLINE_LITERAL_UNION.md)               | Enforce inlining literal union types for better IDE hover info   | ✅      |
| [prefer-inline-type-export](docs/rules/PREFER_INLINE_TYPE_EXPORT.md)                   | Require type/interface exports inline at the declaration         | ✅      |
| [prefer-interface-over-inline-types](docs/rules/PREFER_INTERFACE_OVER_INLINE_TYPES.md) | Enforce interface declarations over inline types for React props | ❌      |
| [sort-type-alphabetically](docs/rules/SORT_TYPE_ALPHABETICALLY.md)                     | Enforce A-Z sorting of properties within type groups             | ✅      |
| [sort-type-required-first](docs/rules/SORT_TYPE_REQUIRED_FIRST.md)                     | Enforce required properties before optional in types/interfaces  | ✅      |

### React/JSX Rules

| Rule                                                                                     | Description                                                           | Fixable |
| ---------------------------------------------------------------------------------------- | --------------------------------------------------------------------- | ------- |
| [jsx-newline-between-elements](docs/rules/JSX_NEWLINE_BETWEEN_ELEMENTS.md)               | Require empty lines between sibling multi-line JSX children           | ✅      |
| [jsx-no-inline-object-prop](docs/rules/JSX_NO_INLINE_OBJECT_PROP.md)                     | Disallow inline object literals in JSX props                          | ❌      |
| [jsx-no-newline-single-line-elements](docs/rules/JSX_NO_NEWLINE_SINGLE_LINE_ELEMENTS.md) | Disallow empty lines between single-line sibling JSX elements         | ✅      |
| [jsx-no-non-component-function](docs/rules/JSX_NO_NON_COMPONENT_FUNCTION.md)             | Disallow non-component functions at top level in .tsx/.jsx files      | ❌      |
| [jsx-no-ternary-null](docs/rules/JSX_NO_TERNARY_NULL.md)                                 | Enforce logical AND over ternary with null/undefined in JSX           | ✅      |
| [jsx-no-variable-in-callback](docs/rules/JSX_NO_VARIABLE_IN_CALLBACK.md)                 | Disallow variable declarations inside callback functions in JSX       | ❌      |
| [jsx-require-suspense](docs/rules/JSX_REQUIRE_SUSPENSE.md)                               | Require lazy-loaded components to be wrapped in Suspense              | ❌      |
| [jsx-simple-props](docs/rules/JSX_SIMPLE_PROPS.md)                                       | Enforce simple prop values (strings, variables, callbacks, ReactNode) | ❌      |
| [jsx-sort-props](docs/rules/JSX_SORT_PROPS.md)                                           | Enforce JSX props are sorted by value type                            | ✅      |
| [jsx-spread-props-last](docs/rules/JSX_SPREAD_PROPS_LAST.md)                             | Enforce JSX spread attributes appear after all other props            | ❌      |
| [prefer-jsx-template-literals](docs/rules/PREFER_JSX_TEMPLATE_LITERALS.md)               | Enforce template literals instead of mixing text and JSX expressions  | ✅      |
| [react-props-destructure](docs/rules/REACT_PROPS_DESTRUCTURE.md)                         | Enforce destructuring props inside React component body               | ❌      |
| [enforce-props-suffix](docs/rules/ENFORCE_PROPS_SUFFIX.md)                               | Enforce 'Props' suffix for interfaces and types in \*.tsx files       | ❌      |
| [enforce-readonly-component-props](docs/rules/ENFORCE_READONLY_COMPONENT_PROPS.md)       | Enforce Readonly wrapper for React component props                    | ✅      |

### Next.js Rules

| Rule                                                                 | Description                                                   | Fixable |
| -------------------------------------------------------------------- | ------------------------------------------------------------- | ------- |
| [nextjs-require-public-env](docs/rules/NEXTJS_REQUIRE_PUBLIC_ENV.md) | Require NEXT*PUBLIC* prefix for env vars in client components | ❌      |

## Configurations

### Configuration Presets Overview

| Preset               | Severity | Base Rules | JSX Rules | Next.js Rules | Total Rules |
| -------------------- | -------- | ---------- | --------- | ------------- | ----------- |
| `base`               | warn     | 40         | 0         | 0             | 40          |
| `base/recommended`   | error    | 40         | 0         | 0             | 40          |
| `react`              | warn     | 40         | 15        | 0             | 55          |
| `react/recommended`  | error    | 40         | 15        | 0             | 55          |
| `nextjs`             | warn     | 40         | 15        | 1             | 56          |
| `nextjs/recommended` | error    | 40         | 15        | 1             | 56          |

### Base Configuration Rules (40 rules)

Included in `base`, `base/recommended`, and all other presets:

- `nextfriday/boolean-naming-prefix`
- `nextfriday/enforce-camel-case`
- `nextfriday/enforce-constant-case`
- `nextfriday/enforce-curly-newline`
- `nextfriday/enforce-hook-naming`
- `nextfriday/enforce-property-case`
- `nextfriday/enforce-service-naming`
- `nextfriday/enforce-sorted-destructuring`
- `nextfriday/enforce-type-declaration-order`
- `nextfriday/file-kebab-case`
- `nextfriday/newline-after-multiline-block`
- `nextfriday/newline-before-return`
- `nextfriday/no-complex-inline-return`
- `nextfriday/no-direct-date`
- `nextfriday/no-emoji`
- `nextfriday/no-env-fallback`
- `nextfriday/no-inline-default-export`
- `nextfriday/no-inline-nested-object`
- `nextfriday/no-inline-return-properties`
- `nextfriday/no-lazy-identifiers`
- `nextfriday/no-logic-in-params`
- `nextfriday/no-misleading-constant-case`
- `nextfriday/no-nested-interface-declaration`
- `nextfriday/no-nested-ternary`
- `nextfriday/no-relative-imports`
- `nextfriday/no-single-char-variables`
- `nextfriday/prefer-async-await`
- `nextfriday/prefer-destructuring-params`
- `nextfriday/prefer-function-declaration`
- `nextfriday/prefer-guard-clause`
- `nextfriday/prefer-import-type`
- `nextfriday/prefer-inline-literal-union`
- `nextfriday/prefer-inline-type-export`
- `nextfriday/prefer-named-param-types`
- `nextfriday/prefer-react-import-types`
- `nextfriday/require-explicit-return-type`
- `nextfriday/sort-exports`
- `nextfriday/sort-imports`
- `nextfriday/sort-type-alphabetically`
- `nextfriday/sort-type-required-first`

### JSX Rules (16 rules)

Additionally included in `react`, `react/recommended`, `nextjs`, `nextjs/recommended`:

- `nextfriday/enforce-props-suffix`
- `nextfriday/enforce-readonly-component-props`
- `nextfriday/jsx-newline-between-elements`
- `nextfriday/jsx-no-inline-object-prop`
- `nextfriday/jsx-no-newline-single-line-elements`
- `nextfriday/jsx-no-non-component-function`
- `nextfriday/jsx-no-ternary-null`
- `nextfriday/jsx-no-variable-in-callback`
- `nextfriday/jsx-pascal-case`
- `nextfriday/jsx-require-suspense`
- `nextfriday/jsx-simple-props`
- `nextfriday/jsx-sort-props`
- `nextfriday/jsx-spread-props-last`
- `nextfriday/prefer-interface-over-inline-types`
- `nextfriday/prefer-jsx-template-literals`
- `nextfriday/react-props-destructure`

### Next.js Only Rules (1 rule)

Additionally included in `nextjs`, `nextjs/recommended` only:

- `nextfriday/nextjs-require-public-env`

### Severity Levels

- **`base` / `react` / `nextjs`**: All rules set to `"warn"`
- **`base/recommended` / `react/recommended` / `nextjs/recommended`**: All rules set to `"error"`

## Features

- **Variable naming enforcement**: Prevent cryptic single-character names and enforce boolean prefixes
- **File naming enforcement**: Ensure consistent file naming conventions (kebab-case, PascalCase, SNAKE_CASE)
- **Function style**: Enforce function declarations over arrow functions in utility files
- **Import optimization**: Automatically suggests better import patterns for TypeScript
- **Code cleanup**: Helps remove unnecessary explicit type annotations
- **React component conventions**: Enforces naming standards and patterns for JSX/TSX files
- **Clean code practices**: Prevents emoji usage, enforces parameter destructuring, and more
- **Formatting rules**: Enforces consistent blank lines around multi-line blocks and return statements

## Agent Skill

This plugin ships with an [Agent Skill](https://github.com/anthropics/skills) that teaches AI coding assistants (Claude Code, Cursor, etc.) all 56 rules so they generate compliant code from the start.

```bash
npx skills add next-friday/eslint-plugin-nextfriday --skill eslint-plugin-nextfriday
```

Once installed, AI assistants will automatically follow the naming, code style, type, JSX, import, and formatting patterns enforced by this plugin — reducing lint errors to zero.

## Need Help?

If you encounter any issues or have questions:

- Check the [rule documentation](docs/rules) for detailed examples
- Report bugs or request features at: <https://github.com/next-friday/eslint-plugin-nextfriday/issues>

## License

MIT
