# react-props-destructure

Enforce destructuring props inside React component body instead of parameters.

## Rule Details

This rule enforces a consistent pattern for handling props in React components by requiring destructuring to be done inside the component body rather than in the parameter list. This promotes better code readability and makes prop usage more explicit.

Examples of **incorrect** code for this rule:

```jsx
const Component = ({ children }) => <div>{children}</div>;

const Component = ({ title, children, onClick }) => (
  <div onClick={onClick}>
    <h1>{title}</h1>
    {children}
  </div>
);

function Component({ children }) {
  return <div>{children}</div>;
}

const Component = function ({ children }) {
  return <div>{children}</div>;
};

// Also applies to conditional returns
const Component = ({ show, children }) => {
  return show ? <div>{children}</div> : null;
};

// And logical operators
const Component = ({ show, children }) => {
  return show && <div>{children}</div>;
};
```

Examples of **correct** code for this rule:

```jsx
const Component = (props) => {
  const { children } = props;
  return <div>{children}</div>;
};

const Component = (props) => {
  const { title, children, onClick } = props;

  return (
    <div onClick={onClick}>
      <h1>{title}</h1>
      {children}
    </div>
  );
};

function Component(props) {
  const { children } = props;
  return <div>{children}</div>;
}

const Component = function (props) {
  const { children } = props;
  return <div>{children}</div>;
};

// Multiple parameters are allowed
const Component = (props, ref) => {
  return <div>{props.children}</div>;
};

// No parameters is allowed
const Component = () => {
  return <div>Hello</div>;
};

// Already using props parameter (no destructuring) is allowed
const Component = (props) => {
  return <div>{props.children}</div>;
};

// Non-React functions are ignored
const helper = ({ value }) => {
  return value * 2;
};

const regularFunction = ({ data }) => {
  return data.map((item) => item.id);
};
```

## Why?

### Benefits of destructuring inside component body

1. **Explicit prop usage**: Makes it clear which props are being used within the component
2. **Better readability**: Separates prop extraction from component signature
3. **Easier refactoring**: Props can be easily modified without changing the function signature
4. **Consistent patterns**: Promotes a uniform approach across the codebase
5. **Better TypeScript integration**: Works better with prop type definitions

## When Not To Use It

This rule should not be used if you:

- Prefer parameter destructuring for brevity
- Are working on a codebase that already consistently uses parameter destructuring
- Need to maintain compatibility with existing patterns

## Rule Scope

This rule only applies to:

- Functions that return JSX elements or fragments
- Functions with exactly one parameter that is object destructuring
- Arrow functions, function expressions, and function declarations

The rule ignores:

- Non-React functions (functions that don't return JSX)
- Functions with multiple parameters
- Functions with no parameters
- Functions already using a `props` parameter without destructuring

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
    "nextfriday/react-props-destructure": "error"
  }
}
```

## Compatibility

- React functional components
- Arrow functions with JSX
- Function declarations with JSX
- Function expressions with JSX
- Conditional JSX returns
- Logical operator JSX returns
- JSX fragments

## Version

This rule was introduced in eslint-plugin-nextfriday v1.0.0.
