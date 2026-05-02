---
"eslint-plugin-nextfriday": major
---

Breaking changes

- Remove `enforce-curly-newline` rule. Use ESLint's built-in `curly: "all"` instead. Consumers should add `"curly": ["error", "all"]` to their ESLint config.
- Narrow `no-inline-nested-object` to truly nested structures only. The rule now flags only inline objects and arrays whose contents include further nested objects or arrays (`{ items: [{ a: 1 }, { b: 2 }] }`, `{ layer: { inner: { leaf: 1 } } }`). Flat collections (objects of primitive properties, arrays of identifiers, member expressions, optional chains, and primitives) are now allowed inline because Prettier already controls their wrapping via `printWidth`. This eliminates the fix loop with Prettier on cases like `{ allow: [target.utils, target.types, target.constants] }`.

New rules

- Add `prefer-props-with-children`. Reports interfaces, type aliases, and inline parameter types that declare a `children: ReactNode` (or `React.ReactNode`) field, recommending `PropsWithChildren<T>` instead. Matches both required and optional `children`, and skips other shapes such as `ReactElement`, render-prop functions, and unions like `ReactNode | string`. Included in `react` and `nextjs` presets.
- Add `prefer-interface-for-component-props`. Reports `type` aliases ending with `Props` whose body is an object literal in `.tsx` and `.jsx` files, and auto-fixes them to `interface` declarations. Type aliases with intersections, unions, or non-object bodies are left alone. Included in `react` and `nextjs` presets.

Fixes

- `prefer-import-type` now skips imports that contain inline `type` markers (for example, `import { type Foo } from "x"`), deferring to `no-inline-type-import` for those cases. Eliminates duplicate diagnostics and conflicting auto-fixes.
- `prefer-named-param-types` now skips React component functions with a single non-destructured `Identifier` parameter, deferring to `prefer-interface-over-inline-types`. Eliminates duplicate diagnostics on `function Comp(props: { name: string })`.
