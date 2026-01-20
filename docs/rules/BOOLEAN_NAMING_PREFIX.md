# boolean-naming-prefix

Enforce boolean variables and parameters to have a prefix like is, has, should, can, did, will for better readability.

## Rule Details

This rule enforces that boolean variables and parameters use a descriptive prefix that makes them read like English sentences. Variables like `open`, `valid`, `user` are ambiguous - it's unclear whether they represent a value or a state. Boolean prefixes make the intent clear.

**Recommended prefixes:** `is`, `has`, `should`, `can`, `did`, `will`, `was`, `are`, `does`, `had`

**Incorrect** code for this rule:

```typescript
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

**Correct** code for this rule:

```typescript
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

## Benefits

- **Self-documenting code**: Boolean intent is immediately clear
- **Reads like English**: `if (isActive)` reads as "if is active"
- **Reduced ambiguity**: `user = false` vs `hasUser = false` - the latter is clear
- **Consistent codebase**: Enforces uniform boolean naming across the project
- **Better code review**: Reviewers can quickly understand boolean logic

## When Not To Use

- When working with external APIs that return boolean fields with different naming conventions
- In mathematical or scientific code where single-letter variables are conventional
- When interfacing with legacy code that would require extensive refactoring

## Configuration

This rule has no configuration options.

## Related Rules

- [no-single-char-variables](./NO_SINGLE_CHAR_VARIABLES.md) - Disallows single character variable names
- [@typescript-eslint/naming-convention](https://typescript-eslint.io/rules/naming-convention/) - More comprehensive naming convention rule
