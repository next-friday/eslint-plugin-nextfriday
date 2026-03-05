import { RuleTester } from "@typescript-eslint/rule-tester";
import { afterAll, describe, it } from "@jest/globals";

import sortTypeRequiredFirst from "../sort-type-required-first";

RuleTester.afterAll = afterAll;
RuleTester.describe = describe;
RuleTester.it = it;

const ruleTester = new RuleTester();

describe("sort-type-required-first", () => {
  it("should have meta property", () => {
    expect(sortTypeRequiredFirst.meta).toBeDefined();
  });

  it("should have create method", () => {
    expect(typeof sortTypeRequiredFirst.create).toBe("function");
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
        name: "required first then optional",
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
  c: boolean;
  a: string;
  b: number;
}`,
        name: "all required, any order is fine",
      },
      {
        code: `
interface Props {
  b?: number;
  a?: string;
  c?: boolean;
}`,
        name: "all optional, any order is fine",
      },
      {
        code: `interface Props {}`,
        name: "empty interface",
      },
      {
        code: `
type Props = {
  src: string;
  alt: string;
  label?: string;
}`,
        name: "type alias with required first then optional",
      },
      {
        code: `
interface Props {
  src: string;
  alt: string;
  visible?: boolean;
  label?: string;
}`,
        name: "required first then optional, not alphabetical",
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
        output: `
interface Props {
  alt: string;
  size: string;
  src: string;
  label?: string;
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
        output: `
interface Props {
  alt: string;
  src: string;
  label?: string;
}`,
        errors: [{ messageId: "unsortedTypeMembers" }],
        name: "optional before required",
      },
      {
        code: `
type Props = {
  label?: string;
  alt: string;
  size: string;
  src: string;
}`,
        output: `
type Props = {
  alt: string;
  size: string;
  src: string;
  label?: string;
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
        output: `
interface Props {
  alt: string;
  size: string;
  src: string;
  visible?: boolean;
  label?: string;
}`,
        errors: [{ messageId: "unsortedTypeMembers" }],
        name: "multiple optional mixed with required",
      },
      {
        code: `
interface HeroBannerRootProps {
  alt: string;
  label?: string;
  size: "detail" | "highlight" | "main";
  src: string;
}`,
        output: `
interface HeroBannerRootProps {
  alt: string;
  size: "detail" | "highlight" | "main";
  src: string;
  label?: string;
}`,
        errors: [{ messageId: "unsortedTypeMembers" }],
        name: "optional in middle of required properties",
      },
      {
        code: `
interface Props {
  a: string;
  b: string;
  c?: string;
  d: string;
}`,
        output: `
interface Props {
  a: string;
  b: string;
  d: string;
  c?: string;
}`,
        errors: [{ messageId: "unsortedTypeMembers" }],
        name: "required after optional",
      },
    ],
  });
});
