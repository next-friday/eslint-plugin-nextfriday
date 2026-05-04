import { defineConfig } from "tsdown";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["cjs", "esm"],
  dts: true,
  outDir: "lib",
  clean: true,
  sourcemap: true,
  target: "es2020",
  outputOptions: { exports: "named" },
  outExtensions({ format }) {
    return format === "es" ? { js: ".js", dts: ".d.ts" } : { js: ".cjs", dts: ".d.cts" };
  },
});
