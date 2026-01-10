# jsx-no-variable-in-callback

Disallow variable declarations inside callback functions within JSX.

## Rule Details

This rule prevents variable declarations inside callback functions that are directly used within JSX expressions. This enforces cleaner, more maintainable code by extracting complex logic to separate functions.

### Why?

1. **Readability**: Keeps JSX clean and focused on rendering, not logic
2. **Maintainability**: Extracted functions are easier to test and modify
3. **Separation of Concerns**: Logic belongs in functions, not inline in JSX
4. **Consistency**: Enforces a uniform pattern across the codebase

## Examples

### ❌ Incorrect

```tsx
// Bad: Variable declared inside map callback in JSX
const UserList = ({ users }) => {
  return (
    <div>
      {users.map((user) => {
        const displayName = user.firstName + " " + user.lastName;
        return <div key={user.id}>{displayName}</div>;
      })}
    </div>
  );
};
```

```tsx
// Bad: Variable in filter callback
const ProductList = ({ products }) => {
  return (
    <ul>
      {products.filter((product) => {
        const isAvailable = product.stock > 0 && product.active;
        return isAvailable;
      })}
    </ul>
  );
};
```

```tsx
// Bad: Multiple variables in callback
const OrderSummary = ({ orders }) => {
  return (
    <div>
      {orders.map((order) => {
        const total = order.price * order.quantity;
        const discount = total * 0.1;
        const final = total - discount;
        return <div key={order.id}>{final}</div>;
      })}
    </div>
  );
};
```

### ✅ Correct

```tsx
// Good: Extract logic to a separate function
const UserList = ({ users }) => {
  const renderUsers = () =>
    users.map((user) => {
      const displayName = user.firstName + " " + user.lastName;
      return <div key={user.id}>{displayName}</div>;
    });

  return <div>{renderUsers()}</div>;
};
```

```tsx
// Good: Use helper function outside JSX
const ProductList = ({ products }) => {
  const isProductAvailable = (product) => {
    const isAvailable = product.stock > 0 && product.active;
    return isAvailable;
  };

  return <ul>{products.filter(isProductAvailable)}</ul>;
};
```

```tsx
// Good: No variable declaration in callback
const UserList = ({ users }) => {
  return (
    <div>
      {users.map((user) => (
        <div key={user.id}>
          {user.firstName} {user.lastName}
        </div>
      ))}
    </div>
  );
};
```

```tsx
// Good: Variable declared outside JSX
const OrderSummary = ({ orders }) => {
  const discount = 0.1;

  return (
    <div>
      {orders.map((order) => {
        const total = order.price * order.quantity;
        return <div key={order.id}>{total - total * discount}</div>;
      })}
    </div>
  );
};
```

```tsx
// Good: Extract rendering to a function
const OrderSummary = ({ orders }) => {
  const calculateFinalPrice = (order) => {
    const total = order.price * order.quantity;
    const discount = total * 0.1;
    return total - discount;
  };

  const renderOrders = () => orders.map((order) => <div key={order.id}>{calculateFinalPrice(order)}</div>);

  return <div>{renderOrders()}</div>;
};
```

## When Not To Use It

If you prefer keeping all logic inline within JSX callbacks and don't mind the reduced readability, you can disable this rule. However, this is generally not recommended as it leads to harder-to-maintain code.

## Further Reading

- [React Component Best Practices](https://react.dev/learn/keeping-components-pure)
- [Clean Code Principles](https://clean-code-developer.com/)
