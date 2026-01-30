import { RuleTester } from "@typescript-eslint/rule-tester";
import { afterAll, describe, it, expect } from "@jest/globals";

import jsxRequireSuspense from "../jsx-require-suspense";

RuleTester.afterAll = afterAll;
RuleTester.it = it;
RuleTester.itOnly = it.only;
RuleTester.describe = describe;

const ruleTester = new RuleTester({
  languageOptions: {
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
    },
  },
});

ruleTester.run("jsx-require-suspense", jsxRequireSuspense, {
  valid: [
    {
      code: `
        const LazyComponent = lazy(() => import("./Component"));
        <Suspense fallback={<Skeleton />}>
          <LazyComponent />
        </Suspense>
      `,
      name: "should allow lazy component wrapped in Suspense",
    },
    {
      code: `
        const AsyncComponent = React.lazy(() => import("./Component"));
        <Suspense fallback={<Loading />}>
          <AsyncComponent />
        </Suspense>
      `,
      name: "should allow React.lazy component wrapped in Suspense",
    },
    {
      code: `
        const LazyModal = lazy(() => import("./Modal"));
        <Suspense fallback={null}>
          <div>
            <LazyModal />
          </div>
        </Suspense>
      `,
      name: "should allow lazy component nested inside Suspense",
    },
    {
      code: `
        <RegularComponent />
      `,
      name: "should allow regular components without Suspense",
    },
    {
      code: `
        const Component = () => <div />;
        <Component />
      `,
      name: "should allow non-lazy function components",
    },
    {
      code: `
        const LazyA = lazy(() => import("./A"));
        const LazyB = lazy(() => import("./B"));
        <Suspense fallback={<div />}>
          <LazyA />
          <LazyB />
        </Suspense>
      `,
      name: "should allow multiple lazy components in same Suspense",
    },
  ],
  invalid: [
    {
      code: `
        const AsyncComponent = lazy(() => import("./Component"));
        <AsyncComponent />
      `,
      name: "should disallow lazy component without Suspense",
      errors: [
        {
          messageId: "requireSuspense",
          data: {
            name: "AsyncComponent",
          },
        },
      ],
    },
    {
      code: `
        const LazyModal = React.lazy(() => import("./Modal"));
        <LazyModal />
      `,
      name: "should disallow React.lazy component without Suspense",
      errors: [
        {
          messageId: "requireSuspense",
          data: {
            name: "LazyModal",
          },
        },
      ],
    },
    {
      code: `
        const LazyComponent = lazy(() => import("./Component"));
        <div>
          <LazyComponent />
        </div>
      `,
      name: "should disallow lazy component nested in non-Suspense element",
      errors: [
        {
          messageId: "requireSuspense",
          data: {
            name: "LazyComponent",
          },
        },
      ],
    },
    {
      code: `
        const LazyA = lazy(() => import("./A"));
        const LazyB = lazy(() => import("./B"));
        <div>
          <LazyA />
          <LazyB />
        </div>
      `,
      name: "should report multiple lazy components without Suspense",
      errors: [
        {
          messageId: "requireSuspense",
          data: {
            name: "LazyA",
          },
        },
        {
          messageId: "requireSuspense",
          data: {
            name: "LazyB",
          },
        },
      ],
    },
  ],
});

describe("jsx-require-suspense rule structure", () => {
  it("should have correct rule structure", () => {
    expect(jsxRequireSuspense).toHaveProperty("meta");
    expect(jsxRequireSuspense).toHaveProperty("create");
    expect(typeof jsxRequireSuspense.create).toBe("function");
  });
});
