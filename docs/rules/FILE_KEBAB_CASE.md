# file-kebab-case

Enforce kebab-case filenames for .ts and .js files.

## Rule Details

This rule enforces that all TypeScript (.ts) and JavaScript (.js) files use kebab-case naming convention for their **filenames**. Kebab-case uses lowercase letters and hyphens to separate words, making filenames more consistent and URL-friendly. Single word filenames are considered valid kebab-case.

**This rule checks the filename, not the code content.** Only `.ts` and `.js` files are checked; other file types are ignored.

## Examples

### Incorrect

- `MyFile.ts` (PascalCase)
- `camelCase.js` (camelCase)
- `PascalCase.ts` (PascalCase)
- `snake_case.js` (snake_case)
- `UPPERCASE.ts` (UPPERCASE)
- `My File.js` (contains spaces)

### Correct

- `my-file.ts`
- `kebab-case.js`
- `single.ts`
- `file-with-numbers-123.js`
- `user-service.ts`
- `api-utils.ts`

## Allowed Patterns and Edge Cases

- **Only `.ts` and `.js` are checked.** `.tsx` and `.jsx` files are ignored — use [`jsx-pascal-case`](./JSX_PASCAL_CASE.md) for React component filenames.
- **Compound extensions are allowed when each segment is kebab-case.** Both the basename and the trailing token before the file extension are validated independently. This pattern is useful for config, setup, spec, test, and rc files:
  - `next.config.ts` ✓
  - `vitest.setup.ts` ✓
  - `user-service.test.ts` ✓
  - `auth.spec.ts` ✓
  - `eslint.rc.ts` ✓
- **Numbers are allowed inside segments.** `file-with-numbers-123.ts` ✓
- **Single-word filenames are valid.** `single.ts` ✓ (no hyphens needed)

## Scoping the Rule

This rule has **no built-in framework detection**. It checks every `.ts`/`.js` file it sees against kebab-case. In Next.js projects, routing directories (`app/`, `pages/`) contain framework-named files (`route.ts`, `middleware.ts`) that already happen to be kebab-case — but if you colocate helpers there with non-kebab names (`useThing.ts`, `MyHelper.ts`), the rule will flag them.

The `nextjs` and `nextjs/recommended` presets ship with an override that **automatically disables this rule** for files under `app/**`, `src/app/**`, `pages/**`, and `src/pages/**` (matched against `*.{js,jsx,ts,tsx}`). Filename conventions in those directories are owned by the framework, not by this plugin. The `base` and `react` presets do **not** include this override — they enforce `file-kebab-case` on every `.ts`/`.js` regardless of directory.

## Disabling the Rule

To opt out for additional directories or file patterns, add an override in your flat config:

```js
import nextfriday from "eslint-plugin-nextfriday";

export default [
  nextfriday.configs["base/recommended"],

  {
    files: ["src/legacy/**/*.ts", "src/vendor/**/*.js"],
    rules: {
      "nextfriday/file-kebab-case": "off",
    },
  },
];
```

## When Not To Use It

If your project has established naming conventions that conflict with kebab-case, or if you're working with frameworks that require specific filename patterns, you may want to disable this rule.
