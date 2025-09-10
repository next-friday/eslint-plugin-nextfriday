---
"eslint-plugin-nextfriday": patch
---

Fixed the file-kebab-case rule to allow [name].[type] filename patterns like greeting.interfaces.ts, greeting.service.ts, and foo.bar.ts while maintaining kebab-case enforcement for both name and type components.
