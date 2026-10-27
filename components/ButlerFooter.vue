<template>
  <footer class="footer">
    <div class="inner">
      <div class="brand">
        <p class="wordmark">AutoButler</p>
        <p class="tagline">
          AutoButler is a company that makes products for humans.
        </p>
      </div>
      <nav aria-label="Footer">
        <a href="https://quark.autobutler.org">Quark</a>
        <a href="/privacy">Privacy</a>
        <a href="/terms">Terms</a>
        <a href="/contact">Contact</a>
        <a href="https://github.com/autobutler-org/quark">GitHub</a>
      </nav>
      <div class="legal">
        <p>© {{ currentYear }} AutoButler. All rights reserved.</p>
        <p>{{ displayVersion }}</p>
        <p class="soli-deo-gloria">Soli Deo Gloria</p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { useVersion } from "~/composables/useVersion";

const { displayVersion } = useVersion();
// useState serializes the value from SSR to the client, so both sides see the
// same year even across a year-rollover at midnight on New Year's Eve.
const currentYear = useState("footer-year", () => new Date().getFullYear());
</script>

<style scoped>
.footer {
  border-top: 1px solid var(--color-border);
}

.inner {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(16rem, 100%), 1fr));
  gap: 2.5rem var(--gutter);
  width: 100%;
  max-width: var(--content-width);
  margin: 0 auto;
  padding: 4rem var(--gutter) 3rem;
}

p {
  margin: 0;
}

.wordmark {
  font-family: var(--font-serif);
  font-size: 2rem;
  line-height: 1;
  letter-spacing: var(--tracking-tight);
  color: var(--color-text-strong);
}

.tagline {
  margin-top: 0.75rem;
  max-width: 18rem;
  font-size: var(--text-small);
  color: var(--color-text-muted);
}

nav {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.6rem;
  font-size: var(--text-small);
}

a {
  color: var(--color-text);
  text-decoration: none;
  transition: color var(--duration-fast) ease;
}

a:hover {
  color: var(--color-text-strong);
  text-decoration: underline;
  text-underline-offset: 0.2em;
}

.legal {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem 2rem;
  grid-column: 1 / -1;
  padding-top: 2rem;
  border-top: 1px solid var(--color-border);
  font-family: var(--font-mono);
  font-size: var(--text-micro);
  line-height: 1.6;
  color: var(--color-text-muted);
}

.soli-deo-gloria {
  font-family: var(--font-serif);
  font-size: var(--text-small);
  font-style: italic;
}
</style>
