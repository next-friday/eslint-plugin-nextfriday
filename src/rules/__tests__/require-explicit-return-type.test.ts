import { RuleTester } from "@typescript-eslint/rule-tester";
import { afterAll, describe, it, expect } from "@jest/globals";
import parser from "@typescript-eslint/parser";

import requireExplicitReturnType from "../require-explicit-return-type";

RuleTester.afterAll = afterAll;
RuleTester.it = it;
RuleTester.itOnly = it.only;
RuleTester.describe = describe;

const ruleTester = new RuleTester({
  languageOptions: {
    parser,
    parserOptions: {
      ecmaVersion: 2020,
      sourceType: "module",
      ecmaFeatures: {
        jsx: true,
      },
    },
  },
});

describe("require-explicit-return-type", () => {
  it("should be defined", () => {
    expect(requireExplicitReturnType).toBeDefined();
  });

  ruleTester.run("require-explicit-return-type", requireExplicitReturnType, {
    valid: [
      {
        code: "function getName(): string { return 'John'; }",
        name: "should allow function declaration with return type",
      },
      {
        code: "const getAge = (): number => { return 25; };",
        name: "should allow arrow function with return type",
      },
      {
        code: "const greet = (): void => { console.log('Hello'); };",
        name: "should allow void return type",
      },
      {
        code: "function processUser(): void { console.log('Processing'); }",
        name: "should allow function declaration with void",
      },
      {
        code: "const calculate = (a: number, b: number): number => a + b;",
        name: "should allow arrow function expression with return type",
      },
      {
        code: "async function fetchData(): Promise<Data> { return await api.get(); }",
        name: "should allow async function with Promise return type",
      },
      {
        code: "const fetchUser = async (): Promise<User> => { return await api.getUser(); };",
        name: "should allow async arrow function with Promise return type",
      },
      {
        code: "function getData<T>(): T[] { return []; }",
        name: "should allow generic function with return type",
      },
      {
        code: "const fn = function process(): string { return 'done'; };",
        name: "should allow function expression with return type",
      },
      {
        code: "items.map(item => item.name);",
        name: "should allow callback in map without return type",
      },
      {
        code: "items.filter(item => item.active);",
        name: "should allow callback in filter without return type",
      },
      {
        code: "items.forEach(item => console.log(item));",
        name: "should allow callback in forEach without return type",
      },
      {
        code: "items.reduce((acc, item) => acc + item.value, 0);",
        name: "should allow callback in reduce without return type",
      },
      {
        code: "setTimeout(() => console.log('done'), 1000);",
        name: "should allow callback in setTimeout without return type",
      },
      {
        code: "promise.then(result => result.data);",
        name: "should allow callback in promise chain without return type",
      },
      {
        code: "const handler = { onClick: () => console.log('clicked') };",
        name: "should allow arrow function in object property without return type",
      },
      {
        code: "const callbacks = [() => 1, () => 2];",
        name: "should allow arrow functions in array without return type",
      },
      {
        code: "const MyComponent = () => <div>Hello</div>;",
        name: "should allow React component without return type (PascalCase)",
      },
      {
        code: "function UserProfile() { return <div>User</div>; }",
        name: "should allow React function component without return type",
      },
      {
        code: "const Button = () => { return <button>Click</button>; };",
        name: "should allow React component arrow function without return type",
      },
      {
        code: "export function Layout() { return <div>Layout</div>; }",
        name: "should allow exported React component without return type",
      },
    ],
    invalid: [
      {
        code: "function getName() { return 'John'; }",
        name: "should reject function declaration without return type",
        errors: [{ messageId: "missingReturnType", data: { name: "getName" } }],
      },
      {
        code: "const getAge = () => { return 25; };",
        name: "should reject arrow function without return type",
        errors: [{ messageId: "missingReturnType", data: { name: "getAge" } }],
      },
      {
        code: "const greet = () => { console.log('Hello'); };",
        name: "should reject void arrow function without return type",
        errors: [{ messageId: "missingReturnType", data: { name: "greet" } }],
      },
      {
        code: "function processUser() { console.log('Processing'); }",
        name: "should reject function declaration without void return type",
        errors: [{ messageId: "missingReturnType", data: { name: "processUser" } }],
      },
      {
        code: "const calculate = (a: number, b: number) => a + b;",
        name: "should reject arrow function expression without return type",
        errors: [{ messageId: "missingReturnType", data: { name: "calculate" } }],
      },
      {
        code: "async function fetchData() { return await api.get(); }",
        name: "should reject async function without return type",
        errors: [{ messageId: "missingReturnType", data: { name: "fetchData" } }],
      },
      {
        code: "const fetchUser = async () => { return await api.getUser(); };",
        name: "should reject async arrow function without return type",
        errors: [{ messageId: "missingReturnType", data: { name: "fetchUser" } }],
      },
      {
        code: "export function getData() { return []; }",
        name: "should reject exported function without return type",
        errors: [{ messageId: "missingReturnType", data: { name: "getData" } }],
      },
      {
        code: "export const processItems = () => { return items.map(i => i.id); };",
        name: "should reject exported arrow function without return type",
        errors: [{ messageId: "missingReturnType", data: { name: "processItems" } }],
      },
      {
        code: "const fn = function process() { return 'done'; };",
        name: "should reject function expression without return type",
        errors: [{ messageId: "missingReturnType", data: { name: "process" } }],
      },
      {
        code: "function add(a: number, b: number) { return a + b; }",
        name: "should reject math function without return type",
        errors: [{ messageId: "missingReturnType", data: { name: "add" } }],
      },
      {
        code: "const multiply = (x: number, y: number) => x * y;",
        name: "should reject math arrow function without return type",
        errors: [{ messageId: "missingReturnType", data: { name: "multiply" } }],
      },
      {
        code: "function validateEmail(email: string) { return email.includes('@'); }",
        name: "should reject validation function without return type",
        errors: [{ messageId: "missingReturnType", data: { name: "validateEmail" } }],
      },
      {
        code: "const formatDate = (date: Date) => date.toISOString();",
        name: "should reject utility function without return type",
        errors: [{ messageId: "missingReturnType", data: { name: "formatDate" } }],
      },
    ],
  });
});
