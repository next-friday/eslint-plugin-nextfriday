# jsx-no-ternary-null

Enforce logical AND over ternary with null/undefined in JSX expressions.

> This rule is auto-fixable using `--fix`.

## Rule Details

This rule flags ternary expressions inside JSX where one branch is `null` or `undefined`. These patterns are better expressed using the logical AND (`&&`) operator, which is more concise and idiomatic in React.

### Why?

- **Readability**: `{condition && <Component />}` is cleaner than `{condition ? <Component /> : null}`
- **Consistency**: Encourages a single pattern for conditional rendering
- **Conciseness**: Removes unnecessary null/undefined branches

## Examples

### Incorrect

```tsx
<div>{condition ? <span>Hello</span> : null}</div>
<div>{condition ? <Component /> : undefined}</div>
<div>{condition ? null : <span>Fallback</span>}</div>
```

### Correct

```tsx
<div>{condition && <span>Hello</span>}</div>
<div>{condition && <Component />}</div>
<div>{!condition && <span>Fallback</span>}</div>
<div>{condition ? <A /> : <B />}</div>
```

## When Not To Use It

If your team prefers explicit ternary expressions for conditional rendering, even when one branch is null or undefined.

## Related Rules

- [no-nested-ternary](NO_NESTED_TERNARY.md)
