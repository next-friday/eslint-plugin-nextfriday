---
"eslint-plugin-nextfriday": minor
---

fix `index-export-only` to allow string directive prologues (e.g. `"use strict"`) in index files — previously flagged as disallowed expression statements

fix `sort-imports` group ordering — `import type` now belongs to the same group as its source (external type after external value, internal alias type after internal alias value, etc.) and relative imports are split into parent (`../`) and current (`./`) sub-groups

remove `no-inline-default-export` rule — the rule conflicts with framework route handler patterns that require inline named function exports (`export async function GET`)

remove `no-nested-ternary` rule — duplicates ESLint's built-in `no-nested-ternary` with identical behavior; use the built-in rule directly instead
