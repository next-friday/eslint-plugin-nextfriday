import { RuleTester } from "@typescript-eslint/rule-tester";
import { afterAll, describe, it, expect } from "@jest/globals";
import parser from "@typescript-eslint/parser";

import preferFunctionDeclaration from "../prefer-function-declaration";

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
    },
  },
});

describe("prefer-function-declaration", () => {
  it("should be defined", () => {
    expect(preferFunctionDeclaration).toBeDefined();
  });

  ruleTester.run("prefer-function-declaration", preferFunctionDeclaration, {
    valid: [
      {
        code: "function formatDate(date: Date) { return date.toISOString(); }",
        filename: "utils/date.ts",
        name: "should allow function declaration in .ts file",
      },
      {
        code: "export function formatThaiDate(date: Date) { return date.toLocaleDateString('th-TH'); }",
        filename: "utils/date.ts",
        name: "should allow exported function declaration",
      },
      {
        code: "export default function formatDate(date: Date) { return date.toISOString(); }",
        filename: "utils/date.ts",
        name: "should allow default exported function declaration",
      },
      {
        code: "const years = dates.map(d => d.getFullYear());",
        filename: "utils/date.ts",
        name: "should allow arrow function as callback in map",
      },
      {
        code: "const filtered = items.filter(item => item.active);",
        filename: "utils/filter.ts",
        name: "should allow arrow function as callback in filter",
      },
      {
        code: "const sorted = items.sort((a, b) => a.name.localeCompare(b.name));",
        filename: "utils/sort.ts",
        name: "should allow arrow function as callback in sort",
      },
      {
        code: "items.forEach(item => console.log(item));",
        filename: "utils/log.ts",
        name: "should allow arrow function as callback in forEach",
      },
      {
        code: "const result = items.reduce((acc, item) => acc + item.value, 0);",
        filename: "utils/reduce.ts",
        name: "should allow arrow function as callback in reduce",
      },
      {
        code: "const found = items.find(item => item.id === targetId);",
        filename: "utils/find.ts",
        name: "should allow arrow function as callback in find",
      },
      {
        code: "const exists = items.some(item => item.active);",
        filename: "utils/check.ts",
        name: "should allow arrow function as callback in some",
      },
      {
        code: "const allActive = items.every(item => item.active);",
        filename: "utils/check.ts",
        name: "should allow arrow function as callback in every",
      },
      {
        code: "setTimeout(() => console.log('done'), 1000);",
        filename: "utils/timer.ts",
        name: "should allow arrow function as callback in setTimeout",
      },
      {
        code: "promise.then(result => result.data).catch(err => console.error(err));",
        filename: "utils/api.ts",
        name: "should allow arrow function as callback in promise chain",
      },
      {
        code: "const handler = { onClick: () => console.log('clicked') };",
        filename: "utils/handlers.ts",
        name: "should allow arrow function in object property",
      },
      {
        code: "const callbacks = [() => 1, () => 2, () => 3];",
        filename: "utils/callbacks.ts",
        name: "should allow arrow function in array",
      },
      {
        code: "function getHandler() { return () => console.log('handled'); }",
        filename: "utils/factory.ts",
        name: "should allow arrow function returned from function",
      },
      {
        code: "const getter = condition ? () => valueA : () => valueB;",
        filename: "utils/conditional.ts",
        name: "should allow arrow function in conditional expression",
      },
      {
        code: "const fn = defaultFn || (() => fallback);",
        filename: "utils/fallback.ts",
        name: "should allow arrow function in logical expression",
      },
      {
        code: "const formatDate = (date: Date) => date.toISOString();",
        filename: "components/DatePicker.tsx",
        name: "should allow arrow function in .tsx file",
      },
      {
        code: "const Component = () => <div>Hello</div>;",
        filename: "components/Hello.tsx",
        name: "should allow arrow function component in .tsx file",
      },
      {
        code: "const formatDate = (date: Date) => date.toISOString();",
        filename: "utils/date.js",
        name: "should allow arrow function in .js file",
      },
      {
        code: "declare const fn: () => void;",
        filename: "types/index.d.ts",
        name: "should allow in .d.ts declaration file",
      },
      {
        code: "new Promise((resolve, reject) => resolve(42));",
        filename: "utils/promise.ts",
        name: "should allow arrow function as callback in new expression",
      },
      {
        code: "async function fetchData() { return await api.get(); }",
        filename: "services/api.ts",
        name: "should allow async function declaration",
      },
    ],
    invalid: [
      {
        code: "const formatDate = (date: Date) => date.toISOString();",
        filename: "utils/date.ts",
        name: "should reject arrow function assigned to const in .ts file",
        errors: [{ messageId: "preferDeclaration", data: { name: "formatDate" } }],
      },
      {
        code: "const formatThaiDate = (date: Date) => { return date.toLocaleDateString('th-TH'); };",
        filename: "utils/date.ts",
        name: "should reject arrow function with block body",
        errors: [{ messageId: "preferDeclaration", data: { name: "formatThaiDate" } }],
      },
      {
        code: "export const formatDate = (date: Date) => date.toISOString();",
        filename: "utils/date.ts",
        name: "should reject exported arrow function",
        errors: [{ messageId: "preferDeclaration", data: { name: "formatDate" } }],
      },
      {
        code: "const add = (a: number, b: number) => a + b;",
        filename: "utils/math.ts",
        name: "should reject arrow function in math utility",
        errors: [{ messageId: "preferDeclaration", data: { name: "add" } }],
      },
      {
        code: "const calculateTotal = (items: Item[]) => items.reduce((sum, i) => sum + i.price, 0);",
        filename: "utils/cart.ts",
        name: "should reject outer arrow function but allow inner callback",
        errors: [{ messageId: "preferDeclaration", data: { name: "calculateTotal" } }],
      },
      {
        code: "const greet = function(name: string) { return 'Hello ' + name; };",
        filename: "utils/greeting.ts",
        name: "should reject function expression assigned to const",
        errors: [{ messageId: "preferDeclarationExpr", data: { name: "greet" } }],
      },
      {
        code: "const fetchUser = async (id: string) => { return await api.get('/users/' + id); };",
        filename: "services/user.ts",
        name: "should reject async arrow function",
        errors: [{ messageId: "preferDeclaration", data: { name: "fetchUser" } }],
      },
      {
        code: "let processData = (data: Data) => transform(data);",
        filename: "utils/process.ts",
        name: "should reject arrow function assigned to let",
        errors: [{ messageId: "preferDeclaration", data: { name: "processData" } }],
      },
      {
        code: "const helper = <T>(value: T) => value;",
        filename: "utils/generic.ts",
        name: "should reject generic arrow function",
        errors: [{ messageId: "preferDeclaration", data: { name: "helper" } }],
      },
      {
        code: "const validateEmail = (email: string): boolean => /^[^@]+@[^@]+$/.test(email);",
        filename: "utils/validation.ts",
        name: "should reject arrow function with return type",
        errors: [{ messageId: "preferDeclaration", data: { name: "validateEmail" } }],
      },
    ],
  });
});
