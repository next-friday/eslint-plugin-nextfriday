import { describe, it, expect } from "@jest/globals";

import { getFileExtension, getBaseName, isJsFile, isJsxFile, isConfigFile } from "../utils";

describe("Utils", () => {
  describe("File utilities", () => {
    describe("getFileExtension", () => {
      it("should return file extension", () => {
        expect(getFileExtension("component.tsx")).toBe("tsx");
        expect(getFileExtension("utils.js")).toBe("js");
        expect(getFileExtension("style.css")).toBe("css");
        expect(getFileExtension("README.md")).toBe("md");
      });

      it("should return empty string for files without extension", () => {
        expect(getFileExtension("README")).toBe("");
        expect(getFileExtension("")).toBe("");
      });
    });

    describe("getBaseName", () => {
      it("should return base name without extension", () => {
        expect(getBaseName("component.tsx")).toBe("component");
        expect(getBaseName("utils.js")).toBe("utils");
        expect(getBaseName("/path/to/file.ts")).toBe("file");
      });

      it("should handle files without extension", () => {
        expect(getBaseName("README")).toBe("README");
        expect(getBaseName("/path/to/README")).toBe("README");
      });
    });

    describe("isJsFile", () => {
      it("should return true for JavaScript/TypeScript files", () => {
        expect(isJsFile("component.js")).toBe(true);
        expect(isJsFile("utils.ts")).toBe(true);
      });

      it("should return false for non-JS files", () => {
        expect(isJsFile("component.jsx")).toBe(false);
        expect(isJsFile("component.tsx")).toBe(false);
        expect(isJsFile("style.css")).toBe(false);
      });
    });

    describe("isJsxFile", () => {
      it("should return true for JSX files", () => {
        expect(isJsxFile("component.jsx")).toBe(true);
        expect(isJsxFile("component.tsx")).toBe(true);
      });

      it("should return false for non-JSX files", () => {
        expect(isJsxFile("component.js")).toBe(false);
        expect(isJsxFile("utils.ts")).toBe(false);
        expect(isJsxFile("style.css")).toBe(false);
      });
    });

    describe("isConfigFile", () => {
      it("should return true for config files", () => {
        expect(isConfigFile("webpack.config.js")).toBe(true);
        expect(isConfigFile("jest.config.ts")).toBe(true);
        expect(isConfigFile(".eslintrc.json")).toBe(true);
        expect(isConfigFile("test.setup.js")).toBe(true);
        expect(isConfigFile("app.spec.ts")).toBe(true);
        expect(isConfigFile("unit.test.js")).toBe(true);
      });

      it("should return false for non-config files", () => {
        expect(isConfigFile("component.js")).toBe(false);
        expect(isConfigFile("utils.ts")).toBe(false);
        expect(isConfigFile("README.md")).toBe(false);
      });
    });
  });
});
