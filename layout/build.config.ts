import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import nodeResolve from "@rollup/plugin-node-resolve";
import { resolve } from "path";

export default defineConfig({
  plugins: [dts(), nodeResolve()],
  build: {
    sourcemap: false,
    minify: false,
    lib: {
      name: "router-layout",
      entry: resolve("./src/index.ts"),
    },
    rollupOptions: {
      external: [
        "jsoncParser",
        "MagicString",
        "@vue/compiler-sfc",
        "vite",
        "node:path",
        "node:fs",
        "node:process",
      ],
      output: {
        dir: "./dist",
      },
    },
  },
});
