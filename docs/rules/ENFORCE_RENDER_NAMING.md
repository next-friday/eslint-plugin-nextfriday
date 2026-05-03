# enforce-render-naming

Enforce `render` prefix for variables that hold or return JSX inside React components.

## Rule Details

This rule flags variables declared inside a React component (a top-level PascalCase function or arrow function) whose initializer holds or returns JSX, but whose name does not start with `render`. The `render` prefix makes intent explicit: a reader scanning the component body can tell at a glance which locals are render fragments and which are plain data.

The rule applies inside any function or block nested within the component — not only the component's top-level body.

The prefix must be `render` followed by a camelCase boundary (uppercase letter, or end-of-name). Names like `renderer` (lowercase letter after the prefix) do not count.

### Why?

- **Self-documenting code**: `renderPhoneEntries` reads as "this is a render fragment for phone entries". `phoneEntries` reads as "this is data — a list of phones". The distinction matters when the same component holds both.
- **Refactor signal**: When you want to extract render fragments into separate components, grepping for `render*` finds candidates immediately.
- **Consistency**: Aligns with `enforce-hook-naming` (`use*` for hooks) and `enforce-service-naming` (`fetch*` for services) — name-by-purpose conventions throughout the plugin.

## Examples

### Incorrect

```tsx
const Component = (props) => {
  const header = <div />;
  const cardElements = props.items.map((item) => <Card {...item} />);
  const phoneEntries = props.phones.map((phone) => {
    return <span>{phone}</span>;
  });
  const fallback = props.condition ? <A /> : <B />;
  const banner = props.isVisible && <Banner />;
  return (
    <>
      {header}
      {cardElements}
      {phoneEntries}
      {fallback}
      {banner}
    </>
  );
};
```

### Correct

```tsx
const Component = (props) => {
  const renderHeader = <div />;
  const renderCardElements = props.items.map((item) => <Card {...item} />);
  const renderPhoneEntries = props.phones.map((phone) => {
    return <span>{phone}</span>;
  });
  const renderFallback = props.condition ? <A /> : <B />;
  const renderBanner = props.isVisible && <Banner />;
  return (
    <>
      {renderHeader}
      {renderCardElements}
      {renderPhoneEntries}
      {renderFallback}
      {renderBanner}
    </>
  );
};
```

Both value form and function form are accepted as long as the prefix is correct:

```tsx
const renderHeader = <div />; // value form — eval once at component render
const renderHeader = () => <div />; // function form — eval each call
```

## What This Rule Checks

The rule fires when a `const` or `let` declaration is created **inside** a top-level PascalCase function (a React component) and the initializer is one of:

- A `JSXElement` or `JSXFragment` directly
- A `ConditionalExpression` whose consequent or alternate produces JSX
- A `LogicalExpression` whose right-hand side produces JSX
- An `ArrayExpression` containing JSX elements
- An `ArrowFunctionExpression` or `FunctionExpression` whose body returns JSX
- A `CallExpression` to `.map`, `.flatMap`, or `.filter` whose callback returns JSX
- A `TSAsExpression` or `TSSatisfiesExpression` wrapping any of the above

The rule applies only to `.tsx` and `.jsx` files. Variables declared outside any PascalCase function (top-level module constants, helpers in plain functions) are not checked.

## When Not To Use It

If your team prefers other naming conventions for extracted JSX (e.g., `*Element`, `*Section`, `*Fragment`), or if you do not extract JSX into intermediate variables in the first place.

## Related Rules

- [enforce-hook-naming](ENFORCE_HOOK_NAMING.md)
- [enforce-service-naming](ENFORCE_SERVICE_NAMING.md)
- [boolean-naming-prefix](BOOLEAN_NAMING_PREFIX.md)
