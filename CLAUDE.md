# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is `eslint-plugin-nextfriday`, an ESLint plugin providing custom rules and configurations for Next Friday development workflows. Supports ESLint 9+ flat config with presets for base (JS/TS), React, and Next.js projects. Built with tsup for dual CJS/ESM output.

## Development Commands

```bash
pnpm build               # Build plugin using tsup (outputs to lib/)
pnpm test                # Run all tests with Jest
pnpm test src/rules/__tests__/file-kebab-case.test.ts  # Run single test
pnpm eslint              # Lint and auto-fix
pnpm typecheck           # Run TypeScript type checking
pnpm changeset           # Create a changeset for version bumping
```

## Code Architecture

### Entry Point

`src/index.ts` - Main plugin export containing:

- `meta` - Plugin name and version from package.json
- `rules` - All 42 rule implementations keyed by hyphenated name
- `configs` - Six configuration presets generated via `createConfig()`

The plugin is exported both as default and as named exports `{ meta, configs, rules }`.

### Rule Structure

- `src/rules/{rule-name}.ts` - Rule implementations using `ESLintUtils.RuleCreator()`
- `src/rules/__tests__/{rule-name}.test.ts` - Tests using `@typescript-eslint/rule-tester`
- `docs/rules/{RULE_NAME_UPPERCASE}.md` - Rule documentation (hyphens become underscores)

All rules use `schema: []` and `defaultOptions: []` (no configurable options).

### Configuration Presets

Six configs built from three rule set tiers. Each tier has a `warn` variant and a `Recommended` (`error`) variant defined as separate constants in `src/index.ts` (e.g., `baseRules`/`baseRecommendedRules`, `jsxRules`/`jsxRecommendedRules`, `nextjsOnlyRules`/`nextjsOnlyRecommendedRules`).

| Preset                          | Rules                       | Severity     |
| ------------------------------- | --------------------------- | ------------ |
| `base` / `base/recommended`     | 29 base                     | warn / error |
| `react` / `react/recommended`   | 29 base + 12 JSX            | warn / error |
| `nextjs` / `nextjs/recommended` | 29 base + 12 JSX + 1 nextjs | warn / error |

### Utilities

`src/utils.ts` - Shared functions for filename parsing (`getFileExtension`, `getBaseName`), file type detection (`isJsFile`, `isJsxFile`, `isConfigFile`), and function parameter analysis (`getFunctionParams`, `hasMultipleParams`, `hasNonDestructuredParams`).

### Test Structure

- **Per-rule tests** use `@typescript-eslint/rule-tester` wired to Jest hooks (`RuleTester.afterAll = afterAll`, etc.). Each test file has valid/invalid cases plus a structural `describe` block asserting `meta` and `create` exist.
- **Integration test** at `src/__tests__/rules.test.ts` asserts the exact rule count and that every rule name is present. This must be updated when adding/removing rules.

## Creating New Rules

1. Add rule file: `src/rules/{rule-name}.ts`
2. Create test file: `src/rules/__tests__/{rule-name}.test.ts`
3. Register in `src/index.ts`:
   - Import the rule
   - Add to `rules` object
   - Add to both the warn and recommended variants of the appropriate rule set (e.g., `jsxRules` AND `jsxRecommendedRules`)
4. Create documentation: `docs/rules/{RULE_NAME_UPPERCASE}.md`
5. Update README.md rules table
6. Update `src/__tests__/rules.test.ts`:
   - Update rule count in "should have exactly N rules" test
   - Add rule name to "should have correct rule names" test
7. Create a changeset: `pnpm changeset` (required for CI to pass on PRs that change `src/` or `docs/`)

### Rule Documentation URL Pattern

```typescript
(name) =>
  `https://github.com/next-friday/eslint-plugin-nextfriday/blob/main/docs/rules/${name.replaceAll("-", "_").toUpperCase()}.md`;
```

## Commit Conventions

Commits are validated by commitlint (conventional commits). Requirements:

- Format: `type(scope): subject` - scope is **required**, body and footer are **forbidden**
- Subject: max 50 chars, must not start with uppercase
- Types: `build`, `chore`, `ci`, `docs`, `feat`, `fix`, `perf`, `refactor`, `revert`, `style`, `test`

Git hooks (husky): `pre-commit` runs lint-staged, `pre-push` runs tests + typecheck + build, `commit-msg` runs commitlint.

## CI Requirements

- PRs changing `src/` or `docs/` (excluding tests) must include a `.changeset/*.md` file
- Manual edits to `package.json` or `CHANGELOG.md` will fail CI (must go through changesets)
- PR titles must follow semantic format with required scope, max 50 char subject, no uppercase start

## Code Style

- No comments in code files - keep code self-documenting
- Use clear, descriptive variable and function names

## Requirements

- Node: >=22.0.0
- pnpm: >=9.0.0 (enforced)
- ESLint: ^9.0.0 (peer dependency)
