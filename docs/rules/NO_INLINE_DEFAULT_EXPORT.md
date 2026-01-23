# no-inline-default-export

Disallow inline default exports. Prefer declaring first, then exporting separately.

## Rule Details

This rule enforces separating function/class declarations from their default exports. Instead of combining declaration and export in a single statement, declare the function or class first, then export it by reference.

This pattern improves code readability and makes it easier to identify what a module exports at a glance.

## Examples

### Incorrect

```typescript
// Inline function default export
export default function generator(plop: PlopTypes.NodePlopAPI): void {
  // ...
}

// Inline class default export
export default class MyService {
  // ...
}

// Anonymous function default export
export default function () {
  return "anonymous";
}

// Arrow function default export
export default () => "arrow";

// Anonymous class default export
export default class {
  // ...
}
```

### Correct

```typescript
// Separate function declaration and export
function generator(plop: PlopTypes.NodePlopAPI): void {
  // ...
}

export default generator;

// Separate class declaration and export
class MyService {
  // ...
}

export default MyService;

// Separate const arrow function and export
const processData = (data: Data): Result => {
  // ...
};

export default processData;

// Exporting literals and objects is allowed
export default "literal";
export default { key: "value" };

// Re-exports are allowed
export { foo as default } from "./foo";
```

## When Not To Use

If your project prefers inline default exports for brevity, or if you're working with frameworks that expect specific export patterns, you may want to disable this rule.

## Related Rules

- [prefer-function-declaration](./PREFER_FUNCTION_DECLARATION.md) - Prefer function declarations over expressions
