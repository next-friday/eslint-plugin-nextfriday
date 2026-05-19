---
"eslint-plugin-nextfriday": patch
---

Expand `enforce-constant-case` to enforce SCREAMING_SNAKE_CASE on RegExp and bigint constants, and refine `new RegExp()` detection to skip dynamic arguments.

- RegExp literals (`/foo/`) and `new RegExp("foo", "g")` (all args must be string literals) are now flagged when named in camelCase at global scope.
- BigInt literals (`100n`, `-1n`) are now flagged consistently with number literals.
- `new RegExp(userInput)` and other non-literal RegExp constructors are intentionally ignored — only statically-constructed patterns are treated as magic values.
