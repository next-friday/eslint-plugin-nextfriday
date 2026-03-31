import { afterAll, describe, it } from "@jest/globals";
import { RuleTester } from "@typescript-eslint/rule-tester";

import enforceServiceNaming from "../enforce-service-naming";

RuleTester.afterAll = afterAll;
RuleTester.describe = describe;
RuleTester.it = it;

const ruleTester = new RuleTester();

describe("enforce-service-naming", () => {
  it("should have meta property", () => {
    expect(enforceServiceNaming.meta).toBeDefined();
  });

  it("should have create method", () => {
    expect(typeof enforceServiceNaming.create).toBe("function");
  });

  ruleTester.run("enforce-service-naming", enforceServiceNaming, {
    valid: [
      {
        code: `export async function getArticles() {}`,
        filename: "article.service.ts",
        name: "should allow get prefix in service file",
      },
      {
        code: `export async function fetchArticles() {}`,
        filename: "article.service.ts",
        name: "should allow fetch prefix in service file",
      },
      {
        code: `export async function loadData() {}`,
        filename: "data.service.ts",
        name: "should allow load prefix in service file",
      },
      {
        code: `export async function searchArticles(query: string) {}`,
        filename: "article.service.ts",
        name: "should allow search prefix",
      },
      {
        code: `export async function createOrder() {}`,
        filename: "order.service.ts",
        name: "should allow create prefix",
      },
      {
        code: `export async function updateProfile() {}`,
        filename: "profile.service.ts",
        name: "should allow update prefix",
      },
      {
        code: `export async function removeComment() {}`,
        filename: "comment.service.ts",
        name: "should allow remove prefix",
      },
      {
        code: `export async function verifyEmail() {}`,
        filename: "auth.service.ts",
        name: "should allow verify prefix",
      },
      {
        code: `export async function setProfile() {}`,
        filename: "profile.ts",
        name: "should allow set prefix in non-service files",
      },
      {
        code: `export async function deleteComment() {}`,
        filename: "comment.ts",
        name: "should allow delete prefix in non-service files",
      },
      {
        code: `export function setProfile() {}`,
        filename: "profile.service.ts",
        name: "should allow set prefix for non-async functions",
      },
      {
        code: `function deleteComment() {}`,
        filename: "comment.service.ts",
        name: "should allow delete prefix for non-exported functions",
      },
      {
        code: `export async function set() {}`,
        filename: "article.service.ts",
        name: "should allow 'set' as full function name (not prefix)",
      },
      {
        code: `export async function handle() {}`,
        filename: "article.service.ts",
        name: "should allow 'handle' as full function name (not prefix)",
      },
      {
        code: `export const fetchUsers = async () => {}`,
        filename: "user.service.ts",
        name: "should allow fetch prefix with arrow function",
      },
      {
        code: `export async function settings() {}`,
        filename: "config.service.ts",
        name: "should not flag words that start with banned prefix but are not camelCase",
      },
      {
        code: `export async function domestic() {}`,
        filename: "shipping.service.ts",
        name: "should not flag 'domestic' even though it starts with 'do'",
      },
    ],
    invalid: [
      {
        code: `export async function setProfile(data: ProfileRequest) {}`,
        filename: "profile.service.ts",
        name: "should disallow set prefix in service file",
        errors: [
          {
            messageId: "bannedPrefix",
            data: {
              prefix: "set",
              name: "setProfile",
              suggestions: "update, save, patch",
            },
          },
        ],
      },
      {
        code: `export async function deleteComment(id: string) {}`,
        filename: "comment.service.ts",
        name: "should disallow delete prefix in service file",
        errors: [
          {
            messageId: "bannedPrefix",
            data: {
              prefix: "delete",
              name: "deleteComment",
              suggestions: "remove, archive",
            },
          },
        ],
      },
      {
        code: `export async function doLogin(credentials: LoginRequest) {}`,
        filename: "auth.service.ts",
        name: "should disallow do prefix in service file",
        errors: [
          {
            messageId: "bannedPrefix",
            data: {
              prefix: "do",
              name: "doLogin",
              suggestions: "submit, process",
            },
          },
        ],
      },
      {
        code: `export async function handlePayment(data: PaymentRequest) {}`,
        filename: "payment.service.ts",
        name: "should disallow handle prefix in service file",
        errors: [
          {
            messageId: "bannedPrefix",
            data: {
              prefix: "handle",
              name: "handlePayment",
              suggestions: "create, verify",
            },
          },
        ],
      },
      {
        code: `export const setUsers = async () => {}`,
        filename: "user.service.ts",
        name: "should disallow set prefix with arrow function",
        errors: [
          {
            messageId: "bannedPrefix",
            data: {
              prefix: "set",
              name: "setUsers",
              suggestions: "update, save, patch",
            },
          },
        ],
      },
      {
        code: `export const handleOrder = async () => {}`,
        filename: "order.service.ts",
        name: "should disallow handle prefix with arrow function",
        errors: [
          {
            messageId: "bannedPrefix",
            data: {
              prefix: "handle",
              name: "handleOrder",
              suggestions: "create, verify",
            },
          },
        ],
      },
    ],
  });
});
