import { afterAll, describe, it } from "@jest/globals";
import { RuleTester } from "@typescript-eslint/rule-tester";

import rule from "../no-helper-function-in-hook";

RuleTester.afterAll = afterAll;
RuleTester.describe = describe;
RuleTester.it = it;

const ruleTester = new RuleTester();

ruleTester.run("no-helper-function-in-hook", rule, {
  valid: [
    {
      code: `export function useMyHook() { return null; }`,
      filename: "useMyHook.hook.ts",
      name: "should allow exported hook function declaration",
    },
    {
      code: `export const useMyHook = () => null;`,
      filename: "useMyHook.hook.ts",
      name: "should allow exported hook arrow function",
    },
    {
      code: `export const useMyHook = function() { return null; };`,
      filename: "useMyHook.hook.ts",
      name: "should allow exported hook function expression",
    },
    {
      code: `function useMyHook() { return null; }`,
      filename: "useMyHook.hook.ts",
      name: "should allow non-exported hook function declaration",
    },
    {
      code: `const useMyHook = () => null;`,
      filename: "useMyHook.hook.ts",
      name: "should allow non-exported hook arrow function",
    },
    {
      code: `import { useState } from "react";`,
      filename: "useMyHook.hook.ts",
      name: "should allow import statements",
    },
    {
      code: `const CACHE_KEY = "my-key";`,
      filename: "useMyHook.hook.ts",
      name: "should allow top-level non-function constants",
    },
    {
      code: `export function useData() { function formatResponse(r) { return r; } return formatResponse; }`,
      filename: "useData.hook.ts",
      name: "should allow helper functions defined inside a hook body",
    },
    {
      code: `export const useData = () => { const format = (r) => r; return format; };`,
      filename: "useData.hook.ts",
      name: "should allow arrow helpers defined inside a hook body",
    },
    {
      code: `function formatData(data) { return data; }`,
      filename: "utils.ts",
      name: "should not apply to non-hook files",
    },
  ],
  invalid: [
    {
      code: `function formatData(data) { return data; }`,
      filename: "useMyHook.hook.ts",
      name: "should disallow top-level non-hook function declaration",
      errors: [{ messageId: "noHelperFunction" }],
    },
    {
      code: `const formatData = (data) => data;`,
      filename: "useMyHook.hook.ts",
      name: "should disallow top-level non-hook arrow function",
      errors: [{ messageId: "noHelperFunction" }],
    },
    {
      code: `const formatData = function(data) { return data; };`,
      filename: "useMyHook.hook.ts",
      name: "should disallow top-level non-hook function expression",
      errors: [{ messageId: "noHelperFunction" }],
    },
    {
      code: `export function formatData(data) { return data; }`,
      filename: "useMyHook.hook.ts",
      name: "should disallow exported non-hook function declaration",
      errors: [{ messageId: "noHelperFunction" }],
    },
    {
      code: `export const formatData = (data) => data;`,
      filename: "useMyHook.hooks.ts",
      name: "should disallow exported non-hook arrow function in .hooks.ts file",
      errors: [{ messageId: "noHelperFunction" }],
    },
    {
      code: `function helper() {} export function useMyHook() { return null; }`,
      filename: "useMyHook.hook.ts",
      name: "should flag only the non-hook function alongside a valid hook",
      errors: [{ messageId: "noHelperFunction" }],
    },
  ],
});
