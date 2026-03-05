# jsx-pascal-case

Enforce PascalCase filenames for .jsx and .tsx files.

## Rule Details

This rule enforces that JSX and TSX files use PascalCase naming convention for their **filenames**. This is a common pattern in React applications where components are typically named with PascalCase.

**This rule checks the filename, not the code content.**

## Examples

### Incorrect

- `my-component.jsx` (kebab-case)
- `userProfile.jsx` (camelCase)
- `user_profile.tsx` (snake_case)
- `component.jsx` (lowercase)
- `MYCOMPONENT.tsx` (UPPERCASE)
- `My Component.jsx` (contains spaces)
- `My.Component.tsx` (contains dots)

### Correct

- `MyComponent.jsx`
- `UserProfile.tsx`
- `App.jsx`
- `LoginForm.tsx`
- `UserProfile2.jsx` (PascalCase with numbers)

## When Not To Use It

If your project uses different naming conventions for JSX/TSX files, you can disable this rule.

## Related Rules

- [file-kebab-case](./FILE_KEBAB_CASE.md) - For regular TypeScript and JavaScript files
