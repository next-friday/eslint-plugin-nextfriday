import { RuleTester } from "@typescript-eslint/rule-tester";
import { afterAll, describe, it } from "@jest/globals";

import enforcePropsSuffix from "../enforce-props-suffix";

RuleTester.afterAll = afterAll;
RuleTester.describe = describe;
RuleTester.it = it;

const ruleTester = new RuleTester();

describe("enforce-props-suffix", () => {
  it("should have meta property", () => {
    expect(enforcePropsSuffix.meta).toBeDefined();
  });

  it("should have create method", () => {
    expect(typeof enforcePropsSuffix.create).toBe("function");
  });

  ruleTester.run("enforce-props-suffix", enforcePropsSuffix, {
    valid: [
      {
        code: `interface ButtonProps {}`,
        filename: "Button.tsx",
        name: "should allow interface with Props suffix",
      },
      {
        code: `interface ButtonStylesProps {}`,
        filename: "Button.tsx",
        name: "should allow interface with StylesProps suffix",
      },
      {
        code: `type CardProps = { title: string }`,
        filename: "Card.tsx",
        name: "should allow type with Props suffix",
      },
      {
        code: `interface HeaderProps { title: string }`,
        filename: "Header.tsx",
        name: "should allow interface with properties",
      },
      {
        code: `interface Button {}`,
        filename: "button.ts",
        name: "should allow any name in non-component files",
      },
      {
        code: `type ButtonType = {}`,
        filename: "types.ts",
        name: "should allow any type name in .ts files",
      },
      {
        code: `type Status = "active" | "inactive"`,
        filename: "Button.tsx",
        name: "should allow union types without Props suffix",
      },
      {
        code: `type ButtonState = SomeOtherType`,
        filename: "Button.tsx",
        name: "should allow type aliases that reference other types",
      },
      {
        code: `type Callback = () => void`,
        filename: "Button.tsx",
        name: "should allow function type aliases",
      },
    ],
    invalid: [
      {
        code: `interface Button {}`,
        filename: "Button.tsx",
        name: "should disallow interface without Props suffix",
        errors: [
          {
            messageId: "missingPropsSuffix",
            data: {
              name: "Button",
              suggestion: "ButtonProps",
            },
          },
        ],
      },
      {
        code: `interface Card { title: string }`,
        filename: "Card.tsx",
        name: "should disallow interface with properties but no Props suffix",
        errors: [
          {
            messageId: "missingPropsSuffix",
            data: {
              name: "Card",
              suggestion: "CardProps",
            },
          },
        ],
      },
      {
        code: `type ButtonType = { disabled: boolean }`,
        filename: "Button.tsx",
        name: "should disallow type literal without Props suffix",
        errors: [
          {
            messageId: "missingPropsSuffix",
            data: {
              name: "ButtonType",
              suggestion: "ButtonTypeProps",
            },
          },
        ],
      },
      {
        code: `interface Header {}`,
        filename: "Header.jsx",
        name: "should apply to JSX files too",
        errors: [
          {
            messageId: "missingPropsSuffix",
            data: {
              name: "Header",
              suggestion: "HeaderProps",
            },
          },
        ],
      },
      {
        code: `
interface Button {}
interface Card {}
      `,
        filename: "Components.tsx",
        name: "should report multiple interfaces",
        errors: [
          {
            messageId: "missingPropsSuffix",
            data: {
              name: "Button",
              suggestion: "ButtonProps",
            },
          },
          {
            messageId: "missingPropsSuffix",
            data: {
              name: "Card",
              suggestion: "CardProps",
            },
          },
        ],
      },
    ],
  });
});
