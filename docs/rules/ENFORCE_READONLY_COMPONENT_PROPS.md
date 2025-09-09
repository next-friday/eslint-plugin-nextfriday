# enforce-readonly-component-props

Enforce `Readonly<>` wrapper for React component props when using named types or interfaces.

## Rule Details

This rule enforces that React component props using named types (interfaces or type aliases) must be wrapped with `Readonly<>` for immutability. This helps prevent accidental mutations of props and makes the immutable nature of React props explicit in the type system.

## Examples

### ❌ Incorrect

```tsx
interface Props {
  children: ReactNode;
}
const Component = (props: Props) => <div>{props.children}</div>;
```

```tsx
type ComponentProps = {
  title: string;
  onClick: () => void;
};
const Component = (props: ComponentProps) => <div>{props.title}</div>;
```

```tsx
interface LayoutProps {
  children: ReactNode;
  title?: string;
}
function Layout(props: LayoutProps) {
  return <div>{props.children}</div>;
}
```

### ✅ Correct

```tsx
interface Props {
  children: ReactNode;
}
const Component = (props: Readonly<Props>) => <div>{props.children}</div>;
```

```tsx
type ComponentProps = {
  title: string;
  onClick: () => void;
};
const Component = (props: Readonly<ComponentProps>) => <div>{props.title}</div>;
```

```tsx
interface LayoutProps {
  children: ReactNode;
  title?: string;
}
function Layout(props: Readonly<LayoutProps>) {
  return <div>{props.children}</div>;
}
```

```tsx
// Inline types are handled by prefer-interface-over-inline-types rule
const Component = (props: { children: ReactNode }) => <div>{props.children}</div>;
```

```tsx
// Non-React functions are ignored
interface HelperProps {
  value: number;
}
const helper = (props: HelperProps) => {
  return props.value * 2;
};
```

## When Not To Use

This rule should not be used if:

- You prefer inline types for component props (use `prefer-interface-over-inline-types` instead)
- You don't want to enforce immutability patterns in your React components
- You're working with a codebase that doesn't use TypeScript strict mode

## Fixable

This rule is fixable using ESLint's `--fix` option. The fixer will automatically wrap named types with `Readonly<>`.

## Related Rules

- [`prefer-interface-over-inline-types`](./PREFER_INTERFACE_OVER_INLINE_TYPES.md) - Enforces interface declarations over inline types
- [`react-props-destructure`](./REACT_PROPS_DESTRUCTURE.md) - Enforces destructuring props inside component body

## Configuration

This rule is included in the following configurations:

- `react` (warn)
- `react/recommended` (error)
- `nextjs` (warn)
- `nextjs/recommended` (error)
