# enforce-test-filename

Enforce that files containing test code are named `*.test.ts` or `*.test.tsx`.

## Rule Details

Any file that calls test runner globals (`describe`, `it`, `test`, `beforeEach`, `beforeAll`, `afterEach`, `afterAll`) must have a `.test.ts` or `.test.tsx` suffix. Files named `*.spec.ts` or any other pattern are not allowed.

### Why?

Consistent naming makes test files predictable to find and reliable to target with `files` globs in ESLint configs (e.g. `no-helper-function-in-test`). Mixing `.spec.ts` and `.test.ts` breaks glob-based scoping.

## Examples

### Incorrect

```ts
// user.spec.ts ❌
describe("user", () => {
  it("works", () => {});
});
```

```ts
// user-tests.ts ❌
it("works", () => {});
```

### Correct

```ts
// user.test.ts ✅
describe("user", () => {
  it("works", () => {});
});
```

```ts
// UserCard.test.tsx ✅
test("renders", () => {});
```

## What This Rule Checks

Files that contain calls to any of the following globals trigger the requirement:

`describe`, `it`, `test`, `beforeEach`, `beforeAll`, `afterEach`, `afterAll`

Only one error is reported per file regardless of how many test calls are present.

## Exceptions

Files already named `*.test.ts` or `*.test.tsx` are skipped entirely.

## When Not To Use It

Disable if your project intentionally uses `.spec.ts` as the test file convention.

## Related Rules

- [no-helper-function-in-test](./NO_HELPER_FUNCTION_IN_TEST.md) — disallows helper functions inside test files
