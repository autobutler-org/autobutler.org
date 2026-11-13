/**
 * Cookieless page view counting. Each view sends one request to the counter
 * with the host, path, and (on the first page only) the referring page without its query string. No
 * cookie, no storage, no identifier, and nothing at all when the visitor asks
 * not to be tracked or the page is not served from a production host.
 */
export const PAGE_VIEW_ENDPOINT =
  "https://goatcounter.cloud.autobutler.org/count";

export const COUNTED_HOSTS: readonly string[] = ["autobutler.org"];

export interface PrivacySignals {
  readonly hostname: string;
  readonly doNotTrack: string | null | undefined;
  readonly globalPrivacyControl: boolean | undefined;
}

export interface PageView {
  readonly host: string;
  readonly path: string;
  readonly referrer: string;
}

export const shouldCount = (signals: PrivacySignals): boolean =>
  COUNTED_HOSTS.includes(signals.hostname) &&
  signals.doNotTrack !== "1" &&
  signals.globalPrivacyControl !== true;

const outsideReferrer = (referrer: string, host: string): string[][] => {
  if (!referrer) return [];
  const url = new URL(referrer);
  return url.host === host ? [] : [["r", `${url.origin}${url.pathname}`]];
};

export const pageViewUrl = (view: PageView): string =>
  `${PAGE_VIEW_ENDPOINT}?${new URLSearchParams([
    ["p", `${view.host}${view.path}`],
    ...outsideReferrer(view.referrer, view.host),
  ])}`;
