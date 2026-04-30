import { RuleTester } from "@typescript-eslint/rule-tester";
import { afterAll, describe, it } from "@jest/globals";

import indexExportOnly from "../index-export-only";

RuleTester.afterAll = afterAll;
RuleTester.describe = describe;
RuleTester.it = it;

const ruleTester = new RuleTester();

describe("index-export-only", () => {
  ruleTester.run("index-export-only", indexExportOnly, {
    valid: [
      {
        code: `export { cn } from "./cn";`,
        filename: "index.ts",
        name: "should allow named re-export from another module",
      },
      {
        code: `export * from "./types";`,
        filename: "index.ts",
        name: "should allow star re-export",
      },
      {
        code: `export * as utils from "./utils";`,
        filename: "index.ts",
        name: "should allow namespace re-export",
      },
      {
        code: `export type { Props } from "./props";`,
        filename: "index.ts",
        name: "should allow type re-export",
      },
      {
        code: `export { default } from "./button";`,
        filename: "index.ts",
        name: "should allow default re-export",
      },
      {
        code: `export { foo as default } from "./foo";`,
        filename: "index.ts",
        name: "should allow renamed default re-export",
      },
      {
        code: `
import { cn } from "./cn";

export { cn };
`,
        filename: "index.ts",
        name: "should allow import followed by specifier-only export",
      },
      {
        code: `
import button from "./button";

export default button;
`,
        filename: "index.ts",
        name: "should allow default export of imported identifier",
      },
      {
        code: `
type Foo = string;

export type { Foo };
`,
        filename: "index.ts",
        name: "should allow top-level type alias declaration",
      },
      {
        code: `
interface Bar {
  id: string;
}

export type { Bar };
`,
        filename: "index.ts",
        name: "should allow top-level interface declaration",
      },
      {
        code: `export type Foo = string;`,
        filename: "index.ts",
        name: "should allow exported type alias declaration",
      },
      {
        code: `export interface Bar { id: string; }`,
        filename: "index.ts",
        name: "should allow exported interface declaration",
      },
      {
        code: ``,
        filename: "index.ts",
        name: "should allow empty file",
      },
      {
        code: `import "./side-effect";`,
        filename: "index.ts",
        name: "should allow side-effect imports",
      },
      {
        code: `
function cn() {
  return "x";
}

export { cn };
`,
        filename: "src/utils/cn.ts",
        name: "should not lint non-index files",
      },
      {
        code: `
function cn() {
  return "x";
}

export { cn };
`,
        filename: "index.test.ts",
        name: "should not lint files like index.test.ts",
      },
    ],
    invalid: [
      {
        code: `
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export { cn };
`,
        filename: "index.ts",
        name: "should reject local function declaration",
        errors: [{ messageId: "indexExportOnly" }],
      },
      {
        code: `
const value = 42;

export { value };
`,
        filename: "index.ts",
        name: "should reject local variable declaration",
        errors: [{ messageId: "indexExportOnly" }],
      },
      {
        code: `
class Service {}

export { Service };
`,
        filename: "index.ts",
        name: "should reject local class declaration",
        errors: [{ messageId: "indexExportOnly" }],
      },
      {
        code: `export const foo = 1;`,
        filename: "index.ts",
        name: "should reject inline named const export",
        errors: [{ messageId: "indexExportOnly" }],
      },
      {
        code: `export function bar() { return 1; }`,
        filename: "index.ts",
        name: "should reject inline named function export",
        errors: [{ messageId: "indexExportOnly" }],
      },
      {
        code: `export class Baz {}`,
        filename: "index.ts",
        name: "should reject inline named class export",
        errors: [{ messageId: "indexExportOnly" }],
      },
      {
        code: `export default function() { return 1; }`,
        filename: "index.ts",
        name: "should reject inline anonymous default function",
        errors: [{ messageId: "indexExportOnly" }],
      },
      {
        code: `export default class {}`,
        filename: "index.ts",
        name: "should reject inline anonymous default class",
        errors: [{ messageId: "indexExportOnly" }],
      },
      {
        code: `export default 42;`,
        filename: "index.ts",
        name: "should reject inline default literal",
        errors: [{ messageId: "indexExportOnly" }],
      },
      {
        code: `console.log("side effect");`,
        filename: "index.ts",
        name: "should reject top-level expression statements",
        errors: [{ messageId: "indexExportOnly" }],
      },
      {
        code: `
if (process.env.NODE_ENV === "production") {
  console.log("prod");
}
`,
        filename: "index.ts",
        name: "should reject top-level control flow",
        errors: [{ messageId: "indexExportOnly" }],
      },
      {
        code: `
function helper() {}

class Service {}

const value = 1;
`,
        filename: "index.ts",
        name: "should report each disallowed statement",
        errors: [{ messageId: "indexExportOnly" }, { messageId: "indexExportOnly" }, { messageId: "indexExportOnly" }],
      },
      {
        code: `
function cn() {
  return "x";
}

export { cn };
`,
        filename: "index.tsx",
        name: "should lint index.tsx files",
        errors: [{ messageId: "indexExportOnly" }],
      },
      {
        code: `
function cn() {
  return "x";
}

export { cn };
`,
        filename: "index.js",
        name: "should lint index.js files",
        errors: [{ messageId: "indexExportOnly" }],
      },
    ],
  });

  describe("rule structure", () => {
    it("should have meta property", () => {
      expect(indexExportOnly.meta).toBeDefined();
    });

    it("should have create method", () => {
      expect(typeof indexExportOnly.create).toBe("function");
    });
  });
});
