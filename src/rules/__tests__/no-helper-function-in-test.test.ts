import { afterAll, describe, it } from "@jest/globals";
import { RuleTester } from "@typescript-eslint/rule-tester";

import rule from "../no-helper-function-in-test";

RuleTester.afterAll = afterAll;
RuleTester.describe = describe;
RuleTester.it = it;

const ruleTester = new RuleTester();

ruleTester.run("no-helper-function-in-test", rule, {
  valid: [
    {
      code: `import { describe, it, expect } from "@jest/globals";`,
      filename: "component.test.ts",
      name: "should allow import statements",
    },
    {
      code: `const PATTERN = /^src\\/features\\//;`,
      filename: "component.test.ts",
      name: "should allow top-level non-function constants",
    },
    {
      code: `const ALLOWED = ["foo", "bar"];`,
      filename: "component.test.ts",
      name: "should allow top-level array constants",
    },
    {
      code: `describe("suite", () => { function helper() { return 1; } });`,
      filename: "component.test.ts",
      name: "should allow function declarations inside describe blocks",
    },
    {
      code: `it("test", () => { const helper = () => true; });`,
      filename: "component.test.ts",
      name: "should allow arrow functions inside it blocks",
    },
    {
      code: `RuleTester.afterAll = afterAll;`,
      filename: "component.test.ts",
      name: "should allow assignment expressions",
    },
    {
      code: `const ruleTester = new RuleTester();`,
      filename: "component.test.ts",
      name: "should allow top-level class instantiation",
    },
    {
      code: `function helper() { return 1; }`,
      filename: "utils.ts",
      name: "should not apply to non-test files",
    },
  ],
  invalid: [
    {
      code: `function findFiles(dir) { return []; }`,
      filename: "template-imports.test.ts",
      name: "should disallow top-level function declaration",
      errors: [{ messageId: "noHelperFunction" }],
    },
    {
      code: `const extractImports = (source) => [];`,
      filename: "template-imports.test.ts",
      name: "should disallow top-level arrow function",
      errors: [{ messageId: "noHelperFunction" }],
    },
    {
      code: `const buildPattern = function(name) { return new RegExp(name); };`,
      filename: "template-imports.test.ts",
      name: "should disallow top-level function expression",
      errors: [{ messageId: "noHelperFunction" }],
    },
    {
      code: `function a() {} function b() {}`,
      filename: "component.test.ts",
      name: "should disallow multiple top-level function declarations",
      errors: [{ messageId: "noHelperFunction" }, { messageId: "noHelperFunction" }],
    },
    {
      code: `const a = () => {}; const b = () => {};`,
      filename: "component.test.ts",
      name: "should disallow multiple top-level arrow functions",
      errors: [{ messageId: "noHelperFunction" }, { messageId: "noHelperFunction" }],
    },
    {
      code: `function findTemplateFiles(dir: string): string[] { return []; }`,
      filename: "template-imports.test.ts",
      name: "should disallow top-level helper in vitest-style test file",
      errors: [{ messageId: "noHelperFunction" }],
    },
  ],
});
