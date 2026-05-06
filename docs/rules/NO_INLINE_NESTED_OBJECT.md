# no-inline-nested-object

Require object or array values passed to functions, returned from functions, or used as JSX attributes to span multiple lines when they contain nested objects or arrays.

> This rule is auto-fixable using `--fix`.

## Rule Details

This rule applies **only to function-like contexts**:

- Arguments to function calls (`CallExpression`) and constructor calls (`NewExpression`)
- Values returned from functions (`return` statements)
- Implicit returns from arrow functions
- Expressions inside JSX braces (props, children)

When the value passed/returned in one of those contexts is an inline object or array that contains another object or array as a property value or element, the rule requires it to span multiple lines. Flat collections — objects of primitive properties or arrays of simple references — are allowed inline because Prettier already controls their wrapping via `printWidth`.

The rule deliberately **does not apply to module-level data declarations** (e.g., `const config = { ... }`, route tables, dependency rule arrays). These are static configuration data, not function calls — Prettier handles their layout, and forcing them multiline produces noisy diffs without aiding readability.

### Why?

Truly nested structures passed at a call site are easy to misread when collapsed onto a single line, and adding or removing an inner element produces noisy diffs at the call site. The rule does not target data declarations because forcing static configuration arrays/objects onto multiple lines fights Prettier and bloats config files without aiding readability.

## Examples

### Incorrect

```ts
useState({ a: { b: 1 } });
```

```ts
doThing([{ a: 1 }, { b: 2 }]);
```

```ts
function build() {
  return { user: { id: 1 } };
}
```

```ts
const factory = () => ({ a: { b: 1 } });
```

```tsx
const el = <Comp prop={{ a: { b: 1 } }} />;
```

### Correct

Function-context calls expanded onto multiple lines:

```ts
useState({
  a: { b: 1 },
});
```

```ts
doThing([{ a: 1 }, { b: 2 }]);
```

```ts
function build() {
  return {
    user: { id: 1 },
  };
}
```

Flat values stay inline:

```ts
useState({ enabled: true, timeout: 5000 });
useState([1, 2, 3]);
```

Module-level data declarations are not checked:

<!-- prettier-ignore -->
```ts
const dependencyRules = [
  { from: source.modules, allow: [{ to: { type: "templates" } }] },
];

const obj = {
  items: [{ a: 1 }, { b: 2 }],
  matrix: [[1, 2], [3, 4]],
  layer: { inner: { leaf: 1 } },
};
```

## When Not To Use It

If your team prefers compact single-line nested structures at call sites regardless of nesting, or if your project has different formatting preferences.
