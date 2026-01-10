import { RuleTester } from "@typescript-eslint/rule-tester";
import { afterAll, describe, it } from "@jest/globals";

import preferJSXTemplateLiterals from "../prefer-jsx-template-literals";

RuleTester.afterAll = afterAll;
RuleTester.it = it;
RuleTester.itOnly = it.only;
RuleTester.describe = describe;

const ruleTester = new RuleTester({
  languageOptions: {
    parserOptions: {
      ecmaVersion: 2020,
      sourceType: "module",
      ecmaFeatures: {
        jsx: true,
      },
    },
  },
});

describe("prefer-jsx-template-literals", () => {
  it("should be defined", () => {
    expect(preferJSXTemplateLiterals).toBeDefined();
  });

  ruleTester.run("prefer-jsx-template-literals", preferJSXTemplateLiterals, {
    valid: [
      {
        code: "<div>{`+ ${fooVariable}`}</div>",
        name: "template literal with spacing",
      },
      {
        code: "<div>{`+${fooVariable}`}</div>",
        name: "template literal without spacing",
      },
      {
        code: "<div>{fooVariable}</div>",
        name: "single expression only",
      },
      {
        code: "<div>Some text here</div>",
        name: "text only",
      },
      {
        code: "<div>  {fooVariable}  </div>",
        name: "expression with whitespace only around it",
      },
      {
        code: "<div>{`Hello ${name}, welcome!`}</div>",
        name: "template literal with text before and after",
      },
      {
        code: "<div>\n  {fooVariable}\n</div>",
        name: "expression with newlines",
      },
    ],
    invalid: [
      {
        code: "<div>+ {fooVariable}</div>",
        errors: [
          {
            messageId: "preferTemplate",
          },
        ],
        output: "<div>{`+${fooVariable}`}</div>",
      },
      {
        code: "<div>+{fooVariable}</div>",
        errors: [
          {
            messageId: "preferTemplate",
          },
        ],
        output: "<div>{`+${fooVariable}`}</div>",
      },
      {
        code: "<div>Price: {price}</div>",
        errors: [
          {
            messageId: "preferTemplate",
          },
        ],
        output: "<div>{`Price:${price}`}</div>",
      },
      {
        code: "<div>{count} items</div>",
        errors: [
          {
            messageId: "preferTemplate",
          },
        ],
        output: "<div>{`${count}items`}</div>",
      },
      {
        code: "<div>$ {amount}</div>",
        errors: [
          {
            messageId: "preferTemplate",
          },
        ],
        output: "<div>{`$${amount}`}</div>",
      },
      {
        code: "<span>Total: {total}</span>",
        errors: [
          {
            messageId: "preferTemplate",
          },
        ],
        output: "<span>{`Total:${total}`}</span>",
      },
      {
        code: "<p>Hello {name}</p>",
        errors: [
          {
            messageId: "preferTemplate",
          },
        ],
        output: "<p>{`Hello${name}`}</p>",
      },
    ],
  });
});
