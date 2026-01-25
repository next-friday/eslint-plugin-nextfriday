---
"eslint-plugin-nextfriday": minor
---

feat(no-inline-default-export): extend rule to also flag inline named exports

The `no-inline-default-export` rule now also flags inline named exports like `export function xxx()` and `export class Xxx`. These should be declared first, then exported separately using `export { xxx };`.

### New behavior

**Incorrect:**

```typescript
export function fetchData() { ... }
export async function fetchHighlight() { ... }
export class UserService { ... }
```

**Correct:**

```typescript
function fetchData() { ... }
export { fetchData };

async function fetchHighlight() { ... }
export default fetchHighlight;

class UserService { ... }
export { UserService };
```
