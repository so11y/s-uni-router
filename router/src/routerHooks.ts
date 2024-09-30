import { isString, last } from "lodash-es";
import {
  NavigateNames,
  NavigateNamesType,
  RouterLocation,
  ToRouterPath,
} from "./types";
import { RouterGuards } from "./guards";
import { onLoad } from "./onCycle";
import { ref } from "vue";
import { onLaunch } from "@dcloudio/uni-app";

const EMPTY_OPTIONS = {};

export function useGuardsImpl(): RouterGuards {
  return uni.$RouterGuards;
}

function useNavigateTo(
  to: ToRouterPath,
  navigateName: NavigateNamesType = NavigateNames.navigateTo
) {
  const routerGuards = useGuardsImpl();
  if (routerGuards.pending.value) {
    return;
  }

  if (isString(to)) {
    return routerGuards.navigate(
      {
        url: to,
      },
      navigateName
    );
  }
  return routerGuards.navigate(to, navigateName);
}

export function useRouter() {
  return {
    route: useRoute(),
    push: (to: ToRouterPath<UniNamespace.NavigateToOptions>) =>
      useNavigateTo(to),
    pushTab: (to: ToRouterPath<UniNamespace.SwitchTabOptions>) =>
      useNavigateTo(to, NavigateNames.switchTab),
    replace: (to: ToRouterPath<UniNamespace.RedirectToOptions>) =>
      useNavigateTo(to, NavigateNames.redirectTo),
    replaceAll: (to: ToRouterPath<UniNamespace.ReLaunchOptions>) =>
      useNavigateTo(to, NavigateNames.reLaunch),
    back: (delta = 1) =>
      uni.navigateBack({
        delta,
      }),
  };
}

export function useRoute() {
  const route = ref({} as RouterLocation);
  onLoad((options) => {
    const cuPage = last(getCurrentPages())!;
    useGuardsImpl().fixRouterPath(cuPage.route!);
    route.value.url = cuPage.route!;
    route.value.query = options ?? EMPTY_OPTIONS;
  });
  return route;
}

export function useGuardsReady() {
  return useGuardsImpl().isReady;
}

export function onRouterReady(to: string) {
  let resolve: (value: unknown) => void;
  uni.$RouterGuards.withLaunchPromise = new Promise((_resolve) => {
    resolve = _resolve;
  });
  onLaunch(() => {
    useGuardsImpl().ready(to).then(resolve);
  });
}
