# nextjs-require-public-env

Require `NEXT_PUBLIC_` prefix for environment variables in client components.

## Rule Details

This rule ensures that environment variables accessed in Next.js client components (files with `"use client"` directive) use the `NEXT_PUBLIC_` prefix. In Next.js, only environment variables prefixed with `NEXT_PUBLIC_` are exposed to the browser. Only files with `"use client"` directive are checked. `NODE_ENV` is always allowed.

## Examples

### Incorrect

```tsx
"use client";

// These will be undefined at runtime!
const url = process.env.API_URL;
const secret = process.env.DATABASE_SECRET;
const key = process.env.PRIVATE_API_KEY;
```

### Correct

```tsx
"use client";

// Properly prefixed for client-side access
const url = process.env.NEXT_PUBLIC_API_URL;
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

// NODE_ENV is always available
const isDev = process.env.NODE_ENV === "development";
```

```tsx
// Server component (no "use client") - any env var is allowed
const dbUrl = process.env.DATABASE_URL;
const secret = process.env.API_SECRET;
```

## When Not To Use It

- If you're not using Next.js
- If you have a custom build setup that exposes env vars differently
