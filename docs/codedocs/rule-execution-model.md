---
title: "Rule Execution Model"
description: "How individual rules inspect AST nodes, detect violations, and apply autofixes inside eslint-plugin-nextfriday."
---

Understanding the execution model helps when a rule feels surprising. Every rule in the package is a `TSESLint.RuleModule<string, readonly unknown[]>` with no custom options, but the internal strategies vary: some scan the whole file, some inspect filenames, some track local state, and some generate autofixes.

## What This Concept Is

The rule execution model is the package's internal contract with ESLint:

1. Build rule metadata with `ESLintUtils.RuleCreator(...)`.
2. Export a `create(context)` function.
3. Return visitors for the AST node types the rule cares about.
4. Call `context.report(...)` when a node violates the rule.
5. Optionally provide `fix(fixer)` for safe rewrites.

That pattern appears in every file under `src/rules/`.

## Why It Exists

The plugin enforces a mix of naming, structure, and framework conventions. A single detection strategy would not be enough. For example:

- `no-emoji` reads the entire source text and reports every emoji match.
- `file-kebab-case` does not inspect the AST deeply at all; it only checks `context.filename`.
- `nextjs-require-public-env` tracks whether a file starts with `"use client"` and then inspects `MemberExpression` nodes.
- `prefer-import-type` performs scope analysis to decide whether imported symbols are ever used as runtime values.

## How It Relates to Other Concepts

The [Preset Configs](/docs/preset-configs) page explains how rules become enabled. The [Rule Families](/docs/rule-families) page explains why certain rules appear together. This page focuses on what happens after ESLint invokes a rule module.

## How It Works Internally

### Shared rule bootstrap

Each rule file starts with the same `createRule` pattern:

```ts
const createRule = ESLintUtils.RuleCreator(
  (name) =>
    `https://github.com/next-friday/eslint-plugin-nextfriday/blob/main/docs/rules/${name.replaceAll("-", "_").toUpperCase()}.md`,
);
```

That means every rule automatically publishes its documentation URL in metadata. The rule then declares `name`, `meta`, `defaultOptions: []`, and the actual `create(context)` implementation.

### Detection patterns

The package uses a few recurring strategies:

- Whole-program scans: `no-emoji` runs on `Program()` and searches the file text with `emoji-regex`.
- Filename and extension checks: `file-kebab-case` and `jsx-pascal-case` decide based on `context.filename`.
- Stateful visitors: `jsx-require-suspense` records lazy component identifiers first, then validates JSX usage later in the traversal.
- Scope-aware analysis: `prefer-import-type` walks references and rejects imports that are used as runtime values.
- Structural reorder fixes: `sort-imports`, `sort-exports`, `sort-type-alphabetically`, `enforce-sorted-destructuring`, and `jsx-sort-props` compute a sorted representation and replace only the affected text segments.

```mermaid
flowchart TD
  A[ESLint enters file] --> B[Rule create(context)]
  B --> C{Visitor strategy}
  C --> D[Program or filename scan]
  C --> E[Node-by-node AST checks]
  C --> F[Scope-aware analysis]
  D --> G[context.report]
  E --> G
  F --> G
  G --> H{Fix available?}
  H -->|Yes| I[Return fixer operations]
  H -->|No| J[Diagnostic only]
```

### Autofix behavior

Fixers are intentionally concentrated in rules where the replacement is deterministic. `enforce-sorted-destructuring` sorts destructured properties, `jsx-sort-props` reorders only contiguous attribute segments separated by spread props, and `prefer-import-type` rewrites `import` to `import type` when all specifiers are type-only. Non-fixable rules tend to encode intent or naming conventions where an automatic rename could break semantics or imports.

## Basic Usage Example

`jsx-sort-props` is a good example of a safe autofix rule:

```tsx
type ButtonProps = {
  disabled?: boolean;
  icon?: React.ReactNode;
  label: string;
  onClick: () => void;
};

export function Button(props: Readonly<ButtonProps>) {
  return <button onClick={props.onClick} disabled={props.disabled} label="Save" icon={<span>+</span>} />;
}
```

With the React preset enabled, the rule will reorder props into the package's group order: string-like values first, then numbers and booleans, expressions, objects and arrays, functions, JSX, and shorthand booleans.

## Advanced Usage Example

`prefer-import-type` is more selective because it has to avoid rewriting runtime imports:

```ts
import { User } from "./types";
import { formatUser } from "./format-user";

export function renderUser(user: User): string {
  return formatUser(user);
}
```

Because `User` is only referenced in a type annotation, `prefer-import-type` can autofix the first line to `import type { User } from "./types";`. By contrast, it will not rewrite `formatUser` because that identifier is used at runtime in the function body.

<Callout type="warn">Do not assume every diagnostic is autofixable. A large portion of the catalog is intentionally report-only, especially naming and architectural rules like `no-relative-imports`, `no-lazy-identifiers`, `boolean-naming-prefix`, and `nextjs-require-public-env`.</Callout>

## Trade-Offs

<Accordions>
<Accordion title="Autofix speed vs semantic safety">
The plugin avoids dangerous automatic rewrites in rules where renaming or restructuring could change runtime behavior. That is why rules like `no-single-char-variables` and `no-relative-imports` report problems but do not try to invent replacement names or import aliases. The result is safer automation, but it means some cleanup still requires human refactoring after the lint pass. In exchange, the rules that do fix code tend to be highly reliable because they operate on ordering or syntax markers rather than project meaning.
</Accordion>
<Accordion title="Filename heuristics vs deep framework detection">
Rules such as `file-kebab-case`, `jsx-pascal-case`, `enforce-hook-naming`, and `enforce-service-naming` rely on filenames because filenames are cheap to inspect and consistent across tooling. The alternative would be heavier semantic analysis that tries to infer whether a file behaves like a hook or service from its contents. That could catch more edge cases, but it would also be harder to explain and more brittle. The current model is easy to reason about as long as the repository follows the naming conventions the plugin expects.
</Accordion>
<Accordion title="Scope analysis improves precision but raises complexity">
`prefer-import-type` is one of the more sophisticated rules because it walks references and distinguishes type positions from runtime positions. That extra work reduces false positives and keeps the autofix safe for normal TypeScript usage. The trade-off is implementation complexity: rules like this are harder to maintain than simple node-shape checks such as `no-nested-ternary` or `newline-before-return`. The package uses that complexity sparingly and mostly where the payoff is strong.
</Accordion>
</Accordions>

When debugging a rule, read its source file directly. The implementations are short, explicit, and usually map one visitor to one message with minimal indirection.
