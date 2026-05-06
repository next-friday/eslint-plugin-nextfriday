# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is `eslint-plugin-nextfriday`, an ESLint plugin providing custom rules and configurations for Next Friday development workflows. Requires ESLint 10+ flat config (peer dependency `^10.0.0`) with presets for base (JS/TS), React, and Next.js projects. Built with tsdown for dual CJS/ESM output.

## Development Commands

```bash
pnpm build               # Build plugin using tsdown (dual CJS/ESM output to lib/)
pnpm test                # Run all tests with Jest (uses @swc/jest with native ESM)
pnpm test src/rules/__tests__/no-emoji.test.ts  # Run a single test file
pnpm test -t 'invalid'   # Run tests whose names match the pattern (Jest -t)
pnpm test:coverage       # Jest with coverage (run by pre-push hook)
pnpm test:watch          # Jest watch mode
pnpm eslint              # Lint src/ and auto-fix (.js, .ts only)
pnpm eslint:check        # Lint src/ without auto-fix (read-only)
pnpm typecheck           # Run TypeScript type checking
pnpm prettier            # Format all files
pnpm prettier:check      # Verify formatting
pnpm sort-package-json   # Sort package.json keys
pnpm clear               # Remove lib/, node_modules/.cache, .eslintcache
pnpm changeset           # Create a changeset for version bumping
pnpm audit               # Audit prod dependencies at high severity
```

Build config lives in `tsdown.config.ts`, Jest config in `jest.config.ts`, ESLint config in `eslint.config.mjs` (does **not** load the `nextfriday` plugin itself — the plugin is not self-applied). Distributed exports (per `package.json`): `lib/index.js` (ESM), `lib/index.cjs` (CJS), `lib/index.d.ts` (types).

## Code Architecture

### Entry Point

`src/index.ts` - Main plugin export containing:

- `meta` - Plugin name and version from package.json
- `rules` - All 57 rule implementations keyed by hyphenated name
- `configs` - Six configuration presets (each rule set has a `warn` and `error`/`recommended` variant). All presets are built via `createConfig()` and return a single config object. The `nextjs` and `nextjs/recommended` presets currently share the same rule set as `react` and `react/recommended`; they are kept as named aliases.

The plugin is exported both as default and as named exports `{ meta, configs, rules }`.

### Rule Structure

- `src/rules/{rule-name}.ts` - Rule implementations using `ESLintUtils.RuleCreator()`
- `src/rules/__tests__/{rule-name}.test.ts` - Tests using `@typescript-eslint/rule-tester`
- `docs/rules/{RULE_NAME_UPPERCASE}.md` - Rule documentation (hyphens become underscores)

All rules use `schema: []` and `defaultOptions: []` (no configurable options).

### Configuration Presets

Six configs total. Two rule set tiers, each with a `warn` variant and a `Recommended` (`error`) variant defined as separate constants in `src/index.ts` (`baseRules`/`baseRecommendedRules`, `jsxRules`/`jsxRecommendedRules`).

| Preset                          | Rules            | Severity     |
| ------------------------------- | ---------------- | ------------ |
| `base` / `base/recommended`     | 37 base          | warn / error |
| `react` / `react/recommended`   | 37 base + 20 JSX | warn / error |
| `nextjs` / `nextjs/recommended` | 37 base + 20 JSX | warn / error |

All 57 rules are included in the presets. The `react` and `nextjs` presets cover the full rule set (37 + 20 = 57).

`createConfig(rules)` is the only constructor used for presets — it wraps the rules object with `plugins: { nextfriday: plugin }` so each preset is self-contained for ESLint flat config. Never construct a preset config manually.

A rule's tier (base vs JSX) is determined solely by placement in `jsxRules`/`jsxRecommendedRules` in `src/index.ts` — not by a `jsx-` name prefix. Several JSX-tier rules have no `jsx-` prefix (e.g. `no-ghost-wrapper`, `enforce-props-suffix`, `enforce-render-naming`, `prefer-props-with-children`, `prefer-interface-for-component-props`, `prefer-interface-over-inline-types`). Similarly, `prefer-react-import-types` is intentionally in `baseRules` despite its name — do not move it to `jsxRules`.

