# no-inline-type-import

Disallow inline `type` markers on import specifiers. Use `import type` or split into a separate type-only import statement.

> This rule is auto-fixable using `--fix`.

## Rule Details

This rule forbids the inline-`type` form `import { type Foo }` and the mixed form `import { value, type Foo }`. Type-only imports must be expressed at the statement level with `import type { ... }`. When value and type imports come from the same module, the rule splits them into two separate statements.

### Why?

Statement-level `import type` makes the runtime cost of every import unambiguous at a glance, simplifies tooling that distinguishes erased imports from real ones (bundlers, type-only emit, transpilers), and removes the need for readers to scan each specifier for an inline keyword.

## Examples

### Incorrect

```ts
import { type foo } from "bar";

import { baz, type moo } from "mee";

import Default, { value, type Foo } from "src";
```

### Correct

```ts
import type { foo } from "bar";

import { baz } from "mee";
import type { moo } from "mee";

import Default, { value } from "src";
import type { Foo } from "src";
```

## Auto-fixing

The rule's `--fix` produces these transformations:

```ts
// Single inline type → hoisted
import { type foo } from "bar";
// becomes
import type { foo } from "bar";

// All inline types → hoisted
import { type foo, type bar } from "src";
// becomes
import type { foo, bar } from "src";

// Mixed value + inline type → split
import { baz, type moo } from "mee";
// becomes
import { baz } from "mee";
import type { moo } from "mee";

// Default + inline type → split
import Default, { type Foo } from "src";
// becomes
import Default from "src";
import type { Foo } from "src";

// Aliases are preserved
import { foo as bar, type baz as qux } from "src";
// becomes
import { foo as bar } from "src";
import type { baz as qux } from "src";

// Redundant inline markers inside `import type` are stripped
import type { foo, type bar } from "src";
// becomes
import type { foo, bar } from "src";
```

After auto-fix, other import-ordering rules (such as `sort-imports`) may re-order the resulting statements according to their own grouping rules.

## When Not To Use It

If your codebase intentionally uses the inline `type` form to keep value and type imports adjacent in a single statement, disable this rule.

## Related Rules

- [prefer-import-type](./PREFER_IMPORT_TYPE.md) - Hoists imports that are used only as types to `import type`. Complements this rule for usage-based detection.
