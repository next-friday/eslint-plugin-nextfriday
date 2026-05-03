import { afterAll, describe, it } from "@jest/globals";
import { RuleTester } from "@typescript-eslint/rule-tester";

import rule from "../jsx-no-data-object";

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

ruleTester.run("jsx-no-data-object", rule, {
  valid: [
    {
      code: "const TIMEOUT_MS = 1000;",
      filename: "Component.tsx",
      name: "primitive constant",
    },
    {
      code: 'const ROUTES = { home: "/", about: "/about", contact: "/contact" };',
      filename: "Component.tsx",
      name: "flat object map of primitives",
    },
    {
      code: 'const labels = ["Home", "About"];',
      filename: "Component.tsx",
      name: "flat array of primitives",
    },
    {
      code: "const empty = {};",
      filename: "Component.tsx",
      name: "empty object",
    },
    {
      code: 'const config = { a: 1, b: "x", c: true };',
      filename: "Component.tsx",
      name: "object of mixed primitives",
    },
    {
      code: 'const config = { home: { url: "/" } };',
      filename: "utils.ts",
      name: "nested object in non-jsx file is allowed",
    },
  ],
  invalid: [
    {
      code: 'const config = { home: { url: "/" } };',
      filename: "Component.tsx",
      errors: [{ messageId: "noDataObject", data: { name: "config" } }],
      name: "nested object literal value",
    },
    {
      code: "const config = { items: [{ id: 1 }] };",
      filename: "Component.tsx",
      errors: [{ messageId: "noDataObject", data: { name: "config" } }],
      name: "array of objects as value",
    },
    {
      code: "const config = { matrix: [[1, 2], [3, 4]] };",
      filename: "Component.tsx",
      errors: [{ messageId: "noDataObject", data: { name: "config" } }],
      name: "nested array as value",
    },
    {
      code: "const config = { a: { b: 1 } } as const;",
      filename: "Component.tsx",
      errors: [{ messageId: "noDataObject", data: { name: "config" } }],
      name: "as const assertion",
    },
    {
      code: "const config = { a: { b: 1 } } satisfies Record<string, unknown>;",
      filename: "Component.tsx",
      errors: [{ messageId: "noDataObject", data: { name: "config" } }],
      name: "satisfies expression",
    },
    {
      code: "export const config = { a: { b: 1 } };",
      filename: "Component.tsx",
      errors: [{ messageId: "noDataObject", data: { name: "config" } }],
      name: "exported nested object",
    },
    {
      code: "const config = { a: { b: 1 } };",
      filename: "Component.jsx",
      errors: [{ messageId: "noDataObject", data: { name: "config" } }],
      name: "jsx file is checked too",
    },
  ],
});
