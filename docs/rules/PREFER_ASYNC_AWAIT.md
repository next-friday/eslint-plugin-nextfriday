# prefer-async-await

Enforce async/await over `.then()` promise chains for better readability and error handling.

## Rule Details

This rule flags the use of `.then()` method calls and encourages using async/await syntax instead.

### Why?

- **Readability**: Async/await reads like synchronous code, making it easier to follow the flow
- **Error Handling**: try/catch blocks are more intuitive than `.catch()` chains
- **Debugging**: Stack traces are clearer with async/await
- **Maintainability**: Easier to add intermediate steps or modify logic

## Examples

### ❌ Incorrect

```typescript
fetch(url)
  .then((res) => res.json())
  .then((data) => setData(data));

api.get("/users").then((response) => {
  return response.data;
});

fetchData().then(handleSuccess).catch(handleError);

promise.then(step1).then(step2).then(step3);
```

### ✅ Correct

```typescript
async function fetchData() {
  const res = await fetch(url);
  const data = await res.json();
  setData(data);
}

async function getUsers() {
  const response = await api.get("/users");
  return response.data;
}

async function handleFetch() {
  try {
    const result = await fetchData();
    handleSuccess(result);
  } catch (error) {
    handleError(error);
  }
}

async function processSteps() {
  const result1 = await step1(promise);
  const result2 = await step2(result1);
  const result3 = await step3(result2);
}
```

## When Not To Use It

- If you're working with legacy code that heavily uses promises
- If you need to use specific Promise methods like `Promise.race()` or `Promise.any()` in certain patterns
- If you're writing library code that needs to return promises without async functions

## Related Rules

- [promise/prefer-await-to-then](https://github.com/eslint-community/eslint-plugin-promise/blob/main/docs/rules/prefer-await-to-then.md)
