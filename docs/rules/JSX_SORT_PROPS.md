# jsx-sort-props

Enforce JSX props are sorted by value type.

## Rule Details

This rule enforces a consistent ordering of JSX props based on the type of their value. Props must appear in the following order:

1. **String** - String literals and template literals
2. **Number/Boolean/Null** - Numeric literals, boolean literals, null, and undefined
3. **Object/Array** - Inline objects and arrays
4. **Function** - Arrow functions and function expressions
5. **JSX Element** - JSX elements and fragments
6. **Shorthand boolean** - Props with no value (e.g., `disabled`)

Props with values that cannot be statically determined (variables, member expressions, call expressions, etc.) are skipped and do not affect the ordering check. Spread attributes (`{...props}`) reset the ordering context.

### Why?

- **Readability**: Grouping props by type makes components easier to scan
- **Consistency**: Enforces a uniform prop ordering convention across the codebase
- **Predictability**: Developers know where to find specific prop types at a glance

## Examples

### ❌ Incorrect

```tsx
<Component disabled title="hello" />
<Component onClick={() => {}} count={42} />
<Component icon={<Icon />} style={{ color: "red" }} />
```

### ✅ Correct

```tsx
<Component
  title="hello"
  count={100}
  style={{ color: "red" }}
  onClick={() => handleClick()}
  icon={<HomeIcon />}
  disabled
/>

<Component title="hello" count={42} disabled />

<Component value={someVar} disabled />
```

## When Not To Use It

- If your team prefers alphabetical or custom prop ordering
- If you use a different prop sorting convention

## Related Rules

- [jsx-simple-props](./JSX_SIMPLE_PROPS.md) - Enforce simple prop values
