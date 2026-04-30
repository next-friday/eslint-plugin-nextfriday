import { RuleTester } from "@typescript-eslint/rule-tester";
import { afterAll, describe, it } from "@jest/globals";

import noInlineTypeImport from "../no-inline-type-import";

RuleTester.afterAll = afterAll;
RuleTester.describe = describe;
RuleTester.it = it;

const ruleTester = new RuleTester();

describe("no-inline-type-import", () => {
  ruleTester.run("no-inline-type-import", noInlineTypeImport, {
    valid: [
      {
        code: `import { foo } from "bar";`,
        name: "should allow regular value import",
      },
      {
        code: `import type { foo } from "bar";`,
        name: "should allow declaration-level type import",
      },
      {
        code: `import type { foo, bar } from "src";`,
        name: "should allow multiple specifiers in type import",
      },
      {
        code: `import * as ns from "bar";`,
        name: "should allow namespace import",
      },
      {
        code: `import Default from "bar";`,
        name: "should allow default import",
      },
      {
        code: `import Default, { foo, bar } from "src";`,
        name: "should allow default with named value imports",
      },
      {
        code: `import "./side-effect";`,
        name: "should allow side-effect imports",
      },
      {
        code: `import type * as ns from "bar";`,
        name: "should allow namespace type import",
      },
      {
        code: `import type Default from "bar";`,
        name: "should allow default type import",
      },
    ],
    invalid: [
      {
        code: `import { type foo } from "bar";`,
        name: "should hoist single inline type to import type",
        output: `import type { foo } from "bar";`,
        errors: [{ messageId: "noInlineTypeImport" }],
      },
      {
        code: `import { type foo, type bar } from "src";`,
        name: "should hoist multiple inline types to import type",
        output: `import type { foo, bar } from "src";`,
        errors: [{ messageId: "noInlineTypeImport" }],
      },
      {
        code: `import { baz, type moo } from "mee";`,
        name: "should split mixed value and inline type into two statements",
        output: `import { baz } from "mee";\nimport type { moo } from "mee";`,
        errors: [{ messageId: "noInlineTypeImport" }],
      },
      {
        code: `import { value, type Foo, type Bar } from "src";`,
        name: "should split mixed with multiple type specifiers",
        output: `import { value } from "src";\nimport type { Foo, Bar } from "src";`,
        errors: [{ messageId: "noInlineTypeImport" }],
      },
      {
        code: `import { type Foo, value } from "src";`,
        name: "should split when inline type comes first",
        output: `import { value } from "src";\nimport type { Foo } from "src";`,
        errors: [{ messageId: "noInlineTypeImport" }],
      },
      {
        code: `import Default, { type Foo } from "src";`,
        name: "should split default and inline type",
        output: `import Default from "src";\nimport type { Foo } from "src";`,
        errors: [{ messageId: "noInlineTypeImport" }],
      },
      {
        code: `import Default, { value, type Foo } from "src";`,
        name: "should split default with mixed named",
        output: `import Default, { value } from "src";\nimport type { Foo } from "src";`,
        errors: [{ messageId: "noInlineTypeImport" }],
      },
      {
        code: `import { foo as bar, type baz as qux } from "src";`,
        name: "should preserve aliases when splitting",
        output: `import { foo as bar } from "src";\nimport type { baz as qux } from "src";`,
        errors: [{ messageId: "noInlineTypeImport" }],
      },
      {
        code: `import { type foo as bar } from "src";`,
        name: "should preserve alias on hoist",
        output: `import type { foo as bar } from "src";`,
        errors: [{ messageId: "noInlineTypeImport" }],
      },
      {
        code: `import { type foo } from 'bar';`,
        name: "should preserve single quotes",
        output: `import type { foo } from 'bar';`,
        errors: [{ messageId: "noInlineTypeImport" }],
      },
      {
        code: `import type { type foo } from "bar";`,
        name: "should strip redundant inline type from import type",
        output: `import type { foo } from "bar";`,
        errors: [{ messageId: "noInlineTypeImport" }],
      },
      {
        code: `import type { foo, type bar } from "src";`,
        name: "should strip multiple redundant inline types from import type",
        output: `import type { foo, bar } from "src";`,
        errors: [{ messageId: "noInlineTypeImport" }],
      },
    ],
  });

  describe("rule structure", () => {
    it("should have meta property", () => {
      expect(noInlineTypeImport.meta).toBeDefined();
    });

    it("should have create method", () => {
      expect(typeof noInlineTypeImport.create).toBe("function");
    });
  });
});
