#uniApp router 解决方案

1. 首屏首次拦截。
2. 路由全局拦截。

## 具体使用查看 playground 示例

```javascript
import { RouterGuards } from "s-uni-router";

const guards = new RouterGuards();

export default function () {
  guards.beforeEach((form, to) => {
    console.log(form, to);
    return new Promise((r, s) => {
      setTimeout(() => {
        r(true);
      }, 5000);
    });
  });
}
```

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