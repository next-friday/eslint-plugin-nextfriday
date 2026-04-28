---
title: "Getting Started"
description: "Install eslint-plugin-nextfriday, choose a preset, and lint a project with the plugin's opinionated flat-config rules."
---

`eslint-plugin-nextfriday` is an ESLint 9 flat-config plugin that packages 57 opinionated code-quality, naming, React, and Next.js rules for teams following the Next Friday workflow.

## The Problem

- Large JavaScript and TypeScript codebases drift into inconsistent naming, import ordering, and file naming conventions.
- React and Next.js projects often need extra lint rules around props, JSX structure, lazy loading, and client-side environment variables.
- Teams want stricter defaults, but wiring dozens of custom rules by hand makes adoption slow and error-prone.
- Shared code style decisions are hard to keep synchronized when every repository invents a slightly different ESLint setup.

## The Solution

The package exposes one plugin object, six built-in flat-config presets, and two bundled plugin config getters. In `src/index.ts`, the exported `configs` object layers a 40-rule base set with a 16-rule JSX/React set and one Next.js-only rule, so you can start with a preset and only drop to manual rule wiring when you need exceptions.

```js
import nextfriday from "eslint-plugin-nextfriday";

export default [
  nextfriday.configs["nextjs/recommended"],
  ...nextfriday.configs.sonarjs,
  ...nextfriday.configs.unicorn,
];
```

## Installation

" "bun"]}>
<Tab value="npm">

```bash
npm install --save-dev eslint-plugin-nextfriday
```

</Tab>
<Tab value="pnpm">

```bash
pnpm add -D eslint-plugin-nextfriday
```

</Tab>
<Tab value="yarn">

```bash
yarn add --dev eslint-plugin-nextfriday
```

</Tab>
<Tab value="bun">

```bash
bun add -d eslint-plugin-nextfriday
```

</Tab>
</Tabs>

## Quick Start

Create an `eslint.config.mjs` file and start with the base preset:

```js
import nextfriday from "eslint-plugin-nextfriday";

export default [nextfriday.configs.base];
```

Lint a file that violates a few core rules:

```ts
const x = process.env.API_URL || "http://localhost:3000";

export default () => {
  return x;
};
```

Run ESLint:

```bash
npx eslint src/example.ts
```

Expected output will look similar to this:

```text
src/example.ts
  1:7   warning  Disallow single character variable names                nextfriday/no-single-char-variables
  1:11  warning  Avoid using fallback values with process.env            nextfriday/no-env-fallback
  3:16  warning  Disallow inline exports                                 nextfriday/no-inline-default-export
  4:3   warning  Require a blank line before return statements           nextfriday/newline-before-return
```

## Key Features

- One default export with `meta`, `configs`, and `rules` for flat-config ESLint usage.
- Six first-party presets: `base`, `base/recommended`, `react`, `react/recommended`, `nextjs`, and `nextjs/recommended`.
- Two bundled plugin config getters: `sonarjs` and `unicorn`, sourced from dependencies and ready to spread into your config.
- 57 rules grouped around naming, file conventions, code style, imports, type patterns, React/JSX behavior, and Next.js client safety.
- No per-rule options today: every rule in `src/rules/*.ts` ships with `schema: []` and `defaultOptions: []`, which keeps adoption simple and predictable.
- Support for modern environments only: ESLint 9+, flat config, Node.js 22+, and ESM-first packaging with generated CJS output.

<Cards>
  <Card title="Architecture" href="/docs/architecture">See how `src/index.ts`, the rule modules, and the preset layers fit together internally.</Card>
  <Card title="Core Concepts" href="/docs/preset-configs">Understand the preset model, rule families, and how the rules execute.</Card>
  <Card title="API Reference" href="/docs/api-reference/plugin">Inspect the exported plugin object, configs, and full rule catalog.</Card>
</Cards>
