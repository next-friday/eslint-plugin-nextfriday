import { RuleTester } from "@typescript-eslint/rule-tester";
import { afterAll, describe, it } from "@jest/globals";

import noEnvFallback from "../no-env-fallback";

RuleTester.afterAll = afterAll;
RuleTester.it = it;
RuleTester.itOnly = it.only;
RuleTester.describe = describe;

const ruleTester = new RuleTester();

ruleTester.run("no-env-fallback", noEnvFallback, {
  valid: [
    {
      code: `const apiKey = process.env.API_KEY;`,
      name: "should allow environment variable without fallback",
    },
    {
      code: `const port = process.env.PORT;`,
      name: "should allow direct environment variable access",
    },
    {
      code: `if (process.env.NODE_ENV) { console.log("dev mode"); }`,
      name: "should allow environment variable in conditional",
    },
    {
      code: `const config = { apiKey: process.env.API_KEY };`,
      name: "should allow environment variable in object",
    },
    {
      code: `const fallback = "default" || "value";`,
      name: "should allow logical OR without process.env",
    },
    {
      code: `const value = someVariable ?? "default";`,
      name: "should allow nullish coalescing without process.env",
    },
    {
      code: `const result = someCondition ? "yes" : "no";`,
      name: "should allow ternary without process.env",
    },
    {
      code: `const envObj = process.env;`,
      name: "should allow accessing process.env directly",
    },
  ],
  invalid: [
    {
      code: `const apiKey = process.env.API_KEY || "default-key";`,
      name: "should disallow logical OR operator with process.env",
      errors: [
        {
          messageId: "noEnvFallback",
          line: 1,
          column: 16,
        },
      ],
    },
    {
      code: `const dbUrl = process.env.DATABASE_URL ?? "localhost";`,
      name: "should disallow nullish coalescing operator with process.env",
      errors: [
        {
          messageId: "noEnvFallback",
          line: 1,
          column: 15,
        },
      ],
    },
    {
      code: `const port = process.env.PORT ? "8080" : "3000";`,
      name: "should disallow ternary operator with process.env",
      errors: [
        {
          messageId: "noEnvFallback",
          line: 1,
          column: 14,
        },
      ],
    },
    {
      code: `const token = process.env.AUTH_TOKEN || "abc123";`,
      name: "should disallow string literal fallback with OR",
      errors: [
        {
          messageId: "noEnvFallback",
          line: 1,
          column: 15,
        },
      ],
    },
    {
      code: `const config = {
        apiUrl: process.env.API_URL ?? "https://api.example.com",
      };`,
      name: "should disallow fallback in object property",
      errors: [
        {
          messageId: "noEnvFallback",
          line: 2,
          column: 17,
        },
      ],
    },
    {
      code: `const region = process.env.AWS_REGION ? "us-east-1" : "us-west-2";`,
      name: "should disallow ternary with different fallback values",
      errors: [
        {
          messageId: "noEnvFallback",
          line: 1,
          column: 16,
        },
      ],
    },
    {
      code: `function getConfig() {
        return process.env.CONFIG_PATH || "/default/path";
      }`,
      name: "should disallow fallback in return statement",
      errors: [
        {
          messageId: "noEnvFallback",
          line: 2,
          column: 16,
        },
      ],
    },
    {
      code: `const secret = process.env.SECRET_KEY ?? "";`,
      name: "should disallow empty string as fallback",
      errors: [
        {
          messageId: "noEnvFallback",
          line: 1,
          column: 16,
        },
      ],
    },
  ],
});

describe("no-env-fallback rule structure", () => {
  it("should have correct rule structure", () => {
    expect(noEnvFallback).toHaveProperty("meta");
    expect(noEnvFallback).toHaveProperty("create");
    expect(typeof noEnvFallback.create).toBe("function");
  });
});
