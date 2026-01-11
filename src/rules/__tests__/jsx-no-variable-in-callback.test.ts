import { RuleTester } from "@typescript-eslint/rule-tester";
import { afterAll, describe, it } from "@jest/globals";

import jsxNoVariableInCallback from "../jsx-no-variable-in-callback";

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

describe("jsx-no-variable-in-callback", () => {
  it("should be defined", () => {
    expect(jsxNoVariableInCallback).toBeDefined();
  });

  ruleTester.run("jsx-no-variable-in-callback", jsxNoVariableInCallback, {
    valid: [
      {
        code: `
        const Component = () => {
          const renderItems = () => items.map((item) => {
            const label = item.name.toUpperCase();
            return <div key={item.id}>{label}</div>;
          });

          return <div>{renderItems()}</div>;
        };
        `,
        filename: "Component.tsx",
        name: "extracted callback function",
      },
      {
        code: `
        const Component = () => {
          return (
            <div>
              {items.map((item) => <div key={item.id}>{item.name}</div>)}
            </div>
          );
        };
        `,
        filename: "Component.tsx",
        name: "simple callback without variable declaration",
      },
      {
        code: `
        const Component = () => {
          const prefix = "Item: ";
          return (
            <div>
              {items.map((item) => <div key={item.id}>{prefix}{item.name}</div>)}
            </div>
          );
        };
        `,
        filename: "Component.tsx",
        name: "variable declared outside JSX",
      },
      {
        code: `
        const Component = () => {
          return (
            <div>
              {items.map((item) => <div key={item.id}>{item.name}</div>)}
            </div>
          );
        };
        `,
        filename: "Component.tsx",
        name: "expression body arrow function",
      },
      {
        code: `
        const data = items.map((item) => {
          const value = item.price * 2;
          return value;
        });
        `,
        name: "no JSX context",
      },
      {
        code: `
        const Component = () => {
          const getLabel = (item) => {
            const formatted = item.name.toUpperCase();
            return formatted;
          };

          return <div>{items.map((item) => <div key={item.id}>{getLabel(item)}</div>)}</div>;
        };
        `,
        filename: "Component.tsx",
        name: "helper function outside JSX",
      },
    ],
    invalid: [
      {
        code: `
        const Component = () => {
          return (
            <div>
              {items.map((item) => {
                const label = item.name.toUpperCase();
                return <div key={item.id}>{label}</div>;
              })}
            </div>
          );
        };
        `,
        filename: "Component.tsx",
        errors: [
          {
            messageId: "noVariableInCallback",
          },
        ],
        name: "variable in map callback",
      },
      {
        code: `
        const Component = () => {
          return (
            <div>
              {items.filter((item) => {
                const isValid = item.active && item.visible;
                return isValid;
              })}
            </div>
          );
        };
        `,
        filename: "Component.tsx",
        errors: [
          {
            messageId: "noVariableInCallback",
          },
        ],
        name: "variable in filter callback",
      },
      {
        code: `
        const Component = () => {
          return (
            <div>
              {items.map((item) => {
                const label = item.name;
                const value = item.price;
                return <div key={item.id}>{label}: {value}</div>;
              })}
            </div>
          );
        };
        `,
        filename: "Component.tsx",
        errors: [
          {
            messageId: "noVariableInCallback",
          },
          {
            messageId: "noVariableInCallback",
          },
        ],
        name: "multiple variables in callback",
      },
      {
        code: `
        const Component = () => {
          return (
            <ul>
              {categories.map((category) => {
                const displayName = category.title.toUpperCase();
                return <li key={category.id}>{displayName}</li>;
              })}
            </ul>
          );
        };
        `,
        filename: "Component.tsx",
        errors: [
          {
            messageId: "noVariableInCallback",
          },
        ],
        name: "variable in list rendering",
      },
      {
        code: `
        const Component = () => {
          return (
            <div>
              {data.map(function(item) {
                const result = item.value * 2;
                return <span key={item.id}>{result}</span>;
              })}
            </div>
          );
        };
        `,
        filename: "Component.tsx",
        errors: [
          {
            messageId: "noVariableInCallback",
          },
        ],
        name: "function expression in JSX",
      },
      {
        code: `
        const Component = () => {
          return (
            <>
              {items.map((item) => {
                const formatted = item.name.toLowerCase();
                return <div key={item.id}>{formatted}</div>;
              })}
            </>
          );
        };
        `,
        filename: "Component.tsx",
        errors: [
          {
            messageId: "noVariableInCallback",
          },
        ],
        name: "variable in fragment",
      },
    ],
  });
});
