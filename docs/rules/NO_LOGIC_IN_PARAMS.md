# no-logic-in-params

Disallow logic or conditions in function parameters - extract to a const variable first.

## Rule Details

This rule enforces a pattern where complex expressions (logical operators, ternary operators, comparison operators) are extracted to a const variable before being passed as function arguments. This improves code readability, makes debugging easier, and helps maintain cleaner function calls.

**Incorrect** code for this rule:

```typescript
// Nullish coalescing
functionFoo(bar ?? baz);

// Ternary operator
handleUser(isActive ? activeUser : inactiveUser);

// Logical AND
processData(hasPermission && isValid);

// Logical OR
setConfig(customConfig || defaultConfig);

// Comparison operators
validateInput(value > 100);
checkEquality(a === b);

// Negation
toggleFeature(!isEnabled);

// Multiple parameters with logic
createUser(username, age >= 18, status === "active");

// New expression with logic
new MyClass(a || b);
```

**Correct** code for this rule:

```typescript
// Extract logic to a variable first
const value = bar ?? baz;
functionFoo(value);

const user = isActive ? activeUser : inactiveUser;
handleUser(user);

const canProcess = hasPermission && isValid;
processData(canProcess);

const config = customConfig || defaultConfig;
setConfig(config);

const isValid = value > 100;
validateInput(isValid);

const areEqual = a === b;
checkEquality(areEqual);

const shouldDisable = !isEnabled;
toggleFeature(shouldDisable);

const isAdult = age >= 18;
const isActive = status === "active";
createUser(username, isAdult, isActive);

const param = a || b;
new MyClass(param);

// Simple values are still allowed
functionFoo(bar);
functionFoo(42);
functionFoo("string");
functionFoo(obj.property);
functionFoo(getValue());

// Arithmetic operations are allowed
calculate(a + b);
multiply(x * y);

// Object/array literals are allowed
configure({ key: "value" });
process([1, 2, 3]);
```

## Benefits

- **Better readability**: Logic is separated from function calls, making code easier to scan
- **Easier debugging**: Intermediate values can be inspected in debuggers before being passed to functions
- **Self-documenting**: Variable names describe what the complex expression represents
- **Consistent style**: Enforces a uniform approach to handling complex function arguments
- **Reduced cognitive load**: Readers don't need to mentally evaluate expressions while also understanding function calls

## When Not To Use

- For very simple projects where inline expressions are preferred
- When you prefer a more compact coding style
- In cases where the expression is trivial and doesn't benefit from extraction

## What This Rule Checks

This rule flags the following patterns when used as function arguments:

- **Ternary expressions** (conditional operators): `condition ? value1 : value2`
- **Logical expressions**: `a && b`, `a || b`, `a ?? b`
- **Comparison operators**: `===`, `!==`, `==`, `!=`, `>`, `<`, `>=`, `<=`
- **Type checking operators**: `in`, `instanceof`
- **Negation operator**: `!value`

The following are allowed as function arguments:

- Simple values (literals, variables)
- Function calls
- Member expressions (`obj.prop`)
- Arithmetic operations (`a + b`, `a * b`, etc.)
- Object/array literals
- Template literals
- Spread operators (`...args`)

## Related Rules

- [no-complex-inline-return](./NO_COMPLEX_INLINE_RETURN.md) - Similar rule but for return statements
