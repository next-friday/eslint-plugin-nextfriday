---
title: "Rules API"
description: "The complete 57-rule catalog exported by eslint-plugin-nextfriday, grouped by family with source files and fixability."
---

The `rules` export is a map of rule IDs to `TSESLint.RuleModule<string, readonly unknown[]>` instances. Each rule comes from a file in `src/rules/`, accepts no options, and is referenced publicly as `nextfriday/<rule-id>` inside ESLint config.

## Import Path

```ts
import { rules } from "eslint-plugin-nextfriday";
```

Source files: `src/index.ts` and `src/rules/*.ts`

## Signature

```ts
declare const rules: {
  readonly [ruleId: string]: TSESLint.RuleModule<string, readonly unknown[]>;
};
```

## Usage Example

```js
import nextfriday from "eslint-plugin-nextfriday";

export default [
  {
    plugins: {
      nextfriday,
    },
    rules: {
      "nextfriday/no-lazy-identifiers": "error",
      "nextfriday/sort-imports": "error",
      "nextfriday/enforce-readonly-component-props": "error",
    },
  },
];
```

## Rule Metadata Model

All rules share the same configuration pattern:

| Field | Type | Default | Description |
|------|------|---------|-------------|
| `schema` | `[]` | `[]` | No rule accepts custom options. |
| `defaultOptions` | `[]` | `[]` | No rule has package-defined runtime options. |
| `meta.type` | ESLint rule type | Varies | Usually `problem`, `suggestion`, or `layout`. |
| `meta.fixable` | `code`, `whitespace`, or omitted | Varies | Present only on rules that can be safely rewritten. |

## Naming Rules

| Rule ID | Type | Fixable | Description | Source |
|--------|------|---------|-------------|--------|
| `boolean-naming-prefix` | `suggestion` | No | Enforce boolean variables and parameters to use prefixes like `is`, `has`, or `should`. | `src/rules/boolean-naming-prefix.ts` |
| `enforce-camel-case` | `suggestion` | No | Enforce camelCase and restrict PascalCase to React components. | `src/rules/enforce-camel-case.ts` |
| `enforce-constant-case` | `suggestion` | No | Enforce SCREAMING_SNAKE_CASE for global static constants. | `src/rules/enforce-constant-case.ts` |
| `enforce-property-case` | `suggestion` | No | Enforce camelCase for unquoted object property keys. | `src/rules/enforce-property-case.ts` |
| `no-lazy-identifiers` | `problem` | No | Disallow meaningless variable names. | `src/rules/no-lazy-identifiers.ts` |
| `no-misleading-constant-case` | `suggestion` | No | Disallow SCREAMING_SNAKE_CASE for dynamic or non-constant values. | `src/rules/no-misleading-constant-case.ts` |
| `no-single-char-variables` | `suggestion` | No | Disallow single-character variables and parameters. | `src/rules/no-single-char-variables.ts` |

## File and Module Boundary Rules

| Rule ID | Type | Fixable | Description | Source |
|--------|------|---------|-------------|--------|
| `file-kebab-case` | `problem` | No | Enforce kebab-case names for `.ts` and `.js` files. | `src/rules/file-kebab-case.ts` |
| `jsx-pascal-case` | `problem` | No | Enforce PascalCase names for `.jsx` and `.tsx` files. | `src/rules/jsx-pascal-case.ts` |
| `no-relative-imports` | `suggestion` | No | Disallow `../` parent-directory imports. | `src/rules/no-relative-imports.ts` |
| `sort-exports` | `suggestion` | `code` | Enforce a consistent ordering of export groups. | `src/rules/sort-exports.ts` |
| `sort-imports` | `suggestion` | `code` | Enforce a consistent ordering of import groups. | `src/rules/sort-imports.ts` |

## Code-Style Rules

