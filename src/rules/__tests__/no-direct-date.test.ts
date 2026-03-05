import { RuleTester } from "@typescript-eslint/rule-tester";
import { afterAll, describe, it } from "@jest/globals";

import noDirectDate from "../no-direct-date";

RuleTester.afterAll = afterAll;
RuleTester.describe = describe;
RuleTester.it = it;

const ruleTester = new RuleTester();

describe("no-direct-date", () => {
  it("should have meta property", () => {
    expect(noDirectDate.meta).toBeDefined();
  });

  it("should have create method", () => {
    expect(typeof noDirectDate.create).toBe("function");
  });

  ruleTester.run("no-direct-date", noDirectDate, {
    valid: [
      {
        code: "import dayjs from 'dayjs'; const date = dayjs();",
        name: "should allow dayjs",
      },
      {
        code: "import { format, parseISO } from 'date-fns'; format(parseISO('2024-01-01'), 'yyyy-MM-dd');",
        name: "should allow date-fns imports and functions",
      },
      {
        code: "const MyDate = class {}; new MyDate();",
        name: "should allow custom Date class",
      },
      {
        code: "const timestamp = getTimestamp();",
        name: "should allow other function calls",
      },
      {
        code: "const obj = { now: () => 123 }; obj.now();",
        name: "should allow now method on other objects",
      },
      {
        code: "const DateUtil = { parse: (s) => s }; DateUtil.parse('2024');",
        name: "should allow parse method on other objects",
      },
      {
        code: "class DateHelper { static now() { return 0; } } DateHelper.now();",
        name: "should allow now on other classes",
      },
      {
        code: "const config = { Date: { now: () => 0 } }; config.Date.now();",
        name: "should allow nested Date property",
      },
    ],
    invalid: [
      {
        code: "const date = new Date();",
        name: "should reject new Date()",
        errors: [{ messageId: "noNewDate" }],
      },
      {
        code: "const date = new Date('2024-01-01');",
        name: "should reject new Date with string argument",
        errors: [{ messageId: "noNewDate" }],
      },
      {
        code: "const date = new Date(2024, 0, 1);",
        name: "should reject new Date with number arguments",
        errors: [{ messageId: "noNewDate" }],
      },
      {
        code: "const date = new Date(1704067200000);",
        name: "should reject new Date with timestamp",
        errors: [{ messageId: "noNewDate" }],
      },
      {
        code: "const timestamp = Date.now();",
        name: "should reject Date.now()",
        errors: [{ messageId: "noDateNow" }],
      },
      {
        code: "const ms = Date.parse('2024-01-01');",
        name: "should reject Date.parse()",
        errors: [{ messageId: "noDateParse" }],
      },
      {
        code: "function getDate() { return new Date(); }",
        name: "should reject new Date inside function",
        errors: [{ messageId: "noNewDate" }],
      },
      {
        code: "const getTimestamp = () => Date.now();",
        name: "should reject Date.now inside arrow function",
        errors: [{ messageId: "noDateNow" }],
      },
      {
        code: "export const currentDate = new Date();",
        name: "should reject exported new Date",
        errors: [{ messageId: "noNewDate" }],
      },
      {
        code: "if (Date.now() > deadline) {}",
        name: "should reject Date.now in condition",
        errors: [{ messageId: "noDateNow" }],
      },
      {
        code: "const dates = [new Date(), new Date()];",
        name: "should reject multiple new Date in array",
        errors: [{ messageId: "noNewDate" }, { messageId: "noNewDate" }],
      },
      {
        code: "const start = Date.now(); doWork(); const end = Date.now();",
        name: "should reject multiple Date.now calls",
        errors: [{ messageId: "noDateNow" }, { messageId: "noDateNow" }],
      },
      {
        code: "console.log(new Date().toISOString());",
        name: "should reject new Date in method chain",
        errors: [{ messageId: "noNewDate" }],
      },
      {
        code: "const isValid = !isNaN(Date.parse(dateString));",
        name: "should reject Date.parse in expression",
        errors: [{ messageId: "noDateParse" }],
      },
    ],
  });
});
