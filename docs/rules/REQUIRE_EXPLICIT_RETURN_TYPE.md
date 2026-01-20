# require-explicit-return-type

Require explicit return types on functions for better code documentation and type safety.

## Rule Details

This rule enforces that all functions have explicit return type annotations. Explicit return types serve as documentation, help catch bugs early, and make the codebase more maintainable.

**Incorrect** code for this rule:

```typescript
function getName() {
  return "John Doe";
}

const getAge = () => {
  return 25;
};

function processUser() {
  console.log("Processing user");
}

const calculateTotal = (items: Item[]) => {
  return items.reduce((sum, item) => sum + item.price, 0);
};

async function fetchData() {
  return await api.get("/data");
}

export function validateEmail(email: string) {
  return email.includes("@");
}
```

**Correct** code for this rule:

```typescript
function getName(): string {
  return "John Doe";
}

const getAge = (): number => {
  return 25;
};

function processUser(): void {
  console.log("Processing user");
}

const calculateTotal = (items: Item[]): number => {
  return items.reduce((sum, item) => sum + item.price, 0);
};

async function fetchData(): Promise<Data> {
  return await api.get("/data");
}

export function validateEmail(email: string): boolean {
  return email.includes("@");
}
```

## Exceptions

This rule does NOT require return types for:

### Callback Functions

```typescript
// All of these are allowed without return types
items.map((item) => item.name);
items.filter((item) => item.active);
items.forEach((item) => console.log(item));
setTimeout(() => console.log("done"), 1000);
promise.then((result) => result.data);
```

### Object Properties

```typescript
const handler = {
  onClick: () => console.log("clicked"),
};
```

### Array Elements

```typescript
const callbacks = [() => 1, () => 2];
```

### React Components (PascalCase)

```typescript
// React components don't need explicit return types
const MyComponent = () => <div>Hello</div>;

function UserProfile() {
  return <div>User</div>;
}

const Button = () => {
  return <button>Click</button>;
};
```

## Benefits

- **Self-documenting code**: Return types serve as documentation for function contracts
- **Early error detection**: Type mismatches are caught at compile time
- **Better IDE support**: Explicit types improve autocomplete and refactoring
- **API clarity**: Public functions have clear type signatures
- **Maintainability**: Easier to understand function behavior at a glance

## When Not To Use

- When you prefer TypeScript's type inference for all functions
- In rapid prototyping where explicit types slow down development
- When the inferred type is exactly what you want

## Configuration

This rule has no configuration options.

## Related Rules

- [@typescript-eslint/explicit-function-return-type](https://typescript-eslint.io/rules/explicit-function-return-type/) - Similar rule from typescript-eslint
- [@typescript-eslint/explicit-module-boundary-types](https://typescript-eslint.io/rules/explicit-module-boundary-types/) - Requires explicit types on exported functions
