# enforce-property-case

Enforce camelCase for unquoted object property keys.

## Rule Details

This rule bans snake_case and SCREAMING_SNAKE_CASE for unquoted object property keys. Quoted keys (string literals) are allowed for API boundaries where external systems require different conventions.

### Why?

Object properties should follow the same camelCase convention as variables. When an external API requires snake_case keys, wrapping them in quotes makes it explicit that the naming is intentional and driven by an external contract.

## Examples

### Incorrect

```ts
const userPayload = {
  first_name: "John",
  last_name: "Doe",
};

const item = {
  ITEM_ID: 1,
};
```

### Correct

```ts
// camelCase properties
const userPayload = {
  firstName: "John",
  lastName: "Doe",
};

// Quoted keys for API boundaries
const apiPayload = {
  first_name: "John",
  last_name: "Doe",
};

// as const objects are exempt (enum-like pattern)
const STATUS_MAP = {
  ACTIVE: "active",
  INACTIVE: "inactive",
} as const;
```

## Exceptions

- Quoted property keys (`"first_name"`) are always allowed
- Computed property keys (`[key]`) are not checked
- Properties inside `as const` objects and arrays are exempt

## When Not To Use It

If your project frequently uses snake_case or SCREAMING_SNAKE_CASE for object properties without quoting.

## Related Rules

- [enforce-camel-case](ENFORCE_CAMEL_CASE.md) - Enforces camelCase for variables and functions
- [enforce-constant-case](ENFORCE_CONSTANT_CASE.md) - Enforces SCREAMING_SNAKE_CASE for global constants
