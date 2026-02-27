# sort-type-alphabetically

Enforce alphabetical sorting of properties within required and optional groups in TypeScript interfaces and type aliases.

This rule is automatically fixable by the [`--fix` CLI option](https://eslint.org/docs/latest/user-guide/command-line-interface#--fix).

## Rule Details

This rule enforces that TypeScript interface and type alias properties are sorted alphabetically (A-Z) within their respective groups (required and optional). It checks each group independently.

### Why?

1. **Readability**: Alphabetical ordering makes properties easier to find
2. **Consistency**: A predictable ordering reduces cognitive load during code review
3. **Maintainability**: Clear structure makes it easier to add or remove properties

### Sorting Order

Properties within each group are sorted alphabetically A-Z:

1. **Required properties** sorted A-Z among themselves
2. **Optional properties** sorted A-Z among themselves

Use with `sort-type-required-first` to also enforce required properties come before optional.

## Examples

### ❌ Incorrect

```ts
// Bad: Required not sorted A-Z
interface Props {
  src: string;
  alt: string;
}
```

```ts
// Bad: Optional not sorted A-Z
interface Props {
  b?: number;
  a?: string;
}
```

```ts
// Bad: Required group not sorted A-Z
interface HeroBannerRootProps {
  size: "detail" | "highlight" | "main";
  alt: string;
  src: string;
  className?: string;
  label?: string;
}
```

### ✅ Correct

```ts
// Good: Required A-Z, optional A-Z
interface HeroBannerRootProps {
  alt: string;
  size: "detail" | "highlight" | "main";
  src: string;
  className?: string;
  label?: string;
  onClick?: () => void;
}
```

```ts
// Good: All required, sorted A-Z
interface Props {
  a: string;
  b: number;
  c: boolean;
}
```

```ts
// Good: All optional, sorted A-Z
interface Props {
  a?: string;
  b?: number;
  c?: boolean;
}
```

```ts
// Good: Type alias with A-Z within groups
type Props = {
  alt: string;
  size: string;
  src: string;
  label?: string;
};
```

## When Not To Use It

If you prefer a different sorting strategy for type properties or don't want to enforce alphabetical ordering, you can disable this rule.

## Further Reading

- [TypeScript Interfaces](https://www.typescriptlang.org/docs/handbook/2/objects.html)
- [TypeScript Type Aliases](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#type-aliases)
