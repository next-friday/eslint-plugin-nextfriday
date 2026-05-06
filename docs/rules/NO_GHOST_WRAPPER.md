# no-ghost-wrapper

Disallow bare `<div>` and `<span>` elements that have no meaningful attributes.

## Rule Details

This rule flags `<div>` and `<span>` elements that carry zero meaningful attributes — the "ghost wrapper" anti-pattern (also called "Divitis"). These elements add depth to the DOM tree without contributing semantics, styling, behavior, accessibility hooks, or test hooks.

The `key` prop alone does not count as meaningful: `key` is a React-only signal for list reconciliation and carries no structural intent.

### Why?

- **Semantic clarity**: A wrapper without attributes signals that the author has not decided whether the element is structural, presentational, or semantic.
- **DOM bloat**: Empty wrappers extend the DOM tree, increasing layout work and accessibility-tree noise.
- **Cognitive load**: Reviewers must guess whether a bare wrapper is intentional or a leftover from refactoring.
- **Better alternatives exist**: Fragments (`<>...</>`), semantic elements (`<section>`, `<article>`, `<header>`, `<nav>`), or simply unwrapping the children.

## Examples

### Incorrect

```tsx
<div>x</div>
<span>text</span>
<div></div>
<div> </div>
<div />
<span />
<div key={item.id}>x</div>
<div>{children}</div>
```

### Correct

```tsx
<div className="container">x</div>
<div data-testid="root">x</div>
<div role="button">x</div>
<div aria-label="close">x</div>
<div ref={ref}>x</div>
<div onClick={handleClick}>x</div>
<div id="anchor">x</div>
<div style={{ color: "red" }}>x</div>
<div {...props}>x</div>
<div tabIndex={0}>x</div>
<section>x</section>
<article>x</article>
<>x</>
```

## What This Rule Checks

The rule fires on a `<div>` or `<span>` opening element when, after filtering out a lone `key` attribute, it has zero remaining attributes (including spread attributes). Self-closing elements (`<div />`, `<span />`) are checked the same way.

Any of the following attributes count as meaningful and silence the rule:

- `className`
- `style`
- `id`
- `ref`
- `role`
- `aria-*`
- `data-*`
- `tabIndex`
- Event handlers (`onClick`, `onChange`, etc.)
- Spread attributes (`{...props}`)
- Any other JSX attribute except `key`

## When Not To Use It

If your codebase intentionally uses bare `<div>` and `<span>` as structural placeholders, or if you rely on parent CSS selectors that target a fixed wrapper depth.
