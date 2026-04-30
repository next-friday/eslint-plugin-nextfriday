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
        code: `const API_URL = "https://api.example.com";`,
        name: "should allow SCREAMING_SNAKE_CASE url constant",
      },
      {
        code: `const NEGATIVE_VALUE = -1;`,
        name: "should allow SCREAMING_SNAKE_CASE for negative numbers",
      },
      {
        code: `export const MAX_RETRY = 3;`,
        name: "should allow exported SCREAMING_SNAKE_CASE constant",
      },
      {
        code: `const isEnabled = true;`,
        name: "should ignore boolean constants",
      },
      {
        code: `const hasAccess = false;`,
        name: "should ignore boolean constants regardless of prefix",
      },
      {
        code: `const featureEnabled = true;`,
        name: "should ignore boolean constants without is/has prefix",
      },
      {
        code: `const template = \`hello world\`;`,
        name: "should ignore static template literals",
      },
      {
        code: `const phoneRegex = /^[0-9]{10}$/;`,
        name: "should ignore RegExp literals",
      },
      {
        code: `const skeletonItems = [1, 2, 3, 4, 5];`,
        name: "should ignore array literals",
      },
      {
        code: `const mapStyle = { height: "320px", width: "100%" };`,
        name: "should ignore object literals",
      },
      {
        code: `const statusMap = { ACTIVE: "active" } as const;`,
        name: "should ignore as const object",
      },
      {
        code: `const categories = [{ id: "1" }] as const;`,
        name: "should ignore as const array",
      },
      {
        code: `export const metadata: Metadata = { title: "404" };`,
        name: "should ignore framework reserved object exports like Next.js metadata",
      },
      {
        code: `export const viewport: Viewport = { themeColor: "#fff" };`,
        name: "should ignore framework reserved object exports like Next.js viewport",
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
      {
        code: `const API_URL = process.env.API_URL;`,
        name: "should ignore process.env assignment",
      },
      {
        code: `const nextConfig = { reactStrictMode: true };`,
        filename: "next.config.ts",
        name: "should skip rule entirely in next.config.ts",
      },
      {
        code: `const config = { plugins: ["foo"] };`,
        filename: "vite.config.ts",
        name: "should skip rule entirely in vite.config.ts",
      },
      {
        code: `const config = { content: ["./src/**/*.tsx"] };`,
        filename: "tailwind.config.ts",
        name: "should skip rule entirely in tailwind.config.ts",
      },
      {
        code: `const config = { plugins: { "@tailwindcss/postcss": {} } };`,
        filename: "postcss.config.mjs",
        name: "should skip rule entirely in postcss.config.mjs",
      },
      {
        code: `const config = { extends: ["stylelint-config-standard"] };`,
        filename: "stylelint.config.ts",
        name: "should skip rule entirely in stylelint.config.ts",
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
        name: "should disallow camelCase for exported global magic number",
        errors: [
          {
            messageId: "useScreamingSnakeCase",
            data: { name: "maxRetryCount", suggestion: "MAX_RETRY_COUNT" },
          },
        ],
      },
      {
        code: `const default_theme = "dark";`,
        name: "should disallow snake_case for global magic text",
        errors: [
          {
            messageId: "noSnakeCase",
            data: { name: "default_theme", suggestion: "DEFAULT_THEME" },
          },
        ],
      },
    ],
  });
});
