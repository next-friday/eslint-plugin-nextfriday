---
"eslint-plugin-nextfriday": minor
---

feat(rules): add no-lazy-identifiers rule

Added a new rule `no-lazy-identifiers` that detects and disallows lazy variable names:

- Repeated characters (3+): `xxx`, `aaa`, `zzz`
- Keyboard sequences (4+): `asdf`, `qwerty`, `hjkl`, `zxcv`
