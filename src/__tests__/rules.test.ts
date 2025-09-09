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

  it("should have no-explicit-return-type rule", () => {
    expect(rules).toHaveProperty("no-explicit-return-type");
    expect(typeof rules["no-explicit-return-type"]).toBe("object");
    expect(rules["no-explicit-return-type"]).toHaveProperty("meta");
    expect(rules["no-explicit-return-type"]).toHaveProperty("create");
    expect(typeof rules["no-explicit-return-type"].create).toBe("function");
  });

  it("should have prefer-import-type rule", () => {
    expect(rules).toHaveProperty("prefer-import-type");
    expect(typeof rules["prefer-import-type"]).toBe("object");
    expect(rules["prefer-import-type"]).toHaveProperty("meta");
    expect(rules["prefer-import-type"]).toHaveProperty("create");
    expect(typeof rules["prefer-import-type"].create).toBe("function");
  });

  it("should have md-filename-case-restriction rule", () => {
    expect(rules).toHaveProperty("md-filename-case-restriction");
    expect(typeof rules["md-filename-case-restriction"]).toBe("object");
    expect(rules["md-filename-case-restriction"]).toHaveProperty("meta");
    expect(rules["md-filename-case-restriction"]).toHaveProperty("create");
    expect(typeof rules["md-filename-case-restriction"].create).toBe("function");
  });

  it("should have exactly 11 rules", () => {
    expect(Object.keys(rules)).toHaveLength(11);
  });

  it("should have correct rule names", () => {
    const ruleNames = Object.keys(rules);
    expect(ruleNames).toContain("no-emoji");
    expect(ruleNames).toContain("file-kebab-case");
    expect(ruleNames).toContain("jsx-pascal-case");
    expect(ruleNames).toContain("md-filename-case-restriction");
    expect(ruleNames).toContain("prefer-destructuring-params");
    expect(ruleNames).toContain("no-explicit-return-type");
    expect(ruleNames).toContain("prefer-import-type");
    expect(ruleNames).toContain("prefer-interface-over-inline-types");
    expect(ruleNames).toContain("prefer-react-import-types");
    expect(ruleNames).toContain("react-props-destructure");
    expect(ruleNames).toContain("enforce-readonly-component-props");
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
});
