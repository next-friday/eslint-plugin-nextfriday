# sort-type-required-first

Enforce required properties come before optional properties in TypeScript interfaces and type aliases.

This rule is automatically fixable by the [`--fix` CLI option](https://eslint.org/docs/latest/user-guide/command-line-interface#--fix).

## Rule Details

This rule enforces that TypeScript interface and type alias required (non-optional) properties come before optional properties.

### Why?

1. **Readability**: Required properties are the most important contract of a type - they should be visible first
2. **Organization**: Grouping by optionality clearly communicates which properties are mandatory
3. **Consistency**: A predictable ordering makes code easier to scan and review

### Sorting Order

1. **Required properties** first
2. **Optional properties** after

Use with `sort-type-alphabetically` to also enforce A-Z ordering within each group.

## Examples

### ❌ Incorrect

```ts
// Bad: Optional mixed in with required
interface HeroBannerRootProps {
  alt: string;
  label?: string;
  size: "detail" | "highlight" | "main";
  src: string;
}
```

```ts
// Bad: Optional before required
interface Props {
  label?: string;
  alt: string;
  src: string;
}
```

```ts
// Bad: Required after optional
interface Props {
  a: string;
  b: string;
  c?: string;
  d: string;
}
```

### ✅ Correct

```ts
// Good: Required first, then optional
interface HeroBannerRootProps {
  alt: string;
  size: "detail" | "highlight" | "main";
  src: string;
  label?: string;
}
```

```ts
// Good: All required
interface Props {
  a: string;
  b: number;
  c: boolean;
}
```

```ts
// Good: All optional
interface Props {
  a?: string;
  b?: number;
  c?: boolean;
}
```

```ts
// Good: Type alias with required first
type Props = {
  alt: string;
  size: string;
  src: string;
  label?: string;
};
```

## When Not To Use It

If you prefer a different grouping strategy for type properties or don't want to enforce any particular order, you can disable this rule.

## Further Reading

- [TypeScript Interfaces](https://www.typescriptlang.org/docs/handbook/2/objects.html)
- [TypeScript Type Aliases](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#type-aliases)
