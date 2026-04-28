# jsx-spread-props-last

Enforce JSX spread attributes appear after all other props.

## Rule Details

This rule flags JSX spread attributes (`{...props}`) that appear before any non-spread prop. Spreads must come at the end so they consistently override or extend the explicit props above them. When multiple spreads exist on the same element, all of them must sit at the tail.

### Why?

- **Predictability**: Spread-last makes precedence consistent across the codebase
- **Readability**: Explicit props are visible up front; the spread is a clear extension point
- **Consistency**: Removes ambiguity about which props win when names collide

## Examples

### Incorrect

```tsx
<Component {...bes} baz="baz" foobar={foobar} />
<Component baz="baz" {...bes} foobar={foobar} />
<Component {...a} name="x" {...b} />
<Component {...a} {...b} name="x" />
```

### Correct

```tsx
<Component baz="baz" foobar={foobar} {...bes} />
<Component name="x" {...a} {...b} />
<Component {...bes} />
<Component name="x" count={1} disabled />
```

## When Not To Use It

- If your team intentionally puts spreads first so explicit props always win
- If you control prop precedence on a per-call basis by mixing spread and explicit props

## Related Rules

- [jsx-sort-props](./JSX_SORT_PROPS.md) - Enforce JSX props are sorted by value type
