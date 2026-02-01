import { describe, it, expect } from "@jest/globals";

import { rules } from "..";

describe("ESLint Plugin Rules", () => {
  it("should export rules object", () => {
    expect(rules).toBeDefined();
    expect(typeof rules).toBe("object");
  });

  it("should have no-emoji rule", () => {
    expect(rules).toHaveProperty("no-emoji");
    expect(typeof rules["no-emoji"]).toBe("object");
    expect(rules["no-emoji"]).toHaveProperty("meta");
    expect(rules["no-emoji"]).toHaveProperty("create");
    expect(typeof rules["no-emoji"].create).toBe("function");
  });

  it("should have file-kebab-case rule", () => {
    expect(rules).toHaveProperty("file-kebab-case");
    expect(typeof rules["file-kebab-case"]).toBe("object");
    expect(rules["file-kebab-case"]).toHaveProperty("meta");
    expect(rules["file-kebab-case"]).toHaveProperty("create");
    expect(typeof rules["file-kebab-case"].create).toBe("function");
  });

  it("should have jsx-pascal-case rule", () => {
    expect(rules).toHaveProperty("jsx-pascal-case");
    expect(typeof rules["jsx-pascal-case"]).toBe("object");
    expect(rules["jsx-pascal-case"]).toHaveProperty("meta");
    expect(rules["jsx-pascal-case"]).toHaveProperty("create");
    expect(typeof rules["jsx-pascal-case"].create).toBe("function");
  });

  it("should have prefer-destructuring-params rule", () => {
    expect(rules).toHaveProperty("prefer-destructuring-params");
    expect(typeof rules["prefer-destructuring-params"]).toBe("object");
    expect(rules["prefer-destructuring-params"]).toHaveProperty("meta");
    expect(rules["prefer-destructuring-params"]).toHaveProperty("create");
    expect(typeof rules["prefer-destructuring-params"].create).toBe("function");
  });

  it("should have require-explicit-return-type rule", () => {
    expect(rules).toHaveProperty("require-explicit-return-type");
    expect(typeof rules["require-explicit-return-type"]).toBe("object");
    expect(rules["require-explicit-return-type"]).toHaveProperty("meta");
    expect(rules["require-explicit-return-type"]).toHaveProperty("create");
    expect(typeof rules["require-explicit-return-type"].create).toBe("function");
  });

  it("should have prefer-import-type rule", () => {
    expect(rules).toHaveProperty("prefer-import-type");
    expect(typeof rules["prefer-import-type"]).toBe("object");
    expect(rules["prefer-import-type"]).toHaveProperty("meta");
    expect(rules["prefer-import-type"]).toHaveProperty("create");
    expect(typeof rules["prefer-import-type"].create).toBe("function");
  });

  it("should have prefer-named-param-types rule", () => {
    expect(rules).toHaveProperty("prefer-named-param-types");
    expect(typeof rules["prefer-named-param-types"]).toBe("object");
    expect(rules["prefer-named-param-types"]).toHaveProperty("meta");
    expect(rules["prefer-named-param-types"]).toHaveProperty("create");
    expect(typeof rules["prefer-named-param-types"].create).toBe("function");
  });

  it("should have md-filename-case-restriction rule", () => {
    expect(rules).toHaveProperty("md-filename-case-restriction");
    expect(typeof rules["md-filename-case-restriction"]).toBe("object");
    expect(rules["md-filename-case-restriction"]).toHaveProperty("meta");
    expect(rules["md-filename-case-restriction"]).toHaveProperty("create");
    expect(typeof rules["md-filename-case-restriction"].create).toBe("function");
  });

  it("should have no-complex-inline-return rule", () => {
    expect(rules).toHaveProperty("no-complex-inline-return");
    expect(typeof rules["no-complex-inline-return"]).toBe("object");
    expect(rules["no-complex-inline-return"]).toHaveProperty("meta");
    expect(rules["no-complex-inline-return"]).toHaveProperty("create");
    expect(typeof rules["no-complex-inline-return"].create).toBe("function");
  });

  it("should have no-logic-in-params rule", () => {
    expect(rules).toHaveProperty("no-logic-in-params");
    expect(typeof rules["no-logic-in-params"]).toBe("object");
    expect(rules["no-logic-in-params"]).toHaveProperty("meta");
    expect(rules["no-logic-in-params"]).toHaveProperty("create");
    expect(typeof rules["no-logic-in-params"].create).toBe("function");
  });

  it("should have no-env-fallback rule", () => {
    expect(rules).toHaveProperty("no-env-fallback");
    expect(typeof rules["no-env-fallback"]).toBe("object");
    expect(rules["no-env-fallback"]).toHaveProperty("meta");
    expect(rules["no-env-fallback"]).toHaveProperty("create");
    expect(typeof rules["no-env-fallback"].create).toBe("function");
  });

  it("should have exactly 42 rules", () => {
    expect(Object.keys(rules)).toHaveLength(42);
  });

  it("should have correct rule names", () => {
    const ruleNames = Object.keys(rules);
    expect(ruleNames).toContain("no-emoji");
    expect(ruleNames).toContain("file-kebab-case");
    expect(ruleNames).toContain("jsx-newline-between-elements");
    expect(ruleNames).toContain("jsx-no-inline-object-prop");
    expect(ruleNames).toContain("jsx-pascal-case");
    expect(ruleNames).toContain("jsx-require-suspense");
    expect(ruleNames).toContain("jsx-simple-props");
    expect(ruleNames).toContain("jsx-no-non-component-function");
    expect(ruleNames).toContain("jsx-no-variable-in-callback");
    expect(ruleNames).toContain("md-filename-case-restriction");
    expect(ruleNames).toContain("prefer-destructuring-params");
    expect(ruleNames).toContain("require-explicit-return-type");
    expect(ruleNames).toContain("prefer-import-type");
    expect(ruleNames).toContain("prefer-named-param-types");
    expect(ruleNames).toContain("prefer-interface-over-inline-types");
    expect(ruleNames).toContain("prefer-jsx-template-literals");
    expect(ruleNames).toContain("prefer-react-import-types");
    expect(ruleNames).toContain("react-props-destructure");
    expect(ruleNames).toContain("enforce-constant-case");
    expect(ruleNames).toContain("enforce-curly-newline");
    expect(ruleNames).toContain("enforce-hook-naming");
    expect(ruleNames).toContain("enforce-props-suffix");
    expect(ruleNames).toContain("enforce-readonly-component-props");
    expect(ruleNames).toContain("enforce-service-naming");
    expect(ruleNames).toContain("enforce-sorted-destructuring");
    expect(ruleNames).toContain("no-complex-inline-return");
    expect(ruleNames).toContain("no-logic-in-params");
    expect(ruleNames).toContain("no-nested-ternary");
    expect(ruleNames).toContain("no-env-fallback");
    expect(ruleNames).toContain("no-inline-default-export");
    expect(ruleNames).toContain("no-inline-nested-object");
    expect(ruleNames).toContain("no-lazy-identifiers");
    expect(ruleNames).toContain("no-relative-imports");
    expect(ruleNames).toContain("no-single-char-variables");
    expect(ruleNames).toContain("prefer-async-await");
    expect(ruleNames).toContain("newline-after-multiline-block");
    expect(ruleNames).toContain("newline-before-return");
    expect(ruleNames).toContain("boolean-naming-prefix");
    expect(ruleNames).toContain("prefer-function-declaration");
    expect(ruleNames).toContain("prefer-guard-clause");
    expect(ruleNames).toContain("no-direct-date");
    expect(ruleNames).toContain("nextjs-require-public-env");
  });

  it("should have prefer-interface-over-inline-types rule", () => {
    expect(rules).toHaveProperty("prefer-interface-over-inline-types");
    expect(typeof rules["prefer-interface-over-inline-types"]).toBe("object");
    expect(rules["prefer-interface-over-inline-types"]).toHaveProperty("meta");
    expect(rules["prefer-interface-over-inline-types"]).toHaveProperty("create");
    expect(typeof rules["prefer-interface-over-inline-types"].create).toBe("function");
  });

  it("should have prefer-react-import-types rule", () => {
    expect(rules).toHaveProperty("prefer-react-import-types");
    expect(typeof rules["prefer-react-import-types"]).toBe("object");
    expect(rules["prefer-react-import-types"]).toHaveProperty("meta");
    expect(rules["prefer-react-import-types"]).toHaveProperty("create");
    expect(typeof rules["prefer-react-import-types"].create).toBe("function");
  });

  it("should have prefer-jsx-template-literals rule", () => {
    expect(rules).toHaveProperty("prefer-jsx-template-literals");
    expect(typeof rules["prefer-jsx-template-literals"]).toBe("object");
    expect(rules["prefer-jsx-template-literals"]).toHaveProperty("meta");
    expect(rules["prefer-jsx-template-literals"]).toHaveProperty("create");
    expect(typeof rules["prefer-jsx-template-literals"].create).toBe("function");
  });

  it("should have react-props-destructure rule", () => {
    expect(rules).toHaveProperty("react-props-destructure");
    expect(typeof rules["react-props-destructure"]).toBe("object");
    expect(rules["react-props-destructure"]).toHaveProperty("meta");
    expect(rules["react-props-destructure"]).toHaveProperty("create");
    expect(typeof rules["react-props-destructure"].create).toBe("function");
  });

  it("should have enforce-readonly-component-props rule", () => {
    expect(rules).toHaveProperty("enforce-readonly-component-props");
    expect(typeof rules["enforce-readonly-component-props"]).toBe("object");
    expect(rules["enforce-readonly-component-props"]).toHaveProperty("meta");
    expect(rules["enforce-readonly-component-props"]).toHaveProperty("create");
    expect(typeof rules["enforce-readonly-component-props"].create).toBe("function");
  });

  it("should have jsx-no-non-component-function rule", () => {
    expect(rules).toHaveProperty("jsx-no-non-component-function");
    expect(typeof rules["jsx-no-non-component-function"]).toBe("object");
    expect(rules["jsx-no-non-component-function"]).toHaveProperty("meta");
    expect(rules["jsx-no-non-component-function"]).toHaveProperty("create");
    expect(typeof rules["jsx-no-non-component-function"].create).toBe("function");
  });

  it("should have enforce-sorted-destructuring rule", () => {
    expect(rules).toHaveProperty("enforce-sorted-destructuring");
    expect(typeof rules["enforce-sorted-destructuring"]).toBe("object");
    expect(rules["enforce-sorted-destructuring"]).toHaveProperty("meta");
    expect(rules["enforce-sorted-destructuring"]).toHaveProperty("create");
    expect(typeof rules["enforce-sorted-destructuring"].create).toBe("function");
  });

  it("should have jsx-no-variable-in-callback rule", () => {
    expect(rules).toHaveProperty("jsx-no-variable-in-callback");
    expect(typeof rules["jsx-no-variable-in-callback"]).toBe("object");
    expect(rules["jsx-no-variable-in-callback"]).toHaveProperty("meta");
    expect(rules["jsx-no-variable-in-callback"]).toHaveProperty("create");
    expect(typeof rules["jsx-no-variable-in-callback"].create).toBe("function");
  });

  it("should have no-lazy-identifiers rule", () => {
    expect(rules).toHaveProperty("no-lazy-identifiers");
    expect(typeof rules["no-lazy-identifiers"]).toBe("object");
    expect(rules["no-lazy-identifiers"]).toHaveProperty("meta");
    expect(rules["no-lazy-identifiers"]).toHaveProperty("create");
    expect(typeof rules["no-lazy-identifiers"].create).toBe("function");
  });

  it("should have no-single-char-variables rule", () => {
    expect(rules).toHaveProperty("no-single-char-variables");
    expect(typeof rules["no-single-char-variables"]).toBe("object");
    expect(rules["no-single-char-variables"]).toHaveProperty("meta");
    expect(rules["no-single-char-variables"]).toHaveProperty("create");
    expect(typeof rules["no-single-char-variables"].create).toBe("function");
  });

  it("should have boolean-naming-prefix rule", () => {
    expect(rules).toHaveProperty("boolean-naming-prefix");
    expect(typeof rules["boolean-naming-prefix"]).toBe("object");
    expect(rules["boolean-naming-prefix"]).toHaveProperty("meta");
    expect(rules["boolean-naming-prefix"]).toHaveProperty("create");
    expect(typeof rules["boolean-naming-prefix"].create).toBe("function");
  });

  it("should have prefer-function-declaration rule", () => {
    expect(rules).toHaveProperty("prefer-function-declaration");
    expect(typeof rules["prefer-function-declaration"]).toBe("object");
    expect(rules["prefer-function-declaration"]).toHaveProperty("meta");
    expect(rules["prefer-function-declaration"]).toHaveProperty("create");
    expect(typeof rules["prefer-function-declaration"].create).toBe("function");
  });

  it("should have no-direct-date rule", () => {
    expect(rules).toHaveProperty("no-direct-date");
    expect(typeof rules["no-direct-date"]).toBe("object");
    expect(rules["no-direct-date"]).toHaveProperty("meta");
    expect(rules["no-direct-date"]).toHaveProperty("create");
    expect(typeof rules["no-direct-date"].create).toBe("function");
  });

  it("should have no-inline-default-export rule", () => {
    expect(rules).toHaveProperty("no-inline-default-export");
    expect(typeof rules["no-inline-default-export"]).toBe("object");
    expect(rules["no-inline-default-export"]).toHaveProperty("meta");
    expect(rules["no-inline-default-export"]).toHaveProperty("create");
    expect(typeof rules["no-inline-default-export"].create).toBe("function");
  });

  it("should have jsx-newline-between-elements rule", () => {
    expect(rules).toHaveProperty("jsx-newline-between-elements");
    expect(typeof rules["jsx-newline-between-elements"]).toBe("object");
    expect(rules["jsx-newline-between-elements"]).toHaveProperty("meta");
    expect(rules["jsx-newline-between-elements"]).toHaveProperty("create");
    expect(typeof rules["jsx-newline-between-elements"].create).toBe("function");
  });

  it("should have newline-after-multiline-block rule", () => {
    expect(rules).toHaveProperty("newline-after-multiline-block");
    expect(typeof rules["newline-after-multiline-block"]).toBe("object");
    expect(rules["newline-after-multiline-block"]).toHaveProperty("meta");
    expect(rules["newline-after-multiline-block"]).toHaveProperty("create");
    expect(typeof rules["newline-after-multiline-block"].create).toBe("function");
  });

  it("should have no-inline-nested-object rule", () => {
    expect(rules).toHaveProperty("no-inline-nested-object");
    expect(typeof rules["no-inline-nested-object"]).toBe("object");
    expect(rules["no-inline-nested-object"]).toHaveProperty("meta");
    expect(rules["no-inline-nested-object"]).toHaveProperty("create");
    expect(typeof rules["no-inline-nested-object"].create).toBe("function");
  });

  it("should have newline-before-return rule", () => {
    expect(rules).toHaveProperty("newline-before-return");
    expect(typeof rules["newline-before-return"]).toBe("object");
    expect(rules["newline-before-return"]).toHaveProperty("meta");
    expect(rules["newline-before-return"]).toHaveProperty("create");
    expect(typeof rules["newline-before-return"].create).toBe("function");
  });

  it("should have no-relative-imports rule", () => {
    expect(rules).toHaveProperty("no-relative-imports");
    expect(typeof rules["no-relative-imports"]).toBe("object");
    expect(rules["no-relative-imports"]).toHaveProperty("meta");
    expect(rules["no-relative-imports"]).toHaveProperty("create");
    expect(typeof rules["no-relative-imports"].create).toBe("function");
  });

  it("should have enforce-service-naming rule", () => {
    expect(rules).toHaveProperty("enforce-service-naming");
    expect(typeof rules["enforce-service-naming"]).toBe("object");
    expect(rules["enforce-service-naming"]).toHaveProperty("meta");
    expect(rules["enforce-service-naming"]).toHaveProperty("create");
    expect(typeof rules["enforce-service-naming"].create).toBe("function");
  });

  it("should have enforce-hook-naming rule", () => {
    expect(rules).toHaveProperty("enforce-hook-naming");
    expect(typeof rules["enforce-hook-naming"]).toBe("object");
    expect(rules["enforce-hook-naming"]).toHaveProperty("meta");
    expect(rules["enforce-hook-naming"]).toHaveProperty("create");
    expect(typeof rules["enforce-hook-naming"].create).toBe("function");
  });

  it("should have enforce-props-suffix rule", () => {
    expect(rules).toHaveProperty("enforce-props-suffix");
    expect(typeof rules["enforce-props-suffix"]).toBe("object");
    expect(rules["enforce-props-suffix"]).toHaveProperty("meta");
    expect(rules["enforce-props-suffix"]).toHaveProperty("create");
    expect(typeof rules["enforce-props-suffix"].create).toBe("function");
  });

  it("should have jsx-no-inline-object-prop rule", () => {
    expect(rules).toHaveProperty("jsx-no-inline-object-prop");
    expect(typeof rules["jsx-no-inline-object-prop"]).toBe("object");
    expect(rules["jsx-no-inline-object-prop"]).toHaveProperty("meta");
    expect(rules["jsx-no-inline-object-prop"]).toHaveProperty("create");
    expect(typeof rules["jsx-no-inline-object-prop"].create).toBe("function");
  });

  it("should have jsx-require-suspense rule", () => {
    expect(rules).toHaveProperty("jsx-require-suspense");
    expect(typeof rules["jsx-require-suspense"]).toBe("object");
    expect(rules["jsx-require-suspense"]).toHaveProperty("meta");
    expect(rules["jsx-require-suspense"]).toHaveProperty("create");
    expect(typeof rules["jsx-require-suspense"].create).toBe("function");
  });

  it("should have enforce-constant-case rule", () => {
    expect(rules).toHaveProperty("enforce-constant-case");
    expect(typeof rules["enforce-constant-case"]).toBe("object");
    expect(rules["enforce-constant-case"]).toHaveProperty("meta");
    expect(rules["enforce-constant-case"]).toHaveProperty("create");
    expect(typeof rules["enforce-constant-case"].create).toBe("function");
  });

  it("should have prefer-async-await rule", () => {
    expect(rules).toHaveProperty("prefer-async-await");
    expect(typeof rules["prefer-async-await"]).toBe("object");
    expect(rules["prefer-async-await"]).toHaveProperty("meta");
    expect(rules["prefer-async-await"]).toHaveProperty("create");
    expect(typeof rules["prefer-async-await"].create).toBe("function");
  });

  it("should have nextjs-require-public-env rule", () => {
    expect(rules).toHaveProperty("nextjs-require-public-env");
    expect(typeof rules["nextjs-require-public-env"]).toBe("object");
    expect(rules["nextjs-require-public-env"]).toHaveProperty("meta");
    expect(rules["nextjs-require-public-env"]).toHaveProperty("create");
    expect(typeof rules["nextjs-require-public-env"].create).toBe("function");
  });

  it("should have enforce-curly-newline rule", () => {
    expect(rules).toHaveProperty("enforce-curly-newline");
    expect(typeof rules["enforce-curly-newline"]).toBe("object");
    expect(rules["enforce-curly-newline"]).toHaveProperty("meta");
    expect(rules["enforce-curly-newline"]).toHaveProperty("create");
    expect(typeof rules["enforce-curly-newline"].create).toBe("function");
  });

  it("should have no-nested-ternary rule", () => {
    expect(rules).toHaveProperty("no-nested-ternary");
    expect(typeof rules["no-nested-ternary"]).toBe("object");
    expect(rules["no-nested-ternary"]).toHaveProperty("meta");
    expect(rules["no-nested-ternary"]).toHaveProperty("create");
    expect(typeof rules["no-nested-ternary"].create).toBe("function");
  });

  it("should have prefer-guard-clause rule", () => {
    expect(rules).toHaveProperty("prefer-guard-clause");
    expect(typeof rules["prefer-guard-clause"]).toBe("object");
    expect(rules["prefer-guard-clause"]).toHaveProperty("meta");
    expect(rules["prefer-guard-clause"]).toHaveProperty("create");
    expect(typeof rules["prefer-guard-clause"].create).toBe("function");
  });
});
