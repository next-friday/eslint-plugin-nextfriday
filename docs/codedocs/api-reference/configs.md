---
title: "Configs API"
description: "The built-in flat-config presets and bundled plugin config getters exported by eslint-plugin-nextfriday."
---

The `configs` export is the main consumer-facing API. It contains six first-party preset objects plus two getters that return arrays of third-party flat-config entries.

## Import Path

```ts
import nextfriday, { configs } from "eslint-plugin-nextfriday";
```

Source file: `src/index.ts`

## Signature

```ts
declare const configs: {
  readonly base: TSESLint.FlatConfig.Config;
  readonly "base/recommended": TSESLint.FlatConfig.Config;
  readonly react: TSESLint.FlatConfig.Config;
  readonly "react/recommended": TSESLint.FlatConfig.Config;
  readonly nextjs: TSESLint.FlatConfig.Config;
  readonly "nextjs/recommended": TSESLint.FlatConfig.Config;
  readonly sonarjs: TSESLint.FlatConfig.ConfigArray;
  readonly unicorn: TSESLint.FlatConfig.ConfigArray;
};
```

## Config Entries

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `base` | `TSESLint.FlatConfig.Config` | — | Enables the 40 base rules at `"warn"` severity. |
| `base/recommended` | `TSESLint.FlatConfig.Config` | — | Enables the same 40 base rules at `"error"` severity. |
| `react` | `TSESLint.FlatConfig.Config` | — | Enables the 40 base rules plus 16 JSX and React rules at `"warn"`. |
| `react/recommended` | `TSESLint.FlatConfig.Config` | — | Enables the same 56 rules at `"error"`. |
| `nextjs` | `TSESLint.FlatConfig.Config` | — | Enables the 40 base rules, 16 JSX and React rules, and `nextjs-require-public-env` at `"warn"`. |
| `nextjs/recommended` | `TSESLint.FlatConfig.Config` | — | Enables the same 57 rules at `"error"`. |
| `sonarjs` | `TSESLint.FlatConfig.ConfigArray` | — | Getter that returns the bundled SonarJS recommended config array. Must be spread with `...`. |
| `unicorn` | `TSESLint.FlatConfig.ConfigArray` | — | Getter that returns the bundled Unicorn config array plus a JSX and TSX-specific override. Must be spread with `...`. |

## Behavior Details

### `base` and `base/recommended`

These presets are built from `baseRules` and `baseRecommendedRules` in `src/index.ts`. They cover naming, file naming, code style, import ordering, and TypeScript structure rules, but they intentionally exclude JSX and Next.js behavior.

```js
import nextfriday from "eslint-plugin-nextfriday";

export default [nextfriday.configs.base];
```

### `react` and `react/recommended`

These presets merge the base layer with `jsxRules` or `jsxRecommendedRules`. They are appropriate for `.jsx` and `.tsx` repositories that are not necessarily Next.js apps.

```js
import nextfriday from "eslint-plugin-nextfriday";

export default [nextfriday.configs["react/recommended"]];
```

### `nextjs` and `nextjs/recommended`

These presets add the single `nextjs-require-public-env` rule on top of the React preset. That rule matters specifically for client components that access `process.env`.

```js
import nextfriday from "eslint-plugin-nextfriday";

export default [nextfriday.configs["nextjs/recommended"]];
```

### `sonarjs`

The getter resolves the dependency import, reads `pluginSonarjs.configs.recommended.rules`, and returns:

```ts
[
  {
    name: "sonarjs/config",
    plugins: { sonarjs: pluginSonarjs },
    rules: { ...sonarjsRules },
  },
]
```

Usage:

```js
import nextfriday from "eslint-plugin-nextfriday";

export default [nextfriday.configs.base, ...nextfriday.configs.sonarjs];
```

### `unicorn`

The getter returns two config entries: the recommended Unicorn rules with local overrides and a JSX/TSX override that disables `unicorn/no-null`.

```js
import nextfriday from "eslint-plugin-nextfriday";

export default [nextfriday.configs.react, ...nextfriday.configs.unicorn];
```

## Common Composition Pattern

```js
import nextfriday from "eslint-plugin-nextfriday";

export default [
  nextfriday.configs["nextjs/recommended"],
  ...nextfriday.configs.sonarjs,
  ...nextfriday.configs.unicorn,
  {
    rules: {
      "nextfriday/no-relative-imports": "off",
    },
  },
];
```

That is the intended composition model: one preset object, zero or more spread third-party config arrays, then local overrides.

## Related Pages

- [Plugin API](/docs/api-reference/plugin)
- [Rules API](/docs/api-reference/rules)
- [Preset Configs](/docs/preset-configs)
