# enforce-hook-naming

Enforce `use` prefix for functions in custom hook files (`*.hook.ts`, `*.hooks.ts`).

## Rule Details

This rule ensures that all exported functions in custom hook files follow React's hook naming convention by starting with `use`.

### Why?

- **React Convention**: React requires hooks to start with `use` for proper hook rules enforcement
- **Consistency**: Standardizes naming across all hook files
- **Linting**: Enables React's Rules of Hooks ESLint plugin to work correctly

## Examples

### ❌ Incorrect

```typescript
// search-params.hook.ts
export function searchParamsHandler() {}
export default handleSearch;

// auth.hook.ts
export const authManager = () => {};
export default function customHook() {}
```

### ✅ Correct

```typescript
// search-params.hook.ts
export function useSearchParamsHandler() {}
export default useSearchParamsHandler;

// auth.hook.ts
export const useAuthManager = () => {};
export default function useCustomHook() {}
```

## When Not To Use It

- If your project uses a different naming convention for hook files
- If you don't use the `*.hook.ts` or `*.hooks.ts` file naming pattern

## Applies To

This rule only applies to files matching:

- `*.hook.ts`
- `*.hooks.ts`
