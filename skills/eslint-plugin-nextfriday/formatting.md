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

## Curly Braces for If Statements

If the `if` consequent fits on one line, omit braces. If it spans multiple lines, use braces.

```ts
// Bad: single-line body with braces
if (isValid) {
  process();
}

// Bad: multi-line body without braces
if (veryLongCondition && anotherCondition) process();

// Good: single-line body, no braces
if (isValid) process();

// Good: multi-line body, with braces
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
