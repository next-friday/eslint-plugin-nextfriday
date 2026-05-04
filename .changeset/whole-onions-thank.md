---
"eslint-plugin-nextfriday": patch
---

remove tsup as a transitive runtime dependency by moving it to devDependencies — consumers no longer have tsup and esbuild installed unnecessarily. upgrade typescript to 6.0, eslint to 10.3, and remaining dev dependencies. migrate build tooling from tsup to tsdown and test runner from ts-jest to @swc/jest for typescript 6 compatibility.
