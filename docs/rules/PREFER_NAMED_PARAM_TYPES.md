# prefer-named-param-types

Enforce named interfaces or types instead of inline object types for function parameters.

## Rule Details

This rule enforces extracting inline object type annotations for function parameters into named interfaces or type aliases. This promotes better code organization, reusability, and readability across your codebase.

Examples of **incorrect** code for this rule:

```typescript
// Destructured parameter with inline type
const foo = ({ bar, baz }: { bar: string; baz: number }) => {
  console.log(bar, baz);
};

// Regular parameter with inline type
const foo = (params: { bar: string; baz: number }) => {
  const { bar, baz } = params;
  console.log(bar, baz);
};

// Function declaration
function createUser(data: { name: string; email: string; role: "admin" | "user" }) {
  return { ...data, createdAt: Date.now() };
}

// Function expression
const handler = function (data: { id: number; name: string }) {
  return data.id;
};

// Multiple parameters with inline types
const foo = (first: { a: string; b: number }, second: { x: boolean; y: string }) => {
  return { first, second };
};
```

Examples of **correct** code for this rule:

```typescript
// Using interface
interface Params {
  bar: string;
  baz: number;
}

const foo = (params: Params) => {
  const { bar, baz } = params;
  console.log(bar, baz);
};

// Using type alias
type UserData = {
  name: string;
  email: string;
  role: "admin" | "user";
};

const createUser = (data: UserData) => {
  return { ...data, createdAt: Date.now() };
};

// Primitive types are allowed
const foo = (value: string) => {
  return value;
};

const bar = (count: number, enabled: boolean) => {
  return count > 0 && enabled;
};

// Functions with no parameters
const baz = () => {
  return "no params";
};

// Named types with destructuring
interface Config {
  theme: string;
  locale: string;
}

const setup = (config: Config) => {
  const { theme, locale } = config;
  console.log(theme, locale);
};
```

## Why?

### Benefits of named parameter types:

1. **Reusability**: Named types can be reused across multiple functions
2. **Better organization**: Separates type definitions from function logic
3. **Improved readability**: Makes function signatures cleaner and easier to understand
4. **Better IDE support**: Enhanced autocomplete, refactoring, and navigation
5. **Documentation**: Named types serve as clear documentation of function APIs
6. **Extensibility**: Types and interfaces can be extended and composed more easily
7. **Type inference**: Named types can improve TypeScript's type inference in complex scenarios

## Rule Scope

This rule applies to:

- All function types: arrow functions, function expressions, and function declarations
- Function parameters with inline object type literals
- Method definitions with inline object type parameters
- TypeScript method signatures

The rule triggers when:

- A parameter has an inline object type literal (e.g., `{ bar: string; baz: number }`)
- The parameter is destructured with an inline type (e.g., `({ bar, baz }: { bar: string; baz: number })`)

The rule allows:

- Primitive type annotations (string, number, boolean, etc.)
- Named types and interfaces
- Type aliases
- Functions with no parameters
- Array types (e.g., `string[]`)
- Union/intersection types without object literals

## When Not To Use It

This rule should not be used if you:

- Prefer inline types for simple, one-off function parameters
- Are working with very simple functions that don't benefit from type extraction
- Have specific code style requirements that favor inline types
- Are maintaining legacy code with established patterns

## Configuration

This rule is included in the following configurations:

- `nextfriday/base`
- `nextfriday/base/recommended`
- `nextfriday/react`
- `nextfriday/react/recommended`
- `nextfriday/nextjs`
- `nextfriday/nextjs/recommended`

To enable this rule manually:

```json
{
  "rules": {
    "nextfriday/prefer-named-param-types": "error"
  }
}
```

## Relationship to Other Rules

This rule complements but differs from `prefer-interface-over-inline-types`:

- `prefer-interface-over-inline-types`: Focuses on React component props with complexity criteria
- `prefer-named-param-types`: Applies to ALL functions with inline object types, regardless of complexity

Both rules can be used together for comprehensive type organization.

## Compatibility

- TypeScript 3.0+ (interface and type alias declarations)
- ESLint 9+ with flat config
- Works with all function types in JavaScript/TypeScript

## Version

This rule was introduced in eslint-plugin-nextfriday v1.2.3.
