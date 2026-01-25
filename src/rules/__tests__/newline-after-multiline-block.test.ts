import { RuleTester } from "@typescript-eslint/rule-tester";
import { afterAll, describe, it } from "@jest/globals";

import newlineAfterMultilineBlock from "../newline-after-multiline-block";

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

describe("newline-after-multiline-block", () => {
  it("should be defined", () => {
    expect(newlineAfterMultilineBlock).toBeDefined();
  });

  ruleTester.run("newline-after-multiline-block", newlineAfterMultilineBlock, {
    valid: [
      {
        code: `
const a = 1;
const b = 2;
const c = 3;
        `,
        name: "single-line statements do not require blank lines",
      },
      {
        code: `
const Screen = Object.assign(ScreenRoot, {
  displayName: "Screen",
  Aside: ScreenAside,
});

const foo = 1;
        `,
        name: "multi-line statement with blank line after",
      },
      {
        code: `
const config = {
  a: 1,
  b: 2,
};

const other = {
  c: 3,
};
        `,
        name: "two multi-line statements with blank line between",
      },
      {
        code: `
function foo() {
  return 1;
}

function bar() {
  return 2;
}
        `,
        name: "multi-line functions with blank line between",
      },
      {
        code: `
const Screen = Object.assign(ScreenRoot, { displayName: "Screen" });
const foo = 1;
        `,
        name: "single-line Object.assign followed by single-line statement",
      },
      {
        code: `
if (condition) {
  doSomething();
}

const result = getValue();
        `,
        name: "multi-line if statement with blank line after",
      },
      {
        code: `
const a = 1;

const b = {
  x: 1,
};
        `,
        name: "single-line before multi-line is fine",
      },
      {
        code: `
const obj = {
  a: 1,
};
        `,
        name: "single multi-line statement at end of program",
      },
      {
        code: `
function wrapper() {
  const obj = {
    a: 1,
  };

  return obj;
}
        `,
        name: "multi-line in block with blank line after",
      },
      {
        code: `
import {
  foo,
  bar,
} from "module-a";
import { baz } from "module-b";
        `,
        name: "multi-line import followed by single-line import (no blank line needed)",
      },
      {
        code: `
import {
  foo,
  bar,
} from "module-a";
import {
  baz,
  qux,
} from "module-b";
        `,
        name: "multi-line import followed by multi-line import (no blank line needed)",
      },
      {
        code: `
import { foo } from "module-a";
import {
  bar,
  baz,
} from "module-b";
import { qux } from "module-c";
        `,
        name: "imports in any order do not require blank lines between them",
      },
    ],
    invalid: [
      {
        code: `
const Screen = Object.assign(ScreenRoot, {
  displayName: "Screen",
  Aside: ScreenAside,
});
const foo = 1;
        `,
        errors: [
          {
            messageId: "requireNewline",
          },
        ],
        output: `
const Screen = Object.assign(ScreenRoot, {
  displayName: "Screen",
  Aside: ScreenAside,
});

const foo = 1;
        `,
        name: "missing blank line after multi-line Object.assign",
      },
      {
        code: `
const config = {
  a: 1,
  b: 2,
};
const other = {
  c: 3,
};
        `,
        errors: [
          {
            messageId: "requireNewline",
          },
        ],
        output: `
const config = {
  a: 1,
  b: 2,
};

const other = {
  c: 3,
};
        `,
        name: "missing blank line between multi-line object literals",
      },
      {
        code: `
function foo() {
  return 1;
}
function bar() {
  return 2;
}
        `,
        errors: [
          {
            messageId: "requireNewline",
          },
        ],
        output: `
function foo() {
  return 1;
}

function bar() {
  return 2;
}
        `,
        name: "missing blank line between multi-line functions",
      },
      {
        code: `
if (condition) {
  doSomething();
}
const result = getValue();
        `,
        errors: [
          {
            messageId: "requireNewline",
          },
        ],
        output: `
if (condition) {
  doSomething();
}

const result = getValue();
        `,
        name: "missing blank line after multi-line if statement",
      },
      {
        code: `
const a = {
  x: 1,
};
const b = {
  y: 2,
};
const c = {
  z: 3,
};
        `,
        errors: [
          {
            messageId: "requireNewline",
          },
          {
            messageId: "requireNewline",
          },
        ],
        output: `
const a = {
  x: 1,
};

const b = {
  y: 2,
};

const c = {
  z: 3,
};
        `,
        name: "multiple missing blank lines",
      },
      {
        code: `
function wrapper() {
  const obj = {
    a: 1,
  };
  return obj;
}
        `,
        errors: [
          {
            messageId: "requireNewline",
          },
        ],
        output: `
function wrapper() {
  const obj = {
    a: 1,
  };

  return obj;
}
        `,
        name: "missing blank line in block statement",
      },
      {
        code: `
for (let i = 0; i < 10; i++) {
  console.log(i);
}
const done = true;
        `,
        errors: [
          {
            messageId: "requireNewline",
          },
        ],
        output: `
for (let i = 0; i < 10; i++) {
  console.log(i);
}

const done = true;
        `,
        name: "missing blank line after multi-line for loop",
      },
      {
        code: `
try {
  doSomething();
} catch (e) {
  handleError(e);
}
const result = cleanup();
        `,
        errors: [
          {
            messageId: "requireNewline",
          },
        ],
        output: `
try {
  doSomething();
} catch (e) {
  handleError(e);
}

const result = cleanup();
        `,
        name: "missing blank line after try-catch",
      },
      {
        code: `
import {
  foo,
  bar,
} from "module-a";
const baz = 1;
        `,
        errors: [
          {
            messageId: "requireNewline",
          },
        ],
        output: `
import {
  foo,
  bar,
} from "module-a";

const baz = 1;
        `,
        name: "missing blank line after multi-line import followed by non-import",
      },
    ],
  });
});
