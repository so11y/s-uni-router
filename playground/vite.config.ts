import { defineConfig } from "vite";
import uni from "@dcloudio/vite-plugin-uni";
import autoImport from "unplugin-auto-import/vite";
// import uniRouterLayout from "s-uni-router/plugin/cVite.cjs";
import unocss from "unocss/vite";
import path from "path";

export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        api: "modern-compiler",
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  plugins: [
    // uniRouterLayout(),
    uni(),
    unocss(),
    autoImport({
      imports: ["vue", "uni-app"],
      dts: true,
    }),
  ],
});
