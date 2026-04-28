import { afterAll, describe, it } from "@jest/globals";
import { RuleTester } from "@typescript-eslint/rule-tester";

import jsxSpreadPropsLast from "../jsx-spread-props-last";

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

describe("jsx-spread-props-last", () => {
  it("should have meta property", () => {
    expect(jsxSpreadPropsLast.meta).toBeDefined();
  });

  it("should have create method", () => {
    expect(typeof jsxSpreadPropsLast.create).toBe("function");
  });

  ruleTester.run("jsx-spread-props-last", jsxSpreadPropsLast, {
    valid: [
      {
        code: `<Component />`,
        name: "should allow no props",
      },
      {
        code: `<Component name="x" />`,
        name: "should allow only non-spread props",
      },
      {
        code: `<Component name="x" count={1} disabled />`,
        name: "should allow multiple non-spread props",
      },
      {
        code: `<Component {...props} />`,
        name: "should allow only spread",
      },
      {
        code: `<Component name="x" {...props} />`,
        name: "should allow spread last",
      },
      {
        code: `<Component baz="baz" foobar={foobar} {...bes} />`,
        name: "should allow spread last with multiple non-spread props",
      },
      {
        code: `<Component {...a} {...b} />`,
        name: "should allow consecutive spreads only",
      },
      {
        code: `<Component name="x" {...a} {...b} />`,
        name: "should allow multiple spreads at the end",
      },
    ],
    invalid: [
      {
        code: `<Component {...bes} baz="baz" foobar={foobar} />`,
        errors: [{ messageId: "spreadNotLast" }],
        name: "should report spread before all other props",
      },
      {
        code: `<Component baz="baz" {...bes} foobar={foobar} />`,
        errors: [{ messageId: "spreadNotLast" }],
        name: "should report spread between non-spread props",
      },
      {
        code: `<Component {...a} name="x" {...b} />`,
        errors: [{ messageId: "spreadNotLast" }],
        name: "should report only the misplaced spread when others are last",
      },
      {
        code: `<Component {...a} {...b} name="x" />`,
        errors: [{ messageId: "spreadNotLast" }, { messageId: "spreadNotLast" }],
        name: "should report each spread that is not last",
      },
    ],
  });
});
