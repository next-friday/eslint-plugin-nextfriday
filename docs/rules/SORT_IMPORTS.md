# sort-imports

Enforce a consistent ordering of import groups.

This rule is automatically fixable by the [`--fix` CLI option](https://eslint.org/docs/latest/user-guide/command-line-interface#--fix).

## Rule Details

This rule enforces that import statements are grouped and ordered by their source type. It does not enforce alphabetical sorting within groups.

### Why?

1. **Readability**: Grouping imports by source type makes it easy to scan dependencies at a glance
2. **Consistency**: A predictable import order reduces merge conflicts and code review friction
3. **Separation of concerns**: Side effects, platform modules, third-party packages, internal aliases, and relative imports serve different purposes

### Import Group Order

1. **Side-effect imports** — no specifiers (e.g., `import "./setup"`)
2. **Builtin** value → **builtin type**
3. **External** value → **external type**
4. **Internal alias** value → **internal alias type** — paths starting with `@/`, `~/`, or `#`
5. **Parent relative** value → **parent relative type** — paths starting with `../` (any depth)
6. **Relative** value → **relative type** — paths starting with `./`

Within each group, value imports come first, then `import type` for the same group.

Non-contiguous imports (separated by other statements) are checked independently.

## Examples

### Incorrect

```ts
// Bad: type import before value import in same group
import type { Foo } from "some-lib";
import { bar } from "some-lib";
```

```ts
// Bad: relative before external
import { foo } from "../foo";
import React from "react";
```

```ts
// Bad: External before builtin
import React from "react";
import fs from "node:fs";
```

```ts
// Bad: Side-effect after external
import React from "react";
import "./setup";
```

### Correct

```ts
import "./setup";

import fs from "node:fs";

import React from "react";
import type { FC } from "react";

import { utils } from "@/lib/utils";
import type { Utils } from "@/lib/utils";

import { foo } from "../../foo";
import { bar } from "../bar";
import type { Bar } from "../bar";

import { baz } from "./baz";
import type { Baz } from "./baz";
```

```ts
// Good: Non-contiguous imports are independent
import React from "react";

const x = 1;

import { foo } from "../foo";
```

## When Not To Use It

If you use a different import sorting tool (e.g., `eslint-plugin-simple-import-sort`) or prefer a different group ordering, you can disable this rule.
