import { RuleTester } from "@typescript-eslint/rule-tester";
import { afterAll, describe, it } from "@jest/globals";

import sortTypeAlphabetically from "../sort-type-alphabetically";

RuleTester.afterAll = afterAll;
RuleTester.it = it;
RuleTester.itOnly = it.only;
RuleTester.describe = describe;

const ruleTester = new RuleTester({
  languageOptions: {
    parserOptions: {
      ecmaVersion: 2020,
      sourceType: "module",
    },
  },
});

describe("sort-type-alphabetically", () => {
  it("should have meta property", () => {
    expect(sortTypeAlphabetically).toHaveProperty("meta");
  });

  it("should have create property", () => {
    expect(sortTypeAlphabetically).toHaveProperty("create");
  });

  ruleTester.run("sort-type-alphabetically", sortTypeAlphabetically, {
    valid: [
      {
        code: `
interface Props {
  alt: string;
  size: string;
  src: string;
  className?: string;
  label?: string;
  onClick?: () => void;
}`,
        name: "required A-Z then optional A-Z",
      },
      {
        code: `
interface Props {
  name: string;
}`,
        name: "single property",
      },
      {
        code: `
interface Props {
  a: string;
  b: number;
  c: boolean;
}`,
        name: "all required sorted A-Z",
      },
      {
        code: `
interface Props {
  a?: string;
  b?: number;
  c?: boolean;
}`,
        name: "all optional sorted A-Z",
      },
      {
        code: `interface Props {}`,
        name: "empty interface",
      },
      {
        code: `
type Props = {
  alt: string;
  size: string;
  src: string;
  label?: string;
}`,
        name: "type alias with A-Z within groups",
      },
      {
        code: `type Foo = string;`,
        name: "type alias that is not an object type",
      },
      {
        code: `type Foo = string | number;`,
        name: "type alias with union type",
      },
      {
        code: `
interface Props {
  className?: string;
  alt: string;
  src: string;
  label?: string;
}`,
        name: "optional mixed with required but each group A-Z",
      },
    ],
    invalid: [
      {
        code: `
interface Props {
  src: string;
  alt: string;
}`,
        output: `
interface Props {
  alt: string;
  src: string;
}`,
        errors: [{ messageId: "unsortedTypeMembers" }],
        name: "required not sorted A-Z",
      },
      {
        code: `
interface Props {
  b?: number;
  a?: string;
}`,
        output: `
interface Props {
  a?: string;
  b?: number;
}`,
        errors: [{ messageId: "unsortedTypeMembers" }],
        name: "optional not sorted A-Z",
      },
      {
        code: `
interface Props {
  src: string;
  alt: string;
  label?: string;
  className?: string;
}`,
        output: `
interface Props {
  alt: string;
  src: string;
  className?: string;
  label?: string;
}`,
        errors: [{ messageId: "unsortedTypeMembers" }],
        name: "both groups unsorted",
      },
      {
        code: `
type Props = {
  size: string;
  alt: string;
  label?: string;
}`,
        output: `
type Props = {
  alt: string;
  size: string;
  label?: string;
}`,
        errors: [{ messageId: "unsortedTypeMembers" }],
        name: "type alias with unsorted required group",
      },
      {
        code: `
interface Props {
  alt: string;
  size: string;
  src: string;
  label?: string;
  className?: string;
}`,
        output: `
interface Props {
  alt: string;
  size: string;
  src: string;
  className?: string;
  label?: string;
}`,
        errors: [{ messageId: "unsortedTypeMembers" }],
        name: "required A-Z but optional not A-Z",
      },
      {
        code: `
interface HeroBannerRootProps {
  size: "detail" | "highlight" | "main";
  alt: string;
  src: string;
  className?: string;
  label?: string;
}`,
        output: `
interface HeroBannerRootProps {
  alt: string;
  size: "detail" | "highlight" | "main";
  src: string;
  className?: string;
  label?: string;
}`,
        errors: [{ messageId: "unsortedTypeMembers" }],
        name: "required group not sorted A-Z",
      },
    ],
  });
});
