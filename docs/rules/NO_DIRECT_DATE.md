# no-direct-date

Disallow direct usage of Date constructor and methods to enforce centralized date utilities.

## Rule Details

This rule prevents the use of the native JavaScript `Date` constructor and its static methods (`Date.now()`, `Date.parse()`). Using a centralized date utility library like dayjs, date-fns, or Luxon provides better consistency, easier testing, and more predictable date handling across your application.

## Examples

**Incorrect** code for this rule:

```js
const now = new Date();
const timestamp = Date.now();
const parsed = Date.parse("2024-01-01");
const specificDate = new Date("2024-01-01");
const dateFromTimestamp = new Date(1704067200000);
const dateFromParts = new Date(2024, 0, 1);
```

**Correct** code for this rule:

```js
import dayjs from "dayjs";

const now = dayjs();
const timestamp = dayjs().valueOf();
const parsed = dayjs("2024-01-01");
const specificDate = dayjs("2024-01-01");
const dateFromTimestamp = dayjs(1704067200000);
```

## When Not To Use It

If your project does not use a centralized date utility library and you prefer to work directly with the native JavaScript Date API, you can disable this rule.
