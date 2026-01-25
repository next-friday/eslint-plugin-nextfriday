import { RuleTester } from "@typescript-eslint/rule-tester";
import { afterAll, describe, it } from "@jest/globals";

import jsxNewlineBetweenElements from "../jsx-newline-between-elements";

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

describe("jsx-newline-between-elements", () => {
  it("should be defined", () => {
    expect(jsxNewlineBetweenElements).toBeDefined();
  });

  ruleTester.run("jsx-newline-between-elements", jsxNewlineBetweenElements, {
    valid: [
      {
        code: `
          <div>
            <div>
              <HomeHighlight />
            </div>

            <div>
              <HomeEvents />
              <HomeNews />
              <HomeAbout />
            </div>
          </div>
        `,
        filename: "Component.tsx",
        name: "sibling multi-line divs with empty line between",
      },
      {
        code: `
          <ul>
            <li>Item 1</li>
            <li>Item 2</li>
            <li>Item 3</li>
          </ul>
        `,
        filename: "Component.tsx",
        name: "single-line list items do not require empty lines",
      },
      {
        code: `
          <ul>
            <li>
              Item 1
            </li>

            <li>
              Item 2
            </li>
          </ul>
        `,
        filename: "Component.tsx",
        name: "multi-line list items with empty lines",
      },
      {
        code: `
          <>
            <Header>content</Header>
            <Main>content</Main>
            <Footer>content</Footer>
          </>
        `,
        filename: "Component.tsx",
        name: "single-line elements in fragment do not require empty lines",
      },
      {
        code: `
          <div>
            <SingleChild>content</SingleChild>
          </div>
        `,
        filename: "Component.tsx",
        name: "single block child element",
      },
      {
        code: `
          <div>
            <p>Text content</p>
            <h3>Heading</h3>
          </div>
        `,
        filename: "Component.tsx",
        name: "single-line p and h3 do not require empty lines",
      },
      {
        code: `
          <div>
            <Header />
            <Main />
            <Footer />
          </div>
        `,
        filename: "Component.tsx",
        name: "self-closing components do not require empty lines",
      },
      {
        code: `
          <div>
            <p>
              Long text content
            </p>

            <h3>Heading</h3>
          </div>
        `,
        filename: "Component.tsx",
        name: "multi-line p followed by single-line h3 with empty line",
      },
    ],
    invalid: [
      {
        code: `
          <div>
            <div>
              <HomeHighlight />
            </div>
            <div>
              <HomeEvents />
            </div>
          </div>
        `,
        filename: "Component.tsx",
        errors: [
          {
            messageId: "requireNewline",
          },
        ],
        output: `
          <div>
            <div>
              <HomeHighlight />
            </div>

            <div>
              <HomeEvents />
            </div>
          </div>
        `,
        name: "missing empty line between multi-line sibling divs",
      },
      {
        code: `
          <ul>
            <li>
              Item 1
            </li>
            <li>
              Item 2
            </li>
            <li>
              Item 3
            </li>
          </ul>
        `,
        filename: "Component.tsx",
        errors: [
          {
            messageId: "requireNewline",
          },
          {
            messageId: "requireNewline",
          },
        ],
        output: `
          <ul>
            <li>
              Item 1
            </li>

            <li>
              Item 2
            </li>

            <li>
              Item 3
            </li>
          </ul>
        `,
        name: "missing empty lines between multi-line list items",
      },
      {
        code: `
          <>
            <Header>
              content
            </Header>
            <Main>
              content
            </Main>
          </>
        `,
        filename: "Component.tsx",
        errors: [
          {
            messageId: "requireNewline",
          },
        ],
        output: `
          <>
            <Header>
              content
            </Header>

            <Main>
              content
            </Main>
          </>
        `,
        name: "missing empty line between multi-line elements in fragment",
      },
      {
        code: `
          <div>
            <p>
              Text
            </p>
            <h3>Heading</h3>
          </div>
        `,
        filename: "Component.tsx",
        errors: [
          {
            messageId: "requireNewline",
          },
        ],
        output: `
          <div>
            <p>
              Text
            </p>

            <h3>Heading</h3>
          </div>
        `,
        name: "multi-line p before single-line h3 needs empty line",
      },
      {
        code: `
          <div>
            <First>a</First>
            <Second>
              b
            </Second>

            <Third>c</Third>
          </div>
        `,
        filename: "Component.tsx",
        errors: [
          {
            messageId: "requireNewline",
          },
        ],
        output: `
          <div>
            <First>a</First>

            <Second>
              b
            </Second>

            <Third>c</Third>
          </div>
        `,
        name: "single-line before multi-line needs empty line",
      },
    ],
  });
});
