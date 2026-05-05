---
"eslint-plugin-nextfriday": minor
---

fix `index-export-only` to allow string directive prologues (e.g. `"use strict"`) in index files — previously flagged as disallowed expression statements

remove `no-inline-default-export` rule — the rule conflicts with framework route handler patterns that require inline named function exports (`export async function GET`)

remove `no-nested-ternary` rule — duplicates ESLint's built-in `no-nested-ternary` with identical behavior; use the built-in rule directly instead
