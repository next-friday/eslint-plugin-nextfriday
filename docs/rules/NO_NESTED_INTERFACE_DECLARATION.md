# no-nested-interface-declaration

Disallow inline object type literals in interface or type properties.

## Rule Details

This rule flags inline object type literals nested inside interface or type properties. Nested object types should be extracted into separate named interfaces or type declarations for clarity and reusability.

### Why?

1. **Readability**: Deeply nested inline types make interfaces harder to scan
2. **Reusability**: Extracted types can be imported and reused across files
3. **Maintainability**: Flat, named types are easier to modify and extend
4. **IDE experience**: Named types provide better hover information and navigation

## Examples

### Incorrect

```ts
interface Foo {
  bar: {
    baz: string;
  };
}
```

```ts
interface Props {
  user: {
    name: string;
    age: number;
  };
}
```

```ts
interface Props {
  items: {
    id: number;
    label: string;
  }[];
}
```

```ts
interface Props {
  data: Readonly<{
    id: number;
    name: string;
  }>;
}
```

### Correct

```ts
interface Bar {
  baz: string;
}

interface Foo {
  bar: Bar;
}
```

```ts
interface User {
  name: string;
  age: number;
}

interface Props {
  user: User;
}
```

```ts
interface Item {
  id: number;
  label: string;
}

interface Props {
  items: Item[];
}
```

```ts
// Primitive and simple types are fine inline
interface Props {
  name: string;
  age: number;
  isActive: boolean;
  ids: string[];
  callback: () => void;
}
```

## When Not To Use It

If you prefer keeping small object types inline within interfaces for co-location, you can disable this rule.
