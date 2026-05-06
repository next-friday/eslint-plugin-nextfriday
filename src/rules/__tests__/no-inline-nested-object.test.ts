import { RuleTester } from "@typescript-eslint/rule-tester";
import { afterAll, describe, it } from "@jest/globals";

import noInlineNestedObject from "../no-inline-nested-object";

RuleTester.afterAll = afterAll;
RuleTester.describe = describe;
RuleTester.it = it;

const ruleTester = new RuleTester({
  languageOptions: {
    parserOptions: {
      ecmaFeatures: { jsx: true },
    },
  },
});

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
        name: "data declaration with primitive values is allowed",
      },
      {
        code: `
const obj = {
  items: [{ a: 1 }, { b: 2 }],
};
        `,
        name: "data declaration with inline array of objects is allowed",
      },
      {
        code: `
const obj = {
  matrix: [[1, 2], [3, 4]],
};
        `,
        name: "data declaration with inline nested arrays is allowed",
      },
      {
        code: `
const obj = {
  layer: { inner: { leaf: 1 } },
};
        `,
        name: "data declaration with deeply nested inline object is allowed",
      },
      {
        code: `
const obj = {
  wrap: { items: [1, 2, 3] },
};
        `,
        name: "data declaration with nested array inside object is allowed",
      },
      {
        code: `
const dependencyRules = [
  { from: source.modules, allow: [{ to: { type: "templates" } }] },
];
        `,
        name: "data declaration with array of wrapper objects is allowed",
      },
      {
        code: `
const obj = {
  config: { enabled: true, timeout: 5000 },
};
        `,
        name: "inline flat object value in declaration is allowed",
      },
      {
        code: `
useState({});
        `,
        name: "function call with empty object is allowed",
      },
      {
        code: `
useState({ a: 1, b: 2 });
        `,
        name: "function call with flat object is allowed",
      },
      {
        code: `
useState([1, 2, 3]);
        `,
        name: "function call with flat array is allowed",
      },
      {
        code: `
useState({
  a: { b: 1 },
});
        `,
        name: "function call with multiline nested object is allowed",
      },
      {
        code: `
function getConfig() {
  return { enabled: true };
}
        `,
        name: "return statement with flat object is allowed",
      },
      {
        code: `
function getConfig() {
  return {
    nested: { value: 1 },
  };
}
        `,
        name: "return statement with multiline nested object is allowed",
      },
      {
        code: `
const factory = () => ({ enabled: true });
        `,
        name: "arrow implicit return with flat object is allowed",
      },
    ],
    invalid: [
      {
        code: `
useState({ a: { b: 1 } });
        `,
        errors: [
          {
            messageId: "requireMultiline",
          },
        ],
        output: `
useState({
  a: { b: 1 },
});
        `,
        name: "function call argument with inline nested object is reported",
      },
      {
        code: `
doThing([{ a: 1 }, { b: 2 }]);
        `,
        errors: [
          {
            messageId: "requireMultiline",
          },
        ],
        output: `
doThing([
  { a: 1 },
  { b: 2 },
]);
        `,
        name: "function call argument with inline array of objects is reported",
      },
      {
        code: `
new Thing({ config: { enabled: true } });
        `,
        errors: [
          {
            messageId: "requireMultiline",
          },
        ],
        output: `
new Thing({
  config: { enabled: true },
});
        `,
        name: "new expression argument with inline nested object is reported",
      },
      {
        code: `
function build() {
  return { user: { id: 1 } };
}
        `,
        errors: [
          {
            messageId: "requireMultiline",
          },
        ],
        output: `
function build() {
  return {
    user: { id: 1 },
  };
}
        `,
        name: "return statement with inline nested object is reported",
      },
      {
        code: `
const factory = () => ({ a: { b: 1 } });
        `,
        errors: [
          {
            messageId: "requireMultiline",
          },
        ],
        output: `
const factory = () => ({
  a: { b: 1 },
});
        `,
        name: "arrow implicit return with inline nested object is reported",
      },
      {
        code: `
const el = <Comp prop={{ a: { b: 1 } }} />;
        `,
        errors: [
          {
            messageId: "requireMultiline",
          },
        ],
        output: `
const el = <Comp prop={{
  a: { b: 1 },
}} />;
        `,
        name: "JSX attribute with inline nested object is reported",
      },
    ],
  });
});
