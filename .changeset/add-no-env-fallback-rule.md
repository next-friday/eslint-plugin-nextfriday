---
"eslint-plugin-nextfriday": minor
---

Add new `no-env-fallback` rule to prevent dangerous fallback values for environment variables. This rule disallows using `||`, `??`, or ternary operators with `process.env` to ensure applications fail explicitly when required environment variables are missing rather than silently using default values.
