# enforce-camel-case

Enforce camelCase for variables and functions, ban snake_case, and restrict PascalCase to React components.

## Rule Details

This rule enforces consistent naming conventions across your codebase:

- Variables and functions must use camelCase
- snake_case is banned for all variable and function declarations
- PascalCase is reserved exclusively for React components (functions that return JSX)

Global static constants are not checked by this rule. Use `enforce-constant-case` for those.

### Why?

Consistent naming conventions reduce cognitive load. When PascalCase is reserved for components and camelCase is used for everything else, the name alone tells you what something is.

## Examples

### Incorrect

```ts
// snake_case variables
let current_index = 0;
const first_name = "John";

// snake_case functions
function calculate_total() {
  return 0;
}

// PascalCase for non-component functions
const CalculateTotal = () => 0;
const FormatDate = (date: string) => date;
```

### Correct

```ts
// camelCase variables
let currentIndex = 0;
const firstName = "John";

// camelCase functions
function calculateTotal() { return 0; }
const formatDate = (date: string) => date;

// PascalCase for React components
const ArticleCard = () => <div />;
const WrappedComponent = memo(() => <div />);
const LazyPage = lazy(() => import("./Page"));
```

## Exceptions

- Global static constants (handled by `enforce-constant-case`)
- SCREAMING_SNAKE_CASE variables (handled by `no-misleading-constant-case`)
- React components wrapped with `memo`, `forwardRef`, or `lazy`

## When Not To Use It

If your project does not follow the convention that PascalCase is reserved for React components.

## Related Rules

- [enforce-constant-case](ENFORCE_CONSTANT_CASE.md) - Enforces SCREAMING_SNAKE_CASE for global static constants
- [no-misleading-constant-case](NO_MISLEADING_CONSTANT_CASE.md) - Disallows SCREAMING_SNAKE_CASE in local scope
