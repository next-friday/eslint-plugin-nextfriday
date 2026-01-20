import { RuleTester } from "@typescript-eslint/rule-tester";
import { afterAll, describe, it, expect } from "@jest/globals";
import parser from "@typescript-eslint/parser";

import noSingleCharVariables from "../no-single-char-variables";

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

describe("no-single-char-variables", () => {
  it("should be defined", () => {
    expect(noSingleCharVariables).toBeDefined();
  });

  ruleTester.run("no-single-char-variables", noSingleCharVariables, {
    valid: [
      {
        code: "const date = new Date();",
        name: "should allow descriptive variable name",
      },
      {
        code: "const currentUser = await getUser();",
        name: "should allow camelCase descriptive names",
      },
      {
        code: "const itemCount = list.length;",
        name: "should allow descriptive count variable",
      },
      {
        code: "users.map(user => user.id);",
        name: "should allow descriptive arrow function parameter",
      },
      {
        code: "const add = (val1, val2) => val1 + val2;",
        name: "should allow descriptive function parameters",
      },
      {
        code: "const add = (width, height) => width * height;",
        name: "should allow meaningful parameter names",
      },
      {
        code: "onClick(event => event.preventDefault());",
        name: "should allow event as event handler parameter",
      },
      {
        code: "const response = await fetch(url);",
        name: "should allow descriptive async variable",
      },
      {
        code: "for (let i = 0; i < 10; i++) {}",
        name: "should allow i in for loop",
      },
      {
        code: "for (let j = 0; j < 10; j++) {}",
        name: "should allow j in for loop",
      },
      {
        code: "for (let k = 0; k < 10; k++) {}",
        name: "should allow k in for loop",
      },
      {
        code: "for (let n = 0; n < 10; n++) {}",
        name: "should allow n in for loop",
      },
      {
        code: "for (let i = 0, j = 10; i < j; i++, j--) {}",
        name: "should allow i and j in same for loop",
      },
      {
        code: "const _ = unusedValue;",
        name: "should allow underscore for unused variables",
      },
      {
        code: "const [_, second] = array;",
        name: "should allow underscore in array destructuring",
      },
      {
        code: "function process({ _unused, value }) {}",
        name: "should allow underscore-prefixed unused in destructuring",
      },
      {
        code: "const { a: alpha, b: beta } = obj;",
        name: "should allow renamed destructured properties with descriptive names",
      },
      {
        code: "const calculateDouble = (value) => value * 2;",
        name: "should allow function with descriptive parameter",
      },
      {
        code: "function getName() { return 'test'; }",
        name: "should allow descriptive function name",
      },
      {
        code: "const fn = function calculate() { return 1; };",
        name: "should allow descriptive function expression name",
      },
      {
        code: "for (const item of items) {}",
        name: "should allow descriptive for-of variable",
      },
      {
        code: "for (const key in obj) {}",
        name: "should allow descriptive for-in variable",
      },
    ],
    invalid: [
      {
        code: "const d = new Date();",
        name: "should reject single char variable d",
        errors: [{ messageId: "noSingleChar", data: { name: "d" } }],
      },
      {
        code: "const u = await getUser();",
        name: "should reject single char variable u",
        errors: [{ messageId: "noSingleChar", data: { name: "u" } }],
      },
      {
        code: "const l = list.length;",
        name: "should reject single char variable l",
        errors: [{ messageId: "noSingleChar", data: { name: "l" } }],
      },
      {
        code: "const r = await fetch(url);",
        name: "should reject single char variable r",
        errors: [{ messageId: "noSingleChar", data: { name: "r" } }],
      },
      {
        code: "users.map(u => u.id);",
        name: "should reject single char arrow function parameter",
        errors: [{ messageId: "noSingleChar", data: { name: "u" } }],
      },
      {
        code: "onClick(e => e.preventDefault());",
        name: "should reject e as event handler parameter",
        errors: [{ messageId: "noSingleChar", data: { name: "e" } }],
      },
      {
        code: "const add = (a, b) => a + b;",
        name: "should reject multiple single char parameters",
        errors: [
          { messageId: "noSingleChar", data: { name: "a" } },
          { messageId: "noSingleChar", data: { name: "b" } },
        ],
      },
      {
        code: "const e = (x) => x * 2;",
        name: "should reject single char function name and parameter",
        errors: [
          { messageId: "noSingleChar", data: { name: "e" } },
          { messageId: "noSingleChar", data: { name: "x" } },
        ],
      },
      {
        code: "function f() { return 1; }",
        name: "should reject single char function declaration name",
        errors: [{ messageId: "noSingleChar", data: { name: "f" } }],
      },
      {
        code: "const fn = function g() { return 1; };",
        name: "should reject single char function expression name",
        errors: [{ messageId: "noSingleChar", data: { name: "g" } }],
      },
      {
        code: "function process(x) { return x; }",
        name: "should reject single char parameter in function declaration",
        errors: [{ messageId: "noSingleChar", data: { name: "x" } }],
      },
      {
        code: "const { a } = obj;",
        name: "should reject single char in object destructuring",
        errors: [{ messageId: "noSingleChar", data: { name: "a" } }],
      },
      {
        code: "const [x] = array;",
        name: "should reject single char in array destructuring",
        errors: [{ messageId: "noSingleChar", data: { name: "x" } }],
      },
      {
        code: "const t = 'value';",
        name: "should reject single char t",
        errors: [{ messageId: "noSingleChar", data: { name: "t" } }],
      },
      {
        code: "const v = getValue();",
        name: "should reject single char v",
        errors: [{ messageId: "noSingleChar", data: { name: "v" } }],
      },
      {
        code: "let i = 0; while (i < 10) { i++; }",
        name: "should reject i outside for loop context",
        errors: [{ messageId: "noSingleChar", data: { name: "i" } }],
      },
      {
        code: "for (const x of items) {}",
        name: "should reject x in for-of loop (not allowed char)",
        errors: [{ messageId: "noSingleChar", data: { name: "x" } }],
      },
      {
        code: "for (const k in obj) {}",
        name: "should reject k in for-in loop (only allowed in traditional for)",
        errors: [{ messageId: "noSingleChar", data: { name: "k" } }],
      },
      {
        code: "try {} catch (e) {}",
        name: "should reject single char in catch clause",
        errors: [{ messageId: "noSingleChar", data: { name: "e" } }],
      },
    ],
  });
});
