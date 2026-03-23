import { afterAll, describe, it } from "@jest/globals";
import { RuleTester } from "@typescript-eslint/rule-tester";

import noMisleadingConstantCase from "../no-misleading-constant-case";

RuleTester.afterAll = afterAll;
RuleTester.describe = describe;
RuleTester.it = it;

const ruleTester = new RuleTester();

describe("no-misleading-constant-case", () => {
  it("should have meta property", () => {
    expect(noMisleadingConstantCase.meta).toBeDefined();
  });

  it("should have create method", () => {
    expect(typeof noMisleadingConstantCase.create).toBe("function");
  });

  ruleTester.run("no-misleading-constant-case", noMisleadingConstantCase, {
    valid: [
      {
        code: `const API_URL = "https://api.example.com";`,
        name: "should allow global SCREAMING_SNAKE_CASE for string literal",
      },
      {
        code: `const MAX = 100;`,
        name: "should allow global SCREAMING_SNAKE_CASE for number literal",
      },
      {
        code: `const ITEMS = [1, 2, 3];`,
        name: "should allow global SCREAMING_SNAKE_CASE for static array",
      },
      {
        code: `const CONFIG = { key: "value" };`,
        name: "should allow global SCREAMING_SNAKE_CASE for static object",
      },
      {
        code: `const VARIANTS = ["a", "b"] as const;`,
        name: "should allow global SCREAMING_SNAKE_CASE for as const",
      },
      {
        code: `const config = getConfig();`,
        name: "should allow camelCase for dynamic value",
      },
      {
        code: `function foo() { const totalCount = 10; }`,
        name: "should allow camelCase in local scope",
      },
      {
        code: `export const API_URL = "https://api.example.com";`,
        name: "should allow exported global SCREAMING_SNAKE_CASE",
      },
    ],
    invalid: [
      {
        code: `let API_URL = "https://api.example.com";`,
        name: "should reject SCREAMING_SNAKE_CASE with let",
        errors: [{ messageId: "mutableScreamingCase", data: { name: "API_URL", kind: "let" } }],
      },
      {
        code: `var MAX_COUNT = 10;`,
        name: "should reject SCREAMING_SNAKE_CASE with var",
        errors: [{ messageId: "mutableScreamingCase", data: { name: "MAX_COUNT", kind: "var" } }],
      },
      {
        code: `const API_URL = getUrl();`,
        name: "should reject global SCREAMING_SNAKE_CASE for dynamic value",
        errors: [{ messageId: "dynamicScreamingCase", data: { name: "API_URL" } }],
      },
      {
        code: `const PATHNAME = \`/news/\${slug}\`;`,
        name: "should reject global SCREAMING_SNAKE_CASE for dynamic template",
        errors: [{ messageId: "dynamicScreamingCase", data: { name: "PATHNAME" } }],
      },
      {
        code: `const CONFIG = { key: getValue() };`,
        name: "should reject global SCREAMING_SNAKE_CASE for object with dynamic value",
        errors: [{ messageId: "dynamicScreamingCase", data: { name: "CONFIG" } }],
      },
      {
        code: `function foo() { const MAX_RETRY = 3; }`,
        name: "should reject SCREAMING_SNAKE_CASE in local scope",
        errors: [{ messageId: "localScreamingCase", data: { name: "MAX_RETRY" } }],
      },
      {
        code: `const MyComponent = () => { const ACTIVE_ITEMS = ITEMS.filter(i => i.active); };`,
        name: "should reject SCREAMING_SNAKE_CASE in component scope",
        errors: [{ messageId: "localScreamingCase", data: { name: "ACTIVE_ITEMS" } }],
      },
      {
        code: `function foo() { const TOTAL_COUNT = 10; }`,
        name: "should reject SCREAMING_SNAKE_CASE static value in local scope",
        errors: [{ messageId: "localScreamingCase", data: { name: "TOTAL_COUNT" } }],
      },
    ],
  });
});
