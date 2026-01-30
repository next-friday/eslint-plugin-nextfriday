# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is `eslint-plugin-nextfriday`, an ESLint plugin providing custom rules and configurations for Next Friday development workflows. Supports ESLint 9+ flat config with presets for base (JS/TS), React, and Next.js projects.

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
- `rules` - All 41 rule implementations
- `configs` - Six configuration presets generated via `createConfig()`

### Rule Structure

- `src/rules/{rule-name}.ts` - Individual rule implementations using `ESLintUtils.RuleCreator()`
- `src/rules/__tests__/{rule-name}.test.ts` - Tests using `@typescript-eslint/rule-tester`
- `docs/rules/{RULE_NAME_UPPERCASE}.md` - Rule documentation (hyphens become underscores)

### Configuration Presets

Three rule sets combined into six configs:

**Base rules (29 rules):** Variable naming, file naming, code style, import optimization
**JSX rules (11 rules):** React component conventions, JSX formatting
**Next.js rules (1 rule):** Next.js-specific rules (e.g., `nextjs-require-public-env`)

| Preset                          | Rules                       | Severity     |
| ------------------------------- | --------------------------- | ------------ |
| `base` / `base/recommended`     | 29 base                     | warn / error |
| `react` / `react/recommended`   | 29 base + 11 JSX            | warn / error |
| `nextjs` / `nextjs/recommended` | 29 base + 11 JSX + 1 nextjs | warn / error |

### Utilities

`src/utils.ts` - Shared functions for filename parsing, file type detection, and function parameter analysis.

## Creating New Rules

1. Add rule file: `src/rules/{rule-name}.ts`
2. Create test file: `src/rules/__tests__/{rule-name}.test.ts`
3. Register in `src/index.ts`:
   - Import the rule
   - Add to `rules` object
   - Add to appropriate rule set: `baseRules`/`baseRecommendedRules`, `jsxRules`/`jsxRecommendedRules`, or `nextjsOnlyRules`/`nextjsOnlyRecommendedRules`
4. Create documentation: `docs/rules/{RULE_NAME_UPPERCASE}.md`
5. Update README.md rules table
6. Update `src/__tests__/rules.test.ts`:
   - Update rule count in "should have exactly X rules" test
   - Add rule name to "should have correct rule names" test

### Rule Documentation URL Pattern

```typescript
(name) =>
  `https://github.com/next-friday/eslint-plugin-nextfriday/blob/main/docs/rules/${name.replaceAll("-", "_").toUpperCase()}.md`;
```

## Code Style

- No comments in code files - keep code self-documenting
- Use clear, descriptive variable and function names

## Requirements

- Node: >=22.0.0
- pnpm: >=9.0.0 (enforced)
- ESLint: ^9.0.0 (peer dependency)
