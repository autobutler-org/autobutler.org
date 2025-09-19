<template>
  <div class="landing-page">
    <div class="gradient-overlay" />
    <div class="hero-section">
      <h1>Why would I need this?</h1>
      <p class="subtitle">
        Here's a few scenarios where AutoButler might be for you.
      </p>
    </div>

    <div class="content-wrapper">

      <div class="manifesto-section">
        <h2>You have kids.</h2>
        <p>
          Did you know that if you post a picture of your kid on Facebook, Meta
          starts creating a "shadow profile"? This is so that when that kid gets
          a Facebook account, Meta has background info to immediately start
          targeting that kid with ads. They also will use any public photo you
          post for AI training data. Google and Apple both use stored photos in
          their storage systems for AI training.
        </p>
      </div>

      <div class="manifesto-section">
        <h2>You don't like paying for things you own already.</h2>
        <p>
          Remember twenty years ago when buying a movie, music album, or video
          game meant.. you just owned it? Then iTunes came along and instead of
          selling us songs, they sold us licenses to listen to songs on our
          iPods. Microsoft eventually followed suit, and now if you want to use
          Microsoft Word, you have to buy it again every year. Our document
          editor and spreadsheets software are yours - you own that version,
          forever. Only pay for updates when you want them. It's more like
          owning the plumbing in your house than a Spotify subscription to your
          own data.
        </p>
      </div>

      <div class="manifesto-section">
        <h2>You believe there's a war for privacy worth fighting.</h2>
        <p>
          So much of this war seems lost - we gave Big Tech our data for free,
          while we recieved convenience. But we don't believe you have to make
          that into a binary decision - you can protect your data, and still
          have the convenience of automatically backing up your photos and
          memories.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Component logic can be added here if needed
</script>

<style>
@import "@/assets/css/common.css";

.landing-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: linear-gradient(135deg, #1a1a1a, #232323);
  padding: 20px;
  position: relative;
  overflow: hidden;
}

.hero-section {
  text-align: center;
  padding: 4rem 2rem;
  max-width: 800px;
  margin: 0 auto;
  width: 100%;
}

.content-wrapper {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
}

.hero-section h1 {
  font-size: 3.5rem;
  line-height: 1.2;
  margin-bottom: 1.5rem;
  background: linear-gradient(135deg, #ffffff, rgba(255, 255, 255, 0.8));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.subtitle {
  font-size: 1.5rem;
  margin-bottom: 2.5rem;
  opacity: 0.9;
}

.cta-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 2rem;
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  position: relative;
  z-index: 2;
  max-width: 1200px;
  margin: 0 auto;
}

.feature-card {
  padding: 2rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
  text-decoration: none;
  color: inherit;
  display: block;
  cursor: pointer;
  position: relative;
  z-index: 2;
}

.feature-card:hover {
  transform: translateY(-5px);
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(255, 255, 255, 0.2);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
}

.feature-card h3 {
  color: #fff;
  margin-bottom: 1rem;
  transition: color 0.3s ease;
}

.feature-card:hover h3 {
  color: #66d9ff;
}

.feature-card p {
  color: rgba(255, 255, 255, 0.8);
  transition: color 0.3s ease;
}

.feature-card:hover p {
  color: rgba(255, 255, 255, 0.9);
}

.manifesto-section {
  padding: 4rem 2rem;
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
}

.manifesto-section h2 {
  font-size: 2.5rem;
  margin-bottom: 2rem;
  background: linear-gradient(135deg, #ffffff, rgba(255, 255, 255, 0.8));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.cta-section {
  padding: 4rem 2rem;
  text-align: center;
  background: rgba(255, 255, 255, 0.03);
  width: 100%;
}

.highlight {
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 2rem;
  background: linear-gradient(135deg, #ffffff, rgba(255, 255, 255, 0.8));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.btn {
  font-size: 1.1rem;
  padding: 1rem 2rem;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.btn.primary {
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.2),
    rgba(255, 255, 255, 0.1)
  );
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.btn.primary:hover {
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.3),
    rgba(255, 255, 255, 0.2)
  );
  transform: translateY(-2px);
}

.btn.secondary {
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.btn.secondary:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: translateY(-2px);
}

@media (max-width: 768px) {
  .hero-section h1 {
    font-size: 2.5rem;
  }

  .subtitle {
    font-size: 1.2rem;
  }

  .cta-buttons {
    flex-direction: column;
  }

  .feature-grid {
    grid-template-columns: 1fr;
  }
}
</style>
