---
"eslint-plugin-nextfriday": minor
---

add four JSX rules that target a single anti-pattern: component files acting as content / type / naming dumping grounds. The `.tsx` and `.jsx` file is meant to describe one component's render — data, sub-types, and helper render-fragments belong elsewhere or under a clearer name.

- `jsx-no-data-array` flags top-level `const` declarations whose initializer is an array literal containing object literals — including `as const` and `satisfies` variants and exported declarations. Arrays of primitives are unaffected. The shape is a strong signal of fixture / seed / content data, which belongs in a sibling `*.data.ts` module.

- `jsx-no-data-object` flags top-level `const` declarations whose initializer is an object literal that contains a nested object or a nested array of objects — including `as const` and `satisfies` variants and exported declarations. Flat maps of primitives (`{ home: "/", about: "/about" }`) are not flagged. Nested configuration / content belongs in a data module.

- `jsx-no-sub-interface` flags any top-level `interface` or `type` declaration in a `.tsx` / `.jsx` file that is not the main props type for a component declared in the same file. The "main" type is determined by the parameter type of a top-level PascalCase function or arrow component, with common wrappers (`Readonly<T>`, `Required<T>`, `Partial<T>`, `PropsWithChildren<T>`, `NoInfer<T>`) unwrapped. Sub-interfaces (e.g. `StoreCardAddressProps` referenced as a field in `StoreCardProps`) and helper unions belong in their own module — typically a sibling `*.types.ts`. Files that declare no component at all are not checked, so type-only `.tsx` modules and re-export-only files are unaffected.

- `enforce-render-naming` flags variables declared inside a top-level PascalCase component whose initializer holds or returns JSX, but whose name does not start with `render` followed by a camelCase boundary. Detected JSX-producing initializers include `JSXElement` / `JSXFragment` literals, conditional and logical expressions whose branch is JSX, arrays of JSX, arrow / function expressions whose body returns JSX, `.map` / `.flatMap` / `.filter` calls whose callback returns JSX, and `as` / `satisfies` wrappers around any of the above. Both value form (`const renderHeader = <div />`) and function form (`const renderHeader = () => <div />`) satisfy the rule — the convention checks intent via the prefix, not the shape.

All four rules ship in the `react`, `react/recommended`, `nextjs`, and `nextjs/recommended` presets at `warn` and `error` severity respectively. Total rule count is now 63 (40 base + 23 JSX). None of the new rules are auto-fixable: each surfaces a structural decision (where to put the data, where to put the type, what to name the fragment) that the author should make explicitly.
