# jsx-pascal-case

Enforce PascalCase filenames for .jsx and .tsx files.

## Rule Details

This rule enforces that JSX and TSX files use PascalCase naming convention for their **filenames**. This is a common pattern in React applications where components are typically named with PascalCase.

**This rule checks the filename, not the code content.**

## Examples

**Incorrect** filenames for this rule:

- `my-component.jsx` (kebab-case)
- `userProfile.jsx` (camelCase)
- `user_profile.tsx` (snake_case)
- `component.jsx` (lowercase)
- `MYCOMPONENT.tsx` (UPPERCASE)
- `My Component.jsx` (contains spaces)
- `My.Component.tsx` (contains dots)

**Correct** filenames for this rule:

- `MyComponent.jsx`
- `UserProfile.tsx`
- `App.jsx`
- `LoginForm.tsx`
- `UserProfile2.jsx` (PascalCase with numbers)

## Code Examples

The content of the file doesn't matter - only the filename is checked:

```jsx
// INCORRECT: File: my-component.jsx (incorrect filename)
export default function MyComponent() {
  return <div>Hello</div>;
}
```

```jsx
// CORRECT: File: MyComponent.jsx (correct filename)
export default function MyComponent() {
  return <div>Hello</div>;
}
```

```tsx
// INCORRECT: File: user-profile.tsx (incorrect filename)
export default function UserProfile() {
  return <div>Profile</div>;
}
```

```tsx
// CORRECT: File: UserProfile.tsx (correct filename)
export default function UserProfile() {
  return <div>Profile</div>;
}
```

## When Not To Use

If your project uses different naming conventions for JSX/TSX files, you can disable this rule.

## Related Rules

- [file-kebab-case](./FILE_KEBAB_CASE.md) - For regular TypeScript and JavaScript files
