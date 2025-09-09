# prefer-react-import-types

Enforce importing React types and utilities from 'react' instead of using React.X notation.

## Rule Details

This rule enforces direct imports of React types and utilities instead of using the React namespace notation (`React.ReactNode`, `React.useState`, etc.). This promotes cleaner imports and better tree-shaking in modern bundlers.

Examples of **incorrect** code for this rule:

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

Examples of **correct** code for this rule:

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

## Why?

### Benefits of direct imports

1. **Better tree-shaking**: Bundlers can more easily eliminate unused code when imports are explicit
2. **Cleaner code**: Reduces namespace pollution and makes dependencies more explicit
3. **Improved IDE support**: Better autocomplete and refactoring capabilities
4. **Smaller bundle sizes**: Only import what you actually use
5. **TypeScript optimization**: Better type checking and inference with explicit imports
6. **Modern practices**: Aligns with current React ecosystem conventions

## Automatic Fixing

This rule provides automatic fixing that replaces `React.X` with the direct import name. However, you will need to manually add the appropriate import statements:

- **Types**: Use `import type { TypeName } from "react"`
- **Runtime code**: Use `import { functionName } from "react"`

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

This rule should not be used if you:

- Prefer the React namespace for consistency across a large codebase
- Are working with legacy code that heavily uses React namespace
- Need to maintain compatibility with older bundlers that don't support tree-shaking

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
    "nextfriday/prefer-react-import-types": "error"
  }
}
```

## Compatibility

- React 16.8+ (hooks support)
- TypeScript 3.8+ (type-only imports)
- Modern bundlers with tree-shaking support
- ESLint 9+ with flat config

## Version

This rule was introduced in eslint-plugin-nextfriday v1.1.0.
