import { RuleTester } from "@typescript-eslint/rule-tester";
import { afterAll, describe, it, expect } from "@jest/globals";
import parser from "@typescript-eslint/parser";

import booleanNamingPrefix from "../boolean-naming-prefix";

RuleTester.afterAll = afterAll;
RuleTester.it = it;
RuleTester.itOnly = it.only;
RuleTester.describe = describe;

const ruleTester = new RuleTester({
  languageOptions: {
    parser,
    parserOptions: {
      ecmaVersion: 2020,
      sourceType: "module",
    },
  },
});

describe("boolean-naming-prefix", () => {
  it("should be defined", () => {
    expect(booleanNamingPrefix).toBeDefined();
  });

  ruleTester.run("boolean-naming-prefix", booleanNamingPrefix, {
    valid: [
      {
        code: "const isValid = true;",
        name: "should allow is prefix with true",
      },
      {
        code: "const hasUser = false;",
        name: "should allow has prefix with false",
      },
      {
        code: "const canSubmit = true;",
        name: "should allow can prefix",
      },
      {
        code: "const shouldRender = false;",
        name: "should allow should prefix",
      },
      {
        code: "const didLoad = true;",
        name: "should allow did prefix",
      },
      {
        code: "const willUpdate = false;",
        name: "should allow will prefix",
      },
      {
        code: "const wasActive = true;",
        name: "should allow was prefix",
      },
      {
        code: "const areEqual = a === b;",
        name: "should allow are prefix with comparison",
      },
      {
        code: "const doesExist = items.length > 0;",
        name: "should allow does prefix",
      },
      {
        code: "const hadError = false;",
        name: "should allow had prefix",
      },
      {
        code: "const isActive: boolean = true;",
        name: "should allow is prefix with boolean type annotation",
      },
      {
        code: "const hasPermission: boolean = checkPermission();",
        name: "should allow has prefix with boolean type annotation",
      },
      {
        code: "const name = 'John';",
        name: "should allow non-boolean string variable",
      },
      {
        code: "const count = 42;",
        name: "should allow non-boolean number variable",
      },
      {
        code: "const user = getUser();",
        name: "should allow non-boolean function call result",
      },
      {
        code: "const items = [1, 2, 3];",
        name: "should allow non-boolean array",
      },
      {
        code: "const config = { key: 'value' };",
        name: "should allow non-boolean object",
      },
      {
        code: "const result = a + b;",
        name: "should allow arithmetic expression",
      },
      {
        code: "const message = 'Hello ' + name;",
        name: "should allow string concatenation",
      },
      {
        code: "function process(isEnabled: boolean) {}",
        name: "should allow function param with is prefix and boolean type",
      },
      {
        code: "const fn = (hasAccess: boolean) => {};",
        name: "should allow arrow function param with has prefix and boolean type",
      },
      {
        code: "function toggle(isActive = true) {}",
        name: "should allow default param with is prefix",
      },
      {
        code: "const fn = (canEdit = false) => {};",
        name: "should allow arrow function default param with can prefix",
      },
      {
        code: "const isEmpty = !items.length;",
        name: "should allow negation expression with is prefix",
      },
      {
        code: "const isEqual = a === b;",
        name: "should allow comparison expression with is prefix",
      },
      {
        code: "const hasItems = items && items.length > 0;",
        name: "should allow logical AND with has prefix",
      },
      {
        code: "const isValidOrDefault = valid || defaultValue;",
        name: "should allow logical OR with is prefix",
      },
      {
        code: "const isInArray = 'key' in obj;",
        name: "should allow in operator with is prefix",
      },
      {
        code: "const isInstance = obj instanceof MyClass;",
        name: "should allow instanceof with is prefix",
      },
    ],
    invalid: [
      {
        code: "const valid = true;",
        name: "should reject boolean literal without prefix",
        errors: [{ messageId: "missingPrefix", data: { name: "valid", suggestedName: "Valid" } }],
      },
      {
        code: "const user = false;",
        name: "should reject false literal without prefix",
        errors: [{ messageId: "missingPrefix", data: { name: "user", suggestedName: "User" } }],
      },
      {
        code: "const active: boolean = true;",
        name: "should reject boolean type annotation without prefix",
        errors: [{ messageId: "missingPrefix", data: { name: "active", suggestedName: "Active" } }],
      },
      {
        code: "const enabled: boolean = checkEnabled();",
        name: "should reject boolean type without prefix even with function call",
        errors: [{ messageId: "missingPrefix", data: { name: "enabled", suggestedName: "Enabled" } }],
      },
      {
        code: "const equal = a === b;",
        name: "should reject comparison expression without prefix",
        errors: [{ messageId: "missingPrefix", data: { name: "equal", suggestedName: "Equal" } }],
      },
      {
        code: "const different = a !== b;",
        name: "should reject not equal comparison without prefix",
        errors: [{ messageId: "missingPrefix", data: { name: "different", suggestedName: "Different" } }],
      },
      {
        code: "const bigger = a > b;",
        name: "should reject greater than without prefix",
        errors: [{ messageId: "missingPrefix", data: { name: "bigger", suggestedName: "Bigger" } }],
      },
      {
        code: "const smaller = a < b;",
        name: "should reject less than without prefix",
        errors: [{ messageId: "missingPrefix", data: { name: "smaller", suggestedName: "Smaller" } }],
      },
      {
        code: "const negated = !value;",
        name: "should reject negation without prefix",
        errors: [{ messageId: "missingPrefix", data: { name: "negated", suggestedName: "Negated" } }],
      },
      {
        code: "const combined = a && b;",
        name: "should reject logical AND without prefix",
        errors: [{ messageId: "missingPrefix", data: { name: "combined", suggestedName: "Combined" } }],
      },
      {
        code: "const either = a || b;",
        name: "should reject logical OR without prefix",
        errors: [{ messageId: "missingPrefix", data: { name: "either", suggestedName: "Either" } }],
      },
      {
        code: "const exists = 'key' in obj;",
        name: "should reject in operator without prefix",
        errors: [{ messageId: "missingPrefix", data: { name: "exists", suggestedName: "Exists" } }],
      },
      {
        code: "const instance = obj instanceof MyClass;",
        name: "should reject instanceof without prefix",
        errors: [{ messageId: "missingPrefix", data: { name: "instance", suggestedName: "Instance" } }],
      },
      {
        code: "function process(active: boolean) {}",
        name: "should reject function param without prefix",
        errors: [{ messageId: "missingPrefix", data: { name: "active", suggestedName: "Active" } }],
      },
      {
        code: "const fn = (enabled: boolean) => {};",
        name: "should reject arrow function param without prefix",
        errors: [{ messageId: "missingPrefix", data: { name: "enabled", suggestedName: "Enabled" } }],
      },
      {
        code: "function toggle(active = true) {}",
        name: "should reject default param without prefix",
        errors: [{ messageId: "missingPrefix", data: { name: "active", suggestedName: "Active" } }],
      },
      {
        code: "const fn = (enabled = false) => {};",
        name: "should reject arrow function default param without prefix",
        errors: [{ messageId: "missingPrefix", data: { name: "enabled", suggestedName: "Enabled" } }],
      },
      {
        code: "const fn = function(visible: boolean) {};",
        name: "should reject function expression param without prefix",
        errors: [{ messageId: "missingPrefix", data: { name: "visible", suggestedName: "Visible" } }],
      },
      {
        code: "const open = true;",
        name: "should reject open without prefix",
        errors: [{ messageId: "missingPrefix", data: { name: "open", suggestedName: "Open" } }],
      },
      {
        code: "const closed = false;",
        name: "should reject closed without prefix",
        errors: [{ messageId: "missingPrefix", data: { name: "closed", suggestedName: "Closed" } }],
      },
    ],
  });
});
