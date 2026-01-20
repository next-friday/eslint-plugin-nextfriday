# prefer-function-declaration

Enforce function declarations over arrow functions assigned to variables in `.ts` files for better readability and hoisting.

## Rule Details

This rule requires using function declarations instead of arrow functions or function expressions when defining named functions in TypeScript utility files. Arrow functions used as callbacks (in `.map()`, `.filter()`, etc.) are still allowed.

**Target:** `.ts` files only (not `.tsx`, `.js`, or `.d.ts`)

**Incorrect** code for this rule:

```typescript
// utils/date.ts
const formatThaiDate = (date: Date) => {
  return date.toLocaleDateString("th-TH");
};

const formatDate = (date: Date) => date.toISOString();

export const add = (a: number, b: number) => a + b;

const greet = function (name: string) {
  return `Hello ${name}`;
};

const fetchUser = async (id: string) => {
  return await api.get(`/users/${id}`);
};
```

**Correct** code for this rule:

```typescript
// utils/date.ts
function formatThaiDate(date: Date) {
  return date.toLocaleDateString("th-TH");
}

function formatDate(date: Date) {
  return date.toISOString();
}

export function add(a: number, b: number) {
  return a + b;
}

function greet(name: string) {
  return `Hello ${name}`;
}

async function fetchUser(id: string) {
  return await api.get(`/users/${id}`);
}
```

## What This Rule Allows

Arrow functions are still allowed in the following contexts:

### Callbacks

```typescript
// All of these are allowed
const years = dates.map((date) => date.getFullYear());
const active = items.filter((item) => item.active);
const sorted = items.sort((a, b) => a.name.localeCompare(b.name));
items.forEach((item) => console.log(item));
const total = items.reduce((sum, item) => sum + item.price, 0);
setTimeout(() => console.log("done"), 1000);
promise.then((result) => result.data);
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
const handleClick = () => console.log("clicked");
```

## Benefits

- **Hoisting**: Function declarations are hoisted, allowing you to call functions before they're defined
- **Better readability**: Function declarations are more explicit about intent
- **Clearer stack traces**: Named function declarations provide better debugging information
- **Consistent style**: Enforces uniform function definition patterns in utility files
- **Self-documenting**: `function formatDate()` is clearer than `const formatDate = () =>`

## Why Only `.ts` Files?

- **`.tsx` files**: Arrow functions are commonly used for React components and event handlers
- **`.js` files**: JavaScript projects may have different conventions
- **`.d.ts` files**: Declaration files don't contain implementations

## When Not To Use

- When you prefer arrow functions for all function definitions
- In projects where arrow function style is established
- When you need lexical `this` binding (arrow functions don't have their own `this`)

## Configuration

This rule has no configuration options.

## Related Rules

- [func-style](https://eslint.org/docs/rules/func-style) - Built-in ESLint rule for function style
- [arrow-body-style](https://eslint.org/docs/rules/arrow-body-style) - Enforce arrow function body style
