# prefer-function-declaration

Enforce function declarations over arrow functions assigned to variables in `.ts` files.

## Rule Details

This rule requires using function declarations instead of arrow functions or function expressions when defining named functions. Arrow functions used as callbacks are still allowed.

**Target:** `.ts` files only (not `.tsx`, `.js`, or `.d.ts`)

**Incorrect** code for this rule:

```typescript
// Arrow function assigned to variable
const formatDate = (date: Date) => {
  return date.toLocaleDateString("th-TH");
};

// Arrow function with implicit return
const add = (a: number, b: number) => a + b;

// Function expression assigned to variable
const greet = function (name: string) {
  return `Hello ${name}`;
};

// Async arrow function
const fetchUser = async (id: string) => {
  return await api.get(`/users/${id}`);
};
```

**Correct** code for this rule:

```typescript
// Function declaration
function formatDate(date: Date) {
  return date.toLocaleDateString("th-TH");
}

// Function declaration
function add(a: number, b: number) {
  return a + b;
}

// Function declaration
function greet(name: string) {
  return `Hello ${name}`;
}

// Async function declaration
async function fetchUser(id: string) {
  return await api.get(`/users/${id}`);
}
```

## What This Rule Allows

Arrow functions are still allowed in the following contexts:

### Callbacks

```typescript
const years = dates.map((date) => date.getFullYear());
const active = items.filter((item) => item.active);
const sorted = items.sort((a, b) => a.name.localeCompare(b.name));
items.forEach((item) => console.log(item));
setTimeout(() => console.log("done"), 1000);
```

### Object Properties

```typescript
const handler = {
  onClick: () => console.log("clicked"),
  onHover: () => setHovered(true),
};
```

### Array Elements

```typescript
const callbacks = [() => 1, () => 2, () => 3];
```

### Return Values

```typescript
function createHandler() {
  return () => console.log("handled");
}
```

### Conditional/Logical Expressions

```typescript
const fn = condition ? () => valueA : () => valueB;
const handler = defaultFn || (() => fallback);
```

### TSX Files

```typescript
// components/Button.tsx - Arrow functions allowed
const Button = () => <button>Click me</button>;
```

## Benefits

- **Hoisting**: Function declarations are hoisted
- **Better readability**: Function declarations are more explicit
- **Clearer stack traces**: Named function declarations provide better debugging
- **Self-documenting**: `function formatDate()` is clearer than `const formatDate = () =>`

## Why Only `.ts` Files?

- **`.tsx` files**: Arrow functions are commonly used for React components
- **`.js` files**: JavaScript projects may have different conventions
- **`.d.ts` files**: Declaration files don't contain implementations

## When Not To Use

- When you prefer arrow functions for all function definitions
- In projects where arrow function style is established
- When you need lexical `this` binding

## Related Rules

- [no-inline-default-export](./NO_INLINE_DEFAULT_EXPORT.md) - Disallow inline exports
