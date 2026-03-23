# prefer-inline-type-export

Require type and interface declarations to be exported inline rather than via a separate export statement.

> This rule is auto-fixable using `--fix`.

## Rule Details

This rule enforces that `interface` and `type` declarations are exported directly at the declaration site using the `export` keyword, rather than being exported separately via `export type { ... }` or `export { ... }` at the bottom of the file.

### Why?

Inline exports make it immediately clear at the declaration site that a type is part of the module's public API. Separate export statements create a disconnect between the declaration and its visibility, making it harder to understand the module's surface area at a glance.

## Examples

### Incorrect

```ts
interface ButtonProps {
  label: string;
  disabled: boolean;
}

type Theme = "light" | "dark";

export type { ButtonProps, Theme };
```

```ts
interface Config {
  port: number;
}

export { Config };
```

### Correct

```ts
export interface ButtonProps {
  label: string;
  disabled: boolean;
}

export type Theme = "light" | "dark";
```

```ts
export interface Config {
  port: number;
}
```

## Exceptions

This rule only applies to `interface` and `type` declarations defined in the same file. It does not flag:

- Re-exports from other modules (`export type { Foo } from './types'`)
- Separate exports of non-type declarations (variables, functions, classes)

## When Not To Use It

If your project prefers grouping all exports at the bottom of the file for consistency.
