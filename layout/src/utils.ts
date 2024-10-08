import { existsSync, readFileSync } from "node:fs";
import path, { join, relative, resolve, sep } from "node:path";
import process from "node:process";
import type { SFCDescriptor } from "@vue/compiler-sfc";
import { parse as VueParser } from "@vue/compiler-sfc";
import { parse as jsonParse } from "jsonc-parser";
import { normalizePath } from "vite";

export interface Page {
  path: string;
  layout?: string
}

function slash(str: string) {
  return str.replace(/\\|\//g, sep);
}

export function getPageJsonPath(cwd = process.cwd()) {
  return existsSync(normalizePath(join(cwd, "src")))
    ? "src/pages.json"
    : "pages.json";
}

export function loadPagesJson(path = "src/pages.json", cwd = process.cwd()) {
  const pagesJsonRaw = readFileSync(resolve(cwd, path), {
    encoding: "utf-8",
  });

  const { pages = [], subPackages = [] } = jsonParse(pagesJsonRaw);

  return [
    ...pages,
    ...subPackages
      .map(({ pages = {}, root = "" }: any) => {
        return pages.map((page: any) => ({
          ...page,
          path: normalizePath(join(root, page.path)),
        }));
      })
      .flat(),
  ];
}

export function getTarget(
  resolvePath: string,
  pages: Page[] = [],
  cwd = process.cwd()
) {
  if (!(resolvePath.endsWith(".vue") || resolvePath.endsWith(".nvue")))
    return false;

  const hasSrcDir = slash(resolvePath).includes(join(cwd, "src"));

  const relativePath = relative(join(cwd, hasSrcDir ? "src" : ""), resolvePath);
  const fileWithoutExt = path.basename(
    relativePath,
    path.extname(relativePath)
  );
  const pathWithoutExt = normalizePath(
    path.join(path.dirname(relativePath), fileWithoutExt)
  );

  const page = pages.find((p) => normalizePath(p.path) === pathWithoutExt);
  if (page) {
    return page;
  }
  return false;
}

export async function parseSFC(code: string): Promise<SFCDescriptor> {
  try {
    return (
      VueParser(code, {
        pad: "space",
      }).descriptor ||
      // for @vue/compiler-sfc ^2.7
      (VueParser as any)({
        source: code,
      })
    );
  } catch {
    throw new Error(
      '[s-router-layout-plugin] Vue3\'s "@vue/compiler-sfc" is required.'
    );
  }
}
