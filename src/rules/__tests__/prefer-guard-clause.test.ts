import { RuleTester } from "@typescript-eslint/rule-tester";
import { afterAll, describe, it, expect } from "@jest/globals";

import preferGuardClause from "../prefer-guard-clause";

RuleTester.afterAll = afterAll;
RuleTester.it = it;
RuleTester.itOnly = it.only;
RuleTester.describe = describe;

const ruleTester = new RuleTester();

ruleTester.run("prefer-guard-clause", preferGuardClause, {
  valid: [
    {
      code: `
function process(data) {
  if (!data) return [];
  if (!data.items) return [];
  return data.items.map(toItem);
}
      `.trim(),
      name: "guard clauses with early returns - allowed",
    },
    {
      code: `
function validate(input) {
  if (!input) return false;
  if (!input.name) return false;
  if (!input.email) return false;
  return true;
}
      `.trim(),
      name: "multiple guard clauses - allowed",
    },
    {
      code: `
if (condition) {
  doA();
  doB();
}
      `.trim(),
      name: "if with multiple statements (no nested if) - allowed",
    },
    {
      code: `
if (a) {
  doSomething();
  if (b) {
    doSomethingElse();
  }
}
      `.trim(),
      name: "if with other statements before nested if - allowed",
    },
    {
      code: `if (condition) doSomething();`,
      name: "simple single-line if - allowed",
    },
  ],
  invalid: [
    {
      code: `
function process(data) {
  if (data) {
    if (data.items) {
      return data.items.map(toItem);
    }
  }
  return [];
}
      `.trim(),
      name: "nested if statements - disallowed",
      errors: [{ messageId: "preferGuardClause" }],
    },
    {
      code: `
if (a) {
  if (b) {
    doSomething();
  }
}
      `.trim(),
      name: "nested if with single statement - disallowed",
      errors: [{ messageId: "preferGuardClause" }],
    },
    {
      code: `
if (user) {
  if (user.isAdmin) {
    return adminDashboard();
  }
}
      `.trim(),
      name: "nested if checking property - disallowed",
      errors: [{ messageId: "preferGuardClause" }],
    },
  ],
});

describe("prefer-guard-clause rule structure", () => {
  it("should have correct rule structure", () => {
    expect(preferGuardClause).toHaveProperty("meta");
    expect(preferGuardClause).toHaveProperty("create");
    expect(typeof preferGuardClause.create).toBe("function");
  });
});
