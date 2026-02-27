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

### Manual Configuration

If you prefer to configure rules manually:

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
      "nextfriday/enforce-constant-case": "error",

      // File Naming
      "nextfriday/file-kebab-case": "error",
      "nextfriday/jsx-pascal-case": "error",
      "nextfriday/md-filename-case-restriction": "error",

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
      "nextfriday/newline-after-multiline-block": "error",
      "nextfriday/newline-before-return": "error",
      "nextfriday/no-inline-nested-object": "error",
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
      "nextfriday/prefer-named-param-types": "error",
      "nextfriday/prefer-interface-over-inline-types": "error",
      "nextfriday/sort-type-alphabetically": "error",
      "nextfriday/sort-type-required-first": "error",

      // React/JSX
      "nextfriday/jsx-newline-between-elements": "error",
      "nextfriday/jsx-no-inline-object-prop": "error",
      "nextfriday/jsx-no-newline-single-line-elements": "error",
      "nextfriday/jsx-no-non-component-function": "error",
      "nextfriday/jsx-no-variable-in-callback": "error",
      "nextfriday/jsx-require-suspense": "error",
      "nextfriday/jsx-simple-props": "error",
      "nextfriday/jsx-sort-props": "error",
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

### Legacy Config (ESLint 8 and below)

#### Base Legacy Configuration

```js
module.exports = {
  plugins: ["nextfriday"],
  extends: ["plugin:nextfriday/base"], // or "plugin:nextfriday/base/recommended"
};
```

#### React Legacy Configuration

```js
module.exports = {
  plugins: ["nextfriday"],
  extends: ["plugin:nextfriday/react"], // or "plugin:nextfriday/react/recommended"
};
```

#### Next.js Legacy Configuration

```js
module.exports = {
  plugins: ["nextfriday"],
  extends: ["plugin:nextfriday/nextjs"], // or "plugin:nextfriday/nextjs/recommended"
};
```

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
| [enforce-sorted-destructuring](docs/rules/ENFORCE_SORTED_DESTRUCTURING.md)   | Enforce alphabetical sorting of destructured properties                | ❌      |
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
| [sort-exports](docs/rules/SORT_EXPORTS.md)                           | Enforce a consistent ordering of export groups            | ❌      |
| [sort-imports](docs/rules/SORT_IMPORTS.md)                           | Enforce a consistent ordering of import groups            | ❌      |

### Type Pattern Rules

| Rule                                                                                   | Description                                                      | Fixable |
| -------------------------------------------------------------------------------------- | ---------------------------------------------------------------- | ------- |
| [prefer-named-param-types](docs/rules/PREFER_NAMED_PARAM_TYPES.md)                     | Enforce named types for function parameters with object types    | ❌      |
| [prefer-interface-over-inline-types](docs/rules/PREFER_INTERFACE_OVER_INLINE_TYPES.md) | Enforce interface declarations over inline types for React props | ❌      |
| [sort-type-alphabetically](docs/rules/SORT_TYPE_ALPHABETICALLY.md)                     | Enforce A-Z sorting of properties within type groups             | ❌      |
| [sort-type-required-first](docs/rules/SORT_TYPE_REQUIRED_FIRST.md)                     | Enforce required properties before optional in types/interfaces  | ❌      |

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

### Configuration Presets Overview

| Preset               | Severity | Base Rules | JSX Rules | Next.js Rules | Total Rules |
| -------------------- | -------- | ---------- | --------- | ------------- | ----------- |
| `base`               | warn     | 33         | 0         | 0             | 33          |
| `base/recommended`   | error    | 33         | 0         | 0             | 33          |
| `react`              | warn     | 33         | 14        | 0             | 47          |
| `react/recommended`  | error    | 33         | 14        | 0             | 47          |
| `nextjs`             | warn     | 33         | 14        | 1             | 48          |
| `nextjs/recommended` | error    | 33         | 14        | 1             | 48          |

### Base Configuration Rules (33 rules)

Included in `base`, `base/recommended`, and all other presets:

- `nextfriday/boolean-naming-prefix`
- `nextfriday/enforce-constant-case`
- `nextfriday/enforce-curly-newline`
- `nextfriday/enforce-hook-naming`
- `nextfriday/enforce-service-naming`
- `nextfriday/enforce-sorted-destructuring`
- `nextfriday/file-kebab-case`
- `nextfriday/md-filename-case-restriction`
- `nextfriday/newline-after-multiline-block`
- `nextfriday/newline-before-return`
- `nextfriday/no-complex-inline-return`
- `nextfriday/no-direct-date`
- `nextfriday/no-emoji`
- `nextfriday/no-env-fallback`
- `nextfriday/no-inline-default-export`
- `nextfriday/no-inline-nested-object`
- `nextfriday/no-lazy-identifiers`
- `nextfriday/no-logic-in-params`
- `nextfriday/no-nested-ternary`
- `nextfriday/no-relative-imports`
- `nextfriday/no-single-char-variables`
- `nextfriday/prefer-async-await`
- `nextfriday/prefer-destructuring-params`
- `nextfriday/prefer-function-declaration`
- `nextfriday/prefer-guard-clause`
- `nextfriday/prefer-import-type`
- `nextfriday/prefer-named-param-types`
- `nextfriday/prefer-react-import-types`
- `nextfriday/require-explicit-return-type`
- `nextfriday/sort-exports`
- `nextfriday/sort-imports`
- `nextfriday/sort-type-alphabetically`
- `nextfriday/sort-type-required-first`

### JSX Rules (14 rules)

Additionally included in `react`, `react/recommended`, `nextjs`, `nextjs/recommended`:

- `nextfriday/enforce-props-suffix`
- `nextfriday/enforce-readonly-component-props`
- `nextfriday/jsx-newline-between-elements`
- `nextfriday/jsx-no-inline-object-prop`
- `nextfriday/jsx-no-newline-single-line-elements`
- `nextfriday/jsx-no-non-component-function`
- `nextfriday/jsx-no-variable-in-callback`
- `nextfriday/jsx-pascal-case`
- `nextfriday/jsx-require-suspense`
- `nextfriday/jsx-simple-props`
- `nextfriday/jsx-sort-props`
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

## Need Help?

If you encounter any issues or have questions:

- Check the [rule documentation](docs/rules) for detailed examples
- Report bugs or request features at: <https://github.com/next-friday/eslint-plugin-nextfriday/issues>

## License

MIT - feel free to use this plugin in your projects!
