---
"eslint-plugin-nextfriday": major
---

Upgrade to ESLint 10. Peer dependency now requires `eslint@^10.0.0` (previously `^9.0.0`). Bumped `eslint` and `@eslint/js` to v10. Removed `eslint-config-airbnb-extended` (no ESLint 10 support upstream); local lint config now relies on `@eslint/js`, `typescript-eslint`, `eslint-plugin-import-x`, `eslint-plugin-sonarjs`, `eslint-plugin-jest`, and `eslint-plugin-prettier` directly.
