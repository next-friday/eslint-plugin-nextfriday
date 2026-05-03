import { afterAll, describe, it } from "@jest/globals";
import { RuleTester } from "@typescript-eslint/rule-tester";

import rule from "../enforce-render-naming";

RuleTester.afterAll = afterAll;
RuleTester.describe = describe;
RuleTester.it = it;

const ruleTester = new RuleTester({
  languageOptions: {
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
    },
  },
});

ruleTester.run("enforce-render-naming", rule, {
  valid: [
    {
      code: `
        const Component = () => {
          const renderHeader = <div />;
          return renderHeader;
        };
      `,
      filename: "Component.tsx",
      name: "value-form JSX with render prefix",
    },
    {
      code: `
        const Component = () => {
          const renderHeader = () => <div />;
          return renderHeader();
        };
      `,
      filename: "Component.tsx",
      name: "function-form JSX with render prefix",
    },
    {
      code: `
        const Component = (props) => {
          const renderCardElements = props.items.map((item) => <Card {...item} />);
          return <div>{renderCardElements}</div>;
        };
      `,
      filename: "Component.tsx",
      name: "render prefix on .map result",
    },
    {
      code: `
        const Component = () => {
          const count = 5;
          const label = "hello";
          return <div>{label}</div>;
        };
      `,
      filename: "Component.tsx",
      name: "non-JSX variables are not flagged",
    },
    {
      code: `
        const Component = () => {
          const items = [1, 2, 3];
          return <div>{items.length}</div>;
        };
      `,
      filename: "Component.tsx",
      name: "array of primitives is not JSX-producing",
    },
    {
      code: `
        function notAComponent() {
          const header = <div />;
          return header;
        }
      `,
      filename: "Component.tsx",
      name: "non-PascalCase function does not enforce naming",
    },
    {
      code: `
        const Component = () => {
          const count = 5;
          return count;
        };
      `,
      filename: "Component.ts",
      name: "non-jsx file is not checked",
    },
  ],
  invalid: [
    {
      code: `
        const Component = () => {
          const header = <div />;
          return header;
        };
      `,
      filename: "Component.tsx",
      errors: [{ messageId: "missingRenderPrefix", data: { name: "header", pascalName: "Header" } }],
      name: "value-form JSX without render prefix",
    },
    {
      code: `
        const Component = () => {
          const renderer = () => <div />;
          return renderer();
        };
      `,
      filename: "Component.tsx",
      errors: [{ messageId: "missingRenderPrefix", data: { name: "renderer", pascalName: "Renderer" } }],
      name: "renderer is not a render-prefix (no camelCase boundary)",
    },
    {
      code: `
        const Component = (props) => {
          const cardElements = props.items.map((item) => <Card {...item} />);
          return <div>{cardElements}</div>;
        };
      `,
      filename: "Component.tsx",
      errors: [{ messageId: "missingRenderPrefix", data: { name: "cardElements", pascalName: "CardElements" } }],
      name: "missing render prefix on .map result",
    },
    {
      code: `
        const Component = (props) => {
          const phoneEntries = props.phones.map((phone) => {
            return <span>{phone}</span>;
          });
          return <div>{phoneEntries}</div>;
        };
      `,
      filename: "Component.tsx",
      errors: [{ messageId: "missingRenderPrefix", data: { name: "phoneEntries", pascalName: "PhoneEntries" } }],
      name: "missing render prefix on .map with block return",
    },
    {
      code: `
        const Component = (props) => {
          const fallback = props.condition ? <A /> : <B />;
          return fallback;
        };
      `,
      filename: "Component.tsx",
      errors: [{ messageId: "missingRenderPrefix", data: { name: "fallback", pascalName: "Fallback" } }],
      name: "missing render prefix on conditional JSX",
    },
    {
      code: `
        const Component = (props) => {
          const banner = props.isVisible && <Banner />;
          return banner;
        };
      `,
      filename: "Component.tsx",
      errors: [{ messageId: "missingRenderPrefix", data: { name: "banner", pascalName: "Banner" } }],
      name: "missing render prefix on logical AND with JSX",
    },
    {
      code: `
        const Component = () => {
          const header = () => <div />;
          return header();
        };
      `,
      filename: "Component.tsx",
      errors: [{ messageId: "missingRenderPrefix", data: { name: "header", pascalName: "Header" } }],
      name: "function-form JSX without render prefix",
    },
    {
      code: `
        function Component() {
          const header = <div />;
          return header;
        }
      `,
      filename: "Component.tsx",
      errors: [{ messageId: "missingRenderPrefix", data: { name: "header", pascalName: "Header" } }],
      name: "function declaration component",
    },
    {
      code: `
        export default function Component() {
          const header = <div />;
          return header;
        }
      `,
      filename: "Component.tsx",
      errors: [{ messageId: "missingRenderPrefix", data: { name: "header", pascalName: "Header" } }],
      name: "default-exported function declaration component",
    },
    {
      code: `
        const Component = () => {
          if (true) {
            const nestedHeader = <div />;
            return nestedHeader;
          }
          return null;
        };
      `,
      filename: "Component.tsx",
      errors: [{ messageId: "missingRenderPrefix", data: { name: "nestedHeader", pascalName: "NestedHeader" } }],
      name: "JSX variable inside nested block",
    },
  ],
});
