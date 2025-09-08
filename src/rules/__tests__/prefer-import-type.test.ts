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
      'import { ESLintUtils } from "@typescript-eslint/utils";',
      'import { ESLintUtils, type TSESTree } from "@typescript-eslint/utils";',
      'import { Geist, Geist_Mono } from "next/font/google";',
      'import { Inter } from "next/font/google";',
      'import { createRoot } from "react-dom/client";',
      'import { css } from "@emotion/react";',
      'import { useState, useEffect } from "react";',
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
