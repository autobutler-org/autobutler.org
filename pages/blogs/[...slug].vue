<template>
  <div class="blog-post-page">
    <PageContainer>
      <article class="blog-post">
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
          <ContentDoc />
        </div>
      </article>
    </PageContainer>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const { data: page } = await useAsyncData(`blog-${route.path}`, () =>
  queryContent(route.path).findOne()
)

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
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
  font-size: 3rem;
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

@media (max-width: 768px) {
  .post-header h1 {
    font-size: 2rem;
  }

  .description {
    font-size: 1rem;
  }
}
</style>
