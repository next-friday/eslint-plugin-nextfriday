---
name: eslint-plugin-nextfriday
description: Code patterns for projects using eslint-plugin-nextfriday (52 rules covering naming, style, types, JSX, imports, and formatting)
user-invocable: false
---

# eslint-plugin-nextfriday Patterns

This project enforces 51 lint rules via `eslint-plugin-nextfriday`. Follow the patterns below when writing TypeScript and React code.

Use [complete-examples.md](./complete-examples.md) as file templates. Refer to the topic docs for details on specific patterns.

## Naming

Booleans start with a prefix. Constants use SCREAMING_SNAKE_CASE. Use descriptive names.

```ts
const isActive = true;
const hasPermission = checkPermission();
const MAX_RETRIES = 3;
const API_BASE_URL = "https://api.example.com";
const userName = getUser(); // not "u" or "temp"
```

Prefixes: `is`, `has`, `should`, `can`, `did`, `will`, `was`, `are`, `does`, `had`

Files: `.ts` → `kebab-case.ts`, `.tsx` → `PascalCase.tsx`, `.md` → `UPPER_SNAKE_CASE.md`

See [naming-conventions.md](./naming-conventions.md) for hook/service naming and props suffix rules.

## Functions

Function declarations in `.ts` files. Explicit return types. Destructured params for 2+ arguments.

```ts
async function fetchUser({ userId }: FetchUserParams): Promise<User> {
  const response = await fetch(url);
  const data = await response.json();

  return data;
}
```

Extract complex expressions before returning or passing to functions:

```ts
// extract, then return
const fullName = `${first} ${last}`.trim();

return fullName;

// extract, then pass
const targetId = isAdmin ? adminId : userId;
fetchUser(targetId);
```

See [code-style.md](./code-style.md) for guard clauses, async/await, and export patterns.

## Exports

Declare first, export at the bottom of the file:

```ts
function getUser(): User {
  /* ... */
}

export default getUser;
```

## Types

Required properties first (A-Z), then optional properties (A-Z). Inline literal unions. Extract nested objects.

```ts
interface UserCardProps {
  email: string;
  name: string;
  avatar?: string;
  bio?: string;
}

interface SettingsProps {
  theme: "light" | "dark"; // inline literal union, not a type alias
  notifications: Notification; // extracted, not { title: string; ... }
}
```

Declare consumer types before their dependencies (top-down reading order).

See [type-patterns.md](./type-patterns.md) for Readonly props and named param types.

## React Components

Props use `Readonly<>` wrapper. Destructure inside the body.

```tsx
function UserCard(props: Readonly<UserCardProps>): ReactElement {
  const { avatar, email, name } = props;

  const displayName = `${name} (${email})`;

  return (
    <div>
      <img alt={name} src={avatar} />
      <p>{displayName}</p>
    </div>
  );
}
```

See [jsx-patterns.md](./jsx-patterns.md) for prop sorting, Suspense, and callback extraction.

## Imports

Use `import type` for types. Absolute `@/` paths. Direct React imports.

```ts
import { useCallback, useState } from "react";

import type { ReactElement } from "react";

import type { User } from "@/types/user";
```

Order: external packages → internal `@/` → type imports. Each group sorted A-Z.

See [import-patterns.md](./import-patterns.md) for sorted exports and destructuring.

## Formatting

```ts
// blank line after multi-line block
if (!isValid) {
  return null;
}

// blank line before return
const result = calculate();

return result;
```

JSX: blank line between multi-line siblings, no blank line between single-line siblings.

See [formatting.md](./formatting.md) for curly brace and nested object rules.
