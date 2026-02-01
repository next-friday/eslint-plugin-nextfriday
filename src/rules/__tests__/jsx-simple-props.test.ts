import { RuleTester } from "@typescript-eslint/rule-tester";
import { afterAll, describe, it, expect } from "@jest/globals";

import jsxSimpleProps from "../jsx-simple-props";

const DOLLAR = "$";

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

ruleTester.run("jsx-simple-props", jsxSimpleProps, {
  valid: [
    {
      code: `<Component name="test" />`,
      name: "should allow string literal",
    },
    {
      code: `<Component name={'test'} />`,
      name: "should allow string in expression container",
    },
    {
      code: `<Component value={foo} />`,
      name: "should allow simple variable",
    },
    {
      code: `<Component icon={<Icon />} />`,
      name: "should allow JSX element",
    },
    {
      code: `<Component icon={<><span>test</span></>} />`,
      name: "should allow JSX fragment",
    },
    {
      code: `<Component value={foo.bar} />`,
      name: "should allow member expression",
    },
    {
      code: `<Component value={foo.bar.baz} />`,
      name: "should allow nested member expression",
    },
    {
      code: `<Component disabled />`,
      name: "should allow boolean shorthand",
    },
    {
      code: `<Component count={42} />`,
      name: "should allow number literal",
    },
    {
      code: `<Component disabled={true} />`,
      name: "should allow boolean literal",
    },
    {
      code: `<Component value={null} />`,
      name: "should allow null literal",
    },
    {
      code: `<Component {...props} />`,
      name: "should allow spread attributes",
    },
    {
      code: `<Component value={undefined} />`,
      name: "should allow undefined identifier",
    },
    {
      code: `<Component callback={() => {}} />`,
      name: "should allow arrow function",
    },
    {
      code: `<Component callback={function() {}} />`,
      name: "should allow function expression",
    },
  ],
  invalid: [
    {
      code: `<Component onClick={handleClick()} />`,
      name: "should disallow function call",
      errors: [{ messageId: "noComplexProp" }],
    },
    {
      code: `<Component data={bar(baz({ aaa, bbb, ccc }), eee)} />`,
      name: "should disallow complex nested function call",
      errors: [{ messageId: "noComplexProp" }],
    },
    {
      code: `<Component style={{}} />`,
      name: "should disallow empty inline object",
      errors: [{ messageId: "noComplexProp" }],
    },
    {
      code: `<Component style={{ color: "red" }} />`,
      name: "should disallow inline object",
      errors: [{ messageId: "noComplexProp" }],
    },
    {
      code: `<Component items={[]} />`,
      name: "should disallow empty inline array",
      errors: [{ messageId: "noComplexProp" }],
    },
    {
      code: `<Component items={[1, 2, 3]} />`,
      name: "should disallow inline array",
      errors: [{ messageId: "noComplexProp" }],
    },
    {
      code: `<Component value={a + b} />`,
      name: "should disallow binary expression",
      errors: [{ messageId: "noComplexProp" }],
    },
    {
      code: `<Component value={!flag} />`,
      name: "should disallow unary expression",
      errors: [{ messageId: "noComplexProp" }],
    },
    {
      code: `<Component value={condition ? a : b} />`,
      name: "should disallow ternary expression",
      errors: [{ messageId: "noComplexProp" }],
    },
    {
      code: `<Component value={a && b} />`,
      name: "should disallow logical expression",
      errors: [{ messageId: "noComplexProp" }],
    },
    {
      code: `<Component value={\`template ${DOLLAR}{name}\`} />`,
      name: "should disallow template literal with expressions",
      errors: [{ messageId: "noComplexProp" }],
    },
    {
      code: `<Component value={new Date()} />`,
      name: "should disallow new expression",
      errors: [{ messageId: "noComplexProp" }],
    },
    {
      code: `<><Foo a={fn()} /><Bar b={{}} /></>`,
      name: "should report multiple violations",
      errors: [{ messageId: "noComplexProp" }, { messageId: "noComplexProp" }],
    },
  ],
});

describe("jsx-simple-props rule structure", () => {
  it("should have correct rule structure", () => {
    expect(jsxSimpleProps).toHaveProperty("meta");
    expect(jsxSimpleProps).toHaveProperty("create");
    expect(typeof jsxSimpleProps.create).toBe("function");
  });
});
