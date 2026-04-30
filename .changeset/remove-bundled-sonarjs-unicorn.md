---
"eslint-plugin-nextfriday": major
---

Remove bundled `configs.sonarjs` and `configs.unicorn`. These configs are no longer exported. Consumers that previously did `...nextfriday.configs.sonarjs` or `...nextfriday.configs.unicorn` must install `eslint-plugin-sonarjs` and/or `eslint-plugin-unicorn` directly and configure them in their own flat config.

Migration:

```js
import sonarjs from "eslint-plugin-sonarjs";
import unicorn from "eslint-plugin-unicorn";

export default [
  {
    plugins: { sonarjs },
    rules: { ...sonarjs.configs.recommended.rules },
  },
  {
    plugins: { unicorn },
    rules: { ...unicorn.configs.recommended.rules },
  },
];
```

The remaining six presets (`base`, `base/recommended`, `react`, `react/recommended`, `nextjs`, `nextjs/recommended`) are unchanged.
