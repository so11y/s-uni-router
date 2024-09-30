import { RouterLocation } from "./types";
import { isObject, isString } from "lodash-es";
import { stringify } from "qs";

export function normalizingPath(location: RouterLocation) {
  const { url, query } = location;
  if (!query) {
    return url;
  }
  const slashPad = url.startsWith("/") ? "" : "/";
  return `${slashPad}${url}?${stringify(query)}`;
}

export function hasLocationsRouter(v: any): v is RouterLocation {
  return isObject(v) && isString((v as any).url);
}
