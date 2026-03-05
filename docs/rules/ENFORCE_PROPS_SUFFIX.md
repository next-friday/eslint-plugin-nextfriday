# enforce-props-suffix

Enforce `Props` suffix for interfaces and types in component files (`*.tsx`, `*.jsx`).

## Rule Details

This rule ensures that all interfaces and object type aliases in React component files (`.tsx`, `.jsx`) end with the `Props` suffix. Only interfaces and type aliases with object literal types are checked; union types, function types, and type references are not affected.

## Examples

### Incorrect

```tsx
// Button.tsx
interface Button {}
interface Card {
  title: string;
}
type ButtonType = { disabled: boolean };
```

### Correct

```tsx
// Button.tsx
interface ButtonProps {}
interface ButtonStylesProps {}
interface CardProps {
  title: string;
}
type ButtonTypeProps = { disabled: boolean };

// These are allowed (not object type literals):
type Status = "active" | "inactive";
type Callback = () => void;
type ButtonState = SomeOtherType;
```

## When Not To Use It

- If your project uses different naming conventions for prop types
- If you have utility types in component files that shouldn't end with `Props`
