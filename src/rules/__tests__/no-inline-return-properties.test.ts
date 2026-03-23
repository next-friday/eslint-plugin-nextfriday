import { afterAll, describe, it } from "@jest/globals";
import { RuleTester } from "@typescript-eslint/rule-tester";

import noInlineReturnProperties from "../no-inline-return-properties";

RuleTester.afterAll = afterAll;
RuleTester.describe = describe;
RuleTester.it = it;

const ruleTester = new RuleTester();

describe("no-inline-return-properties", () => {
  it("should have meta property", () => {
    expect(noInlineReturnProperties.meta).toBeDefined();
  });

  it("should have create method", () => {
    expect(typeof noInlineReturnProperties.create).toBe("function");
  });

  ruleTester.run("no-inline-return-properties", noInlineReturnProperties, {
    valid: [
      {
        code: `function foo() { return { a, b, c }; }`,
        name: "should allow all shorthand properties",
      },
      {
        code: `function foo() { return { error, isSubmitting, onJoin }; }`,
        name: "should allow shorthand properties with descriptive names",
      },
      {
        code: `function foo() { return { admins, branch, courses, members, news, stats }; }`,
        name: "should allow many shorthand properties",
      },
      {
        code: `function foo() { return { ...props, name }; }`,
        name: "should allow spread elements with shorthand",
      },
      {
        code: `function foo() { return 42; }`,
        name: "should allow non-object return",
      },
      {
        code: `function foo() { return; }`,
        name: "should allow empty return",
      },
      {
        code: `function foo() { return { ...data }; }`,
        name: "should allow spread-only return",
      },
      {
        code: `const obj = { key: value };`,
        name: "should not check non-return objects",
      },
      {
        code: `function foo() { const membersHref = \`/branch/\${branchNumber}/members\`; return { membersHref }; }`,
        name: "should allow extracted value with shorthand",
      },
    ],
    invalid: [
      {
        code: `function foo() { return { name: value }; }`,
        name: "should reject renamed property",
        errors: [
          {
            messageId: "noInlineProperty",
            data: { name: "name" },
          },
        ],
      },
      {
        code: `function foo() { return { onJoin: handleJoin }; }`,
        name: "should reject renamed handler property",
        errors: [
          {
            messageId: "noInlineProperty",
            data: { name: "onJoin" },
          },
        ],
      },
      {
        code: `function foo() { return { coursesCurrentPage: coursePage }; }`,
        name: "should reject renamed variable property",
        errors: [
          {
            messageId: "noInlineProperty",
            data: { name: "coursesCurrentPage" },
          },
        ],
      },
      {
        code: `function foo() { return { total: Math.ceil(items.length / PAGE_SIZE) }; }`,
        name: "should reject computed value property",
        errors: [
          {
            messageId: "noInlineProperty",
            data: { name: "total" },
          },
        ],
      },
      {
        code: `function foo() { return { membersHref: \`/branch/\${branchNumber}/members\` }; }`,
        name: "should reject template literal value property",
        errors: [
          {
            messageId: "noInlineProperty",
            data: { name: "membersHref" },
          },
        ],
      },
      {
        code: `function foo() { return { newsCurrentPage: newsData?.currentPage ?? 1, newsTotalPages: newsData?.pages ?? 1 }; }`,
        name: "should reject multiple non-shorthand properties",
        errors: [
          {
            messageId: "noInlineProperty",
            data: { name: "newsCurrentPage" },
          },
          {
            messageId: "noInlineProperty",
            data: { name: "newsTotalPages" },
          },
        ],
      },
      {
        code: `function foo() { return { admins, coursesCurrentPage: coursePage, members }; }`,
        name: "should reject mixed shorthand and non-shorthand",
        errors: [
          {
            messageId: "noInlineProperty",
            data: { name: "coursesCurrentPage" },
          },
        ],
      },
      {
        code: `function foo() { return { data: getData() }; }`,
        name: "should reject function call value property",
        errors: [
          {
            messageId: "noInlineProperty",
            data: { name: "data" },
          },
        ],
      },
    ],
  });
});
