import { RuleTester } from "@typescript-eslint/rule-tester";
import { afterAll, describe, it, expect } from "@jest/globals";
import parser from "@typescript-eslint/parser";

import noLazyIdentifiers from "../no-lazy-identifiers";

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

describe("no-lazy-identifiers", () => {
  it("should be defined", () => {
    expect(noLazyIdentifiers).toBeDefined();
  });

  ruleTester.run("no-lazy-identifiers", noLazyIdentifiers, {
    valid: [
      {
        code: "const userName = 'john';",
        name: "should allow descriptive variable name",
      },
      {
        code: "const itemCount = 10;",
        name: "should allow meaningful variable name",
      },
      {
        code: "function calculateTotal(price, quantity) { return price * quantity; }",
        name: "should allow descriptive function and parameter names",
      },
      {
        code: "const getUserById = (userId) => users.find(u => u.id === userId);",
        name: "should allow descriptive arrow function",
      },
      {
        code: "class UserService {}",
        name: "should allow descriptive class name",
      },
      {
        code: "interface UserProps {}",
        name: "should allow descriptive interface name",
      },
      {
        code: "type UserId = string;",
        name: "should allow descriptive type alias",
      },
      {
        code: "const _unused = getValue();",
        name: "should allow underscore-prefixed variables",
      },
      {
        code: "const _xxx = 'ignored';",
        name: "should allow underscore-prefixed even with lazy pattern",
      },
      {
        code: "const { name, age } = user;",
        name: "should allow descriptive destructured properties",
      },
      {
        code: "const [first, second] = array;",
        name: "should allow descriptive array destructuring",
      },
      {
        code: "const id = 1;",
        name: "should allow short but meaningful names",
      },
      {
        code: "const db = getDatabase();",
        name: "should allow common abbreviations",
      },
      {
        code: "const aa = 1;",
        name: "should allow two repeated chars (not lazy)",
      },
      {
        code: "const qwe = 1;",
        name: "should allow short keyboard patterns under threshold",
      },
    ],
    invalid: [
      {
        code: "const xxx = 'value';",
        name: "should reject repeated character variable xxx",
        errors: [{ messageId: "noLazyIdentifier", data: { name: "xxx" } }],
      },
      {
        code: "const yyy = 123;",
        name: "should reject repeated character variable yyy",
        errors: [{ messageId: "noLazyIdentifier", data: { name: "yyy" } }],
      },
      {
        code: "const zzz = true;",
        name: "should reject repeated character variable zzz",
        errors: [{ messageId: "noLazyIdentifier", data: { name: "zzz" } }],
      },
      {
        code: "const aaa = [];",
        name: "should reject repeated character variable aaa",
        errors: [{ messageId: "noLazyIdentifier", data: { name: "aaa" } }],
      },
      {
        code: "const aaaa = [];",
        name: "should reject longer repeated character variable",
        errors: [{ messageId: "noLazyIdentifier", data: { name: "aaaa" } }],
      },
      {
        code: "const asdf = 'keyboard';",
        name: "should reject keyboard pattern asdf",
        errors: [{ messageId: "noLazyIdentifier", data: { name: "asdf" } }],
      },
      {
        code: "const qwerty = 'keyboard';",
        name: "should reject keyboard pattern qwerty",
        errors: [{ messageId: "noLazyIdentifier", data: { name: "qwerty" } }],
      },
      {
        code: "const zxcv = 'keyboard';",
        name: "should reject keyboard pattern zxcv",
        errors: [{ messageId: "noLazyIdentifier", data: { name: "zxcv" } }],
      },
      {
        code: "const hjkl = 'vim keys';",
        name: "should reject keyboard pattern hjkl",
        errors: [{ messageId: "noLazyIdentifier", data: { name: "hjkl" } }],
      },
      {
        code: "const myAsdfVar = 'contains pattern';",
        name: "should reject variable containing keyboard pattern",
        errors: [{ messageId: "noLazyIdentifier", data: { name: "myAsdfVar" } }],
      },
      {
        code: "function xxx() { return 1; }",
        name: "should reject lazy function name",
        errors: [{ messageId: "noLazyIdentifier", data: { name: "xxx" } }],
      },
      {
        code: "const fn = (xxx) => xxx * 2;",
        name: "should reject lazy parameter name",
        errors: [{ messageId: "noLazyIdentifier", data: { name: "xxx" } }],
      },
      {
        code: "class aaaa {}",
        name: "should reject lazy class name",
        errors: [{ messageId: "noLazyIdentifier", data: { name: "aaaa" } }],
      },
      {
        code: "const { xxx } = obj;",
        name: "should reject lazy destructured variable",
        errors: [{ messageId: "noLazyIdentifier", data: { name: "xxx" } }],
      },
      {
        code: "const [aaa, bbb] = array;",
        name: "should reject multiple lazy array destructured variables",
        errors: [
          { messageId: "noLazyIdentifier", data: { name: "aaa" } },
          { messageId: "noLazyIdentifier", data: { name: "bbb" } },
        ],
      },
      {
        code: "interface xxxType {}",
        name: "should reject lazy interface name",
        errors: [{ messageId: "noLazyIdentifier", data: { name: "xxxType" } }],
      },
      {
        code: "type aaaAlias = string;",
        name: "should reject lazy type alias name",
        errors: [{ messageId: "noLazyIdentifier", data: { name: "aaaAlias" } }],
      },
    ],
  });
});
