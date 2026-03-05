import { RuleTester } from "@typescript-eslint/rule-tester";
import { afterAll, describe, it } from "@jest/globals";

import noComplexInlineReturn from "../no-complex-inline-return";

RuleTester.afterAll = afterAll;
RuleTester.describe = describe;
RuleTester.it = it;

const ruleTester = new RuleTester();

describe("no-complex-inline-return", () => {
  it("should have meta property", () => {
    expect(noComplexInlineReturn.meta).toBeDefined();
  });

  it("should have create method", () => {
    expect(typeof noComplexInlineReturn.create).toBe("function");
  });

  ruleTester.run("no-complex-inline-return", noComplexInlineReturn, {
    valid: [
      "function foo() { return true; }",
      "function foo() { return 42; }",
      "function foo() { return 'hello'; }",
      "const foo = () => { return bar; }",
      "function foo() { return someFunction(); }",
      "const foo = () => { return bar.baz(); }",
      `function foo() {
        const result = condition ? value1 : value2;
        return result;
      }`,
      `function foo() {
        const result = condition ? value1 : value2;
        return { result };
      }`,
      "function foo() { return a + b; }",
      "function foo() { return a * b; }",
      "function foo() { return { a: 1, b: 2 }; }",
      "function foo() { return [1, 2, 3]; }",
      "function foo() { return obj.prop; }",
      "function foo() { return obj.nested.prop; }",
    ],
    invalid: [
      {
        code: "function foo() { return condition ? value1 : value2; }",
        errors: [
          {
            messageId: "noComplexInlineReturn",
          },
        ],
      },
      {
        code: `const foo = () => {
          return someCondition ? value1 : value2;
        }`,
        errors: [
          {
            messageId: "noComplexInlineReturn",
          },
        ],
      },
      {
        code: `return targetWindow.document.readyState === "complete"
          ? Promise.resolve()
          : new Promise<void>((resolve) => {
              targetWindow.addEventListener(
                "load",
                () => {
                  resolve();
                },
                {
                  once: true,
                },
              );
            });`,
        errors: [
          {
            messageId: "noComplexInlineReturn",
          },
        ],
      },
      {
        code: "function foo() { return a && b; }",
        errors: [
          {
            messageId: "noComplexInlineReturn",
          },
        ],
      },
      {
        code: "function foo() { return a || b; }",
        errors: [
          {
            messageId: "noComplexInlineReturn",
          },
        ],
      },
      {
        code: "function foo() { return a ?? b; }",
        errors: [
          {
            messageId: "noComplexInlineReturn",
          },
        ],
      },
      {
        code: "function foo() { return new MyClass(); }",
        errors: [
          {
            messageId: "noComplexInlineReturn",
          },
        ],
      },
      {
        code: `function foo() {
          return new Promise((resolve) => {
            resolve();
          });
        }`,
        errors: [
          {
            messageId: "noComplexInlineReturn",
          },
        ],
      },
    ],
  });
});
