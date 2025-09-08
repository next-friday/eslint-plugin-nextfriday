import { RuleTester } from "@typescript-eslint/rule-tester";
import { afterAll, describe, it } from "@jest/globals";

import jsxPascalCase from "../jsx-pascal-case";

RuleTester.afterAll = afterAll;
RuleTester.it = it;
RuleTester.itOnly = it.only;
RuleTester.describe = describe;

const ruleTester = new RuleTester();

ruleTester.run("jsx-pascal-case", jsxPascalCase, {
  valid: [
    {
      code: `const Component = () => <div>Hello</div>;`,
      filename: "MyComponent.jsx",
      name: "should allow PascalCase .jsx files",
    },
    {
      code: `export default function Component() { return <div>Hello</div>; }`,
      filename: "UserProfile.tsx",
      name: "should allow PascalCase .tsx files",
    },
    {
      code: `const App = () => <div>App</div>;`,
      filename: "App.jsx",
      name: "should allow single word PascalCase",
    },
    {
      code: `export const Header = () => <header>Header</header>;`,
      filename: "Header.tsx",
      name: "should allow single word PascalCase tsx",
    },
    {
      code: `const LoginForm = () => <form>Login</form>;`,
      filename: "LoginFormComponent.jsx",
      name: "should allow long PascalCase names",
    },
    {
      code: `const UserProfile2 = () => <div>Profile</div>;`,
      filename: "UserProfile2.tsx",
      name: "should allow PascalCase with numbers",
    },
    {
      code: `const style = {};`,
      filename: "styles.css",
      name: "should ignore non-.jsx/.tsx files",
    },
    {
      code: `const html = "";`,
      filename: "invalid-name.html",
      name: "should ignore non-.jsx/.tsx files even with invalid names",
    },
    {
      code: `const config = {};`,
      filename: "invalid-name.js",
      name: "should ignore .js files",
    },
    {
      code: `const config = {};`,
      filename: "invalid-name.ts",
      name: "should ignore .ts files",
    },
  ],
  invalid: [
    {
      code: `const component = () => <div>Hello</div>;`,
      filename: "myComponent.jsx",
      name: "should disallow camelCase .jsx files",
      errors: [
        {
          messageId: "jsxPascalCase",
          line: 1,
          column: 1,
        },
      ],
    },
    {
      code: `export default function() { return <div>Hello</div>; }`,
      filename: "user-profile.tsx",
      name: "should disallow kebab-case .tsx files",
      errors: [
        {
          messageId: "jsxPascalCase",
          line: 1,
          column: 1,
        },
      ],
    },
    {
      code: `const component = () => <div>Hello</div>;`,
      filename: "my_component.jsx",
      name: "should disallow snake_case .jsx files",
      errors: [
        {
          messageId: "jsxPascalCase",
          line: 1,
          column: 1,
        },
      ],
    },
    {
      code: `const app = () => <div>App</div>;`,
      filename: "app.jsx",
      name: "should disallow lowercase .jsx files",
      errors: [
        {
          messageId: "jsxPascalCase",
          line: 1,
          column: 1,
        },
      ],
    },
    {
      code: `const component = () => <div>Hello</div>;`,
      filename: "MYCOMPONENT.tsx",
      name: "should disallow UPPERCASE .tsx files",
      errors: [
        {
          messageId: "jsxPascalCase",
          line: 1,
          column: 1,
        },
      ],
    },
    {
      code: `const component = () => <div>Hello</div>;`,
      filename: "My Component.jsx",
      name: "should disallow files with spaces",
      errors: [
        {
          messageId: "jsxPascalCase",
          line: 1,
          column: 1,
        },
      ],
    },
    {
      code: `const component = () => <div>Hello</div>;`,
      filename: "My.Component.tsx",
      name: "should disallow files with dots in middle",
      errors: [
        {
          messageId: "jsxPascalCase",
          line: 1,
          column: 1,
        },
      ],
    },
    {
      code: `const component = () => <div>Hello</div>;`,
      filename: "myComponent123Name.jsx",
      name: "should disallow camelCase with numbers",
      errors: [
        {
          messageId: "jsxPascalCase",
          line: 1,
          column: 1,
        },
      ],
    },
  ],
});

describe("jsx-pascal-case rule structure", () => {
  it("should have correct rule structure", () => {
    expect(jsxPascalCase).toHaveProperty("meta");
    expect(jsxPascalCase).toHaveProperty("create");
    expect(typeof jsxPascalCase.create).toBe("function");
  });
});
