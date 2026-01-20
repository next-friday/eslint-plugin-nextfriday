# no-lazy-identifiers

Disallow lazy, meaningless variable names that hurt code readability.

## Rule Details

This rule enforces meaningful variable names by detecting and disallowing lazy identifiers. It uses pattern-based detection to find repeated characters and keyboard sequences.

**Incorrect** code for this rule:

```typescript
const xxx = "value";
const yyy = 123;
const zzz = true;
const aaa = [];

const asdf = "keyboard pattern";
const qwerty = "another pattern";

function xxx() {
  return 1;
}

const fn = (xxx) => xxx * 2;

class aaaa {}

const { xxx } = obj;
const [aaa, bbb] = array;
```

**Correct** code for this rule:

```typescript
const userName = "john";
const itemCount = 123;
const isActive = true;
const items = [];

const keyboardType = "mechanical";
const inputLayout = "us";

function calculateTotal() {
  return 1;
}

const double = (value) => value * 2;

class UserService {}

const { name } = obj;
const [first, second] = array;
```

## Detection Patterns

The rule detects two types of lazy patterns:

### Repeated Characters (3+)

Variables with 3 or more consecutive identical characters:

- `xxx`, `aaa`, `zzz`, `qqqq`, `aaaa`

### Keyboard Sequences (4+)

Variables containing 4 or more consecutive keyboard row characters:

- `asdf`, `qwerty`, `zxcv`, `hjkl`, `1234`
- Also detects reversed sequences: `fdsa`, `lkjh`
- Detects sequences embedded in names: `myAsdfVar`

## Exceptions

### Short Identifiers

Identifiers shorter than 3 characters are ignored (use `no-single-char-variables` for those).

### Underscore-Prefixed

Variables starting with `_` are allowed (commonly used for unused variables):

```typescript
const _unused = getValue();
```

## Benefits

- **Readable code**: Meaningful names make code self-documenting
- **Maintainability**: Other developers can understand the purpose of variables
- **Professionalism**: Clean code reflects well on the team
- **Debugging**: Clear names make debugging easier

## When Not To Use

- In test files where placeholder data is acceptable
- When working with legacy code that would be disruptive to change

## Configuration

This rule has no configuration options.

## Related Rules

- [no-single-char-variables](./NO_SINGLE_CHAR_VARIABLES.md) - Disallows single character variable names
- [boolean-naming-prefix](./BOOLEAN_NAMING_PREFIX.md) - Enforces naming conventions for boolean variables
