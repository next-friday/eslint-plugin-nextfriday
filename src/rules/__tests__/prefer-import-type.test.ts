import { RuleTester } from "@typescript-eslint/rule-tester";
import { afterAll, describe, it } from "@jest/globals";

import preferImportType from "../prefer-import-type";

RuleTester.afterAll = afterAll;
RuleTester.it = it;
RuleTester.itOnly = it.only;
RuleTester.describe = describe;

const ruleTester = new RuleTester({
  languageOptions: {
    parserOptions: {
      ecmaVersion: 2020,
      sourceType: "module",
    },
  },
});

describe("prefer-import-type", () => {
  it("should be defined", () => {
    expect(preferImportType).toBeDefined();
  });

  ruleTester.run("prefer-import-type", preferImportType, {
    valid: [
      'import type { TSESTree } from "@typescript-eslint/utils";',
      'import type { RuleContext } from "@typescript-eslint/utils";',
      'import type { Component } from "react";',
      'import { ESLintUtils } from "@typescript-eslint/utils";',
      'import React from "react";',
      'import * as utils from "./utils";',
      'import { useState, useEffect } from "react";',
      'import { ESLintUtils, type TSESTree } from "@typescript-eslint/utils";',
    ],
    invalid: [
      {
        code: 'import { TSESTree } from "@typescript-eslint/utils";',
        errors: [
          {
            messageId: "preferImportType",
            line: 1,
            column: 1,
          },
        ],
        output: 'import type { TSESTree } from "@typescript-eslint/utils";',
      },
      {
        code: 'import { RuleContext } from "@typescript-eslint/utils";',
        errors: [
          {
            messageId: "preferImportType",
            line: 1,
            column: 1,
          },
        ],
        output: 'import type { RuleContext } from "@typescript-eslint/utils";',
      },
      {
        code: 'import { Component } from "react";',
        errors: [
          {
            messageId: "preferImportType",
            line: 1,
            column: 1,
          },
        ],
        output: 'import type { Component } from "react";',
      },
    ],
  });
});
