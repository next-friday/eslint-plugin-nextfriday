import { describe, it, expect } from "@jest/globals";

import packageJson from "../../package.json" assert { type: "json" };
import meta from "../meta";

describe("ESLint Plugin Meta", () => {
  it("should export meta object", () => {
    expect(meta).toBeDefined();
    expect(typeof meta).toBe("object");
  });

  it("should have name property", () => {
    expect(meta).toHaveProperty("name");
    expect(typeof meta.name).toBe("string");
    expect(meta.name).toBe(packageJson.name);
  });

  it("should have version property", () => {
    expect(meta).toHaveProperty("version");
    expect(typeof meta.version).toBe("string");
    expect(meta.version).toBe(packageJson.version);
  });

  it("should have correct structure", () => {
    expect(Object.keys(meta)).toEqual(["name", "version"]);
  });
});
