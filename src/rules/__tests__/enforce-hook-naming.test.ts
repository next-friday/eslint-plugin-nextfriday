import { RuleTester } from "@typescript-eslint/rule-tester";
import { afterAll, describe, it, expect } from "@jest/globals";

import enforceHookNaming from "../enforce-hook-naming";

RuleTester.afterAll = afterAll;
RuleTester.it = it;
RuleTester.itOnly = it.only;
RuleTester.describe = describe;

const ruleTester = new RuleTester();

ruleTester.run("enforce-hook-naming", enforceHookNaming, {
  valid: [
    {
      code: `export function useSearchParamsHandler() {}`,
      filename: "search-params.hook.ts",
      name: "should allow use prefix in hook file",
    },
    {
      code: `export default useSearchParamsHandler;`,
      filename: "search-params.hook.ts",
      name: "should allow default export with use prefix",
    },
    {
      code: `export function useAuth() { return useState(); }`,
      filename: "auth.hook.ts",
      name: "should allow use prefix for auth hook",
    },
    {
      code: `export const useModal = () => {}`,
      filename: "modal.hook.ts",
      name: "should allow use prefix with arrow function",
    },
    {
      code: `export default function useCustomHook() {}`,
      filename: "custom.hook.ts",
      name: "should allow default function export with use prefix",
    },
    {
      code: `export function useData() {}`,
      filename: "data.hooks.ts",
      name: "should allow use prefix in .hooks.ts file",
    },
    {
      code: `export function searchHandler() {}`,
      filename: "search.ts",
      name: "should allow any name in non-hook files",
    },
    {
      code: `export function handleSearch() {}`,
      filename: "search.utils.ts",
      name: "should allow any name in utility files",
    },
    {
      code: `export default handleSearch;`,
      filename: "search.ts",
      name: "should allow default export without use prefix in non-hook files",
    },
  ],
  invalid: [
    {
      code: `export function searchParamsHandler() {}`,
      filename: "search-params.hook.ts",
      name: "should disallow missing use prefix in named export",
      errors: [
        {
          messageId: "missingUsePrefix",
          data: {
            name: "searchParamsHandler",
            suggestion: "useSearchParamsHandler",
          },
        },
      ],
    },
    {
      code: `export default handleSearch;`,
      filename: "search.hook.ts",
      name: "should disallow default export without use prefix",
      errors: [
        {
          messageId: "defaultExportMissingUsePrefix",
          data: {
            name: "handleSearch",
            suggestion: "useHandleSearch",
          },
        },
      ],
    },
    {
      code: `export const modalHandler = () => {}`,
      filename: "modal.hook.ts",
      name: "should disallow arrow function without use prefix",
      errors: [
        {
          messageId: "missingUsePrefix",
          data: {
            name: "modalHandler",
            suggestion: "useModalHandler",
          },
        },
      ],
    },
    {
      code: `export function authManager() {}`,
      filename: "auth.hooks.ts",
      name: "should disallow missing use prefix in .hooks.ts file",
      errors: [
        {
          messageId: "missingUsePrefix",
          data: {
            name: "authManager",
            suggestion: "useAuthManager",
          },
        },
      ],
    },
    {
      code: `export default function customHook() {}`,
      filename: "custom.hook.ts",
      name: "should disallow default function export without use prefix",
      errors: [
        {
          messageId: "defaultExportMissingUsePrefix",
          data: {
            name: "customHook",
            suggestion: "useCustomHook",
          },
        },
      ],
    },
    {
      code: `export function getData() {}
export function fetchItems() {}`,
      filename: "data.hook.ts",
      name: "should report multiple functions without use prefix",
      errors: [
        {
          messageId: "missingUsePrefix",
          data: {
            name: "getData",
            suggestion: "useGetData",
          },
        },
        {
          messageId: "missingUsePrefix",
          data: {
            name: "fetchItems",
            suggestion: "useFetchItems",
          },
        },
      ],
    },
  ],
});

describe("enforce-hook-naming rule structure", () => {
  it("should have correct rule structure", () => {
    expect(enforceHookNaming).toHaveProperty("meta");
    expect(enforceHookNaming).toHaveProperty("create");
    expect(typeof enforceHookNaming.create).toBe("function");
  });
});
