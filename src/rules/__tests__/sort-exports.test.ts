import { RuleTester } from "@typescript-eslint/rule-tester";
import { afterAll, describe, it } from "@jest/globals";

import sortExports from "../sort-exports";

RuleTester.afterAll = afterAll;
RuleTester.describe = describe;
RuleTester.it = it;

const ruleTester = new RuleTester();

describe("sort-exports", () => {
  it("should have meta property", () => {
    expect(sortExports.meta).toBeDefined();
  });

  it("should have create method", () => {
    expect(typeof sortExports.create).toBe("function");
  });

  ruleTester.run("sort-exports", sortExports, {
    valid: [
      {
        code: `
export { foo } from "@/lib/foo";
export { bar } from "../bar";
export { baz };`,
        name: "correct order: all 3 groups",
      },
      {
        code: `export { foo };`,
        name: "single local export",
      },
      {
        code: `
export { foo } from "react";
export { bar } from "@scope/pkg";`,
        name: "all same group (external re-exports)",
      },
      {
        code: `
export { foo } from "../foo";
export { bar } from "./bar";`,
        name: "all relative re-exports",
      },
      {
        code: `
export { foo };
export { bar };`,
        name: "all local exports",
      },
      {
        code: `
export { foo } from "react";

const x = 1;

export { bar };`,
        name: "non-contiguous exports reset context",
      },
      {
        code: `
export default function main() {}
export { foo };`,
        name: "export default is skipped",
      },
      {
        code: `
export * from "react";
export { foo };`,
        name: "export all is skipped (breaks contiguity)",
      },
      {
        code: `
export { utils } from "@/lib/utils";
export { helpers } from "~/helpers";
export { foo } from "./foo";`,
        name: "alias re-exports then relative",
      },
      {
        code: `
export const x = 1;
export { foo } from "./foo";
export { bar };`,
        name: "export declaration breaks contiguity, remaining is valid",
      },
    ],
    invalid: [
      {
        code: `
export { bar };
export { foo } from "react";`,
        output: `
export { foo } from "react";
export { bar };`,
        errors: [{ messageId: "unsortedExports" }],
        name: "local before external re-export",
      },
      {
        code: `
export { bar };
export { foo } from "../foo";`,
        output: `
export { foo } from "../foo";
export { bar };`,
        errors: [{ messageId: "unsortedExports" }],
        name: "local before relative re-export",
      },
      {
        code: `
export { bar } from "../bar";
export { foo } from "react";`,
        output: `
export { foo } from "react";
export { bar } from "../bar";`,
        errors: [{ messageId: "unsortedExports" }],
        name: "relative re-export before external re-export",
      },
      {
        code: `
export { baz };
export { bar } from "../bar";
export { foo } from "react";`,
        output: `
export { foo } from "react";
export { bar } from "../bar";
export { baz };`,
        errors: [{ messageId: "unsortedExports" }],
        name: "local then relative then external (reports first violation)",
      },
    ],
  });
});
