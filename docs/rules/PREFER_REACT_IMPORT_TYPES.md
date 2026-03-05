# prefer-react-import-types

Enforce importing React types and utilities from 'react' instead of using React.X notation.

## Rule Details

This rule enforces direct imports of React types and utilities instead of using the React namespace notation (`React.ReactNode`, `React.useState`, etc.). This promotes cleaner imports and better tree-shaking in modern bundlers.

## Examples

### Incorrect

```tsx
// Types with React namespace
const Component = (props: { children: React.ReactNode }) => <div>{props.children}</div>;

interface Props {
  title: React.ReactElement;
  onClick: React.MouseEventHandler;
}

const MyComponent: React.FC<Props> = ({ title, onClick }) => <div onClick={onClick}>{title}</div>;

// Hooks with React namespace
const Component = () => {
  const [state, setState] = React.useState(0);
  const value = React.useMemo(() => state * 2, [state]);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    console.log("mounted");
  }, []);

  return <div ref={ref}>{value}</div>;
};

// Utilities with React namespace
const element = React.createElement("div", null, "Hello");
const MemoizedComponent = React.memo(() => <div>Hello</div>);
const LazyComponent = React.lazy(() => import("./Component"));

const MyFragment = () => (
  <React.Fragment>
    <div>Item 1</div>
    <div>Item 2</div>
  </React.Fragment>
);
```

### Correct

```tsx
// Direct type imports
import type { ReactNode, ReactElement, MouseEventHandler, FC } from "react";

const Component = (props: { children: ReactNode }) => <div>{props.children}</div>;

interface Props {
  title: ReactElement;
  onClick: MouseEventHandler;
}

const MyComponent: FC<Props> = ({ title, onClick }) => <div onClick={onClick}>{title}</div>;

// Direct hook imports
import { useState, useMemo, useRef, useEffect } from "react";

const Component = () => {
  const [state, setState] = useState(0);
  const value = useMemo(() => state * 2, [state]);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log("mounted");
  }, []);

  return <div ref={ref}>{value}</div>;
};

// Direct utility imports
import { createElement, memo, lazy, Fragment } from "react";

const element = createElement("div", null, "Hello");
const MemoizedComponent = memo(() => <div>Hello</div>);
const LazyComponent = lazy(() => import("./Component"));

const MyFragment = () => (
  <Fragment>
    <div>Item 1</div>
    <div>Item 2</div>
  </Fragment>
);
```

## Supported React Exports

### Types (use `import type`)

- `ReactNode`, `ReactElement`, `ReactChildren`, `ReactChild`
- `ComponentType`, `FC`, `FunctionComponent`, `Component`, `PureComponent`
- Event handlers: `ReactEventHandler`, `MouseEventHandler`, `ChangeEventHandler`, etc.
- Refs: `RefObject`, `MutableRefObject`, `Ref`, `ForwardedRef`
- Props: `HTMLProps`, `ComponentProps`
- `JSXElementConstructor`

### Runtime Exports (use `import`)

#### Hooks

- `useState`, `useEffect`, `useContext`, `useReducer`
- `useCallback`, `useMemo`, `useRef`, `useImperativeHandle`
- `useLayoutEffect`, `useDebugValue`, `useDeferredValue`
- `useTransition`, `useId`, `useSyncExternalStore`, `useInsertionEffect`

#### Utilities

- `createElement`, `createContext`, `forwardRef`, `memo`, `lazy`
- `Suspense`, `Fragment`, `StrictMode`, `createRef`
- `isValidElement`, `cloneElement`, `Children`

## When Not To Use It

- If you prefer the React namespace for consistency across a large codebase
- When working with legacy code that heavily uses React namespace
