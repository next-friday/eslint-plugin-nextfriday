import { RuleTester } from "@typescript-eslint/rule-tester";
import { afterAll, describe, it } from "@jest/globals";

import preferNamedParamTypes from "../prefer-named-param-types";

RuleTester.afterAll = afterAll;
RuleTester.describe = describe;
RuleTester.it = it;

const ruleTester = new RuleTester({
  languageOptions: {
    parserOptions: {
      ecmaVersion: 2020,
      sourceType: "module",
    },
  },
});

describe("prefer-named-param-types", () => {
  it("should be defined", () => {
    expect(preferNamedParamTypes).toBeDefined();
  });

  ruleTester.run("prefer-named-param-types", preferNamedParamTypes, {
    valid: [
      {
        code: `
          interface Params {
            bar: string;
            baz: number;
          }
          const foo = (params: Params) => {
            const { bar, baz } = params;
          };
        `,
      },
      {
        code: `
          type Params = {
            bar: string;
            baz: number;
          };
          const foo = (params: Params) => {
            const { bar, baz } = params;
          };
        `,
      },
      {
        code: `
          interface Params {
            bar: string;
            baz: number;
          }
          function foo(params: Params) {
            const { bar, baz } = params;
          }
        `,
      },
      {
        code: `
          const foo = (value: string) => {
            return value;
          };
        `,
      },
      {
        code: `
          const foo = (count: number, enabled: boolean) => {
            return count > 0 && enabled;
          };
        `,
      },
      {
        code: `
          const foo = () => {
            return "no params";
          };
        `,
      },
      {
        code: `
          type Config = {
            theme: string;
            locale: string;
          };
          const setup = (config: Config) => {
            console.log(config.theme);
          };
        `,
      },
    ],
    invalid: [
      {
        code: `
          const foo = ({ bar, baz }: { bar: string; baz: number }) => {
            console.log(bar, baz);
          };
        `,
        errors: [
          {
            messageId: "preferNamedParamTypes",
          },
        ],
      },
      {
        code: `
          const foo = (params: { bar: string; baz: number }) => {
            const { bar, baz } = params;
          };
        `,
        errors: [
          {
            messageId: "preferNamedParamTypes",
          },
        ],
      },
      {
        code: `
          function foo(params: { bar: string; baz: number }) {
            const { bar, baz } = params;
          }
        `,
        errors: [
          {
            messageId: "preferNamedParamTypes",
          },
        ],
      },
      {
        code: `
          const handler = function(data: { id: number; name: string }) {
            return data.id;
          };
        `,
        errors: [
          {
            messageId: "preferNamedParamTypes",
          },
        ],
      },
      {
        code: `
          const process = ({ value, label }: { value: number; label: string }) => {
            return \`\${label}: \${value}\`;
          };
        `,
        errors: [
          {
            messageId: "preferNamedParamTypes",
          },
        ],
      },
      {
        code: `
          const foo = (options: { enabled: boolean; count: number; items: string[] }) => {
            return options.enabled ? options.items.slice(0, options.count) : [];
          };
        `,
        errors: [
          {
            messageId: "preferNamedParamTypes",
          },
        ],
      },
      {
        code: `
          const createUser = (data: { name: string; email: string; role: 'admin' | 'user' }) => {
            return { ...data, createdAt: Date.now() };
          };
        `,
        errors: [
          {
            messageId: "preferNamedParamTypes",
          },
        ],
      },
      {
        code: `
          const foo = (
            first: { a: string; b: number },
            second: { x: boolean; y: string }
          ) => {
            return { first, second };
          };
        `,
        errors: [
          {
            messageId: "preferNamedParamTypes",
          },
          {
            messageId: "preferNamedParamTypes",
          },
        ],
      },
    ],
  });
});
