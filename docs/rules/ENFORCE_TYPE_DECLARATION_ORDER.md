# enforce-type-declaration-order

Enforce that referenced types and interfaces are declared after the type that uses them.

## Rule Details

This rule enforces a top-down reading order for type declarations. When an interface or type references another locally-declared type, the referenced (dependency) type must appear _after_ the consumer. This ensures the "main" type is read first, with its supporting types following below.

### Why?

1. **Top-down readability**: The primary type appears first, making it easy to understand the high-level structure before drilling into details
2. **Consistency**: A uniform ordering convention eliminates debates about where to place types
3. **Natural flow**: Mirrors how you'd explain a data structure - start with the big picture, then define the parts

## Examples

### Incorrect

```ts
// Dependency declared before consumer
interface Baz {
  baz: string;
}

interface Foo {
  bar: Baz;
}
```

```ts
type Config = {
  theme: string;
};

type Props = {
  config: Config;
};
```

### Correct

```ts
// Consumer first, dependency after
interface Foo {
  bar: Baz;
}

interface Baz {
  baz: string;
}
```

```ts
type Props = {
  config: Config;
};

type Config = {
  theme: string;
};
```

```ts
// Chain of dependencies in top-down order
interface Parent {
  child: Child;
}

interface Child {
  grandchild: Grandchild;
}

interface Grandchild {
  value: string;
}
```

```ts
// External/imported types are ignored (not locally declared)
interface Props {
  items: ExternalType[];
}
```

## When Not To Use It

If you prefer declaring dependency types before the types that reference them (bottom-up order), or if you don't want to enforce any particular declaration order, you can disable this rule.
