<script setup lang="ts">
useSeoMeta({
  title: "Contact — AutoButler",
  description: "Get in touch with us via GitHub or email.",
  ogTitle: "Contact — AutoButler",
  ogDescription: "Get in touch with us via GitHub or email.",
  ogType: "website",
});
</script>

<template>
  <main class="page">
    <h1>Contact Us</h1>
    <p class="lede">
      Have a question, found a bug, or want to say hello? Reach us through one
      of the channels below.
    </p>

    <div class="channels">
      <a
        href="https://github.com/autobutler-org/quark/issues/new/choose"
        target="_blank"
        rel="noopener noreferrer"
        class="channel-card"
      >
        <div class="channel-icon">
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
            Found a bug or have a feature request? Open an issue on GitHub and
            we'll track it properly.
          </p>
          <span class="channel-link">github.com/autobutler-org/quark →</span>
        </div>
      </a>

      <div class="channel-card">
        <div class="channel-icon">
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
          <a href="mailto:support@autobutler.org">support@autobutler.org</a>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
.channels {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 2.5rem;
}

.channel-card {
  display: flex;
  align-items: flex-start;
  gap: 1.25rem;
  padding: var(--card-pad);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  background: var(--color-surface);
  color: inherit;
  text-decoration: none;
  transition:
    border-color var(--duration-fast) ease,
    box-shadow var(--duration-fast) ease;
}

a.channel-card:hover {
  border-color: var(--color-border-strong);
  box-shadow: var(--shadow-hover);
}

.channel-icon {
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  width: 2.75rem;
  height: 2.75rem;
  border-radius: var(--radius-md);
  background: var(--color-surface-sunken);
  color: var(--color-text-strong);
}

.channel-icon svg {
  width: 1.4rem;
  height: 1.4rem;
}

.channel-info h2 {
  margin: 0 0 0.35rem;
  font-family: var(--font-sans);
  font-size: 1.125rem;
  font-weight: 600;
  letter-spacing: var(--tracking-snug);
}

.channel-info p {
  margin: 0 0 0.75rem;
  color: var(--color-text-muted);
}

.channel-link {
  font-family: var(--font-mono);
  font-size: var(--text-small);
  color: var(--color-text-strong);
}
</style>
