## uniApp router 解决方案

1. 首屏首次拦截。
2. 路由全局拦截。

### 具体使用查看 playground 示例

```javascript
import { RouterGuards } from "s-uni-router";
const guards = new RouterGuards();
export default function () {
  guards.beforeEach((form, to) => {
    console.log(form, to);
    return new Promise((r, s) => {
      setTimeout(() => {
        r(true);
        //测试
      }, 5000);
    });
  });
}
```

```javascript
vite.config.js;
import { defineConfig } from "vite";
import uni from "@dcloudio/vite-plugin-uni";
import uniRouterLayout from "@s-router-uni/layout";

export default defineConfig({
  plugins: [uniRouterLayout(), uni()],
});
```

```html
App.vue
<script setup lang="ts">
  import { onRouterReady } from "s-uni-router";

  onRouterReady("/pages/index/index");
</script>
```

### useRouter Api说明[链接](https://github.com/so11y/s-uni-router/blob/master/router/src/routerHooks.ts#L39)
```javascript
push: (to: ToRouterPath<UniNamespace.NavigateToOptions>) => Promise<void> | undefined
pushTab: (to: ToRouterPath<UniNamespace.SwitchTabOptions>) => Promise<void> | undefined
replace: (to: ToRouterPath<UniNamespace.RedirectToOptions>) => Promise<void> | undefined
replaceAll: (to: ToRouterPath<UniNamespace.ReLaunchOptions>) => Promise<void> | undefined
back: (delta?: number) => Promise<any>

```

#### uniRouterLayout 参考 vite-plugin-uni-layouts 实现[https://github.dev/uni-helper/vite-plugin-uni-layouts]
