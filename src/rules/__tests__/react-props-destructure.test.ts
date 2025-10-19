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
      `const Component = (props) => {
        const { children } = props;
        return <div>{children}</div>;
      };`,
      `function Component(props) {
        const { children } = props;
        return <div>{children}</div>;
      }`,
      `const Component = function(props) {
        const { children } = props;
        return <div>{children}</div>;
      };`,
      `const regularFunction = ({ data }) => {
        return data.map(item => item.id);
      };`,
      `const helper = ({ value }) => {
        return value * 2;
      };`,
      `const Component = (props, ref) => {
        return <div>{props.children}</div>;
      };`,
      `const Component = () => {
        return <div>Hello</div>;
      };`,
      `const Component = (props) => {
        return <div>{props.children}</div>;
      };`,
      `const Component = (props) => {
        const { show, children } = props;
        return show ? <div>{children}</div> : null;
      };`,
      `const Component = (props) => {
        const { show, children } = props;
        return show && <div>{children}</div>;
      };`,
    ],
    invalid: [
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
