# enforce-sorted-destructuring

Enforce alphabetical sorting of destructured properties with defaults first.

## Rule Details

This rule enforces that object destructuring properties are sorted alphabetically, with properties that have default values coming first. Default values are further sorted by type (string, number, boolean, object) and then alphabetically within each type.

### Why?

1. **Consistency**: Alphabetical ordering makes code more predictable and easier to scan
2. **Readability**: Sorted properties are easier to find in large destructuring statements
3. **Organization**: Grouping defaults first keeps the destructuring organized by intent
4. **Maintainability**: Clear structure makes it easier to add or remove properties

### Sorting Order

Properties are sorted in this order:

1. **Properties with defaults** (sorted by type, then alphabetically):
   - String defaults (alphabetically)
   - Number defaults (alphabetically)
   - Boolean defaults (alphabetically)
   - Object/Array defaults (alphabetically)
   - Other defaults (alphabetically)

2. **Properties without defaults** (alphabetically)

## Examples

### ❌ Incorrect

```js
// Bad: Not sorted alphabetically
const { d, b, a, c } = foo;
```

```js
// Bad: Completely unsorted
const { z, a, m } = foo;
```

```js
// Bad: Default in the middle (should be first)
const { a, b, d = "string", c } = foo;
```

```js
// Bad: Non-default before defaults
const { a, d = "string", e = 0 } = foo;
```

```js
// Bad: Defaults not sorted by type (number before string)
const { e = 0, d = "string", a, b } = foo;
```

```js
// Bad: String defaults not sorted alphabetically
const { b = "beta", a = "alpha", c } = foo;
```

```js
// Bad: Properties reversed
const { b, a } = foo;
```

### ✅ Correct

```js
// Good: Alphabetically sorted without defaults
const { a, b, c, d } = foo;
```

```js
// Good: Defaults first, sorted by type (string, number, boolean), then non-defaults
const { d = "string", e = 0, f = true, a, b, c } = foo;
```

```js
// Good: String defaults first (sorted alphabetically), then non-defaults
const { a = "alpha", b = "beta", c, d } = foo;
```

```js
// Good: Number defaults first (sorted alphabetically), then non-defaults
const { a = 1, b = 2, c, d } = foo;
```

```js
// Good: Boolean defaults first (sorted alphabetically), then non-defaults
const { a = true, b = false, c, d } = foo;
```

```js
// Good: Object defaults first (sorted alphabetically), then non-defaults
const { a = {}, b = [], c, d } = foo;
```

```js
// Good: Mixed default types sorted by type order, then non-defaults
const { name = "default", age = 0, active = true, data = {}, x, y, z } = foo;
```

```js
// Good: All defaults sorted by type and alphabetically
const { a = "test", b = "value", c = 1, d = 2 } = foo;
```

```js
// Good: With rest element at end
const { a, b, ...rest } = foo;
```

## When Not To Use It

If you prefer a different sorting strategy for destructured properties or don't want to enforce any particular order, you can disable this rule.

## Further Reading

- [Destructuring Assignment (MDN)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)
- [Default Parameters (MDN)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Default_parameters)
