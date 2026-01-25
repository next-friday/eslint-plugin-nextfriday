# jsx-newline-between-elements

Require empty lines between sibling JSX elements when at least one spans multiple lines.

## Rule Details

This rule enforces empty lines between sibling JSX elements when either element spans multiple lines. This improves visual separation and readability of complex component structures. Single-line elements do not require empty lines between them.

### Examples

#### Incorrect

```jsx
function Dashboard() {
  return (
    <main>
      <section className="stats">
        <StatsCard title="Revenue" value={revenue} />
      </section>
      <section className="charts">
        <LineChart data={salesData} />
        <BarChart data={inventoryData} />
      </section>
    </main>
  );
}
```

```jsx
function UserProfile() {
  return (
    <div>
      <Avatar src={user.avatar} alt={user.name} size="large" />
      <UserInfo name={user.name} email={user.email} />
    </div>
  );
}
```

#### Correct

Multi-line elements need empty lines between them:

```jsx
function Dashboard() {
  return (
    <main>
      <section className="stats">
        <StatsCard title="Revenue" value={revenue} />
      </section>

      <section className="charts">
        <LineChart data={salesData} />
        <BarChart data={inventoryData} />
      </section>
    </main>
  );
}
```

```jsx
function UserProfile() {
  return (
    <div>
      <Avatar src={user.avatar} alt={user.name} size="large" />

      <UserInfo name={user.name} email={user.email} />
    </div>
  );
}
```

Single-line elements do not require empty lines:

```jsx
function Navigation() {
  return (
    <nav>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/about">About</NavLink>
      <NavLink to="/contact">Contact</NavLink>
    </nav>
  );
}
```

```jsx
function PageLayout() {
  return (
    <div>
      <Header />
      <Main />
      <Footer />
    </div>
  );
}
```

## When Not To Use It

If you prefer compact JSX without empty lines between multi-line elements, or if your team has different formatting preferences.

## Fixable

This rule is auto-fixable. Running ESLint with the `--fix` flag will automatically insert empty lines between sibling JSX elements when needed.
