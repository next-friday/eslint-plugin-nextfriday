import { RuleTester } from "@typescript-eslint/rule-tester";
import { afterAll, describe, it } from "@jest/globals";

import preferInlineLiteralUnion from "../prefer-inline-literal-union";

RuleTester.afterAll = afterAll;
RuleTester.describe = describe;
RuleTester.it = it;

const ruleTester = new RuleTester({
  languageOptions: {
    parserOptions: {
      ecmaVersion: 2020,
      sourceType: "module",
    },
  },
});

describe("prefer-inline-literal-union", () => {
  it("should have meta property", () => {
    expect(preferInlineLiteralUnion.meta).toBeDefined();
  });

  it("should have create method", () => {
    expect(typeof preferInlineLiteralUnion.create).toBe("function");
  });

  ruleTester.run("prefer-inline-literal-union", preferInlineLiteralUnion, {
    valid: [
      {
        code: `
          interface Props {
            status: string;
          }
        `,
      },
      {
        code: `
          interface Props {
            activeCategoryId?: "articles" | "dharma" | "faq";
          }
        `,
      },
      {
        code: `
          type User = { name: string; age: number };
          interface Props {
            user: User;
          }
        `,
      },
      {
        code: `
          type Callback = () => void;
          interface Props {
            onClick: Callback;
          }
        `,
      },
      {
        code: `
          type Status = "loading" | "success" | "error";
          function getStatus(s: Status): string { return s; }
        `,
      },
      {
        code: `
          type MixedUnion = "a" | string;
          interface Props {
            value: MixedUnion;
          }
        `,
      },
      {
        code: `
          type ObjectType = { key: string };
          interface Props {
            data: ObjectType;
          }
        `,
      },
    ],
    invalid: [
      {
        code: `
          type ArticleFaqCategoryId = "articles" | "dharma" | "faq";
          interface ArticleFaqCategoryFilterProps {
            activeCategoryId?: ArticleFaqCategoryId;
          }
        `,
        output: `
          type ArticleFaqCategoryId = "articles" | "dharma" | "faq";
          interface ArticleFaqCategoryFilterProps {
            activeCategoryId?: "articles" | "dharma" | "faq";
          }
        `,
        errors: [{ messageId: "inlineLiteralUnion" }],
      },
      {
        code: `
          type Status = "loading" | "success" | "error";
          interface Props {
            status: Status;
          }
        `,
        output: `
          type Status = "loading" | "success" | "error";
          interface Props {
            status: "loading" | "success" | "error";
          }
        `,
        errors: [{ messageId: "inlineLiteralUnion" }],
      },
      {
        code: `
          type Size = 1 | 2 | 3 | 4;
          interface Props {
            size: Size;
          }
        `,
        output: `
          type Size = 1 | 2 | 3 | 4;
          interface Props {
            size: 1 | 2 | 3 | 4;
          }
        `,
        errors: [{ messageId: "inlineLiteralUnion" }],
      },
      {
        code: `
          type Theme = "light" | "dark";
          interface Props {
            theme: Theme;
            fallbackTheme: Theme;
          }
        `,
        output: `
          type Theme = "light" | "dark";
          interface Props {
            theme: "light" | "dark";
            fallbackTheme: "light" | "dark";
          }
        `,
        errors: [{ messageId: "inlineLiteralUnion" }, { messageId: "inlineLiteralUnion" }],
      },
      {
        code: `
          type Nullable = "yes" | "no" | null;
          interface Props {
            value: Nullable;
          }
        `,
        output: `
          type Nullable = "yes" | "no" | null;
          interface Props {
            value: "yes" | "no" | null;
          }
        `,
        errors: [{ messageId: "inlineLiteralUnion" }],
      },
      {
        code: `
          type MaybeStatus = "active" | "inactive" | undefined;
          interface Props {
            status: MaybeStatus;
          }
        `,
        output: `
          type MaybeStatus = "active" | "inactive" | undefined;
          interface Props {
            status: "active" | "inactive" | undefined;
          }
        `,
        errors: [{ messageId: "inlineLiteralUnion" }],
      },
      {
        code: `
          type IsEnabled = true | false;
          interface Props {
            enabled: IsEnabled;
          }
        `,
        output: `
          type IsEnabled = true | false;
          interface Props {
            enabled: true | false;
          }
        `,
        errors: [{ messageId: "inlineLiteralUnion" }],
      },
    ],
  });
});
