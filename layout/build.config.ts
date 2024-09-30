import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import { resolve } from "path";

export default defineConfig({
  plugins: [dts()],
  build: {
    sourcemap: false,
    minify: false,
    lib: {
      entry: resolve("./router/src/index.ts"),
      formats: ["es"],
    },
    rollupOptions: {
      external: ["vue", "@dcloudio/uni-app", "qs"],
      output: {
        dir: "./dist",
        entryFileNames: "s-uni-router.js",
      },
    },
  },
});
