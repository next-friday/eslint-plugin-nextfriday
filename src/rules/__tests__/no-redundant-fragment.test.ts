import { afterAll, describe, it } from "@jest/globals";
import { RuleTester } from "@typescript-eslint/rule-tester";

import rule from "../no-redundant-fragment";

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

ruleTester.run("no-redundant-fragment", rule, {
  valid: [
    {
      code: "<>{a}{b}</>",
      name: "fragment shorthand wrapping multiple expressions",
    },
    {
      code: "<><A /><B /></>",
      name: "fragment shorthand wrapping multiple elements",
    },
    {
      code: "<Fragment>{a}{b}</Fragment>",
      name: "long-form Fragment wrapping multiple children",
    },
    {
      code: "<React.Fragment>{a}{b}</React.Fragment>",
      name: "React.Fragment long-form wrapping multiple children",
    },
    {
      code: "<React.Fragment key={item.id}>{item.label}{item.value}</React.Fragment>",
      name: "React.Fragment with key wrapping multiple children",
    },
    {
      code: "<React.Fragment key={item.id}>{item.label}</React.Fragment>",
      name: "React.Fragment with key wrapping single child is allowed (key is the legit reason)",
    },
    {
      code: "<Fragment key={k}>{x}</Fragment>",
      name: "Fragment with key wrapping single child is allowed",
    },
    {
      code: "<div>x</div>",
      name: "non-fragment element is ignored",
    },
  ],
  invalid: [
    {
      code: "<></>",
      errors: [{ messageId: "redundantFragment" }],
      name: "empty fragment shorthand",
    },
    {
      code: "<>{x}</>",
      errors: [{ messageId: "redundantFragment" }],
      name: "fragment shorthand wrapping single expression",
    },
    {
      code: "<><A /></>",
      errors: [{ messageId: "redundantFragment" }],
      name: "fragment shorthand wrapping single element",
    },
    {
      code: "<>text</>",
      errors: [{ messageId: "redundantFragment" }],
      name: "fragment shorthand wrapping single text node",
    },
    {
      code: "<Fragment>x</Fragment>",
      errors: [{ messageId: "redundantFragment" }],
      name: "long-form Fragment wrapping single child without key",
    },
    {
      code: "<React.Fragment>{x}</React.Fragment>",
      errors: [{ messageId: "redundantFragment" }],
      name: "React.Fragment wrapping single child without key",
    },
    {
      code: "<React.Fragment></React.Fragment>",
      errors: [{ messageId: "redundantFragment" }],
      name: "empty React.Fragment without key",
    },
    {
      code: "<Fragment>   </Fragment>",
      errors: [{ messageId: "redundantFragment" }],
      name: "Fragment with only whitespace",
    },
  ],
});

describe("no-redundant-fragment rule structure", () => {
  it("should have meta property", () => {
    expect(rule.meta).toBeDefined();
  });

  it("should have create method", () => {
    expect(typeof rule.create).toBe("function");
  });
});
