# sort-object-properties

Sort object literal properties with non-callable members first and callable members last.

> This rule is auto-fixable using `--fix`.

> This rule requires type information. Enable typed linting (for example `parserOptions.projectService: true`).

## Rule Details

This rule enforces a single, consistent ordering for the properties of an object literal:

1. Non-callable properties, alphabetically.
2. Callable (function-typed) properties, alphabetically.

Whether a property is callable is determined from its resolved type, not from its name or its syntactic form. A property whose type resolves to a function (including indexed access types, type aliases, and type references such as `MouseEventHandler`) is treated as callable, matching how editors color functions through semantic highlighting.

The rule skips object literals that contain a spread element, a computed key, a method, or an accessor, because reordering those can change behavior or cannot be ordered statically.

### Why?

Object literals built from shorthand identifiers (state passed through context, hook return values, dependency-bearing values) read more predictably when handlers sit together at the end and data sits at the front. Sorting by resolved type keeps that grouping consistent with the rest of the codebase rather than relying on declaration order.

## Examples

### Incorrect

```ts
declare const description: string;
declare const onSubmit: () => void;
declare const title: string;

const value = { description, onSubmit, title };
```

### Correct

```ts
declare const description: string;
declare const onSubmit: () => void;
declare const title: string;

const value = { description, title, onSubmit };
```

## When Not To Use It

- If your project does not enable typed linting, this rule cannot run.
- If you rely on a specific authored property order for readability and do not want it normalized.

## Related Rules

- [sort-type-alphabetically](./SORT_TYPE_ALPHABETICALLY.md) - Sort interface and type members.
- [enforce-sorted-destructuring](./ENFORCE_SORTED_DESTRUCTURING.md) - Sort destructured properties.
- [jsx-sort-props](./JSX_SORT_PROPS.md) - Sort JSX props by value type.
