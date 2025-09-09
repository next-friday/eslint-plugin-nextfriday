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
// or use the recommended preset
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
      "nextfriday/no-emoji": "error",
      "nextfriday/file-kebab-case": "error",
      "nextfriday/md-filename-case-restriction": "error",
      "nextfriday/prefer-destructuring-params": "error",
      "nextfriday/no-explicit-return-type": "error",
      "nextfriday/prefer-import-type": "error",
      "nextfriday/prefer-react-import-types": "error",
      "nextfriday/jsx-pascal-case": "error",
      "nextfriday/prefer-interface-over-inline-types": "error",
      "nextfriday/react-props-destructure": "error",
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

| Rule                                                                                   | Description                                                      | Fixable |
| -------------------------------------------------------------------------------------- | ---------------------------------------------------------------- | ------- |
| [no-emoji](docs/rules/NO_EMOJI.md)                                                     | Disallow emojis in code                                          | ❌      |
| [file-kebab-case](docs/rules/FILE_KEBAB_CASE.md)                                       | Enforce kebab-case filenames for .ts and .js files               | ❌      |
| [jsx-pascal-case](docs/rules/JSX_PASCAL_CASE.md)                                       | Enforce PascalCase filenames for .jsx and .tsx files             | ❌      |
| [md-filename-case-restriction](docs/rules/MD_FILENAME_CASE_RESTRICTION.md)             | Enforce SNAKE_CASE filenames for .md files                       | ❌      |
| [prefer-destructuring-params](docs/rules/PREFER_DESTRUCTURING_PARAMS.md)               | Enforce destructuring for functions with multiple parameters     | ❌      |
| [no-explicit-return-type](docs/rules/NO_EXPLICIT_RETURN_TYPE.md)                       | Disallow explicit return types on functions                      | ✅      |
| [prefer-import-type](docs/rules/PREFER_IMPORT_TYPE.md)                                 | Enforce using 'import type' for type-only imports                | ✅      |
| [prefer-interface-over-inline-types](docs/rules/PREFER_INTERFACE_OVER_INLINE_TYPES.md) | Enforce interface declarations over inline types for React props | ❌      |
| [prefer-react-import-types](docs/rules/PREFER_REACT_IMPORT_TYPES.md)                   | Enforce direct imports from 'react' instead of React.X           | ✅      |
| [react-props-destructure](docs/rules/REACT_PROPS_DESTRUCTURE.md)                       | Enforce destructuring props inside React component body          | ❌      |

## Configurations

### Base Configurations (for pure JS/TS projects)

#### `base`

Basic configuration without JSX-specific rules:

- `nextfriday/no-emoji`: `"error"`
- `nextfriday/file-kebab-case`: `"error"`
- `nextfriday/md-filename-case-restriction`: `"error"`
- `nextfriday/prefer-destructuring-params`: `"error"`
- `nextfriday/no-explicit-return-type`: `"error"`
- `nextfriday/prefer-import-type`: `"error"`
- `nextfriday/prefer-react-import-types`: `"error"`

#### `base/recommended`

Same as `base` configuration (recommended preset for pure JS/TS projects).

### React Configurations

#### `react`

Includes all base rules plus React-specific rules:

- All base rules above
- `nextfriday/jsx-pascal-case`: `"error"`
- `nextfriday/prefer-interface-over-inline-types`: `"error"`
- `nextfriday/react-props-destructure`: `"error"`

#### `react/recommended`

Same as `react` configuration (recommended preset for React projects).

### Next.js Configurations

#### `nextjs`

Includes all rules suitable for Next.js projects:

- All base rules
- `nextfriday/jsx-pascal-case`: `"error"`
- `nextfriday/prefer-interface-over-inline-types`: `"error"`
- `nextfriday/react-props-destructure`: `"error"`

#### `nextjs/recommended`

Same as `nextjs` configuration (recommended preset for Next.js projects).

## Features

- **File naming enforcement**: Ensure consistent file naming conventions across your project
- **Import optimization**: Automatically suggests better import patterns for TypeScript
- **Code cleanup**: Helps remove unnecessary explicit type annotations
- **React component conventions**: Enforces naming standards for JSX/TSX files
- **Clean code practices**: Prevents emoji usage and enforces parameter destructuring

## Need Help?

If you encounter any issues or have questions:

- Check the [rule documentation](docs/rules) for detailed examples
- Report bugs or request features at: <https://github.com/next-friday/eslint-plugin-nextfriday/issues>

## License

MIT - feel free to use this plugin in your projects!
