import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["cjs", "esm"],
  dts: true,
  outDir: "lib",
  clean: true,
  sourcemap: true,
  target: "es2020",
  external: ["eslint-plugin-sonarjs", "eslint-plugin-unicorn"],
});
