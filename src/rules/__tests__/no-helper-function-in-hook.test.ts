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
      name: "should allow exported hook function declaration",
    },
    {
      code: `export const useMyHook = () => null;`,
      name: "should allow exported hook arrow function",
    },
    {
      code: `export const useMyHook = function() { return null; };`,
      name: "should allow exported hook function expression",
    },
    {
      code: `function useMyHook() { return null; }`,
      name: "should allow non-exported hook function declaration",
    },
    {
      code: `const useMyHook = () => null;`,
      name: "should allow non-exported hook arrow function",
    },
    {
      code: `import { useState } from "react";`,
      name: "should allow import statements",
    },
    {
      code: `const CACHE_KEY = "my-key";`,
      name: "should allow top-level non-function constants",
    },
    {
      code: `export function useData() { function formatResponse(r) { return r; } return formatResponse; }`,
      name: "should allow helper functions defined inside a hook body",
    },
    {
      code: `export const useData = () => { const format = (r) => r; return format; };`,
      name: "should allow arrow helpers defined inside a hook body",
    },
  ],
  invalid: [
    {
      code: `function formatData(data) { return data; }`,
      name: "should disallow top-level non-hook function declaration",
      errors: [{ messageId: "noHelperFunction" }],
    },
    {
      code: `const formatData = (data) => data;`,
      name: "should disallow top-level non-hook arrow function",
      errors: [{ messageId: "noHelperFunction" }],
    },
    {
      code: `const formatData = function(data) { return data; };`,
      name: "should disallow top-level non-hook function expression",
      errors: [{ messageId: "noHelperFunction" }],
    },
    {
      code: `export function formatData(data) { return data; }`,
      name: "should disallow exported non-hook function declaration",
      errors: [{ messageId: "noHelperFunction" }],
    },
    {
      code: `export const formatData = (data) => data;`,
      name: "should disallow exported non-hook arrow function",
      errors: [{ messageId: "noHelperFunction" }],
    },
    {
      code: `function helper() {} export function useMyHook() { return null; }`,
      name: "should flag only the non-hook function alongside a valid hook",
      errors: [{ messageId: "noHelperFunction" }],
    },
  ],
});
