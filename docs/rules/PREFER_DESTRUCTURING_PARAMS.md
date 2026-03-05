# prefer-destructuring-params

Enforce destructuring for functions with multiple parameters.

## Rule Details

This rule enforces the use of object destructuring for functions that have multiple parameters. This improves code readability and makes it easier to understand what parameters a function expects.

## Examples

### Incorrect

```ts
function createUser(name, email, age, address) {
  // ...
}

const processOrder = (orderId, customerId, items, total) => {
  // ...
};
```

### Correct

```ts
function createUser({ name, email, age, address }) {
  // ...
}

const processOrder = ({ orderId, customerId, items, total }) => {
  // ...
};

// Single parameter functions are allowed
function getName(user) {
  return user.name;
}

// Functions with no parameters are allowed
function getCurrentTime() {
  return new Date();
}

// Functions with already destructured parameters are allowed
function updateUser({ name, email }, additionalData) {
  // ...
}
```

## When Not To Use It

- If your project prefers traditional parameter lists
- For performance-critical functions where destructuring overhead matters
- When dealing with legacy code that can't be easily refactored
