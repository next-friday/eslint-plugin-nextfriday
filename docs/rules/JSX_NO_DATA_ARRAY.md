# jsx-no-data-array

Disallow top-level arrays of object literals in `.tsx`/`.jsx` files (extract to a data file).

## Rule Details

This rule flags top-level `const` declarations in `.tsx` and `.jsx` files whose initializer is an array literal containing one or more object literals. This shape is a strong signal of fixture / seed / content data, which belongs in a sibling data module — not in a component file.

The rule fires on both unexported declarations and `export const` declarations, and on `as const` / `satisfies` variants.

### Why?

- **Separation of concerns**: Component files should describe rendering. Content / fixture data belongs in `*.data.ts`, `*.fixtures.ts`, a CMS, or a content layer.
- **Diff hygiene**: Editing one address line should not produce noise inside the component diff.
- **AI assistant pressure**: LLMs default to inlining mock data when they cannot find a data layer; a lint rule is the cheapest way to redirect them.

## Examples

### Incorrect

```tsx
const stores = [{ name: "Koh Samui", isOpen: true }];
const items: Item[] = [{ id: 1 }, { id: 2 }];
const config = [{ key: "a" }] as const;
const data = [{ id: 1 }] satisfies readonly { id: number }[];
export const navItems = [{ label: "Home", href: "/" }];
```

### Correct

```tsx
const TIMEOUT_MS = 1000;
const labels = ["Home", "About", "Contact"];
const numbers = [1, 2, 3];
const ROUTES = { home: "/", about: "/about" };
```

Move arrays of object literals to a sibling data file:

```ts
// stores.data.ts
export const stores = [{ name: "Koh Samui", isOpen: true }];
```

```tsx
// HeaderStore.tsx
import { stores } from "./stores.data";
```

## What This Rule Checks

The rule fires when a top-level `const` declaration's initializer (after unwrapping `as`/`satisfies`) is an `ArrayExpression` and at least one of its elements is an `ObjectExpression` (also after unwrapping). Arrays of primitives, identifiers, or member expressions are not flagged.

The rule applies only to `.tsx` and `.jsx` files. Plain `.ts` and `.js` files are not checked — extract data files into those extensions.

## When Not To Use It

If your project deliberately co-locates small static data with components, or if you treat `.tsx` files as both component and data layer.

## Related Rules

- [jsx-no-data-object](JSX_NO_DATA_OBJECT.md)
- [jsx-no-non-component-function](JSX_NO_NON_COMPONENT_FUNCTION.md)
