---
"eslint-plugin-nextfriday": minor
---

feat(rules): add no-misleading-constant-case rule and improve enforce-constant-case

- Add `no-misleading-constant-case` rule that disallows SCREAMING_SNAKE_CASE for mutable bindings (let/var) and non-static values (function calls, objects, arrays, dynamic templates, computed expressions)
- Add `prefer-inline-type-export` rule that requires type/interface declarations to be exported inline
- Update `enforce-constant-case` to exempt booleans with standard prefixes (is, has, should, etc.) to resolve conflict with `boolean-naming-prefix`
- Update existing rules: enforce-constant-case, jsx-newline-between-elements, no-lazy-identifiers
