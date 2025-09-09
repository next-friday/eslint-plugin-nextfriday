import { RuleTester } from "@typescript-eslint/rule-tester";
import { afterAll, describe, it } from "@jest/globals";

import preferInterfaceOverInlineTypes from "../prefer-interface-over-inline-types";

RuleTester.afterAll = afterAll;
RuleTester.describe = describe;
RuleTester.it = it;

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

describe("prefer-interface-over-inline-types", () => {
  it("should be defined", () => {
    expect(preferInterfaceOverInlineTypes).toBeDefined();
  });

  ruleTester.run("prefer-interface-over-inline-types", preferInterfaceOverInlineTypes, {
    valid: [
      {
        code: `
          interface Props {
            children: ReactNode;
            title: string;
          }
          const Component = (props: Props) => <div>{props.children}</div>;
        `,
      },
      {
        code: `
          const Component = (props: { children: ReactNode }) => <div>{props.children}</div>;
        `,
      },
      {
        code: `
          const Component = (props: { title: string; onClick: () => void }) => (
            <div onClick={props.onClick}>{props.title}</div>
          );
        `,
      },
      {
        code: `
          const helper = (props: { value: number; name: string; data: object }) => {
            return props.value + props.name.length;
          };
        `,
      },
      {
        code: `
          const Component = () => <div>Hello</div>;
        `,
      },
      {
        code: `
          const Component = (props: { title: string }, ref: any) => <div>{props.title}</div>;
        `,
      },
      {
        code: `
          type ComponentProps = { children: ReactNode; title: string; onClick: () => void };
          const Component = (props: ComponentProps) => <div>{props.children}</div>;
        `,
      },
    ],
    invalid: [
      {
        code: `
          const Component = (props: { children: ReactNode; title: string; onClick: () => void }) => (
            <div onClick={props.onClick}>
              <h1>{props.title}</h1>
              {props.children}
            </div>
          );
        `,
        errors: [
          {
            messageId: "useInterface",
          },
        ],
      },
      {
        code: `
          const Component = (props: { user: { name: string; age: number }; isActive: boolean }) => (
            <div>{props.user.name}</div>
          );
        `,
        errors: [
          {
            messageId: "useInterface",
          },
        ],
      },
      {
        code: `
          const Component = (props: { items: string[]; title: string }) => (
            <div>
              <h1>{props.title}</h1>
              {props.items.map(item => <span key={item}>{item}</span>)}
            </div>
          );
        `,
        errors: [
          {
            messageId: "useInterface",
          },
        ],
      },
      {
        code: `
          const Component = (props: { status: 'loading' | 'success' | 'error'; message: string }) => (
            <div className={props.status}>{props.message}</div>
          );
        `,
        errors: [
          {
            messageId: "useInterface",
          },
        ],
      },
      {
        code: `
          function Component(props: { data: { id: number; name: string }; isVisible: boolean }) {
            return <div>{props.data.name}</div>;
          }
        `,
        errors: [
          {
            messageId: "useInterface",
          },
        ],
      },
      {
        code: `
          const Component = function(props: { config: { theme: string; lang: string }; children: ReactNode }) {
            return <div className={props.config.theme}>{props.children}</div>;
          };
        `,
        errors: [
          {
            messageId: "useInterface",
          },
        ],
      },
    ],
  });
});
