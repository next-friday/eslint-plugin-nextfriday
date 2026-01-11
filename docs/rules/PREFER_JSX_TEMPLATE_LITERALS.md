# prefer-jsx-template-literals

Enforce using template literals instead of mixing text and JSX expressions.

## Rule Details

This rule prevents mixing plain text with JSX expressions in JSX elements, which can lead to incorrect spacing and readability issues. Instead, it enforces using template literals to combine text and expressions.

### Why?

Mixing text and JSX expressions without proper spacing can cause:

1. **Spacing issues**: `<div>+ {value}</div>` renders as "+ value" with unexpected spacing
2. **Inconsistent formatting**: Hard to maintain consistent spacing across the codebase
3. **Readability problems**: Mixed syntax makes code harder to read and understand

Using template literals ensures:

- Explicit control over spacing
- Consistent formatting
- Better readability
- Easier to maintain

## Examples

### ❌ Incorrect

```tsx
// Bad: Text followed by expression
<div>+ {fooVariable}</div>
<div>+{fooVariable}</div>
<div>Price: {price}</div>
<div>$ {amount}</div>
<span>Total: {total}</span>
<p>Hello {name}</p>

// Bad: Expression followed by text
<div>{count} items</div>
<div>{price}$</div>
```

### ✅ Correct

```tsx
// Good: Using template literals
<div>{`+${fooVariable}`}</div>
<div>{`+ ${fooVariable}`}</div>
<div>{`Price: ${price}`}</div>
<div>{`$ ${amount}`}</div>
<span>{`Total: ${total}`}</span>
<p>{`Hello ${name}`}</p>

// Good: Using template literals for expression + text
<div>{`${count}items`}</div>
<div>{`${price}$`}</div>

// Good: Expression only
<div>{fooVariable}</div>
<div>{price}</div>

// Good: Text only
<div>Some static text</div>

// Good: Expression with whitespace only around it
<div>  {fooVariable}  </div>
<div>
  {fooVariable}
</div>
```

## When Not To Use It

If you prefer mixing text and JSX expressions, you can disable this rule. However, this may lead to inconsistent spacing and formatting issues.

## Further Reading

- [Template Literals (MDN)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals)
- [JSX in React](https://react.dev/learn/writing-markup-with-jsx)
