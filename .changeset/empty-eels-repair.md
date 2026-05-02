---
"eslint-plugin-nextfriday": major
---

Breaking changes

- Remove `enforce-curly-newline` rule. Use ESLint's built-in `curly: "all"` instead. Consumers should add `"curly": ["error", "all"]` to their ESLint config.
- Narrow `no-inline-nested-object` to truly nested structures only. Flat collections (objects of primitive properties, arrays of identifiers/member expressions/primitives) are now allowed inline because Prettier already controls their wrapping via `printWidth`. Eliminates the fix loop with Prettier on cases like `{ allow: [target.utils, target.types, target.constants] }`.

New rules

- Add `prefer-props-with-children`. Reports `children: ReactNode` declarations and recommends `PropsWithChildren<T>`. Included in `react` and `nextjs` presets.
- Add `prefer-interface-for-component-props`. Auto-fixes `type FooProps = {...}` to `interface FooProps {...}` in `.tsx` and `.jsx` files. Included in `react` and `nextjs` presets.

Fixes

- `prefer-import-type` skips imports with inline `type` markers, deferring to `no-inline-type-import`.
- `prefer-named-param-types` skips React component functions with single non-destructured `Identifier` param, deferring to `prefer-interface-over-inline-types`.
