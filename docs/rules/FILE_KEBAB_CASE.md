# file-kebab-case

Enforce kebab-case filenames for .ts and .js files.

## Rule Details

This rule enforces that all TypeScript (.ts) and JavaScript (.js) files use kebab-case naming convention for their **filenames**. Kebab-case uses lowercase letters and hyphens to separate words, making filenames more consistent and URL-friendly. Single word filenames are considered valid kebab-case.

**This rule checks the filename, not the code content.** Only `.ts` and `.js` files are checked; other file types are ignored.

## Examples

### Incorrect

- `MyFile.ts` (PascalCase)
- `camelCase.js` (camelCase)
- `PascalCase.ts` (PascalCase)
- `snake_case.js` (snake_case)
- `UPPERCASE.ts` (UPPERCASE)
- `My File.js` (contains spaces)

### Correct

- `my-file.ts`
- `kebab-case.js`
- `single.ts`
- `file-with-numbers-123.js`
- `user-service.ts`
- `api-utils.ts`

## When Not To Use It

If your project has established naming conventions that conflict with kebab-case, or if you're working with frameworks that require specific filename patterns, you may want to disable this rule.
