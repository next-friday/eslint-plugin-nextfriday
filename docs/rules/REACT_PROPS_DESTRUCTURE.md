# react-props-destructure

Enforce destructuring props inside React component body instead of parameters.

## Rule Details

This rule enforces a consistent pattern for handling props in React components by requiring destructuring to be done inside the component body rather than in the parameter list. This promotes better code readability and makes prop usage more explicit.

## Examples

### Incorrect

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

### Correct

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

## When Not To Use It

- If you prefer parameter destructuring for brevity
- When working on a codebase that already consistently uses parameter destructuring
