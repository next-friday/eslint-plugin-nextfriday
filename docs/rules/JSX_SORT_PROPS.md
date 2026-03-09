# jsx-sort-props

Enforce JSX props are sorted by value type.

## Rule Details

This rule enforces a consistent ordering of JSX props based on the type of their value. Props must appear in the following order:

1. **String** - String literals and template literals (e.g., `className="cover"`)
2. **Hyphenated string** - Props with hyphenated names and string values (e.g., `aria-label="label"`, `data-slot="nav"`)
3. **Number/Boolean/Null** - Numeric literals, boolean literals, null, and undefined
4. **Expression** - Variable references, member expressions, call expressions, and other dynamic values
5. **Object/Array** - Inline objects and arrays
6. **Function** - Arrow functions and function expressions
7. **JSX Element** - JSX elements and fragments
8. **Shorthand boolean** - Props with no value (e.g., `disabled`, `required`)

Spread attributes (`{...props}`) reset the ordering context.

### Why?

- **Readability**: Grouping props by type makes components easier to scan
- **Consistency**: Enforces a uniform prop ordering convention across the codebase
- **Predictability**: Developers know where to find specific prop types at a glance

## Examples

### Incorrect

```tsx
<Component disabled title="hello" />
<Component onClick={() => {}} count={42} />
<Component className="cover" src={src} fill sizes={sizes} />
```

### Correct

```tsx
<Component
  title="hello"
  aria-label="close"
  count={100}
  src={src}
  style={{ color: "red" }}
  onClick={() => handleClick()}
  icon={<HomeIcon />}
  disabled
/>

<Component title="hello" count={42} disabled />

<Component className="cover" src={src} alt={alt} sizes={sizes} fill />
```

## When Not To Use It

- If your team prefers alphabetical or custom prop ordering
- If you use a different prop sorting convention

## Related Rules

- [jsx-simple-props](./JSX_SIMPLE_PROPS.md) - Enforce simple prop values
