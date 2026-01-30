import { RuleTester } from "@typescript-eslint/rule-tester";
import { afterAll, describe, it, expect } from "@jest/globals";

import enforceServiceNaming from "../enforce-service-naming";

RuleTester.afterAll = afterAll;
RuleTester.it = it;
RuleTester.itOnly = it.only;
RuleTester.describe = describe;

const ruleTester = new RuleTester();

ruleTester.run("enforce-service-naming", enforceServiceNaming, {
  valid: [
    {
      code: `export async function fetchArticleList() {}`,
      filename: "article.service.ts",
      name: "should allow fetch prefix in service file",
    },
    {
      code: `export async function fetchFaqList() {}`,
      filename: "faq.service.ts",
      name: "should allow fetch prefix for FAQ service",
    },
    {
      code: `export async function fetchUserById() {}`,
      filename: "user.service.ts",
      name: "should allow fetch prefix with different naming",
    },
    {
      code: `export async function createUser() {}`,
      filename: "user.service.ts",
      name: "should allow create prefix",
    },
    {
      code: `export async function updateArticle() {}`,
      filename: "article.service.ts",
      name: "should allow update prefix",
    },
    {
      code: `export async function deleteComment() {}`,
      filename: "comment.service.ts",
      name: "should allow delete prefix",
    },
    {
      code: `export async function getArticles() {}`,
      filename: "article.ts",
      name: "should allow get prefix in non-service files",
    },
    {
      code: `export async function loadData() {}`,
      filename: "utils.ts",
      name: "should allow load prefix in non-service files",
    },
    {
      code: `export function getArticles() {}`,
      filename: "article.service.ts",
      name: "should allow get prefix for non-async functions",
    },
    {
      code: `function getArticles() {}`,
      filename: "article.service.ts",
      name: "should allow get prefix for non-exported functions",
    },
    {
      code: `export const fetchUsers = async () => {}`,
      filename: "user.service.ts",
      name: "should allow fetch prefix with arrow function",
    },
    {
      code: `export async function get() {}`,
      filename: "article.service.ts",
      name: "should allow 'get' as full function name (not prefix)",
    },
  ],
  invalid: [
    {
      code: `export async function getArticles() {}`,
      filename: "article.service.ts",
      name: "should disallow get prefix in service file",
      errors: [
        {
          messageId: "usesFetchPrefix",
          data: {
            prefix: "get",
            name: "getArticles",
            suggestion: "fetchArticles",
          },
        },
      ],
    },
    {
      code: `export async function loadFaq() {}`,
      filename: "faq.service.ts",
      name: "should disallow load prefix in service file",
      errors: [
        {
          messageId: "usesFetchPrefix",
          data: {
            prefix: "load",
            name: "loadFaq",
            suggestion: "fetchFaq",
          },
        },
      ],
    },
    {
      code: `export async function getUserById() {}`,
      filename: "user.service.ts",
      name: "should disallow get prefix with camelCase",
      errors: [
        {
          messageId: "usesFetchPrefix",
          data: {
            prefix: "get",
            name: "getUserById",
            suggestion: "fetchUserById",
          },
        },
      ],
    },
    {
      code: `export async function loadAllUsers() {}`,
      filename: "user.service.ts",
      name: "should disallow load prefix with longer name",
      errors: [
        {
          messageId: "usesFetchPrefix",
          data: {
            prefix: "load",
            name: "loadAllUsers",
            suggestion: "fetchAllUsers",
          },
        },
      ],
    },
    {
      code: `export const getUsers = async () => {}`,
      filename: "user.service.ts",
      name: "should disallow get prefix with arrow function",
      errors: [
        {
          messageId: "usesFetchPrefix",
          data: {
            prefix: "get",
            name: "getUsers",
            suggestion: "fetchUsers",
          },
        },
      ],
    },
    {
      code: `export const loadItems = async () => {}`,
      filename: "item.service.ts",
      name: "should disallow load prefix with arrow function",
      errors: [
        {
          messageId: "usesFetchPrefix",
          data: {
            prefix: "load",
            name: "loadItems",
            suggestion: "fetchItems",
          },
        },
      ],
    },
  ],
});

describe("enforce-service-naming rule structure", () => {
  it("should have correct rule structure", () => {
    expect(enforceServiceNaming).toHaveProperty("meta");
    expect(enforceServiceNaming).toHaveProperty("create");
    expect(typeof enforceServiceNaming.create).toBe("function");
  });
});
