# index-export-only

Restrict `index` files to imports, re-exports, and type declarations only.

## Rule Details

This rule enforces that `index.{js,jsx,ts,tsx}` files act purely as barrel files. Any runtime declaration — functions, classes, variables, top-level expressions, or inline `export const`/`export function`/`export class` — must live in its own module and be re-exported from the index.

The rule applies only when the basename of the file is `index`. Files like `index.test.ts`, `index.spec.ts`, or `index.d.ts` are not affected.

### Why?

Index files are entry points. Mixing implementation into them obscures where behavior lives, breaks file-based code navigation, and makes the import surface harder to refactor. A barrel file should describe the public API of a directory — nothing more.

## Examples

### Incorrect

```ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export { cn };
```

```ts
export const VERSION = "1.0.0";

export function helper() {
  return 1;
}

export class Service {}
```

```ts
console.log("loaded");
```

### Correct

```ts
export { cn } from "./cn";
export * from "./types";
export type { Props } from "./props";
export { default as Button } from "./button";
```

```ts
import button from "./button";

export default button;
```

```ts
export type Foo = string;
export interface Bar {
  id: string;
}
```

## What This Rule Allows

- `import` statements (including side-effect imports like `import "./styles.css"`)
- Specifier-only `export` and `export ... from` re-exports
- `export *` and `export * as ns` re-exports
- `export default identifier` where the identifier comes from an import
- Top-level `type` aliases and `interface` declarations (they have no runtime cost)
- `export type` and `export interface` declarations

## What This Rule Disallows

- `function`, `class`, and `const`/`let`/`var` declarations at the top level
- Inline `export function`, `export class`, `export const`, `export let`, `export var`
- `export default` of a function/class/literal/object expression
- Top-level expression statements and control flow (`console.log(...)`, `if`, `for`, etc.)

## When Not To Use It

If your project intentionally mixes implementation and re-exports in index files — for example, a single-file utility library where `index.ts` is the only source file — disable this rule.

## Related Rules

- [no-inline-default-export](./NO_INLINE_DEFAULT_EXPORT.md) - Disallow inline default and named exports across all files
