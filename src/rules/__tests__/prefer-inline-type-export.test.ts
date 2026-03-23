import { afterAll, describe, it } from "@jest/globals";
import { RuleTester } from "@typescript-eslint/rule-tester";

import preferInlineTypeExport from "../prefer-inline-type-export";

RuleTester.afterAll = afterAll;
RuleTester.describe = describe;
RuleTester.it = it;

const ruleTester = new RuleTester();

describe("prefer-inline-type-export", () => {
  it("should have meta property", () => {
    expect(preferInlineTypeExport.meta).toBeDefined();
  });

  it("should have create method", () => {
    expect(typeof preferInlineTypeExport.create).toBe("function");
  });

  ruleTester.run("prefer-inline-type-export", preferInlineTypeExport, {
    valid: [
      {
        code: "export interface UserProps { name: string; }",
        name: "should allow inline exported interface",
      },
      {
        code: "export type UserId = string;",
        name: "should allow inline exported type alias",
      },
      {
        code: "interface InternalProps { name: string; }",
        name: "should allow non-exported interface",
      },
      {
        code: "type InternalId = string;",
        name: "should allow non-exported type alias",
      },
      {
        code: "const value = 1;\nexport { value };",
        name: "should allow separate export for non-type declarations",
      },
      {
        code: "function getValue() { return 1; }\nexport { getValue };",
        name: "should allow separate export for functions",
      },
      {
        code: "export type { UserProps } from './types';",
        name: "should allow re-export from another module",
      },
      {
        code: "export { something } from './module';",
        name: "should allow re-export of values from another module",
      },
    ],
    invalid: [
      {
        code: "interface UserProps { name: string; }\nexport type { UserProps };",
        name: "should reject separate export type for interface",
        errors: [{ messageId: "preferInlineExport", data: { name: "UserProps" } }],
        output: "export interface UserProps { name: string; }\n",
      },
      {
        code: "type UserId = string;\nexport type { UserId };",
        name: "should reject separate export type for type alias",
        errors: [{ messageId: "preferInlineExport", data: { name: "UserId" } }],
        output: "export type UserId = string;\n",
      },
      {
        code: "interface UserProps { name: string; }\nexport { UserProps };",
        name: "should reject separate export for interface without type keyword",
        errors: [{ messageId: "preferInlineExport", data: { name: "UserProps" } }],
        output: "export interface UserProps { name: string; }\n",
      },
      {
        code: "interface AProps { a: string; }\ninterface BProps { b: string; }\nexport type { AProps, BProps };",
        name: "should reject multiple types in separate export",
        errors: [
          { messageId: "preferInlineExport", data: { name: "AProps" } },
          { messageId: "preferInlineExport", data: { name: "BProps" } },
        ],
        output: [
          "export interface AProps { a: string; }\ninterface BProps { b: string; }\nexport type {  BProps };",
          "export interface AProps { a: string; }\nexport interface BProps { b: string; }\n",
        ],
      },
      {
        code: "type Status = 'active' | 'inactive';\nconst value = 1;\nexport type { Status };",
        name: "should reject separate export type for type alias with other declarations between",
        errors: [{ messageId: "preferInlineExport", data: { name: "Status" } }],
        output: "export type Status = 'active' | 'inactive';\nconst value = 1;\n",
      },
    ],
  });
});
