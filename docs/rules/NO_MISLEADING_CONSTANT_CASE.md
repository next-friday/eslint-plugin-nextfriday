# no-misleading-constant-case

Disallow SCREAMING_SNAKE_CASE for non-constant or non-static values.

## Rule Details

SCREAMING_SNAKE_CASE conventionally signals a compile-time constant with a static, immutable value. Using it for mutable bindings (`let`/`var`) or dynamic values (function calls, objects, arrays, computed expressions) is misleading because the name implies immutability that the value does not have.

### Why?

When reading `const API_URL = getUrl()`, the SCREAMING_SNAKE_CASE name suggests a hardcoded value, but it is actually computed at runtime. This mismatch makes code harder to reason about. Reserving SCREAMING_SNAKE_CASE for true static primitives keeps the convention meaningful.

## Examples

### Incorrect

```ts
// Mutable bindings should not use SCREAMING_SNAKE_CASE
let API_URL = "https://api.example.com";
var MAX_COUNT = 10;

// Dynamic or computed values should use camelCase
const API_URL = getUrl();
const USER_ID = await fetchId();
const PATHNAME = `/news/${slug}`;
const CONFIG = { key: "value" };
const ITEMS = [1, 2, 3];
const RESULT = a + b;
const ACTIVE_USERS = users.filter((u) => u.active);
```

### Correct

```ts
// Static primitive constants use SCREAMING_SNAKE_CASE
const API_URL = "https://api.example.com";
const MAX_COUNT = 10;
const IS_PRODUCTION = true;
const TEMPLATE = `hello world`;

// Dynamic or computed values use camelCase
const apiUrl = getUrl();
const userId = await fetchId();
const pathname = `/news/${slug}`;
const config = { key: "value" };
const items = [1, 2, 3];
const result = a + b;

// Mutable bindings use camelCase
let count = 10;
var name = "foo";
```

## When Not To Use It

If your project does not follow the convention that SCREAMING_SNAKE_CASE is reserved for static primitive constants.

## Related Rules

- [enforce-constant-case](ENFORCE_CONSTANT_CASE.md) - The complementary rule that enforces SCREAMING_SNAKE_CASE for static primitive constants
