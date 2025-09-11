import { RuleTester } from "@typescript-eslint/rule-tester";
import { afterAll, describe, it } from "@jest/globals";

import preferDestructuringParams from "../prefer-destructuring-params";

RuleTester.afterAll = afterAll;
RuleTester.it = it;
RuleTester.itOnly = it.only;
RuleTester.describe = describe;

const ruleTester = new RuleTester();

ruleTester.run("prefer-destructuring-params", preferDestructuringParams, {
  valid: [
    {
      code: `function foo() {}`,
      name: "should allow functions with no parameters",
    },
    {
      code: `function foo(oneParam) {}`,
      name: "should allow functions with one parameter",
    },
    {
      code: `function foo({oneParam, twoParam}) {}`,
      name: "should allow functions with destructured parameters",
    },
    {
      code: `const foo = (oneParam) => {}`,
      name: "should allow arrow functions with one parameter",
    },
    {
      code: `const foo = ({oneParam, twoParam}) => {}`,
      name: "should allow arrow functions with destructured parameters",
    },
    {
      code: `const obj = { foo(oneParam) {} }`,
      name: "should allow methods with one parameter",
    },
    {
      code: `const obj = { foo({oneParam, twoParam}) {} }`,
      name: "should allow methods with destructured parameters",
    },
    {
      code: `class MyClass { foo(oneParam) {} }`,
      name: "should allow class methods with one parameter",
    },
    {
      code: `class MyClass { foo({oneParam, twoParam}) {} }`,
      name: "should allow class methods with destructured parameters",
    },
    {
      code: `function foo({oneParam}, ...rest) {}`,
      name: "should allow destructuring with rest parameters",
    },
    {
      code: `const foo = ({a, b}, {c, d}) => {}`,
      name: "should allow multiple destructured parameters",
    },
    {
      code: `function foo({a: {nested}}, {b}) {}`,
      name: "should allow nested destructuring",
    },
    {
      code: `function _internalFunction(param1, param2) {}`,
      name: "should skip functions starting with underscore",
    },
    {
      code: `function $libraryFunction(param1, param2) {}`,
      name: "should skip functions containing dollar sign",
    },
    {
      code: `function Component(props, context) {}`,
      name: "should skip constructor-like functions",
    },
    {
      code: `words.forEach((word, wordIndex) => {})`,
      name: "should allow forEach callbacks with multiple parameters",
    },
    {
      code: `items.map((item, index) => {})`,
      name: "should allow map callbacks with multiple parameters",
    },
    {
      code: `items.filter((item, index) => {})`,
      name: "should allow filter callbacks with multiple parameters",
    },
    {
      code: `items.reduce((acc, curr, index) => {})`,
      name: "should allow reduce callbacks with multiple parameters",
    },
    {
      code: `items.find((item, index) => {})`,
      name: "should allow find callbacks with multiple parameters",
    },
    {
      code: `items.findIndex((item, index) => {})`,
      name: "should allow findIndex callbacks with multiple parameters",
    },
    {
      code: `items.some((item, index) => {})`,
      name: "should allow some callbacks with multiple parameters",
    },
    {
      code: `items.every((item, index) => {})`,
      name: "should allow every callbacks with multiple parameters",
    },
    {
      code: `items.forEach(function(item, index) {})`,
      name: "should allow forEach function expressions with multiple parameters",
    },
    {
      code: `promise.then((result, error) => {})`,
      name: "should allow Promise then callbacks with multiple parameters",
    },
    {
      code: `element.addEventListener('click', (event, data) => {})`,
      name: "should allow event listener callbacks with multiple parameters",
    },
    {
      code: `setTimeout((arg1, arg2) => {}, 1000)`,
      name: "should allow setTimeout callbacks with multiple parameters",
    },
    {
      code: `customFunction((param1, param2) => {})`,
      name: "should allow any callback function with multiple parameters",
    },
    {
      code: `obj.method((a, b) => {})`,
      name: "should allow method callbacks with multiple parameters",
    },
  ],
  invalid: [
    {
      code: `function foo(oneParam, twoParam) {}`,
      name: "should disallow functions with multiple non-destructured parameters",
      errors: [
        {
          messageId: "preferDestructuring",
        },
      ],
    },
    {
      code: `const foo = (oneParam, twoParam) => {}`,
      name: "should disallow arrow functions with multiple non-destructured parameters",
      errors: [
        {
          messageId: "preferDestructuring",
        },
      ],
    },
    {
      code: `function foo(oneParam, twoParam, threeParam) {}`,
      name: "should disallow functions with three non-destructured parameters",
      errors: [
        {
          messageId: "preferDestructuring",
        },
      ],
    },
    {
      code: `const obj = { foo(oneParam, twoParam) {} }`,
      name: "should disallow methods with multiple non-destructured parameters",
      errors: [
        {
          messageId: "preferDestructuring",
        },
      ],
    },
    {
      code: `class MyClass { foo(oneParam, twoParam) {} }`,
      name: "should disallow class methods with multiple non-destructured parameters",
      errors: [
        {
          messageId: "preferDestructuring",
        },
      ],
    },
    {
      code: `const obj = { foo: (oneParam, twoParam) => {} }`,
      name: "should disallow object property arrow functions with multiple parameters",
      errors: [
        {
          messageId: "preferDestructuring",
        },
      ],
    },
    {
      code: `const obj = { foo: function(oneParam, twoParam) {} }`,
      name: "should disallow object property functions with multiple parameters",
      errors: [
        {
          messageId: "preferDestructuring",
        },
      ],
    },
    {
      code: `function foo({oneParam}, twoParam) {}`,
      name: "should disallow mixed destructured and non-destructured parameters",
      errors: [
        {
          messageId: "preferDestructuring",
        },
      ],
    },
    {
      code: `function foo(oneParam, {twoParam}) {}`,
      name: "should disallow mixed non-destructured and destructured parameters",
      errors: [
        {
          messageId: "preferDestructuring",
        },
      ],
    },
  ],
});

describe("prefer-destructuring-params rule structure", () => {
  it("should have correct rule structure", () => {
    expect(preferDestructuringParams).toHaveProperty("meta");
    expect(preferDestructuringParams).toHaveProperty("create");
    expect(typeof preferDestructuringParams.create).toBe("function");
  });
});
