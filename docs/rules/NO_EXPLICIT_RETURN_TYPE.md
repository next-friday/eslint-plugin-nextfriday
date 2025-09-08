# no-explicit-return-type

Disallow explicit return types on functions.

This rule is automatically fixable by the [`--fix` CLI option](https://eslint.org/docs/latest/user-guide/command-line-interface#--fix).

## Rule Details

This rule encourages relying on TypeScript's type inference instead of explicitly annotating function return types. TypeScript is generally very good at inferring return types, and explicit annotations can add unnecessary verbosity to your code.

**Incorrect** code for this rule:

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
```

**Correct** code for this rule:

```typescript
function getName() {
  return "John Doe"; // TypeScript infers: string
}

const getAge = () => {
  return 25; // TypeScript infers: number
};

function processUser() {
  console.log("Processing user"); // TypeScript infers: void
}

const calculateTotal = (items: Item[]) => {
  return items.reduce((sum, item) => sum + item.price, 0); // TypeScript infers: number
};
```

## Benefits

- **Cleaner code**: Reduces visual clutter
- **Automatic updates**: When implementation changes, return type updates automatically
- **Trust TypeScript**: Leverages TypeScript's excellent type inference
- **Consistency**: Encourages a consistent style across the codebase

## When Not To Use

- When you want to explicitly document the return type for API functions
- For public library functions where return types serve as documentation
- When the inferred type is too broad and you want to narrow it
- In cases where explicit return types improve error messages

## Auto-fixing

This rule automatically removes explicit return type annotations when run with the `--fix` option.

## Related Rules

- No related rules
