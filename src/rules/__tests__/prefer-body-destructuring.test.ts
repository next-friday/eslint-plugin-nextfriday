import { afterAll, describe, it } from "@jest/globals";
import { RuleTester } from "@typescript-eslint/rule-tester";

import rule from "../prefer-body-destructuring";

RuleTester.afterAll = afterAll;
RuleTester.describe = describe;
RuleTester.it = it;

const ruleTester = new RuleTester();

ruleTester.run("prefer-body-destructuring", rule, {
  valid: [
    {
      code: `const C = (props) => props.children;`,
      name: "single identifier parameter is allowed",
    },
    {
      code: `function C(props) { return props.children; }`,
      name: "function declaration with identifier parameter",
    },
    {
      code: `const add = (a, b) => a + b;`,
      name: "multiple parameters are out of scope",
    },
    {
      code: `items.map(({ id }) => id);`,
      name: "inline callback is excluded",
    },
    {
      code: `const C = () => null;`,
      name: "no parameters",
    },
    {
      code: `const C = ([a, b]) => a + b;`,
      name: "array pattern parameter is out of scope",
    },
  ],
  invalid: [
    {
      code: `const C = ({ children }) => children;`,
      errors: [{ messageId: "preferBodyDestructuring" }],
      name: "arrow with single object pattern parameter",
    },
    {
      code: `function C({ a, b }) { return a + b; }`,
      errors: [{ messageId: "preferBodyDestructuring" }],
      name: "function declaration with single object pattern parameter",
    },
    {
      code: `const C = ({ children, className }) => className;`,
      errors: [{ messageId: "preferBodyDestructuring" }],
      name: "object pattern with multiple keys",
    },
  ],
});
