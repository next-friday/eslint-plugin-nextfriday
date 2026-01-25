# jsx-no-non-component-function

Disallow non-component functions defined at top level in .tsx and .jsx files.

## Rule Details

This rule prevents non-component functions from being defined at the top level in `.tsx` and `.jsx` files. These functions should either be:

1. Extracted to separate files and imported
2. Defined inside the component function if they are component-specific

### Why?

1. **Better Organization**: Top-level functions in component files can accumulate and make files messy and hard to maintain
2. **Proper Separation of Concerns**: Utility/helper functions belong in separate files, not in component files
3. **Improved Reusability**: Extracting functions to separate files makes them easier to reuse across components
4. **Cleaner Component Files**: Component files should focus on component logic only

## Examples

### ❌ Incorrect

```tsx
// Bad: Non-component function defined at top level in .tsx file
const helper = (name: string) => {
  const words = name.trim().split(/\s+/);
  if (words.length === 1) {
    return words[0].charAt(0).toUpperCase();
  }
  return words
    .slice(0, 2)
    .map((word) => word.charAt(0).toUpperCase())
    .join("");
};

const Component = () => {
  return <div>{helper("test")}</div>;
};
```

```tsx
// Bad: Function declaration at top level
function formatName(name: string) {
  return name.toUpperCase();
}

const Component = () => {
  return <div>{formatName("test")}</div>;
};
```

```tsx
// Bad: Non-component function before exported component
const calculateTotal = (items: number[]) => {
  return items.reduce((sum, item) => sum + item, 0);
};

const OrderSummary = () => {
  return <div>Total</div>;
};

export { OrderSummary };
```

### ✅ Correct

```tsx
// Good: Function imported from separate file
import { helper } from "./helper";

const Component = () => {
  return <div>{helper("test")}</div>;
};
```

```tsx
// Good: Function defined inside component
const Component = () => {
  const helper = (name: string) => {
    return name.toUpperCase();
  };

  return <div>{helper("test")}</div>;
};
```

```tsx
// Good: Component only
const Component = () => {
  return <div>Hello</div>;
};
```

```typescript
// Good: Functions in .ts or .js files are allowed
// utils.ts
function helper(name: string) {
  return name.toUpperCase();
}

export { helper };
```

```tsx
// Good: Exported component functions are allowed
const Component = () => {
  return <div>Hello</div>;
};

export { Component };
```

## When Not To Use It

If you prefer to keep utility/helper functions in the same file as your components, you can disable this rule. However, this may lead to less organized code and reduced reusability.

## Further Reading

- [React Component File Structure Best Practices](https://react.dev/learn/thinking-in-react)
- [Separation of Concerns](https://en.wikipedia.org/wiki/Separation_of_concerns)
