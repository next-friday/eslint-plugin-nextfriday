---
"eslint-plugin-nextfriday": patch
---

fix(no-inline-nested-object): allow arrays with only primitive values to stay inline

Arrays containing only primitives (literals, identifiers, template literals) are now allowed to be inline. Objects still require multiple lines.

- `options: ["primary", "foreground", "danger"]` is now valid
- `config: { enabled: true }` still requires multiline
- `items: [{ a: 1 }, { b: 2 }]` still requires multiline
