import { RuleTester } from "@typescript-eslint/rule-tester";
import { afterAll, describe, it } from "@jest/globals";

import jsxNoNewlineSingleLineElements from "../jsx-no-newline-single-line-elements";

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

describe("jsx-no-newline-single-line-elements", () => {
  it("should have meta property", () => {
    expect(jsxNoNewlineSingleLineElements).toHaveProperty("meta");
  });

  it("should have create property", () => {
    expect(jsxNoNewlineSingleLineElements).toHaveProperty("create");
  });

  ruleTester.run("jsx-no-newline-single-line-elements", jsxNoNewlineSingleLineElements, {
    valid: [
      {
        code: `
          <div>
            <div>One</div>
            <div>Two</div>
          </div>
        `,
        name: "single-line siblings without empty line",
      },
      {
        code: `
          <div>
            <Header />
            <Main />
            <Footer />
          </div>
        `,
        name: "self-closing single-line siblings without empty line",
      },
      {
        code: `
          <div>
            <div>
              Multi
            </div>

            <div>
              Line
            </div>
          </div>
        `,
        name: "multi-line siblings with empty line (not this rule's concern)",
      },
      {
        code: `
          <div>
            <div>
              Multi
            </div>

            <span>Single</span>
          </div>
        `,
        name: "multi-line before single-line with empty line (mixed, not both single-line)",
      },
      {
        code: `
          <div>
            <span>Single</span>

            <div>
              Multi
            </div>
          </div>
        `,
        name: "single-line before multi-line with empty line (mixed, not both single-line)",
      },
      {
        code: `
          <>
            <li>Item 1</li>
            <li>Item 2</li>
            <li>Item 3</li>
          </>
        `,
        name: "single-line siblings in fragment without empty line",
      },
      {
        code: `
          <div>
            <Panel>One</Panel>
          </div>
        `,
        name: "single child element",
      },
    ],
    invalid: [
      {
        code: `
          <div>
            <div>One</div>

            <div>Two</div>
          </div>
        `,
        errors: [{ messageId: "forbidNewline" }],
        output: `
          <div>
            <div>One</div>
            <div>Two</div>
          </div>
        `,
        name: "single-line siblings with empty line between",
      },
      {
        code: `
          <div>
            <Header />

            <Footer />
          </div>
        `,
        errors: [{ messageId: "forbidNewline" }],
        output: `
          <div>
            <Header />
            <Footer />
          </div>
        `,
        name: "self-closing single-line siblings with empty line",
      },
      {
        code: `
          <>
            <li>Item 1</li>

            <li>Item 2</li>

            <li>Item 3</li>
          </>
        `,
        errors: [{ messageId: "forbidNewline" }, { messageId: "forbidNewline" }],
        output: `
          <>
            <li>Item 1</li>
            <li>Item 2</li>
            <li>Item 3</li>
          </>
        `,
        name: "multiple single-line siblings in fragment with empty lines",
      },
      {
        code: `
          <div>
            <Panel id="courses">Courses</Panel>

            <Panel id="news">News</Panel>
          </div>
        `,
        errors: [{ messageId: "forbidNewline" }],
        output: `
          <div>
            <Panel id="courses">Courses</Panel>
            <Panel id="news">News</Panel>
          </div>
        `,
        name: "single-line panels with empty line",
      },
    ],
  });
});
