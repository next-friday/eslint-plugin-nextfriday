# file-kebab-case

Enforce kebab-case filenames for .ts and .js files.

## Rule Details

This rule enforces that all TypeScript (.ts) and JavaScript (.js) files use kebab-case naming convention for their **filenames**. Kebab-case uses lowercase letters and hyphens to separate words, making filenames more consistent and URL-friendly.

**This rule checks the filename, not the code content.**

## Examples

**Incorrect** filenames for this rule:

- `MyFile.ts` (PascalCase)
- `camelCase.js` (camelCase)
- `PascalCase.ts` (PascalCase)
- `snake_case.js` (snake_case)
- `UPPERCASE.ts` (UPPERCASE)
- `My File.js` (contains spaces)

**Correct** filenames for this rule:

- `my-file.ts`
- `kebab-case.js`
- `single.ts`
- `file-with-numbers-123.js`
- `user-service.ts`
- `api-utils.ts`

## Code Examples

The content of the file doesn't matter - only the filename is checked:

```typescript
// INCORRECT: File: MyFile.ts (incorrect filename)
function myFunction() {
  return "Hello World";
}

export { myFunction };
```

```typescript
// CORRECT: File: my-file.ts (correct filename)
function myFunction() {
  return "Hello World";
}

export { myFunction };
```

```javascript
// INCORRECT: File: UserService.js (incorrect filename)
class UserService {
  getUser() {
    return {};
  }
}

export { UserService };
```

```javascript
// CORRECT: File: user-service.js (correct filename)
class UserService {
  getUser() {
    return {};
  }
}

export { UserService };
```

## When Not To Use It

If your project has established naming conventions that conflict with kebab-case, or if you're working with frameworks that require specific filename patterns, you may want to disable this rule.

## Notes

- This rule only applies to `.ts` and `.js` files
- Other file types (`.jsx`, `.tsx`, `.json`, etc.) are ignored
- Single word filenames are considered valid kebab-case
