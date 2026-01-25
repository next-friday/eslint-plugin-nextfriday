# no-inline-nested-object

Require nested objects and arrays to span multiple lines.

## Rule Details

This rule enforces that when an object property's value is another object or array, it should span multiple lines rather than being written inline. This improves readability and makes diffs cleaner when properties are added or removed.

### Examples

#### Incorrect

```ts
const config = {
  database: { host: "localhost", port: 5432, name: "myapp" },
};
```

```ts
const routes = {
  api: { users: "/api/users", posts: "/api/posts" },
  auth: { login: "/auth/login", logout: "/auth/logout" },
};
```

```ts
const validationRules = {
  required: ["name", "email", "password"],
};
```

#### Correct

```ts
const config = {
  database: {
    host: "localhost",
    port: 5432,
    name: "myapp",
  },
};
```

```ts
const routes = {
  api: {
    users: "/api/users",
    posts: "/api/posts",
  },
  auth: {
    login: "/auth/login",
    logout: "/auth/logout",
  },
};
```

```ts
const validationRules = {
  required: ["name", "email", "password"],
};
```

Empty nested objects and arrays are allowed inline:

```ts
const initialState = {
  data: {},
  errors: [],
};
```

## When Not To Use It

If you prefer compact inline nested objects for simple cases, or if your team has different formatting preferences.

## Fixable

This rule is auto-fixable. Running ESLint with the `--fix` flag will automatically expand inline nested objects and arrays to multiple lines.
