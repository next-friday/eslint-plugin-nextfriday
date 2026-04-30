# eslint-plugin-nextfriday

A comprehensive ESLint plugin providing custom rules and configurations for Next Friday development workflows.

## Installation

```bash
npm install --save-dev eslint-plugin-nextfriday
# or
yarn add --dev eslint-plugin-nextfriday
# or
pnpm add -D eslint-plugin-nextfriday
```

## Usage

### Flat Config (ESLint 9+)

#### Base Configuration (for pure JS/TS projects)

```js
import nextfriday from "eslint-plugin-nextfriday";

export default [nextfriday.configs.base];
// or use the recommended preset (stricter)
export default [nextfriday.configs["base/recommended"]];
```

#### React Configuration

```js
import nextfriday from "eslint-plugin-nextfriday";

export default [nextfriday.configs.react];
// or use the recommended preset
export default [nextfriday.configs["react/recommended"]];
```

#### Next.js Configuration

```js
import nextfriday from "eslint-plugin-nextfriday";

export default [nextfriday.configs.nextjs];
// or use the recommended preset
export default [nextfriday.configs["nextjs/recommended"]];
```

### Extending a Preset with Rule Overrides

To use a preset and adjust individual rules, append a second config object after the preset. Later objects override earlier ones, so you can change severity, swap options, or add rules without re-declaring the entire preset.

For example, enforce PascalCase for React components via the `react/recommended` preset (which already runs `nextfriday/jsx-pascal-case` and `nextfriday/enforce-camel-case` as errors), and add a rule override on top:

```js
import nextfriday from "eslint-plugin-nextfriday";

export default [
  nextfriday.configs["react/recommended"],

  {
    rules: {
      "nextfriday/jsx-pascal-case": "error",
      "nextfriday/enforce-props-suffix": "error",
      "nextfriday/sort-imports": "warn",
    },
  },
];
```

The first object enables every rule in `react/recommended`. The second object reaffirms `jsx-pascal-case` (already enforced — useful when you want it loud and explicit), enables `enforce-props-suffix`, and downgrades `sort-imports` from error to warning.

### Manual Configuration

#### When to use manual configuration vs a preset

Reach for a preset (`base`, `react`, `nextjs`, or any `/recommended` variant) by default. Presets are curated, kept in sync with new rules as the plugin grows, and require almost no maintenance on your side.

Choose manual configuration when one of these applies:

| Scenario                                                                            | Why manual fits better                                                                                                              |
| ----------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| You only need a few specific rules                                                  | Presets enable the full set; manual lets you adopt rules one at a time.                                                             |
| You want to opt out of new rules added in future plugin releases                    | Manual configs are explicit — new rules added to a preset would automatically apply, manual configs don't change without your edit. |
| You're consolidating multiple ESLint plugins and want fine-grained per-rule control | Avoids preset rules conflicting with rules from other plugins.                                                                      |
| You're building a higher-level shared config for your org                           | You can hand-pick exactly which NextFriday rules to bundle into your own preset.                                                    |
| You're debugging a rule conflict                                                    | Manual makes the active rule set unambiguous.                                                                                       |

