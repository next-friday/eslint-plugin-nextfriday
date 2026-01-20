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
      "nextfriday/enforce-sorted-destructuring": "error",
      "nextfriday/no-env-fallback": "error",

      // Import Optimization
      "nextfriday/prefer-import-type": "error",
      "nextfriday/prefer-react-import-types": "error",

      // Type Patterns
      "nextfriday/prefer-named-param-types": "error",
      "nextfriday/prefer-interface-over-inline-types": "error",

      // React/JSX
      "nextfriday/jsx-no-non-component-function": "error",
      "nextfriday/jsx-no-variable-in-callback": "error",
      "nextfriday/prefer-jsx-template-literals": "error",
      "nextfriday/react-props-destructure": "error",
      "nextfriday/enforce-readonly-component-props": "error",
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

### File Naming Rules

| Rule                                                                       | Description                                          | Fixable |
| -------------------------------------------------------------------------- | ---------------------------------------------------- | ------- |
| [file-kebab-case](docs/rules/FILE_KEBAB_CASE.md)                           | Enforce kebab-case filenames for .ts and .js files   | ❌      |
| [jsx-pascal-case](docs/rules/JSX_PASCAL_CASE.md)                           | Enforce PascalCase filenames for .jsx and .tsx files | ❌      |
| [md-filename-case-restriction](docs/rules/MD_FILENAME_CASE_RESTRICTION.md) | Enforce SNAKE_CASE filenames for .md files           | ❌      |

### Code Style Rules

| Rule                                                                       | Description                                                            | Fixable |
| -------------------------------------------------------------------------- | ---------------------------------------------------------------------- | ------- |
| [no-emoji](docs/rules/NO_EMOJI.md)                                         | Disallow emoji characters in source code                               | ❌      |
| [prefer-destructuring-params](docs/rules/PREFER_DESTRUCTURING_PARAMS.md)   | Enforce destructuring for functions with multiple parameters           | ❌      |
| [prefer-function-declaration](docs/rules/PREFER_FUNCTION_DECLARATION.md)   | Enforce function declarations over arrow functions in .ts files        | ❌      |
| [require-explicit-return-type](docs/rules/REQUIRE_EXPLICIT_RETURN_TYPE.md) | Require explicit return types on functions for better documentation    | ❌      |
| [no-complex-inline-return](docs/rules/NO_COMPLEX_INLINE_RETURN.md)         | Disallow complex inline expressions in return - extract to const first | ❌      |
| [no-logic-in-params](docs/rules/NO_LOGIC_IN_PARAMS.md)                     | Disallow logic/conditions in function parameters - extract to const    | ❌      |
| [enforce-sorted-destructuring](docs/rules/ENFORCE_SORTED_DESTRUCTURING.md) | Enforce alphabetical sorting of destructured properties                | ❌      |
| [no-env-fallback](docs/rules/NO_ENV_FALLBACK.md)                           | Disallow fallback values for environment variables                     | ❌      |
| [no-direct-date](docs/rules/NO_DIRECT_DATE.md)                             | Disallow direct usage of Date constructor and methods                  | ❌      |

### Import Optimization Rules

| Rule                                                                 | Description                                            | Fixable |
| -------------------------------------------------------------------- | ------------------------------------------------------ | ------- |
| [prefer-import-type](docs/rules/PREFER_IMPORT_TYPE.md)               | Enforce using 'import type' for type-only imports      | ✅      |
| [prefer-react-import-types](docs/rules/PREFER_REACT_IMPORT_TYPES.md) | Enforce direct imports from 'react' instead of React.X | ✅      |

### Type Pattern Rules

| Rule                                                                                   | Description                                                      | Fixable |
| -------------------------------------------------------------------------------------- | ---------------------------------------------------------------- | ------- |
| [prefer-named-param-types](docs/rules/PREFER_NAMED_PARAM_TYPES.md)                     | Enforce named types for function parameters with object types    | ❌      |
| [prefer-interface-over-inline-types](docs/rules/PREFER_INTERFACE_OVER_INLINE_TYPES.md) | Enforce interface declarations over inline types for React props | ❌      |

### React/JSX Rules

| Rule                                                                               | Description                                                          | Fixable |
| ---------------------------------------------------------------------------------- | -------------------------------------------------------------------- | ------- |
| [jsx-no-non-component-function](docs/rules/JSX_NO_NON_COMPONENT_FUNCTION.md)       | Disallow non-component functions at top level in .tsx/.jsx files     | ❌      |
| [jsx-no-variable-in-callback](docs/rules/JSX_NO_VARIABLE_IN_CALLBACK.md)           | Disallow variable declarations inside callback functions in JSX      | ❌      |
| [prefer-jsx-template-literals](docs/rules/PREFER_JSX_TEMPLATE_LITERALS.md)         | Enforce template literals instead of mixing text and JSX expressions | ✅      |
| [react-props-destructure](docs/rules/REACT_PROPS_DESTRUCTURE.md)                   | Enforce destructuring props inside React component body              | ❌      |
| [enforce-readonly-component-props](docs/rules/ENFORCE_READONLY_COMPONENT_PROPS.md) | Enforce Readonly wrapper for React component props                   | ✅      |

## Configurations

### Configuration Presets Overview

| Preset               | Severity | Base Rules | JSX Rules | Total Rules |
| -------------------- | -------- | ---------- | --------- | ----------- |
| `base`               | warn     | 17         | 0         | 17          |
| `base/recommended`   | error    | 17         | 0         | 17          |
| `react`              | warn     | 17         | 7         | 24          |
| `react/recommended`  | error    | 17         | 7         | 24          |
| `nextjs`             | warn     | 17         | 7         | 24          |
| `nextjs/recommended` | error    | 17         | 7         | 24          |

### Base Configuration Rules (17 rules)

Included in `base`, `base/recommended`, and all other presets:

- `nextfriday/boolean-naming-prefix`
- `nextfriday/enforce-sorted-destructuring`
- `nextfriday/file-kebab-case`
- `nextfriday/md-filename-case-restriction`
- `nextfriday/no-complex-inline-return`
- `nextfriday/no-direct-date`
- `nextfriday/no-emoji`
- `nextfriday/no-env-fallback`
- `nextfriday/no-lazy-identifiers`
- `nextfriday/no-logic-in-params`
- `nextfriday/no-single-char-variables`
- `nextfriday/prefer-destructuring-params`
- `nextfriday/prefer-function-declaration`
- `nextfriday/prefer-import-type`
- `nextfriday/prefer-named-param-types`
- `nextfriday/prefer-react-import-types`
- `nextfriday/require-explicit-return-type`

### JSX Rules (7 rules)

Additionally included in `react`, `react/recommended`, `nextjs`, `nextjs/recommended`:

- `nextfriday/enforce-readonly-component-props`
- `nextfriday/jsx-no-non-component-function`
- `nextfriday/jsx-no-variable-in-callback`
- `nextfriday/jsx-pascal-case`
- `nextfriday/prefer-interface-over-inline-types`
- `nextfriday/prefer-jsx-template-literals`
- `nextfriday/react-props-destructure`

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

## Need Help?

If you encounter any issues or have questions:

- Check the [rule documentation](docs/rules) for detailed examples
- Report bugs or request features at: <https://github.com/next-friday/eslint-plugin-nextfriday/issues>

## License

MIT - feel free to use this plugin in your projects!
