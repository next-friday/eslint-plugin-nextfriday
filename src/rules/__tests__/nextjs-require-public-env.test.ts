import { RuleTester } from "@typescript-eslint/rule-tester";
import { afterAll, describe, it, expect } from "@jest/globals";

import nextjsRequirePublicEnv from "../nextjs-require-public-env";

RuleTester.afterAll = afterAll;
RuleTester.it = it;
RuleTester.itOnly = it.only;
RuleTester.describe = describe;

const ruleTester = new RuleTester();

ruleTester.run("nextjs-require-public-env", nextjsRequirePublicEnv, {
  valid: [
    {
      code: `
        "use client";
        const url = process.env.NEXT_PUBLIC_API_URL;
      `,
      name: "should allow NEXT_PUBLIC_ prefixed env in client component",
    },
    {
      code: `
        "use client";
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
        const apiKey = process.env.NEXT_PUBLIC_API_KEY;
      `,
      name: "should allow multiple NEXT_PUBLIC_ env vars",
    },
    {
      code: `
        "use client";
        const nodeEnv = process.env.NODE_ENV;
      `,
      name: "should allow NODE_ENV in client components",
    },
    {
      code: `
        const url = process.env.API_URL;
      `,
      name: "should allow non-public env in server components",
    },
    {
      code: `
        const secret = process.env.DATABASE_SECRET;
        const key = process.env.PRIVATE_KEY;
      `,
      name: "should allow any env var without 'use client'",
    },
    {
      code: `
        "use client";
        const config = { url: process.env.NEXT_PUBLIC_URL };
      `,
      name: "should allow NEXT_PUBLIC_ in object property",
    },
  ],
  invalid: [
    {
      code: `
        "use client";
        const url = process.env.API_URL;
      `,
      name: "should disallow non-public env in client component",
      errors: [
        {
          messageId: "requirePublicPrefix",
          data: {
            name: "API_URL",
          },
        },
      ],
    },
    {
      code: `
        "use client";
        const secret = process.env.DATABASE_SECRET;
      `,
      name: "should disallow secret env in client component",
      errors: [
        {
          messageId: "requirePublicPrefix",
          data: {
            name: "DATABASE_SECRET",
          },
        },
      ],
    },
    {
      code: `
        "use client";
        const key = process.env.PRIVATE_API_KEY;
      `,
      name: "should disallow private key env in client component",
      errors: [
        {
          messageId: "requirePublicPrefix",
          data: {
            name: "PRIVATE_API_KEY",
          },
        },
      ],
    },
    {
      code: `
        "use client";
        const url = process.env.API_URL;
        const key = process.env.SECRET_KEY;
      `,
      name: "should report multiple non-public env vars",
      errors: [
        {
          messageId: "requirePublicPrefix",
          data: {
            name: "API_URL",
          },
        },
        {
          messageId: "requirePublicPrefix",
          data: {
            name: "SECRET_KEY",
          },
        },
      ],
    },
  ],
});

describe("nextjs-require-public-env rule structure", () => {
  it("should have correct rule structure", () => {
    expect(nextjsRequirePublicEnv).toHaveProperty("meta");
    expect(nextjsRequirePublicEnv).toHaveProperty("create");
    expect(typeof nextjsRequirePublicEnv.create).toBe("function");
  });
});
