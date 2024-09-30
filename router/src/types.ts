export interface RouterLocation {
  url: string;
  query?: Record<string, any>;
}

export const NavigateNames = {
  navigateTo: "navigateTo",
  redirectTo: "redirectTo",
  switchTab: "switchTab",
  reLaunch: "reLaunch",
} as const;

export type NavigateNamesType =
  (typeof NavigateNames)[keyof typeof NavigateNames];

export type BeforeEachGuardsReturn =
  | boolean
  | (RouterLocation & {
      navigateName?: NavigateNamesType;
    });

export type onGuards<R = boolean | undefined> = (
  form: RouterLocation | null,
  to: RouterLocation
) => R | Promise<R>;

export type ToRouterPath<T extends Record<string, any> = {}> =
  | (RouterLocation & T)
  | string;
