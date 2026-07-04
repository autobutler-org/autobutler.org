<template>
  <PageContainer>
    <div class="community-page">
      <h1>Community</h1>
      <p>
        Join the AutoButler community! The primary hub is
        <a
          href="https://github.com/autobutler-org/autobutler"
          target="_blank"
          rel="noopener"
          >GitHub</a
        >, where you can open issues, start discussions, browse the source, and
        follow development. Have a bug or feature request? Head to
        <a
          href="https://github.com/autobutler-org/autobutler/issues"
          target="_blank"
          rel="noopener"
          >GitHub Issues</a
        >.
      </p>
    </div>
  </PageContainer>
</template>


<script setup lang="ts">
useSeoMeta({
  title: 'Community — AutoButler',
  description: 'Join the AutoButler community. Get help, share tips, and connect with others building a more private digital life.',
  ogTitle: 'Community — AutoButler',
  ogDescription: 'Join the AutoButler community. Get help, share tips, and connect with others building a more private digital life.',
  ogType: 'website',
});
</script>

<style scoped>
.community-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

.community-page h1 {
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  background: linear-gradient(135deg, #00ffaa, #00bbff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.community-page p {
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
}

.community-page a {
  color: #20b2aa;
  text-decoration: none;
  transition: color 0.2s ease;
}

.community-page a:hover {
  color: #1a8f89;
  text-decoration: underline;
}
</style>
