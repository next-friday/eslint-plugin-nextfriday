---
"eslint-plugin-nextfriday": patch
---

Fix missing build step in CI/CD pipeline causing npm package to be published without lib directory. Added build steps before publishing in release workflow and prepublishOnly script as safety net.
