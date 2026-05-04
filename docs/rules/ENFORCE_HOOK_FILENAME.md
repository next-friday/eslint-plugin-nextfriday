# enforce-hook-filename

Enforce that files exporting custom hooks are named `*.hook.ts` or `*.hooks.ts`.

## Rule Details

Any file that exports a custom hook (a function whose name starts with `use` followed by an uppercase letter) must have a `.hook.ts` or `.hooks.ts` suffix. This ensures hook files are consistently discoverable and that `no-helper-function-in-hook` can be reliably scoped to them.

### Why?

Without enforced naming, hooks can silently live inside service files, utility files, or component files — breaking the `files` glob that powers `no-helper-function-in-hook` and making codebases harder to navigate.

## Examples

### Incorrect

```ts
// use-user-data.ts ❌
export function useUserData() {
  return null;
}
```

```ts
// user.service.ts ❌
export const useCurrentUser = () => null;
```

```ts
// UserCard.tsx ❌
export function useUserCard() {
  return null;
}
```

### Correct

```ts
// use-user-data.hook.ts ✅
export function useUserData() {
  return null;
}
```

```ts
// user.hooks.ts ✅
export const useCurrentUser = () => null;
```

Re-exporting from an index file is fine — only the file that defines the hook must follow the naming convention:

```ts
// index.ts ✅
export { useUserData } from "./use-user-data.hook";
```

## What This Rule Checks

- `export function useFoo()` — named function declaration export
- `export const useFoo = () =>` — arrow function export
- `export const useFoo = function()` — function expression export
- `export default function useFoo()` — default function declaration export

A name is treated as a hook only when it starts with `use` followed by an uppercase letter (e.g. `useData`, not `user` or `use`).

## Exceptions

Files already named `*.hook.ts` or `*.hooks.ts` are skipped entirely. Re-exports (`export { useFoo } from "..."`) are not flagged.

## When Not To Use It

Disable per-file if you intentionally co-locate a small hook with its only consumer and do not plan to reuse it.

## Related Rules

- [enforce-hook-naming](./ENFORCE_HOOK_NAMING.md) — enforces the `use` prefix on functions inside hook files
- [no-helper-function-in-hook](./NO_HELPER_FUNCTION_IN_HOOK.md) — disallows non-hook helpers inside hook files
