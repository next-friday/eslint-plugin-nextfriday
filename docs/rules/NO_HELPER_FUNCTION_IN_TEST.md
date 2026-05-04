# no-helper-function-in-test

Disallow helper function definitions in test files.

## Rule Details

Test files should contain only pure test code — `describe`, `it`, `test`, `beforeEach`, and similar test runner constructs. Helper functions defined at the top level of a test file are utility code that belongs in a separate file and should be imported.

### Why?

When helper functions are defined inside test files, they become invisible to other tests and are harder to maintain, test independently, and reuse. Keeping test files free of utility logic makes them easier to read and reason about.

## Examples

### Incorrect

```ts
function findTemplateFiles(directory: string): string[] {
  // ...
}

const extractImports = (source: string): string[] => {
  // ...
};

describe("template imports", () => {
  it("must only import from allowed paths", () => {
    // ...
  });
});
```

### Correct

```ts
import { findTemplateFiles, extractImports } from "./test-utils";

describe("template imports", () => {
  it("must only import from allowed paths", () => {
    // ...
  });
});
```

## What This Rule Checks

- Top-level `function` declarations
- Top-level `const`/`let`/`var` declarations assigned an arrow function or function expression

Constants that are not functions (regex patterns, arrays, objects) are allowed.

## Exceptions

Functions declared inside `describe`, `it`, `test`, `beforeEach`, or other callback bodies are not flagged.

## When Not To Use It

Disable this rule for files that are intentionally test utility modules (e.g., `test-utils.ts`, `helpers.ts`) rather than test suite files.

This rule should be scoped to test files using the ESLint `files` glob:

```js
{
  files: ["**/*.test.ts", "**/*.spec.ts", "**/*.test.tsx", "**/*.spec.tsx"],
  rules: {
    "nextfriday/no-helper-function-in-test": "error",
  },
}
```
