# md-filename-case-restriction

Enforce SNAKE_CASE filenames for .md files.

## Rule Details

This rule enforces that all Markdown (.md) files use SNAKE_CASE naming convention for their **filenames**. SNAKE_CASE uses UPPERCASE letters and underscores to separate words. This helps maintain consistency for documentation files and ensures they stand out from regular code files.

**This rule checks the filename, not the file content.**

## Examples

**Correct** filenames for this rule:

- `README.md` (SNAKE_CASE)
- `CHANGELOG.md` (SNAKE_CASE)
- `CONTRIBUTING.md` (SNAKE_CASE)
- `LICENSE.md` (SNAKE_CASE)
- `USER_GUIDE.md` (SNAKE_CASE)
- `INSTALLATION_GUIDE.md` (SNAKE_CASE)
- `TROUBLESHOOTING_GUIDE.md` (SNAKE_CASE)
- `GUIDE_2024.md` (SNAKE_CASE with numbers)
- `LICENSE_MIT.md` (SNAKE_CASE with underscores)

**Incorrect** filenames for this rule:

- `readme.md` (lowercase)
- `user-guide.md` (kebab-case)
- `userGuide.md` (camelCase)
- `UserGuide.md` (PascalCase)
- `myREADME.md` (mixed case)
- `User guide.md` (contains spaces)

## Code Examples

The content of the file doesn't matter - only the filename is checked:

```markdown
<!-- INCORRECT: File: readme.md (incorrect filename) -->

# My Project

This is a sample project.
```

```markdown
<!-- CORRECT: File: README.md (correct filename) -->

# My Project

This is a sample project.
```

```markdown
<!-- INCORRECT: File: user-guide.md (incorrect filename) -->

# User Guide

Follow these steps to get started.
```

```markdown
<!-- CORRECT: File: USER_GUIDE.md (correct filename) -->

# User Guide

Follow these steps to get started.
```

## Valid Patterns

### SNAKE_CASE

- All letters are UPPERCASE
- Uses underscores to separate words
- May contain numbers
- Examples: `README.md`, `USER_GUIDE.md`, `GUIDE_2024.md`, `LICENSE_MIT.md`

## When Not To Use It

If your project has established naming conventions for documentation that conflict with this rule, or if you need to maintain compatibility with external tools that expect specific markdown filename patterns, you may want to disable this rule.

## Notes

- This rule only applies to `.md` files
- Other file types are ignored
- Single word filenames must be UPPERCASE (e.g., `README.md`, `LICENSE.md`)
- Underscores are used to separate words in multi-word filenames
