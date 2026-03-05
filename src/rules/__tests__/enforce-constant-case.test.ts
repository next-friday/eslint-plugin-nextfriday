import { RuleTester } from "@typescript-eslint/rule-tester";
import { afterAll, describe, it } from "@jest/globals";

import enforceConstantCase from "../enforce-constant-case";

RuleTester.afterAll = afterAll;
RuleTester.describe = describe;
RuleTester.it = it;

const ruleTester = new RuleTester();

describe("enforce-constant-case", () => {
  it("should have meta property", () => {
    expect(enforceConstantCase.meta).toBeDefined();
  });

  it("should have create method", () => {
    expect(typeof enforceConstantCase.create).toBe("function");
  });

  ruleTester.run("enforce-constant-case", enforceConstantCase, {
    valid: [
      {
        code: `const DEFAULT_COVER = "/images/default.jpg";`,
        name: "should allow SCREAMING_SNAKE_CASE string constant",
      },
      {
        code: `const PAGE_LIMIT = 10;`,
        name: "should allow SCREAMING_SNAKE_CASE number constant",
      },
      {
        code: `const IS_PRODUCTION = true;`,
        name: "should allow SCREAMING_SNAKE_CASE boolean constant",
      },
      {
        code: `const API_URL = "https://api.example.com";`,
        name: "should allow SCREAMING_SNAKE_CASE url constant",
      },
      {
        code: `const MAX_RETRY_COUNT = 3;`,
        name: "should allow multi-word SCREAMING_SNAKE_CASE",
      },
      {
        code: `const A = 1;`,
        name: "should allow single letter uppercase constant",
      },
      {
        code: `const config = { key: "value" };`,
        name: "should allow camelCase for object constants",
      },
      {
        code: `const items = [1, 2, 3];`,
        name: "should allow camelCase for array constants",
      },
      {
        code: `const handleClick = () => {};`,
        name: "should allow camelCase for function constants",
      },
      {
        code: `const Component = () => {};`,
        name: "should allow PascalCase for component constants",
      },
      {
        code: `let defaultCover = "/images/default.jpg";`,
        name: "should allow camelCase for let declarations",
      },
      {
        code: `var pageLimit = 10;`,
        name: "should allow camelCase for var declarations",
      },
      {
        code: `const NEGATIVE_VALUE = -1;`,
        name: "should allow SCREAMING_SNAKE_CASE for negative numbers",
      },
      {
        code: `const TEMPLATE = \`hello world\`;`,
        name: "should allow SCREAMING_SNAKE_CASE for template literals",
      },
    ],
    invalid: [
      {
        code: `const defaultCover = "/images/default.jpg";`,
        name: "should disallow camelCase for string constant",
        errors: [
          {
            messageId: "useScreamingSnakeCase",
            data: {
              name: "defaultCover",
              suggestion: "DEFAULT_COVER",
            },
          },
        ],
      },
      {
        code: `const pageLimit = 10;`,
        name: "should disallow camelCase for number constant",
        errors: [
          {
            messageId: "useScreamingSnakeCase",
            data: {
              name: "pageLimit",
              suggestion: "PAGE_LIMIT",
            },
          },
        ],
      },
      {
        code: `const isEnabled = true;`,
        name: "should disallow camelCase for boolean constant",
        errors: [
          {
            messageId: "useScreamingSnakeCase",
            data: {
              name: "isEnabled",
              suggestion: "IS_ENABLED",
            },
          },
        ],
      },
      {
        code: `const apiBaseUrl = "https://api.example.com";`,
        name: "should disallow camelCase for URL constant",
        errors: [
          {
            messageId: "useScreamingSnakeCase",
            data: {
              name: "apiBaseUrl",
              suggestion: "API_BASE_URL",
            },
          },
        ],
      },
      {
        code: `const maxRetryCount = 5;`,
        name: "should disallow camelCase for multi-word constant",
        errors: [
          {
            messageId: "useScreamingSnakeCase",
            data: {
              name: "maxRetryCount",
              suggestion: "MAX_RETRY_COUNT",
            },
          },
        ],
      },
      {
        code: `const template = \`hello\`;`,
        name: "should disallow camelCase for template literal constant",
        errors: [
          {
            messageId: "useScreamingSnakeCase",
            data: {
              name: "template",
              suggestion: "TEMPLATE",
            },
          },
        ],
      },
      {
        code: `const negativeOne = -1;`,
        name: "should disallow camelCase for negative number constant",
        errors: [
          {
            messageId: "useScreamingSnakeCase",
            data: {
              name: "negativeOne",
              suggestion: "NEGATIVE_ONE",
            },
          },
        ],
      },
    ],
  });
});
