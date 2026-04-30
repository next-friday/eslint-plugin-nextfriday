---
"eslint-plugin-nextfriday": minor
---

Add `index-export-only` rule. Restricts `index.{js,jsx,ts,tsx}` files to imports, re-exports, and type/interface declarations only — flagging local function/class/variable declarations, inline `export const`/`export function`/`export class`, top-level expressions, and control flow. Type aliases, interfaces, and `export type` are allowed since they have no runtime cost. Included in `base`, `react`, and `nextjs` presets.
