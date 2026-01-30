import { RuleTester } from "@typescript-eslint/rule-tester";
import { afterAll, describe, it, expect } from "@jest/globals";

import jsxNoInlineObjectProp from "../jsx-no-inline-object-prop";

RuleTester.afterAll = afterAll;
RuleTester.it = it;
RuleTester.itOnly = it.only;
RuleTester.describe = describe;

const ruleTester = new RuleTester({
  languageOptions: {
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
    },
  },
});

ruleTester.run("jsx-no-inline-object-prop", jsxNoInlineObjectProp, {
  valid: [
    {
      code: `const style = { color: "red" }; <Component style={style} />`,
      name: "should allow variable reference for style",
    },
    {
      code: `const data = { id: 1 }; <Component data={data} />`,
      name: "should allow variable reference for data",
    },
    {
      code: `<Component onClick={handleClick} />`,
      name: "should allow function reference",
    },
    {
      code: `<Component disabled={true} />`,
      name: "should allow boolean values",
    },
    {
      code: `<Component count={42} />`,
      name: "should allow number values",
    },
    {
      code: `<Component name="test" />`,
      name: "should allow string literals",
    },
    {
      code: `<Component name={"test"} />`,
      name: "should allow string in expression container",
    },
    {
      code: `<Component items={[1, 2, 3]} />`,
      name: "should allow inline arrays",
    },
    {
      code: `<Component callback={() => {}} />`,
      name: "should allow arrow functions",
    },
    {
      code: `<Component value={someObject.property} />`,
      name: "should allow member expressions",
    },
    {
      code: `<Component {...props} />`,
      name: "should allow spread attributes",
    },
  ],
  invalid: [
    {
      code: `<Component style={{ color: "red" }} />`,
      name: "should disallow inline object for style",
      errors: [
        {
          messageId: "noInlineObject",
        },
      ],
    },
    {
      code: `<Component data={{ id: 1 }} />`,
      name: "should disallow inline object for data",
      errors: [
        {
          messageId: "noInlineObject",
        },
      ],
    },
    {
      code: `<Component config={{ enabled: true, timeout: 1000 }} />`,
      name: "should disallow inline object with multiple properties",
      errors: [
        {
          messageId: "noInlineObject",
        },
      ],
    },
    {
      code: `<Component options={{}} />`,
      name: "should disallow empty inline object",
      errors: [
        {
          messageId: "noInlineObject",
        },
      ],
    },
    {
      code: `<Component nested={{ outer: { inner: "value" } }} />`,
      name: "should disallow nested inline objects",
      errors: [
        {
          messageId: "noInlineObject",
        },
      ],
    },
    {
      code: `<div style={{ margin: 0 }}><span style={{ padding: 0 }} /></div>`,
      name: "should report multiple inline objects",
      errors: [
        {
          messageId: "noInlineObject",
        },
        {
          messageId: "noInlineObject",
        },
      ],
    },
  ],
});

describe("jsx-no-inline-object-prop rule structure", () => {
  it("should have correct rule structure", () => {
    expect(jsxNoInlineObjectProp).toHaveProperty("meta");
    expect(jsxNoInlineObjectProp).toHaveProperty("create");
    expect(typeof jsxNoInlineObjectProp.create).toBe("function");
  });
});
