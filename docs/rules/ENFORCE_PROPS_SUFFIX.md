# enforce-props-suffix

Enforce `Props` suffix for interfaces and types in component files (`*.tsx`, `*.jsx`).

## Rule Details

This rule ensures that all interfaces and object type aliases in React component files end with the `Props` suffix for consistency and clarity.

### Why?

- **Clarity**: Clearly identifies types that represent component props
- **Consistency**: Standardizes naming across all component files
- **Convention**: Follows common React/TypeScript naming patterns

## Examples

### ❌ Incorrect

```tsx
// Button.tsx
interface Button {}
interface Card {
  title: string;
}
type ButtonType = { disabled: boolean };
```

### ✅ Correct

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

## Applies To

This rule only applies to files with extensions:

- `.tsx`
- `.jsx`

## Notes

- Only interfaces and type aliases with object literal types are checked
- Union types, function types, and type references are not affected
