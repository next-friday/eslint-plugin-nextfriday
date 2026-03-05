# md-filename-case-restriction

Enforce SNAKE_CASE filenames for .md files.

## Rule Details

This rule enforces that all Markdown (.md) files use UPPER_SNAKE_CASE naming convention for their **filenames**. All letters must be uppercase with underscores separating words. May contain numbers.

**This rule checks the filename, not the file content.** Only `.md` files are checked; other file types are ignored.

## Examples

### Correct

- `README.md` (SNAKE_CASE)
- `CHANGELOG.md` (SNAKE_CASE)
- `CONTRIBUTING.md` (SNAKE_CASE)
- `LICENSE.md` (SNAKE_CASE)
- `USER_GUIDE.md` (SNAKE_CASE)
- `INSTALLATION_GUIDE.md` (SNAKE_CASE)
- `TROUBLESHOOTING_GUIDE.md` (SNAKE_CASE)
- `GUIDE_2024.md` (SNAKE_CASE with numbers)
- `LICENSE_MIT.md` (SNAKE_CASE with underscores)

### Incorrect

- `readme.md` (lowercase)
- `user-guide.md` (kebab-case)
- `userGuide.md` (camelCase)
- `UserGuide.md` (PascalCase)
- `myREADME.md` (mixed case)
- `User guide.md` (contains spaces)

## When Not To Use It

If your project has established naming conventions for documentation that conflict with this rule, or if you need to maintain compatibility with external tools that expect specific markdown filename patterns, you may want to disable this rule.
