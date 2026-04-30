---
"eslint-plugin-nextfriday": patch
---

Fix `enforce-constant-case` flagging conventional names in framework config files. The rule now skips entirely when run on `*.config.{ts,mjs,cjs,js}`, `*.rc.*`, `*.setup.*`, `*.spec.*`, `*.test.*`, `.eslintrc*`, `.babelrc*`, and `.prettierrc*`. Frameworks like Next.js require `nextConfig` in `next.config.ts`, Vite/Tailwind require `config`, etc. — these conventions can no longer be incorrectly flagged as needing `SCREAMING_SNAKE_CASE`.
