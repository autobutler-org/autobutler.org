<template>
  <main class="page page-wide">
    <header class="blogs-header">
      <h1>Blog</h1>
      <p class="lede">Updates, insights, and stories from our team</p>
    </header>

    <div v-if="articles && articles.length > 0" class="blog-list">
      <article
        v-for="article in articles"
        :key="article.path"
        class="blog-card reveal"
      >
        <NuxtLink :to="article.path" class="blog-link">
          <div class="blog-meta">
            <time
              v-if="article.date || article.meta?.date"
              :datetime="(article.date || article.meta?.date) as string"
              >{{
                formatDate((article.date || article.meta?.date) as string)
              }}</time
            >
            <span v-if="article.author || article.meta?.author" class="author"
              >by {{ article.author || article.meta?.author }}</span
            >
          </div>
          <div class="blog-body">
            <h2>{{ article.title }}</h2>
            <p class="description">{{ article.description }}</p>
            <span class="read-more">Read more →</span>
          </div>
        </NuxtLink>
      </article>
    </div>

    <div v-else class="no-posts">
      <p>No blog posts yet. Check back soon!</p>
    </div>
  </main>
</template>

<script setup lang="ts">
import type { ContentCollectionItem } from "@nuxt/content";

interface BlogPost extends ContentCollectionItem {
  date?: string;
  author?: string;
}

useSeoMeta({
  title: "Blog — AutoButler",
  description: "Updates, insights, and stories from our team.",
  ogTitle: "AutoButler Blog",
  ogDescription: "Updates, insights, and stories from our team.",
  ogType: "website",
  ogUrl: "https://autobutler.org/blogs",
  ogSiteName: "AutoButler",
  ogImage: "https://autobutler.org/og-image.png",
  twitterCard: "summary_large_image",
  twitterTitle: "AutoButler Blog",
  twitterDescription: "Updates, insights, and stories from our team.",
  twitterImage: "https://autobutler.org/og-image.png",
});

const { data: articles } = await useAsyncData("blogs", async () => {
  const allContent = await queryCollection("content").all();

  const blogs = allContent.filter(
    (item: BlogPost) =>
      item.path?.startsWith("/blogs/") && item.path !== "/blogs",
  ) as BlogPost[];

  // Sort by date - check both direct property and meta property
  blogs.sort((a: BlogPost, b: BlogPost) => {
    const dateA = new Date(a.date || (a.meta?.date as string) || 0).getTime();
    const dateB = new Date(b.date || (b.meta?.date as string) || 0).getTime();
    return dateB - dateA;
  });

  return blogs;
});

const formatDate = (dateString?: string) => {
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
.blogs-header {
  margin-bottom: 3.5rem;
}

.blog-list {
  border-top: 1px solid var(--color-text-strong);
}

.blog-card {
  border-bottom: 1px solid var(--color-border-strong);
}

/* A ruled index: mono date on the left, serif title and summary on the right. */
.blog-link {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 0.75rem;
  padding: 2rem 0;
  color: inherit;
  text-decoration: none;
}

.blog-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem 1rem;
  font-family: var(--font-mono);
  font-size: var(--text-micro);
  letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
  color: var(--color-text-muted);
}

.blog-card h2 {
  margin: 0 0 0.5rem;
  font-size: clamp(1.5rem, 1.2rem + 1.2vw, 2rem);
  transition: color var(--duration-fast) ease;
}

.description {
  max-width: var(--prose-width);
  margin: 0 0 1rem;
  color: var(--color-text-muted);
}

.read-more {
  font-size: var(--text-small);
  font-weight: 500;
  color: var(--color-text-strong);
}

.blog-link:hover .read-more {
  text-decoration: underline;
  text-underline-offset: 0.2em;
}

.no-posts {
  padding: 3rem 0;
  color: var(--color-text-muted);
}

@media (min-width: 960px) {
  .blog-link {
    grid-template-columns: 14rem minmax(0, 1fr);
    gap: 5rem;
  }

  .blog-meta {
    flex-direction: column;
    padding-top: 0.6rem;
  }
}
</style>
