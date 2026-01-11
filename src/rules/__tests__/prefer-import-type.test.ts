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
      ecmaFeatures: {
        jsx: true,
      },
    },
  },
});

describe("prefer-import-type", () => {
  it("should be defined", () => {
    expect(preferImportType).toBeDefined();
  });

  ruleTester.run("prefer-import-type", preferImportType, {
    valid: [
      'import "../components/Button.module.css";',
      'import "./globals.css";',
      'import "./styles.scss";',
      'import * as utils from "./utils";',
      'import Image from "next/image";',
      'import Link from "next/link";',
      'import React from "react";',
      'import React, { useState } from "react";',
      'import data from "./data.json";',
      'import dynamic from "next/dynamic";',
      'import icon from "./icon.svg";',
      'import logo from "./logo.png";',
      'import styled from "styled-components";',
      'import type { Component } from "react";',
      'import type { RuleContext } from "@typescript-eslint/utils";',
      'import type { TSESTree } from "@typescript-eslint/utils";',
      {
        code: 'import { ESLintUtils } from "@typescript-eslint/utils";\nconst rule = ESLintUtils.RuleCreator(() => "");',
        name: "should not flag value import used as value",
      },
      {
        code: 'import { ESLintUtils, type TSESTree } from "@typescript-eslint/utils";\nconst rule = ESLintUtils.RuleCreator(() => "");',
        name: "should not flag mixed import with type and value",
      },
      'import { Geist, Geist_Mono } from "next/font/google";',
      'import { Inter } from "next/font/google";',
      'import { createRoot } from "react-dom/client";',
      'import { css } from "@emotion/react";',
      {
        code: 'import { useState, useEffect } from "react";\nfunction App() { const [state, setState] = useState(0); }',
        name: "should not flag React hooks used as functions",
      },
      {
        code: 'import { composeRenderProps } from "react-aria-components";\nconst result = composeRenderProps(x, y);',
        name: "should not flag function used as runtime value",
      },
      {
        code: 'import { Button } from "./components";\nfunction App() { return <Button />; }',
        name: "should not flag component used in JSX",
      },
      {
        code: 'import { formatProps } from "./utils";\nconst formatted = formatProps(data);',
        name: "should not flag function with Props suffix used as value",
      },
      {
        code: 'import { MyComponentType } from "./components";\nfunction App() { return <MyComponentType />; }',
        name: "should not flag component with Type suffix used in JSX",
      },
      {
        code: 'import { config } from "./config";\nconst value = config.apiUrl;',
        name: "should not flag object used for member access",
      },
      {
        code: 'import { Factory } from "./factory";\nconst instance = new Factory();',
        name: "should not flag constructor usage",
      },
    ],
    invalid: [
      {
        code: 'import { TSESTree } from "@typescript-eslint/utils";\ntype Node = TSESTree.Node;',
        errors: [
          {
            messageId: "preferImportType",
            line: 1,
            column: 1,
          },
        ],
        output: 'import type { TSESTree } from "@typescript-eslint/utils";\ntype Node = TSESTree.Node;',
      },
      {
        code: 'import { RuleContext } from "@typescript-eslint/utils";\ntype Context = RuleContext;',
        errors: [
          {
            messageId: "preferImportType",
            line: 1,
            column: 1,
          },
        ],
        output: 'import type { RuleContext } from "@typescript-eslint/utils";\ntype Context = RuleContext;',
      },
      {
        code: 'import { Component } from "react";\ntype MyComponent = Component;',
        errors: [
          {
            messageId: "preferImportType",
            line: 1,
            column: 1,
          },
        ],
        output: 'import type { Component } from "react";\ntype MyComponent = Component;',
      },
      {
        code: 'import { UserProps } from "./types";\nconst user: UserProps = {};',
        errors: [
          {
            messageId: "preferImportType",
            line: 1,
            column: 1,
          },
        ],
        output: 'import type { UserProps } from "./types";\nconst user: UserProps = {};',
      },
      {
        code: 'import { CustomType } from "./types";\ninterface MyInterface extends CustomType {}',
        errors: [
          {
            messageId: "preferImportType",
            line: 1,
            column: 1,
          },
        ],
        output: 'import type { CustomType } from "./types";\ninterface MyInterface extends CustomType {}',
      },
    ],
  });
});
