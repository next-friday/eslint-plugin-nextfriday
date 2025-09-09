import { RuleTester } from "@typescript-eslint/rule-tester";
import { afterAll, describe, it } from "@jest/globals";

import reactPropsDestructure from "../react-props-destructure";

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

describe("react-props-destructure", () => {
  it("should be defined", () => {
    expect(reactPropsDestructure).toBeDefined();
  });

  ruleTester.run("react-props-destructure", reactPropsDestructure, {
    valid: [
      // Correct usage - props destructured inside component body
      `const Component = (props) => {
        const { children } = props;
        return <div>{children}</div>;
      };`,

      // Correct usage - function declaration
      `function Component(props) {
        const { children } = props;
        return <div>{children}</div>;
      }`,

      // Correct usage - function expression
      `const Component = function(props) {
        const { children } = props;
        return <div>{children}</div>;
      };`,

      // Non-React components should be ignored
      `const regularFunction = ({ data }) => {
        return data.map(item => item.id);
      };`,

      // Functions that don't return JSX should be ignored
      `const helper = ({ value }) => {
        return value * 2;
      };`,

      // Multiple parameters should be ignored
      `const Component = (props, ref) => {
        return <div>{props.children}</div>;
      };`,

      // No parameters should be ignored
      `const Component = () => {
        return <div>Hello</div>;
      };`,

      // Already using props parameter (no destructuring)
      `const Component = (props) => {
        return <div>{props.children}</div>;
      };`,

      // Components with conditional JSX
      `const Component = (props) => {
        const { show, children } = props;
        return show ? <div>{children}</div> : null;
      };`,

      // Components with logical operators
      `const Component = (props) => {
        const { show, children } = props;
        return show && <div>{children}</div>;
      };`,
    ],
    invalid: [
      // Basic arrow function with direct JSX return
      {
        code: `const Component = ({ children }) => (
          <div>{children}</div>
        );`,
        errors: [
          {
            messageId: "noParameterDestructuring",
            line: 1,
            column: 20,
          },
        ],
      },

      // Arrow function with block body
      {
        code: `const Component = ({ children }) => {
          return <div>{children}</div>;
        };`,
        errors: [
          {
            messageId: "noParameterDestructuring",
            line: 1,
            column: 20,
          },
        ],
      },

      // Multiple destructured props
      {
        code: `const Component = ({ title, children, onClick }) => (
          <div onClick={onClick}>
            <h1>{title}</h1>
            {children}
          </div>
        );`,
        errors: [
          {
            messageId: "noParameterDestructuring",
            line: 1,
            column: 20,
          },
        ],
      },

      // Function declaration
      {
        code: `function Component({ children }) {
          return <div>{children}</div>;
        }`,
        errors: [
          {
            messageId: "noParameterDestructuring",
            line: 1,
            column: 20,
          },
        ],
      },

      // Function expression
      {
        code: `const Component = function({ children }) {
          return <div>{children}</div>;
        };`,
        errors: [
          {
            messageId: "noParameterDestructuring",
            line: 1,
            column: 28,
          },
        ],
      },

      // Component with conditional return
      {
        code: `const Component = ({ show, children }) => {
          return show ? <div>{children}</div> : null;
        };`,
        errors: [
          {
            messageId: "noParameterDestructuring",
            line: 1,
            column: 20,
          },
        ],
      },

      // Component with logical operator
      {
        code: `const Component = ({ show, children }) => {
          return show && <div>{children}</div>;
        };`,
        errors: [
          {
            messageId: "noParameterDestructuring",
            line: 1,
            column: 20,
          },
        ],
      },
    ],
  });
});
