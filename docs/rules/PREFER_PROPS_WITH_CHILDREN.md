# prefer-props-with-children

Prefer `PropsWithChildren<T>` over manually declaring `children?: ReactNode` in component props.

## Rule Details

This rule reports interfaces, type aliases, and inline parameter types that declare an **optional** `children` field typed as `ReactNode` (or `React.ReactNode`). `PropsWithChildren<T>` already provides exactly this — an optional `children: ReactNode` — so the manual declaration is redundant.

Required `children: ReactNode` (without `?`) is intentional and is not flagged, because `PropsWithChildren` cannot express required children.

The rule only flags `children?` whose type is exactly `ReactNode`. Other shapes such as `ReactElement`, render-prop functions, or unions like `ReactNode | string` are left alone.

### Why?

- `PropsWithChildren<T>` is the canonical type for components that optionally accept children, making intent obvious at a glance.
- Required `children: ReactNode` (no `?`) cannot be replaced by `PropsWithChildren` — that case is intentional and not flagged.

## Examples

### Incorrect

```tsx
interface OptionalChildrenProps {
  children?: ReactNode;
  label: string;
}
```

```tsx
interface LayoutProps {
  children?: ReactNode;
}
```

```tsx
type WrapperProps = {
  children?: ReactNode;
  className: string;
};
```

```tsx
interface ReactNamespaceProps {
  children?: React.ReactNode;
}
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
interface RequiredChildrenProps {
  children: ReactNode;
}
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

- Your project intentionally avoids `PropsWithChildren` and prefers explicit `children?` declarations.
- You frequently use children types other than `ReactNode` (this rule already skips those cases).

## Related Rules

- [`prefer-react-import-types`](./PREFER_REACT_IMPORT_TYPES.md) - Enforce direct imports from `react` instead of `React.X`
- [`enforce-props-suffix`](./ENFORCE_PROPS_SUFFIX.md) - Enforce `Props` suffix for component prop types
