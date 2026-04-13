# enforce-service-naming

Ban misleading function name prefixes in `*.service.ts` files.

## Rule Details

This rule flags misleading prefixes on async exported functions in `*.service.ts` files. It does not force a specific prefix — developers choose based on intent.

### Why?

Service functions represent API/network calls. Certain prefixes are misleading in this context:

- `set` implies a local setter, not an API call
- `delete` is a JS reserved word that may conflict
- `do` is vague and conveys no intent
- `handle` is typically for UI event handlers, not service operations

### Banned Prefixes

| Prefix   | Why banned                                | Suggested alternatives    |
| -------- | ----------------------------------------- | ------------------------- |
| `set`    | Implies local setter, not API call        | `update`, `save`, `patch` |
| `delete` | JS reserved word, may conflict            | `remove`, `archive`       |
| `do`     | Vague, no intent                          | `submit`, `process`       |
| `handle` | Vague, typically for event handlers in UI | `create`, `verify`        |

## Examples

### Incorrect

```ts
// profile.service.ts
export async function setProfile(data: ProfileRequest) {}
export async function deleteComment(id: string) {}
export async function doLogin(credentials: LoginRequest) {}
export async function handlePayment(data: PaymentRequest) {}
```

### Correct

```ts
// profile.service.ts
export async function getArticles() {}
export async function fetchArticles() {}
export async function searchArticles(query: string) {}
export async function createOrder(data: OrderRequest) {}
export async function updateProfile(id: string, data: ProfileRequest) {}
export async function removeComment(id: string) {}
export async function verifyEmail(token: string) {}

// Non-async functions can use any prefix
export function setLocalState(value: string) {}

// Non-exported functions are not checked
async function handleInternal() {}
```

## When Not To Use It

If your project does not follow a service layer pattern or has different naming conventions for service functions.
