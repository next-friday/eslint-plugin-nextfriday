import { RuleTester } from "@typescript-eslint/rule-tester";
import { afterAll, describe, it } from "@jest/globals";

import enforceCurlyNewline from "../enforce-curly-newline";

RuleTester.afterAll = afterAll;
RuleTester.describe = describe;
RuleTester.it = it;

const ruleTester = new RuleTester();

describe("enforce-curly-newline", () => {
  it("should have meta property", () => {
    expect(enforceCurlyNewline.meta).toBeDefined();
  });

  it("should have create method", () => {
    expect(typeof enforceCurlyNewline.create).toBe("function");
  });

  ruleTester.run("enforce-curly-newline", enforceCurlyNewline, {
    valid: [
      {
        code: `if (!data) return [];`,
        name: "single-line without braces - allowed",
      },
      {
        code: `if (x > 0) doSomething();`,
        name: "single-line function call without braces - allowed",
      },
      {
        code: `
if (
  veryLongCondition &&
  anotherCondition
) {
  return [];
}
      `.trim(),
        name: "multi-line with braces (wrapped condition) - allowed",
      },
      {
        code: `
if (condition) {
  doSomething();
}
      `.trim(),
        name: "multi-line with braces (body on new line) - allowed",
      },
      {
        code: `
if (a && b && c) {
  doA();
  doB();
}
      `.trim(),
        name: "multi-line with multiple statements - allowed",
      },
    ],
    invalid: [
      {
        code: `if (!data) { return []; }`,
        name: "single-line with braces - should remove braces",
        errors: [{ messageId: "forbidBraces" }],
        output: `if (!data) return [];`,
      },
      {
        code: `if (x > 0) { doSomething(); }`,
        name: "single-line function call with braces - should remove braces",
        errors: [{ messageId: "forbidBraces" }],
        output: `if (x > 0) doSomething();`,
      },
      {
        code: `if (isValid) { return true; }`,
        name: "single-line return with braces - should remove braces",
        errors: [{ messageId: "forbidBraces" }],
        output: `if (isValid) return true;`,
      },
      {
        code: `
if (
  veryLongCondition &&
  anotherCondition
) return [];
      `.trim(),
        name: "multi-line without braces (wrapped condition) - should add braces",
        errors: [{ messageId: "requireBraces" }],
        output: `
if (
  veryLongCondition &&
  anotherCondition
) {
  return [];
}
      `.trim(),
      },
      {
        code: `
if (condition)
  doSomething();
      `.trim(),
        name: "multi-line without braces (body on new line) - should add braces",
        errors: [{ messageId: "requireBraces" }],
        output: `
if (condition) {
  doSomething();
}
      `.trim(),
      },
    ],
  });
});
