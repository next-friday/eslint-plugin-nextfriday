# enforce-constant-case

Enforce SCREAMING_SNAKE_CASE for global constant static values.

## Rule Details

This rule ensures that global-scope `const` declarations with static values use SCREAMING_SNAKE_CASE naming convention. Static values include: string/number/boolean literals, RegExp, static template literals, `as const` assertions, and objects/arrays containing only literal values.

Only global scope (top-level of a file) is checked. Local scope constants inside functions are not checked by this rule.

**Config files are exempt.** Files matching `*.config.{ts,mjs,cjs,js}`, `*.rc.*`, `*.setup.*`, `*.spec.*`, `*.test.*`, `.eslintrc*`, `.babelrc*`, and `.prettierrc*` skip this rule entirely. This avoids conflicts with framework conventions that require specific identifier names — e.g. Next.js expects `nextConfig` (not `NEXT_CONFIG`) in `next.config.ts`, Vite expects `config`, Tailwind expects `config`, etc.

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

## Configuration

This rule has no options — only severity is configurable (`"error"`, `"warn"`, `"off"`). It pairs with [`no-misleading-constant-case`](./NO_MISLEADING_CONSTANT_CASE.md) so that static globals use `SCREAMING_SNAKE_CASE` while local scopes and dynamic values keep `camelCase`.

### Install

```bash
pnpm add -D eslint-plugin-nextfriday eslint
# npm install --save-dev eslint-plugin-nextfriday eslint
# yarn add --dev eslint-plugin-nextfriday eslint
```

### Enable just this rule

Use this when you want the rule but not the rest of the preset (e.g., adopting one rule at a time during a migration). The `plugins` field registers the plugin under the `nextfriday` namespace; the `rules` field turns on the rule by name:

```js
import nextfriday from "eslint-plugin-nextfriday";

export default [
  {
    plugins: { nextfriday },
    rules: {
      "nextfriday/enforce-constant-case": "error",
    },
  },
];
```

### Enable with related rules

Constants, locals, and dynamic values each need a different naming convention. Enable the trio together so violations from any direction surface:

```js
import nextfriday from "eslint-plugin-nextfriday";

export default [
  {
    plugins: { nextfriday },
    rules: {
      "nextfriday/enforce-constant-case": "error",
      "nextfriday/no-misleading-constant-case": "error",
      "nextfriday/enforce-camel-case": "error",
    },
  },
];
```

### Enable via a preset

Every preset includes this rule at the preset's severity (`warn` or `error`). This is the simplest setup and the recommended one for most projects:

```js
import nextfriday from "eslint-plugin-nextfriday";

export default [nextfriday.configs["base/recommended"]];
```

### Scope to a directory

If you're migrating an existing codebase, scope the rule to a clean directory first and leave the rest of the project on `"warn"` until you've fixed the violations there. ESLint 9+ flat config layers configs in array order; the later object's severity wins for any file matching its `files` glob:

```js
import nextfriday from "eslint-plugin-nextfriday";

export default [
  nextfriday.configs.base,

  {
    files: ["src/config/**/*.ts", "src/lib/**/*.ts"],
    rules: {
      "nextfriday/enforce-constant-case": "error",
    },
  },
];
```

### Severity-only — no rule options

Each rule in this plugin uses `schema: []` and `defaultOptions: []` (no options). The flat-config value is **only** the severity string — `"error"`, `"warn"`, or `"off"`. The legacy `["error", { ... }]` array form is not accepted because there are no options to pass.

```js
// Correct
"nextfriday/enforce-constant-case": "error"

// Won't apply — there are no options to override
"nextfriday/enforce-constant-case": ["error", { allowCamelCase: true }]
```

This plugin only supports ESLint 9+ flat config — legacy `.eslintrc` is not supported. Projects on ESLint 8 or below cannot consume it without upgrading.

## When Not To Use It

- If your project uses different naming conventions for constants
- If you prefer camelCase for all variable declarations

## Related Rules

- [no-misleading-constant-case](NO_MISLEADING_CONSTANT_CASE.md) - Disallows SCREAMING_SNAKE_CASE in local scope and for dynamic values
- [enforce-camel-case](ENFORCE_CAMEL_CASE.md) - Enforces camelCase for variables and functions
