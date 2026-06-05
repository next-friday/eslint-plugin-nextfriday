---
"eslint-plugin-nextfriday": major
---

Introduce a symmetric callable-last sort family and remove the `nextjs` presets.

Breaking changes:

- Removed the `nextjs` and `nextjs/recommended` presets. Use `react` and `react/recommended`, which already cover the full rule set.
- `enforce-sorted-destructuring` and `sort-type-alphabetically` now require type information (enable typed linting, e.g. `parserOptions.projectService: true`). Both now order callable (function-typed) members last, after non-callable members, within their existing groups.
- `prefer-props-with-children` now also reports required `children` (not only optional) and `children` typed as a `ReactNode` array or a union whose members are all `ReactNode`-like (e.g. `ReactNode | ReactNode[]`). Replacing a required `children: ReactNode` with `PropsWithChildren` makes it optional.

New rules:

- `sort-object-properties` (type-aware, fixable): sort object literal properties with non-callable members first and callable members last.
- `sort-dependency-array` (type-aware, fixable): sort hook dependency arrays (the last argument of `use*` calls) with callable dependencies last.
- `prefer-body-destructuring`: destructure a single object parameter in the function body instead of the signature.

Callable detection is based on the resolved type, so handlers typed through aliases or indexed access (e.g. `ComponentProps<typeof Button>["onPress"]`) are recognized consistently across object literals, destructuring, type members, and dependency arrays.
