# prefer-named-param-types

Enforce named interfaces or types instead of inline object types for function parameters.

## Rule Details

This rule enforces extracting inline object type annotations for function parameters into named interfaces or type aliases. This promotes better code organization, reusability, and readability across your codebase.

## Examples

### Incorrect

```ts
// Destructured parameter with inline type
const foo = ({ bar, baz }: { bar: string; baz: number }) => {
  console.log(bar, baz);
};

// Regular parameter with inline type
const foo = (params: { bar: string; baz: number }) => {
  const { bar, baz } = params;
  console.log(bar, baz);
};

// Function declaration
function createUser(data: { name: string; email: string; role: "admin" | "user" }) {
  return { ...data, createdAt: Date.now() };
}

// Function expression
const handler = function (data: { id: number; name: string }) {
  return data.id;
};

// Multiple parameters with inline types
const foo = (first: { a: string; b: number }, second: { x: boolean; y: string }) => {
  return { first, second };
};
```

### Correct

```ts
// Using interface
interface Params {
  bar: string;
  baz: number;
}

const foo = (params: Params) => {
  const { bar, baz } = params;
  console.log(bar, baz);
};

// Using type alias
type UserData = {
  name: string;
  email: string;
  role: "admin" | "user";
};

const createUser = (data: UserData) => {
  return { ...data, createdAt: Date.now() };
};

// Primitive types are allowed
const foo = (value: string) => {
  return value;
};

const bar = (count: number, enabled: boolean) => {
  return count > 0 && enabled;
};

// Functions with no parameters
const baz = () => {
  return "no params";
};

// Named types with destructuring
interface Config {
  theme: string;
  locale: string;
}

const setup = (config: Config) => {
  const { theme, locale } = config;
  console.log(theme, locale);
};
```

## Exceptions

This rule defers to [`prefer-interface-over-inline-types`](./PREFER_INTERFACE_OVER_INLINE_TYPES.md) for React components with a single non-destructured prop parameter (for example, `function Comp(props: { name: string }) { return <div /> }`). Both rules would otherwise report the same parameter with different messages, so `prefer-named-param-types` skips that case and lets the React-specific rule produce the canonical message. Destructured component props (`function Comp({ name }: { name: string })`) and non-component functions are still reported here.

## When Not To Use It

- If you prefer inline types for simple, one-off function parameters
- When working with very simple functions that don't benefit from type extraction
- In legacy code with established inline type patterns

## Related Rules

- [prefer-interface-over-inline-types](./PREFER_INTERFACE_OVER_INLINE_TYPES.md) - Owns React component non-destructured prop case
