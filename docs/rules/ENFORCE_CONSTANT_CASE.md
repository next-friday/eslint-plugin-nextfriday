# enforce-constant-case

Enforce SCREAMING_SNAKE_CASE for constant primitive values.

## Rule Details

This rule ensures that `const` declarations with static primitive values (strings, numbers, booleans, static template literals) use SCREAMING_SNAKE_CASE naming convention. Template literals with expressions (e.g., `` `${variable}` ``) are considered dynamic and are not checked. Objects, arrays, and functions are not checked. Only `const` declarations are checked; `let` and `var` are ignored.

## Examples

### Incorrect

```ts
const defaultCover = "/images/default.jpg";
const pageLimit = 10;
const apiBaseUrl = "https://api.example.com";
const template = `hello world`;
```

### Correct

```ts
const DEFAULT_COVER = "/images/default.jpg";
const PAGE_LIMIT = 10;
const API_BASE_URL = "https://api.example.com";
const TEMPLATE = `hello world`;

// Booleans with standard prefixes (is, has, should, can, etc.) are exempt
const isEnabled = true;
const hasAccess = false;
const shouldRender = true;

// Template literals with expressions are dynamic, camelCase is fine
const pendingHref = `/branch/${branch.branchNumber}`;
const greeting = `Hello, ${user.name}!`;

// Objects, arrays, and functions can use camelCase
const config = { key: "value" };
const items = [1, 2, 3];
const handleClick = () => {};

// Let and var declarations are not checked
let defaultCover = "/images/default.jpg";
var pageLimit = 10;
```

## When Not To Use It

- If your project uses different naming conventions for constants
- If you prefer camelCase for all variable declarations
