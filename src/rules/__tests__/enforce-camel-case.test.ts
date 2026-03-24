import { afterAll, describe, it } from "@jest/globals";
import { RuleTester } from "@typescript-eslint/rule-tester";

import enforceCamelCase from "../enforce-camel-case";

RuleTester.afterAll = afterAll;
RuleTester.describe = describe;
RuleTester.it = it;

const ruleTester = new RuleTester({
  languageOptions: { parserOptions: { ecmaFeatures: { jsx: true } } },
});

describe("enforce-camel-case", () => {
  it("should have meta property", () => {
    expect(enforceCamelCase.meta).toBeDefined();
  });

  it("should have create method", () => {
    expect(typeof enforceCamelCase.create).toBe("function");
  });

  ruleTester.run("enforce-camel-case", enforceCamelCase, {
    valid: [
      {
        code: `const totalCount = 10;`,
        name: "should allow camelCase variable",
      },
      {
        code: `const ArticleCard = () => <div />;`,
        name: "should allow PascalCase React component",
      },
      {
        code: `const MyComponent = () => { return <div />; };`,
        name: "should allow PascalCase component with return",
      },
      {
        code: `const WrappedComponent = memo(() => <div />);`,
        name: "should allow PascalCase with memo wrapper",
      },
      {
        code: `const ForwardedComponent = forwardRef(() => <div />);`,
        name: "should allow PascalCase with forwardRef wrapper",
      },
      {
        code: `const LazyComponent = lazy(() => import("./Component"));`,
        name: "should allow PascalCase with lazy wrapper",
      },
      {
        code: `function calculateTotal(price: number) { return price; }`,
        name: "should allow camelCase function declaration",
      },
      {
        code: `const formatDate = (date: string) => date;`,
        name: "should allow camelCase arrow function",
      },
      {
        code: `const MAX_RETRY = 3;`,
        name: "should not flag SCREAMING_SNAKE_CASE (handled by other rules)",
      },
      {
        code: `const default_theme = "dark";`,
        name: "should skip global static snake_case (handled by enforce-constant-case)",
      },
      {
        code: `const status_map = { a: 1 } as const;`,
        name: "should skip global static as const snake_case (handled by enforce-constant-case)",
      },
      {
        code: `const Component = () => { return isActive ? <div /> : <span />; };`,
        name: "should allow component returning conditional JSX",
      },
    ],
    invalid: [
      {
        code: `function foo() { const current_index = 0; }`,
        name: "should reject snake_case variable in local scope",
        errors: [{ messageId: "noSnakeCase", data: { name: "current_index" } }],
      },
      {
        code: `let first_name = "John";`,
        name: "should reject snake_case let variable",
        errors: [{ messageId: "noSnakeCase", data: { name: "first_name" } }],
      },
      {
        code: `function calculate_total() { return 0; }`,
        name: "should reject snake_case function declaration",
        errors: [{ messageId: "noSnakeCase", data: { name: "calculate_total" } }],
      },
      {
        code: `const CalculateTotal = () => 0;`,
        name: "should reject PascalCase for non-component arrow function",
        errors: [{ messageId: "pascalCaseReserved", data: { name: "CalculateTotal" } }],
      },
      {
        code: `const FormatDate = (date: string) => date;`,
        name: "should reject PascalCase for non-JSX arrow function",
        errors: [{ messageId: "pascalCaseReserved", data: { name: "FormatDate" } }],
      },
    ],
  });
});
