# enforce-constant-case

Enforce SCREAMING_SNAKE_CASE for constant primitive values.

## Rule Details

This rule ensures that `const` declarations with primitive values (strings, numbers, booleans, template literals) use SCREAMING_SNAKE_CASE naming convention.

### Why?

- **Clarity**: SCREAMING_SNAKE_CASE clearly indicates a value is a constant that shouldn't change
- **Convention**: Follows common JavaScript/TypeScript naming patterns for constants
- **Readability**: Makes it easy to distinguish constants from regular variables

## Examples

### ❌ Incorrect

```typescript
const defaultCover = "/images/default.jpg";
const pageLimit = 10;
const isEnabled = true;
const apiBaseUrl = "https://api.example.com";
const template = `hello world`;
```

### ✅ Correct

```typescript
const DEFAULT_COVER = "/images/default.jpg";
const PAGE_LIMIT = 10;
const IS_ENABLED = true;
const API_BASE_URL = "https://api.example.com";
const TEMPLATE = `hello world`;

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

## Notes

- Only applies to `const` declarations
- Only applies to primitive values: strings, numbers, booleans, template literals
- Objects, arrays, and functions are not checked (can use camelCase/PascalCase)
- `let` and `var` declarations are not checked
