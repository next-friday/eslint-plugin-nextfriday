# enforce-constant-case

Enforce SCREAMING_SNAKE_CASE for global constant static values.

## Rule Details

This rule ensures that global-scope `const` declarations with static values use SCREAMING_SNAKE_CASE naming convention. Static values include: string/number/boolean literals, RegExp, static template literals, `as const` assertions, and objects/arrays containing only literal values.

Only global scope (top-level of a file) is checked. Local scope constants inside functions are not checked by this rule.

## Examples

### Incorrect

```ts
const defaultCover = "/images/default.jpg";
const pageLimit = 10;
const apiBaseUrl = "https://api.example.com";
const template = `hello world`;
const phoneRegex = /^[0-9]{10}$/;
const default_theme = "dark";
export const categories = [{ id: "1" }] as const;
```

### Correct

```ts
const DEFAULT_COVER = "/images/default.jpg";
const PAGE_LIMIT = 10;
const API_BASE_URL = "https://api.example.com";
const TEMPLATE = `hello world`;
const PHONE_REGEX = /^[0-9]{10}$/;
const DEFAULT_THEME = "dark";
export const CATEGORIES = [{ id: "1" }] as const;

const SKELETON_ITEMS = [1, 2, 3, 4, 5];
const MAP_STYLE = { height: "320px", width: "100%" };
const STATUS_MAP = { ACTIVE: "active" } as const;

// Booleans with standard prefixes (is, has, should, etc.) are exempt
const isProduction = true;
const hasAccess = false;

// Template literals with expressions are dynamic, camelCase is fine
const pendingHref = `/branch/${branch.branchNumber}`;

// Functions and components are not checked
const handleClick = () => {};
const MyComponent = () => {};

// Local scope is not checked
function foo() {
  const maxRetry = 3;
}
```

## When Not To Use It

- If your project uses different naming conventions for constants
- If you prefer camelCase for all variable declarations

## Related Rules

- [no-misleading-constant-case](NO_MISLEADING_CONSTANT_CASE.md) - Disallows SCREAMING_SNAKE_CASE in local scope and for dynamic values
- [enforce-camel-case](ENFORCE_CAMEL_CASE.md) - Enforces camelCase for variables and functions
