<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
const route = useRoute();

// Pages can still set their own ogUrl; this is the site-wide default.
useSeoMeta({
  ogUrl: () => `https://autobutler.org${route.path}`,
});

// One canonical per page so search engines index a single URL for each route.
useHead({
  link: [
    { rel: "canonical", href: () => `https://autobutler.org${route.path}` },
  ],
});
</script>
