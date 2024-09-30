import {
  onLoad as uniOnLoad,
  onShow as uniOnShow,
  onReady as uniOnReady,
} from "@dcloudio/uni-app";
import {
  onMounted as vueOnMounted,
  onBeforeMount as vueOnBeforeMounted,
} from "vue";

export { onBeforeUnmount, onUpdated } from "vue";

export function onLoad(callback: (v?: AnyObject) => void) {
  uniOnLoad(async (v?: AnyObject) => {
    await uni.$RouterGuards.withLaunchPromise;
    await callback(v);
  });
}

export function onShow(callback: () => void) {
  uniOnShow(async () => {
    await uni.$RouterGuards.withLaunchPromise;
    await callback();
  });
}

export function onReady(callback: () => void) {
  uniOnReady(async () => {
    await uni.$RouterGuards.withLaunchPromise;
    await callback();
  });
}

export function onMounted(callback: () => void) {
  vueOnMounted(async () => {
    await uni.$RouterGuards.withLaunchPromise;
    await callback();
  });
}

export function onBeforeMount(callback: () => void) {
  vueOnBeforeMounted(async () => {
    await uni.$RouterGuards.withLaunchPromise;
    await callback();
  });
}
