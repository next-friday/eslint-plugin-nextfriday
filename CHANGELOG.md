# eslint-plugin-nextfriday

## 3.2.1

### Patch Changes

- [#120](https://github.com/next-friday/eslint-plugin-nextfriday/pull/120) [`6f56995`](https://github.com/next-friday/eslint-plugin-nextfriday/commit/6f569958e538f23b699fa3ac1cb4743b87e4ab60) Thanks [@joetakara](https://github.com/joetakara)! - `enforce-constant-case` now only flags global `const` declarations bound to a magic number or magic text literal. Object literals, array literals, RegExp, template literals (static or dynamic), `as const` assertions, booleans, and any non-literal initializer are no longer checked. This unblocks Next.js App Router files where reserved exports like `metadata`, `viewport`, `dynamic`, `revalidate`, `runtime`, `fetchCache`, `dynamicParams`, `preferredRegion`, and `maxDuration` are framework-owned and must keep their exact names. The rule scope now matches the documented intent of the plugin's naming convention skill ("top-level constant primitive values") instead of every static-shaped initializer.

## 3.2.0

### Minor Changes

- [#118](https://github.com/next-friday/eslint-plugin-nextfriday/pull/118) [`143eee9`](https://github.com/next-friday/eslint-plugin-nextfriday/commit/143eee9fd0c6aed00e10677a6cad448dbdc9136e) Thanks [@joetakara](https://github.com/joetakara)! - Add `index-export-only` rule. Restricts `index.{js,jsx,ts,tsx}` files to imports, re-exports, and type/interface declarations only — flagging local function/class/variable declarations, inline `export const`/`export function`/`export class`, top-level expressions, and control flow. Type aliases, interfaces, and `export type` are allowed since they have no runtime cost. Included in `base`, `react`, and `nextjs` presets.

- [#118](https://github.com/next-friday/eslint-plugin-nextfriday/pull/118) [`143eee9`](https://github.com/next-friday/eslint-plugin-nextfriday/commit/143eee9fd0c6aed00e10677a6cad448dbdc9136e) Thanks [@joetakara](https://github.com/joetakara)! - Add `no-inline-type-import` rule. Disallows inline `type` markers on import specifiers (`import { type Foo }` and `import { value, type Foo }`); auto-fix hoists single inline-type imports to `import type { ... }` and splits mixed value/type imports into two separate statements while preserving aliases, default specifiers, and quote style. Also strips redundant inline markers from existing `import type { ... }` statements. Included in `base`, `react`, and `nextjs` presets.

## 3.1.0

### Minor Changes

- [#116](https://github.com/next-friday/eslint-plugin-nextfriday/pull/116) [`64ced55`](https://github.com/next-friday/eslint-plugin-nextfriday/commit/64ced556b4099a40ca2f4750523c7a079d2c81d8) Thanks [@joetakara](https://github.com/joetakara)! - `nextjs` and `nextjs/recommended` presets now also disable `nextfriday/file-kebab-case` (in addition to `nextfriday/jsx-pascal-case`) for files under `app/**`, `src/app/**`, `pages/**`, and `src/pages/**`. The override globs are expanded from `*.{jsx,tsx}` to `*.{js,jsx,ts,tsx}` so `route.ts`, `middleware.ts`, and other framework-named `.ts`/`.js` files in those directories are no longer flagged by either filename rule. Filename conventions in routing directories are owned by the framework, not by this plugin.

  The `react` and `react/recommended` presets are unchanged — projects using them still enforce `file-kebab-case` on every `.ts`/`.js` and `jsx-pascal-case` on every `.tsx`/`.jsx`.

### Patch Changes

- [#116](https://github.com/next-friday/eslint-plugin-nextfriday/pull/116) [`64ced55`](https://github.com/next-friday/eslint-plugin-nextfriday/commit/64ced556b4099a40ca2f4750523c7a079d2c81d8) Thanks [@joetakara](https://github.com/joetakara)! - Documentation quality improvements targeting Context7 scoring gaps:
  - `README.md` — "Per-Directory Configuration" section now explains how flat config resolves rules (config-array order, `files`/`ignores` precedence, why flat replaces `.eslintrc` overrides), adds a preset-tier-per-directory table, and lists common edge cases (glob ordering, top-level vs scoped `ignores`, spreading array-shaped presets, `--print-config` for debugging).
  - `README.md` — "Migration Strategy" section is restructured around six concrete phases: surveying violations with `eslint --format json | jq`, isolating the auto-fix pass into its own PR, adopting the warn-level preset, ratcheting clean directories to `/recommended`, managing exceptions (severity override → directory override → disable comment, in that order of preference), and tracking violation count over time. The "Prioritize rules by impact" table is unchanged.
  - `docs/rules/ENFORCE_CONSTANT_CASE.md` — Configuration section split into install / enable-just-this-rule / enable-with-related-rules / enable-via-preset / scope-to-directory subsections, plus a "Severity-only — no rule options" callout clarifying that the legacy `["error", { ... }]` array form is not accepted because no rule in this plugin has options.

## 3.0.0

### Major Changes

- [#114](https://github.com/next-friday/eslint-plugin-nextfriday/pull/114) [`7933269`](https://github.com/next-friday/eslint-plugin-nextfriday/commit/793326971cbbf15aaf2015f13622b7eff0fd51b2) Thanks [@joetakara](https://github.com/joetakara)! - Remove bundled `configs.sonarjs` and `configs.unicorn`. These configs are no longer exported. Consumers that previously did `...nextfriday.configs.sonarjs` or `...nextfriday.configs.unicorn` must install `eslint-plugin-sonarjs` and/or `eslint-plugin-unicorn` directly and configure them in their own flat config.

  Migration:

  ```js
  import sonarjs from "eslint-plugin-sonarjs";
  import unicorn from "eslint-plugin-unicorn";

  export default [
    {
      plugins: { sonarjs },
      rules: { ...sonarjs.configs.recommended.rules },
    },
    {
      plugins: { unicorn },
      rules: { ...unicorn.configs.recommended.rules },
    },
  ];
  ```

  The remaining six presets (`base`, `base/recommended`, `react`, `react/recommended`, `nextjs`, `nextjs/recommended`) are unchanged.

- [#114](https://github.com/next-friday/eslint-plugin-nextfriday/pull/114) [`7933269`](https://github.com/next-friday/eslint-plugin-nextfriday/commit/793326971cbbf15aaf2015f13622b7eff0fd51b2) Thanks [@joetakara](https://github.com/joetakara)! - `nextjs` and `nextjs/recommended` presets are now arrays of flat-config objects instead of a single object. The first object enables the rules; the second disables `nextfriday/jsx-pascal-case` for files matching `app/**/*.{jsx,tsx}`, `src/app/**/*.{jsx,tsx}`, `pages/**/*.{jsx,tsx}`, and `src/pages/**/*.{jsx,tsx}` — Next.js's official routing directories where filenames are owned by the framework (`page.tsx`, `layout.tsx`, `error.tsx`, etc.).

  `base`, `base/recommended`, `react`, and `react/recommended` are unchanged — they remain single config objects and `jsx-pascal-case` is enforced everywhere when those presets are used.

  The `jsx-pascal-case` rule itself no longer special-cases any filename or directory. Scope is expressed in the preset via ESLint's `files` glob, not via rule-internal allowlists. Consumers using `react`/`react/recommended` on a Next.js project must either switch to the `nextjs` preset or add their own `files`-scoped override.

  Migration:

  ```js
  import nextfriday from "eslint-plugin-nextfriday";

  export default [nextfriday.configs["nextjs/recommended"]];
  ```

  ESLint 9+ flattens nested config arrays automatically, so existing usage continues to work.

### Patch Changes

- [#114](https://github.com/next-friday/eslint-plugin-nextfriday/pull/114) [`7933269`](https://github.com/next-friday/eslint-plugin-nextfriday/commit/793326971cbbf15aaf2015f13622b7eff0fd51b2) Thanks [@joetakara](https://github.com/joetakara)! - Fix `enforce-constant-case` flagging conventional names in framework config files. The rule now skips entirely when run on `*.config.{ts,mjs,cjs,js}`, `*.rc.*`, `*.setup.*`, `*.spec.*`, `*.test.*`, `.eslintrc*`, `.babelrc*`, and `.prettierrc*`. Frameworks like Next.js require `nextConfig` in `next.config.ts`, Vite/Tailwind require `config`, etc. — these conventions can no longer be incorrectly flagged as needing `SCREAMING_SNAKE_CASE`.

## 2.0.0

### Major Changes

- [#101](https://github.com/next-friday/eslint-plugin-nextfriday/pull/101) [`f18f6d0`](https://github.com/next-friday/eslint-plugin-nextfriday/commit/f18f6d0fbb5935ee5ca2618b3438b42f6078ea8b) Thanks [@joetakara](https://github.com/joetakara)! - Upgrade to ESLint 10. Peer dependency now requires `eslint@^10.0.0` (previously `^9.0.0`). Bumped `eslint` and `@eslint/js` to v10. Removed `eslint-config-airbnb-extended` (no ESLint 10 support upstream); local lint config now relies on `@eslint/js`, `typescript-eslint`, `eslint-plugin-import-x`, `eslint-plugin-sonarjs`, `eslint-plugin-jest`, and `eslint-plugin-prettier` directly.

## 1.24.0

### Minor Changes

- [#97](https://github.com/next-friday/eslint-plugin-nextfriday/pull/97) [`a5cada9`](https://github.com/next-friday/eslint-plugin-nextfriday/commit/a5cada9216e31e85db990513e7f36a11a4bb5308) Thanks [@joetakara](https://github.com/joetakara)! - Add jsx-spread-props-last rule. Enforces that JSX spread attributes (`{...props}`) appear after all other props on the same element. Included in `react`, `react/recommended`, `nextjs`, and `nextjs/recommended` presets.

### Patch Changes

- [#97](https://github.com/next-friday/eslint-plugin-nextfriday/pull/97) [`a5cada9`](https://github.com/next-friday/eslint-plugin-nextfriday/commit/a5cada9216e31e85db990513e7f36a11a4bb5308) Thanks [@joetakara](https://github.com/joetakara)! - Upgrade dependencies to latest compatible versions: typescript-eslint 8.58 → 8.59, eslint-plugin-unicorn 63 → 64, eslint-plugin-sonarjs 4.0.2 → 4.0.3, plus dev tooling (prettier, changesets, commitlint, swc). Pinned eslint, typescript, and @types/node to their latest 9.x/5.x/22.x lines for ecosystem and engine compatibility.

## 1.23.1

### Patch Changes

- [#96](https://github.com/next-friday/eslint-plugin-nextfriday/pull/96) [`1821f08`](https://github.com/next-friday/eslint-plugin-nextfriday/commit/1821f08a00cf60a0b1ab6d654e700b54b86f364b) Thanks [@joetakara](https://github.com/joetakara)! - Upgrade dependencies to latest compatible versions: typescript-eslint 8.58 → 8.59, eslint-plugin-unicorn 63 → 64, eslint-plugin-sonarjs 4.0.2 → 4.0.3, plus dev tooling (prettier, changesets, commitlint, swc). Pinned eslint, typescript, and @types/node to their latest 9.x/5.x/22.x lines for ecosystem and engine compatibility.

## 1.23.0

### Minor Changes

- [#94](https://github.com/next-friday/eslint-plugin-nextfriday/pull/94) [`7eaf83e`](https://github.com/next-friday/eslint-plugin-nextfriday/commit/7eaf83e365bb0867679f9abe764ade784eeb4594) Thanks [@joetakara](https://github.com/joetakara)! - Add auto-fix support to jsx-sort-props rule. Running eslint --fix will automatically reorder JSX props by value type.

## 1.22.0

### Minor Changes

- [#92](https://github.com/next-friday/eslint-plugin-nextfriday/pull/92) [`432b4b4`](https://github.com/next-friday/eslint-plugin-nextfriday/commit/432b4b49cabc0d6ea9289441b13e7442d328614f) Thanks [@joetakara](https://github.com/joetakara)! - Rework enforce-service-naming rule to ban misleading prefixes (set, delete, do, handle) instead of forcing fetch prefix. Allow single-property inline nested objects in no-inline-nested-object rule. Fix documentation inconsistencies across README, rule docs, and configuration presets. Update dependencies to resolve security vulnerabilities.

## 1.21.0

### Minor Changes

- [#87](https://github.com/next-friday/eslint-plugin-nextfriday/pull/87) [`ed401e3`](https://github.com/next-friday/eslint-plugin-nextfriday/commit/ed401e39db04857995ddcc29d7444298181ee60b) Thanks [@joetakara](https://github.com/joetakara)! - Add `no-inline-return-properties` rule that enforces shorthand-only properties in return objects

- [#90](https://github.com/next-friday/eslint-plugin-nextfriday/pull/90) [`d5e9db5`](https://github.com/next-friday/eslint-plugin-nextfriday/commit/d5e9db562cb9e38beadd59da39f8618b6f5825ed) Thanks [@joetakara](https://github.com/joetakara)! - Add comprehensive naming convention rules and fix prefer-import-type JSX prop bug
  - Add `enforce-camel-case` rule: ban snake_case variables/functions, restrict PascalCase to React components
  - Add `enforce-property-case` rule: enforce camelCase for unquoted object property keys
  - Refactor `enforce-constant-case` to only check global scope, support RegExp/objects/arrays/as const
  - Refactor `no-misleading-constant-case` to flag SCREAMING_SNAKE_CASE in local scope
  - Fix `prefer-import-type` incorrectly converting imports used as JSX prop values to type imports

## 1.20.0

### Minor Changes

- [#85](https://github.com/next-friday/eslint-plugin-nextfriday/pull/85) [`280a864`](https://github.com/next-friday/eslint-plugin-nextfriday/commit/280a864f31d32433856d6914f742861d3bb43ec9) Thanks [@joetakara](https://github.com/joetakara)! - feat(rules): add no-misleading-constant-case rule and improve enforce-constant-case
  - Add `no-misleading-constant-case` rule that disallows SCREAMING_SNAKE_CASE for mutable bindings (let/var) and non-static values (function calls, objects, arrays, dynamic templates, computed expressions)
  - Add `prefer-inline-type-export` rule that requires type/interface declarations to be exported inline
  - Update `enforce-constant-case` to exempt booleans with standard prefixes (is, has, should, etc.) to resolve conflict with `boolean-naming-prefix`
  - Update existing rules: enforce-constant-case, jsx-newline-between-elements, no-lazy-identifiers

## 1.19.0

### Minor Changes

- [#83](https://github.com/next-friday/eslint-plugin-nextfriday/pull/83) [`b7143d2`](https://github.com/next-friday/eslint-plugin-nextfriday/commit/b7143d2f779ca1ca34f6562d09c1a6168b74c338) Thanks [@joetakara](https://github.com/joetakara)! - Add jsx-no-ternary-null rule to enforce logical AND over ternary with null/undefined in JSX

## 1.18.0

### Minor Changes

- [#81](https://github.com/next-friday/eslint-plugin-nextfriday/pull/81) [`081326a`](https://github.com/next-friday/eslint-plugin-nextfriday/commit/081326adf199aee711e97b1627def3bf867ad89c) Thanks [@joetakara](https://github.com/joetakara)! - Add hyphenated string group to jsx-sort-props for props like aria-label and data-slot. Fix jsx-newline-between-elements to include self-closing elements

## 1.17.0

### Minor Changes

- [#79](https://github.com/next-friday/eslint-plugin-nextfriday/pull/79) [`cb5ab46`](https://github.com/next-friday/eslint-plugin-nextfriday/commit/cb5ab460f758e1e57f9604417b673362ec6c71d8) Thanks [@joetakara](https://github.com/joetakara)! - Add expression group to jsx-sort-props rule for variable references, member expressions, and other dynamic values

## 1.16.0

### Minor Changes

- [#75](https://github.com/next-friday/eslint-plugin-nextfriday/pull/75) [`f506561`](https://github.com/next-friday/eslint-plugin-nextfriday/commit/f506561c1587af4a129801dee87c7ed08154b090) Thanks [@joetakara](https://github.com/joetakara)! - feat(rules): add prefer-inline-literal-union, no-nested-interface-declaration, and enforce-type-declaration-order rules

## 1.15.2

### Patch Changes

- [#73](https://github.com/next-friday/eslint-plugin-nextfriday/pull/73) [`d383b44`](https://github.com/next-friday/eslint-plugin-nextfriday/commit/d383b44f38adaf864ed0ef8aaa257cd15d7cbf81) Thanks [@joetakara](https://github.com/joetakara)! - Fix jsx-no-newline-single-line-elements false positive when JSX expressions (e.g. {children}) appear between elements.

## 1.15.1

### Patch Changes

- [#71](https://github.com/next-friday/eslint-plugin-nextfriday/pull/71) [`4831ea6`](https://github.com/next-friday/eslint-plugin-nextfriday/commit/4831ea697e9dfe38361b3a3577b67692ea1cd862) Thanks [@joetakara](https://github.com/joetakara)! - Update docs: add fixable info to sorting rules, add bundled plugin configs section to README.

## 1.15.0

### Minor Changes

- [#68](https://github.com/next-friday/eslint-plugin-nextfriday/pull/68) [`857906e`](https://github.com/next-friday/eslint-plugin-nextfriday/commit/857906e5264ef87a988ba5429019c004360fa2a1) Thanks [@nextfridaydeveloper](https://github.com/nextfridaydeveloper)! - Add sort-imports, sort-exports, sort-type-alphabetically, jsx-sort-props, jsx-no-newline-single-line-elements rules. Add auto-fix to sorting rules. Bundle eslint-plugin-unicorn and eslint-plugin-sonarjs configs.

### Patch Changes

- [#69](https://github.com/next-friday/eslint-plugin-nextfriday/pull/69) [`2475fc5`](https://github.com/next-friday/eslint-plugin-nextfriday/commit/2475fc5e7d80c2b158cddbed961dbb7e4e348188) Thanks [@joetakara](https://github.com/joetakara)! - Fix CJS compatibility for bundled eslint-plugin-sonarjs and eslint-plugin-unicorn configs.

## 1.14.0

### Minor Changes

- [#66](https://github.com/next-friday/eslint-plugin-nextfriday/pull/66) [`8a1b394`](https://github.com/next-friday/eslint-plugin-nextfriday/commit/8a1b3948d559e3436d85cf8210aa7360c8498151) Thanks [@joetakara](https://github.com/joetakara)! - feat(rules): add sort-type-required-first rule

## 1.13.1

### Patch Changes

- [#64](https://github.com/next-friday/eslint-plugin-nextfriday/pull/64) [`d204681`](https://github.com/next-friday/eslint-plugin-nextfriday/commit/d2046810c0cb39cea3c205af5cea6e00936dbfa7) Thanks [@nextfridaydeveloper](https://github.com/nextfridaydeveloper)! - fix(rules): detect logic inside array elements in no-logic-in-params

## 1.13.0

### Minor Changes

- [#62](https://github.com/next-friday/eslint-plugin-nextfriday/pull/62) [`254a8e6`](https://github.com/next-friday/eslint-plugin-nextfriday/commit/254a8e6d0e3d75b00d64ed3caad662457fd597e1) Thanks [@nextfridaydeveloper](https://github.com/nextfridaydeveloper)! - feat(rules): add jsx-simple-props rule

  Adds a new rule that enforces JSX props to only contain simple values:
  - String literals (`foo="bar"`)
  - Simple variables (`foo={bar}`)
  - Member expressions (`foo={bar.baz}`)
  - JSX elements (`foo={<Icon />}`)
  - Arrow functions and function expressions (`foo={() => {}}`)

  Disallows complex expressions like function calls, inline objects, arrays, and operators.

## 1.12.1

### Patch Changes

- [#59](https://github.com/next-friday/eslint-plugin-nextfriday/pull/59) [`04c313f`](https://github.com/next-friday/eslint-plugin-nextfriday/commit/04c313f5fcdbbae469d472e7a481197cf891fb9e) Thanks [@nextfridaydeveloper](https://github.com/nextfridaydeveloper)! - fix(newline-after-multiline-block): require blank line before multi-line statements

  The rule now enforces blank lines both before AND after multi-line statements, not just after.

## 1.12.0

### Minor Changes

- [#57](https://github.com/next-friday/eslint-plugin-nextfriday/pull/57) [`8e93469`](https://github.com/next-friday/eslint-plugin-nextfriday/commit/8e93469f96340af0cc92586a72aa36b0b88041d8) Thanks [@nextfridaydeveloper](https://github.com/nextfridaydeveloper)! - feat: add enforce-curly-newline, no-nested-ternary, and prefer-guard-clause rules
  - enforce-curly-newline: Enforce curly braces for multi-line if statements and forbid them for single-line
  - no-nested-ternary: Disallow nested ternary expressions
  - prefer-guard-clause: Enforce guard clause pattern instead of nested if statements

## 1.11.1

### Patch Changes

- [#55](https://github.com/next-friday/eslint-plugin-nextfriday/pull/55) [`11ec99c`](https://github.com/next-friday/eslint-plugin-nextfriday/commit/11ec99cfabf7976ce5da450e0de018ec45ea7155) Thanks [@nextfridaydeveloper](https://github.com/nextfridaydeveloper)! - fix(enforce-sorted-destructuring): simplify sorting to alphabetical only

  Changed the sorting behavior from type-based (string → number → boolean → object) to pure alphabetical sorting. Properties with defaults still come first, but both groups are now sorted alphabetically (A-Z) without type priority.

  This makes the rule compatible with other alphabetical sorting tools and more intuitive to use.

## 1.11.0

### Minor Changes

- [#53](https://github.com/next-friday/eslint-plugin-nextfriday/pull/53) [`732db65`](https://github.com/next-friday/eslint-plugin-nextfriday/commit/732db659671cb6363b40af16c9c40400a10225ab) Thanks [@nextfridaydeveloper](https://github.com/nextfridaydeveloper)! - feat(no-inline-default-export): extend rule to also flag inline named exports

  The `no-inline-default-export` rule now also flags inline named exports like `export function xxx()` and `export class Xxx`. These should be declared first, then exported separately using `export { xxx };`.

  ### New behavior

  **Incorrect:**

  ```typescript
  export function fetchData() { ... }
  export async function fetchHighlight() { ... }
  export class UserService { ... }
  ```

  **Correct:**

  ```typescript
  function fetchData() { ... }
  export { fetchData };

  async function fetchHighlight() { ... }
  export default fetchHighlight;

  class UserService { ... }
  export { UserService };
  ```

## 1.10.2

### Patch Changes

- [#51](https://github.com/next-friday/eslint-plugin-nextfriday/pull/51) [`b940720`](https://github.com/next-friday/eslint-plugin-nextfriday/commit/b940720b356ee0bf0da0addac5bd4a35c20b4141) Thanks [@nextfridaydeveloper](https://github.com/nextfridaydeveloper)! - fix(newline-after-multiline-block): exclude import declarations from requiring blank lines between them

  Multi-line imports followed by other imports no longer require a blank line, avoiding conflicts with `import-x/order` rule. Blank lines are still required when a multi-line import is followed by a non-import statement.

## 1.10.1

### Patch Changes

- [#49](https://github.com/next-friday/eslint-plugin-nextfriday/pull/49) [`baecdc9`](https://github.com/next-friday/eslint-plugin-nextfriday/commit/baecdc9810eda995c0ced73bcf1536027feae2e6) Thanks [@nextfridaydeveloper](https://github.com/nextfridaydeveloper)! - fix(no-inline-nested-object): allow arrays with only primitive values to stay inline

  Arrays containing only primitives (literals, identifiers, template literals) are now allowed to be inline. Objects still require multiple lines.
  - `options: ["primary", "foreground", "danger"]` is now valid
  - `config: { enabled: true }` still requires multiline
  - `items: [{ a: 1 }, { b: 2 }]` still requires multiline

## 1.10.0

### Minor Changes

- [#47](https://github.com/next-friday/eslint-plugin-nextfriday/pull/47) [`3efdb6f`](https://github.com/next-friday/eslint-plugin-nextfriday/commit/3efdb6f33d499a02c00021e9248a5d6f63791457) Thanks [@nextfridaydeveloper](https://github.com/nextfridaydeveloper)! - feat(rules): add formatting rules for code consistency
  - `newline-after-multiline-block`: Require a blank line after multi-line statements
  - `newline-before-return`: Require a blank line before return statements
  - `no-inline-nested-object`: Require nested objects and arrays to span multiple lines

## 1.9.0

### Minor Changes

- [#45](https://github.com/next-friday/eslint-plugin-nextfriday/pull/45) [`5a00484`](https://github.com/next-friday/eslint-plugin-nextfriday/commit/5a0048400d3a6b7640813b4ba718635c9117ea20) Thanks [@joetakara](https://github.com/joetakara)! - feat(rules): add no-inline-default-export rule

  Disallow inline default exports. Prefer declaring functions/classes first, then exporting separately.
  - `export default function foo() {}` → Error
  - `function foo() {} export default foo;` → Valid

## 1.8.0

### Minor Changes

- [#43](https://github.com/next-friday/eslint-plugin-nextfriday/pull/43) [`2fbee6d`](https://github.com/next-friday/eslint-plugin-nextfriday/commit/2fbee6df84009954cb99674bcdb1cb1cca3be4e6) Thanks [@nextfridaydeveloper](https://github.com/nextfridaydeveloper)! - feat(rules): add no-lazy-identifiers rule

  Added a new rule `no-lazy-identifiers` that detects and disallows lazy variable names:
  - Repeated characters (3+): `xxx`, `aaa`, `zzz`
  - Keyboard sequences (4+): `asdf`, `qwerty`, `hjkl`, `zxcv`

## 1.7.0

### Minor Changes

- [#41](https://github.com/next-friday/eslint-plugin-nextfriday/pull/41) [`10b67d9`](https://github.com/next-friday/eslint-plugin-nextfriday/commit/10b67d941c47fef5b72408bfff2b56e98a46c26c) Thanks [@nextfridaydeveloper](https://github.com/nextfridaydeveloper)! - Add no-direct-date rule to disallow direct usage of Date constructor and methods (new Date(), Date.now(), Date.parse()) to enforce centralized date utilities like dayjs

## 1.6.0

### Minor Changes

- [#36](https://github.com/next-friday/eslint-plugin-nextfriday/pull/36) [`f819ffa`](https://github.com/next-friday/eslint-plugin-nextfriday/commit/f819ffa8eed179e38eed4ec51a05dec53dd979d0) Thanks [@joetakara](https://github.com/joetakara)! - Add three new ESLint rules:
  - `jsx-no-non-component-function`: Prevent non-component functions at top level in .tsx/.jsx files
  - `enforce-sorted-destructuring`: Enforce alphabetical sorting of destructured properties with defaults first
  - `jsx-no-variable-in-callback`: Prevent variable declarations inside JSX callbacks for cleaner code

## 1.5.3

### Patch Changes

- [#34](https://github.com/next-friday/eslint-plugin-nextfriday/pull/34) [`f87b0ad`](https://github.com/next-friday/eslint-plugin-nextfriday/commit/f87b0ad3836f10f3e34b9f1cb751fe4101d04ef8) Thanks [@nextfridaydeveloper](https://github.com/nextfridaydeveloper)! - Fix missing build step in CI/CD pipeline causing npm package to be published without lib directory. Added build steps before publishing in release workflow and prepublishOnly script as safety net.

## 1.5.2

### Patch Changes

- [#32](https://github.com/next-friday/eslint-plugin-nextfriday/pull/32) [`1efbfc0`](https://github.com/next-friday/eslint-plugin-nextfriday/commit/1efbfc05590ed21ee786a5e03f89ff6bcb38fe69) Thanks [@nextfridaydeveloper](https://github.com/nextfridaydeveloper)! - Update package scripts: remove prepublishOnly script and update prepare script to use husky without fallback

## 1.5.1

### Patch Changes

- [#30](https://github.com/next-friday/eslint-plugin-nextfriday/pull/30) [`cc054bc`](https://github.com/next-friday/eslint-plugin-nextfriday/commit/cc054bc46b902af77e747b72b09eb56854ea9630) Thanks [@nextfridaydeveloper](https://github.com/nextfridaydeveloper)! - Fix package installation warnings by removing preinstall script and making prepare script fail-safe

## 1.5.0

### Minor Changes

- [#28](https://github.com/next-friday/eslint-plugin-nextfriday/pull/28) [`387c2b8`](https://github.com/next-friday/eslint-plugin-nextfriday/commit/387c2b8a6d0e4668daa035ab3bc3ad2f41e5d8f3) Thanks [@nextfridaydeveloper](https://github.com/nextfridaydeveloper)! - Add new `no-env-fallback` rule to prevent dangerous fallback values for environment variables. This rule disallows using `||`, `??`, or ternary operators with `process.env` to ensure applications fail explicitly when required environment variables are missing rather than silently using default values.

## 1.4.0

### Minor Changes

- [#26](https://github.com/next-friday/eslint-plugin-nextfriday/pull/26) [`e90935a`](https://github.com/next-friday/eslint-plugin-nextfriday/commit/e90935a56129ff84efc9df5de3f43e8e4a61af16) Thanks [@nextfridaydeveloper](https://github.com/nextfridaydeveloper)! - Add two new rules to improve code readability and debugging: `no-complex-inline-return` disallows complex inline expressions (such as ternary operators, logical expressions, or `new` expressions) directly in return statements, requiring extraction to a `const` variable instead; and `no-logic-in-params` prohibits using logic or conditions (e.g., ternary, logical, comparison, or negation operators) within function parameters, enforcing the use of intermediate `const` variables to enhance clarity and allow inspection of values.

## 1.3.0

### Minor Changes

- [#24](https://github.com/next-friday/eslint-plugin-nextfriday/pull/24) [`59d1932`](https://github.com/next-friday/eslint-plugin-nextfriday/commit/59d193258d6ffd19d6fd90515626d826732e30b3) Thanks [@nextfridaydeveloper](https://github.com/nextfridaydeveloper)! - Add new prefer-named-param-types rule that enforces using named interfaces or type aliases instead of inline object type literals for function

## 1.2.3

### Patch Changes

- [#22](https://github.com/next-friday/eslint-plugin-nextfriday/pull/22) [`45d54ff`](https://github.com/next-friday/eslint-plugin-nextfriday/commit/45d54ffb7be27c762fbf57c40752a83a1fb1da32) Thanks [@nextfridaydeveloper](https://github.com/nextfridaydeveloper)! - Updated rule documentation links to use uppercase and underscores (SNAKE_CASE) for rule names to match the actual documentation file naming convention.

## 1.2.2

### Patch Changes

- [#20](https://github.com/next-friday/eslint-plugin-nextfriday/pull/20) [`5cc909e`](https://github.com/next-friday/eslint-plugin-nextfriday/commit/5cc909e2b4cc7f32bafca3c6eaff1a37f4a914e2) Thanks [@nextfridaydeveloper](https://github.com/nextfridaydeveloper)! - Fixed the file-kebab-case rule to allow [name].[type] filename patterns like greeting.interfaces.ts, greeting.service.ts, and foo.bar.ts while maintaining kebab-case enforcement for both name and type components.

## 1.2.1

### Patch Changes

- [#18](https://github.com/next-friday/eslint-plugin-nextfriday/pull/18) [`ddfad3d`](https://github.com/next-friday/eslint-plugin-nextfriday/commit/ddfad3d5a112c429ee084c134517dad8cac01c7c) Thanks [@nextfridaydeveloper](https://github.com/nextfridaydeveloper)! - Fixed prefer-destructuring-params rule to only target user-defined functions and skip built-in/library/third-party functions.

## 1.2.0

### Minor Changes

- [#16](https://github.com/next-friday/eslint-plugin-nextfriday/pull/16) [`6059183`](https://github.com/next-friday/eslint-plugin-nextfriday/commit/60591838ee3bbe9c5f1a497cb571028f973311b6) Thanks [@nextfridaydeveloper](https://github.com/nextfridaydeveloper)! - A new ESLint rule `enforce-readonly-component-props` that enforces the use of `Readonly<>` wrapper for React component props when using named types or interfaces. This rule helps prevent accidental mutations of props and makes the immutable nature of React props explicit in the type system.

## 1.1.1

### Patch Changes

- [#14](https://github.com/next-friday/eslint-plugin-nextfriday/pull/14) [`de54aaa`](https://github.com/next-friday/eslint-plugin-nextfriday/commit/de54aaa42833ada9d847fe3885ab98b82e0590e9) Thanks [@nextfridaydeveloper](https://github.com/nextfridaydeveloper)! - Improved type checking logic across ESLint rules to enhance accuracy and reliability. This refactor focuses on better type inference, more precise type guards, and improved handling of edge cases in rule implementations.

## 1.1.0

### Minor Changes

- [#12](https://github.com/next-friday/eslint-plugin-nextfriday/pull/12) [`30dc89f`](https://github.com/next-friday/eslint-plugin-nextfriday/commit/30dc89f3c4d11c9cb320b8c3dfa370b7caff9ddc) Thanks [@nextfridaydeveloper](https://github.com/nextfridaydeveloper)! - Added two new ESLint rules to improve React development practices and code quality. The `prefer-react-import-types` rule enforces direct import of React types, while `prefer-interface-over-inline-types` promotes better type organization. Also improved the React component detection logic in the existing `react-props-destructure` rule.

## 1.0.2

### Patch Changes

- [#9](https://github.com/next-friday/eslint-plugin-nextfriday/pull/9) [`11066f0`](https://github.com/next-friday/eslint-plugin-nextfriday/commit/11066f030e8b510e415e9d5eb8fb95d1d2200354) Thanks [@nextfridaydeveloper](https://github.com/nextfridaydeveloper)! - Fix workflow fetch bug in release.yml

## 1.0.1

### Patch Changes

- [#6](https://github.com/next-friday/eslint-plugin-nextfriday/pull/6) [`db5e411`](https://github.com/next-friday/eslint-plugin-nextfriday/commit/db5e411e110bcdb626ae3176644e4093b120e800) Thanks [@nextfridaydeveloper](https://github.com/nextfridaydeveloper)! - Restructured the ESLint plugin by consolidating all exports into a single `index.ts` file and removing deprecated separate configuration and rule files. This simplifies the plugin architecture and improves maintainability.

## 1.0.0

### Major Changes

- [#3](https://github.com/next-friday/eslint-plugin-nextfriday/pull/3) [`3263f66`](https://github.com/next-friday/eslint-plugin-nextfriday/commit/3263f663678b194263c258275c83a866ddd666a8) Thanks [@nextfridaydeveloper](https://github.com/nextfridaydeveloper)! - Initial Release
