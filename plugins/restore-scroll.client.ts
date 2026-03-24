// Restore body overflow on every route change.
// The docs page disables body scroll for its custom scroll container — this
// ensures it's always restored when navigating away, even if the docs page's
// onUnmounted cleanup runs late.
export default defineNuxtPlugin((_nuxtApp) => {
  const router = useRouter();
  router.beforeEach(() => {
    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';
  });
});
