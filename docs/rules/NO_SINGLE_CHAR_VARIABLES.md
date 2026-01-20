# no-single-char-variables

Disallow single character variable and parameter names for better code readability.

## Rule Details

This rule enforces descriptive variable and parameter names by disallowing single character identifiers. Single character names like `d`, `u`, `l`, `r` are cryptic and make code harder to understand. They require readers to guess or track what each variable represents.

**Incorrect** code for this rule:

```typescript
const d = new Date();
const u = await getUser();
const l = list.length;
const r = await fetch(url);

users.map((u) => u.id);
onClick((e) => e.preventDefault());

const add = (a, b) => a + b;
const e = (x) => x * 2;

function f() {
  return 1;
}

const { a } = obj;
const [x] = array;

try {
} catch (e) {}
```

**Correct** code for this rule:

```typescript
const currentDate = new Date();
const currentUser = await getUser();
const itemCount = list.length;
const response = await fetch(url);

users.map((user) => user.id);
onClick((event) => event.preventDefault());

const add = (val1, val2) => val1 + val2;
const add = (width, height) => width * height;
const calculateDouble = (value) => value * 2;

function getName() {
  return "test";
}

const { alpha } = obj;
const { a: alpha } = obj;
const [first] = array;

try {
} catch (error) {}
```

## Exceptions

The rule allows the following exceptions:

### Loop Counters

Single character loop counters `i`, `j`, `k`, `n` are allowed in traditional for loops:

```typescript
for (let i = 0; i < 10; i++) {}
for (let j = 0; j < items.length; j++) {}
for (let i = 0, j = 10; i < j; i++, j--) {}
```

Note: These are only allowed in traditional `for` loops, not in `for...of` or `for...in` loops.

### Underscore for Unused Variables

A single underscore `_` is allowed to indicate intentionally unused variables:

```typescript
const _ = unusedValue;
const [_, second] = array;
array.map((_, index) => index);
```

## Benefits

- **Self-documenting code**: Descriptive names make code readable without additional comments
- **Reduced cognitive load**: No need to track or guess what single letters represent
- **Better IDE support**: Meaningful names provide better autocomplete and search results
- **Easier debugging**: Clear variable names make debugging and code review faster
- **Improved collaboration**: Team members can understand code without additional context

## When Not To Use

- For very short scripts or throwaway code
- When working with mathematical formulas where single letters are conventional (e.g., `x`, `y` for coordinates)
- In legacy codebases where this pattern is established and changing would be disruptive

## Configuration

This rule has no configuration options.

## Related Rules

- [prefer-destructuring-params](./PREFER_DESTRUCTURING_PARAMS.md) - Encourages destructuring for function parameters
- [prefer-named-param-types](./PREFER_NAMED_PARAM_TYPES.md) - Encourages named parameters for better readability
