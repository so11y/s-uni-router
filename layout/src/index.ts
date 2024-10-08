import { createFilter } from "vite";
import { getTarget, loadPagesJson, parseSFC, Page } from "./utils";
import MagicString from "magic-string";

class Context {
  pages: Page[] = [];

  async transform(code: string, path: string) {
    // no pages
    if (!this.pages?.length) this.pages = loadPagesJson();

    const page = getTarget(path, this.pages);

    // is not page
    if (!page) return;

    const sfc = await parseSFC(code);
    const ms = new MagicString(code);
    if (sfc.template?.loc.start.offset && sfc.template?.loc.end.offset) {
      ms.overwrite(
        sfc.template?.loc.start.offset,
        sfc.template?.loc.end.offset,
        `\n<layout-default-router-uni >${sfc.template.content}</layout-default-router-uni>\n`
      );
    }

    if (ms.hasChanged()) {
      const map = ms.generateMap({
        source: path,
        file: `${path}.map`,
        includeContent: true,
      });
      return {
        code: ms.toString(),
        map,
      };
    }
  }

  async importLayoutComponents(code: string, id: string) {
    const ms = new MagicString(code)
    const imports = [
      `import LayoutDefaultRouterUni from "s-uni-router/router/layouts/default.vue"`,
    ]
    const components = [
      `app.component("LayoutDefaultRouterUni", LayoutDefaultRouterUni);`
    ]
    ms.append(imports.join('\n'))
    ms.replace(
      /(createApp[\s\S]*?)(return\s{\s*app)/,
      `$1${components.join('')}$2`,
    )
    const map = ms.generateMap({
      source: id,
      file: `${id}.map`,
      includeContent: true,
    })
    code = ms.toString()
    return {
      code,
      map,
    }
  }
}

export function SRouterLayoutPlugin() {
  const context = new Context();
  return {
    name: "s-router-layout-plugin",
    enforce: "pre",
    transform(code: string, id: string) {

      const filter = createFilter(['src/main.(ts|js)', 'main.(ts|js)'])
      if (filter(id))
        return context.importLayoutComponents(code, id)

      return context.transform(code, id)
    },
  };
}

export default SRouterLayoutPlugin;
