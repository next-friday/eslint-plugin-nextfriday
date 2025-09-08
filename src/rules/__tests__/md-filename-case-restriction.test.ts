import { RuleTester } from "@typescript-eslint/rule-tester";
import { afterAll, describe, it } from "@jest/globals";

import mdFilenameCaseRestriction from "../md-filename-case-restriction";

RuleTester.afterAll = afterAll;
RuleTester.it = it;
RuleTester.itOnly = it.only;
RuleTester.describe = describe;

const ruleTester = new RuleTester();

ruleTester.run("md-filename-case-restriction", mdFilenameCaseRestriction, {
  valid: [
    {
      name: "SNAKE_CASE filename",
      code: "const test = 'hello';",
      filename: "README.md",
    },
    {
      name: "SNAKE_CASE filename with underscores",
      code: "const test = 'hello';",
      filename: "CHANGELOG.md",
    },
    {
      name: "Non-markdown file should be ignored",
      code: "const test = 'hello';",
      filename: "test-file.js",
    },
    {
      name: "SNAKE_CASE with numbers",
      code: "const test = 'hello';",
      filename: "GUIDE_2024.md",
    },
    {
      name: "SNAKE_CASE with underscores",
      code: "const test = 'hello';",
      filename: "LICENSE_MIT.md",
    },
  ],
  invalid: [
    {
      name: "kebab-case filename should fail",
      code: "const test = 'hello';",
      filename: "test-file.md",
      errors: [
        {
          messageId: "invalidFilenameCase",
          data: { filename: "test-file" },
        },
      ],
    },
    {
      name: "PascalCase filename should fail",
      code: "const test = 'hello';",
      filename: "TestFile.md",
      errors: [
        {
          messageId: "invalidFilenameCase",
          data: { filename: "TestFile" },
        },
      ],
    },
    {
      name: "camelCase filename should fail",
      code: "const test = 'hello';",
      filename: "testFile.md",
      errors: [
        {
          messageId: "invalidFilenameCase",
          data: { filename: "testFile" },
        },
      ],
    },
    {
      name: "lowercase filename should fail",
      code: "const test = 'hello';",
      filename: "readme.md",
      errors: [
        {
          messageId: "invalidFilenameCase",
          data: { filename: "readme" },
        },
      ],
    },
    {
      name: "mixed case should fail",
      code: "const test = 'hello';",
      filename: "MyFile.md",
      errors: [
        {
          messageId: "invalidFilenameCase",
          data: { filename: "MyFile" },
        },
      ],
    },
  ],
});

describe("md-filename-case-restriction rule structure", () => {
  it("should have correct rule structure", () => {
    expect(mdFilenameCaseRestriction).toHaveProperty("meta");
    expect(mdFilenameCaseRestriction).toHaveProperty("create");
    expect(typeof mdFilenameCaseRestriction.create).toBe("function");
  });
});
