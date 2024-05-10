import { defineConfig } from "tsup";

export default defineConfig({
  target: "es2020",
  entry: ["src/index.ts"],
  format: ["cjs", "esm"],
  splitting: false,
  sourcemap: true,
  clean: true,
  dts: true,
});
