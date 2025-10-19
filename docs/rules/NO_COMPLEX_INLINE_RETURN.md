# no-complex-inline-return

Disallow complex inline expressions in return statements - prefer extracting to a const first.

## Rule Details

This rule enforces a pattern where complex expressions (ternary operators, logical expressions, new expressions) are extracted to a const variable before being returned. This improves code readability and makes debugging easier by allowing you to inspect intermediate values.

**Incorrect** code for this rule:

```typescript
function waitForLoad(targetWindow: Window) {
  return targetWindow.document.readyState === "complete"
    ? Promise.resolve()
    : new Promise<void>((resolve) => {
        targetWindow.addEventListener(
          "load",
          () => {
            resolve();
          },
          {
            once: true,
          },
        );
      });
}

function getValue(condition: boolean) {
  return condition ? "yes" : "no";
}

function getUser(user: User | null) {
  return user || defaultUser;
}

function createInstance() {
  return new MyClass();
}

function checkStatus(a: boolean, b: boolean) {
  return a && b;
}
```

**Correct** code for this rule:

```typescript
function waitForLoad(targetWindow: Window) {
  const loadPromise =
    targetWindow.document.readyState === "complete"
      ? Promise.resolve()
      : new Promise<void>((resolve) => {
          targetWindow.addEventListener(
            "load",
            () => {
              resolve();
            },
            {
              once: true,
            },
          );
        });

  return loadPromise;
}

function getValue(condition: boolean) {
  const value = condition ? "yes" : "no";
  return value;
}

function getUser(user: User | null) {
  const activeUser = user || defaultUser;
  return activeUser;
}

function createInstance() {
  const instance = new MyClass();
  return instance;
}

function checkStatus(a: boolean, b: boolean) {
  const isValid = a && b;
  return isValid;
}

// Simple returns are still allowed
function getName() {
  return "John Doe";
}

function getAge() {
  return 42;
}

function callFunction() {
  return someFunction();
}

function getMath() {
  return a + b;
}
```

## Benefits

- **Better readability**: Complex logic is separated from the return statement
- **Easier debugging**: Intermediate values can be inspected in debuggers
- **Self-documenting**: Variable names can describe what the complex expression represents
- **Consistent style**: Enforces a uniform approach to handling complex return values

## When Not To Use

- For very simple projects where inline expressions are preferred
- When you prefer a more compact coding style
- In cases where the expression is trivial and doesn't benefit from extraction

## What This Rule Checks

This rule flags the following patterns when used directly in return statements:

- **Ternary expressions** (conditional operators): `condition ? value1 : value2`
- **Logical expressions**: `a && b`, `a || b`, `a ?? b`
- **New expressions**: `new MyClass()`

The following are allowed in return statements:

- Simple values (literals, variables)
- Function calls
- Binary expressions (math operations like `a + b`)
- Object/array literals
- Member expressions (`obj.prop`)

## Related Rules

- No related rules
