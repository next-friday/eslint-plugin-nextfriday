# enforce-curly-newline

Enforce curly braces for multi-line if statements and forbid them for single-line.

## Rule Details

This rule manages curly braces for `IfStatement` based on visual layout (line breaks). Designed to work seamlessly with Prettier's line wrapping.

### Logic

1. **Single-line** (`startLine === endLine`): Braces are **forbidden**
2. **Multi-line** (`startLine !== endLine`): Braces are **required**

## Examples

### Incorrect

```ts
if (!data) {
  return [];
}
if (x > 0) {
  doSomething();
}
```

```ts
if (veryLongCondition && anotherCondition) return [];
```

### Correct

```ts
if (!data) return [];
if (x > 0) doSomething();
```

```ts
if (veryLongCondition && anotherCondition) {
  return [];
}
```

## Auto-Fix

This rule provides automatic fixes:

- **Single-line with braces** → Removes braces (only when block contains single statement)
- **Multi-line without braces** → Adds braces with proper indentation

## When Not To Use It

- If you prefer always using braces regardless of line count
- If you prefer never using braces
- If using a formatter that conflicts with this rule
