# no-relative-imports

Disallow relative imports with parent directory traversal (`../`). Use absolute imports instead for better maintainability and easier refactoring.

## Rule Details

This rule flags imports that use `../` to traverse parent directories. Sibling imports (`./`) are allowed.

### Why?

- **Easier refactoring**: Moving files doesn't require updating import paths throughout the codebase
- **Better readability**: Absolute paths clearly show where modules come from
- **Consistent imports**: All imports follow the same pattern regardless of file location

## Examples

### ❌ Incorrect

```typescript
import { Button } from "../../../components/base/button";
import { Header } from "../components/Header";
import { utils } from "../utils";
import type { Props } from "../types";
export { foo } from "../shared";
```

### ✅ Correct

```typescript
import { Button } from "src/components/base/button";
import { Header } from "@/components/Header";
import { mapper } from "./article.mapper"; // sibling imports are OK
import React from "react"; // package imports are OK
export { foo } from "./local";
```

## When Not To Use It

- If your project doesn't have path aliases configured
- If you prefer relative imports for co-located files

## Related Rules

- [import/no-relative-parent-imports](https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-relative-parent-imports.md)
