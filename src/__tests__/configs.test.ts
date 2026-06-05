import { describe, it, expect } from "@jest/globals";

import { configs } from "..";

describe("ESLint Plugin Configs", () => {
  it("should export configs object", () => {
    expect(configs).toBeDefined();
    expect(typeof configs).toBe("object");
  });

  describe("Base configurations", () => {
    it("should have base configuration", () => {
      expect(configs).toHaveProperty("base");
      expect(typeof configs.base).toBe("object");
      expect(configs.base).toHaveProperty("rules");
    });

    it("should have base/recommended configuration", () => {
      expect(configs).toHaveProperty("base/recommended");
      expect(typeof configs["base/recommended"]).toBe("object");
      expect(configs["base/recommended"]).toHaveProperty("rules");
    });

    it("should have correct base rules", () => {
      const baseRules = configs.base.rules;
      expect(baseRules).toHaveProperty("nextfriday/no-emoji", "warn");
      expect(baseRules).toHaveProperty("nextfriday/prefer-destructuring-params", "warn");
      expect(baseRules).toHaveProperty("nextfriday/require-explicit-return-type", "warn");
      expect(baseRules).toHaveProperty("nextfriday/prefer-import-type", "warn");
      expect(baseRules).toHaveProperty("nextfriday/prefer-react-import-types", "warn");
      expect(baseRules).toHaveProperty("nextfriday/no-direct-date", "warn");
    });
  });

  describe("React configurations", () => {
    it("should have react configuration", () => {
      expect(configs).toHaveProperty("react");
      expect(typeof configs.react).toBe("object");
      expect(configs.react).toHaveProperty("rules");
    });

    it("should have react/recommended configuration", () => {
      expect(configs).toHaveProperty("react/recommended");
      expect(typeof configs["react/recommended"]).toBe("object");
      expect(configs["react/recommended"]).toHaveProperty("rules");
    });

    it("should have correct react rules", () => {
      const reactRules = configs.react.rules;
      expect(reactRules).toHaveProperty("nextfriday/no-emoji", "warn");
      expect(reactRules).toHaveProperty("nextfriday/prefer-interface-over-inline-types", "warn");
      expect(reactRules).toHaveProperty("nextfriday/enforce-readonly-component-props", "warn");
      expect(reactRules).toHaveProperty("nextfriday/prefer-destructuring-params", "warn");
      expect(reactRules).toHaveProperty("nextfriday/require-explicit-return-type", "warn");
      expect(reactRules).toHaveProperty("nextfriday/prefer-import-type", "warn");
      expect(reactRules).toHaveProperty("nextfriday/prefer-react-import-types", "warn");
    });
  });

  it("should set warn severity for regular configs and error for recommended configs", () => {
    const regularConfigs = [configs.base, configs.react];
    const recommendedConfigs = [configs["base/recommended"], configs["react/recommended"]];

    regularConfigs.forEach((config) => {
      Object.values(config.rules).forEach((severity) => {
        expect(severity).toBe("warn");
      });
    });

    recommendedConfigs.forEach((config) => {
      Object.values(config.rules).forEach((severity) => {
        expect(severity).toBe("error");
      });
    });
  });
});
