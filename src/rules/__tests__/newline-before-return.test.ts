import { RuleTester } from "@typescript-eslint/rule-tester";
import { afterAll, describe, it } from "@jest/globals";

import newlineBeforeReturn from "../newline-before-return";

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

describe("newline-before-return", () => {
  it("should be defined", () => {
    expect(newlineBeforeReturn).toBeDefined();
  });

  ruleTester.run("newline-before-return", newlineBeforeReturn, {
    valid: [
      {
        code: `
function getValue() {
  return 1;
}
        `,
        name: "single return statement does not need blank line",
      },
      {
        code: `
function findChild(children, type) {
  const child = children.find((c) => c.type === type);

  return child ?? null;
}
        `,
        name: "return with blank line after variable declaration",
      },
      {
        code: `
function getNode(node) {
  if (node.type === "Expression") {
    return getNode(node.expression);
  }

  return node;
}
        `,
        name: "return with blank line after if statement",
      },
      {
        code: `
function process(data) {
  const result = transform(data);
  const validated = validate(result);

  return validated;
}
        `,
        name: "return with blank line after multiple statements",
      },
      {
        code: `
function earlyReturn(condition) {
  if (condition) {
    return true;
  }

  return false;
}
        `,
        name: "early return inside if block is valid",
      },
      {
        code: `
const fn = () => value;
        `,
        name: "arrow function with implicit return",
      },
      {
        code: `
const fn = () => {
  return value;
};
        `,
        name: "arrow function with single return statement",
      },
    ],
    invalid: [
      {
        code: `
function findChild(children, type) {
  const child = children.find((c) => c.type === type);
  return child ?? null;
}
        `,
        errors: [
          {
            messageId: "requireNewline",
          },
        ],
        output: `
function findChild(children, type) {
  const child = children.find((c) => c.type === type);

  return child ?? null;
}
        `,
        name: "missing blank line before return after variable",
      },
      {
        code: `
function getNode(node) {
  if (node.type === "Expression") {
    return getNode(node.expression);
  }
  return node;
}
        `,
        errors: [
          {
            messageId: "requireNewline",
          },
        ],
        output: `
function getNode(node) {
  if (node.type === "Expression") {
    return getNode(node.expression);
  }

  return node;
}
        `,
        name: "missing blank line before return after if statement",
      },
      {
        code: `
function calculate(a, b) {
  const sum = a + b;
  const product = a * b;
  return { sum, product };
}
        `,
        errors: [
          {
            messageId: "requireNewline",
          },
        ],
        output: `
function calculate(a, b) {
  const sum = a + b;
  const product = a * b;

  return { sum, product };
}
        `,
        name: "missing blank line before return after multiple statements",
      },
      {
        code: `
function process(items) {
  const filtered = items.filter(Boolean);
  const mapped = filtered.map((x) => x.value);
  const sorted = mapped.sort();
  return sorted;
}
        `,
        errors: [
          {
            messageId: "requireNewline",
          },
        ],
        output: `
function process(items) {
  const filtered = items.filter(Boolean);
  const mapped = filtered.map((x) => x.value);
  const sorted = mapped.sort();

  return sorted;
}
        `,
        name: "missing blank line before return after chain of operations",
      },
      {
        code: `
const fn = () => {
  const result = compute();
  return result;
};
        `,
        errors: [
          {
            messageId: "requireNewline",
          },
        ],
        output: `
const fn = () => {
  const result = compute();

  return result;
};
        `,
        name: "missing blank line in arrow function",
      },
    ],
  });
});
