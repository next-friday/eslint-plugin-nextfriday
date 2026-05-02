# prefer-interface-for-component-props

Enforce `interface` over `type` alias for component prop declarations in component files (`*.tsx`, `*.jsx`).

> This rule is auto-fixable using `--fix`.

## Rule Details

In component files, prop declarations are more idiomatic as `interface` than `type` aliases. Interfaces support declaration merging, are easier to extend, and produce clearer error messages from the TypeScript compiler. This rule converts `type` aliases that look like component prop types into `interface` declarations.

The rule fires only when all of the following are true:

- The file extension is `.tsx` or `.jsx`
- The declaration is a `type` alias whose name ends with `Props`
- The body of the type is an object literal (`{ ... }`)

Type aliases with intersection types (`type FooProps = Other & { x: number }`), union types (`type Variant = 'a' | 'b'`), or non-object bodies (`type Props = ReactNode`) are left alone — they cannot be expressed as a single interface without restructuring.

## Examples

### Incorrect

```tsx
type StorePopoverProps = {
  trigger: ReactNode;
};

const StorePopover = (props: Readonly<StorePopoverProps>) => {
  return <div>{props.trigger}</div>;
};
```

### Correct

```tsx
interface StorePopoverProps {
  trigger: ReactNode;
}

const StorePopover = (props: Readonly<StorePopoverProps>) => {
  return <div>{props.trigger}</div>;
};
```

## When Not To Use It

- If your codebase uses `type` aliases for component props by convention
- If you rely on type alias features that interfaces don't support (for example, intersections or unions in the same declaration)

## Related Rules

- [enforce-props-suffix](./ENFORCE_PROPS_SUFFIX.md) - Enforces the `Props` suffix that this rule keys off
- [prefer-interface-over-inline-types](./PREFER_INTERFACE_OVER_INLINE_TYPES.md) - Sister rule for inline types in component params