For every other case — new projects, gradual adoption, library code, application code — start from a preset and use [Extending a Preset with Rule Overrides](#extending-a-preset-with-rule-overrides) when you need to adjust specific rules.

#### Manual configuration example

```js
import nextfriday from "eslint-plugin-nextfriday";

export default [
  {
    plugins: {
      nextfriday,
    },
    rules: {
      // Variable Naming
      "nextfriday/no-single-char-variables": "error",
      "nextfriday/no-lazy-identifiers": "error",
      "nextfriday/boolean-naming-prefix": "error",
      "nextfriday/enforce-camel-case": "error",
      "nextfriday/enforce-constant-case": "error",
      "nextfriday/enforce-property-case": "error",
      "nextfriday/no-misleading-constant-case": "error",

      // File Naming
      "nextfriday/file-kebab-case": "error",
      "nextfriday/jsx-pascal-case": "error",

      // Code Style
      "nextfriday/no-emoji": "error",
      "nextfriday/prefer-destructuring-params": "error",
      "nextfriday/prefer-function-declaration": "error",
      "nextfriday/require-explicit-return-type": "error",
      "nextfriday/no-complex-inline-return": "error",
      "nextfriday/no-logic-in-params": "error",
      "nextfriday/enforce-hook-naming": "error",
      "nextfriday/enforce-service-naming": "error",
      "nextfriday/enforce-sorted-destructuring": "error",
      "nextfriday/no-env-fallback": "error",
      "nextfriday/no-inline-default-export": "error",
      "nextfriday/no-direct-date": "error",
      "nextfriday/newline-after-multiline-block": "error",
      "nextfriday/newline-before-return": "error",
      "nextfriday/no-inline-nested-object": "error",
      "nextfriday/no-inline-return-properties": "error",
      "nextfriday/prefer-async-await": "error",
      "nextfriday/enforce-curly-newline": "error",
      "nextfriday/no-nested-ternary": "error",
      "nextfriday/prefer-guard-clause": "error",

      // Import Optimization
      "nextfriday/no-relative-imports": "error",
      "nextfriday/prefer-import-type": "error",
      "nextfriday/prefer-react-import-types": "error",
      "nextfriday/sort-exports": "error",
      "nextfriday/sort-imports": "error",

      // Type Patterns
      "nextfriday/enforce-type-declaration-order": "error",
      "nextfriday/no-nested-interface-declaration": "error",
      "nextfriday/prefer-named-param-types": "error",
      "nextfriday/prefer-inline-literal-union": "error",
      "nextfriday/prefer-inline-type-export": "error",
      "nextfriday/prefer-interface-over-inline-types": "error",
      "nextfriday/sort-type-alphabetically": "error",
      "nextfriday/sort-type-required-first": "error",

      // React/JSX
      "nextfriday/jsx-newline-between-elements": "error",
      "nextfriday/jsx-no-inline-object-prop": "error",
      "nextfriday/jsx-no-newline-single-line-elements": "error",
      "nextfriday/jsx-no-non-component-function": "error",
      "nextfriday/jsx-no-ternary-null": "error",
      "nextfriday/jsx-no-variable-in-callback": "error",
      "nextfriday/jsx-require-suspense": "error",
      "nextfriday/jsx-simple-props": "error",
      "nextfriday/jsx-sort-props": "error",
      "nextfriday/jsx-spread-props-last": "error",
      "nextfriday/prefer-jsx-template-literals": "error",
      "nextfriday/react-props-destructure": "error",
      "nextfriday/enforce-props-suffix": "error",
      "nextfriday/enforce-readonly-component-props": "error",

      // Next.js
      "nextfriday/nextjs-require-public-env": "error",
    },
  },
];
```

> **Note:** This plugin requires ESLint 9+ and only supports the flat config format. Legacy `.eslintrc` configurations are not supported.

### Per-Directory Configuration

#### How ESLint flat config resolves rules

Flat config (the only format this plugin supports) is an **array of config objects** evaluated in order. For every file ESLint lints, it walks the array and merges every object whose `files` glob matches and whose `ignores` glob does not. Later objects override earlier ones rule-by-rule, so the **last matching object wins** for any given rule. Objects with no `files` field apply globally; objects with only `ignores` at the top level remove files from the entire run.

This is why per-directory configuration works: you stack a global default first, then layer narrower `files`-scoped objects on top. ESLint 9+ also flattens nested arrays automatically, so spreading a preset that ships as an array (like `nextfriday.configs.nextjs`) works the same as spreading a single object.

The legacy `.eslintrc` format used `overrides` and an inheritance tree to express the same thing. Flat config replaces that tree with a flat, deterministic array — easier to reason about, no implicit merging across `extends`, and no `parserOptions` plumbing per directory. The plugin does not ship `.eslintrc` shims, so projects on ESLint 8 or below cannot consume it without upgrading.

#### Layering strict and loose presets

Apply different rule severities to different directories by stacking config objects:

```js
import nextfriday from "eslint-plugin-nextfriday";

export default [
  {
    ignores: ["src/legacy/**", "dist/**", "build/**", "**/*.generated.ts"],
  },

  nextfriday.configs.react,

  {
    files: ["src/components/**/*.{ts,tsx}", "src/hooks/**/*.{ts,tsx}"],
    ...nextfriday.configs["react/recommended"],
  },

  {
    files: ["src/utils/**/*.ts", "src/lib/**/*.ts"],
    rules: {
      "nextfriday/require-explicit-return-type": "error",
      "nextfriday/no-relative-imports": "error",
    },
  },

  {
    files: ["**/*.{test,spec}.{ts,tsx}"],
    rules: {
      "nextfriday/require-explicit-return-type": "off",
      "nextfriday/no-single-char-variables": "off",
      "nextfriday/no-direct-date": "off",
    },
  },
];
```

Reading top to bottom:

1. **Top-level `ignores`** removes legacy and build artifacts from the entire run. A config object containing _only_ `ignores` is treated as a global ignore — narrower `ignores` inside a `files`-scoped object only affect that object.
2. **`nextfriday.configs.react`** applies as the warn-level baseline to every file ESLint sees (no `files` glob).
3. **Component and hook directories** get promoted to `react/recommended` (errors). Because this object comes after the baseline, its severities win.
4. **Utility directories** keep the warn-level baseline but selectively promote two correctness rules to `error`. Use this pattern when you don't want the full `/recommended` preset but do want specific rules treated as blocking.
5. **Test files** keep most rules but turn off rules that conflict with common test patterns (single-letter loop counters, frozen `Date.now()` mocks, void-returning `it()` callbacks).

#### Choosing a preset tier per directory

| Code area                         | Suggested preset                            | Why                                                                        |
| --------------------------------- | ------------------------------------------- | -------------------------------------------------------------------------- |
| Library / SDK code                | `base/recommended` or `react/recommended`   | Public surface should be tightest. `error` blocks regressions at PR time.  |
| New product code                  | `react/recommended` or `nextjs/recommended` | New code starts clean; lock the conventions in immediately.                |
| Mature product code mid-migration | `react` or `nextjs` (warn)                  | Ship while migrating. Switch to `/recommended` after a clean run.          |
| Tests, scripts, fixtures          | preset + targeted overrides                 | Keep the core lint signal; turn off rules that mismatch test/CLI patterns. |
| Legacy / vendored / generated     | top-level `ignores`                         | No lint signal at all. Don't waste reviewer attention or CI time.          |

#### Edge cases and troubleshooting

- **Glob precedence is order-dependent, not specificity-based.** A more specific glob later in the array wins; a more specific glob _earlier_ in the array does not. If `files: ["src/**"]` appears after `files: ["src/components/**"]`, the broader rule set wins for components. Put broader configs first.
- **`files` and `ignores` are anchored to the project root** (the directory containing `eslint.config.{js,mjs,ts}`), not the file's directory. Use `**/` prefixes for matches anywhere in the tree (e.g., `**/*.test.ts`).
- **Top-level `ignores` ≠ `ignores` inside a config object.** A standalone object `{ ignores: [...] }` removes files from the entire run; an `ignores` field next to `files` and `rules` only narrows that one config object's match.
- **Spreading a preset replaces, not merges, the `plugins` field.** If you spread `...nextfriday.configs.react` and then a different config later, the later object's `plugins` wins. Re-declare `plugins: { nextfriday }` if you add rules in a later object.
- **`nextfriday.configs.nextjs` is an array, not a single object.** Spreading it inline with `...nextfriday.configs.nextjs` only spreads array indices, not the inner objects. Use it as an array entry (`nextfriday.configs.nextjs,`) instead, so ESLint 9+ flattens it.
- **Two presets in one project.** Use scoped `files` rather than two unscoped presets — unscoped presets stack and the later one's rule severities win for every file, which is rarely what you want.
- **Verifying the resolved config for a file:** `pnpm eslint --print-config path/to/file.tsx` prints the merged config ESLint would actually use. Reach for this when a rule fires (or doesn't) and you can't tell why.

### Migration Strategy

For an existing codebase with many violations, treat the migration as a phased rollout — survey, fix, lock in, repeat.

#### 1. Survey violations before changing anything

Install the plugin as a dev dependency, drop a warn-level preset into `eslint.config.mjs`, and run a read-only lint. Don't `--fix` yet — you want to see the raw shape of the codebase first.

```bash
pnpm add -D eslint-plugin-nextfriday eslint
pnpm eslint . --no-fix
```

Group violations by rule so you can plan the work. Most CI dashboards do this for you, but a one-liner works locally:

```bash
pnpm eslint . --no-fix --format json | jq -r '.[].messages[].ruleId' | sort | uniq -c | sort -rn
```

The output tells you which rules account for most of the noise. A rule with 3 violations is a 10-minute fix; a rule with 800 is a multi-week project. Plan accordingly.

#### 2. Run the auto-fixers in an isolated PR

Roughly a third of this plugin's rules are auto-fixable (the `Fixable ✅` column in the [Rules](#rules) table). Run them in a dedicated commit so the diff is purely mechanical and reviewers don't have to read every line:

```bash
pnpm eslint . --fix
git add -u && git commit -m "style(lint): autofix nextfriday rules"
```

Open this as its own PR. Mixing auto-fix output with hand-written changes in the same diff makes review almost impossible.

#### 3. Adopt the warn-level preset

After the auto-fix pass, drop in the warn-level preset so the remaining violations surface during local dev and CI without breaking the build:

```js
import nextfriday from "eslint-plugin-nextfriday";

export default [nextfriday.configs.react];
```

Warnings don't fail `eslint --max-warnings=0`, so add that flag in CI only when you're ready to block on warnings. Until then, warnings are visible signal without pressure.

#### 4. Lock in clean directories one at a time

As individual directories or features reach zero violations, promote them to `/recommended` (errors) so regressions block at PR time. Everything else stays on the warn-level preset.

```js
import nextfriday from "eslint-plugin-nextfriday";

export default [
  nextfriday.configs.react,

  {
    files: ["src/components/v2/**/*.{ts,tsx}", "src/lib/**/*.ts"],
    ...nextfriday.configs["react/recommended"],
  },
];
```

Repeat per directory. This is how you ratchet without flag-day rewrites.

#### 5. Manage exceptions explicitly

Three ways to carve out an exception, in order of preference. Pick the narrowest one that solves the problem.

**Per-rule severity override** — turn off a single noisy rule globally until you can fix it at the codebase level:

```js
export default [
  nextfriday.configs["react/recommended"],

  {
    rules: {
      "nextfriday/require-explicit-return-type": "warn",
      "nextfriday/sort-imports": "off",
    },
  },
];
```

**Per-directory exception** — keep the rule strict everywhere except one stubborn corner:

```js
export default [
  nextfriday.configs["react/recommended"],

  {
    files: ["src/legacy/**/*.{ts,tsx}"],
    rules: {
      "nextfriday/no-relative-imports": "off",
      "nextfriday/enforce-camel-case": "off",
    },
  },
];
```

**Per-file or per-line disable comments** — last resort, for genuinely irreducible cases:

```ts
// eslint-disable-next-line nextfriday/no-direct-date
const epochAnchor = new Date(0);

/* eslint-disable nextfriday/no-emoji */
export const FLAG_EMOJIS = ["🇹🇭", "🇯🇵", "🇺🇸"];
/* eslint-enable nextfriday/no-emoji */
```

Always disable a _named_ rule, never blanket-disable ESLint. A blanket `// eslint-disable` mutes every rule including correctness ones, so legitimate bugs slip through later.

**Skip vendored or generated files entirely** with a top-level ignore — these aren't exceptions to manage, they're code you don't lint at all:

```js
export default [
  {
    ignores: ["dist/**", "build/**", "coverage/**", "**/*.generated.ts"],
  },

  nextfriday.configs["react/recommended"],
];
```

#### 6. Track progress so the migration actually lands

Migrations stall when nobody can see how close you are. Two cheap signals:

- **Violation count over time.** Pipe `pnpm eslint . --no-fix --format compact | wc -l` into your CI metrics or a daily Slack post. Trend it weekly. If the number stops dropping, the migration has stalled.
- **Verify a single file's resolved config.** When a contributor asks "why did this rule fire on my file?", run `pnpm eslint --print-config path/to/file.tsx`. The output shows exactly which severity ESLint resolved for every rule on that file — usually answers the question in seconds.

Once a directory hits zero, lock it in (step 4). Once the warn-level count hits zero across the whole repo, switch the global preset to `/recommended` and add `--max-warnings=0` to CI. The migration is done.

#### Prioritize rules by impact

When the warn-level preset surfaces hundreds of violations, fix them in this order — high-impact rules catch real bugs, while low-impact rules are style preferences that can wait.

| Tier                                  | Examples                                                                                                                                                                           | Why first                                                                                                                       |
| ------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| High — correctness and runtime safety | `no-direct-date`, `no-env-fallback`, `nextjs-require-public-env`, `enforce-readonly-component-props`, `jsx-no-non-component-function`, `enforce-hook-naming`, `no-logic-in-params` | Each violation can mask a bug, leak config, or break React's rules of hooks. Fix before they ship.                              |
| Medium — structure and naming         | `boolean-naming-prefix`, `enforce-camel-case`, `enforce-constant-case`, `file-kebab-case`, `jsx-pascal-case`, `enforce-props-suffix`, `prefer-import-type`                         | No runtime impact, but inconsistent naming compounds review and onboarding cost. Fix once the high tier is clean.               |
| Low — formatting and ordering         | `sort-imports`, `sort-exports`, `sort-type-alphabetically`, `jsx-sort-props`, `newline-before-return`, `newline-after-multiline-block`, `no-emoji`                                 | Cosmetic. Most are auto-fixable, so a single `pnpm eslint --fix` pass typically clears the whole codebase. Save these for last. |

In practice: turn the high tier on as `"error"` first, leave the medium tier as `"warn"` while you migrate, and run the auto-fixers for the low tier in a single dedicated PR.

## Rules

> All rules in this plugin have no configurable options (`schema: []`). The only knob is severity — set each rule to `"error"`, `"warn"`, or `"off"`. Behavior is intentionally fixed so that the same rule means the same thing across every project.

### Variable Naming Rules

| Rule                                                                     | Description                                                           | Fixable |
| ------------------------------------------------------------------------ | --------------------------------------------------------------------- | ------- |
| [no-single-char-variables](docs/rules/NO_SINGLE_CHAR_VARIABLES.md)       | Disallow single character variable names (e.g., `d`, `u`, `l`)        | ❌      |
| [no-lazy-identifiers](docs/rules/NO_LAZY_IDENTIFIERS.md)                 | Disallow lazy identifiers like `xxx`, `asdf`, `qwerty`                | ❌      |
| [boolean-naming-prefix](docs/rules/BOOLEAN_NAMING_PREFIX.md)             | Enforce boolean variables to have prefix (is, has, should, can, etc.) | ❌      |
| [enforce-camel-case](docs/rules/ENFORCE_CAMEL_CASE.md)                   | Ban snake_case and restrict PascalCase to React components            | ❌      |
| [enforce-constant-case](docs/rules/ENFORCE_CONSTANT_CASE.md)             | Enforce SCREAMING_SNAKE_CASE for global static constant values        | ❌      |
| [enforce-property-case](docs/rules/ENFORCE_PROPERTY_CASE.md)             | Enforce camelCase for unquoted object property keys                   | ❌      |
| [no-misleading-constant-case](docs/rules/NO_MISLEADING_CONSTANT_CASE.md) | Disallow SCREAMING_SNAKE_CASE in local scope and for dynamic values   | ❌      |

### File Naming Rules

| Rule                                             | Description                                          | Fixable |
| ------------------------------------------------ | ---------------------------------------------------- | ------- |
| [file-kebab-case](docs/rules/FILE_KEBAB_CASE.md) | Enforce kebab-case filenames for .ts and .js files   | ❌      |
| [jsx-pascal-case](docs/rules/JSX_PASCAL_CASE.md) | Enforce PascalCase filenames for .jsx and .tsx files | ❌      |

### Code Style Rules

| Rule                                                                         | Description                                                            | Fixable |
| ---------------------------------------------------------------------------- | ---------------------------------------------------------------------- | ------- |
| [no-emoji](docs/rules/NO_EMOJI.md)                                           | Disallow emoji characters in source code                               | ❌      |
| [prefer-destructuring-params](docs/rules/PREFER_DESTRUCTURING_PARAMS.md)     | Enforce destructuring for functions with multiple parameters           | ❌      |
| [prefer-function-declaration](docs/rules/PREFER_FUNCTION_DECLARATION.md)     | Enforce function declarations over arrow functions in .ts files        | ❌      |
| [require-explicit-return-type](docs/rules/REQUIRE_EXPLICIT_RETURN_TYPE.md)   | Require explicit return types on functions for better documentation    | ❌      |
| [no-complex-inline-return](docs/rules/NO_COMPLEX_INLINE_RETURN.md)           | Disallow complex inline expressions in return - extract to const first | ❌      |
| [no-logic-in-params](docs/rules/NO_LOGIC_IN_PARAMS.md)                       | Disallow logic/conditions in function parameters - extract to const    | ❌      |
| [enforce-hook-naming](docs/rules/ENFORCE_HOOK_NAMING.md)                     | Enforce 'use' prefix for functions in \*.hook.ts files                 | ❌      |
| [enforce-service-naming](docs/rules/ENFORCE_SERVICE_NAMING.md)               | Enforce 'fetch' prefix for async functions in \*.service.ts files      | ❌      |
| [enforce-sorted-destructuring](docs/rules/ENFORCE_SORTED_DESTRUCTURING.md)   | Enforce alphabetical sorting of destructured properties                | ✅      |
| [no-env-fallback](docs/rules/NO_ENV_FALLBACK.md)                             | Disallow fallback values for environment variables                     | ❌      |
| [no-inline-default-export](docs/rules/NO_INLINE_DEFAULT_EXPORT.md)           | Disallow inline default exports - declare first, then export           | ❌      |
| [no-direct-date](docs/rules/NO_DIRECT_DATE.md)                               | Disallow direct usage of Date constructor and methods                  | ❌      |
| [newline-after-multiline-block](docs/rules/NEWLINE_AFTER_MULTILINE_BLOCK.md) | Require a blank line after multi-line statements                       | ✅      |
| [newline-before-return](docs/rules/NEWLINE_BEFORE_RETURN.md)                 | Require a blank line before return statements                          | ✅      |
| [no-inline-nested-object](docs/rules/NO_INLINE_NESTED_OBJECT.md)             | Require nested objects and arrays to span multiple lines               | ✅      |
| [no-inline-return-properties](docs/rules/NO_INLINE_RETURN_PROPERTIES.md)     | Require return object properties to use shorthand notation             | ❌      |
| [prefer-async-await](docs/rules/PREFER_ASYNC_AWAIT.md)                       | Enforce async/await over .then() promise chains                        | ❌      |
| [enforce-curly-newline](docs/rules/ENFORCE_CURLY_NEWLINE.md)                 | Enforce curly braces for multi-line if, forbid for single-line         | ✅      |
| [no-nested-ternary](docs/rules/NO_NESTED_TERNARY.md)                         | Disallow nested ternary expressions                                    | ❌      |
| [prefer-guard-clause](docs/rules/PREFER_GUARD_CLAUSE.md)                     | Enforce guard clause pattern instead of nested if statements           | ❌      |

### Import Optimization Rules

| Rule                                                                 | Description                                               | Fixable |
| -------------------------------------------------------------------- | --------------------------------------------------------- | ------- |
| [no-relative-imports](docs/rules/NO_RELATIVE_IMPORTS.md)             | Disallow relative imports with ../ - use absolute imports | ❌      |
| [prefer-import-type](docs/rules/PREFER_IMPORT_TYPE.md)               | Enforce using 'import type' for type-only imports         | ✅      |
| [prefer-react-import-types](docs/rules/PREFER_REACT_IMPORT_TYPES.md) | Enforce direct imports from 'react' instead of React.X    | ✅      |
| [sort-exports](docs/rules/SORT_EXPORTS.md)                           | Enforce a consistent ordering of export groups            | ✅      |
| [sort-imports](docs/rules/SORT_IMPORTS.md)                           | Enforce a consistent ordering of import groups            | ✅      |

### Type Pattern Rules

| Rule                                                                                   | Description                                                      | Fixable |
| -------------------------------------------------------------------------------------- | ---------------------------------------------------------------- | ------- |
| [enforce-type-declaration-order](docs/rules/ENFORCE_TYPE_DECLARATION_ORDER.md)         | Enforce referenced types are declared after their consumer       | ❌      |
| [no-nested-interface-declaration](docs/rules/NO_NESTED_INTERFACE_DECLARATION.md)       | Disallow inline object types in interface/type properties        | ❌      |
| [prefer-named-param-types](docs/rules/PREFER_NAMED_PARAM_TYPES.md)                     | Enforce named types for function parameters with object types    | ❌      |
| [prefer-inline-literal-union](docs/rules/PREFER_INLINE_LITERAL_UNION.md)               | Enforce inlining literal union types for better IDE hover info   | ✅      |
| [prefer-inline-type-export](docs/rules/PREFER_INLINE_TYPE_EXPORT.md)                   | Require type/interface exports inline at the declaration         | ✅      |
| [prefer-interface-over-inline-types](docs/rules/PREFER_INTERFACE_OVER_INLINE_TYPES.md) | Enforce interface declarations over inline types for React props | ❌      |
| [sort-type-alphabetically](docs/rules/SORT_TYPE_ALPHABETICALLY.md)                     | Enforce A-Z sorting of properties within type groups             | ✅      |
| [sort-type-required-first](docs/rules/SORT_TYPE_REQUIRED_FIRST.md)                     | Enforce required properties before optional in types/interfaces  | ✅      |

### React/JSX Rules

| Rule                                                                                     | Description                                                           | Fixable |
| ---------------------------------------------------------------------------------------- | --------------------------------------------------------------------- | ------- |
| [jsx-newline-between-elements](docs/rules/JSX_NEWLINE_BETWEEN_ELEMENTS.md)               | Require empty lines between sibling multi-line JSX children           | ✅      |
| [jsx-no-inline-object-prop](docs/rules/JSX_NO_INLINE_OBJECT_PROP.md)                     | Disallow inline object literals in JSX props                          | ❌      |
| [jsx-no-newline-single-line-elements](docs/rules/JSX_NO_NEWLINE_SINGLE_LINE_ELEMENTS.md) | Disallow empty lines between single-line sibling JSX elements         | ✅      |
| [jsx-no-non-component-function](docs/rules/JSX_NO_NON_COMPONENT_FUNCTION.md)             | Disallow non-component functions at top level in .tsx/.jsx files      | ❌      |
| [jsx-no-ternary-null](docs/rules/JSX_NO_TERNARY_NULL.md)                                 | Enforce logical AND over ternary with null/undefined in JSX           | ✅      |
| [jsx-no-variable-in-callback](docs/rules/JSX_NO_VARIABLE_IN_CALLBACK.md)                 | Disallow variable declarations inside callback functions in JSX       | ❌      |
| [jsx-require-suspense](docs/rules/JSX_REQUIRE_SUSPENSE.md)                               | Require lazy-loaded components to be wrapped in Suspense              | ❌      |
| [jsx-simple-props](docs/rules/JSX_SIMPLE_PROPS.md)                                       | Enforce simple prop values (strings, variables, callbacks, ReactNode) | ❌      |
| [jsx-sort-props](docs/rules/JSX_SORT_PROPS.md)                                           | Enforce JSX props are sorted by value type                            | ✅      |
| [jsx-spread-props-last](docs/rules/JSX_SPREAD_PROPS_LAST.md)                             | Enforce JSX spread attributes appear after all other props            | ❌      |
| [prefer-jsx-template-literals](docs/rules/PREFER_JSX_TEMPLATE_LITERALS.md)               | Enforce template literals instead of mixing text and JSX expressions  | ✅      |
| [react-props-destructure](docs/rules/REACT_PROPS_DESTRUCTURE.md)                         | Enforce destructuring props inside React component body               | ❌      |
| [enforce-props-suffix](docs/rules/ENFORCE_PROPS_SUFFIX.md)                               | Enforce 'Props' suffix for interfaces and types in \*.tsx files       | ❌      |
| [enforce-readonly-component-props](docs/rules/ENFORCE_READONLY_COMPONENT_PROPS.md)       | Enforce Readonly wrapper for React component props                    | ✅      |

### Next.js Rules

| Rule                                                                 | Description                                                   | Fixable |
| -------------------------------------------------------------------- | ------------------------------------------------------------- | ------- |
| [nextjs-require-public-env](docs/rules/NEXTJS_REQUIRE_PUBLIC_ENV.md) | Require NEXT*PUBLIC* prefix for env vars in client components | ❌      |

## Configurations

### Configuration Presets Overview

| Preset               | Severity | Base Rules | JSX Rules | Next.js Rules | Total Rules |
| -------------------- | -------- | ---------- | --------- | ------------- | ----------- |
| `base`               | warn     | 40         | 0         | 0             | 40          |
| `base/recommended`   | error    | 40         | 0         | 0             | 40          |
| `react`              | warn     | 40         | 16        | 0             | 56          |
| `react/recommended`  | error    | 40         | 16        | 0             | 56          |
| `nextjs`             | warn     | 40         | 16        | 1             | 57          |
| `nextjs/recommended` | error    | 40         | 16        | 1             | 57          |

The `nextjs` and `nextjs/recommended` presets ship as an array of two flat-config objects: the rule set above, plus a routing override that disables `nextfriday/file-kebab-case` and `nextfriday/jsx-pascal-case` for files matching `app/**/*.{js,jsx,ts,tsx}`, `src/app/**/*.{js,jsx,ts,tsx}`, `pages/**/*.{js,jsx,ts,tsx}`, and `src/pages/**/*.{js,jsx,ts,tsx}`. Next.js owns the filenames in those directories (`page.tsx`, `layout.tsx`, `route.ts`, `middleware.ts`, etc.), so the plugin steps out of the way. ESLint 9+ flattens nested config arrays automatically, so spreading the preset works as expected.

### Base Configuration Rules (40 rules)

Included in `base`, `base/recommended`, and all other presets:

- `nextfriday/boolean-naming-prefix`
- `nextfriday/enforce-camel-case`
- `nextfriday/enforce-constant-case`
- `nextfriday/enforce-curly-newline`
- `nextfriday/enforce-hook-naming`
- `nextfriday/enforce-property-case`
- `nextfriday/enforce-service-naming`
- `nextfriday/enforce-sorted-destructuring`
- `nextfriday/enforce-type-declaration-order`
- `nextfriday/file-kebab-case`
- `nextfriday/newline-after-multiline-block`
- `nextfriday/newline-before-return`
- `nextfriday/no-complex-inline-return`
- `nextfriday/no-direct-date`
- `nextfriday/no-emoji`
- `nextfriday/no-env-fallback`
- `nextfriday/no-inline-default-export`
- `nextfriday/no-inline-nested-object`
- `nextfriday/no-inline-return-properties`
- `nextfriday/no-lazy-identifiers`
- `nextfriday/no-logic-in-params`
- `nextfriday/no-misleading-constant-case`
- `nextfriday/no-nested-interface-declaration`
- `nextfriday/no-nested-ternary`
- `nextfriday/no-relative-imports`
- `nextfriday/no-single-char-variables`
- `nextfriday/prefer-async-await`
- `nextfriday/prefer-destructuring-params`
- `nextfriday/prefer-function-declaration`
- `nextfriday/prefer-guard-clause`
- `nextfriday/prefer-import-type`
- `nextfriday/prefer-inline-literal-union`
- `nextfriday/prefer-inline-type-export`
- `nextfriday/prefer-named-param-types`
- `nextfriday/prefer-react-import-types`
- `nextfriday/require-explicit-return-type`
- `nextfriday/sort-exports`
- `nextfriday/sort-imports`
- `nextfriday/sort-type-alphabetically`
- `nextfriday/sort-type-required-first`

### JSX Rules (16 rules)

Additionally included in `react`, `react/recommended`, `nextjs`, `nextjs/recommended`:

- `nextfriday/enforce-props-suffix`
- `nextfriday/enforce-readonly-component-props`
- `nextfriday/jsx-newline-between-elements`
- `nextfriday/jsx-no-inline-object-prop`
- `nextfriday/jsx-no-newline-single-line-elements`
- `nextfriday/jsx-no-non-component-function`
- `nextfriday/jsx-no-ternary-null`
- `nextfriday/jsx-no-variable-in-callback`
- `nextfriday/jsx-pascal-case`
- `nextfriday/jsx-require-suspense`
- `nextfriday/jsx-simple-props`
- `nextfriday/jsx-sort-props`
- `nextfriday/jsx-spread-props-last`
- `nextfriday/prefer-interface-over-inline-types`
- `nextfriday/prefer-jsx-template-literals`
- `nextfriday/react-props-destructure`

### Next.js Only Rules (1 rule)

Additionally included in `nextjs`, `nextjs/recommended` only:

- `nextfriday/nextjs-require-public-env`

### Severity Levels

- **`base` / `react` / `nextjs`**: All rules set to `"warn"`
- **`base/recommended` / `react/recommended` / `nextjs/recommended`**: All rules set to `"error"`

## Features

- **Variable naming enforcement**: Prevent cryptic single-character names and enforce boolean prefixes
- **File naming enforcement**: Ensure consistent file naming conventions (kebab-case, PascalCase, SNAKE_CASE)
- **Function style**: Enforce function declarations over arrow functions in utility files
- **Import optimization**: Automatically suggests better import patterns for TypeScript
- **Code cleanup**: Helps remove unnecessary explicit type annotations
- **React component conventions**: Enforces naming standards and patterns for JSX/TSX files
- **Clean code practices**: Prevents emoji usage, enforces parameter destructuring, and more
- **Formatting rules**: Enforces consistent blank lines around multi-line blocks and return statements

## Agent Skill

This plugin ships with an [Agent Skill](https://github.com/anthropics/skills) that teaches AI coding assistants (Claude Code, Cursor, etc.) all 56 rules so they generate compliant code from the start.

```bash
npx skills add next-friday/eslint-plugin-nextfriday --skill eslint-plugin-nextfriday
```

Once installed, AI assistants will automatically follow the naming, code style, type, JSX, import, and formatting patterns enforced by this plugin — reducing lint errors to zero.

## Need Help?

If you encounter any issues or have questions:

- Check the [rule documentation](docs/rules) for detailed examples
- Report bugs or request features at: <https://github.com/next-friday/eslint-plugin-nextfriday/issues>

## License

MIT
