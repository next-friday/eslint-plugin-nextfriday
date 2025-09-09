import { RuleTester } from "@typescript-eslint/rule-tester";
import { afterAll, describe, it } from "@jest/globals";

import preferReactImportTypes from "../prefer-react-import-types";

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

describe("prefer-react-import-types", () => {
  it("should be defined", () => {
    expect(preferReactImportTypes).toBeDefined();
  });

  ruleTester.run("prefer-react-import-types", preferReactImportTypes, {
    valid: [
      {
        code: `
        import type { ReactNode } from "react";
        const Component = (props: { children: ReactNode }) => <div>{props.children}</div>;
      `,
      },
      {
        code: `
        import { useState } from "react";
        const Component = () => {
          const [state, setState] = useState(0);
          return <div>{state}</div>;
        };
      `,
      },
      {
        code: `
        import type { FC } from "react";
        const Component: FC = () => <div>Hello</div>;
      `,
      },
      {
        code: `
        import { memo } from "react";
        const Component = memo(() => <div>Hello</div>);
      `,
      },
      {
        code: `
        const obj = { ReactNode: "test" };
        console.log(obj.ReactNode);
      `,
      },
      {
        code: `
        import type { ReactNode } from "react";
        interface Props {
          children: ReactNode;
        }
      `,
      },
    ],
    invalid: [
      {
        code: `
        const Component = (props: { children: React.ReactNode }) => <div>{props.children}</div>;
      `,
        errors: [
          {
            messageId: "preferDirectImport",
            data: {
              typeName: "ReactNode",
              importStatement: 'import type { ReactNode } from "react"',
            },
          },
        ],
        output: `
        const Component = (props: { children: ReactNode }) => <div>{props.children}</div>;
      `,
      },
      {
        code: `
        const Component = () => {
          const [state, setState] = React.useState(0);
          return <div>{state}</div>;
        };
      `,
        errors: [
          {
            messageId: "preferDirectImport",
            data: {
              typeName: "useState",
              importStatement: 'import { useState } from "react"',
            },
          },
        ],
        output: `
        const Component = () => {
          const [state, setState] = useState(0);
          return <div>{state}</div>;
        };
      `,
      },
      {
        code: `
        const Component: React.FC = () => <div>Hello</div>;
      `,
        errors: [
          {
            messageId: "preferDirectImport",
            data: {
              typeName: "FC",
              importStatement: 'import type { FC } from "react"',
            },
          },
        ],
        output: `
        const Component: FC = () => <div>Hello</div>;
      `,
      },
      {
        code: `
        const Component = React.memo(() => <div>Hello</div>);
      `,
        errors: [
          {
            messageId: "preferDirectImport",
            data: {
              typeName: "memo",
              importStatement: 'import { memo } from "react"',
            },
          },
        ],
        output: `
        const Component = memo(() => <div>Hello</div>);
      `,
      },
      {
        code: `
        const element = React.createElement('div', null, 'Hello');
        const Fragment = React.Fragment;
      `,
        errors: [
          {
            messageId: "preferDirectImport",
            data: {
              typeName: "createElement",
              importStatement: 'import { createElement } from "react"',
            },
          },
          {
            messageId: "preferDirectImport",
            data: {
              typeName: "Fragment",
              importStatement: 'import { Fragment } from "react"',
            },
          },
        ],
        output: `
        const element = createElement('div', null, 'Hello');
        const Fragment = Fragment;
      `,
      },
    ],
  });
});
