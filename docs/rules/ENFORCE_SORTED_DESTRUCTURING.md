# enforce-sorted-destructuring

Enforce alphabetical sorting of destructured properties with defaults first.

## Rule Details

This rule enforces that object destructuring properties are sorted alphabetically, with properties that have default values coming first. Both groups (defaults and non-defaults) are sorted alphabetically (A-Z).

### Why?

1. **Consistency**: Alphabetical ordering makes code more predictable and easier to scan
2. **Readability**: Sorted properties are easier to find in large destructuring statements
3. **Organization**: Grouping defaults first keeps the destructuring organized by intent
4. **Maintainability**: Clear structure makes it easier to add or remove properties

### Sorting Order

Properties are sorted in this order:

1. **Properties with defaults** (sorted alphabetically A-Z)
2. **Properties without defaults** (sorted alphabetically A-Z)

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
// Bad: Defaults not sorted alphabetically (e before d)
const { e = 0, d = "string", a, b } = foo;
```

```js
// Bad: Defaults not sorted alphabetically (b before a)
const { b = "beta", a = "alpha", c } = foo;
```

```js
// Bad: Properties reversed
const { b, a } = foo;
```

```js
// Bad: Defaults not sorted alphabetically (duration before autoplay)
const { duration = 5000, autoplay = false, totalSlides } = options;
```

### ✅ Correct

```js
// Good: Alphabetically sorted without defaults
const { a, b, c, d } = foo;
```

```js
// Good: Defaults first (sorted alphabetically), then non-defaults
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
// Good: Mixed default types sorted alphabetically, then non-defaults alphabetically
const { active = true, age = 0, data = {}, name = "default", x, y, z } = foo;
```

```js
// Good: All defaults sorted alphabetically
const { a = "test", b = "value", c = 1, d = 2 } = foo;
```

```js
// Good: With rest element at end
const { a, b, ...rest } = foo;
```

```js
// Good: Defaults alphabetically sorted (autoplay, duration), then non-defaults
const { autoplay = false, duration = 5000, totalSlides } = options;
```

## When Not To Use It

If you prefer a different sorting strategy for destructured properties or don't want to enforce any particular order, you can disable this rule.

## Further Reading

- [Destructuring Assignment (MDN)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)
- [Default Parameters (MDN)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Default_parameters)
