---
"eslint-plugin-nextfriday": patch
---

`enforce-constant-case` now only flags global `const` declarations bound to a magic number or magic text literal. Object literals, array literals, RegExp, template literals (static or dynamic), `as const` assertions, booleans, and any non-literal initializer are no longer checked. This unblocks Next.js App Router files where reserved exports like `metadata`, `viewport`, `dynamic`, `revalidate`, `runtime`, `fetchCache`, `dynamicParams`, `preferredRegion`, and `maxDuration` are framework-owned and must keep their exact names. The rule scope now matches the documented intent of the plugin's naming convention skill ("top-level constant primitive values") instead of every static-shaped initializer.
