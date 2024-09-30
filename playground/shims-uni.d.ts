/// <reference types='@dcloudio/types' />
/// <reference types="vite/client" />

// declare module "@vue/runtime-core" {
//   type Hooks = App.AppInstance & Page.PageInstance;

//   interface ComponentCustomOptions extends Hooks {}
// }

declare module "*.vue" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}
