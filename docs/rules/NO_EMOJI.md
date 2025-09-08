# no-emoji

Disallow emoji characters in source code.

## Rule Details

This rule prevents the use of emoji characters in JavaScript and TypeScript source code. Emoji characters can cause encoding issues, make code harder to read on certain systems, and may not be supported in all environments.

## Examples

**Incorrect** code for this rule:

```js
const message = "Hello 🌍 world";
const greeting = "Hi there! 👋";
// Comment with emoji 😀
const celebration = "🎉 Party time! 🎊";
```

**Correct** code for this rule:

```js
const message = "Hello world";
const greeting = "Hi there!";
// Comment without emoji
const celebration = "Party time!";
```

## When Not To Use It

If your team explicitly wants to allow emoji characters in source code and has no concerns about encoding or compatibility issues, you can disable this rule.
