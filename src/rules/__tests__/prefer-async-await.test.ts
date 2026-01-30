import { RuleTester } from "@typescript-eslint/rule-tester";
import { afterAll, describe, it, expect } from "@jest/globals";

import preferAsyncAwait from "../prefer-async-await";

RuleTester.afterAll = afterAll;
RuleTester.it = it;
RuleTester.itOnly = it.only;
RuleTester.describe = describe;

const ruleTester = new RuleTester();

ruleTester.run("prefer-async-await", preferAsyncAwait, {
  valid: [
    {
      code: `
        async function fetchData() {
          const res = await fetch(url);
          const data = await res.json();
          setData(data);
        }
      `,
      name: "should allow async/await pattern",
    },
    {
      code: `
        const data = await fetch(url);
      `,
      name: "should allow simple await",
    },
    {
      code: `
        async function getData() {
          try {
            const response = await api.get("/users");
            return response.data;
          } catch (error) {
            console.error(error);
          }
        }
      `,
      name: "should allow async/await with try/catch",
    },
    {
      code: `
        const result = await Promise.all([fetchA(), fetchB()]);
      `,
      name: "should allow Promise.all with await",
    },
  ],
  invalid: [
    {
      code: `fetch(url).then(res => res.json()).then(data => setData(data));`,
      name: "should disallow chained .then()",
      errors: [
        {
          messageId: "preferAsyncAwait",
        },
        {
          messageId: "preferAsyncAwait",
        },
      ],
    },
    {
      code: `fetch(url).then(res => res.json());`,
      name: "should disallow single .then()",
      errors: [
        {
          messageId: "preferAsyncAwait",
        },
      ],
    },
    {
      code: `
        api.get("/users").then(response => {
          return response.data;
        });
      `,
      name: "should disallow .then() with block body",
      errors: [
        {
          messageId: "preferAsyncAwait",
        },
      ],
    },
    {
      code: `
        fetchData()
          .then(handleSuccess)
          .catch(handleError);
      `,
      name: "should disallow .then().catch() pattern",
      errors: [
        {
          messageId: "preferAsyncAwait",
        },
      ],
    },
    {
      code: `
        promise
          .then(step1)
          .then(step2)
          .then(step3);
      `,
      name: "should disallow long promise chains",
      errors: [
        {
          messageId: "preferAsyncAwait",
        },
        {
          messageId: "preferAsyncAwait",
        },
        {
          messageId: "preferAsyncAwait",
        },
      ],
    },
    {
      code: `
        Promise.resolve(value).then(callback);
      `,
      name: "should disallow Promise.resolve().then()",
      errors: [
        {
          messageId: "preferAsyncAwait",
        },
      ],
    },
  ],
});

describe("prefer-async-await rule structure", () => {
  it("should have correct rule structure", () => {
    expect(preferAsyncAwait).toHaveProperty("meta");
    expect(preferAsyncAwait).toHaveProperty("create");
    expect(typeof preferAsyncAwait.create).toBe("function");
  });
});
