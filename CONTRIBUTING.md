# Contributing to eslint-plugin-nextfriday

We welcome contributions to eslint-plugin-nextfriday! This document provides guidelines for contributing to the project.

## Table of Contents

- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Making Changes](#making-changes)
- [Testing](#testing)
- [Code Style](#code-style)
- [Submitting Changes](#submitting-changes)
- [Release Process](#release-process)

## Getting Started

### Prerequisites

- Node.js >= 22.0.0
- pnpm >= 9.0.0

### Development Setup

1. Fork the repository on GitHub
2. Clone your fork locally:

   ```bash
   git clone https://github.com/YOUR_USERNAME/eslint-plugin-nextfriday.git
   cd eslint-plugin-nextfriday
   ```

3. Install dependencies:

   ```bash
   pnpm install
   ```

4. Verify the setup:

   ```bash
   pnpm test
   pnpm build
   ```

## Development Workflow

### Essential Commands

```bash
# Development
pnpm install          # Install dependencies
pnpm build            # Build the plugin using tsup
pnpm test             # Run Jest tests
pnpm test:coverage    # Run tests with coverage report
pnpm test:watch       # Run tests in watch mode

# Code Quality
pnpm eslint           # Lint and fix code in src/
pnpm eslint:check     # Lint without fixing
pnpm prettier         # Format all files
pnpm prettier:check   # Check formatting without fixing
pnpm typecheck        # TypeScript type checking

# Release Management
pnpm changeset        # Create a changeset for versioning
```

## Making Changes

### Creating New Rules

1. **Create the rule implementation**:

   ```bash
   # Create rule file
   touch src/rules/your-rule-name.ts
   ```

2. **Follow the rule pattern**:

   ```typescript
   import { ESLintUtils } from "@typescript-eslint/utils";

   const createRule = ESLintUtils.RuleCreator(
     (name) =>
       `https://github.com/next-friday/eslint-plugin-nextfriday/blob/main/docs/rules/${name.toUpperCase().replace(/-/g, "_")}.md`,
   );

   const yourRuleName = createRule({
     name: "your-rule-name",
     meta: {
       type: "problem", // or "suggestion" or "layout"
       docs: {
         description: "Brief description of what this rule does",
       },
       messages: {
         messageId: "Error message template with {{ data }}",
       },
       schema: [], // JSON schema for rule options
       fixable: "code", // if rule provides fixes
     },
     defaultOptions: [],
     create(context) {
       return {
         // AST visitor methods
       };
     },
   });

   export default yourRuleName;
   ```

3. **Register the rule**:
   - Add to `src/rules.ts`
   - Add to appropriate configs in `src/configs.ts`
   - Update README.md rules table

4. **Create comprehensive tests**:

   ```bash
   # Create test file
   touch src/rules/__tests__/your-rule-name.test.ts
   ```

5. **Create documentation**:

   ```bash
   # Create documentation
   touch docs/rules/YOUR_RULE_NAME.md
   ```

### File Naming Conventions

- **TypeScript/JavaScript files**: kebab-case (e.g., `my-component.ts`)
- **JSX/TSX files**: PascalCase (e.g., `MyComponent.tsx`)
- **Markdown files**: SNAKE_CASE (e.g., `README.md`, `USER_GUIDE.md`)

## Testing

### Running Tests

```bash
pnpm test              # Run all tests
pnpm test:coverage     # Run with coverage report
pnpm test:watch        # Run in watch mode
```

### Test Requirements

- Maintain **90% line coverage**, **85% function coverage**, **80% branch coverage**
- Use `@typescript-eslint/rule-tester` for ESLint rule testing
- Include both valid and invalid test cases
- Test edge cases and error conditions

### Test Structure

```typescript
import { RuleTester } from "@typescript-eslint/rule-tester";
import { afterAll, describe, it } from "@jest/globals";
import yourRuleName from "../your-rule-name";

RuleTester.afterAll = afterAll;
RuleTester.it = it;
RuleTester.itOnly = it.only;
RuleTester.describe = describe;

const ruleTester = new RuleTester({
  languageOptions: {
    parser: require("@typescript-eslint/parser"),
    parserOptions: {
      ecmaVersion: 2020,
      sourceType: "module",
    },
  },
});

ruleTester.run("your-rule-name", yourRuleName, {
  valid: [
    // Valid test cases
  ],
  invalid: [
    // Invalid test cases
  ],
});
```

## Code Style

This project uses automated code formatting and linting:

- **ESLint** with Stylistic plugin for code quality
- **Prettier** for code formatting
- **TypeScript** strict mode
- **Husky** + **lint-staged** for pre-commit hooks

### Code Standards

- Use ESM module format (`import`/`export`)
- Follow TypeScript strict mode
- Prefer named exports for rules, default exports for main entry points
- No emojis in code (enforced by our own `no-emoji` rule!)
- Use meaningful variable and function names

## Submitting Changes

### Pull Request Process

1. **Create a feature branch**:

   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes** following the guidelines above

3. **Add tests** for your changes

4. **Create a changeset** (for changes that affect users):

   ```bash
   pnpm changeset
   ```

5. **Ensure all checks pass**:

   ```bash
   pnpm eslint:check
   pnpm prettier:check
   pnpm typecheck
   pnpm test
   pnpm build
   ```

6. **Commit your changes**:

   ```bash
   git add .
   git commit -m "feat(rule): add your-rule-name rule"
   ```

7. **Push to your fork**:

   ```bash
   git push origin feature/your-feature-name
   ```

8. **Create a Pull Request** on GitHub

### Commit Message Convention

We follow [Conventional Commits](https://www.conventionalcommits.org/):

```text
<type>(<scope>): <description>

[optional body]

[optional footer]
```

**Types**: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`, `ci`

**Examples**:

- `feat(rule): add no-emoji rule`
- `fix(config): correct base configuration exports`
- `docs(readme): update installation instructions`
- `test(rule): improve jsx-pascal-case test coverage`

## Release Process

This project uses an automated release process:

### For Maintainers

1. **Changesets are created** by contributors using `pnpm changeset`
2. **Version PR is created** automatically when changesets are merged
3. **Release happens automatically** when version PR is merged
4. **npm package is published** with provenance and security attestations

### Security and Quality Gates

All releases go through:

- Comprehensive pre-merge validation
- Commit message and PR title validation
- Code quality checks (ESLint, Prettier, TypeScript)
- Test suite with coverage requirements
- Build verification
- Changeset validation
- Secure publishing with npm provenance

## Architecture Overview

### Project Structure

```text
eslint-plugin-nextfriday/
├── src/
│   ├── index.ts              # Main plugin entry point
│   ├── configs.ts            # ESLint configuration presets
│   ├── rules.ts              # Central registry of all rules
│   ├── meta.ts               # Plugin metadata
│   ├── utils.ts              # Shared utilities
│   └── rules/
│       ├── rule-name.ts      # Individual rule implementations
│       └── __tests__/
│           └── rule-name.test.ts
├── docs/
│   └── rules/
│       └── RULE_NAME.md      # Rule documentation
├── lib/                      # Built output (generated)
└── .github/
    └── workflows/            # CI/CD pipelines
```

### Available Rules

- `no-emoji`: Disallow emojis in code
- `file-kebab-case`: Enforce kebab-case for .ts/.js files
- `jsx-pascal-case`: Enforce PascalCase for .jsx/.tsx files
- `md-filename-case-restriction`: Enforce SNAKE_CASE for .md files
- `prefer-destructuring-params`: Enforce destructuring for multiple parameters
- `no-explicit-return-type`: Disallow explicit return types (fixable)
- `prefer-import-type`: Enforce 'import type' for type-only imports (fixable)

### Configuration Presets

- **base**: Pure JS/TS projects (all non-JSX rules)
- **react**: React projects (base + jsx-pascal-case)
- **nextjs**: Next.js projects (same as react)
- Each has a `/recommended` variant with `error` severity instead of `warn`

## Getting Help

- Check the [README.md](README.md) for usage examples
- Read rule documentation in [docs/rules/](docs/rules/)
- Report bugs via [GitHub Issues](https://github.com/next-friday/eslint-plugin-nextfriday/issues)
- Propose features via [GitHub Discussions](https://github.com/next-friday/eslint-plugin-nextfriday/discussions)

## Code of Conduct

Be respectful, constructive, and helpful in all interactions. We're all here to make better tools for developers!

---

Thank you for contributing to eslint-plugin-nextfriday!
