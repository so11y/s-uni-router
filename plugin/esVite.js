import { getPackageInfoSync } from "local-pkg";
import { join } from "path";
import uniLayouts from "@uni-helper/vite-plugin-uni-layouts";

export default function () {
  const { rootPath } = getPackageInfoSync("s-uni-router");
  return {
    ...uniLayouts({
      layoutDir: join(rootPath, "layouts"),
    }),
    name: "s-uni-router-layout",
  };
}
