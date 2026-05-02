import { RuleTester } from "@typescript-eslint/rule-tester";
import { afterAll, describe, it } from "@jest/globals";

import noInlineNestedObject from "../no-inline-nested-object";

RuleTester.afterAll = afterAll;
RuleTester.describe = describe;
RuleTester.it = it;

const ruleTester = new RuleTester();

describe("no-inline-nested-object", () => {
  it("should have meta property", () => {
    expect(noInlineNestedObject.meta).toBeDefined();
  });

  it("should have create method", () => {
    expect(typeof noInlineNestedObject.create).toBe("function");
  });

  ruleTester.run("no-inline-nested-object", noInlineNestedObject, {
    valid: [
      {
        code: `
const obj = {
  a: true,
  b: "sm",
};
        `,
        name: "object with primitive values only",
      },
      {
        code: `
const obj = {
  a: true,
  b: "sm",
  c: {
    d: "e",
  },
};
        `,
        name: "nested object spans multiple lines",
      },
      {
        code: `
const obj = {
  a: true,
  items: [
    1,
    2,
    3,
  ],
};
        `,
        name: "nested array spans multiple lines",
      },
      {
        code: `
const obj = {
  a: {},
};
        `,
        name: "empty nested object is allowed inline",
      },
      {
        code: `
const obj = {
  a: [],
};
        `,
        name: "empty nested array is allowed inline",
      },
      {
        code: `
const obj = {
  a: true,
  b: {
    c: {
      d: "deep",
    },
  },
};
        `,
        name: "deeply nested objects all on multiple lines",
      },
      {
        code: `
const obj = {
  items: [1, 2, 3],
};
        `,
        name: "inline array of primitives is allowed",
      },
      {
        code: `
const obj = {
  options: ["primary", "foreground", "danger", "outline", "ghost", "link"],
};
        `,
        name: "inline array of string literals is allowed",
      },
      {
        code: `
const obj = {
  values: [true, false, null, undefined],
};
        `,
        name: "inline array of boolean and null literals is allowed",
      },
      {
        code: `
const obj = {
  refs: [foo, bar, baz],
};
        `,
        name: "inline array of identifiers is allowed",
      },
      {
        code: `
const obj = {
  allow: [target.utils, target.types, target.constants],
};
        `,
        name: "inline array of member expressions is allowed",
      },
      {
        code: `
const obj = {
  allow: [target?.utils, target?.types, target?.constants],
};
        `,
        name: "inline array of optional chain member expressions is allowed",
      },
      {
        code: `
const obj = {
  refs: [foo, bar.baz, qux],
};
        `,
        name: "inline array mixing identifiers and member expressions is allowed",
      },
      {
        code: `
const obj = {
  config: { enabled: true, timeout: 5000 },
};
        `,
        name: "inline flat object value is allowed",
      },
      {
        code: `
const obj = {
  database: { host: "localhost", port: 5432, name: "myapp" },
};
        `,
        name: "inline flat object with multiple primitive properties is allowed",
      },
      {
        code: `
const obj = {
  a: true,
  b: "sm",
  c: { d: "e" },
};
        `,
        name: "inline flat single-property object value is allowed",
      },
      {
        code: `
const obj = {
  a: { b: 1 },
  c: { d: 2 },
};
        `,
        name: "multiple inline flat single-property object values are allowed",
      },
    ],
    invalid: [
      {
        code: `
const obj = {
  items: [{ a: 1 }, { b: 2 }],
};
        `,
        errors: [
          {
            messageId: "requireMultiline",
          },
        ],
        output: `
const obj = {
  items: [
    { a: 1 },
    { b: 2 },
  ],
};
        `,
        name: "inline array containing object literals must be multiline",
      },
      {
        code: `
const obj = {
  matrix: [[1, 2], [3, 4]],
};
        `,
        errors: [
          {
            messageId: "requireMultiline",
          },
        ],
        output: `
const obj = {
  matrix: [
    [1, 2],
    [3, 4],
  ],
};
        `,
        name: "inline array containing arrays must be multiline",
      },
      {
        code: `
const obj = {
  layer: { inner: { leaf: 1 } },
};
        `,
        errors: [
          {
            messageId: "requireMultiline",
          },
        ],
        output: `
const obj = {
  layer: {
    inner: { leaf: 1 },
  },
};
        `,
        name: "inline object containing nested object must be multiline",
      },
      {
        code: `
const obj = {
  wrap: { items: [1, 2, 3] },
};
        `,
        errors: [
          {
            messageId: "requireMultiline",
          },
        ],
        output: `
const obj = {
  wrap: {
    items: [1, 2, 3],
  },
};
        `,
        name: "inline object containing array value must be multiline",
      },
    ],
  });
});
