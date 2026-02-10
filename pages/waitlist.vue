<template>
  <div class="landing-page">
    <div class="gradient-overlay" />
    <div class="card waitlist-card">
      <h1>Sign Up for Early Access</h1>
      <p class="intro">
        We're still building AutoButler and planning to launch this summer! Sign up to be notified when we're ready to ship.
      </p>

      <div class="mailchimp-embed">
        <iframe
          src="http://eepurl.com/jy9kaA"
          width="100%"
          height="1200"
          frameborder="0"
          scrolling="auto"
          style="border: none;"
        ></iframe>
      </div>

      <div class="launch-info">
        <p>🚀 <strong>Coming Summer 2026</strong></p>
        <p>We're working hard to bring you the best self-hosted storage solution. Stay tuned!</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Mailchimp embed - no additional logic needed
</script>

<style scoped>
@import "@/assets/css/common.css";

.waitlist-card {
  max-width: 800px;
}

.intro {
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.85);
  margin-bottom: 2rem;
  text-align: center;
}

.mailchimp-embed {
  margin: 2rem 0;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  padding: 1rem;
  overflow: hidden;
  min-height: 1200px;
}

.mailchimp-embed iframe {
  display: block;
  margin: 0 auto;
  min-height: 1200px;
}

.launch-info {
  text-align: center;
  margin-top: 2rem;
  padding: 1.5rem;
  background: rgba(32, 178, 170, 0.1);
  border-radius: 8px;
  border: 1px solid rgba(32, 178, 170, 0.3);
}

.launch-info p {
  color: rgba(255, 255, 255, 0.85);
  margin: 0.5rem 0;
  font-size: 1rem;
}

.launch-info strong {
  color: #20b2aa;
  font-size: 1.2rem;
}

@media (max-width: 768px) {
  .waitlist-card {
    padding: 1.5rem;
  }
}
</style>