### Utilities

`src/utils.ts` - Shared functions for filename parsing (`getFileExtension`, `getBaseName`), file type detection (`isJsFile`, `isJsxFile`, `isConfigFile`), and function parameter analysis (`getFunctionParams`, `hasMultipleParams`, `hasNonDestructuredParams`).

### Test Structure

- **Per-rule tests** use `@typescript-eslint/rule-tester` wired to Jest hooks (`RuleTester.afterAll = afterAll`, etc.). Each test file calls `ruleTester.run(...)` with valid/invalid cases. See "Test Boilerplate" below for the full pattern.
- **Integration tests** live in `src/__tests__/`:
  - `rules.test.ts` — asserts the exact rule count and that every rule name is present. Update both assertions when adding/removing rules.
  - `configs.test.ts` — asserts each of the six presets exists, has a `rules` property, and contains specific rule keys with the expected severity. Update when a rule moves between presets or when the spot-checked rules change.
  - `meta.test.ts` — asserts `meta.name` and `meta.version` come from `package.json`.
  - `utils.test.ts` — covers the helpers in `src/utils.ts`.
- Integration tests import via `import { describe, it, expect } from "@jest/globals"` — they are not bound to the per-rule `RuleTester` boilerplate and may use `expect`.

## Creating New Rules

1. Add rule file: `src/rules/{rule-name}.ts`
2. Create test file: `src/rules/__tests__/{rule-name}.test.ts`
3. Register in `src/index.ts`:
   - Import the rule
   - Add to `rules` object
   - **If the rule belongs in a preset**: add to both the warn and recommended variants of the appropriate rule set (e.g., `baseRules` AND `baseRecommendedRules`, or `jsxRules` AND `jsxRecommendedRules`). Rules that check the filename internally (e.g. `enforce-hook-filename`, `enforce-test-filename`) go in `baseRules` and return early when the file doesn't match.
   - **If the rule is opt-in** (only useful when scoped to specific file patterns via `files` glob): add to `rules` only — do **not** add to any preset.
4. Create documentation: `docs/rules/{RULE_NAME_UPPERCASE}.md`
5. Update README.md rules table
6. Update `src/__tests__/rules.test.ts`:
   - Update rule count in "should have exactly N rules" test
   - Add rule name to "should have correct rule names" test
7. If the new rule appears in any `src/__tests__/configs.test.ts` `toHaveProperty` assertion (or the spot-check set is being changed), update that file too.
8. Create a changeset: `pnpm changeset` (required for CI to pass on PRs that change `src/` or `docs/`)

### Rule Import Pattern

All rule files follow a standardized import pattern:

```typescript
import { AST_NODE_TYPES, ESLintUtils } from "@typescript-eslint/utils";
import type { TSESTree } from "@typescript-eslint/utils";
```

- Runtime imports (`AST_NODE_TYPES`, `ESLintUtils`) use a regular import
- Type-only imports (`TSESTree`) use a separate `import type`
- Imports are sorted alphabetically by specifier

### Rule Documentation Format

Standard structure for `docs/rules/{RULE_NAME}.md`:

1. `# rule-name` — hyphenated name
2. One-line description
3. Optional fixable notice: `> This rule is auto-fixable using \`--fix\`.`
4. `## Rule Details` — explanation, optional `### Why?` subsection
5. `## Examples` with `### Incorrect` / `### Correct` subsections
6. Optional reference sections (e.g., `## What This Rule Checks`, `## Exceptions`, `## Allowed Prefixes`)
7. `## When Not To Use It`
8. Optional `## Related Rules`

