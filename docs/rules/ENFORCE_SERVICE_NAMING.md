# enforce-service-naming

Enforce `fetch` prefix for async functions in `*.service.ts` files instead of `get` or `load`.

## Rule Details

This rule ensures consistent naming conventions for service layer functions. In service files, async data-fetching functions should use the `fetch` prefix to clearly indicate they perform network/API calls.

### Why?

- **Clarity**: `fetch` clearly indicates a network operation, while `get` is ambiguous (could be synchronous accessor)
- **Consistency**: Standardizes naming across all service files
- **Semantics**: `fetch` aligns with the Fetch API and implies async data retrieval

## Examples

### ❌ Incorrect

```typescript
// article.service.ts
export async function getArticles() {}
export async function loadFaq() {}
export async function getUserById() {}
export const getUsers = async () => {};
```

### ✅ Correct

```typescript
// article.service.ts
export async function fetchArticles() {}
export async function fetchFaqList() {}
export async function fetchUserById() {}
export const fetchUsers = async () => {};

// Non-async functions can use any prefix
export function getArticleById(id: string) {}

// Other prefixes are allowed
export async function createUser() {}
export async function updateArticle() {}
export async function deleteComment() {}
```

## When Not To Use It

- If your project uses different naming conventions for service functions
- If you prefer `get`/`load` prefixes for data-fetching operations

## Applies To

This rule only applies to files matching `*.service.ts`.
