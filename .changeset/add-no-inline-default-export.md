---
"eslint-plugin-nextfriday": minor
---

feat(rules): add no-inline-default-export rule

Disallow inline default exports. Prefer declaring functions/classes first, then exporting separately.

- `export default function foo() {}` → Error
- `function foo() {} export default foo;` → Valid
