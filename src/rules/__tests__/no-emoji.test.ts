import { RuleTester } from "@typescript-eslint/rule-tester";
import { afterAll, describe, it } from "@jest/globals";

import noEmoji from "../no-emoji";

RuleTester.afterAll = afterAll;
RuleTester.describe = describe;
RuleTester.it = it;

const ruleTester = new RuleTester();

describe("no-emoji", () => {
  it("should have meta property", () => {
    expect(noEmoji.meta).toBeDefined();
  });

  it("should have create method", () => {
    expect(typeof noEmoji.create).toBe("function");
  });

  ruleTester.run("no-emoji", noEmoji, {
    valid: [
      {
        code: `const message = "Hello World";`,
        name: "should allow regular text without emoji",
      },
      {
        code: `console.log("Testing functionality");`,
        name: "should allow console logs without emoji",
      },
      {
        code: `function test() { return "success"; }`,
        name: "should allow functions without emoji",
      },
      {
        code: `// This is a comment without emoji`,
        name: "should allow comments without emoji",
      },
      {
        code: `const obj = { key: "value" };`,
        name: "should allow objects without emoji",
      },
    ],
    invalid: [
      {
        code: `const message = "Hello 😀 World";`,
        name: "should disallow string with grinning face emoji",
        errors: [
          {
            messageId: "noEmoji",
            line: 1,
            column: 24,
          },
        ],
      },
      {
        code: `console.log("Testing 🚀 functionality");`,
        name: "should disallow console log with rocket emoji",
        errors: [
          {
            messageId: "noEmoji",
            line: 1,
            column: 22,
          },
        ],
      },
      {
        code: `// This is a comment with 💯 emoji`,
        name: "should disallow comments with emoji",
        errors: [
          {
            messageId: "noEmoji",
            line: 1,
            column: 27,
          },
        ],
      },
      {
        code: `const obj = { key: "🔑 value" };`,
        name: "should disallow object values with emoji",
        errors: [
          {
            messageId: "noEmoji",
            line: 1,
            column: 21,
          },
        ],
      },
      {
        code: `const multiline = \`
        Line 1 without emoji
        Line 2 with 🎉 emoji
        Line 3 without emoji
      \`;`,
        name: "should disallow multiline strings with emoji",
        errors: [
          {
            messageId: "noEmoji",
            line: 3,
            column: 21,
          },
        ],
      },
      {
        code: `const multiple = "First 🚀 Second 🎯 Third";`,
        name: "should detect multiple emojis in single string",
        errors: [
          {
            messageId: "noEmoji",
            line: 1,
            column: 25,
          },
          {
            messageId: "noEmoji",
            line: 1,
            column: 35,
          },
        ],
      },
    ],
  });
});
