import { RuleTester } from "@typescript-eslint/rule-tester";
import { afterAll, describe, it } from "@jest/globals";

import noInlineNestedObject from "../no-inline-nested-object";

RuleTester.afterAll = afterAll;
RuleTester.it = it;
RuleTester.itOnly = it.only;
RuleTester.describe = describe;

const ruleTester = new RuleTester({
  languageOptions: {
    parserOptions: {
      ecmaVersion: 2020,
      sourceType: "module",
    },
  },
});

describe("no-inline-nested-object", () => {
  it("should be defined", () => {
    expect(noInlineNestedObject).toBeDefined();
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
    ],
    invalid: [
      {
        code: `
const obj = {
  a: true,
  b: "sm",
  c: { d: "e" },
};
        `,
        errors: [
          {
            messageId: "requireMultiline",
          },
        ],
        output: `
const obj = {
  a: true,
  b: "sm",
  c: {
    d: "e",
  },
};
        `,
        name: "inline nested object should be multiline",
      },
      {
        code: `
const obj = {
  items: [1, 2, 3],
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
    1,
    2,
    3,
  ],
};
        `,
        name: "inline nested array should be multiline",
      },
      {
        code: `
const obj = {
  a: { b: 1 },
  c: { d: 2 },
};
        `,
        errors: [
          {
            messageId: "requireMultiline",
          },
          {
            messageId: "requireMultiline",
          },
        ],
        output: `
const obj = {
  a: {
    b: 1,
  },
  c: {
    d: 2,
  },
};
        `,
        name: "multiple inline nested objects",
      },
      {
        code: `
const obj = {
  config: { enabled: true, timeout: 5000 },
};
        `,
        errors: [
          {
            messageId: "requireMultiline",
          },
        ],
        output: `
const obj = {
  config: {
    enabled: true,
    timeout: 5000,
  },
};
        `,
        name: "inline nested object with multiple properties",
      },
    ],
  });
});
