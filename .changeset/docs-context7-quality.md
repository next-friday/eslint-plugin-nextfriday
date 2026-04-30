---
"eslint-plugin-nextfriday": patch
---

Documentation quality improvements targeting Context7 scoring gaps:

- `README.md` — "Per-Directory Configuration" section now explains how flat config resolves rules (config-array order, `files`/`ignores` precedence, why flat replaces `.eslintrc` overrides), adds a preset-tier-per-directory table, and lists common edge cases (glob ordering, top-level vs scoped `ignores`, spreading array-shaped presets, `--print-config` for debugging).
- `README.md` — "Migration Strategy" section is restructured around six concrete phases: surveying violations with `eslint --format json | jq`, isolating the auto-fix pass into its own PR, adopting the warn-level preset, ratcheting clean directories to `/recommended`, managing exceptions (severity override → directory override → disable comment, in that order of preference), and tracking violation count over time. The "Prioritize rules by impact" table is unchanged.
- `docs/rules/ENFORCE_CONSTANT_CASE.md` — Configuration section split into install / enable-just-this-rule / enable-with-related-rules / enable-via-preset / scope-to-directory subsections, plus a "Severity-only — no rule options" callout clarifying that the legacy `["error", { ... }]` array form is not accepted because no rule in this plugin has options.
