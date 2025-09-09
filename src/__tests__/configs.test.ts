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

    it("should have correct base rules (without jsx-pascal-case)", () => {
      const baseRules = configs.base.rules;
      expect(baseRules).toHaveProperty("nextfriday/no-emoji", "warn");
      expect(baseRules).toHaveProperty("nextfriday/file-kebab-case", "warn");
      expect(baseRules).toHaveProperty("nextfriday/prefer-destructuring-params", "warn");
      expect(baseRules).toHaveProperty("nextfriday/no-explicit-return-type", "warn");
      expect(baseRules).toHaveProperty("nextfriday/prefer-import-type", "warn");
      expect(baseRules).toHaveProperty("nextfriday/prefer-react-import-types", "warn");
      expect(baseRules).not.toHaveProperty("nextfriday/jsx-pascal-case");
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

    it("should have correct react rules (including jsx-pascal-case)", () => {
      const reactRules = configs.react.rules;
      expect(reactRules).toHaveProperty("nextfriday/no-emoji", "warn");
      expect(reactRules).toHaveProperty("nextfriday/file-kebab-case", "warn");
      expect(reactRules).toHaveProperty("nextfriday/jsx-pascal-case", "warn");
      expect(reactRules).toHaveProperty("nextfriday/react-props-destructure", "warn");
      expect(reactRules).toHaveProperty("nextfriday/prefer-destructuring-params", "warn");
      expect(reactRules).toHaveProperty("nextfriday/no-explicit-return-type", "warn");
      expect(reactRules).toHaveProperty("nextfriday/prefer-import-type", "warn");
      expect(reactRules).toHaveProperty("nextfriday/prefer-react-import-types", "warn");
    });
  });

  describe("Next.js configurations", () => {
    it("should have nextjs configuration", () => {
      expect(configs).toHaveProperty("nextjs");
      expect(typeof configs.nextjs).toBe("object");
      expect(configs.nextjs).toHaveProperty("rules");
    });

    it("should have nextjs/recommended configuration", () => {
      expect(configs).toHaveProperty("nextjs/recommended");
      expect(typeof configs["nextjs/recommended"]).toBe("object");
      expect(configs["nextjs/recommended"]).toHaveProperty("rules");
    });

    it("should have correct nextjs rules (including jsx-pascal-case)", () => {
      const nextjsRules = configs.nextjs.rules;
      expect(nextjsRules).toHaveProperty("nextfriday/no-emoji", "warn");
      expect(nextjsRules).toHaveProperty("nextfriday/file-kebab-case", "warn");
      expect(nextjsRules).toHaveProperty("nextfriday/jsx-pascal-case", "warn");
      expect(nextjsRules).toHaveProperty("nextfriday/react-props-destructure", "warn");
      expect(nextjsRules).toHaveProperty("nextfriday/prefer-destructuring-params", "warn");
      expect(nextjsRules).toHaveProperty("nextfriday/no-explicit-return-type", "warn");
      expect(nextjsRules).toHaveProperty("nextfriday/prefer-import-type", "warn");
      expect(nextjsRules).toHaveProperty("nextfriday/prefer-react-import-types", "warn");
    });
  });

  it("should set warn severity for regular configs and error for recommended configs", () => {
    const regularConfigs = [configs.base, configs.react, configs.nextjs];
    const recommendedConfigs = [
      configs["base/recommended"],
      configs["react/recommended"],
      configs["nextjs/recommended"],
    ];

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
