<template>
  <div class="blogs-page">
    <PageContainer>
      <div class="blogs-header">
        <h1>Blog</h1>
        <p class="subtitle">Updates, insights, and stories from the AutoButler team</p>
      </div>

      <div class="blog-list">
        <article
          v-for="article in articles"
          :key="article._path"
          class="blog-card"
        >
          <NuxtLink :to="article._path" class="blog-link">
            <div class="blog-meta">
              <time :datetime="article.date">{{ formatDate(article.date) }}</time>
              <span v-if="article.author" class="author">by {{ article.author }}</span>
            </div>
            <h2>{{ article.title }}</h2>
            <p class="description">{{ article.description }}</p>
            <span class="read-more">Read more →</span>
          </NuxtLink>
        </article>
      </div>

      <div v-if="!articles || articles.length === 0" class="no-posts">
        <p>No blog posts yet. Check back soon!</p>
      </div>
    </PageContainer>
  </div>
</template>

<script setup lang="ts">
const { data: articles } = await useAsyncData('blogs', () =>
  queryContent('/blogs')
    .sort({ date: -1 })
    .find()
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
.blogs-page {
  min-height: 100vh;
  padding: 2rem 0;
}

.blogs-header {
  text-align: center;
  margin-bottom: 3rem;
}

.blogs-header h1 {
  font-size: 3rem;
  color: rgba(255, 255, 255, 0.95);
  margin-bottom: 1rem;
}

.subtitle {
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.7);
}

.blog-list {
  display: grid;
  gap: 2rem;
  max-width: 900px;
  margin: 0 auto;
}

.blog-card {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 2rem;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.blog-card:hover {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(32, 178, 170, 0.5);
  transform: translateY(-2px);
}

.blog-link {
  text-decoration: none;
  color: inherit;
  display: block;
}

.blog-meta {
  display: flex;
  gap: 1rem;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 1rem;
}

.author {
  color: #20b2aa;
}

.blog-card h2 {
  font-size: 1.8rem;
  color: rgba(255, 255, 255, 0.95);
  margin-bottom: 0.75rem;
  line-height: 1.3;
}

.description {
  color: rgba(255, 255, 255, 0.75);
  line-height: 1.6;
  margin-bottom: 1rem;
}

.read-more {
  color: #20b2aa;
  font-weight: 600;
  display: inline-block;
}

.no-posts {
  text-align: center;
  padding: 3rem;
  color: rgba(255, 255, 255, 0.6);
}

@media (max-width: 768px) {
  .blogs-header h1 {
    font-size: 2rem;
  }

  .subtitle {
    font-size: 1rem;
  }

  .blog-card {
    padding: 1.5rem;
  }

  .blog-card h2 {
    font-size: 1.4rem;
  }
}
</style>
