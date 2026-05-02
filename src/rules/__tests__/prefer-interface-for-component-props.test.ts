import { afterAll, describe, it } from "@jest/globals";
import { RuleTester } from "@typescript-eslint/rule-tester";

import preferInterfaceForComponentProps from "../prefer-interface-for-component-props";

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

describe("prefer-interface-for-component-props", () => {
  it("should have meta property", () => {
    expect(preferInterfaceForComponentProps.meta).toBeDefined();
  });

  it("should have create method", () => {
    expect(typeof preferInterfaceForComponentProps.create).toBe("function");
  });

  ruleTester.run("prefer-interface-for-component-props", preferInterfaceForComponentProps, {
    valid: [
      {
        filename: "Comp.tsx",
        code: "interface FooProps { x: number }",
      },
      {
        filename: "Comp.tsx",
        code: "type FooProps = OtherProps & { x: number };",
      },
      {
        filename: "Comp.tsx",
        code: "type Theme = { dark: boolean };",
      },
      {
        filename: "Comp.tsx",
        code: "type Variant = 'a' | 'b';",
      },
      {
        filename: "Comp.tsx",
        code: "type FooProps = ReactNode;",
      },
      {
        filename: "Comp.ts",
        code: "type FooProps = { x: number };",
      },
      {
        filename: "utils.ts",
        code: "type ButtonProps = { label: string };",
      },
    ],
    invalid: [
      {
        filename: "Comp.tsx",
        code: "type FooProps = { x: number };",
        errors: [{ messageId: "preferInterface" }],
        output: "interface FooProps { x: number }",
      },
      {
        filename: "StorePopover.tsx",
        code: "type Props = { trigger: ReactNode };",
        errors: [{ messageId: "preferInterface" }],
        output: "interface Props { trigger: ReactNode }",
      },
      {
        filename: "Comp.tsx",
        code: "export type FooProps = { x: number };",
        errors: [{ messageId: "preferInterface" }],
        output: "export interface FooProps { x: number }",
      },
      {
        filename: "Comp.tsx",
        code: "type FooProps<T> = { value: T };",
        errors: [{ messageId: "preferInterface" }],
        output: "interface FooProps<T> { value: T }",
      },
      {
        filename: "Comp.tsx",
        code: "type FooProps = { x: number; y: string };",
        errors: [{ messageId: "preferInterface" }],
        output: "interface FooProps { x: number; y: string }",
      },
    ],
  });
});
