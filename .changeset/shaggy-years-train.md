---
"eslint-plugin-nextfriday": patch
---

fix 18 rules missing internal filename guards. `no-helper-function-in-hook` and `no-helper-function-in-test` now self-skip on non-matching files and are included in all presets — no consumer configuration required. all jsx rules now guard against non-jsx files using `isJsxFile()`, consistent with the established codebase pattern.
