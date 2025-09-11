# eslint-plugin-nextfriday

## 1.2.3

### Patch Changes

- [#22](https://github.com/next-friday/eslint-plugin-nextfriday/pull/22) [`45d54ff`](https://github.com/next-friday/eslint-plugin-nextfriday/commit/45d54ffb7be27c762fbf57c40752a83a1fb1da32) Thanks [@nextfridaydeveloper](https://github.com/nextfridaydeveloper)! - Updated rule documentation links to use uppercase and underscores (SNAKE_CASE) for rule names to match the actual documentation file naming convention.

## 1.2.2

### Patch Changes

- [#20](https://github.com/next-friday/eslint-plugin-nextfriday/pull/20) [`5cc909e`](https://github.com/next-friday/eslint-plugin-nextfriday/commit/5cc909e2b4cc7f32bafca3c6eaff1a37f4a914e2) Thanks [@nextfridaydeveloper](https://github.com/nextfridaydeveloper)! - Fixed the file-kebab-case rule to allow [name].[type] filename patterns like greeting.interfaces.ts, greeting.service.ts, and foo.bar.ts while maintaining kebab-case enforcement for both name and type components.

## 1.2.1

### Patch Changes

- [#18](https://github.com/next-friday/eslint-plugin-nextfriday/pull/18) [`ddfad3d`](https://github.com/next-friday/eslint-plugin-nextfriday/commit/ddfad3d5a112c429ee084c134517dad8cac01c7c) Thanks [@nextfridaydeveloper](https://github.com/nextfridaydeveloper)! - Fixed prefer-destructuring-params rule to only target user-defined functions and skip built-in/library/third-party functions.

## 1.2.0

### Minor Changes

- [#16](https://github.com/next-friday/eslint-plugin-nextfriday/pull/16) [`6059183`](https://github.com/next-friday/eslint-plugin-nextfriday/commit/60591838ee3bbe9c5f1a497cb571028f973311b6) Thanks [@nextfridaydeveloper](https://github.com/nextfridaydeveloper)! - A new ESLint rule `enforce-readonly-component-props` that enforces the use of `Readonly<>` wrapper for React component props when using named types or interfaces. This rule helps prevent accidental mutations of props and makes the immutable nature of React props explicit in the type system.

## 1.1.1

### Patch Changes

- [#14](https://github.com/next-friday/eslint-plugin-nextfriday/pull/14) [`de54aaa`](https://github.com/next-friday/eslint-plugin-nextfriday/commit/de54aaa42833ada9d847fe3885ab98b82e0590e9) Thanks [@nextfridaydeveloper](https://github.com/nextfridaydeveloper)! - Improved type checking logic across ESLint rules to enhance accuracy and reliability. This refactor focuses on better type inference, more precise type guards, and improved handling of edge cases in rule implementations.

## 1.1.0

### Minor Changes

- [#12](https://github.com/next-friday/eslint-plugin-nextfriday/pull/12) [`30dc89f`](https://github.com/next-friday/eslint-plugin-nextfriday/commit/30dc89f3c4d11c9cb320b8c3dfa370b7caff9ddc) Thanks [@nextfridaydeveloper](https://github.com/nextfridaydeveloper)! - Added two new ESLint rules to improve React development practices and code quality. The `prefer-react-import-types` rule enforces direct import of React types, while `prefer-interface-over-inline-types` promotes better type organization. Also improved the React component detection logic in the existing `react-props-destructure` rule.

## 1.0.2

### Patch Changes

- [#9](https://github.com/next-friday/eslint-plugin-nextfriday/pull/9) [`11066f0`](https://github.com/next-friday/eslint-plugin-nextfriday/commit/11066f030e8b510e415e9d5eb8fb95d1d2200354) Thanks [@nextfridaydeveloper](https://github.com/nextfridaydeveloper)! - Fix workflow fetch bug in release.yml

## 1.0.1

### Patch Changes

- [#6](https://github.com/next-friday/eslint-plugin-nextfriday/pull/6) [`db5e411`](https://github.com/next-friday/eslint-plugin-nextfriday/commit/db5e411e110bcdb626ae3176644e4093b120e800) Thanks [@nextfridaydeveloper](https://github.com/nextfridaydeveloper)! - Restructured the ESLint plugin by consolidating all exports into a single `index.ts` file and removing deprecated separate configuration and rule files. This simplifies the plugin architecture and improves maintainability.

## 1.0.0

### Major Changes

- [#3](https://github.com/next-friday/eslint-plugin-nextfriday/pull/3) [`3263f66`](https://github.com/next-friday/eslint-plugin-nextfriday/commit/3263f663678b194263c258275c83a866ddd666a8) Thanks [@nextfridaydeveloper](https://github.com/nextfridaydeveloper)! - Initial Release
