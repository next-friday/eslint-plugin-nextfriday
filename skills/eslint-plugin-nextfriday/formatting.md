# Formatting

## Blank Lines Between Multi-Line JSX Elements

Sibling JSX elements that span multiple lines must have a blank line between them.

```tsx
// Bad
<Header
  title="Dashboard"
  subtitle="Welcome back"
/>
<MainContent
  data={data}
  isLoading={isLoading}
/>

// Good
<Header
  title="Dashboard"
  subtitle="Welcome back"
/>

<MainContent
  data={data}
  isLoading={isLoading}
/>
```

## No Blank Lines Between Single-Line JSX Elements

Sibling single-line JSX elements should NOT have blank lines between them.

```tsx
// Bad
<li>Apple</li>

<li>Banana</li>

<li>Cherry</li>

// Good
<li>Apple</li>
<li>Banana</li>
<li>Cherry</li>
```

## Blank Line After Multi-Line Blocks

Add a blank line after statements that span multiple lines (if/else, try/catch, loops, etc.).

```ts
// Bad
if (isValid) {
  process();
}
const result = calculate();

// Good
if (isValid) {
  process();
}

const result = calculate();
```

## Blank Line Before Return

Add a blank line before `return` statements (except when it's the only statement in the block).

```ts
// Bad
function getUser(): User {
  const user = db.find(id);
  return user;
}

// Good
function getUser(): User {
  const user = db.find(id);

  return user;
}
```

## Curly Braces for Multi-Line If

Multi-line if bodies require curly braces. Single-line if bodies must not have curly braces.

```ts
// Bad
if (isValid) {
  process();
} // single statement, multi-line braces OK

if (isValid) doSomething();
doSomethingElse(); // misleading

// Good
if (isValid) process(); // single-line, no braces

if (isValid) {
  doSomething();
  doSomethingElse();
}
```

## Nested Objects Must Span Multiple Lines

Inline nested objects and arrays must be written across multiple lines.

```ts
// Bad
const config = { database: { host: "localhost", port: 5432 } };

// Good
const config = {
  database: {
    host: "localhost",
    port: 5432,
  },
};
```
