# Import & Export Patterns

## Absolute Imports

Don't use relative imports with `../`. Use absolute path aliases.

```ts
// Bad
import { formatDate } from "../../utils/format-date";
import { User } from "../types/user";

// Good
import { formatDate } from "@/utils/format-date";
import { User } from "@/types/user";
```

## Import Type

Use `import type` for type-only imports.

```ts
// Bad
import { User } from "@/types/user";
import { ReactNode } from "react";

// Good
import type { User } from "@/types/user";
import type { ReactNode } from "react";
```

## Direct React Imports

Import React types directly instead of using the `React.` namespace.

```ts
// Bad
import React from "react";
const MyComponent = (props: React.PropsWithChildren) => {
  /* ... */
};

// Good
import type { PropsWithChildren } from "react";
const MyComponent = (props: PropsWithChildren) => {
  /* ... */
};
```

## Sorted Imports

Organize imports into groups in this order:

1. External packages
2. Internal absolute imports
3. Type imports

Each group sorted alphabetically.

## Sorted Exports

Organize exports consistently. Named exports grouped and sorted.

## Sorted Destructuring

Destructured properties sorted alphabetically, with properties that have default values first.

```ts
// Bad
const { zebra, apple, mango = "default" } = config;

// Good
const { mango = "default", apple, zebra } = config;
```
