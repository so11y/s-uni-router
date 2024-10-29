import { RouterLocation } from "./types";
import { isObject, isString } from "lodash-es";
import { stringify } from "qs";

export function normalizingPath(location: RouterLocation) {
  const { url, query } = location;
  const slashPad = url.startsWith("/") ? "" : "/";
  const slashPadUrl = `${slashPad}${url}`;
  if (!query) {
    return slashPadUrl;
  }
  const maybeQuery = stringify(query);

  if (maybeQuery) {
    return `${slashPadUrl}?${maybeQuery}`;
  }

  return slashPadUrl;
}

export function hasLocationsRouter(v: any): v is RouterLocation {
  return isObject(v) && isString((v as any).url);
}
