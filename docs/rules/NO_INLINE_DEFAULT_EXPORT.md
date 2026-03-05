# no-inline-default-export

Disallow inline exports. Declare first, then export separately.

## Rule Details

This rule enforces separating declarations from exports. Instead of `export function`, declare the function first, then export it.

## Examples

### Incorrect

```ts
// Inline named export
export function fetchData() {
  return fetch("/api");
}

// Inline async named export
export async function fetchHighlight(id: string) {
  return await api.get(`/highlights/${id}`);
}

// Inline class export
export class UserService {
  // ...
}

// Inline default export
export default function generator() {
  // ...
}

// Inline default class export
export default class MyService {
  // ...
}

// Anonymous exports
export default function () {
  return "anonymous";
}

export default () => "arrow";
```

### Correct

```ts
// Declare function, then export
function fetchData() {
  return fetch("/api");
}

export { fetchData };

// Declare async function, then export
async function fetchHighlight(id: string) {
  return await api.get(`/highlights/${id}`);
}

export { fetchHighlight };

// Or use default export
export default fetchHighlight;

// Declare class, then export
class UserService {
  // ...
}

export { UserService };

// Declare function, then default export
function generator() {
  // ...
}

export default generator;

// Re-exports are allowed
export { foo } from "./foo";
export { bar as default } from "./bar";
export type { Baz } from "./baz";

// Literals and objects are allowed
export default "literal";
export default { key: "value" };
```

## When Not To Use It

If your project prefers inline exports for brevity, you may want to disable this rule.

## Related Rules

- [prefer-function-declaration](./PREFER_FUNCTION_DECLARATION.md) - Prefer function declarations over arrow functions
