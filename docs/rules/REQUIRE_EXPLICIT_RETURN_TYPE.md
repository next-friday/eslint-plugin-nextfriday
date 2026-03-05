# require-explicit-return-type

Require explicit return types on functions for better code documentation and type safety.

## Rule Details

This rule enforces that all functions have explicit return type annotations. Explicit return types serve as documentation, help catch bugs early, and make the codebase more maintainable.

## Examples

### Incorrect

```ts
function getName() {
  return "John Doe";
}

function getAge() {
  return 25;
}

function processUser() {
  console.log("Processing user");
}

function calculateTotal(items: Item[]) {
  return items.reduce((sum, item) => sum + item.price, 0);
}

async function fetchData() {
  return await api.get("/data");
}

function validateEmail(email: string) {
  return email.includes("@");
}
```

### Correct

```ts
function getName(): string {
  return "John Doe";
}

function getAge(): number {
  return 25;
}

function processUser(): void {
  console.log("Processing user");
}

function calculateTotal(items: Item[]): number {
  return items.reduce((sum, item) => sum + item.price, 0);
}

async function fetchData(): Promise<Data> {
  return await api.get("/data");
}

function validateEmail(email: string): boolean {
  return email.includes("@");
}
```

## Exceptions

This rule does NOT require return types for:

### Callback Functions

```ts
// All of these are allowed without return types
items.map((item) => item.name);
items.filter((item) => item.active);
items.forEach((item) => console.log(item));
setTimeout(() => console.log("done"), 1000);
promise.then((result) => result.data);
```

### Object Properties

```ts
const handler = {
  onClick: () => console.log("clicked"),
};
```

### Array Elements

```ts
const callbacks = [() => 1, () => 2];
```

### React Components (PascalCase)

```ts
// React components don't need explicit return types
const MyComponent = () => <div>Hello</div>;

function UserProfile() {
  return <div>User</div>;
}

const Button = () => {
  return <button>Click</button>;
};
```

## When Not To Use It

- When you prefer TypeScript's type inference for all functions
- In rapid prototyping where explicit types slow down development
- When the inferred type is exactly what you want

## Related Rules

- [@typescript-eslint/explicit-function-return-type](https://typescript-eslint.io/rules/explicit-function-return-type/) - Similar rule from typescript-eslint
- [@typescript-eslint/explicit-module-boundary-types](https://typescript-eslint.io/rules/explicit-module-boundary-types/) - Requires explicit types on exported functions
