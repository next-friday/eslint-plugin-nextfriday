# prefer-function-declaration

Enforce function declarations over arrow functions assigned to variables in `.ts` files.

## Rule Details

This rule requires using function declarations instead of arrow functions or function expressions when defining named functions. Arrow functions used as callbacks are still allowed.

**Target:** `.ts` files only (not `.tsx`, `.js`, or `.d.ts`)

## Examples

### Incorrect

```ts
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

### Correct

```ts
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

```ts
const years = dates.map((date) => date.getFullYear());
const active = items.filter((item) => item.active);
const sorted = items.sort((a, b) => a.name.localeCompare(b.name));
items.forEach((item) => console.log(item));
setTimeout(() => console.log("done"), 1000);
```

### Object Properties

```ts
const handler = {
  onClick: () => console.log("clicked"),
  onHover: () => setHovered(true),
};
```

### Array Elements

```ts
const callbacks = [() => 1, () => 2, () => 3];
```

### Return Values

```ts
function createHandler() {
  return () => console.log("handled");
}
```

### Conditional/Logical Expressions

```ts
const fn = condition ? () => valueA : () => valueB;
const handler = defaultFn || (() => fallback);
```

### TSX Files

```ts
// components/Button.tsx - Arrow functions allowed
const Button = () => <button>Click me</button>;
```

## When Not To Use It

- When you prefer arrow functions for all function definitions
- In projects where arrow function style is established
- When you need lexical `this` binding

## Related Rules

- [no-inline-default-export](./NO_INLINE_DEFAULT_EXPORT.md) - Disallow inline exports
