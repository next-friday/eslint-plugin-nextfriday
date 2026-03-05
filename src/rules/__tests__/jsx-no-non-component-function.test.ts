import { RuleTester } from "@typescript-eslint/rule-tester";
import { afterAll, describe, it } from "@jest/globals";

import jsxNoNonComponentFunction from "../jsx-no-non-component-function";

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

describe("jsx-no-non-component-function", () => {
  it("should have meta property", () => {
    expect(jsxNoNonComponentFunction.meta).toBeDefined();
  });

  it("should have create method", () => {
    expect(typeof jsxNoNonComponentFunction.create).toBe("function");
  });

  ruleTester.run("jsx-no-non-component-function", jsxNoNonComponentFunction, {
    valid: [
      {
        code: `
        const Component = () => {
          const helper = (name: string) => {
            return name.toUpperCase();
          };
          return <div>{helper("test")}</div>;
        };
        `,
        filename: "Component.tsx",
        name: "helper function inside component",
      },
      {
        code: `
        import { helper } from "./helper";

        const Component = () => {
          return <div>{helper("test")}</div>;
        };
        `,
        filename: "Component.tsx",
        name: "imported helper function",
      },
      {
        code: `
        const Component = () => {
          return <div>Hello</div>;
        };
        `,
        filename: "Component.tsx",
        name: "component only",
      },
      {
        code: `
        const helper = (name: string) => {
          return name.toUpperCase();
        };
        `,
        filename: "helper.ts",
        name: "helper in .ts file is allowed",
      },
      {
        code: `
        const helper = (name: string) => {
          return name.toUpperCase();
        };
        `,
        filename: "utils.js",
        name: "helper in .js file is allowed",
      },
      {
        code: `
        export const Component = () => {
          return <div>Hello</div>;
        };
        `,
        filename: "Component.tsx",
        name: "exported component",
      },
      {
        code: `
        const MyComponent = () => <div>Hello</div>;
        `,
        filename: "Component.tsx",
        name: "component with PascalCase name",
      },
      {
        code: `
        function Component() {
          return <div>Hello</div>;
        }
        `,
        filename: "Component.tsx",
        name: "function declaration component",
      },
      {
        code: `
        export function Component() {
          return <div>Hello</div>;
        }
        `,
        filename: "Component.tsx",
        name: "exported function declaration component",
      },
    ],
    invalid: [
      {
        code: `
        const helper = (name: string) => {
          const words = name.trim().split(/\\s+/);
          if (words.length === 1) {
            return words[0].charAt(0).toUpperCase();
          }
          return words
            .slice(0, 2)
            .map((word) => word.charAt(0).toUpperCase())
            .join("");
        };

        const Component = () => {
          return <div>{helper("test")}</div>;
        };
        `,
        filename: "Component.tsx",
        errors: [
          {
            messageId: "noTopLevelFunction",
          },
        ],
        name: "helper function outside component",
      },
      {
        code: `
        const formatName = (name: string) => name.toUpperCase();

        const Component = () => {
          return <div>{formatName("test")}</div>;
        };
        `,
        filename: "Component.tsx",
        errors: [
          {
            messageId: "noTopLevelFunction",
          },
        ],
        name: "arrow function helper outside component",
      },
      {
        code: `
        function helper(name: string) {
          return name.toUpperCase();
        }

        const Component = () => {
          return <div>{helper("test")}</div>;
        };
        `,
        filename: "Component.tsx",
        errors: [
          {
            messageId: "noTopLevelFunction",
          },
        ],
        name: "function declaration helper outside component",
      },
      {
        code: `
        const calculateTotal = (items: number[]) => {
          return items.reduce((sum, item) => sum + item, 0);
        };

        export const OrderSummary = () => {
          return <div>Total</div>;
        };
        `,
        filename: "OrderSummary.tsx",
        errors: [
          {
            messageId: "noTopLevelFunction",
          },
        ],
        name: "helper before exported component",
      },
      {
        code: `
        const processData = (data: string) => data.trim();

        const AnotherComponent = () => <div>Test</div>;
        `,
        filename: "test.jsx",
        errors: [
          {
            messageId: "noTopLevelFunction",
          },
        ],
        name: "helper in .jsx file",
      },
    ],
  });
});
