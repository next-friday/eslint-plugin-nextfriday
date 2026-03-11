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
- `rules` - All 52 rule implementations keyed by hyphenated name
- `configs` - Eight configuration presets (six nextfriday presets via `createConfig()`, plus lazy `sonarjs` and `unicorn` getters that wrap external plugins)

The plugin is exported both as default and as named exports `{ meta, configs, rules }`.

### Rule Structure

- `src/rules/{rule-name}.ts` - Rule implementations using `ESLintUtils.RuleCreator()`
- `src/rules/__tests__/{rule-name}.test.ts` - Tests using `@typescript-eslint/rule-tester`
- `docs/rules/{RULE_NAME_UPPERCASE}.md` - Rule documentation (hyphens become underscores)

All rules use `schema: []` and `defaultOptions: []` (no configurable options).

### Configuration Presets

Eight configs total. Six nextfriday presets built from three rule set tiers, each with a `warn` variant and a `Recommended` (`error`) variant defined as separate constants in `src/index.ts` (e.g., `baseRules`/`baseRecommendedRules`, `jsxRules`/`jsxRecommendedRules`, `nextjsOnlyRules`/`nextjsOnlyRecommendedRules`). Two additional configs (`sonarjs`, `unicorn`) are lazy getters wrapping external plugins.

| Preset                          | Rules                             | Severity     |
| ------------------------------- | --------------------------------- | ------------ |
| `base` / `base/recommended`     | 36 base                           | warn / error |
| `react` / `react/recommended`   | 36 base + 15 JSX                  | warn / error |
| `nextjs` / `nextjs/recommended` | 36 base + 15 JSX + 1 nextjs       | warn / error |
| `sonarjs`                       | eslint-plugin-sonarjs recommended | -            |
| `unicorn`                       | eslint-plugin-unicorn recommended | -            |

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
- No `expect` import — structural tests use `toBeDefined()` from the `it` callback
- Add `parserOptions: { ecmaFeatures: { jsx: true } }` only for JSX rules
- Each test file ends with a `describe("rule structure", ...)` block asserting `meta` and `create` exist

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
- In `src/index.ts`: all imports, `rules` object keys, and rule set entries (`baseRules`, `jsxRules`, etc.) must be sorted alphabetically
- Never add "Generated with Claude Code" or any AI branding/attribution to PR descriptions, commit messages, or any public-facing content
- No Co-Authored-By trailers in commits (commitlint forbids body/footer anyway)

## Requirements

- Node: >=22.0.0
- pnpm: >=9.0.0 (enforced)
- ESLint: ^9.0.0 (peer dependency)
