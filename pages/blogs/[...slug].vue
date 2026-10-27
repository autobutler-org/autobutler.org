<template>
  <main class="page">
    <article v-if="page && !isError(page)" class="blog-post">
      <header class="post-header">
        <NuxtLink to="/blogs" class="back-link">← Back to Blog</NuxtLink>

        <div class="post-meta">
          <time v-if="page.date" :datetime="page.date">
            {{ formatDate(page.date) }}
          </time>
          <span v-if="page.author" class="author">by {{ page.author }}</span>
        </div>

        <h1>{{ page.title }}</h1>

        <p v-if="page.description" class="lede">
          {{ page.description }}
        </p>
      </header>

      <div class="post-content">
        <ContentRenderer v-if="page" :value="page" />
      </div>

      <footer class="post-footer">
        <div class="actions">
          <NuxtLink to="/" class="btn btn-primary">Learn More</NuxtLink>
          <NuxtLink to="/waitlist" class="btn btn-secondary"
            >Join The Waitlist</NuxtLink
          >
        </div>
      </footer>
    </article>

    <div v-else-if="page && isError(page)">
      <h1>Post Not Found</h1>
      <p>{{ page.message }}</p>
      <NuxtLink to="/blogs" class="back-link">← Back to Blog</NuxtLink>
    </div>

    <div v-else class="loading">
      <p>Loading...</p>
    </div>
  </main>
</template>

<script setup lang="ts">
import type { ContentCollectionItem } from "@nuxt/content";

interface BlogPost extends ContentCollectionItem {
  date?: string;
  author?: string;
}

interface ErrorPage {
  _error: boolean;
  message: string;
  code: string;
}

const route = useRoute();

const { data: page, error } = await useAsyncData(
  `blog-${route.path}`,
  async () => {
    try {
      const result = await queryCollection("content").path(route.path).first();
      return result as BlogPost;
    } catch (err) {
      return {
        _error: true,
        message: err instanceof Error ? err.message : String(err),
        code: "CONTENT_NOT_FOUND",
      } as ErrorPage;
    }
  },
);

if (error && error.value) {
  console.error("Error loading blog post:", error.value);
}

const isError = (p: BlogPost | ErrorPage | null): p is ErrorPage => {
  return p !== null && "_error" in p;
};

if (page.value && !isError(page.value)) {
  const post = page.value as BlogPost;
  const title = post.title || "AutoButler Blog";
  const description = post.description || "Read more on the AutoButler blog.";
  const url = `https://autobutler.org${route.path}`;

  useSeoMeta({
    title,
    ogTitle: title,
    description,
    ogDescription: description,
    ogUrl: url,
    ogType: "article",
    ogImage: "https://autobutler.org/og-image.png",
    twitterCard: "summary_large_image",
    twitterTitle: title,
    twitterDescription: description,
    twitterImage: "https://autobutler.org/og-image.png",
  });

  useHead({
    title: `${title} — AutoButler`,
    meta: [
      ...(post.date
        ? [{ property: "article:published_time", content: post.date }]
        : []),
      ...(post.author
        ? [{ property: "article:author", content: post.author }]
        : []),
    ],
  });
}

const formatDate = (dateString: string) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
</script>

<style scoped>
.back-link,
.post-meta {
  font-family: var(--font-mono);
  font-size: var(--text-micro);
  letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
  color: var(--color-text-muted);
}

.back-link {
  display: inline-block;
  margin-bottom: 2.5rem;
  text-decoration: none;
  transition: color var(--duration-fast) ease;
}

.back-link:hover {
  color: var(--color-text-strong);
}

.post-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem 1rem;
  margin-bottom: 1.25rem;
}

.post-header {
  margin-bottom: 3rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid var(--color-border);
}

.post-header .lede {
  margin-bottom: 0;
}

.post-footer {
  margin-top: 4rem;
  padding-top: 3rem;
  border-top: 1px solid var(--color-border);
}

.loading {
  color: var(--color-text-muted);
}
</style>
