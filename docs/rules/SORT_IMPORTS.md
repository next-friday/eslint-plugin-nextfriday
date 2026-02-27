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
2. **Node.js builtins** — `node:` prefix or known builtin names (e.g., `import fs from "node:fs"`)
3. **External packages** — scoped or plain package names (e.g., `import React from "react"`)
4. **Internal aliases** — paths starting with `@/`, `~/`, or `#` (e.g., `import { utils } from "@/lib/utils"`)
5. **Relative imports** — paths starting with `.` (e.g., `import { foo } from "../foo"`)

Type-only imports (`import type`) are skipped and do not affect ordering.

Non-contiguous imports (separated by other statements) are checked independently.

## Examples

### ❌ Incorrect

```ts
// Bad: Relative before external
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

### ✅ Correct

```ts
// Good: All 5 groups in correct order
import "./setup";
import fs from "node:fs";
import React from "react";
import { utils } from "@/lib/utils";
import { foo } from "../foo";
```

```ts
// Good: Type imports can appear anywhere
import type { FC } from "react";
import { foo } from "../foo";
import React from "react";
```

```ts
// Good: Non-contiguous imports are independent
import React from "react";

const x = 1;

import { foo } from "../foo";
```

## When Not To Use It

If you use a different import sorting tool (e.g., `eslint-plugin-simple-import-sort`) or prefer a different group ordering, you can disable this rule.
