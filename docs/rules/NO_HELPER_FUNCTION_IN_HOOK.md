# no-helper-function-in-hook

Disallow non-hook helper function definitions in hook files.

## Rule Details

Custom hook files should contain only the hook function itself (prefixed with `use`) and its supporting constants. Utility functions that are not hooks must be extracted to a separate file and imported.

### Why?

Helper functions defined inside a hook file are invisible to the rest of the codebase, cannot be tested independently, and are harder to reuse. Keeping hook files focused on a single hook makes them easier to read and maintain.

## Examples

### Incorrect

```ts
function buildQueryKey(id: string): string {
  return `item-${id}`;
}

export function useItemData(id: string) {
  const key = buildQueryKey(id);
  // ...
}
```

```ts
const formatResponse = (data: unknown) => data;

export const useItemData = (id: string) => {
  // ...
};
```

### Correct

```ts
import { buildQueryKey } from "./item.utils";

export function useItemData(id: string) {
  const key = buildQueryKey(id);
  // ...
}
```

Functions defined inside the hook body are fine:

```ts
export function useItemData(id: string) {
  function buildQueryKey() {
    return `item-${id}`;
  }
  // ...
}
```

## What This Rule Checks

- Top-level `function` declarations whose name does not start with `use`
- Top-level `const`/`let`/`var` declarations assigned an arrow function or function expression whose name does not start with `use`

Both plain and `export`-prefixed declarations are checked.

## Exceptions

- Hook functions starting with `use` are allowed at the top level
- Functions defined inside a hook body are not flagged
- Non-function constants (strings, numbers, arrays, objects) are not flagged

## When Not To Use It

This rule should be scoped to hook files using the ESLint `files` glob:

```js
{
  files: ["**/*.hook.ts", "**/*.hooks.ts"],
  rules: {
    "nextfriday/no-helper-function-in-hook": "error",
  },
}
```

## Related Rules

- [enforce-hook-naming](./ENFORCE_HOOK_NAMING.md) — enforces the `use` prefix on all functions in hook files
