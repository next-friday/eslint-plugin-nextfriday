# sort-exports

Enforce a consistent ordering of export groups.

This rule is automatically fixable by the [`--fix` CLI option](https://eslint.org/docs/latest/user-guide/command-line-interface#--fix).

## Rule Details

This rule enforces that named export statements (without declarations) are grouped and ordered by their source type. It does not enforce alphabetical sorting within groups.

### Why?

1. **Readability**: Grouping exports by source type makes barrel files and re-export modules easier to scan
2. **Consistency**: A predictable export order reduces merge conflicts and code review friction
3. **Separation of concerns**: Re-exports from external/internal sources vs local exports serve different purposes

### Export Group Order

1. **External/alias re-exports** — source matches a package name or alias (`@/`, `~/`, `#`) (e.g., `export { foo } from "react"`)
2. **Relative re-exports** — source starts with `.` (e.g., `export { bar } from "../bar"`)
3. **Local exports** — no source (e.g., `export { baz }`)

Skipped (breaks contiguity): `export default`, `export *`, `export const/function/class` (declarations).

Non-contiguous exports (separated by other statements) are checked independently.

## Examples

### ❌ Incorrect

```ts
// Bad: Local before re-export
export { bar };
export { foo } from "react";
```

```ts
// Bad: Relative before external
export { bar } from "../bar";
export { foo } from "react";
```

### ✅ Correct

```ts
// Good: All 3 groups in correct order
export { foo } from "@/lib/foo";
export { bar } from "../bar";
export { baz };
```

```ts
// Good: Non-contiguous exports are independent
export { foo } from "react";

const x = 1;

export { bar };
```

```ts
// Good: Export declarations break contiguity
export const x = 1;
export { foo } from "./foo";
export { bar };
```

## When Not To Use It

If you prefer a different export ordering convention or don't want to enforce any particular order for exports, you can disable this rule.
