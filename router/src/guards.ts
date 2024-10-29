import { isEqual } from "lodash-es";
import { hasLocationsRouter, normalizingPath } from "./share";
import {
  onGuards,
  BeforeEachGuardsReturn,
  NavigateNames,
  NavigateNamesType,
  RouterLocation,
} from "./types";
import { ref, shallowRef } from "vue";

export class RouterGuardsEvent {
  event = {
    afterEach: [] as Array<onGuards>,
    beforeEach: [] as Array<onGuards<BeforeEachGuardsReturn>>,
  };

  beforeEach(callback: onGuards<BeforeEachGuardsReturn>) {
    const index = this.event.beforeEach.push(callback);
    return () => {
      this.event.beforeEach.splice(index, 1);
    };
  }

  afterEach(callback: onGuards) {
    const index = this.event.afterEach.push(callback);
    return () => {
      this.event.afterEach.splice(index, 1);
    };
  }
}

export class RouterGuards extends RouterGuardsEvent {
  currentRouterPath = shallowRef<
    (RouterLocation & { fullPath: string }) | null
  >(null);

  isReady = ref(false);

  constructor() {
    super();
    uni.$RouterGuards = this;
  }

  fixRouterPath() {
    if (this.isReady.value) {
      const [page] = getCurrentPages().slice(-1) as any;
      if (page) {
        const url = page.route.startsWith("/") ? page.route : `/${page.route}`;
        this.currentRouterPath.value = {
          url,
          query: page.options,
          fullPath: normalizingPath({
            url,
            query: page.options,
          }),
        };
      } else {
        this.currentRouterPath.value = null;
      }

      return this.currentRouterPath;
    }
  }

  async navigate(
    to: RouterLocation,
    navigateName: NavigateNamesType = NavigateNames.navigateTo
  ) {
    const serializableFullPath = normalizingPath(to);
    if (isEqual(this.currentRouterPath.value?.fullPath, serializableFullPath)) {
      return;
    }
    await this.navigateTemp(to, () => {
      return new Promise((r, s) => {
        (uni as any)[navigateName]({
          url: serializableFullPath,
          success: r,
          fail: s,
        });
      });
    });
  }

  async navigateTemp(to: RouterLocation, callback?: () => void) {
    // const formRouterPath = {
    //   url: this.currentRouterPath.value!,
    // };
    for (const beforeGuards of this.event.beforeEach) {
      const hasNewRoute = await beforeGuards(this.currentRouterPath.value!, to);

      if (hasNewRoute === false) {
        return;
      }

      if (hasLocationsRouter(hasNewRoute)) {
        await this.navigate(hasNewRoute, hasNewRoute.navigateName);
        return;
      }
    }

    await callback?.();

    for (const afterGuards of this.event.afterEach) {
      await afterGuards(this.currentRouterPath.value!, to);
    }
  }

  async ready(to: string) {
    await this.navigateTemp({
      url: to,
    });
    this.isReady.value = true;
    this.fixRouterPath();
  }
}
