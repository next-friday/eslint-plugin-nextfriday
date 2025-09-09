# prefer-interface-over-inline-types

Enforce interface declarations over inline type annotations for React component props.

## Rule Details

This rule enforces the use of interface declarations instead of inline type annotations for React component props when the type is complex. This promotes better code organization, reusability, and readability.

Examples of **incorrect** code for this rule:

```tsx
// More than 2 properties - should use interface
const Component = (props: { children: ReactNode; title: string; onClick: () => void }) => (
  <div onClick={props.onClick}>
    <h1>{props.title}</h1>
    {props.children}
  </div>
);

// Nested object types - should use interface
const Component = (props: { user: { name: string; age: number }; isActive: boolean }) => <div>{props.user.name}</div>;

// Array types - should use interface
const Component = (props: { items: string[]; title: string }) => (
  <div>
    <h1>{props.title}</h1>
    {props.items.map((item) => (
      <span key={item}>{item}</span>
    ))}
  </div>
);

// Union types - should use interface
const Component = (props: { status: "loading" | "success" | "error"; message: string }) => (
  <div className={props.status}>{props.message}</div>
);

// Function declarations
function Component(props: { data: { id: number; name: string }; isVisible: boolean }) {
  return <div>{props.data.name}</div>;
}

// Function expressions
const Component = function (props: { config: { theme: string; lang: string }; children: ReactNode }) {
  return <div className={props.config.theme}>{props.children}</div>;
};
```

Examples of **correct** code for this rule:

```tsx
// Using interface for complex props
interface ComponentProps {
  children: ReactNode;
  title: string;
  onClick: () => void;
}

const Component = (props: ComponentProps) => (
  <div onClick={props.onClick}>
    <h1>{props.title}</h1>
    {props.children}
  </div>
);

// Using interface for nested objects
interface UserComponentProps {
  user: {
    name: string;
    age: number;
  };
  isActive: boolean;
}

const Component = (props: UserComponentProps) => <div>{props.user.name}</div>;

// Using type alias is also acceptable
type ListComponentProps = {
  items: string[];
  title: string;
};

const Component = (props: ListComponentProps) => (
  <div>
    <h1>{props.title}</h1>
    {props.items.map((item) => (
      <span key={item}>{item}</span>
    ))}
  </div>
);

// Simple inline types are allowed (2 or fewer properties, no complex types)
const Component = (props: { children: ReactNode }) => <div>{props.children}</div>;

const Component = (props: { title: string; onClick: () => void }) => <div onClick={props.onClick}>{props.title}</div>;

// Non-React functions are ignored
const helper = (props: { value: number; name: string; data: object }) => {
  return props.value + props.name.length;
};

// Functions with no parameters
const Component = () => <div>Hello</div>;

// Functions with multiple parameters
const Component = (props: { title: string }, ref: any) => <div>{props.title}</div>;
```

## Why?

### Benefits of interface declarations:

1. **Reusability**: Interfaces can be reused across multiple components
2. **Better organization**: Separates type definitions from component logic
3. **Improved readability**: Makes component signatures cleaner and easier to understand
4. **Better IDE support**: Enhanced autocomplete, refactoring, and navigation
5. **Documentation**: Interfaces serve as clear documentation of component APIs
6. **Extensibility**: Interfaces can be extended and composed more easily

## Rule Scope

This rule applies to:

- React functional components (arrow functions, function expressions, function declarations)
- Functions that return JSX elements or fragments
- Props with inline type annotations that meet complexity criteria

**Complexity criteria:**

- More than 2 properties in the type literal
- Contains nested object types (`{ user: { name: string } }`)
- Contains array types (`string[]`, `Array<T>`)
- Contains union types (`'a' | 'b' | 'c'`)

The rule ignores:

- Non-React functions (functions that don't return JSX)
- Functions with multiple parameters
- Functions with no parameters
- Simple inline types (2 or fewer properties with primitive types)
- Components already using named types or interfaces

## When Not To Use It

This rule should not be used if you:

- Prefer inline types for consistency across your codebase
- Are working with very simple components that don't benefit from interface extraction
- Have specific naming conventions that conflict with interface declarations
- Are maintaining legacy code with established patterns

## Configuration

This rule is included in the following configurations:

- `nextfriday/react`
- `nextfriday/react/recommended`
- `nextfriday/nextjs`
- `nextfriday/nextjs/recommended`

To enable this rule manually:

```json
{
  "rules": {
    "nextfriday/prefer-interface-over-inline-types": "error"
  }
}
```

## Examples of Complexity Detection

### Simple types (allowed as inline)

```tsx
// ✅ Simple - only 1 property
const Component = (props: { children: ReactNode }) => <div>{props.children}</div>;

// ✅ Simple - only 2 properties with primitive types
const Component = (props: { title: string; count: number }) => (
  <div>
    {props.title}: {props.count}
  </div>
);
```

### Complex types (should use interface)

```tsx
// ❌ Complex - more than 2 properties
const Component = (props: { title: string; count: number; isActive: boolean }) => <div>...</div>;

// ❌ Complex - nested object
const Component = (props: { user: { name: string }; isActive: boolean }) => <div>...</div>;

// ❌ Complex - array type
const Component = (props: { items: string[]; title: string }) => <div>...</div>;

// ❌ Complex - union type
const Component = (props: { status: "loading" | "success"; message: string }) => <div>...</div>;
```

## Compatibility

- React 16.8+ (functional components)
- TypeScript 3.0+ (interface declarations)
- ESLint 9+ with flat config

## Version

This rule was introduced in eslint-plugin-nextfriday v1.2.0.
