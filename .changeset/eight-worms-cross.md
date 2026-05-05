---
"eslint-plugin-nextfriday": minor
---

remove `prefer-inline-type-export` rule

fix `prefer-import-type` incorrectly converting namespace imports used as JSX member expressions (e.g. `<Avatar.Root>`) to `import type`

update `prefer-props-with-children` to only flag optional `children?: ReactNode` — required `children: ReactNode` is no longer reported
