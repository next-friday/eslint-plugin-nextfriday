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
        name: "should allow SCREAMING_SNAKE_CASE for string literal",
      },
      {
        code: `const MAX = 100;`,
        name: "should allow SCREAMING_SNAKE_CASE for number literal",
      },
      {
        code: `const IS_PRODUCTION = true;`,
        name: "should allow SCREAMING_SNAKE_CASE for boolean literal",
      },
      {
        code: `const TEMPLATE = \`hello world\`;`,
        name: "should allow SCREAMING_SNAKE_CASE for static template literal",
      },
      {
        code: `const NEGATIVE = -1;`,
        name: "should allow SCREAMING_SNAKE_CASE for negative number",
      },
      {
        code: `const config = getConfig();`,
        name: "should allow camelCase for function call",
      },
      {
        code: `const items = [1, 2, 3];`,
        name: "should allow camelCase for array",
      },
      {
        code: `const settings = { key: "value" };`,
        name: "should allow camelCase for object",
      },
      {
        code: `const pathname = \`/news/\${slug}\`;`,
        name: "should allow camelCase for dynamic template literal",
      },
      {
        code: `let count = 10;`,
        name: "should allow camelCase for let declaration",
      },
      {
        code: `var name = "foo";`,
        name: "should allow camelCase for var declaration",
      },
      {
        code: `const result = a + b;`,
        name: "should allow camelCase for computed value",
      },
      {
        code: `const userId = await fetchId();`,
        name: "should allow camelCase for await expression",
      },
      {
        code: `export const API_URL = "https://api.example.com";`,
        name: "should allow exported SCREAMING_SNAKE_CASE for static primitive",
      },
    ],
    invalid: [
      {
        code: `let API_URL = "https://api.example.com";`,
        name: "should reject SCREAMING_SNAKE_CASE with let",
        errors: [
          {
            messageId: "mutableScreamingCase",
            data: { name: "API_URL", kind: "let" },
          },
        ],
      },
      {
        code: `var MAX_COUNT = 10;`,
        name: "should reject SCREAMING_SNAKE_CASE with var",
        errors: [
          {
            messageId: "mutableScreamingCase",
            data: { name: "MAX_COUNT", kind: "var" },
          },
        ],
      },
      {
        code: `let TEMPLATE = \`hello\`;`,
        name: "should reject SCREAMING_SNAKE_CASE template literal with let",
        errors: [
          {
            messageId: "mutableScreamingCase",
            data: { name: "TEMPLATE", kind: "let" },
          },
        ],
      },
      {
        code: `const API_URL = getUrl();`,
        name: "should reject SCREAMING_SNAKE_CASE for function call",
        errors: [
          {
            messageId: "dynamicScreamingCase",
            data: { name: "API_URL" },
          },
        ],
      },
      {
        code: `const USER_ID = await fetchId();`,
        name: "should reject SCREAMING_SNAKE_CASE for await expression",
        errors: [
          {
            messageId: "dynamicScreamingCase",
            data: { name: "USER_ID" },
          },
        ],
      },
      {
        code: `const PATHNAME = \`/news/\${slug}\`;`,
        name: "should reject SCREAMING_SNAKE_CASE for dynamic template literal",
        errors: [
          {
            messageId: "dynamicScreamingCase",
            data: { name: "PATHNAME" },
          },
        ],
      },
      {
        code: `const CONFIG = { key: "value" };`,
        name: "should reject SCREAMING_SNAKE_CASE for object literal",
        errors: [
          {
            messageId: "dynamicScreamingCase",
            data: { name: "CONFIG" },
          },
        ],
      },
      {
        code: `const ITEMS = [1, 2, 3];`,
        name: "should reject SCREAMING_SNAKE_CASE for array literal",
        errors: [
          {
            messageId: "dynamicScreamingCase",
            data: { name: "ITEMS" },
          },
        ],
      },
      {
        code: `const RESULT = a + b;`,
        name: "should reject SCREAMING_SNAKE_CASE for binary expression",
        errors: [
          {
            messageId: "dynamicScreamingCase",
            data: { name: "RESULT" },
          },
        ],
      },
      {
        code: `const ACTIVE_USERS = users.filter(u => u.active);`,
        name: "should reject SCREAMING_SNAKE_CASE for method call",
        errors: [
          {
            messageId: "dynamicScreamingCase",
            data: { name: "ACTIVE_USERS" },
          },
        ],
      },
      {
        code: `const CLIENT = new ApiClient();`,
        name: "should reject SCREAMING_SNAKE_CASE for new expression",
        errors: [
          {
            messageId: "dynamicScreamingCase",
            data: { name: "CLIENT" },
          },
        ],
      },
    ],
  });
});
