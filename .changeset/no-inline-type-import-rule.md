---
"eslint-plugin-nextfriday": minor
---

Add `no-inline-type-import` rule. Disallows inline `type` markers on import specifiers (`import { type Foo }` and `import { value, type Foo }`); auto-fix hoists single inline-type imports to `import type { ... }` and splits mixed value/type imports into two separate statements while preserving aliases, default specifiers, and quote style. Also strips redundant inline markers from existing `import type { ... }` statements. Included in `base`, `react`, and `nextjs` presets.
