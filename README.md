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

#### Bundled Plugin Configs

Pre-configured configs for popular plugins. No extra install needed — they ship as dependencies. These configs are arrays, so use the spread operator (`...`) to merge them into your flat config.

```js
import nextfriday from "eslint-plugin-nextfriday";

export default [nextfriday.configs["react/recommended"], ...nextfriday.configs.sonarjs, ...nextfriday.configs.unicorn];
```

| Config    | Plugin                | Description                                                                                                |
| --------- | --------------------- | ---------------------------------------------------------------------------------------------------------- |
| `sonarjs` | eslint-plugin-sonarjs | SonarJS recommended rules for bug detection and code quality                                               |
| `unicorn` | eslint-plugin-unicorn | Unicorn recommended rules (with `filename-case` and `prevent-abbreviations` off, `no-null` off in JSX/TSX) |

### Manual Configuration

You can also configure individual rules by registering the plugin and enabling rules manually. See the [rules reference](#rules) below for the full list of available rules.

```js
import nextfriday from "eslint-plugin-nextfriday";

export default [
  {
    plugins: { nextfriday },
    rules: {
      "nextfriday/boolean-naming-prefix": "error",
      "nextfriday/enforce-constant-case": "warn",
    },
  },
];
```

> **Note:** This plugin requires ESLint 9+ and only supports the flat config format.

## Rules

### Variable Naming Rules

| Rule                                                               | Description                                                           | Fixable |
| ------------------------------------------------------------------ | --------------------------------------------------------------------- | ------- |
| [no-single-char-variables](docs/rules/NO_SINGLE_CHAR_VARIABLES.md) | Disallow single character variable names (e.g., `d`, `u`, `l`)        | ❌      |
| [no-lazy-identifiers](docs/rules/NO_LAZY_IDENTIFIERS.md)           | Disallow lazy identifiers like `xxx`, `asdf`, `qwerty`                | ❌      |
| [boolean-naming-prefix](docs/rules/BOOLEAN_NAMING_PREFIX.md)       | Enforce boolean variables to have prefix (is, has, should, can, etc.) | ❌      |
| [enforce-constant-case](docs/rules/ENFORCE_CONSTANT_CASE.md)       | Enforce SCREAMING_SNAKE_CASE for constant primitive values            | ❌      |

### File Naming Rules

| Rule                                                                       | Description                                          | Fixable |
| -------------------------------------------------------------------------- | ---------------------------------------------------- | ------- |
| [file-kebab-case](docs/rules/FILE_KEBAB_CASE.md)                           | Enforce kebab-case filenames for .ts and .js files   | ❌      |
| [jsx-pascal-case](docs/rules/JSX_PASCAL_CASE.md)                           | Enforce PascalCase filenames for .jsx and .tsx files | ❌      |
| [md-filename-case-restriction](docs/rules/MD_FILENAME_CASE_RESTRICTION.md) | Enforce SNAKE_CASE filenames for .md files           | ❌      |

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
| [prefer-interface-over-inline-types](docs/rules/PREFER_INTERFACE_OVER_INLINE_TYPES.md) | Enforce interface declarations over inline types for React props | ❌      |
| [sort-type-alphabetically](docs/rules/SORT_TYPE_ALPHABETICALLY.md)                     | Enforce A-Z sorting of properties within type groups             | ✅      |
| [sort-type-required-first](docs/rules/SORT_TYPE_REQUIRED_FIRST.md)                     | Enforce required properties before optional in types/interfaces  | ✅      |

### React/JSX Rules

| Rule                                                                                     | Description                                                           | Fixable |
| ---------------------------------------------------------------------------------------- | --------------------------------------------------------------------- | ------- |
| [jsx-newline-between-elements](docs/rules/JSX_NEWLINE_BETWEEN_ELEMENTS.md)               | Require empty lines between sibling multi-line JSX elements           | ✅      |
| [jsx-no-inline-object-prop](docs/rules/JSX_NO_INLINE_OBJECT_PROP.md)                     | Disallow inline object literals in JSX props                          | ❌      |
| [jsx-no-newline-single-line-elements](docs/rules/JSX_NO_NEWLINE_SINGLE_LINE_ELEMENTS.md) | Disallow empty lines between single-line sibling JSX elements         | ✅      |
| [jsx-no-non-component-function](docs/rules/JSX_NO_NON_COMPONENT_FUNCTION.md)             | Disallow non-component functions at top level in .tsx/.jsx files      | ❌      |
| [jsx-no-variable-in-callback](docs/rules/JSX_NO_VARIABLE_IN_CALLBACK.md)                 | Disallow variable declarations inside callback functions in JSX       | ❌      |
| [jsx-require-suspense](docs/rules/JSX_REQUIRE_SUSPENSE.md)                               | Require lazy-loaded components to be wrapped in Suspense              | ❌      |
| [jsx-simple-props](docs/rules/JSX_SIMPLE_PROPS.md)                                       | Enforce simple prop values (strings, variables, callbacks, ReactNode) | ❌      |
| [jsx-sort-props](docs/rules/JSX_SORT_PROPS.md)                                           | Enforce JSX props are sorted by value type                            | ❌      |
| [prefer-jsx-template-literals](docs/rules/PREFER_JSX_TEMPLATE_LITERALS.md)               | Enforce template literals instead of mixing text and JSX expressions  | ✅      |
| [react-props-destructure](docs/rules/REACT_PROPS_DESTRUCTURE.md)                         | Enforce destructuring props inside React component body               | ❌      |
| [enforce-props-suffix](docs/rules/ENFORCE_PROPS_SUFFIX.md)                               | Enforce 'Props' suffix for interfaces and types in \*.tsx files       | ❌      |
| [enforce-readonly-component-props](docs/rules/ENFORCE_READONLY_COMPONENT_PROPS.md)       | Enforce Readonly wrapper for React component props                    | ✅      |

### Next.js Rules

| Rule                                                                 | Description                                                   | Fixable |
| -------------------------------------------------------------------- | ------------------------------------------------------------- | ------- |
| [nextjs-require-public-env](docs/rules/NEXTJS_REQUIRE_PUBLIC_ENV.md) | Require NEXT*PUBLIC* prefix for env vars in client components | ❌      |

## Configurations

Each preset includes all rules from the tiers below it. The `warn` variant uses `"warn"` severity; the `recommended` variant uses `"error"`.

| Preset               | Base (36) | JSX (14) | Next.js (1) | Total |
| -------------------- | --------- | -------- | ----------- | ----- |
| `base`               | warn      | -        | -           | 36    |
| `base/recommended`   | error     | -        | -           | 36    |
| `react`              | warn      | warn     | -           | 50    |
| `react/recommended`  | error     | error    | -           | 50    |
| `nextjs`             | warn      | warn     | warn        | 51    |
| `nextjs/recommended` | error     | error    | error       | 51    |

## Requirements

- Node.js >= 22.0.0
- ESLint >= 9.0.0 (flat config only)

## Agent Skill

This plugin ships with an [Agent Skill](https://github.com/anthropics/skills) that teaches AI coding assistants all 51 rules so they generate compliant code from the start.

```bash
npx skills add next-friday/eslint-plugin-nextfriday --skill eslint-plugin-nextfriday
```

## License

MIT
