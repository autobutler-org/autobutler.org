<template>
  <div class="blog-post-page">
    <PageContainer>
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

          <p v-if="page.description" class="description">
            {{ page.description }}
          </p>
        </header>

        <div class="post-content">
          <ContentRenderer v-if="page" :value="page" />
        </div>

        <footer class="post-footer">
          <div class="cta-buttons">
            <NuxtLink to="/" class="btn btn-primary">Learn More</NuxtLink>
            <NuxtLink to="/waitlist" class="btn btn-secondary">Join The Waitlist</NuxtLink>
          </div>
        </footer>
      </article>

      <div v-else-if="page && isError(page)" class="error">
        <h1>Post Not Found</h1>
        <p>{{ page.message }}</p>
        <NuxtLink to="/blogs" class="back-link">← Back to Blog</NuxtLink>
      </div>

      <div v-else class="loading">
        <p>Loading...</p>
      </div>
    </PageContainer>
  </div>
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
.blog-post-page {
  min-height: 100vh;
  padding: 2rem 0;
}

.blog-post {
  max-width: 800px;
  margin: 0 auto;
}

.back-link {
  display: inline-block;
  color: #20b2aa;
  text-decoration: none;
  margin-bottom: 2rem;
  font-weight: 600;
  transition: color 0.3s ease;
}

.back-link:hover {
  color: #1a8f89;
}

.post-header {
  margin-bottom: 3rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.post-meta {
  display: flex;
  gap: 1rem;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 1.5rem;
}

.author {
  color: #20b2aa;
}

.post-header h1 {
  font-family: var(--font-hero);
  font-size: 3.5rem;
  color: rgba(255, 255, 255, 0.95);
  line-height: 1.2;
  margin-bottom: 1rem;
}

.description {
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.75);
  line-height: 1.6;
}

.post-content {
  color: rgba(255, 255, 255, 0.85);
  line-height: 1.8;
}

.post-footer {
  margin-top: 4rem;
  padding-top: 3rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.cta-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.btn {
  padding: 0.875rem 2rem;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1rem;
  text-decoration: none;
  transition: all 0.3s ease;
  display: inline-block;
}

.btn-primary {
  background: linear-gradient(135deg, #20b2aa, #1a8f89);
  color: white;
}

.btn-primary:hover {
  background: linear-gradient(135deg, #1a8f89, #156d68);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(32, 178, 170, 0.3);
}

.btn-secondary {
  background: transparent;
  color: #20b2aa;
  border: 2px solid #20b2aa;
}

.btn-secondary:hover {
  background: rgba(32, 178, 170, 0.1);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(32, 178, 170, 0.2);
}

.loading {
  text-align: center;
  padding: 3rem;
  color: rgba(255, 255, 255, 0.6);
}

.error {
  text-align: center;
  padding: 3rem;
}

.error h1 {
  color: rgba(255, 255, 255, 0.95);
  margin-bottom: 1rem;
}

.error p {
  color: rgba(255, 255, 255, 0.75);
  margin-bottom: 2rem;
}

@media (max-width: 768px) {
  .post-header h1 {
    font-size: 2rem;
  }

  .description {
    font-size: 1rem;
  }

  .cta-buttons {
    flex-direction: column;
    align-items: stretch;
  }

  .btn {
    width: 100%;
    text-align: center;
  }
}
</style>
