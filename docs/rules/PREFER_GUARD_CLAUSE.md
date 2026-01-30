# prefer-guard-clause

Enforce guard clause pattern instead of nested if statements.

## Rule Details

Nested if statements increase code complexity and make it harder to read. This rule enforces the "guard clause" pattern using early returns.

## Examples

### ❌ Incorrect

```tsx
function process(data) {
  if (data) {
    if (data.items) {
      return data.items.map(toItem);
    }
  }
  return [];
}

function validate(user) {
  if (user) {
    if (user.isAdmin) {
      return adminDashboard();
    }
  }
  return null;
}
```

### ✅ Correct

```tsx
function process(data) {
  if (!data) return [];
  if (!data.items) return [];
  return data.items.map(toItem);
}

function validate(user) {
  if (!user) return null;
  if (!user.isAdmin) return null;
  return adminDashboard();
}
```

## Why Guard Clauses?

1. **Reduced nesting** - Flatter code is easier to read
2. **Clear exit points** - Failures are handled immediately
3. **Better readability** - The "happy path" flows naturally
4. **Easier maintenance** - Adding conditions doesn't increase indentation

## When Not To Use It

- If you have complex branching logic where guard clauses don't apply naturally
- Legacy codebases with many nested conditions
