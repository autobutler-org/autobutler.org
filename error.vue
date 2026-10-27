<script setup lang="ts">
import type { NuxtError } from "#app";

const props = defineProps<{ error: NuxtError }>();

const isNotFound = computed(() => props.error.statusCode === 404);
const title = computed(() =>
  isNotFound.value ? "Page not found" : "Something went wrong",
);

useSeoMeta({
  title: () => `${title.value} — AutoButler`,
  robots: "noindex",
});
</script>

<template>
  <NuxtLayout>
    <main class="page">
      <p class="eyebrow">Error {{ error.statusCode }}</p>
      <h1>{{ title }}</h1>
      <p v-if="isNotFound">
        The page you're looking for doesn't exist or has moved.
      </p>
      <p v-else>Sorry about that. Please try again in a moment.</p>
      <a
        href="/"
        class="btn btn-primary"
        @click.prevent="clearError({ redirect: '/' })"
        >Back to the home page</a
      >
    </main>
  </NuxtLayout>
</template>

<style scoped>
.btn {
  margin-top: 1rem;
}
</style>
