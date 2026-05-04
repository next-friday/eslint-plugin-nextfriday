import { afterAll, describe, it } from "@jest/globals";
import { RuleTester } from "@typescript-eslint/rule-tester";

import rule from "../enforce-test-filename";

RuleTester.afterAll = afterAll;
RuleTester.describe = describe;
RuleTester.it = it;

const ruleTester = new RuleTester();

ruleTester.run("enforce-test-filename", rule, {
  valid: [
    {
      name: "should allow describe in .test.ts file",
      filename: "/src/features/user/user.test.ts",
      code: `describe("user", () => {});`,
    },
    {
      name: "should allow it in .test.ts file",
      filename: "/src/features/user/user.test.ts",
      code: `it("works", () => {});`,
    },
    {
      name: "should allow test in .test.tsx file",
      filename: "/src/features/user/UserCard.test.tsx",
      code: `test("renders", () => {});`,
    },
    {
      name: "should allow beforeEach in .test.ts file",
      filename: "/src/utils/format.test.ts",
      code: `beforeEach(() => {});`,
    },
    {
      name: "should allow non-test code in any file",
      filename: "/src/utils/format.ts",
      code: `export function formatDate(d: Date) { return d.toISOString(); }`,
    },
    {
      name: "should allow non-test function calls in plain .ts file",
      filename: "/src/utils/format.ts",
      code: `console.log("hello");`,
    },
  ],
  invalid: [
    {
      name: "should disallow describe in .spec.ts file",
      filename: "/src/features/user/user.spec.ts",
      code: `describe("user", () => {});`,
      errors: [{ messageId: "requireTestFilename" }],
    },
    {
      name: "should disallow it in plain .ts file",
      filename: "/src/features/user/user-tests.ts",
      code: `it("works", () => {});`,
      errors: [{ messageId: "requireTestFilename" }],
    },
    {
      name: "should disallow test in plain .ts file",
      filename: "/src/features/user/user.ts",
      code: `test("works", () => {});`,
      errors: [{ messageId: "requireTestFilename" }],
    },
    {
      name: "should disallow beforeAll in non-test file",
      filename: "/src/setup.ts",
      code: `beforeAll(() => {});`,
      errors: [{ messageId: "requireTestFilename" }],
    },
    {
      name: "should report only once even with multiple test calls",
      filename: "/src/features/user/user.spec.ts",
      code: `describe("a", () => {}); describe("b", () => {});`,
      errors: [{ messageId: "requireTestFilename" }],
    },
  ],
});