| Rule ID | Type | Fixable | Description | Source |
|--------|------|---------|-------------|--------|
| `enforce-curly-newline` | `layout` | `code` | Require braces for multi-line `if` statements and forbid them for single-line cases. | `src/rules/enforce-curly-newline.ts` |
| `enforce-hook-naming` | `suggestion` | No | Require a `use` prefix inside `*.hook.ts` and `*.hooks.ts` files. | `src/rules/enforce-hook-naming.ts` |
| `enforce-service-naming` | `suggestion` | No | Ban misleading async function prefixes inside `*.service.ts` files. | `src/rules/enforce-service-naming.ts` |
| `enforce-sorted-destructuring` | `suggestion` | `code` | Sort destructured properties alphabetically with defaulted properties first. | `src/rules/enforce-sorted-destructuring.ts` |
| `newline-after-multiline-block` | `layout` | `whitespace` | Require a blank line after multi-line statements. | `src/rules/newline-after-multiline-block.ts` |
| `newline-before-return` | `layout` | `whitespace` | Require a blank line before `return`. | `src/rules/newline-before-return.ts` |
| `no-complex-inline-return` | `suggestion` | No | Disallow complex inline expressions in `return` statements. | `src/rules/no-complex-inline-return.ts` |
| `no-direct-date` | `problem` | No | Ban direct `Date` usage in favor of centralized date utilities. | `src/rules/no-direct-date.ts` |
| `no-emoji` | `problem` | No | Disallow emoji characters in source code. | `src/rules/no-emoji.ts` |
| `no-env-fallback` | `problem` | No | Disallow fallback values for `process.env` access. | `src/rules/no-env-fallback.ts` |
| `no-inline-default-export` | `suggestion` | No | Require declaration before default export. | `src/rules/no-inline-default-export.ts` |
| `no-inline-nested-object` | `layout` | `whitespace` | Require nested objects and arrays to span multiple lines. | `src/rules/no-inline-nested-object.ts` |
| `no-inline-return-properties` | `suggestion` | No | Require shorthand return properties by extracting non-shorthand values first. | `src/rules/no-inline-return-properties.ts` |
| `no-logic-in-params` | `suggestion` | No | Disallow logic in function call parameters. | `src/rules/no-logic-in-params.ts` |
| `no-nested-ternary` | `suggestion` | No | Disallow nested ternary expressions. | `src/rules/no-nested-ternary.ts` |
| `prefer-async-await` | `suggestion` | No | Prefer `async` and `await` over `.then()` chains. | `src/rules/prefer-async-await.ts` |
| `prefer-destructuring-params` | `suggestion` | No | Prefer destructuring when a function takes multiple parameters. | `src/rules/prefer-destructuring-params.ts` |
| `prefer-function-declaration` | `suggestion` | No | Prefer function declarations over arrow functions assigned to variables in `.ts` files. | `src/rules/prefer-function-declaration.ts` |
| `prefer-guard-clause` | `suggestion` | No | Prefer guard clauses over nested `if` statements. | `src/rules/prefer-guard-clause.ts` |
| `require-explicit-return-type` | `suggestion` | No | Require explicit function return types. | `src/rules/require-explicit-return-type.ts` |

## TypeScript Structure Rules

| Rule ID | Type | Fixable | Description | Source |
|--------|------|---------|-------------|--------|
| `enforce-type-declaration-order` | `suggestion` | No | Require referenced types to appear after the declarations that consume them. | `src/rules/enforce-type-declaration-order.ts` |
| `no-nested-interface-declaration` | `suggestion` | No | Disallow inline object type literals in interface and type properties. | `src/rules/no-nested-interface-declaration.ts` |
| `prefer-import-type` | `suggestion` | `code` | Rewrite type-only imports to `import type`. | `src/rules/prefer-import-type.ts` |
| `prefer-inline-literal-union` | `suggestion` | `code` | Inline literal union aliases into interface properties for better hover information. | `src/rules/prefer-inline-literal-union.ts` |
| `prefer-inline-type-export` | `suggestion` | `code` | Require inline exported type and interface declarations. | `src/rules/prefer-inline-type-export.ts` |
| `prefer-named-param-types` | `suggestion` | No | Prefer named types or interfaces over inline object parameter types. | `src/rules/prefer-named-param-types.ts` |
| `sort-type-alphabetically` | `suggestion` | `code` | Sort properties alphabetically within required and optional groups. | `src/rules/sort-type-alphabetically.ts` |
| `sort-type-required-first` | `suggestion` | `code` | Place required properties before optional ones. | `src/rules/sort-type-required-first.ts` |

