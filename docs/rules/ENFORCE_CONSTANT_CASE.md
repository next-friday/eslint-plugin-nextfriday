# enforce-constant-case

Enforce SCREAMING_SNAKE_CASE for global magic-number, magic-text, bigint, and RegExp constants.

## Rule Details

This rule ensures that global-scope `const` declarations bound to a **magic literal** value use SCREAMING_SNAKE_CASE. The rule scope is intentionally narrow:

- A magic text constant is a string literal: `const API_URL = "https://api.example.com"`
- A magic number constant is a number literal (including a unary `-`/`+` over a numeric literal): `const PAGE_LIMIT = 10`, `const OFFSET = -1`
- A bigint constant is a bigint literal (including a unary `-`/`+` over a bigint literal): `const BIG_LIMIT = 9007199254740993n`, `const NEGATIVE_BIG = -1n`
- A RegExp constant is a regex literal, or a `new RegExp(...)` call whose arguments are **all** string literals: `const PHONE_REGEX = /^[0-9]+$/`, `const EMAIL_PATTERN = new RegExp("^.+@.+$", "g")`

Anything else is **not** checked: booleans, template literals (static or dynamic), arrays, objects, `as const` assertions, function calls, identifiers, member expressions, JSX, and `new RegExp(dynamicValue)` (where the pattern argument is non-literal). Use whatever name fits the value (`metadata`, `viewport`, `statusMap`, `isEnabled`, `dynamicPattern`, etc.) — the rule will not flag it.

Only global scope (top-level of a file) is checked. Local scope constants inside functions are not checked by this rule.

**Config files are exempt.** Files matching `*.config.{ts,mjs,cjs,js}`, `*.rc.*`, `*.setup.*`, `*.spec.*`, `*.test.*`, `.eslintrc*`, `.babelrc*`, and `.prettierrc*` skip this rule entirely. This avoids conflicts with framework conventions that require specific identifier names — e.g. Next.js expects `nextConfig` (not `NEXT_CONFIG`) in `next.config.ts`, Vite expects `config`, Tailwind expects `config`, etc.

### Why only static literal values?

Reserved framework export names commonly bind to objects (Next.js App Router exports `metadata`, `viewport`, `generateStaticParams`, `dynamic`, `revalidate`, `runtime`, `fetchCache`, `dynamicParams`, `preferredRegion`, `maxDuration`; React Server Components and others have similar patterns). Forcing SCREAMING_SNAKE_CASE on any static-shaped initializer would rename those exports and break framework integration. Restricting the rule to bare number, string, bigint, and statically-constructed RegExp values keeps the convention where it adds value (avoiding magic constants scattered through code) without colliding with framework-owned names or flagging dynamically-constructed patterns.

## Examples

### Incorrect

```ts
const defaultCover = "/images/default.jpg";
const pageLimit = 10;
const apiBaseUrl = "https://api.example.com";
const negativeOne = -1;
const default_theme = "dark";
const phoneRegex = /^[0-9]{10}$/;
const emailPattern = new RegExp("^.+@.+$");
const bigLimit = 9007199254740993n;
```

### Correct

```ts
const DEFAULT_COVER = "/images/default.jpg";
const PAGE_LIMIT = 10;
const API_BASE_URL = "https://api.example.com";
const NEGATIVE_ONE = -1;
const DEFAULT_THEME = "dark";
const PHONE_REGEX = /^[0-9]{10}$/;
const EMAIL_PATTERN = new RegExp("^.+@.+$", "g");
const BIG_LIMIT = 9007199254740993n;

const isProduction = true;
const hasAccess = false;
const featureEnabled = true;

const dynamicPattern = new RegExp(userInput);
const template = `hello world`;
const skeletonItems = [1, 2, 3, 4, 5];
const mapStyle = { height: "320px", width: "100%" };
const statusMap = { ACTIVE: "active" } as const;
const categories = [{ id: "1" }] as const;

export const metadata: Metadata = { title: "404 - Page Not Found" };
export const viewport: Viewport = { themeColor: "#fff" };
export const generateStaticParams = async () => [];

const pendingHref = `/branch/${branch.branchNumber}`;

const handleClick = () => {};
const MyComponent = () => {};

function foo() {
  const maxRetry = 3;
}
```

> Note: Next.js App Router has a few string-valued reserved exports — `dynamic = "force-dynamic"`, `runtime = "edge"`, `fetchCache = "default-cache"`, etc. — and one number-valued one (`revalidate = 60`, `maxDuration = 30`). These remain in scope for this rule because their initializers are bare literals. Disable `nextfriday/enforce-constant-case` for `app/**` and `pages/**` in your own flat config if you use those exports.

## Configuration

This rule has no options — only severity is configurable (`"error"`, `"warn"`, `"off"`). It pairs with [`no-misleading-constant-case`](./NO_MISLEADING_CONSTANT_CASE.md) so that magic-literal globals use `SCREAMING_SNAKE_CASE` while local scopes and dynamic values keep `camelCase`.

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
