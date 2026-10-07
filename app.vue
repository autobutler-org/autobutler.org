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
</script>

<style>
@import "@/assets/css/reset.css";
</style>
