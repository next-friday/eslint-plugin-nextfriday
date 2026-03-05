# prefer-import-type

Enforce using 'import type' for type-only imports.

This rule is automatically fixable by the [`--fix` CLI option](https://eslint.org/docs/latest/user-guide/command-line-interface#--fix).

## Rule Details

This rule enforces the use of TypeScript's `import type` syntax for imports that are only used for type annotations. This helps with tree-shaking and makes it clear which imports are type-only vs runtime imports.

## Examples

### Incorrect

```ts
import { Component } from "react";
import { TSESTree } from "@typescript-eslint/utils";
import { RuleContext } from "@typescript-eslint/utils";

interface Props {
  component: Component;
  tree: TSESTree.Node;
  context: RuleContext<string, unknown[]>;
}
```

### Correct

```ts
import type { Component } from "react";
import type { TSESTree } from "@typescript-eslint/utils";
import type { RuleContext } from "@typescript-eslint/utils";

interface Props {
  component: Component;
  tree: TSESTree.Node;
  context: RuleContext<string, unknown[]>;
}
```

**Allowed runtime imports:**

```ts
import React from "react";
import { ESLintUtils } from "@typescript-eslint/utils";
import * as utils from "./utils";

// Mixed imports are also supported
import { ESLintUtils, type TSESTree } from "@typescript-eslint/utils";
```

## Auto-fixing

This rule automatically converts regular imports to `import type` when appropriate:

```ts
// Before
import { TSESTree } from "@typescript-eslint/utils";

// After (auto-fixed)
import type { TSESTree } from "@typescript-eslint/utils";
```

## When Not To Use It

- If your project doesn't use TypeScript
- When you prefer to keep all imports as regular imports for consistency
- If you have specific bundling requirements that don't benefit from type-only imports

## Related Rules

- [@typescript-eslint/consistent-type-imports](https://typescript-eslint.io/rules/consistent-type-imports/) - Similar rule from typescript-eslint
