---
"eslint-plugin-nextfriday": major
---

`nextjs` and `nextjs/recommended` presets are now arrays of flat-config objects instead of a single object. The first object enables the rules; the second disables `nextfriday/jsx-pascal-case` for files matching `app/**/*.{jsx,tsx}`, `src/app/**/*.{jsx,tsx}`, `pages/**/*.{jsx,tsx}`, and `src/pages/**/*.{jsx,tsx}` — Next.js's official routing directories where filenames are owned by the framework (`page.tsx`, `layout.tsx`, `error.tsx`, etc.).

`base`, `base/recommended`, `react`, and `react/recommended` are unchanged — they remain single config objects and `jsx-pascal-case` is enforced everywhere when those presets are used.

The `jsx-pascal-case` rule itself no longer special-cases any filename or directory. Scope is expressed in the preset via ESLint's `files` glob, not via rule-internal allowlists. Consumers using `react`/`react/recommended` on a Next.js project must either switch to the `nextjs` preset or add their own `files`-scoped override.

Migration:

```js
import nextfriday from "eslint-plugin-nextfriday";

export default [nextfriday.configs["nextjs/recommended"]];
```

ESLint 9+ flattens nested config arrays automatically, so existing usage continues to work.
