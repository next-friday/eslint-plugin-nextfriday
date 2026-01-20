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

  it("should have exactly 23 rules", () => {
    expect(Object.keys(rules)).toHaveLength(23);
  });

  it("should have correct rule names", () => {
    const ruleNames = Object.keys(rules);
    expect(ruleNames).toContain("no-emoji");
    expect(ruleNames).toContain("file-kebab-case");
    expect(ruleNames).toContain("jsx-pascal-case");
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
    expect(ruleNames).toContain("enforce-readonly-component-props");
    expect(ruleNames).toContain("enforce-sorted-destructuring");
    expect(ruleNames).toContain("no-complex-inline-return");
    expect(ruleNames).toContain("no-logic-in-params");
    expect(ruleNames).toContain("no-env-fallback");
    expect(ruleNames).toContain("no-single-char-variables");
    expect(ruleNames).toContain("boolean-naming-prefix");
    expect(ruleNames).toContain("prefer-function-declaration");
    expect(ruleNames).toContain("no-direct-date");
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
});
