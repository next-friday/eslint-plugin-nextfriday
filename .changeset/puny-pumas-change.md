---
"eslint-plugin-nextfriday": patch
---

fix `no-inline-nested-object` scope — the rule now applies only to function-like contexts (call arguments, `new` expressions, `return` statements, arrow implicit returns, and JSX expressions) instead of every object property; module-level data declarations such as route tables, dependency rule arrays, and configuration objects are no longer flagged, eliminating false positives in patterns where Prettier already controls the layout
