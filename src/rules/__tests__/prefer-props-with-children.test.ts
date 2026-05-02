import { afterAll, describe, it } from "@jest/globals";
import { RuleTester } from "@typescript-eslint/rule-tester";

import preferPropsWithChildren from "../prefer-props-with-children";

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

describe("prefer-props-with-children", () => {
  it("should have meta property", () => {
    expect(preferPropsWithChildren.meta).toBeDefined();
  });

  it("should have create method", () => {
    expect(typeof preferPropsWithChildren.create).toBe("function");
  });

  ruleTester.run("prefer-props-with-children", preferPropsWithChildren, {
    valid: [
      {
        code: `
          interface ButtonProps {
            label: string;
            onClick: () => void;
          }
        `,
      },
      {
        code: `
          type CardProps = {
            title: string;
            description: string;
          };
        `,
      },
      {
        code: `
          interface LayoutProps extends PropsWithChildren {
            title: string;
          }
        `,
      },
      {
        code: `
          type ContainerProps = PropsWithChildren<{ className: string }>;
        `,
      },
      {
        code: `
          interface RenderProps {
            children: (value: string) => ReactNode;
          }
        `,
      },
      {
        code: `
          interface SlotProps {
            children: ReactElement;
          }
        `,
      },
      {
        code: `
          interface TextProps {
            children: string;
          }
        `,
      },
      {
        code: `
          interface UnionProps {
            children: ReactNode | string;
          }
        `,
      },
      {
        code: `
          const Component = (props: PropsWithChildren<{ label: string }>) => <div>{props.children}</div>;
        `,
      },
    ],
    invalid: [
      {
        code: `
          interface LayoutProps {
            children: ReactNode;
          }
        `,
        errors: [{ messageId: "usePropsWithChildren" }],
      },
      {
        code: `
          interface CardProps {
            title: string;
            children: ReactNode;
          }
        `,
        errors: [{ messageId: "usePropsWithChildren" }],
      },
      {
        code: `
          interface OptionalChildrenProps {
            children?: ReactNode;
            label: string;
          }
        `,
        errors: [{ messageId: "usePropsWithChildren" }],
      },
      {
        code: `
          interface ReactNamespaceProps {
            children: React.ReactNode;
          }
        `,
        errors: [{ messageId: "usePropsWithChildren" }],
      },
      {
        code: `
          type WrapperProps = {
            children: ReactNode;
            className: string;
          };
        `,
        errors: [{ messageId: "usePropsWithChildren" }],
      },
      {
        code: `
          const Component = ({ children, label }: { children: ReactNode; label: string }) => <div>{children}{label}</div>;
        `,
        errors: [{ messageId: "usePropsWithChildren" }],
      },
      {
        code: `
          function Layout(props: { children: ReactNode }) {
            return <div>{props.children}</div>;
          }
        `,
        errors: [{ messageId: "usePropsWithChildren" }],
      },
    ],
  });
});
