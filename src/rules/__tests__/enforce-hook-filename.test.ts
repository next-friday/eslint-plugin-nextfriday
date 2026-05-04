import { afterAll, describe, it } from "@jest/globals";
import { RuleTester } from "@typescript-eslint/rule-tester";

import rule from "../enforce-hook-filename";

RuleTester.afterAll = afterAll;
RuleTester.describe = describe;
RuleTester.it = it;

const ruleTester = new RuleTester();

ruleTester.run("enforce-hook-filename", rule, {
  valid: [
    {
      name: "should allow hook export from .hook.ts file",
      filename: "/src/features/user/use-user-data.hook.ts",
      code: `export function useUserData() { return null; }`,
    },
    {
      name: "should allow hook export from .hooks.ts file",
      filename: "/src/features/user/user.hooks.ts",
      code: `export const useUserData = () => null;`,
    },
    {
      name: "should allow non-hook export from any file",
      filename: "/src/features/user/user.service.ts",
      code: `export function fetchUserData() { return null; }`,
    },
    {
      name: "should allow non-hook export from .ts file",
      filename: "/src/utils/format.ts",
      code: `export const formatDate = (d: Date) => d.toISOString();`,
    },
    {
      name: "should ignore re-exports of hooks",
      filename: "/src/features/user/index.ts",
      code: `export { useUserData } from "./use-user-data.hook";`,
    },
    {
      name: "should not flag use without capital letter (e.g. user)",
      filename: "/src/features/user/user.service.ts",
      code: `export function user() { return null; }`,
    },
    {
      name: "should not flag 'use' alone as a hook",
      filename: "/src/utils/utils.ts",
      code: `export function use() { return null; }`,
    },
  ],
  invalid: [
    {
      name: "should disallow hook function declaration exported from plain .ts file",
      filename: "/src/features/user/use-user-data.ts",
      code: `export function useUserData() { return null; }`,
      errors: [{ messageId: "requireHookFilename", data: { name: "useUserData" } }],
    },
    {
      name: "should disallow hook arrow function exported from plain .ts file",
      filename: "/src/features/user/use-user-data.ts",
      code: `export const useUserData = () => null;`,
      errors: [{ messageId: "requireHookFilename", data: { name: "useUserData" } }],
    },
    {
      name: "should disallow hook function expression exported from plain .ts file",
      filename: "/src/features/user/use-user-data.ts",
      code: `export const useUserData = function() { return null; };`,
      errors: [{ messageId: "requireHookFilename", data: { name: "useUserData" } }],
    },
    {
      name: "should disallow hook exported from .tsx file",
      filename: "/src/features/user/UserCard.tsx",
      code: `export function useUserCard() { return null; }`,
      errors: [{ messageId: "requireHookFilename", data: { name: "useUserCard" } }],
    },
    {
      name: "should disallow default exported hook from plain .ts file",
      filename: "/src/features/user/use-user-data.ts",
      code: `export default function useUserData() { return null; }`,
      errors: [{ messageId: "requireHookFilename", data: { name: "useUserData" } }],
    },
    {
      name: "should flag multiple hook exports in one file",
      filename: "/src/features/user/user.utils.ts",
      code: `export function useA() {} export function useB() {}`,
      errors: [
        { messageId: "requireHookFilename", data: { name: "useA" } },
        { messageId: "requireHookFilename", data: { name: "useB" } },
      ],
    },
  ],
});
