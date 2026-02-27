import { RuleTester } from "@typescript-eslint/rule-tester";
import { afterAll, describe, it } from "@jest/globals";

import sortTypeRequiredFirst from "../sort-type-required-first";

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

describe("sort-type-required-first", () => {
  it("should have meta property", () => {
    expect(sortTypeRequiredFirst).toHaveProperty("meta");
  });

  it("should have create property", () => {
    expect(sortTypeRequiredFirst).toHaveProperty("create");
  });

  ruleTester.run("sort-type-required-first", sortTypeRequiredFirst, {
    valid: [
      {
        code: `
interface Props {
  alt: string;
  size: string;
  src: string;
  label?: string;
}`,
        name: "required first alphabetically, then optional",
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
        name: "all required, sorted alphabetically",
      },
      {
        code: `
interface Props {
  a?: string;
  b?: number;
  c?: boolean;
}`,
        name: "all optional, sorted alphabetically",
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
        name: "type alias with required first then optional",
      },
      {
        code: `
interface Props {
  alt: string;
  size: "detail" | "highlight" | "main";
  src: string;
  label?: string;
  visible?: boolean;
}`,
        name: "multiple optional at end, sorted alphabetically",
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
  onClick: () => void;
  title: string;
  className?: string;
}`,
        name: "required with function type first then optional",
      },
    ],
    invalid: [
      {
        code: `
interface Props {
  alt: string;
  label?: string;
  size: string;
  src: string;
}`,
        errors: [{ messageId: "unsortedTypeMembers" }],
        name: "optional mixed in with required properties",
      },
      {
        code: `
interface Props {
  label?: string;
  alt: string;
  src: string;
}`,
        errors: [{ messageId: "unsortedTypeMembers" }],
        name: "optional before required",
      },
      {
        code: `
interface Props {
  src: string;
  alt: string;
}`,
        errors: [{ messageId: "unsortedTypeMembers" }],
        name: "required not sorted alphabetically",
      },
      {
        code: `
interface Props {
  b?: number;
  a?: string;
}`,
        errors: [{ messageId: "unsortedTypeMembers" }],
        name: "optional not sorted alphabetically",
      },
      {
        code: `
type Props = {
  label?: string;
  alt: string;
  size: string;
  src: string;
}`,
        errors: [{ messageId: "unsortedTypeMembers" }],
        name: "type alias with optional before required",
      },
      {
        code: `
interface Props {
  visible?: boolean;
  alt: string;
  label?: string;
  size: string;
  src: string;
}`,
        errors: [{ messageId: "unsortedTypeMembers" }],
        name: "multiple optional mixed with required",
      },
      {
        code: `
type Props = {
  src: string;
  alt: string;
  label?: string;
}`,
        errors: [{ messageId: "unsortedTypeMembers" }],
        name: "type alias with unsorted required",
      },
      {
        code: `
interface HeroBannerRootProps {
  alt: string;
  label?: string;
  size: "detail" | "highlight" | "main";
  src: string;
}`,
        errors: [{ messageId: "unsortedTypeMembers" }],
        name: "example from rule description",
      },
    ],
  });
});
