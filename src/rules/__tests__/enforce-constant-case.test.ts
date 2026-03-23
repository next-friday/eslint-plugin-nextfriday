import { afterAll, describe, it } from "@jest/globals";
import { RuleTester } from "@typescript-eslint/rule-tester";

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
        code: `const NEGATIVE_VALUE = -1;`,
        name: "should allow SCREAMING_SNAKE_CASE for negative numbers",
      },
      {
        code: `const TEMPLATE = \`hello world\`;`,
        name: "should allow SCREAMING_SNAKE_CASE for template literals",
      },
      {
        code: `const PHONE_REGEX = /^[0-9]{10}$/;`,
        name: "should allow SCREAMING_SNAKE_CASE for RegExp",
      },
      {
        code: `const STATUS_MAP = { ACTIVE: "active", INACTIVE: "inactive" } as const;`,
        name: "should allow SCREAMING_SNAKE_CASE for as const object",
      },
      {
        code: `const CATEGORIES = [{ id: "1", label: "one" }] as const;`,
        name: "should allow SCREAMING_SNAKE_CASE for as const array",
      },
      {
        code: `const SKELETON_ITEMS = [1, 2, 3, 4, 5];`,
        name: "should allow SCREAMING_SNAKE_CASE for static array",
      },
      {
        code: `const MAP_STYLE = { height: "320px", width: "100%" };`,
        name: "should allow SCREAMING_SNAKE_CASE for static object",
      },
      {
        code: `export const MAX_RETRY = 3;`,
        name: "should allow exported SCREAMING_SNAKE_CASE constant",
      },
      {
        code: `const isEnabled = true;`,
        name: "should allow boolean with is prefix",
      },
      {
        code: `const hasAccess = false;`,
        name: "should allow boolean with has prefix",
      },
      {
        code: `const config = { key: getValue() };`,
        name: "should ignore objects with dynamic values",
      },
      {
        code: `const handleClick = () => {};`,
        name: "should ignore functions",
      },
      {
        code: `const MyComponent = () => {};`,
        name: "should ignore components",
      },
      {
        code: `let defaultCover = "/images/default.jpg";`,
        name: "should ignore let declarations",
      },
      {
        code: `function foo() { const maxRetry = 3; }`,
        name: "should ignore local scope constants",
      },
      {
        code: `const pendingHref = \`/branch/\${branch}\`;`,
        name: "should ignore dynamic template literals",
      },
      {
        code: `const result = getData();`,
        name: "should ignore dynamic values",
      },
    ],
    invalid: [
      {
        code: `const defaultCover = "/images/default.jpg";`,
        name: "should disallow camelCase for global string constant",
        errors: [
          {
            messageId: "useScreamingSnakeCase",
            data: { name: "defaultCover", suggestion: "DEFAULT_COVER" },
          },
        ],
      },
      {
        code: `const pageLimit = 10;`,
        name: "should disallow camelCase for global number constant",
        errors: [
          {
            messageId: "useScreamingSnakeCase",
            data: { name: "pageLimit", suggestion: "PAGE_LIMIT" },
          },
        ],
      },
      {
        code: `const apiBaseUrl = "https://api.example.com";`,
        name: "should disallow camelCase for global URL constant",
        errors: [
          {
            messageId: "useScreamingSnakeCase",
            data: { name: "apiBaseUrl", suggestion: "API_BASE_URL" },
          },
        ],
      },
      {
        code: `const template = \`hello\`;`,
        name: "should disallow camelCase for global template literal constant",
        errors: [
          {
            messageId: "useScreamingSnakeCase",
            data: { name: "template", suggestion: "TEMPLATE" },
          },
        ],
      },
      {
        code: `const negativeOne = -1;`,
        name: "should disallow camelCase for global negative number constant",
        errors: [
          {
            messageId: "useScreamingSnakeCase",
            data: { name: "negativeOne", suggestion: "NEGATIVE_ONE" },
          },
        ],
      },
      {
        code: `export const maxRetryCount = 3;`,
        name: "should disallow camelCase for exported global constant",
        errors: [
          {
            messageId: "useScreamingSnakeCase",
            data: { name: "maxRetryCount", suggestion: "MAX_RETRY_COUNT" },
          },
        ],
      },
      {
        code: `const default_theme = "dark";`,
        name: "should disallow snake_case for global constant",
        errors: [
          {
            messageId: "noSnakeCase",
            data: { name: "default_theme", suggestion: "DEFAULT_THEME" },
          },
        ],
      },
      {
        code: `const categories = [{ id: "1" }] as const;`,
        name: "should disallow camelCase for global as const array",
        errors: [
          {
            messageId: "useScreamingSnakeCase",
            data: { name: "categories", suggestion: "CATEGORIES" },
          },
        ],
      },
      {
        code: `const phoneRegex = /^[0-9]{10}$/;`,
        name: "should disallow camelCase for global RegExp",
        errors: [
          {
            messageId: "useScreamingSnakeCase",
            data: { name: "phoneRegex", suggestion: "PHONE_REGEX" },
          },
        ],
      },
    ],
  });
});
