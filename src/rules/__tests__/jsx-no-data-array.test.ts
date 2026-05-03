import { afterAll, describe, it } from "@jest/globals";
import { RuleTester } from "@typescript-eslint/rule-tester";

import rule from "../jsx-no-data-array";

RuleTester.afterAll = afterAll;
RuleTester.describe = describe;
RuleTester.it = it;

const ruleTester = new RuleTester({
  languageOptions: {
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
    },
  },
});

ruleTester.run("jsx-no-data-array", rule, {
  valid: [
    {
      code: "const TIMEOUT_MS = 1000;",
      filename: "Component.tsx",
      name: "primitive constant",
    },
    {
      code: 'const labels = ["Home", "About", "Contact"];',
      filename: "Component.tsx",
      name: "array of string primitives",
    },
    {
      code: "const numbers = [1, 2, 3];",
      filename: "Component.tsx",
      name: "array of number primitives",
    },
    {
      code: 'const ROUTES = { home: "/", about: "/about" };',
      filename: "Component.tsx",
      name: "flat map of primitives",
    },
    {
      code: 'const stores = [{ name: "x" }, { name: "y" }];',
      filename: "utils.ts",
      name: "array of objects in non-jsx file is allowed",
    },
    {
      code: 'const stores = [{ name: "x" }];',
      filename: "data.ts",
      name: "array of objects in plain ts file is allowed",
    },
  ],
  invalid: [
    {
      code: 'const stores = [{ name: "Koh Samui" }];',
      filename: "Component.tsx",
      errors: [{ messageId: "noDataArray", data: { name: "stores" } }],
      name: "array of single object literal in tsx",
    },
    {
      code: 'const stores = [{ name: "x" }, { name: "y" }];',
      filename: "Component.tsx",
      errors: [{ messageId: "noDataArray", data: { name: "stores" } }],
      name: "array of multiple object literals in tsx",
    },
    {
      code: "const items: Item[] = [{ id: 1 }];",
      filename: "Component.tsx",
      errors: [{ messageId: "noDataArray", data: { name: "items" } }],
      name: "typed array of object literals",
    },
    {
      code: "const items = [{ id: 1 }] as const;",
      filename: "Component.tsx",
      errors: [{ messageId: "noDataArray", data: { name: "items" } }],
      name: "as const assertion",
    },
    {
      code: "const items = [{ id: 1 }] satisfies readonly { id: number }[];",
      filename: "Component.tsx",
      errors: [{ messageId: "noDataArray", data: { name: "items" } }],
      name: "satisfies expression",
    },
    {
      code: "export const items = [{ id: 1 }];",
      filename: "Component.tsx",
      errors: [{ messageId: "noDataArray", data: { name: "items" } }],
      name: "exported array of object literals",
    },
    {
      code: 'const stores = [{ name: "x" }];',
      filename: "Component.jsx",
      errors: [{ messageId: "noDataArray", data: { name: "stores" } }],
      name: "jsx file is checked too",
    },
  ],
});
