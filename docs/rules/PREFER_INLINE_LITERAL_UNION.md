# prefer-inline-literal-union

Enforce inlining literal union types in interface properties instead of using type aliases for better IDE hover information.

This rule is automatically fixable by the [`--fix` CLI option](https://eslint.org/docs/latest/user-guide/command-line-interface#--fix).

## Rule Details

This rule detects type aliases that are unions of only literal values (strings, numbers, booleans, null, undefined) and flags their usage in interface or type properties. The fix inlines the union directly into the property type annotation.

### Why?

When you hover over a prop in your IDE, a type alias shows the alias name (e.g., `ArticleFaqCategoryId`) instead of the actual values (`"articles" | "dharma" | "faq"`). Inlining literal unions gives immediate visibility into the allowed values without needing to jump to the type definition.

## Examples

### Incorrect

```ts
type ArticleFaqCategoryId = "articles" | "dharma" | "faq";

interface ArticleFaqCategoryFilterProps {
  activeCategoryId?: ArticleFaqCategoryId;
}
```

```ts
type Status = "loading" | "success" | "error";

interface Props {
  status: Status;
}
```

```ts
type Size = 1 | 2 | 3 | 4;

interface Props {
  size: Size;
}
```

### Correct

```ts
interface ArticleFaqCategoryFilterProps {
  activeCategoryId?: "articles" | "dharma" | "faq";
}
```

```ts
interface Props {
  status: "loading" | "success" | "error";
}
```

```ts
interface Props {
  size: 1 | 2 | 3 | 4;
}
```

```ts
// Non-literal unions are allowed as type aliases
type User = { name: string; age: number };

interface Props {
  user: User;
}
```

```ts
// Using the alias outside of interface properties is fine
type Status = "loading" | "success" | "error";
function getStatus(s: Status): string {
  return s;
}
```

## When Not To Use It

If you prefer using type aliases for literal unions (e.g., for reuse across multiple interfaces or for self-documenting code), you can disable this rule.

## Further Reading

- [TypeScript Union Types](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#union-types)
- [TypeScript Literal Types](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#literal-types)
