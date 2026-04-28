---
title: "Plugin API"
description: "The default export and named exports exposed by eslint-plugin-nextfriday."
---

`eslint-plugin-nextfriday` exports one default plugin object and three named constants from the package root. There are no public classes, constructors, or option-bearing factories; the public API is data-oriented and designed for ESLint flat config.

## Import Path

```ts
import nextfriday, { configs, meta, rules } from "eslint-plugin-nextfriday";
```

Source file: `src/index.ts`

## Export Signatures

```ts
declare const meta: {
  readonly name: string;
  readonly version: string;
};

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

declare const rules: Record<string, TSESLint.RuleModule<string, readonly unknown[]>>;

declare const nextfriday: {
  readonly meta: typeof meta;
  readonly configs: typeof configs;
  readonly rules: typeof rules;
};

export default nextfriday;
export { meta, configs, rules };
```

## Exported Properties

| Export | Type | Description |
|--------|------|-------------|
| `default` | Plugin object | The object ESLint registers under `plugins.nextfriday` when you use a preset or wire the plugin manually. |
| `meta` | `{ readonly name: string; readonly version: string }` | Package identity, populated from `package.json` in `src/index.ts`. |
| `configs` | `Record<string, TSESLint.FlatConfig.Config \| TSESLint.FlatConfig.ConfigArray>` | Built-in flat-config presets and third-party bundled config getters. |
| `rules` | `Record<string, TSESLint.RuleModule<string, readonly unknown[]>>` | The full catalog of 57 rule modules keyed by rule ID without the `nextfriday/` prefix. |

## Usage Example

```js
import nextfriday from "eslint-plugin-nextfriday";

export default [nextfriday.configs["base/recommended"]];
```

## Combined Usage Example

```js
import nextfriday, { rules } from "eslint-plugin-nextfriday";

export default [
  nextfriday.configs.react,
  {
    rules: {
      "nextfriday/jsx-sort-props": rules["jsx-sort-props"] ? "error" : "off",
    },
  },
];
```

In normal application code you will usually consume the default export, but the named exports are useful for documentation tooling, tests, and configuration utilities.

## Export Relationships

The default export is not a separate implementation from the named exports. In `src/index.ts`, the package constructs `nextfridayPlugin` as:

```ts
const nextfridayPlugin = {
  meta,
  configs,
  rules,
} as const;
```

That means the following are equivalent in practice:

```ts
import nextfriday from "eslint-plugin-nextfriday";
```

```ts
import { configs, meta, rules } from "eslint-plugin-nextfriday";
```

The default form is more convenient for ESLint config files because you usually want `nextfriday.configs.*`. The named exports are useful when you need to inspect the rule catalog programmatically, generate docs, or write tests against the package shape the way `src/__tests__/meta.test.ts`, `src/__tests__/configs.test.ts`, and `src/__tests__/rules.test.ts` do in the source repo.

## Notes

- `meta.name` and `meta.version` are asserted against `package.json` in `src/__tests__/meta.test.ts`.
- `rules` contains exactly 57 entries according to `src/__tests__/rules.test.ts`.
- No public TypeScript interfaces are exported by name; consumers rely on the structural types inferred from these constants.

Related pages: [Configs API](/docs/api-reference/configs) and [Rules API](/docs/api-reference/rules).