Code blocks use `ts` for TypeScript, `tsx` for JSX — never `typescript`, `javascript`, or `jsx`. No emoji in docs. No `## Benefits`, `## Compatibility`, `## Version`, `## Code Examples`, or `## Applies To` sections.

### Test Boilerplate

```typescript
import { afterAll, describe, it } from "@jest/globals";
import { RuleTester } from "@typescript-eslint/rule-tester";
import rule from "../rule-name";

RuleTester.afterAll = afterAll;
RuleTester.describe = describe;
RuleTester.it = it;

const ruleTester = new RuleTester();
```

- Hooks are sorted alphabetically: `afterAll`, `describe`, `it`
- No `RuleTester.itOnly` — omit it
- No `import parser` — RuleTester uses its built-in parser
- No `expect` import — `expect` is a Jest global; reach for it directly when needed
- Add `parserOptions: { ecmaFeatures: { jsx: true } }` only for JSX rules
- A standalone `describe("rule structure", ...)` block asserting `meta` and `create` exist is **optional** — most existing tests omit it and call `ruleTester.run` at the top level directly. New rules may follow either pattern.
- These conventions apply to per-rule tests only. The integration tests in `src/__tests__/` use `expect` and do not follow the alphabetical-hook ordering — leave them as-is.

### Rule Documentation URL Pattern

```typescript
(name) =>
  `https://github.com/next-friday/eslint-plugin-nextfriday/blob/main/docs/rules/${name.replaceAll("-", "_").toUpperCase()}.md`;
```

## Commit Conventions

Commits are validated by commitlint (conventional commits). Requirements:

- Format: `type(scope): subject` — scope is **required**, body and footer are **forbidden** (single-line only)
- Subject: max 50 chars, must not start with uppercase
- Types: `build`, `chore`, `ci`, `docs`, `feat`, `fix`, `perf`, `refactor`, `revert`, `style`, `test`
- No `Co-Authored-By` trailers — commitlint forbids body/footer

Git hooks (husky): `pre-commit` runs lint-staged, `pre-push` runs `test:coverage` + typecheck + build, `commit-msg` runs commitlint. If any pre-push step fails, the push is rejected — do not bypass with `--no-verify`; fix the underlying failure.

## CI Requirements

- PRs changing `src/` or `docs/` (excluding tests) must include a `.changeset/*.md` file
- Manual edits to `package.json` or `CHANGELOG.md` will fail CI (must go through changesets)
- PR titles must follow semantic format with required scope, max 50 char subject, no uppercase start
- Do **not** edit `.github/workflows/` or `changeset:*` scripts in `package.json` without explicit approval — propose changes first

## Code Style

- No comments in code files — keep code self-documenting (PR template is the only allowed comment carrier)
- Use clear, descriptive variable and function names
- In `src/index.ts`: all imports, `rules` object keys, and rule set entries (`baseRules`, `jsxRules`, etc.) must be sorted alphabetically
- Never add "Generated with Claude Code" or any AI branding/attribution to PR descriptions, commit messages, or any public-facing content
- No emoji anywhere — including PR descriptions and commit subjects

## Branching and PRs

- Always create a feature branch — never commit directly to `main`
- One branch / one PR per release cycle: bundle follow-up work onto the current PR rather than spawning a new branch unless explicitly told otherwise

## Requirements

- Node: >=22.10.0
- pnpm: >=9.0.0 (enforced; `packageManager` pinned to `pnpm@9.12.0`)
- ESLint: ^10.0.0 (peer dependency)

## Agent skills

### Issue tracker

Issues live as GitHub issues at `github.com/next-friday/eslint-plugin-nextfriday/issues`. See `docs/agents/issue-tracker.md`.

### Triage labels

Canonical triage labels (`needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, `wontfix`) — defaults, no overrides. See `docs/agents/triage-labels.md`.

### Domain docs

Single-context repo — `CONTEXT.md` + `docs/adr/` at the repo root (created lazily by `/grill-with-docs`). See `docs/agents/domain.md`.
