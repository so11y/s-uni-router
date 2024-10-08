## uniApp router 解决方案

1. 首屏首次拦截。
2. 路由全局拦截。

#### useRouter Api 说明[链接](https://github.com/so11y/s-uni-router/blob/master/router/src/routerHooks.ts#L39)

#### 界面生命周期请使用 s-uni-router 导出主要用于首次拦截[链接](https://github.com/so11y/s-uni-router/blob/master/router/src/onCycle.ts#L20)

```javascript
import { onLoad, onShow, onMounted } from "s-uni-router";
```

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

#### uniRouterLayout 参考 vite-plugin-uni-layouts 实现[https://github.dev/uni-helper/vite-plugin-uni-layouts]
