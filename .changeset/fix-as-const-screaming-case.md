---
"eslint-plugin-nextfriday": minor
---

Add comprehensive naming convention rules and fix prefer-import-type JSX prop bug

- Add `enforce-camel-case` rule: ban snake_case variables/functions, restrict PascalCase to React components
- Add `enforce-property-case` rule: enforce camelCase for unquoted object property keys
- Refactor `enforce-constant-case` to only check global scope, support RegExp/objects/arrays/as const
- Refactor `no-misleading-constant-case` to flag SCREAMING_SNAKE_CASE in local scope
- Fix `prefer-import-type` incorrectly converting imports used as JSX prop values to type imports
