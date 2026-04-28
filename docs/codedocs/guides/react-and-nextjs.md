---
title: "React and Next.js Setup"
description: "Apply the React and Next.js presets and understand the framework-specific rules they activate."
---

This guide covers the framework-specific layer of the plugin: the 16 JSX and React rules plus the single Next.js client environment rule.

<Steps>
<Step>
### Start with the React or Next.js preset

```js
import nextfriday from "eslint-plugin-nextfriday";

export default [nextfriday.configs["nextjs/recommended"]];
```

Use `nextjs/recommended` if your repository contains client components. Use `react/recommended` if you want the JSX rules without the Next.js environment check.
</Step>
<Step>
### Write components in the style the rules expect

The React rules prefer explicit prop types, `Readonly<>` wrappers, and component-body prop destructuring:

```tsx
interface UserCardProps {
  avatarUrl?: string;
  displayName: string;
}

export function UserCard(props: Readonly<UserCardProps>) {
  const { avatarUrl, displayName } = props;

  return (
    <article>
      {avatarUrl && <img alt={displayName} src={avatarUrl} />}
      <h2>{displayName}</h2>
    </article>
  );
}
```
</Step>
<Step>
### Wrap lazy components in `Suspense`

`jsx-require-suspense` records components created with `lazy(...)` and reports JSX usage that is not nested under `<Suspense>`:

```tsx
import { Suspense, lazy } from "react";

const SettingsPanel = lazy(() => import("./SettingsPanel"));

export function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SettingsPanel ></SettingsPanel>
    </Suspense>
  );
}
```
</Step>
<Step>
### Keep client-side environment variables public

`nextjs-require-public-env` only triggers in files that begin with `"use client"`:

```tsx
"use client";

export function PublicEnvBanner() {
  return <p>{process.env.NEXT_PUBLIC_DEPLOY_ENV}</p>;
}
```

Using `process.env.SECRET_KEY` or `process.env.API_URL` in the same file will be reported unless the name is `NODE_ENV`.
</Step>
</Steps>

## Why This Setup Matters

The React and Next.js presets are not just cosmetic extensions of the base preset. They enable rules that depend on JSX syntax, component naming conventions, prop-type structure, and lazy-loading patterns. If a repository contains `.tsx` files but only imports `configs.base`, rules like `jsx-sort-props`, `enforce-readonly-component-props`, and `jsx-require-suspense` never run.

The Next.js preset adds one more check on top of the React layer: `nextjs-require-public-env`. Its implementation in `src/rules/nextjs-require-public-env.ts` first detects whether a file starts with `"use client"` and only then validates `process.env.*` member expressions. That keeps the rule focused on true client-side exposure rather than server-only code.

## Framework Patterns

" "Next.js app"]}>
<Tab value="React app">

```js
import nextfriday from "eslint-plugin-nextfriday";

export default [nextfriday.configs["react/recommended"]];
```

</Tab>
<Tab value="Next.js app">

```js
import nextfriday from "eslint-plugin-nextfriday";

export default [nextfriday.configs["nextjs/recommended"]];
```

</Tab>
</Tabs>

## Complete Example

```js
import nextfriday from "eslint-plugin-nextfriday";

export default [
  nextfriday.configs["nextjs/recommended"],
  {
    files: ["app/**/*.tsx", "components/**/*.tsx"],
    rules: {
      "nextfriday/jsx-sort-props": "error",
      "nextfriday/jsx-no-inline-object-prop": "error",
    },
  },
];
```

This is a useful production setup for a Next.js app: the preset covers the full framework-aware baseline, while the override tightens a couple of JSX rules in the UI layer where prop consistency matters most.

## Common Pitfalls

- `jsx-require-suspense` only helps when the lazy component identifier is declared in the same file and later used in JSX.
- `enforce-readonly-component-props` targets named prop types and interfaces; inline prop types are handled by other rules such as `prefer-interface-over-inline-types`.
- `nextjs-require-public-env` allows `NODE_ENV`, but other client-side environment variables must use the `NEXT_PUBLIC_` prefix.
