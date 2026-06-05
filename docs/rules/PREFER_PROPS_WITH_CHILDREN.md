# prefer-props-with-children

Prefer `PropsWithChildren` over manually declaring a `children` property typed as `ReactNode`.

## Rule Details

This rule reports interfaces, type aliases, and inline parameter types that declare a `children` member typed as `ReactNode` (or `React.ReactNode`), whether the member is optional or required. It also flags `children` typed as a `ReactNode` array (`ReactNode[]`) or as a union whose members are all `ReactNode`-like (for example `ReactNode | ReactNode[]`). `PropsWithChildren` already expresses children typed as `ReactNode`, so the manual declaration is redundant.

When the props consist only of `children`, use `PropsWithChildren` directly. When there are other fields, extend or compose with it (`interface X extends PropsWithChildren`, or `PropsWithChildren<{ ... }>`).

Other shapes are left alone: `ReactElement`, render-prop functions like `(value: string) => ReactNode`, and mixed unions such as `ReactNode | string`.

> Note: replacing a required `children: ReactNode` with `PropsWithChildren` makes `children` optional, because `PropsWithChildren` types it as `children?: ReactNode`. This is an intentional behavior of the rule; accept the optionality change before applying the fix.

### Why?

- `PropsWithChildren` is the canonical type for components that accept children, making intent obvious at a glance.
- A manual `children: ReactNode` declaration (in any of the recognized shapes) duplicates what `PropsWithChildren` already provides.

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

```tsx
interface RequiredChildrenProps {
  children: ReactNode;
}
```

```tsx
interface BasicPageProps {
  title: string;
  children: ReactNode | ReactNode[];
}
```

```tsx
interface ListProps {
  children: ReactNode[];
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
