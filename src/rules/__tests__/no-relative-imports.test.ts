import { RuleTester } from "@typescript-eslint/rule-tester";
import { afterAll, describe, it } from "@jest/globals";

import noRelativeImports from "../no-relative-imports";

RuleTester.afterAll = afterAll;
RuleTester.describe = describe;
RuleTester.it = it;

const ruleTester = new RuleTester();

describe("no-relative-imports", () => {
  it("should have meta property", () => {
    expect(noRelativeImports.meta).toBeDefined();
  });

  it("should have create method", () => {
    expect(typeof noRelativeImports.create).toBe("function");
  });

  ruleTester.run("no-relative-imports", noRelativeImports, {
    valid: [
      {
        code: `import { Button } from "src/components/base/button";`,
        name: "should allow absolute imports",
      },
      {
        code: `import { mapper } from "./article.mapper";`,
        name: "should allow sibling imports with ./",
      },
      {
        code: `import { utils } from "./utils";`,
        name: "should allow same directory imports",
      },
      {
        code: `import React from "react";`,
        name: "should allow package imports",
      },
      {
        code: `import { useState } from "react";`,
        name: "should allow named package imports",
      },
      {
        code: `import type { FC } from "react";`,
        name: "should allow type imports from packages",
      },
      {
        code: `import { helper } from "@/utils/helper";`,
        name: "should allow alias imports with @",
      },
      {
        code: `import { config } from "~/config";`,
        name: "should allow alias imports with ~",
      },
      {
        code: `export { foo } from "./local";`,
        name: "should allow re-exports from sibling",
      },
      {
        code: `const module = await import("./dynamic");`,
        name: "should allow dynamic imports from sibling",
      },
    ],
    invalid: [
      {
        code: `import { Button } from "../../../components/base/button";`,
        name: "should disallow deep relative imports",
        errors: [
          {
            messageId: "noRelativeImport",
            line: 1,
            column: 1,
          },
        ],
      },
      {
        code: `import { Header } from "../components/Header";`,
        name: "should disallow parent directory imports",
        errors: [
          {
            messageId: "noRelativeImport",
            line: 1,
            column: 1,
          },
        ],
      },
      {
        code: `import { utils } from "../utils";`,
        name: "should disallow single parent traversal",
        errors: [
          {
            messageId: "noRelativeImport",
            line: 1,
            column: 1,
          },
        ],
      },
      {
        code: `import type { Props } from "../types";`,
        name: "should disallow type imports with parent traversal",
        errors: [
          {
            messageId: "noRelativeImport",
            line: 1,
            column: 1,
          },
        ],
      },
      {
        code: `export { foo } from "../shared";`,
        name: "should disallow re-exports from parent directory",
        errors: [
          {
            messageId: "noRelativeImport",
            line: 1,
            column: 1,
          },
        ],
      },
      {
        code: `export * from "../index";`,
        name: "should disallow export all from parent directory",
        errors: [
          {
            messageId: "noRelativeImport",
            line: 1,
            column: 1,
          },
        ],
      },
      {
        code: `const module = await import("../lazy-module");`,
        name: "should disallow dynamic imports from parent directory",
        errors: [
          {
            messageId: "noRelativeImport",
            line: 1,
            column: 22,
          },
        ],
      },
    ],
  });
});
