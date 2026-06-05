# sort-type-alphabetically

Enforce sorting of type members within required and optional groups: non-callable alphabetical, then callable last.

This rule is automatically fixable by the [`--fix` CLI option](https://eslint.org/docs/latest/user-guide/command-line-interface#--fix).

> This rule requires type information. Enable typed linting (for example `parserOptions.projectService: true`).

## Rule Details

This rule enforces that TypeScript interface and type alias properties are ordered within their respective groups (required and optional): non-callable properties first (alphabetically A-Z), then callable (function-typed) properties last (alphabetically A-Z). It checks each group independently. Whether a member is callable is determined from its resolved type, so handlers typed through aliases or indexed access (for example `ComponentProps<typeof Button>["onPress"]`) are recognized.

### Why?

1. **Readability**: Alphabetical ordering makes properties easier to find
2. **Consistency**: A predictable ordering reduces cognitive load during code review
3. **Maintainability**: Clear structure makes it easier to add or remove properties

### Sorting Order

Within each group (required, then optional), members are ordered:

1. **Non-callable members** sorted A-Z
2. **Callable (function-typed) members** sorted A-Z, last

```ts
interface RootProps {
  description: string;
  title: string;
  onSubmit: () => void; // callable -> last in the required group
  submitLabel?: string;
  onReset?: () => void; // callable -> last in the optional group
}
```

Use with `sort-type-required-first` to also enforce required properties come before optional.

## Examples

### Incorrect

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

### Correct

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
