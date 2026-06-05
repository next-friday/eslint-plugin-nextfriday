# sort-dependency-array

Sort hook dependency arrays with non-callable dependencies first and callable dependencies last.

> This rule is auto-fixable using `--fix`.

> This rule requires type information. Enable typed linting (for example `parserOptions.projectService: true`).

## Rule Details

This rule sorts the dependency array passed to a hook call. The dependency array is the last argument of a call whose callee is an identifier following the hook naming convention (`use` followed by an uppercase letter), which covers `useEffect`, `useMemo`, `useCallback`, `useLayoutEffect`, `useImperativeHandle`, and custom hooks.

Dependencies are ordered:

1. Non-callable dependencies, alphabetically.
2. Callable (function-typed) dependencies, alphabetically, last.

Whether a dependency is callable is determined from its resolved type. The rule only sorts when every element is a plain identifier or member expression; arrays containing spreads, calls, or other expressions are left untouched. Reordering a dependency array does not change behavior.

### Why?

Keeping the same callable-last ordering used for object literals, destructuring, and type members makes dependency arrays consistent with the rest of the codebase.

## Examples

### Incorrect

```ts
useEffect(() => {}, [description, onSubmit, title]);
```

### Correct

```ts
useEffect(() => {}, [description, title, onSubmit]);
```

## When Not To Use It

- If your project does not enable typed linting, this rule cannot run.
- If you rely on a custom function whose name starts with `use` but is not a hook with a dependency array.

## Related Rules

- [sort-object-properties](./SORT_OBJECT_PROPERTIES.md) - Sort object literal properties.
- [enforce-sorted-destructuring](./ENFORCE_SORTED_DESTRUCTURING.md) - Sort destructured properties.
