import { afterAll, describe, it } from "@jest/globals";
import { RuleTester } from "@typescript-eslint/rule-tester";

import rule from "../jsx-no-ternary-null";

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

describe("jsx-no-ternary-null", () => {
  it("should have meta property", () => {
    expect(rule.meta).toBeDefined();
  });

  it("should have create method", () => {
    expect(typeof rule.create).toBe("function");
  });

  ruleTester.run("jsx-no-ternary-null", rule, {
    valid: [
      {
        code: "<div>{isVisible && <span>Hello</span>}</div>",
        name: "logical AND pattern",
      },
      {
        code: "<div>{isActive && <Component />}</div>",
        name: "logical AND with component",
      },
      {
        code: "<div>{condition ? <A /> : <B />}</div>",
        name: "ternary with two JSX branches",
      },
      {
        code: '<div>{condition ? "yes" : "no"}</div>',
        name: "ternary with two string branches",
      },
      {
        code: "const x = condition ? value : null;",
        name: "ternary outside JSX",
      },
      {
        code: "<div>{value}</div>",
        name: "simple expression",
      },
      {
        code: "<div>{condition ? <A /> : false}</div>",
        name: "ternary with false alternate",
      },
    ],
    invalid: [
      {
        code: "<div>{condition ? <span>Hello</span> : null}</div>",
        errors: [{ messageId: "preferLogicalAnd" }],
        output: "<div>{condition && (<span>Hello</span>)}</div>",
        name: "ternary with null alternate",
      },
      {
        code: "<div>{condition ? <Component /> : null}</div>",
        errors: [{ messageId: "preferLogicalAnd" }],
        output: "<div>{condition && (<Component />)}</div>",
        name: "ternary with null alternate and component",
      },
      {
        code: "<div>{condition ? <span>Hello</span> : undefined}</div>",
        errors: [{ messageId: "preferLogicalAnd" }],
        output: "<div>{condition && (<span>Hello</span>)}</div>",
        name: "ternary with undefined alternate",
      },
      {
        code: "<div>{null ? <span>Hello</span> : null}</div>",
        errors: [{ messageId: "preferLogicalAnd" }],
        output: "<div>{null && (<span>Hello</span>)}</div>",
        name: "null test with null alternate",
      },
      {
        code: `<div>{branch ? (
        <div className="flex items-center gap-x-4">
          <span>{branch}</span>
        </div>
      ) : null}</div>`,
        errors: [{ messageId: "preferLogicalAnd" }],
        output: `<div>{branch && (<div className="flex items-center gap-x-4">
          <span>{branch}</span>
        </div>)}</div>`,
        name: "multiline ternary with null alternate",
      },
      {
        code: "<div>{null ? null : <span>Fallback</span>}</div>",
        errors: [{ messageId: "preferLogicalAnd" }],
        output: "<div>{!null && (<span>Fallback</span>)}</div>",
        name: "null consequent with JSX alternate",
      },
      {
        code: "<div>{undefined ? null : <span>Fallback</span>}</div>",
        errors: [{ messageId: "preferLogicalAnd" }],
        output: "<div>{!undefined && (<span>Fallback</span>)}</div>",
        name: "undefined consequent with JSX alternate",
      },
    ],
  });
});
