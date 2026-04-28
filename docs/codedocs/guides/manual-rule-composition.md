---
title: "Compose Rules Manually"
description: "Adopt a focused subset of eslint-plugin-nextfriday rules when a full preset is too disruptive."
---

Use manual composition when you want the plugin's rules but need a slower migration path than the built-in presets provide.

<Steps>
<Step>
### Register the plugin explicitly

```js
import nextfriday from "eslint-plugin-nextfriday";

export default [
  {
    plugins: {
      nextfriday,
    },
    rules: {},
  },
];
```

This gives ESLint access to the `nextfriday/<rule-id>` namespace without enabling any rules yet.
</Step>
<Step>
### Start with high-signal rules

Naming and import rules usually deliver value quickly:

```js
import nextfriday from "eslint-plugin-nextfriday";

export default [
  {
    plugins: {
      nextfriday,
    },
    rules: {
      "nextfriday/no-single-char-variables": "warn",
      "nextfriday/no-lazy-identifiers": "warn",
      "nextfriday/boolean-naming-prefix": "warn",
      "nextfriday/no-relative-imports": "warn",
      "nextfriday/sort-imports": "warn",
      "nextfriday/prefer-import-type": "warn",
    },
  },
];
```
</Step>
<Step>
### Add React or TypeScript-specific checks where they matter

```js
import nextfriday from "eslint-plugin-nextfriday";

export default [
  {
    files: ["components/**/*.tsx"],
    plugins: {
      nextfriday,
    },
    rules: {
      "nextfriday/enforce-readonly-component-props": "warn",
      "nextfriday/react-props-destructure": "warn",
      "nextfriday/jsx-require-suspense": "error",
    },
  },
];
```

Flat config makes it easy to scope the plugin's stricter rules to only the directories that are ready for them.
</Step>
<Step>
### Promote warnings to errors over time

Once the warning backlog is under control, flip the rules that now represent baseline expectations:

```js
"nextfriday/no-relative-imports": "error",
"nextfriday/prefer-import-type": "error",
"nextfriday/jsx-require-suspense": "error",
```

This is effectively how the package's own preset pairs work internally: same rule IDs, different severities.
</Step>
</Steps>

## When Manual Composition Is Better

Manual composition is useful when the repository is too large or too inconsistent for a full preset to land cleanly. Because every rule in this package has `schema: []`, there are only two levers you can pull: whether the rule is enabled and what severity it uses. That makes manual selection a good match for phased rollouts, because you can pick a few high-signal rules first and promote them from warning to error once the codebase stabilizes.

This model also works well in monorepos. One package might only need naming and import rules, while another package with React UI code also benefits from `jsx-sort-props` and `enforce-readonly-component-props`. Flat config lets you express those differences directly with `files` globs.

## Complete Example

```js
import nextfriday from "eslint-plugin-nextfriday";

export default [
  {
    files: ["src/**/*.ts", "src/**/*.tsx"],
    plugins: {
      nextfriday,
    },
    rules: {
      "nextfriday/no-single-char-variables": "warn",
      "nextfriday/no-lazy-identifiers": "warn",
      "nextfriday/no-relative-imports": "warn",
      "nextfriday/sort-imports": "warn",
      "nextfriday/prefer-import-type": "warn",
      "nextfriday/require-explicit-return-type": "warn",
    },
  },
  {
    files: ["src/components/**/*.tsx"],
    plugins: {
      nextfriday,
    },
    rules: {
      "nextfriday/enforce-readonly-component-props": "warn",
      "nextfriday/react-props-destructure": "warn",
      "nextfriday/jsx-sort-props": "warn",
      "nextfriday/jsx-require-suspense": "error",
    },
  },
];
```

This approach works well in large repositories that need incremental enforcement without giving up the plugin's conventions entirely.

## Selection Heuristics

- Start with rules that expose obvious code smells: `no-lazy-identifiers`, `no-single-char-variables`, `no-relative-imports`, and `prefer-import-type`.
- Add structural rules like `require-explicit-return-type` only after the team agrees on the desired TypeScript style.
- Keep JSX rules scoped to `*.tsx` or component directories so non-UI packages are not affected.
- Revisit the built-in presets later; once your manual rule list resembles `base` or `react`, switching to a preset usually reduces maintenance.
