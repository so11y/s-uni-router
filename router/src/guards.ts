import { isEqual } from "lodash-es";
import { hasLocationsRouter, normalizingPath } from "./share";
import {
  onGuards,
  BeforeEachGuardsReturn,
  NavigateNames,
  NavigateNamesType,
  RouterLocation,
} from "./types";
import { ref, shallowRef, toRaw } from "vue";

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

  pendingLocation: null | string = null;

  constructor() {
    super();
    uni.$RouterGuards = this;
  }

  private updateRouter(to: RouterLocation) {
    const url = to.url.startsWith("/") ? to.url : `/${to.url}`;

    this.currentRouterPath.value = {
      url,
      query: to.query,
      fullPath: normalizingPath({
        url,
        query: to.query,
      }),
    };

    return this.currentRouterPath;
  }

  fixRouterPath() {
    if (this.isReady.value) {
      const [page] = getCurrentPages().slice(-1) as any;
      if (page) {
        this.updateRouter({
          url: page.route,
          query: page.options,
        });
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

    if (this.currentRouterPath.value?.fullPath === serializableFullPath) {
      return;
    }

    if (this.currentRouterPath.value?.fullPath === this.pendingLocation) {
      return;
    }

    this.pendingLocation = serializableFullPath;

    try {
      await this.navigateTemp(to, () => {
        return new Promise((r, s) => {
          (uni as any)[navigateName]({
            url: serializableFullPath,
            success: r,
            fail: s,
          });
        });
      });
    } finally {
      this.pendingLocation = null;
    }
  }

  async navigateTemp(to: RouterLocation, callback?: () => void) {
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

    const afterRouter = toRaw(this.currentRouterPath.value);

    this.updateRouter(to);

    for (const afterGuards of this.event.afterEach) {
      await afterGuards(afterRouter, to);
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
