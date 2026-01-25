---
"eslint-plugin-nextfriday": patch
---

fix(newline-after-multiline-block): exclude import declarations from requiring blank lines between them

Multi-line imports followed by other imports no longer require a blank line, avoiding conflicts with `import-x/order` rule. Blank lines are still required when a multi-line import is followed by a non-import statement.
