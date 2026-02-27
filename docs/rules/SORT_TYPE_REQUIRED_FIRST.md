# sort-type-required-first

Enforce required properties come before optional properties in TypeScript interfaces and type aliases, with alphabetical sorting within each group.

## Rule Details

This rule enforces that TypeScript interface and type alias properties are sorted with required (non-optional) properties first, then optional properties. Both groups are sorted alphabetically (A-Z).

### Why?

1. **Consistency**: A predictable ordering makes code easier to scan and review
2. **Readability**: Required properties are the most important contract of a type - they should be visible first
3. **Organization**: Grouping by optionality clearly communicates which properties are mandatory
4. **Maintainability**: Clear structure makes it easier to add or remove properties

### Sorting Order

Properties are sorted in this order:

1. **Required properties** (sorted alphabetically A-Z)
2. **Optional properties** (sorted alphabetically A-Z)

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
// Bad: Required not sorted alphabetically
interface Props {
  src: string;
  alt: string;
}
```

```ts
// Bad: Optional not sorted alphabetically
interface Props {
  b?: number;
  a?: string;
}
```

```ts
// Bad: Type alias with optional before required
type Props = {
  label?: string;
  alt: string;
  size: string;
  src: string;
};
```

### ✅ Correct

```ts
// Good: Required first alphabetically, then optional
interface HeroBannerRootProps {
  alt: string;
  size: "detail" | "highlight" | "main";
  src: string;
  label?: string;
}
```

```ts
// Good: All required, sorted alphabetically
interface Props {
  a: string;
  b: number;
  c: boolean;
}
```

```ts
// Good: All optional, sorted alphabetically
interface Props {
  a?: string;
  b?: number;
  c?: boolean;
}
```

```ts
// Good: Type alias with required first then optional
type Props = {
  alt: string;
  size: string;
  src: string;
  label?: string;
};
```

```ts
// Good: Multiple optional at end, sorted alphabetically
interface Props {
  alt: string;
  size: "detail" | "highlight" | "main";
  src: string;
  label?: string;
  visible?: boolean;
}
```

## When Not To Use It

If you prefer a different sorting strategy for type properties or don't want to enforce any particular order, you can disable this rule.

## Further Reading

- [TypeScript Interfaces](https://www.typescriptlang.org/docs/handbook/2/objects.html)
- [TypeScript Type Aliases](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#type-aliases)
