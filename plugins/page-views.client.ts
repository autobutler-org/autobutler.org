import { pageViewUrl, shouldCount } from "~/utils/pageViews";

/**
 * Counts one page view per route, on the first load and on every client-side
 * navigation after it. See `utils/pageViews.ts` for what is and is not sent.
 */
export default defineNuxtPlugin((nuxtApp) => {
  const nav = navigator as Navigator & { globalPrivacyControl?: boolean };
  const counting = shouldCount({
    hostname: location.hostname,
    doNotTrack: nav.doNotTrack,
    globalPrivacyControl: nav.globalPrivacyControl,
  });
  if (!counting) return;

  const router = useRouter();
  const send = (path: string, referrer: string): boolean =>
    nav.sendBeacon(pageViewUrl({ host: location.host, path, referrer }));

  nuxtApp.hook("app:mounted", () => {
    send(router.currentRoute.value.path, document.referrer);
    router.afterEach((to, from) => {
      if (to.path !== from.path) send(to.path, "");
    });
  });
});
