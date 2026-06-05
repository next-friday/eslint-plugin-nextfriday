import path from "node:path";

import { RuleTester } from "@typescript-eslint/rule-tester";
import { afterAll, describe, it } from "@jest/globals";

import rule from "../sort-object-properties";

RuleTester.afterAll = afterAll;
RuleTester.describe = describe;
RuleTester.it = it;

const ruleTester = new RuleTester({
  languageOptions: {
    parserOptions: {
      projectService: {
        allowDefaultProject: ["*.ts*"],
      },
      tsconfigRootDir: path.join(process.cwd(), "src/rules/__tests__/fixtures"),
    },
  },
});

ruleTester.run("sort-object-properties", rule, {
  valid: [
    {
      code: `
declare const description: string;
declare const submitLabel: string;
declare const title: string;
declare const onSubmit: () => void;

const value = { description, submitLabel, title, onSubmit };
`,
      name: "non-callable alphabetical then callable last",
    },
    {
      code: `
type Handler = (value: string) => void;
declare const description: string;
declare const onChange: Handler;

const value = { description, onChange };
`,
      name: "callable detected through a type alias",
    },
    {
      code: `
declare const a: string;

const value = { a };
`,
      name: "single property",
    },
  ],
  invalid: [
    {
      code: `
declare const description: string;
declare const onSubmit: () => void;
declare const title: string;

const value = { description, onSubmit, title };
`,
      output: `
declare const description: string;
declare const onSubmit: () => void;
declare const title: string;

const value = { description, title, onSubmit };
`,
      name: "callable property must move to the end",
      errors: [{ messageId: "unsortedObjectProperties" }],
    },
    {
      code: `
declare const title: string;
declare const description: string;

const value = { title, description };
`,
      output: `
declare const title: string;
declare const description: string;

const value = { description, title };
`,
      name: "non-callable properties must be alphabetical",
      errors: [{ messageId: "unsortedObjectProperties" }],
    },
  ],
});
