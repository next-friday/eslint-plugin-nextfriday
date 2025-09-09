import { RuleTester } from "@typescript-eslint/rule-tester";
import { afterAll, describe, it } from "@jest/globals";

import enforceReadonlyComponentProps from "../enforce-readonly-component-props";

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

describe("enforce-readonly-component-props", () => {
  it("should be defined", () => {
    expect(enforceReadonlyComponentProps).toBeDefined();
  });

  ruleTester.run("enforce-readonly-component-props", enforceReadonlyComponentProps, {
    valid: [
      {
        code: `
          interface Props {
            children: ReactNode;
          }
          const Component = (props: Readonly<Props>) => <div>{props.children}</div>;
        `,
      },
      {
        code: `
          type ComponentProps = {
            title: string;
            onClick: () => void;
          };
          const Component = (props: Readonly<ComponentProps>) => <div>{props.title}</div>;
        `,
      },
      {
        code: `
          const Component = (props: { children: ReactNode }) => <div>{props.children}</div>;
        `,
      },
      {
        code: `
          interface HelperProps {
            value: number;
            name: string;
          }
          const helper = (props: HelperProps) => {
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
          interface Props {
            title: string;
          }
          const Component = (props: Props, ref: any) => <div>{props.title}</div>;
        `,
      },
      {
        code: `
          const Component = (text: string) => <div>{text}</div>;
        `,
      },
    ],
    invalid: [
      {
        code: `
          interface Props {
            children: ReactNode;
          }
          const Component = (props: Props) => <div>{props.children}</div>;
        `,
        output: `
          interface Props {
            children: ReactNode;
          }
          const Component = (props: Readonly<Props>) => <div>{props.children}</div>;
        `,
        errors: [
          {
            messageId: "useReadonly",
          },
        ],
      },
      {
        code: `
          type ComponentProps = {
            title: string;
            onClick: () => void;
          };
          const Component = (props: ComponentProps) => <div>{props.title}</div>;
        `,
        output: `
          type ComponentProps = {
            title: string;
            onClick: () => void;
          };
          const Component = (props: Readonly<ComponentProps>) => <div>{props.title}</div>;
        `,
        errors: [
          {
            messageId: "useReadonly",
          },
        ],
      },
      {
        code: `
          interface Props {
            data: string;
          }
          function Component(props: Props) {
            return <div>{props.data}</div>;
          }
        `,
        output: `
          interface Props {
            data: string;
          }
          function Component(props: Readonly<Props>) {
            return <div>{props.data}</div>;
          }
        `,
        errors: [
          {
            messageId: "useReadonly",
          },
        ],
      },
      {
        code: `
          type Props = {
            config: string;
          };
          const Component = function(props: Props) {
            return <div>{props.config}</div>;
          };
        `,
        output: `
          type Props = {
            config: string;
          };
          const Component = function(props: Readonly<Props>) {
            return <div>{props.config}</div>;
          };
        `,
        errors: [
          {
            messageId: "useReadonly",
          },
        ],
      },
      {
        code: `
          interface LayoutProps {
            children: ReactNode;
            title?: string;
          }
          const Layout = (props: LayoutProps) => {
            return props.title ? <div><h1>{props.title}</h1>{props.children}</div> : <div>{props.children}</div>;
          };
        `,
        output: `
          interface LayoutProps {
            children: ReactNode;
            title?: string;
          }
          const Layout = (props: Readonly<LayoutProps>) => {
            return props.title ? <div><h1>{props.title}</h1>{props.children}</div> : <div>{props.children}</div>;
          };
        `,
        errors: [
          {
            messageId: "useReadonly",
          },
        ],
      },
    ],
  });
});
