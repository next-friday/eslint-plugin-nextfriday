import { afterAll, describe, it } from "@jest/globals";
import { RuleTester } from "@typescript-eslint/rule-tester";

import rule from "../no-ghost-wrapper";

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

ruleTester.run("no-ghost-wrapper", rule, {
  valid: [
    {
      code: '<div className="container">x</div>',
      name: "div with className",
    },
    {
      code: '<span className="muted">x</span>',
      name: "span with className",
    },
    {
      code: '<div data-testid="root">x</div>',
      name: "div with data-* attribute",
    },
    {
      code: '<div role="button">x</div>',
      name: "div with role",
    },
    {
      code: '<div aria-label="close">x</div>',
      name: "div with aria-* attribute",
    },
    {
      code: "<div ref={ref}>x</div>",
      name: "div with ref",
    },
    {
      code: "<div onClick={handleClick}>x</div>",
      name: "div with event handler",
    },
    {
      code: '<div id="anchor">x</div>',
      name: "div with id",
    },
    {
      code: "<div style={{ color: 'red' }}>x</div>",
      name: "div with inline style",
    },
    {
      code: "<div {...props}>x</div>",
      name: "div with spread attributes",
    },
    {
      code: "<div tabIndex={0}>x</div>",
      name: "div with tabIndex",
    },
    {
      code: "<section>x</section>",
      name: "semantic section element without attributes",
    },
    {
      code: "<article>x</article>",
      name: "semantic article element without attributes",
    },
    {
      code: "<>x</>",
      name: "fragment shorthand is not handled by this rule",
    },
    {
      code: "<MyComponent>x</MyComponent>",
      name: "custom component is not a ghost wrapper",
    },
    {
      code: '<span className="badge" />',
      name: "self-closing span with className",
    },
  ],
  invalid: [
    {
      code: "<div>x</div>",
      errors: [{ messageId: "noGhostWrapper", data: { tag: "div" } }],
      name: "bare div with content",
    },
    {
      code: "<span>text</span>",
      errors: [{ messageId: "noGhostWrapper", data: { tag: "span" } }],
      name: "bare span with text",
    },
    {
      code: "<div></div>",
      errors: [{ messageId: "noGhostWrapper", data: { tag: "div" } }],
      name: "bare empty div",
    },
    {
      code: "<div> </div>",
      errors: [{ messageId: "noGhostWrapper", data: { tag: "div" } }],
      name: "bare div with whitespace",
    },
    {
      code: "<div />",
      errors: [{ messageId: "noGhostWrapper", data: { tag: "div" } }],
      name: "self-closing bare div",
    },
    {
      code: "<span />",
      errors: [{ messageId: "noGhostWrapper", data: { tag: "span" } }],
      name: "self-closing bare span",
    },
    {
      code: "<div key={item.id}>x</div>",
      errors: [{ messageId: "noGhostWrapper", data: { tag: "div" } }],
      name: "div with only key prop is still ghost",
    },
    {
      code: "<span key={i}>x</span>",
      errors: [{ messageId: "noGhostWrapper", data: { tag: "span" } }],
      name: "span with only key prop is still ghost",
    },
    {
      code: "<div>{children}</div>",
      errors: [{ messageId: "noGhostWrapper", data: { tag: "div" } }],
      name: "bare div wrapping children expression",
    },
  ],
});

describe("no-ghost-wrapper rule structure", () => {
  it("should have meta property", () => {
    expect(rule.meta).toBeDefined();
  });

  it("should have create method", () => {
    expect(typeof rule.create).toBe("function");
  });
});
