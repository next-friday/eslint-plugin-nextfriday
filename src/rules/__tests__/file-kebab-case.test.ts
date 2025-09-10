import { RuleTester } from "@typescript-eslint/rule-tester";
import { afterAll, describe, it } from "@jest/globals";

import fileKebabCase from "../file-kebab-case";

RuleTester.afterAll = afterAll;
RuleTester.it = it;
RuleTester.itOnly = it.only;
RuleTester.describe = describe;

const ruleTester = new RuleTester();

ruleTester.run("file-kebab-case", fileKebabCase, {
  valid: [
    {
      code: `const test = true;`,
      filename: "my-component.ts",
      name: "should allow kebab-case .ts files",
    },
    {
      code: `export default function() {}`,
      filename: "utils-helper.js",
      name: "should allow kebab-case .js files",
    },
    {
      code: `const config = {};`,
      filename: "app-config.ts",
      name: "should allow kebab-case with multiple hyphens",
    },
    {
      code: `console.log("test");`,
      filename: "test.ts",
      name: "should allow single word kebab-case",
    },
    {
      code: `const data = [];`,
      filename: "user-profile-settings.ts",
      name: "should allow long kebab-case names",
    },
    {
      code: `export const value = 123;`,
      filename: "api-v2-client.js",
      name: "should allow kebab-case with numbers",
    },
    {
      code: `const style = {};`,
      filename: "styles.css",
      name: "should ignore non-.ts/.js files",
    },
    {
      code: `const html = "";`,
      filename: "InvalidName.html",
      name: "should ignore non-.ts/.js files even with invalid names",
    },
    {
      code: `const config = {};`,
      filename: "webpack.config.js",
      name: "should allow common config file patterns",
    },
    {
      code: `export interface GreetingProps {}`,
      filename: "greeting.interfaces.ts",
      name: "should allow [name].[type] pattern with interfaces",
    },
    {
      code: `export type UserType = {};`,
      filename: "greeting.types.ts",
      name: "should allow [name].[type] pattern with types",
    },
    {
      code: `export class GreetingService {}`,
      filename: "greeting.service.ts",
      name: "should allow [name].[type] pattern with service",
    },
    {
      code: `export const fooBar = {};`,
      filename: "foo.bar.ts",
      name: "should allow [name].[type] pattern with simple names",
    },
    {
      code: `export const utils = {};`,
      filename: "foo.bar.js",
      name: "should allow [name].[type] pattern with .js files",
    },
    {
      code: `export const api = {};`,
      filename: "user-profile.service.ts",
      name: "should allow [name].[type] pattern with kebab-case names",
    },
    {
      code: `export const data = {};`,
      filename: "api-v2.client.ts",
      name: "should allow [name].[type] pattern with numbers in kebab-case",
    },
  ],
  invalid: [
    {
      code: `const test = true;`,
      filename: "MyComponent.ts",
      name: "should disallow PascalCase .ts files",
      errors: [
        {
          messageId: "fileKebabCase",
          line: 1,
          column: 1,
        },
      ],
    },
    {
      code: `export default function() {}`,
      filename: "myComponent.js",
      name: "should disallow camelCase .js files",
      errors: [
        {
          messageId: "fileKebabCase",
          line: 1,
          column: 1,
        },
      ],
    },
    {
      code: `const config = {};`,
      filename: "app_config.ts",
      name: "should disallow snake_case files",
      errors: [
        {
          messageId: "fileKebabCase",
          line: 1,
          column: 1,
        },
      ],
    },
    {
      code: `console.log("test");`,
      filename: "TEST.ts",
      name: "should disallow UPPERCASE files",
      errors: [
        {
          messageId: "fileKebabCase",
          line: 1,
          column: 1,
        },
      ],
    },
    {
      code: `const data = [];`,
      filename: "User Profile Settings.ts",
      name: "should disallow files with spaces",
      errors: [
        {
          messageId: "fileKebabCase",
          line: 1,
          column: 1,
        },
      ],
    },
    {
      code: `export const value = 123;`,
      filename: "api.V2.client.js",
      name: "should disallow files with dots in middle",
      errors: [
        {
          messageId: "fileKebabCase",
          line: 1,
          column: 1,
        },
      ],
    },
    {
      code: `const mixed = {};`,
      filename: "some-File_Name.ts",
      name: "should disallow mixed naming conventions",
      errors: [
        {
          messageId: "fileKebabCase",
          line: 1,
          column: 1,
        },
      ],
    },
    {
      code: `const numbers = [];`,
      filename: "file123Name.js",
      name: "should disallow camelCase with numbers",
      errors: [
        {
          messageId: "fileKebabCase",
          line: 1,
          column: 1,
        },
      ],
    },
    {
      code: `export interface Props {}`,
      filename: "Greeting.Interfaces.ts",
      name: "should disallow PascalCase in [name].[type] pattern",
      errors: [
        {
          messageId: "fileKebabCase",
          line: 1,
          column: 1,
        },
      ],
    },
    {
      code: `export const service = {};`,
      filename: "greeting_service.ts",
      name: "should disallow snake_case in [name].[type] pattern",
      errors: [
        {
          messageId: "fileKebabCase",
          line: 1,
          column: 1,
        },
      ],
    },
    {
      code: `export const data = {};`,
      filename: "foo.Bar.ts",
      name: "should disallow PascalCase in type part of [name].[type] pattern",
      errors: [
        {
          messageId: "fileKebabCase",
          line: 1,
          column: 1,
        },
      ],
    },
  ],
});

describe("file-kebab-case rule structure", () => {
  it("should have correct rule structure", () => {
    expect(fileKebabCase).toHaveProperty("meta");
    expect(fileKebabCase).toHaveProperty("create");
    expect(typeof fileKebabCase.create).toBe("function");
  });
});
