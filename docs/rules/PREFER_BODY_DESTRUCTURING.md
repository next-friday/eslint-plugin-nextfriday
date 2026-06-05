# prefer-body-destructuring

Destructure a single object parameter in the function body instead of the signature.

## Rule Details

When a function (a function declaration, or an arrow/function expression assigned to a variable) takes exactly one parameter and that parameter is destructured in the signature, this rule reports it. The parameter should be a single named identifier, and the destructuring should happen on the first line of the body.

Inline callbacks (functions passed directly as call arguments, such as `items.map(({ id }) => id)`) are not reported. Functions with more than one parameter are out of scope; that case belongs to `prefer-destructuring-params`.

### Why?

Keeping the parameter as a named identifier keeps the signature short, keeps the whole object available for forwarding or logging, and groups field extraction on one line, which produces cleaner diffs when fields are added or removed.

## Examples

### Incorrect

```tsx
const C = ({ children }: Readonly<Props>) => <X>{children}</X>;
```

```tsx
const C = ({ children, className }: Readonly<Props>) => <X className={className}>{children}</X>;
```

### Correct

```tsx
const C = (props: Readonly<Props>) => {
  const { children, className } = props;

  return <X className={className}>{children}</X>;
};
```

```tsx
const C = (props: Readonly<Props>) => props.children;
```

## When Not To Use It

- If your team prefers destructuring parameters in the signature.

## Related Rules

- [prefer-destructuring-params](./PREFER_DESTRUCTURING_PARAMS.md) - Enforce destructuring for functions with multiple parameters.
