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
      name: "should allow import statements",
    },
    {
      code: `const PATTERN = /^src\\/features\\//;`,
      name: "should allow top-level non-function constants",
    },
    {
      code: `const ALLOWED = ["foo", "bar"];`,
      name: "should allow top-level array constants",
    },
    {
      code: `describe("suite", () => { function helper() { return 1; } });`,
      name: "should allow function declarations inside describe blocks",
    },
    {
      code: `it("test", () => { const helper = () => true; });`,
      name: "should allow arrow functions inside it blocks",
    },
    {
      code: `RuleTester.afterAll = afterAll;`,
      name: "should allow assignment expressions",
    },
    {
      code: `const ruleTester = new RuleTester();`,
      name: "should allow top-level class instantiation",
    },
  ],
  invalid: [
    {
      code: `function findFiles(dir) { return []; }`,
      name: "should disallow top-level function declaration",
      errors: [{ messageId: "noHelperFunction" }],
    },
    {
      code: `const extractImports = (source) => [];`,
      name: "should disallow top-level arrow function",
      errors: [{ messageId: "noHelperFunction" }],
    },
    {
      code: `const buildPattern = function(name) { return new RegExp(name); };`,
      name: "should disallow top-level function expression",
      errors: [{ messageId: "noHelperFunction" }],
    },
    {
      code: `function a() {} function b() {}`,
      name: "should disallow multiple top-level function declarations",
      errors: [{ messageId: "noHelperFunction" }, { messageId: "noHelperFunction" }],
    },
    {
      code: `const a = () => {}; const b = () => {};`,
      name: "should disallow multiple top-level arrow functions",
      errors: [{ messageId: "noHelperFunction" }, { messageId: "noHelperFunction" }],
    },
  ],
});
