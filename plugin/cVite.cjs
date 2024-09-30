const { getPackageInfoSync } = require("local-pkg");
const { join } = require("path");
const { VitePluginUniLayouts } = require("@uni-helper/vite-plugin-uni-layouts");

module.exports = function () {
  const { rootPath } = getPackageInfoSync("s-uni-router");
  return {
    ...VitePluginUniLayouts({
      layoutDir: join(rootPath, "layouts"),
    }),
    name: "s-uni-router-layout",
  };
};
