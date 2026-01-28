---
"eslint-plugin-nextfriday": patch
---

fix(enforce-sorted-destructuring): simplify sorting to alphabetical only

Changed the sorting behavior from type-based (string → number → boolean → object) to pure alphabetical sorting. Properties with defaults still come first, but both groups are now sorted alphabetically (A-Z) without type priority.

This makes the rule compatible with other alphabetical sorting tools and more intuitive to use.
