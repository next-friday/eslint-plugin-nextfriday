import path from "node:path";

import { RuleTester } from "@typescript-eslint/rule-tester";
import { afterAll, describe, it } from "@jest/globals";

import rule from "../sort-dependency-array";

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

ruleTester.run("sort-dependency-array", rule, {
  valid: [
    {
      code: `
declare const description: string;
declare const onSubmit: () => void;
declare function useMemo<T>(factory: () => T, deps: unknown[]): T;

const value = useMemo(() => description, [description, onSubmit]);
`,
      name: "non-callable before callable in dependency array",
    },
    {
      code: `
declare const a: string;
declare function useCallback<T>(cb: T, deps: unknown[]): T;

const value = useCallback(() => a, [a]);
`,
      name: "single dependency",
    },
    {
      code: `
declare const b: string;
declare const a: string;

const value = notAHook(() => null, [b, a]);
`,
      name: "non-hook call is ignored",
    },
    {
      code: `
declare const props: { title: string; onSubmit: () => void };
declare function useMemo<T>(factory: () => T, deps: unknown[]): T;

const value = useMemo(() => props.title, [props.title, props.onSubmit]);
`,
      name: "member expression dependencies sorted with callable last",
    },
  ],
  invalid: [
    {
      code: `
declare const description: string;
declare const onSubmit: () => void;
declare const title: string;
declare function useEffect(effect: () => void, deps: unknown[]): void;

useEffect(() => {}, [description, onSubmit, title]);
`,
      output: `
declare const description: string;
declare const onSubmit: () => void;
declare const title: string;
declare function useEffect(effect: () => void, deps: unknown[]): void;

useEffect(() => {}, [description, title, onSubmit]);
`,
      errors: [{ messageId: "unsortedDependencyArray" }],
      name: "callable dependency must move to the end",
    },
    {
      code: `
declare const title: string;
declare const description: string;
declare function useMemo<T>(factory: () => T, deps: unknown[]): T;

const value = useMemo(() => title, [title, description]);
`,
      output: `
declare const title: string;
declare const description: string;
declare function useMemo<T>(factory: () => T, deps: unknown[]): T;

const value = useMemo(() => title, [description, title]);
`,
      errors: [{ messageId: "unsortedDependencyArray" }],
      name: "non-callable dependencies must be alphabetical",
    },
  ],
});
