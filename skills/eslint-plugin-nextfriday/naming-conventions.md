# Naming Conventions

## Boolean Variables

Boolean variables and parameters must start with one of: `is`, `has`, `should`, `can`, `did`, `will`, `was`, `are`, `does`, `had`.

```ts
// Bad
const active = true;
const visible = false;
const loading = true;

// Good
const isActive = true;
const isVisible = false;
const isLoading = true;
const hasPermission = checkPermission();
const shouldRender = items.length > 0;
const canEdit = user.role === "admin";
```

## Constants

Top-level constant primitive values must use SCREAMING_SNAKE_CASE.

```ts
// Bad
const maxRetries = 3;
const apiUrl = "https://api.example.com";

// Good
const MAX_RETRIES = 3;
const API_URL = "https://api.example.com";
```

## Variable Names

No single-character variables (`d`, `u`, `l`) or lazy identifiers (`xxx`, `asdf`, `qwerty`).

```ts
// Bad
const d = new Date();
const u = getUser();

// Good
const currentDate = new Date();
const user = getUser();
```

## File Naming

| Extension      | Convention       | Example              |
| -------------- | ---------------- | -------------------- |
| `.ts`, `.js`   | kebab-case       | `user-service.ts`    |
| `.tsx`, `.jsx` | PascalCase       | `UserProfile.tsx`    |
| `.md`          | UPPER_SNAKE_CASE | `GETTING_STARTED.md` |

## Hook and Service Files

- Functions in `*.hook.ts` files must start with `use` prefix
- Async functions in `*.service.ts` files must start with `fetch` prefix

```ts
// user.hook.ts
function useUserProfile() {
  /* ... */
}

// user.service.ts
async function fetchUserProfile() {
  /* ... */
}
```

## Props Interfaces

Interfaces and types used for React component props in `.tsx` files must end with `Props`.

```tsx
// Bad
interface UserData {
  name: string;
}
function UserCard(props: UserData) {
  /* ... */
}

// Good
interface UserCardProps {
  name: string;
}
function UserCard(props: UserCardProps) {
  /* ... */
}
```
