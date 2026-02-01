# jsx-simple-props

Enforce JSX props to only contain strings, simple variables, callbacks, or ReactNode elements.

## Rule Details

This rule flags complex expressions used as JSX prop values. Props should only contain simple values like strings, variable references, callback functions, or JSX elements. Complex expressions like function calls, inline objects, arrays, and operators should be extracted to variables first.

### Why?

- **Readability**: Simple props are easier to scan and understand at a glance
- **Performance**: Inline objects and arrays create new references on each render
- **Maintainability**: Extracted logic is easier to debug, test, and reuse
- **Consistency**: Enforces a uniform style for prop values across the codebase

## Examples

### ❌ Incorrect

```tsx
<Component onClick={handleClick()} />
<Component data={bar(baz({ aaa, bbb, ccc }), eee)} />
<Component style={{}} />
<Component style={{ color: "red" }} />
<Component items={[1, 2, 3]} />
<Component value={a + b} />
<Component show={condition ? a : b} />
<Component visible={a && b} />
```

### ✅ Correct

```tsx
<Component name="test" />
<Component value={foo} />
<Component value={foo.bar} />
<Component icon={<Icon />} />
<Component disabled />
<Component count={42} />
<Component disabled={true} />
<Component onClick={() => handleClick()} />
<Component onChange={function(e) { setValue(e.target.value) }} />

// Extract complex logic to variables first
const style = { color: "red" };
<Component style={style} />

const items = [1, 2, 3];
<Component items={items} />

const isVisible = condition ? a : b;
<Component show={isVisible} />
```

## When Not To Use It

- If your team prefers inline expressions for simple operations
- For quick prototyping where brevity is prioritized

## Related Rules

- [jsx-no-inline-object-prop](./JSX_NO_INLINE_OBJECT_PROP.md) - Specifically targets inline object literals
