---
"eslint-plugin-nextfriday": minor
---

feat(rules): add jsx-simple-props rule

Adds a new rule that enforces JSX props to only contain simple values:

- String literals (`foo="bar"`)
- Simple variables (`foo={bar}`)
- Member expressions (`foo={bar.baz}`)
- JSX elements (`foo={<Icon />}`)
- Arrow functions and function expressions (`foo={() => {}}`)

Disallows complex expressions like function calls, inline objects, arrays, and operators.
