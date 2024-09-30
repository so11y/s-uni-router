import { hasLocationsRouter, normalizingPath } from "./share";
import {
  onGuards,
  BeforeEachGuardsReturn,
  NavigateNames,
  NavigateNamesType,
  RouterLocation,
} from "./types";
import { ref } from "vue";

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
  currentRouterPath = ref<string | null>(null);

  pending = ref(false);

  isReady = ref(false);

  constructor() {
    super();
    uni.$RouterGuards = this;
  }

  fixRouterPath(to: string) {
    if (this.isReady.value) {
      this.currentRouterPath.value = to;
    }
  }

  async navigate(
    to: RouterLocation,
    navigateName: NavigateNamesType = NavigateNames.navigateTo
  ) {
    try {
      this.pending.value = true;
      await this.navigateTemp(to, () => {
        return new Promise((r, s) => {
          (uni as any)[navigateName]({
            url: normalizingPath(to),
            success: r,
            fail: s,
          });
        });
      });
    } finally {
      this.pending.value = false;
    }
  }

  async navigateTemp(to: RouterLocation, callback?: () => void) {
    const formRouterPath = {
      url: this.currentRouterPath.value!,
    };
    for (const beforeGuards of this.event.beforeEach) {
      const hasNewRoute = await beforeGuards(formRouterPath, to);

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
      await afterGuards(formRouterPath, to);
    }
  }

  async ready(to: string) {
    await this.navigateTemp({
      url: to,
    });
    this.isReady.value = true;
    this.fixRouterPath(to);
  }
}
