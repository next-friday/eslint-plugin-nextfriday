# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is `eslint-plugin-nextfriday`, an ESLint plugin that provides custom rules and configurations for Next Friday development workflows. The plugin supports ESLint 9+ flat config and legacy config formats, with presets for base (JS/TS), React, and Next.js projects.

## Development Commands

### Building

```bash
pnpm build               # Build plugin using tsup (outputs to lib/)
pnpm clear               # Clean build artifacts and caches
```

### Testing

```bash
pnpm test                # Run all tests with Jest
pnpm test:watch          # Run tests in watch mode
pnpm test:coverage       # Generate coverage report
```

To run a single test file:

```bash
pnpm test src/rules/__tests__/file-kebab-case.test.ts
```

### Linting & Formatting

```bash
pnpm eslint              # Lint and auto-fix
pnpm eslint:check        # Lint without fixing
pnpm prettier            # Format all files
pnpm prettier:check      # Check formatting
pnpm typecheck           # Run TypeScript type checking
```

### Release Management

```bash
pnpm changeset           # Create a changeset for version bumping
pnpm changeset:version   # Bump versions based on changesets
pnpm changeset:publish   # Publish to npm with provenance
```

## Code Architecture

### Entry Point

- `src/index.ts` - Main plugin export that combines rules, configs, and metadata
  - Exports plugin object with `meta`, `rules`, and `configs`
  - Defines all configuration presets (base, react, nextjs, and their recommended variants)
  - All configs are generated programmatically using `createConfig()`

### Rule Structure

- `src/rules/*.ts` - Individual ESLint rule implementations
- `src/rules/__tests__/*.test.ts` - Tests using `@typescript-eslint/rule-tester`
- Each rule file exports a rule created with `ESLintUtils.RuleCreator()`
- Rule documentation links follow pattern: `docs/rules/{RULE_NAME_UPPERCASE}.md`

### Rules Registry

All 14 rules are registered in `src/index.ts`:

1. File naming: `file-kebab-case`, `jsx-pascal-case`, `md-filename-case-restriction`
2. Code style: `no-emoji`, `prefer-destructuring-params`, `no-explicit-return-type`, `no-complex-inline-return`, `no-logic-in-params`
3. Import optimization: `prefer-import-type`, `prefer-react-import-types`
4. Parameter patterns: `prefer-named-param-types`
5. React conventions: `prefer-interface-over-inline-types`, `react-props-destructure`, `enforce-readonly-component-props`

### Configuration Presets

Three config families with strict ("recommended") and lenient variants:

- `base` / `base/recommended` - For pure JS/TS projects (10 rules)
- `react` / `react/recommended` - Base + React-specific rules (14 rules)
- `nextjs` / `nextjs/recommended` - Same as React configs (14 rules)

Difference: lenient uses `"warn"`, recommended uses `"error"`

### Utilities

- `src/utils.ts` - Shared utilities for filename parsing, file type detection, and function parameter analysis
- Used by multiple rules for consistent behavior

### Build Configuration

- `tsup.config.ts` - Builds both CJS and ESM formats with TypeScript declarations
- `jest.config.ts` - Configured for ESM with ts-jest preset
- Output directory: `lib/` (git-ignored)

## Important Patterns

### Creating New Rules

1. Add rule file in `src/rules/{rule-name}.ts`
2. Create test file in `src/rules/__tests__/{rule-name}.test.ts`
3. Register rule in `src/index.ts` rules object
4. Add to appropriate config preset(s) in `src/index.ts`
5. Create documentation in `docs/rules/{RULE_NAME_UPPERCASE}.md`
6. Update README.md rules table

### Rule Documentation URLs

All rules use this URL pattern generator:

```typescript
(name) =>
  `https://github.com/next-friday/eslint-plugin-nextfriday/blob/main/docs/rules/${name.replace(/-/g, "_").toUpperCase()}.md`;
```

### Testing with RuleTester

Tests use `@typescript-eslint/rule-tester` with:

- `valid` array for passing test cases
- `invalid` array for failing cases with expected errors/fixes
- TypeScript parser configuration

### Code Style Preferences

- No comments in code files - keep code clean and self-documenting
- Use clear, descriptive variable and function names instead of explanatory comments

## Package Management

- **Package Manager**: pnpm 9.12.0+ (enforced via preinstall hook)
- **Node Version**: 22.0.0+
- **Module System**: ESM (with CJS compatibility for consumers)

## Git Workflow

- Uses Husky for git hooks
- Changesets for version management and changelog generation
- Conventional commits enforced via commitlint
- Main branch: `main`

## Test File Updates

When adding a new rule, remember to update `src/__tests__/rules.test.ts`:

1. Update the rule count in the "should have exactly X rules" test
2. Add the new rule name to the "should have correct rule names" test
3. Add a dedicated test for the new rule's existence and structure
