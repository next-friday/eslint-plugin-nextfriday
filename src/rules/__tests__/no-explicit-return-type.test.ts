import { RuleTester } from "@typescript-eslint/rule-tester";
import { afterAll, describe, it } from "@jest/globals";
import parser from "@typescript-eslint/parser";

import noExplicitReturnType from "../no-explicit-return-type";

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

describe("no-explicit-return-type", () => {
  it("should be defined", () => {
    expect(noExplicitReturnType).toBeDefined();
  });

  ruleTester.run("no-explicit-return-type", noExplicitReturnType, {
    valid: [
      "const foo = (bar: string) => { return bar.length > 0; };",
      "const foo = (bar: string) => bar.length > 0;",
      "const foo = () => { return true; };",
      "function foo(bar: string) { return bar.length > 0; }",
      "function foo() { return true; }",
      "const foo = function(bar: string) { return bar.length > 0; };",
    ],
    invalid: [
      {
        code: "const foo = (bar: string): boolean => { return bar.length > 0; };",
        errors: [
          {
            messageId: "noExplicitReturnType",
            data: { returnType: ": boolean" },
            line: 1,
            column: 26,
          },
        ],
        output: "const foo = (bar: string) => { return bar.length > 0; };",
      },
      {
        code: "const foo = (bar: string): number => bar.length;",
        errors: [
          {
            messageId: "noExplicitReturnType",
            data: { returnType: ": number" },
            line: 1,
            column: 26,
          },
        ],
        output: "const foo = (bar: string) => bar.length;",
      },

      {
        code: "function foo(bar: string): boolean { return bar.length > 0; }",
        errors: [
          {
            messageId: "noExplicitReturnType",
            data: { returnType: ": boolean" },
            line: 1,
            column: 26,
          },
        ],
        output: "function foo(bar: string) { return bar.length > 0; }",
      },

      {
        code: "const foo = function(bar: string): boolean { return bar.length > 0; };",
        errors: [
          {
            messageId: "noExplicitReturnType",
            data: { returnType: ": boolean" },
            line: 1,
            column: 34,
          },
        ],
        output: "const foo = function(bar: string) { return bar.length > 0; };",
      },
    ],
  });
});
