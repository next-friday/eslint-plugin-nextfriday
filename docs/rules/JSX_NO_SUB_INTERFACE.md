# jsx-no-sub-interface

Disallow sub-interfaces and helper types in component files; keep only the main component props.

## Rule Details

This rule flags any top-level `interface` or `type` declaration in a `.tsx` / `.jsx` file that is not the main props type for a component declared in the same file. Sub-interfaces (e.g., `StoreCardAddressProps` referenced as a field in `StoreCardProps`) and helper unions (e.g., `type StoreCardKind = "a" | "b"`) should live in their own modules — typically a sibling `*.types.ts` file or alongside their own component.

The "main" props type is determined by the parameter type of a top-level PascalCase function or arrow component. Common wrappers like `Readonly<T>`, `Required<T>`, `Partial<T>`, `PropsWithChildren<T>`, and `NoInfer<T>` are unwrapped to find the underlying type name.

If the file declares no component at all, the rule does not fire — pure `.tsx` / `.jsx` files used as type or re-export modules are skipped.

### Why?

- **Single responsibility per file**: A component file should describe one component. Sub-types pollute it with shapes that are referenced but not the component's own concern.
- **Reusability**: Sub-types extracted to their own module can be imported by sibling components and tests; trapped inside a component file, they cannot.
- **Diff hygiene**: Editing a sub-interface should not produce noise in the component diff.

## Examples

### Incorrect

```tsx
interface StoreCardProps {
  address: StoreCardAddressProps;
  image: StoreCardImageProps;
  name: string;
}

interface StoreCardAddressProps {
  label: string;
  mapUrl: string;
}

interface StoreCardImageProps {
  alt: string;
  src: string;
}

type StoreCardKind = "phone" | "whatsapp";

const StoreCard = (props: Readonly<StoreCardProps>) => <div />;
```

### Correct

```tsx
import type { StoreCardAddressProps } from "./store-card-address.types";
import type { StoreCardImageProps } from "./store-card-image.types";

interface StoreCardProps {
  address: StoreCardAddressProps;
  image: StoreCardImageProps;
  name: string;
}

const StoreCard = (props: Readonly<StoreCardProps>) => <div />;
```

```ts
// store-card-address.types.ts
export interface StoreCardAddressProps {
  label: string;
  mapUrl: string;
}
```

## What This Rule Checks

The rule walks the program body and collects:

- **Components** — top-level PascalCase `function` declarations and PascalCase `const X = (...) => ...` or `const X = function(...) {}` initializers, including ones wrapped in `export` / `export default`.
- **Main types** — for each component, the type referenced by its first parameter's annotation, after unwrapping `Readonly<T>`, `Required<T>`, `Partial<T>`, `PropsWithChildren<T>`, and `NoInfer<T>`.
- **Top-level type declarations** — `interface` and `type` declarations at the top level (including ones wrapped in `export`).

Any top-level type declaration whose name is not in the set of main types is flagged. The rule does not fire when the file has no component.

## When Not To Use It

If your project deliberately co-locates sub-types and helper types with their consuming component, or if you keep the component and its supporting types in a single file by convention.

## Related Rules

- [enforce-props-suffix](ENFORCE_PROPS_SUFFIX.md)
- [prefer-interface-for-component-props](PREFER_INTERFACE_FOR_COMPONENT_PROPS.md)
- [prefer-interface-over-inline-types](PREFER_INTERFACE_OVER_INLINE_TYPES.md)
