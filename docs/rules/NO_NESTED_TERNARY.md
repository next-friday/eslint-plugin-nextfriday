# no-nested-ternary

Disallow nested ternary expressions.

## Rule Details

Nested ternary expressions are difficult to read and understand. This rule enforces using functions with early returns instead.

## Examples

### ❌ Incorrect

```tsx
const status = isLoading ? "loading" : isError ? "error" : "success";

const value = a ? (b ? 1 : 2) : 3;

const result = condition1 ? value1 : condition2 ? value2 : condition3 ? value3 : defaultValue;
```

### ✅ Correct

```tsx
// Simple ternary (no nesting)
const status = isLoading ? "loading" : "success";

// Function with early returns
const getStatus = () => {
  if (isLoading) return "loading";
  if (isError) return "error";
  return "success";
};

// IIFE for inline usage
const status = (() => {
  if (isLoading) return "loading";
  if (isError) return "error";
  return "success";
})();
```

## When Not To Use It

- If your team prefers nested ternaries for simple cases
- If you have existing code with many nested ternaries and don't want to refactor
