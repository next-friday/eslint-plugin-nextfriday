# JSX Patterns

## Simple Props Only

JSX props should only contain strings, simple variables, member expressions, callbacks, or ReactNode. Extract complex expressions to a variable.

```tsx
// Bad
<UserCard name={`${firstName} ${lastName}`} />
<Button onClick={isAdmin ? handleAdmin : handleUser} />
<List items={data.filter((item) => item.isActive)} />

// Good
const fullName = `${firstName} ${lastName}`;
const handleClick = isAdmin ? handleAdmin : handleUser;
const activeItems = data.filter((item) => item.isActive);

<UserCard name={fullName} />
<Button onClick={handleClick} />
<List items={activeItems} />
```

## No Inline Object Props

Don't pass inline object literals as JSX props. Extract to a variable.

```tsx
// Bad
<Chart style={{ width: 100, height: 200 }} />
<Form defaultValues={{ name: "", email: "" }} />

// Good
const chartStyle = { width: 100, height: 200 };
const defaultValues = { name: "", email: "" };

<Chart style={chartStyle} />
<Form defaultValues={defaultValues} />
```

## No Variables in JSX Callbacks

Don't declare variables inside callback functions in JSX. Extract the callback.

```tsx
// Bad
<ul>
  {items.map((item) => {
    const label = item.name.toUpperCase();
    return <li key={item.id}>{label}</li>;
  })}
</ul>;

// Good
function renderItem(item: Item): ReactElement {
  const label = item.name.toUpperCase();

  return <li key={item.id}>{label}</li>;
}

<ul>{items.map(renderItem)}</ul>;
```

## Suspense for Lazy Components

Lazy-loaded components must be wrapped in `<Suspense>`.

```tsx
// Bad
const LazyComponent = lazy(() => import("./HeavyComponent"));
<LazyComponent />;

// Good
const LazyComponent = lazy(() => import("./HeavyComponent"));
<Suspense fallback={<Loading />}>
  <LazyComponent />
</Suspense>;
```

## Destructure Props in Component Body

Destructure props inside the component body, not in the parameter list.

```tsx
// Bad
function UserCard({ name, age }: Readonly<UserCardProps>) {
  return <div>{name}</div>;
}

// Good
function UserCard(props: Readonly<UserCardProps>) {
  const { name, age } = props;

  return <div>{name}</div>;
}
```

## No Non-Component Functions in .tsx Files

Top-level functions in `.tsx`/`.jsx` files should be React components (return JSX). Move utility functions to `.ts` files.

## Template Literals Over Mixed Text

Use template literals instead of mixing text and JSX expressions.

```tsx
// Bad
<p>Hello {name}, welcome!</p>

// Good
<p>{`Hello ${name}, welcome!`}</p>
```

## Logical AND Over Ternary with Null

Use `&&` instead of ternary when one branch is `null` or `undefined`.

```tsx
// Bad
<div>{condition ? <span>Hello</span> : null}</div>
<div>{condition ? <Component /> : undefined}</div>

// Good
<div>{condition && <span>Hello</span>}</div>
<div>{!condition && <span>Fallback</span>}</div>
```

## JSX Props Sort Order

Sort JSX props by value type in this order:

1. String literals (e.g., `type="submit"`)
2. Number/Boolean/Null (e.g., `count={42}`)
3. Object/Array (e.g., `style={chartStyle}`)
4. Function (e.g., `onClick={handleClick}`)
5. JSX Element (e.g., `icon={<HomeIcon />}`)
6. Shorthand boolean (e.g., `disabled`)

Variables, member expressions, and call expressions are skipped. Spread attributes reset ordering.
