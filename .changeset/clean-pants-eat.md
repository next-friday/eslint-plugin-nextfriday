---
"eslint-plugin-nextfriday": minor
---

add two JSX rules targeting unnecessary wrapper noise (the "Divitis" anti-pattern):

- `no-ghost-wrapper` flags bare `<div>` / `<span>` elements that carry no meaningful attributes. Self-closing variants are checked the same way. The `key` prop alone does not silence the rule, since `key` carries no structural intent. Any other attribute — `className`, `style`, `id`, `ref`, `role`, `aria-*`, `data-*`, `tabIndex`, event handlers, or spread attributes — is considered meaningful and lets the element pass.
- `no-redundant-fragment` flags Fragments (`<>...</>`, `<Fragment>`, `<React.Fragment>`) that wrap zero or one child. JSX text consisting only of whitespace is not counted. Long-form Fragments carrying a `key` attribute are exempt, since `key` is the canonical reason long-form Fragment exists (the shorthand `<>...</>` cannot accept attributes).

Both rules are report-only — no autofix is provided so authors retain control over which structural alternative (Fragment, semantic element, unwrapping the children) best fits the surrounding code. Both are added to the JSX rule tier and ship in the `react`, `react/recommended`, `nextjs`, and `nextjs/recommended` presets at `warn` and `error` severity respectively.
