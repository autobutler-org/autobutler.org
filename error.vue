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
    <main class="error-page">
      <p class="status">{{ error.statusCode }}</p>
      <h1>{{ title }}</h1>
      <p v-if="isNotFound">
        The page you're looking for doesn't exist or has moved.
      </p>
      <p v-else>Sorry about that. Please try again in a moment.</p>
      <a
        href="/"
        class="home-link"
        @click.prevent="clearError({ redirect: '/' })"
        >Back to the home page</a
      >
    </main>
  </NuxtLayout>
</template>

<style scoped>
.error-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 4rem 1rem;
  text-align: center;
}

.status {
  color: #81c784;
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

h1 {
  color: #4caf50;
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

p {
  color: #e0e0e0;
  line-height: 1.6;
  margin-bottom: 1rem;
}

.home-link {
  display: inline-block;
  margin-top: 1rem;
  font-weight: 600;
}
</style>
