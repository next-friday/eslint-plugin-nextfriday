# prefer-props-with-children

Prefer `PropsWithChildren<T>` over manually declaring `children: ReactNode` in component props.

## Rule Details

This rule reports interfaces, type aliases, and inline parameter types that declare a `children` field typed as `ReactNode` (or `React.ReactNode`). React already provides the `PropsWithChildren<T>` helper for this exact case, so prefer it for consistency and to avoid restating the well-known `children` shape on every component.

The rule only flags `children` whose type is exactly `ReactNode` (matching what `PropsWithChildren` provides). Other shapes such as `ReactElement`, render-prop functions, or unions like `ReactNode | string` are left alone.

### Why?

- `PropsWithChildren<T>` is the canonical type for components that accept children, making intent obvious at a glance.
- It eliminates duplication of the `children` declaration across every component that accepts children.
- It keeps the surrounding props focused on what is unique to the component.

## Examples

### Incorrect

```tsx
interface LayoutProps {
  children: ReactNode;
}
```

```tsx
interface CardProps {
  title: string;
  children: ReactNode;
}
```

```tsx
interface OptionalChildrenProps {
  children?: ReactNode;
  label: string;
}
```

```tsx
interface ReactNamespaceProps {
  children: React.ReactNode;
}
```

```tsx
type WrapperProps = {
  children: ReactNode;
  className: string;
};
```

```tsx
const Component = ({ children, label }: { children: ReactNode; label: string }) => (
  <div>
    {children}
    {label}
  </div>
);
```

### Correct

```tsx
type LayoutProps = PropsWithChildren;
```

```tsx
interface CardProps extends PropsWithChildren {
  title: string;
}
```

```tsx
type WrapperProps = PropsWithChildren<{
  className: string;
}>;
```

```tsx
const Component = (props: Readonly<PropsWithChildren<{ label: string }>>) => (
  <div>
    {props.children}
    {props.label}
  </div>
);
```

```tsx
interface RenderProps {
  children: (value: string) => ReactNode;
}
```

```tsx
interface SlotProps {
  children: ReactElement;
}
```

## When Not To Use It

This rule should not be used if:

- Your project intentionally avoids `PropsWithChildren` and prefers explicit `children` declarations.
- You frequently use children types other than `ReactNode` (this rule already skips those cases).

## Related Rules

- [`prefer-react-import-types`](./PREFER_REACT_IMPORT_TYPES.md) - Enforce direct imports from `react` instead of `React.X`
- [`enforce-props-suffix`](./ENFORCE_PROPS_SUFFIX.md) - Enforce `Props` suffix for component prop types
