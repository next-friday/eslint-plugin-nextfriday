---
"eslint-plugin-nextfriday": minor
---

`nextjs` and `nextjs/recommended` presets now also disable `nextfriday/file-kebab-case` (in addition to `nextfriday/jsx-pascal-case`) for files under `app/**`, `src/app/**`, `pages/**`, and `src/pages/**`. The override globs are expanded from `*.{jsx,tsx}` to `*.{js,jsx,ts,tsx}` so `route.ts`, `middleware.ts`, and other framework-named `.ts`/`.js` files in those directories are no longer flagged by either filename rule. Filename conventions in routing directories are owned by the framework, not by this plugin.

The `react` and `react/recommended` presets are unchanged — projects using them still enforce `file-kebab-case` on every `.ts`/`.js` and `jsx-pascal-case` on every `.tsx`/`.jsx`.
