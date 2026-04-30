# boolean-naming-prefix

Enforce boolean variables and parameters to have a prefix like is, has, should, can, did, will for better readability.

## Rule Details

This rule enforces that boolean variables and parameters use a descriptive prefix that makes them read like English sentences. Variables like `open`, `valid`, `user` are ambiguous - it's unclear whether they represent a value or a state. Boolean prefixes make the intent clear.

**Recommended prefixes:** `is`, `has`, `should`, `can`, `did`, `will`, `was`, `are`, `does`, `had`

## Examples

### Incorrect

```ts
const valid = true;
const user = false;
const open = true;
const closed = false;
const active: boolean = true;
const enabled: boolean = checkEnabled();

const equal = a === b;
const different = a !== b;
const bigger = a > b;
const negated = !value;
const combined = a && b;
const either = a || b;

function process(active: boolean) {}
const fn = (enabled: boolean) => {};
function toggle(active = true) {}
```

### Correct

```ts
const isValid = true;
const hasUser = false;
const isOpen = true;
const isClosed = false;
const isActive: boolean = true;
const isEnabled: boolean = checkEnabled();

const isEqual = a === b;
const isDifferent = a !== b;
const isBigger = a > b;
const isNegated = !value;
const areCombined = a && b;
const hasEither = a || b;

function process(isActive: boolean) {}
const fn = (hasAccess: boolean) => {};
function toggle(isActive = true) {}
```

## What This Rule Detects

The rule identifies boolean variables and parameters by:

1. **Boolean type annotations**: Variables explicitly typed as `boolean`
2. **Boolean literals**: Variables initialized with `true` or `false`
3. **Comparison expressions**: `===`, `!==`, `==`, `!=`, `<`, `>`, `<=`, `>=`, `in`, `instanceof`
4. **Logical expressions**: `&&`, `||`
5. **Negation**: `!value`
6. **Function parameters**: With boolean type annotation or default boolean value

## Allowed Prefixes

| Prefix   | Usage                         | Example                                       |
| -------- | ----------------------------- | --------------------------------------------- |
| `is`     | State or condition            | `isActive`, `isValid`, `isLoading`            |
| `has`    | Possession or existence       | `hasUser`, `hasPermission`, `hasError`        |
| `can`    | Ability or permission         | `canSubmit`, `canEdit`, `canDelete`           |
| `should` | Recommendation or expectation | `shouldRender`, `shouldUpdate`, `shouldFetch` |
| `will`   | Future action                 | `willUpdate`, `willRedirect`, `willExpire`    |
| `did`    | Past action                   | `didLoad`, `didSubmit`, `didFail`             |
| `was`    | Past state                    | `wasActive`, `wasVisible`, `wasProcessed`     |
| `are`    | Plural state                  | `areEqual`, `areValid`, `areLoaded`           |
| `does`   | Action capability             | `doesExist`, `doesMatch`, `doesContain`       |
| `had`    | Past possession               | `hadError`, `hadAccess`, `hadPrevious`        |

## Not Checked

To keep the rule unobtrusive on patterns that are usually shaped by external APIs or framework conventions, these locations are intentionally ignored:

- **Class methods, getters, and setters.** `class Foo { get valid() {...} }` and `class Foo { set valid(v) {...} }` are not checked.
- **Class fields (property definitions).** `class Foo { valid = true }` is not checked.
- **Object literal properties.** `{ valid: true }` and `{ open: true, closed: false }` are not checked. Object keys often mirror an external schema (API responses, config payloads, DB rows) where renaming would be incorrect.
- **Computed property names.** `{ [key]: true }` is not checked because the name is dynamic.
- **Destructuring patterns.** `const { valid } = result;` is not checked — rename at the source instead, or use a destructuring alias (`const { valid: isValid } = result;`).
- **Property access.** `if (user.valid) {}` is not checked.

If you need stricter coverage of object/class members, pair this rule with [`@typescript-eslint/naming-convention`](https://typescript-eslint.io/rules/naming-convention/), which can target `classProperty`, `objectLiteralProperty`, `accessor`, and other selectors with custom prefix patterns.

## When Not To Use It

- When working with external APIs that return boolean fields with different naming conventions
- In mathematical or scientific code where single-letter variables are conventional
- When interfacing with legacy code that would require extensive refactoring

## Related Rules

- [no-single-char-variables](./NO_SINGLE_CHAR_VARIABLES.md) - Disallows single character variable names
- [@typescript-eslint/naming-convention](https://typescript-eslint.io/rules/naming-convention/) - More comprehensive naming convention rule
