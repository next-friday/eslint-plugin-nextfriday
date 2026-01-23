import { RuleTester } from "@typescript-eslint/rule-tester";
import { afterAll, describe, it, expect } from "@jest/globals";
import parser from "@typescript-eslint/parser";

import noInlineDefaultExport from "../no-inline-default-export";

RuleTester.afterAll = afterAll;
RuleTester.it = it;
RuleTester.itOnly = it.only;
RuleTester.describe = describe;

const ruleTester = new RuleTester({
  languageOptions: {
    parser,
    parserOptions: {
      ecmaVersion: 2020,
      sourceType: "module",
    },
  },
});

describe("no-inline-default-export", () => {
  it("should be defined", () => {
    expect(noInlineDefaultExport).toBeDefined();
  });

  ruleTester.run("no-inline-default-export", noInlineDefaultExport, {
    valid: [
      {
        code: `
function generator(plop) {
  return plop;
}
export default generator;
`,
        name: "should allow separate function declaration and default export",
      },
      {
        code: `
const foo = () => {
  return 'bar';
};
export default foo;
`,
        name: "should allow separate const arrow function and default export",
      },
      {
        code: `
class MyClass {
  constructor() {}
}
export default MyClass;
`,
        name: "should allow separate class declaration and default export",
      },
      {
        code: `
const config = {
  name: 'test',
};
export default config;
`,
        name: "should allow separate object declaration and default export",
      },
      {
        code: `export { foo as default } from './foo';`,
        name: "should allow re-export as default",
      },
      {
        code: `
const value = 42;
export default value;
`,
        name: "should allow exporting a variable reference",
      },
      {
        code: `export default 'literal';`,
        name: "should allow exporting literals",
      },
      {
        code: `export default { key: 'value' };`,
        name: "should allow exporting inline objects",
      },
    ],
    invalid: [
      {
        code: `export default function generator(plop) { return plop; }`,
        name: "should reject inline named function default export",
        errors: [
          {
            messageId: "noInlineDefaultExport",
            data: { type: "function", name: "generator" },
          },
        ],
      },
      {
        code: `export default function foo() { return 'bar'; }`,
        name: "should reject another inline named function default export",
        errors: [
          {
            messageId: "noInlineDefaultExport",
            data: { type: "function", name: "foo" },
          },
        ],
      },
      {
        code: `export default function() { return 'anonymous'; }`,
        name: "should reject anonymous function default export",
        errors: [
          {
            messageId: "noAnonymousDefaultExport",
            data: { type: "function" },
          },
        ],
      },
      {
        code: `export default () => 'arrow';`,
        name: "should reject inline arrow function default export",
        errors: [
          {
            messageId: "noAnonymousDefaultExport",
            data: { type: "function" },
          },
        ],
      },
      {
        code: `export default class MyService { constructor() {} }`,
        name: "should reject inline named class default export",
        errors: [
          {
            messageId: "noInlineDefaultExport",
            data: { type: "class", name: "MyService" },
          },
        ],
      },
      {
        code: `export default class { constructor() {} }`,
        name: "should reject anonymous class default export",
        errors: [
          {
            messageId: "noAnonymousDefaultExport",
            data: { type: "class" },
          },
        ],
      },
      {
        code: `
export default function processData(data) {
  return data.map(item => item * 2);
}
`,
        name: "should reject multiline inline function default export",
        errors: [
          {
            messageId: "noInlineDefaultExport",
            data: { type: "function", name: "processData" },
          },
        ],
      },
    ],
  });
});
