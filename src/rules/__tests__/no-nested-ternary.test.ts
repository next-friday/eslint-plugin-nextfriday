import { RuleTester } from "@typescript-eslint/rule-tester";
import { afterAll, describe, it, expect } from "@jest/globals";

import noNestedTernary from "../no-nested-ternary";

RuleTester.afterAll = afterAll;
RuleTester.it = it;
RuleTester.itOnly = it.only;
RuleTester.describe = describe;

const ruleTester = new RuleTester();

ruleTester.run("no-nested-ternary", noNestedTernary, {
  valid: [
    {
      code: `const status = isLoading ? "loading" : "success";`,
      name: "simple ternary - allowed",
    },
    {
      code: `const value = condition ? a : b;`,
      name: "basic ternary - allowed",
    },
    {
      code: `
const getStatus = () => {
  if (isLoading) return "loading";
  if (isError) return "error";
  return "success";
};
      `.trim(),
      name: "function with early returns - allowed",
    },
    {
      code: `const result = arr.map(x => x > 0 ? x : 0);`,
      name: "ternary inside map - allowed",
    },
  ],
  invalid: [
    {
      code: `const status = isLoading ? "loading" : isError ? "error" : "success";`,
      name: "nested ternary in alternate - disallowed",
      errors: [{ messageId: "noNestedTernary" }],
    },
    {
      code: `const value = a ? (b ? 1 : 2) : 3;`,
      name: "nested ternary in consequent - disallowed",
      errors: [{ messageId: "noNestedTernary" }],
    },
    {
      code: `const x = a ? b ? c : d : e;`,
      name: "nested ternary without parens - disallowed",
      errors: [{ messageId: "noNestedTernary" }],
    },
    {
      code: `const result = a ? 1 : b ? 2 : c ? 3 : 4;`,
      name: "deeply nested ternary - disallowed",
      errors: [{ messageId: "noNestedTernary" }, { messageId: "noNestedTernary" }],
    },
  ],
});

describe("no-nested-ternary rule structure", () => {
  it("should have correct rule structure", () => {
    expect(noNestedTernary).toHaveProperty("meta");
    expect(noNestedTernary).toHaveProperty("create");
    expect(typeof noNestedTernary.create).toBe("function");
  });
});
