---
title: "Adopt the Flat Config"
description: "Use the plugin in an ESLint 9 flat-config project and pick the right preset for JavaScript, React, or Next.js."
---

This guide solves the most common adoption problem: moving a project onto `eslint-plugin-nextfriday` without manually wiring dozens of rules.

<Steps>
<Step>
### Install the package

```bash
pnpm add -D eslint-plugin-nextfriday eslint
```

The plugin declares `eslint` as a peer dependency and expects ESLint 9 with flat config.
</Step>
<Step>
### Create `eslint.config.mjs`

Pick the preset that matches your codebase:

" "Next.js"]}>
<Tab value="Base">

```js
import nextfriday from "eslint-plugin-nextfriday";

export default [nextfriday.configs.base];
```

</Tab>
<Tab value="React">

```js
import nextfriday from "eslint-plugin-nextfriday";

export default [nextfriday.configs.react];
```

</Tab>
<Tab value="Next.js">

```js
import nextfriday from "eslint-plugin-nextfriday";

export default [nextfriday.configs.nextjs];
```

</Tab>
</Tabs>
</Step>
<Step>
### Add a lint script

```json
{
  "scripts": {
    "lint": "eslint ."
  }
}
```

Use `eslint .` first so you can see the package's filename-sensitive rules apply across the repository.
</Step>
<Step>
### Run the first pass

```bash
pnpm lint
```

If the initial output is too noisy, switch from a recommended preset to the warning-level preset, or import a preset and turn off a few rules temporarily:

```js
import nextfriday from "eslint-plugin-nextfriday";

export default [
  {
    ...nextfriday.configs.base,
    rules: {
      ...nextfriday.configs.base.rules,
      "nextfriday/no-relative-imports": "off",
      "nextfriday/require-explicit-return-type": "off",
    },
  },
];
```
</Step>
</Steps>

## What You Get

The flat-config adoption path works well because the package already exposes the plugin under the correct namespace and prebuilds the rule maps for you in `src/index.ts`. When you import `nextfriday.configs.base`, ESLint receives a normal flat-config object with `plugins.nextfriday` and a `rules` record, so there is no hidden setup step beyond installing the package.

The key decision is choosing the smallest preset that matches the files you actually lint:

- Use `base` for plain JavaScript or TypeScript packages.
- Use `react` if the repo contains component files and you want JSX rules.
- Use `nextjs` when client components may access `process.env`.

## Complete Example

```js
import nextfriday from "eslint-plugin-nextfriday";

export default [
  nextfriday.configs["base/recommended"],
  ...nextfriday.configs.sonarjs,
  ...nextfriday.configs.unicorn,
  {
    files: ["scripts/**/*.ts"],
    rules: {
      "nextfriday/no-relative-imports": "off",
    },
  },
];
```

That example is a practical default for a TypeScript service or tooling repository: strict first-party rules, extra analysis from bundled third-party plugins, and one targeted override for scripts that often rely on local relative paths.

## Common Migration Notes

- Start with warning-level presets if the repository has never enforced naming or import conventions before.
- Spread `...nextfriday.configs.sonarjs` and `...nextfriday.configs.unicorn`; those properties are arrays, not single config objects.
- Expect filename-based rules such as `file-kebab-case` to surface issues outside `src/` if you lint the whole repository.
- If you are coming from `.eslintrc`, remember that this package only supports ESLint 9 flat config.