## React and JSX Rules

| Rule ID | Type | Fixable | Description | Source |
|--------|------|---------|-------------|--------|
| `enforce-props-suffix` | `suggestion` | No | Require `Props` suffix on component prop types in `*.tsx` files. | `src/rules/enforce-props-suffix.ts` |
| `enforce-readonly-component-props` | `suggestion` | `code` | Wrap named React prop types with `Readonly<>`. | `src/rules/enforce-readonly-component-props.ts` |
| `jsx-newline-between-elements` | `layout` | `whitespace` | Require blank lines between sibling JSX elements. | `src/rules/jsx-newline-between-elements.ts` |
| `jsx-no-inline-object-prop` | `suggestion` | No | Disallow inline object literals in JSX props. | `src/rules/jsx-no-inline-object-prop.ts` |
| `jsx-no-newline-single-line-elements` | `layout` | `whitespace` | Disallow blank lines between single-line JSX siblings. | `src/rules/jsx-no-newline-single-line-elements.ts` |
| `jsx-no-non-component-function` | `problem` | No | Disallow top-level non-component functions in JSX and TSX files. | `src/rules/jsx-no-non-component-function.ts` |
| `jsx-no-ternary-null` | `suggestion` | `code` | Prefer logical `&&` over ternaries that return `null` or `undefined` in JSX. | `src/rules/jsx-no-ternary-null.ts` |
| `jsx-no-variable-in-callback` | `suggestion` | No | Disallow variable declarations inside callback functions embedded in JSX. | `src/rules/jsx-no-variable-in-callback.ts` |
| `jsx-require-suspense` | `problem` | No | Require lazy-loaded components to be wrapped in `<Suspense>`. | `src/rules/jsx-require-suspense.ts` |
| `jsx-simple-props` | `suggestion` | No | Restrict JSX props to simple values or extracted expressions. | `src/rules/jsx-simple-props.ts` |
| `jsx-sort-props` | `suggestion` | `code` | Sort props by value-type group. | `src/rules/jsx-sort-props.ts` |
| `jsx-spread-props-last` | `suggestion` | No | Require spread props to appear after explicit props. | `src/rules/jsx-spread-props-last.ts` |
| `prefer-interface-over-inline-types` | `suggestion` | No | Prefer interfaces over inline prop type annotations. | `src/rules/prefer-interface-over-inline-types.ts` |
| `prefer-jsx-template-literals` | `suggestion` | `code` | Prefer template literals over mixed text and expression concatenation in JSX. | `src/rules/prefer-jsx-template-literals.ts` |
| `prefer-react-import-types` | `suggestion` | `code` | Prefer direct React type imports over `React.X` type access. | `src/rules/prefer-react-import-types.ts` |
| `react-props-destructure` | `suggestion` | No | Require prop destructuring inside the component body instead of in parameters. | `src/rules/react-props-destructure.ts` |

## Next.js Rule

| Rule ID | Type | Fixable | Description | Source |
|--------|------|---------|-------------|--------|
| `nextjs-require-public-env` | `problem` | No | Require `NEXT_PUBLIC_` prefixes for environment variables used in client components. | `src/rules/nextjs-require-public-env.ts` |

## Combined Example

```js
import nextfriday from "eslint-plugin-nextfriday";

export default [
  {
    plugins: {
      nextfriday,
    },
    rules: {
      "nextfriday/boolean-naming-prefix": "error",
      "nextfriday/prefer-import-type": "error",
      "nextfriday/jsx-sort-props": "error",
      "nextfriday/nextjs-require-public-env": "error",
    },
  },
];
```

For preset-oriented consumption, use the [Configs API](/docs/api-reference/configs) instead of enabling large groups by hand.
