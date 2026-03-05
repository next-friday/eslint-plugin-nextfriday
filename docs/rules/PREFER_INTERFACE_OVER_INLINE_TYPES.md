# prefer-interface-over-inline-types

Enforce interface declarations over inline type annotations for React component props.

## Rule Details

This rule enforces the use of interface declarations instead of inline type annotations for React component props when the type is complex. This promotes better code organization, reusability, and readability.

## Examples

### Incorrect

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

### Correct

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

## When Not To Use It

- If you prefer inline types for consistency across your codebase
- When working with very simple components that don't benefit from interface extraction
- In legacy code with established inline type patterns
