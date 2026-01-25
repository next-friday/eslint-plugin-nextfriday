# newline-before-return

Require a blank line before return statements.

## Rule Details

This rule enforces a blank line before `return` statements when they are preceded by other statements. This improves readability by visually separating the return value from the logic that precedes it. A blank line is not required when the return statement is the only statement in the function body.

### Examples

#### Incorrect

```ts
function findUserById(users: User[], id: string): User | null {
  const user = users.find((user) => user.id === id);
  return user ?? null;
}
```

```ts
function processData(data: RawData): ProcessedData {
  const validated = validateData(data);
  const transformed = transformData(validated);
  return transformed;
}
```

```ts
function getNodeValue(node: ASTNode): ASTNode {
  if (node.type === "Expression") {
    return getNodeValue(node.expression);
  }
  return node;
}
```

#### Correct

```ts
function findUserById(users: User[], id: string): User | null {
  const user = users.find((user) => user.id === id);

  return user ?? null;
}
```

```ts
function processData(data: RawData): ProcessedData {
  const validated = validateData(data);
  const transformed = transformData(validated);

  return transformed;
}
```

```ts
function getNodeValue(node: ASTNode): ASTNode {
  if (node.type === "Expression") {
    return getNodeValue(node.expression);
  }

  return node;
}
```

Single return statements do not require a blank line:

```ts
function getValue(): number {
  return 42;
}
```

```ts
function isValid(value: unknown): boolean {
  return value !== null && value !== undefined;
}
```

Early returns inside blocks are allowed without blank lines:

```ts
function processItem(item: Item): Result {
  if (!item.isActive) {
    return null;
  }

  const processed = transform(item);

  return processed;
}
```

## When Not To Use It

If you prefer compact functions without blank lines before return statements, or if your team has different formatting preferences.

## Fixable

This rule is auto-fixable. Running ESLint with the `--fix` flag will automatically insert blank lines before return statements when needed.
