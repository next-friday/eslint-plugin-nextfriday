# Code Style

## Function Declarations Over Arrow Functions

In `.ts` files, use function declarations instead of arrow function expressions for top-level functions.

```ts
// Bad (in .ts files)
const getUser = (id: string): User => {
  return db.find(id);
};

// Good
function getUser(id: string): User {
  return db.find(id);
}
```

## Destructuring Parameters

Functions with multiple parameters should use destructured object parameters.

```ts
// Bad
function createUser(name: string, age: number, email: string): User {
  return { name, age, email };
}

// Good
function createUser({ name, age, email }: CreateUserParams): User {
  return { name, age, email };
}
```

## No Inline Exports

Declare first, then export separately.

```ts
// Bad
export default function getUser() {
  /* ... */
}
export function formatDate() {
  /* ... */
}

// Good
function getUser() {
  /* ... */
}
function formatDate() {
  /* ... */
}

export default getUser;
export { formatDate };
```

## Explicit Return Types

Functions must have explicit return type annotations.

```ts
// Bad
function getUser(id: string) {
  return db.find(id);
}

// Good
function getUser(id: string): User {
  return db.find(id);
}
```

## No Complex Inline Returns

Extract complex expressions to a const before returning.

```ts
// Bad
function getFullName(user: User): string {
  return `${user.firstName} ${user.lastName}`.trim().toLowerCase();
}

// Good
function getFullName(user: User): string {
  const fullName = `${user.firstName} ${user.lastName}`.trim().toLowerCase();

  return fullName;
}
```

## No Logic in Parameters

Don't embed logic, conditions, or computations in function call arguments. Extract to a variable.

```ts
// Bad
fetchUser(isAdmin ? adminId : userId);
setItems(items.filter((item) => item.isActive));

// Good
const targetId = isAdmin ? adminId : userId;
fetchUser(targetId);

const activeItems = items.filter((item) => item.isActive);
setItems(activeItems);
```

## Guard Clauses

Use early returns instead of deeply nested if/else blocks.

```ts
// Bad
function processUser(user: User): string {
  if (user) {
    if (user.isActive) {
      if (user.hasPermission) {
        return user.name;
      }
    }
  }
  return "unknown";
}

// Good
function processUser(user: User): string {
  if (!user) {
    return "unknown";
  }

  if (!user.isActive) {
    return "unknown";
  }

  if (!user.hasPermission) {
    return "unknown";
  }

  return user.name;
}
```

## No Nested Ternaries

```ts
// Bad
const label = isAdmin ? "Admin" : isMod ? "Moderator" : "User";

// Good
function getLabel(): string {
  if (isAdmin) {
    return "Admin";
  }

  if (isMod) {
    return "Moderator";
  }

  return "User";
}
```

## Async/Await Over .then()

```ts
// Bad
function getUser(): Promise<User> {
  return fetch("/api/user")
    .then((res) => res.json())
    .then((data) => data.user);
}

// Good
async function getUser(): Promise<User> {
  const res = await fetch("/api/user");
  const data = await res.json();

  return data.user;
}
```

## No Direct Date

Don't use `new Date()` or `Date.now()` directly. Use a date utility library.

## No Environment Variable Fallbacks

```ts
// Bad
const apiUrl = process.env.API_URL || "http://localhost:3000";
const apiUrl = process.env.API_URL ?? "http://localhost:3000";

// Good
const apiUrl = process.env.API_URL;
```

## No Emoji in Source Code

Don't use emoji characters in string literals, comments, or identifiers.
