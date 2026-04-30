# jsx-pascal-case

Enforce PascalCase filenames for .jsx and .tsx files.

## Rule Details

This rule enforces that JSX and TSX files use PascalCase naming convention for their **filenames**. This is a common pattern in React applications where components are typically named with PascalCase.

**This rule checks the filename, not the code content.**

## Examples

### Incorrect

- `my-component.jsx` (kebab-case)
- `userProfile.jsx` (camelCase)
- `user_profile.tsx` (snake_case)
- `component.jsx` (lowercase)
- `MYCOMPONENT.tsx` (UPPERCASE)
- `My Component.jsx` (contains spaces)
- `My.Component.tsx` (contains dots)

### Correct

- `MyComponent.jsx`
- `UserProfile.tsx`
- `App.jsx`
- `LoginForm.tsx`
- `UserProfile2.jsx` (PascalCase with numbers)

## Scoping the Rule

This rule has **no built-in framework detection** and no allowlist of "known" filenames. It checks every `.jsx`/`.tsx` it sees. If your project mixes component files with framework routing files that use lowercase names (e.g. Next.js App Router `page.tsx`, `layout.tsx`, `error.tsx`, or Pages Router `_app.tsx`), scope the rule explicitly via ESLint's `files` glob in flat config:

```js
import nextfriday from "eslint-plugin-nextfriday";

export default [
  nextfriday.configs.react,

  {
    files: ["src/components/**/*.{jsx,tsx}", "components/**/*.{jsx,tsx}"],
    rules: {
      "nextfriday/jsx-pascal-case": "error",
    },
  },

  {
    files: ["src/app/**/*.{jsx,tsx}", "app/**/*.{jsx,tsx}", "src/pages/**/*.{jsx,tsx}", "pages/**/*.{jsx,tsx}"],
    rules: {
      "nextfriday/jsx-pascal-case": "off",
    },
  },
];
```

The first override turns the rule on only inside component directories where PascalCase is the convention. The second override explicitly disables the rule for Next.js routing directories where the framework owns the filename.

The plugin deliberately does not try to detect Next.js, Remix, or other framework conventions automatically — folder structures vary across projects (monorepos, custom `app` locations, hybrid Pages + App Router setups), and a built-in allowlist would inevitably go stale. ESLint's `files` glob is the deterministic way to express the scope you actually want.

## When Not To Use It

If your project uses different naming conventions for JSX/TSX files, you can disable this rule.

## Related Rules

- [file-kebab-case](./FILE_KEBAB_CASE.md) - For regular TypeScript and JavaScript files
