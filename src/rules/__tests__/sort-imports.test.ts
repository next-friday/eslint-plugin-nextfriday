import { RuleTester } from "@typescript-eslint/rule-tester";
import { afterAll, describe, it } from "@jest/globals";

import sortImports from "../sort-imports";

RuleTester.afterAll = afterAll;
RuleTester.describe = describe;
RuleTester.it = it;

const ruleTester = new RuleTester();

describe("sort-imports", () => {
  it("should have meta property", () => {
    expect(sortImports.meta).toBeDefined();
  });

  it("should have create method", () => {
    expect(typeof sortImports.create).toBe("function");
  });

  ruleTester.run("sort-imports", sortImports, {
    valid: [
      {
        code: `
import "./setup";
import fs from "node:fs";
import React from "react";
import { utils } from "@/lib/utils";
import { foo } from "../foo";`,
        name: "correct order: all 5 groups",
      },
      {
        code: `import React from "react";`,
        name: "single import",
      },
      {
        code: `
import React from "react";
import { useState } from "react";
import lodash from "lodash";`,
        name: "all same group (external)",
      },
      {
        code: `
import React from "react";
import type { FC } from "react";
import { foo } from "../foo";
import type { Bar } from "../foo";`,
        name: "type imports follow their own group",
      },
      {
        code: `
import "./polyfill";
import "./setup";`,
        name: "multiple side-effect imports",
      },
      {
        code: `
import fs from "node:fs";
import path from "node:path";
import React from "react";`,
        name: "builtin then external",
      },
      {
        code: `
import React from "react";
import { utils } from "@/lib/utils";
import { helper } from "~/helpers";
import { token } from "#auth/token";`,
        name: "external then internal aliases (@/, ~/, #)",
      },
      {
        code: `
import { foo } from "../foo";
import { bar } from "./bar";`,
        name: "relative imports together",
      },
      {
        code: `
import React from "react";

const x = 1;

import { foo } from "../foo";`,
        name: "non-contiguous imports reset context",
      },
      {
        code: `
import fs from "fs";
import React from "react";`,
        name: "bare builtin module name (without node: prefix)",
      },
      {
        code: `
import "@scope/setup";
import React from "react";`,
        name: "side-effect with scoped package",
      },
      {
        code: `
import React from "react";
import type { Foo } from "react";
import { utils } from "@/lib/utils";
import type { Bar } from "../bar";`,
        name: "type imports follow their own group across groups",
      },
    ],
    invalid: [
      {
        code: `
import { foo } from "../foo";
import React from "react";`,
        output: `
import React from "react";
import { foo } from "../foo";`,
        errors: [{ messageId: "unsortedImports" }],
        name: "relative before external",
      },
      {
        code: `
import React from "react";
import fs from "node:fs";`,
        output: `
import fs from "node:fs";
import React from "react";`,
        errors: [{ messageId: "unsortedImports" }],
        name: "external before builtin",
      },
      {
        code: `
import React from "react";
import "./setup";`,
        output: `
import "./setup";
import React from "react";`,
        errors: [{ messageId: "unsortedImports" }],
        name: "side-effect after external",
      },
      {
        code: `
import { utils } from "@/lib/utils";
import React from "react";`,
        output: `
import React from "react";
import { utils } from "@/lib/utils";`,
        errors: [{ messageId: "unsortedImports" }],
        name: "internal alias before external",
      },
      {
        code: `
import { foo } from "../foo";
import { utils } from "@/lib/utils";`,
        output: `
import { utils } from "@/lib/utils";
import { foo } from "../foo";`,
        errors: [{ messageId: "unsortedImports" }],
        name: "relative before internal alias",
      },
      {
        code: `
import { foo } from "./foo";
import fs from "node:fs";
import React from "react";`,
        output: `
import fs from "node:fs";
import React from "react";
import { foo } from "./foo";`,
        errors: [{ messageId: "unsortedImports" }],
        name: "relative before builtin (reports first violation only)",
      },
      {
        code: `
import type { Foo } from "some-lib";
import { bar } from "other-lib";`,
        output: `
import { bar } from "other-lib";
import type { Foo } from "some-lib";`,
        errors: [{ messageId: "unsortedImports" }],
        name: "type import before value import",
      },
      {
        code: `
import type { FC } from "react";
import React from "react";
import type { Bar } from "../bar";
import { foo } from "../foo";`,
        output: `
import React from "react";
import type { FC } from "react";
import { foo } from "../foo";
import type { Bar } from "../bar";`,
        errors: [{ messageId: "unsortedImports" }],
        name: "type imports interspersed with value imports",
      },
    ],
  });
});
