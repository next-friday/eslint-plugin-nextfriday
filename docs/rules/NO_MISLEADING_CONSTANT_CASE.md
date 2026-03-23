# no-misleading-constant-case

Disallow SCREAMING_SNAKE_CASE for non-constant or non-static values.

## Rule Details

SCREAMING_SNAKE_CASE is reserved for global static constants. This rule flags it when used incorrectly:

- **Mutable bindings**: `let` or `var` with SCREAMING_SNAKE_CASE
- **Dynamic values**: `const` with function calls, await, dynamic templates, objects with dynamic values
- **Local scope**: SCREAMING_SNAKE_CASE inside functions, even for static values

### Why?

SCREAMING_SNAKE_CASE signals a compile-time constant at the module level. Using it for local variables or dynamic values is misleading. Local constants should use camelCase regardless of whether the value is static.

## Examples

### Incorrect

```ts
// Mutable bindings
let API_URL = "https://api.example.com";
var MAX_COUNT = 10;

// Dynamic values at global scope
const API_URL = getUrl();
const USER_ID = await fetchId();
const PATHNAME = `/news/${slug}`;
const CONFIG = { key: getValue() };

// SCREAMING_SNAKE_CASE in local scope (even static values)
function foo() {
  const MAX_RETRY = 3;
  const TOTAL_COUNT = items.length;
}

const MyComponent = () => {
  const ACTIVE_ITEMS = ITEMS.filter((i) => i.active);
};
```

### Correct

```ts
// Global static constants use SCREAMING_SNAKE_CASE
const API_URL = "https://api.example.com";
const MAX_COUNT = 10;
const ITEMS = [1, 2, 3];
const CONFIG = { key: "value" };
const VARIANTS = ["a", "b"] as const;

// Dynamic values use camelCase
const apiUrl = getUrl();
const userId = await fetchId();
const pathname = `/news/${slug}`;

// Local scope uses camelCase
function foo() {
  const maxRetry = 3;
  const totalCount = items.length;
}

// Mutable bindings use camelCase
let count = 10;
var name = "foo";
```

## When Not To Use It

If your project does not follow the convention that SCREAMING_SNAKE_CASE is reserved for global static constants.

## Related Rules

- [enforce-constant-case](ENFORCE_CONSTANT_CASE.md) - The complementary rule that enforces SCREAMING_SNAKE_CASE for global static constants
- [enforce-camel-case](ENFORCE_CAMEL_CASE.md) - Enforces camelCase for variables and functions
