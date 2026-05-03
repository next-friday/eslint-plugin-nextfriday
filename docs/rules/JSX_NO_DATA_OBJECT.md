# jsx-no-data-object

Disallow top-level nested object literals in `.tsx`/`.jsx` files (extract to a data file).

## Rule Details

This rule flags top-level `const` declarations in `.tsx` and `.jsx` files whose initializer is an object literal that contains at least one nested object or nested array. The "nesting" is the smell — flat maps of primitives are fine, but objects-of-objects or objects-of-object-arrays look like configuration / content data and belong in a data module.

The rule fires on both unexported declarations and `export const` declarations, and on `as const` / `satisfies` variants.

### Why?

- **Separation of concerns**: Component files should describe rendering. Nested configuration / content belongs in a sibling data module.
- **Diff hygiene**: Tweaking a nested setting should not bloat the component diff.
- **AI assistant pressure**: LLMs default to inlining mock config when they cannot find a data layer; a lint rule is the cheapest way to redirect them.

## Examples

### Incorrect

```tsx
const config = { home: { url: "/" } };
const config = { items: [{ id: 1 }] };
const matrix = {
  values: [
    [1, 2],
    [3, 4],
  ],
};
const config = { a: { b: 1 } } as const;
export const config = { a: { b: 1 } };
```

### Correct

```tsx
const TIMEOUT_MS = 1000;
const ROUTES = { home: "/", about: "/about", contact: "/contact" };
const labels = ["Home", "About"];
const config = { a: 1, b: "x", c: true };
```

Move nested objects to a sibling data file:

```ts
// settings.data.ts
export const settings = { home: { url: "/" } };
```

```tsx
// HomePage.tsx
import { settings } from "./settings.data";
```

## What This Rule Checks

The rule fires when a top-level `const` declaration's initializer (after unwrapping `as`/`satisfies`) is an `ObjectExpression` whose properties contain at least one of:

- A property whose value is another `ObjectExpression`
- A property whose value is an `ArrayExpression` containing an `ObjectExpression` or another `ArrayExpression`

Flat maps of primitives are not flagged. The rule applies only to `.tsx` and `.jsx` files.

## When Not To Use It

If your project deliberately co-locates small nested config with components, or if you treat `.tsx` files as both component and data layer.

## Related Rules

- [jsx-no-data-array](JSX_NO_DATA_ARRAY.md)
- [jsx-no-non-component-function](JSX_NO_NON_COMPONENT_FUNCTION.md)
