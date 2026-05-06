---
"eslint-plugin-nextfriday": major
---

fix `index-export-only` to allow string directive prologues (e.g. `"use strict"`) in index files — previously flagged as disallowed expression statements

fix `sort-imports` group ordering — `import type` now belongs to the same group as its source (external type after external value, internal alias type after internal alias value, etc.) and relative imports are split into parent (`../`) and current (`./`) sub-groups

fix `sort-imports` `checkOrder` return type — early-return now yields `false` instead of `undefined`, satisfying the declared `boolean` return type

remove `no-inline-default-export` rule — the rule conflicts with framework route handler patterns that require inline named function exports (`export async function GET`)

remove `no-nested-ternary` rule — duplicates ESLint's built-in `no-nested-ternary` with identical behavior; use the built-in rule directly instead

remove `enforce-property-case` rule — duplicates ESLint's built-in `camelcase` with `{ properties: "always" }`; use the built-in rule directly instead

remove `no-single-char-variables` rule — duplicates ESLint's built-in `id-length` with `{ min: 2, exceptions: ["_", "i", "j", "k", "n"] }`; use the built-in rule directly instead

remove `prefer-function-declaration` rule — duplicates ESLint's built-in `func-style` with `["declaration", { allowArrowFunctions: false }]`; use the built-in rule directly instead

remove `enforce-camel-case` rule — duplicates ESLint's built-in `camelcase`; use the built-in rule directly instead

remove `prefer-jsx-template-literals` rule — duplicates ESLint's built-in `prefer-template` with broader coverage; use the built-in rule directly instead

remove `no-redundant-fragment` rule — duplicates `eslint-plugin-react`'s `react/jsx-no-useless-fragment` with identical behavior; use the plugin rule directly instead

remove `react-props-destructure` rule — duplicates `eslint-plugin-react`'s `react/destructuring-assignment` with `["error", "always"]`; use the plugin rule directly instead
