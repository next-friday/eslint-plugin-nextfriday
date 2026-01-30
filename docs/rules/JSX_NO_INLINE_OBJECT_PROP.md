# jsx-no-inline-object-prop

Disallow inline object literals in JSX props. Extract to a const variable first.

## Rule Details

This rule flags inline object literals used directly as JSX prop values. Inline objects create new object references on every render, which can cause unnecessary re-renders and make code harder to read.

### Why?

- **Performance**: Inline objects create new references on each render, causing child components to re-render
- **Readability**: Extracting objects to constants makes JSX cleaner and props easier to scan
- **Maintainability**: Named constants are easier to reuse and modify

## Examples

### ❌ Incorrect

```tsx
<Component style={{ color: "red" }} />
<Component data={{ id: 1 }} />
<Component config={{ enabled: true, timeout: 1000 }} />
<div style={{ margin: 0 }} />
```

### ✅ Correct

```tsx
const style = { color: "red" };
<Component style={style} />

const data = { id: 1 };
<Component data={data} />

// Or use useMemo for dynamic values
const config = useMemo(() => ({ enabled, timeout }), [enabled, timeout]);
<Component config={config} />

// Other prop types are fine
<Component onClick={handleClick} />
<Component disabled={true} />
<Component name="test" />
<Component items={[1, 2, 3]} />
```

## When Not To Use It

- If you're not concerned about render performance
- For one-off components that don't re-render frequently

## Related Rules

- [react/jsx-no-constructed-context-values](https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-no-constructed-context-values.md)
