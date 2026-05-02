# no-inline-nested-object

Require object or array values that contain further nested objects or arrays to span multiple lines.

## Rule Details

This rule enforces that when an object property's value is itself an object or array **that contains further nested structures inside**, it must span multiple lines. Flat collections — objects of primitive properties or arrays of simple references — are allowed inline because Prettier already controls their wrapping via `printWidth`.

A "nested structure" is any object or array element/property whose value is another object or array. The rule deliberately ignores depth-1 collections so it does not fight Prettier on simple data and configuration tables.

### Why?

Truly nested structures are easy to misread when collapsed onto a single line, and adding or removing an inner element produces noisy diffs. Flat collections do not have the same problem and are best left to Prettier's line-length logic.

## Examples

### Incorrect

<!-- prettier-ignore -->
```ts
const obj = {
  items: [{ a: 1 }, { b: 2 }],
};
```

<!-- prettier-ignore -->
```ts
const obj = {
  matrix: [[1, 2], [3, 4]],
};
```

```ts
const obj = {
  layer: { inner: { leaf: 1 } },
};
```

```ts
const obj = {
  wrap: { items: [1, 2, 3] },
};
```

### Correct

<!-- prettier-ignore -->
```ts
const obj = {
  items: [
    { a: 1 },
    { b: 2 },
  ],
};
```

```ts
const obj = {
  layer: {
    inner: { leaf: 1 },
  },
};
```

Flat values stay inline:

```ts
const obj = {
  config: { enabled: true, timeout: 5000 },
  database: { host: "localhost", port: 5432, name: "myapp" },
};
```

```ts
const obj = {
  options: ["primary", "foreground", "danger", "outline", "ghost", "link"],
  allow: [target.utils, target.types, target.constants],
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

If your team prefers compact single-line nested structures regardless of depth, or if your project has different formatting preferences.

## Fixable

This rule is auto-fixable. Running ESLint with the `--fix` flag will expand inline collections that contain nested structures onto multiple lines.
