import { RuleTester } from "@typescript-eslint/rule-tester";
import { afterAll, describe, it } from "@jest/globals";

import noNestedInterfaceDeclaration from "../no-nested-interface-declaration";

RuleTester.afterAll = afterAll;
RuleTester.describe = describe;
RuleTester.it = it;

const ruleTester = new RuleTester();

describe("no-nested-interface-declaration", () => {
  it("should have meta property", () => {
    expect(noNestedInterfaceDeclaration.meta).toBeDefined();
  });

  it("should have create method", () => {
    expect(typeof noNestedInterfaceDeclaration.create).toBe("function");
  });

  ruleTester.run("no-nested-interface-declaration", noNestedInterfaceDeclaration, {
    valid: [
      {
        code: `
          interface Baz {
            baz: string;
          }
          interface Foo {
            bar: Baz;
          }
        `,
      },
      {
        code: `
          interface Props {
            name: string;
            age: number;
            isActive: boolean;
          }
        `,
      },
      {
        code: `
          type Item = { id: number; label: string };
          interface Props {
            items: Item[];
          }
        `,
      },
      {
        code: `
          interface Config {
            timeout: number;
          }
          interface Props {
            config: Readonly<Config>;
          }
        `,
      },
      {
        code: `
          interface Props {
            ids: string[];
          }
        `,
      },
      {
        code: `
          interface Props {
            callback: () => void;
          }
        `,
      },
    ],
    invalid: [
      {
        code: `
          interface Foo {
            bar: {
              baz: string;
            };
          }
        `,
        errors: [{ messageId: "noNestedInterface" }],
      },
      {
        code: `
          interface Props {
            user: {
              name: string;
              age: number;
            };
          }
        `,
        errors: [{ messageId: "noNestedInterface" }],
      },
      {
        code: `
          interface Props {
            items: {
              id: number;
              label: string;
            }[];
          }
        `,
        errors: [{ messageId: "noNestedInterface" }],
      },
      {
        code: `
          interface Props {
            data: Readonly<{
              id: number;
              name: string;
            }>;
          }
        `,
        errors: [{ messageId: "noNestedInterface" }],
      },
      {
        code: `
          type Props = {
            config: {
              theme: string;
              lang: string;
            };
          };
        `,
        errors: [{ messageId: "noNestedInterface" }],
      },
      {
        code: `
          interface Props {
            first: {
              a: string;
            };
            second: {
              b: number;
            };
          }
        `,
        errors: [{ messageId: "noNestedInterface" }, { messageId: "noNestedInterface" }],
      },
      {
        code: `
          interface Props {
            nested: {
              deep: {
                value: string;
              };
            };
          }
        `,
        errors: [{ messageId: "noNestedInterface" }, { messageId: "noNestedInterface" }],
      },
    ],
  });
});
