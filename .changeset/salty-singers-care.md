---
"eslint-plugin-nextfriday": minor
---

Add two new rules to improve code readability and debugging: `no-complex-inline-return` disallows complex inline expressions (such as ternary operators, logical expressions, or `new` expressions) directly in return statements, requiring extraction to a `const` variable instead; and `no-logic-in-params` prohibits using logic or conditions (e.g., ternary, logical, comparison, or negation operators) within function parameters, enforcing the use of intermediate `const` variables to enhance clarity and allow inspection of values.
