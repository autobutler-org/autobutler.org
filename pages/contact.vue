<script setup lang="ts">
useSeoMeta({
  title: "Contact — AutoButler",
  description:
    "Get in touch with the AutoButler team via GitHub or email.",
  ogTitle: "Contact — AutoButler",
  ogDescription:
    "Get in touch with the AutoButler team via GitHub or email.",
  ogType: "website",
});
</script>

<template>
  <main class="contact-page">
    <div class="contact-content">
      <h1>Contact Us</h1>
      <p class="intro">
        Have a question, found a bug, or want to say hello? Reach us through
        one of the channels below.
      </p>

      <div class="channels">
        <a
          href="https://github.com/autobutler-org/autobutler/issues/new/choose"
          target="_blank"
          rel="noopener noreferrer"
          class="channel-card"
        >
          <div class="channel-icon github-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"
              />
            </svg>
          </div>
          <div class="channel-info">
            <h2>GitHub Issues</h2>
            <p>
              Found a bug or have a feature request? Open an issue on GitHub
              and we'll track it properly.
            </p>
            <span class="channel-link"
              >github.com/autobutler-org/autobutler →</span
            >
          </div>
        </a>

        <div class="channel-card email-card">
          <div class="channel-icon email-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
          </div>
          <div class="channel-info">
            <h2>Email</h2>
            <p>For private inquiries, reach us at:</p>
            <a href="mailto:support@autobutler.org" class="email-link"
              >support@autobutler.org</a
            >
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
.contact-page {
  flex: 1;
  width: 100%;
  padding: 2rem 0;
}

.contact-content {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 1rem;
}

h1 {
  color: #4caf50;
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.intro {
  color: #e0e0e0;
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 2.5rem;
}

.channels {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.channel-card {
  display: flex;
  align-items: flex-start;
  gap: 1.5rem;
  padding: 1.75rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 10px;
  text-decoration: none;
  color: inherit;
  transition:
    background 0.2s ease,
    border-color 0.2s ease;
}

a.channel-card:hover {
  background: rgba(76, 175, 80, 0.08);
  border-color: rgba(76, 175, 80, 0.3);
}

.channel-icon {
  flex-shrink: 0;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
}

.channel-icon svg {
  width: 28px;
  height: 28px;
}

.github-icon {
  background: rgba(255, 255, 255, 0.08);
  color: #e0e0e0;
}

.email-icon {
  background: rgba(76, 175, 80, 0.12);
  color: #4caf50;
}

.channel-info h2 {
  color: #e0e0e0;
  font-size: 1.2rem;
  margin-bottom: 0.4rem;
}

.channel-info p {
  color: rgba(224, 224, 224, 0.7);
  font-size: 0.95rem;
  line-height: 1.5;
  margin-bottom: 0.5rem;
}

.channel-link {
  font-size: 0.875rem;
  color: #4caf50;
}

.email-card {
  cursor: default;
}

.email-link {
  color: #4caf50;
  font-size: 1rem;
  text-decoration: none;
}

.email-link:hover {
  text-decoration: underline;
}
</style>
