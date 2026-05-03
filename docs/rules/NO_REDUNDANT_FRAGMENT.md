# no-redundant-fragment

Disallow Fragments that wrap zero or one child.

## Rule Details

This rule flags Fragments (`<>...</>`, `<Fragment>...</Fragment>`, `<React.Fragment>...</React.Fragment>`) that wrap zero or one child. A Fragment is only justified when grouping multiple sibling nodes, or when a `key` prop is required during list iteration.

A Fragment with a single child is structurally equivalent to that child alone. An empty Fragment renders nothing and adds noise to the source.

### Why?

- **Source clarity**: A Fragment around a single child is dead syntax — it tells the reader nothing.
- **Less noise in the AST**: Devtools, search, and codemods do not have to step over an extra layer.
- **Forces a decision**: Either the children are siblings (Fragment is the right tool) or they are not (drop it).

## Examples

### Incorrect

```tsx
<></>
<>{x}</>
<><A /></>
<>text</>
<Fragment>x</Fragment>
<React.Fragment>{x}</React.Fragment>
<React.Fragment></React.Fragment>
```

### Correct

```tsx
<>{a}{b}</>
<><A /><B /></>
<Fragment>{a}{b}</Fragment>
<React.Fragment>{a}{b}</React.Fragment>

// key is the legitimate reason to use long-form Fragment:
<React.Fragment key={item.id}>{item.label}{item.value}</React.Fragment>
<Fragment key={k}>{x}</Fragment>
```

## What This Rule Checks

A Fragment is flagged when its meaningful children count is `0` or `1`. JSX text nodes that contain only whitespace are not counted as children.

The rule does not fire on a long-form Fragment (`<Fragment>` or `<React.Fragment>`) that carries a `key` attribute — `key` is the canonical reason long-form Fragment exists, since the shorthand `<>...</>` cannot accept attributes.

## When Not To Use It

If your codebase uses single-child Fragments to keep diffs stable around conditionally-rendered siblings, or if you rely on a build-time transform that depends on the Fragment wrapper.

## Related Rules

- [no-ghost-wrapper](NO_GHOST_WRAPPER.md)
