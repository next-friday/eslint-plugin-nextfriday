import { RuleTester } from "@typescript-eslint/rule-tester";
import { afterAll, describe, it, expect } from "@jest/globals";

import jsxSortProps from "../jsx-sort-props";

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

ruleTester.run("jsx-sort-props", jsxSortProps, {
  valid: [
    {
      code: `<Component title="hello" count={100} style={{ color: "red" }} onClick={() => {}} icon={<Icon />} disabled />`,
      name: "should allow correctly ordered props (all 6 groups)",
    },
    {
      code: `<Component title="hello" />`,
      name: "should allow single prop",
    },
    {
      code: `<Component title="hello" name="world" />`,
      name: "should allow multiple props of the same type",
    },
    {
      code: `<Component count={42} enabled={true} value={null} />`,
      name: "should allow multiple number/boolean/null props",
    },
    {
      code: `<Component title="hello" value={someVar} count={42} />`,
      name: "should allow unknown types mixed in without affecting order",
    },
    {
      code: `<Component onClick={() => {}} disabled {...props} title="hello" />`,
      name: "should reset ordering after spread attribute",
    },
    {
      code: `<Component {...props} />`,
      name: "should allow spread-only element",
    },
    {
      code: `<Component title="hello" name={\`template\`} />`,
      name: "should treat template literals as strings",
    },
    {
      code: `<Component value={undefined} />`,
      name: "should allow undefined as number/boolean/null group",
    },
    {
      code: `<Component items={[1, 2]} data={{ key: "val" }} />`,
      name: "should allow array before object in same group",
    },
    {
      code: `<Component onClick={() => {}} onChange={function() {}} />`,
      name: "should allow multiple functions in same group",
    },
    {
      code: `<Component icon={<Icon />} extra={<><span /></>} />`,
      name: "should allow JSX element and fragment in same group",
    },
    {
      code: `<Component value={someVar} handler={someHandler} />`,
      name: "should allow all-unknown props (identifiers)",
    },
    {
      code: `<Component title="hello" value={someVar} disabled />`,
      name: "should skip unknown and check remaining order",
    },
    {
      code: `<Component disabled {...overrides} title="hello" count={42} />`,
      name: "should allow shorthand before spread then string after spread",
    },
    {
      code: `<Component title="hello" count={42} items={[1]} onClick={() => {}} icon={<A />} active />`,
      name: "should allow all six groups in order",
    },
  ],
  invalid: [
    {
      code: `<Component disabled title="hello" />`,
      name: "should disallow shorthand before string",
      errors: [{ messageId: "unsortedProps" }],
    },
    {
      code: `<Component onClick={() => {}} count={42} />`,
      name: "should disallow function before number",
      errors: [{ messageId: "unsortedProps" }],
    },
    {
      code: `<Component icon={<Icon />} style={{ color: "red" }} />`,
      name: "should disallow JSX before object",
      errors: [{ messageId: "unsortedProps" }],
    },
    {
      code: `<Component disabled title="hello" count={42} />`,
      name: "should disallow shorthand before string and number",
      errors: [{ messageId: "unsortedProps" }],
    },
    {
      code: `<Component onClick={() => {}} title="hello" />`,
      name: "should disallow function before string",
      errors: [{ messageId: "unsortedProps" }],
    },
    {
      code: `<Component title="hello" {...props} disabled name="world" />`,
      name: "should report error after spread when order is wrong",
      errors: [{ messageId: "unsortedProps" }],
    },
    {
      code: `<Component active onClick={() => {}} />`,
      name: "should disallow shorthand before function",
      errors: [{ messageId: "unsortedProps" }],
    },
    {
      code: `<Component items={[1, 2]} count={42} />`,
      name: "should disallow array before number",
      errors: [{ messageId: "unsortedProps" }],
    },
  ],
});

describe("jsx-sort-props rule structure", () => {
  it("should have correct rule structure", () => {
    expect(jsxSortProps).toHaveProperty("meta");
    expect(jsxSortProps).toHaveProperty("create");
    expect(typeof jsxSortProps.create).toBe("function");
  });
});
