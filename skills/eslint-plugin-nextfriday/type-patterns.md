# Type Patterns

## Named Types for Function Parameters

Use named interfaces/types instead of inline object types for function parameters.

```ts
// Bad
function createUser(params: { name: string; age: number }): User {
  return { ...params };
}

// Good
interface CreateUserParams {
  name: string;
  age: number;
}

function createUser(params: CreateUserParams): User {
  return { ...params };
}
```

## Interface Over Inline Types for Component Props

React component props must use a named interface or type, not inline object types.

```tsx
// Bad
const UserCard = (props: { name: string; age: number }) => <div>{props.name}</div>;

// Good
interface UserCardProps {
  name: string;
  age: number;
}

const UserCard = (props: UserCardProps) => <div>{props.name}</div>;
```

## Inline Literal Unions

Don't create type aliases for unions of literals. Inline them in interface properties for better IDE hover info.

```ts
// Bad - hover shows "Status" instead of the actual values
type Status = "loading" | "success" | "error";

interface Props {
  status: Status;
}

// Good - hover shows "loading" | "success" | "error"
interface Props {
  status: "loading" | "success" | "error";
}
```

## No Nested Object Types in Interfaces

Extract nested object types into separate named interfaces.

```ts
// Bad
interface Props {
  user: {
    name: string;
    age: number;
  };
}

// Good
interface UserProps {
  name: string;
  age: number;
}

interface Props {
  user: UserProps;
}
```

## Top-Down Type Declaration Order

Declare consumer types before their dependencies. Main type first, supporting types below.

```ts
// Bad - dependency before consumer
interface Address {
  street: string;
  city: string;
}

interface UserProps {
  address: Address;
}

// Good - consumer first, dependency after
interface UserProps {
  address: Address;
}

interface Address {
  street: string;
  city: string;
}
```

## Sort Type Properties

1. Required properties before optional properties
2. Properties sorted alphabetically within each group

```ts
// Bad
interface UserProps {
  name: string;
  avatar?: string;
  email: string;
  bio?: string;
}

// Good
interface UserProps {
  email: string;
  name: string;
  avatar?: string;
  bio?: string;
}
```

## Readonly Component Props

Wrap React component props with `Readonly<>`.

```tsx
// Bad
interface UserCardProps {
  name: string;
}

function UserCard(props: UserCardProps) {
  /* ... */
}

// Good
interface UserCardProps {
  name: string;
}

function UserCard(props: Readonly<UserCardProps>) {
  /* ... */
}
```
