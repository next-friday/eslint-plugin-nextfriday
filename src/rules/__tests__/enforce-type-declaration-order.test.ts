import { RuleTester } from "@typescript-eslint/rule-tester";
import { afterAll, describe, it } from "@jest/globals";

import enforceTypeDeclarationOrder from "../enforce-type-declaration-order";

RuleTester.afterAll = afterAll;
RuleTester.describe = describe;
RuleTester.it = it;

const ruleTester = new RuleTester();

describe("enforce-type-declaration-order", () => {
  it("should have meta property", () => {
    expect(enforceTypeDeclarationOrder.meta).toBeDefined();
  });

  it("should have create method", () => {
    expect(typeof enforceTypeDeclarationOrder.create).toBe("function");
  });

  ruleTester.run("enforce-type-declaration-order", enforceTypeDeclarationOrder, {
    valid: [
      {
        code: `
          interface Foo {
            bar: Baz;
          }
          interface Baz {
            baz: string;
          }
        `,
      },
      {
        code: `
          interface Parent {
            child: Child;
          }
          interface Child {
            grandchild: Grandchild;
          }
          interface Grandchild {
            value: string;
          }
        `,
      },
      {
        code: `
          type Props = {
            config: Config;
          };
          type Config = {
            theme: string;
          };
        `,
      },
      {
        code: `
          interface Props {
            name: string;
            age: number;
          }
        `,
      },
      {
        code: `
          interface Props {
            items: ExternalType[];
          }
        `,
      },
      {
        code: `
          interface Props {
            data: Readonly<Item>;
          }
          interface Item {
            id: number;
          }
        `,
      },
      {
        code: `
          interface Foo {
            bar: string;
          }
          interface Baz {
            qux: string;
          }
        `,
      },
    ],
    invalid: [
      {
        code: `
          interface Baz {
            baz: string;
          }
          interface Foo {
            bar: Baz;
          }
        `,
        errors: [
          {
            messageId: "dependencyBeforeConsumer",
            data: { dependency: "Baz", consumer: "Foo" },
          },
        ],
      },
      {
        code: `
          type Config = {
            theme: string;
          };
          type Props = {
            config: Config;
          };
        `,
        errors: [
          {
            messageId: "dependencyBeforeConsumer",
            data: { dependency: "Config", consumer: "Props" },
          },
        ],
      },
      {
        code: `
          interface Child {
            value: string;
          }
          interface Parent {
            child: Child;
          }
        `,
        errors: [
          {
            messageId: "dependencyBeforeConsumer",
            data: { dependency: "Child", consumer: "Parent" },
          },
        ],
      },
      {
        code: `
          interface Item {
            id: number;
          }
          interface Props {
            data: Readonly<Item>;
          }
        `,
        errors: [
          {
            messageId: "dependencyBeforeConsumer",
            data: { dependency: "Item", consumer: "Props" },
          },
        ],
      },
      {
        code: `
          interface A {
            value: string;
          }
          interface B {
            value: number;
          }
          interface C {
            a: A;
            b: B;
          }
        `,
        errors: [
          {
            messageId: "dependencyBeforeConsumer",
            data: { dependency: "A", consumer: "C" },
          },
          {
            messageId: "dependencyBeforeConsumer",
            data: { dependency: "B", consumer: "C" },
          },
        ],
      },
      {
        code: `
          type Item = {
            id: number;
          };
          interface Props {
            items: Item[];
          }
        `,
        errors: [
          {
            messageId: "dependencyBeforeConsumer",
            data: { dependency: "Item", consumer: "Props" },
          },
        ],
      },
    ],
  });
});
