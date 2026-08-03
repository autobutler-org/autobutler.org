import { computed, readonly } from "vue";
import packageJson from "../package.json";

// Module-level date captured once at build/server-start time.
// Using useRuntimeConfig or a build-time env var would be ideal, but
// simply reading from package.json is sufficient and deterministic —
// the version string is the same on server and client, so no hydration
// mismatch can occur from this composable.
const BUILD_VERSION = packageJson.version;

export const useVersion = () => {
  const displayVersion = computed(() => `v${BUILD_VERSION}`);

  return {
    version: readonly(computed(() => BUILD_VERSION)),
    displayVersion: readonly(displayVersion),
  };
};
