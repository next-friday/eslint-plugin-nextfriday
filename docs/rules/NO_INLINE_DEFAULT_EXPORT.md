# no-inline-default-export

Disallow inline exports. Declare first, then export separately.

## Rule Details

This rule enforces separating declarations from exports. Instead of `export function`, declare the function first, then export it.

**Incorrect** code for this rule:

```typescript
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

**Correct** code for this rule:

```typescript
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

## Benefits

- **Readability**: Easy to see what a module exports at a glance
- **Consistency**: All exports follow the same pattern
- **Refactoring**: Easier to rename or move declarations

## When Not To Use

If your project prefers inline exports for brevity, you may want to disable this rule.

## Related Rules

- [prefer-function-declaration](./PREFER_FUNCTION_DECLARATION.md) - Prefer function declarations over arrow functions
