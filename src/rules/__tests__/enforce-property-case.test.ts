import { afterAll, describe, it } from "@jest/globals";
import { RuleTester } from "@typescript-eslint/rule-tester";

import enforcePropertyCase from "../enforce-property-case";

RuleTester.afterAll = afterAll;
RuleTester.describe = describe;
RuleTester.it = it;

const ruleTester = new RuleTester();

describe("enforce-property-case", () => {
  it("should have meta property", () => {
    expect(enforcePropertyCase.meta).toBeDefined();
  });

  it("should have create method", () => {
    expect(typeof enforcePropertyCase.create).toBe("function");
  });

  ruleTester.run("enforce-property-case", enforcePropertyCase, {
    valid: [
      {
        code: `const obj = { firstName: "John", lastName: "Doe" };`,
        name: "should allow camelCase properties",
      },
      {
        code: `const obj = { "first_name": "John", "last_name": "Doe" };`,
        name: "should allow quoted snake_case properties (API boundary)",
      },
      {
        code: `const obj = { "ITEM_ID": 1 };`,
        name: "should allow quoted SCREAMING_SNAKE_CASE properties",
      },
      {
        code: `const obj = { a: 1, b: 2 };`,
        name: "should allow single letter properties",
      },
      {
        code: `const obj = { x, y, z };`,
        name: "should allow shorthand properties",
      },
      {
        code: `const obj = { [dynamicKey]: "value" };`,
        name: "should allow computed properties",
      },
      {
        code: `const STATUS_MAP = { ACTIVE: "active", INACTIVE: "inactive" } as const;`,
        name: "should allow SCREAMING_SNAKE_CASE in as const objects",
      },
      {
        code: `const CATEGORIES = [{ item_id: "1" }] as const;`,
        name: "should allow snake_case in as const array of objects",
      },
    ],
    invalid: [
      {
        code: `const obj = { first_name: "John" };`,
        name: "should reject unquoted snake_case property",
        errors: [{ messageId: "useCamelCase", data: { name: "first_name" } }],
      },
      {
        code: `const obj = { last_name: "Doe" };`,
        name: "should reject unquoted snake_case property key",
        errors: [{ messageId: "useCamelCase", data: { name: "last_name" } }],
      },
      {
        code: `const obj = { ITEM_ID: 1 };`,
        name: "should reject unquoted SCREAMING_SNAKE_CASE property",
        errors: [{ messageId: "useCamelCase", data: { name: "ITEM_ID" } }],
      },
      {
        code: `const obj = { first_name: "John", last_name: "Doe" };`,
        name: "should reject multiple snake_case properties",
        errors: [
          { messageId: "useCamelCase", data: { name: "first_name" } },
          { messageId: "useCamelCase", data: { name: "last_name" } },
        ],
      },
    ],
  });
});
