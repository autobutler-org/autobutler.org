<template>
  <main class="page">
    <h1>Join the waitlist</h1>
    <p class="lede">
      Quark is AutoButler's private home cloud — a box you plug in so your files
      live at your place, not on someone else's servers. We're opening
      friends-and-family access in early 2027. Leave your email and we'll tell
      you when seats open.
    </p>

    <div class="launch-info">
      <p class="launch-label">Friends &amp; family — early 2027</p>
      <p>
        At-cost for friends and family first. Public later, when it's ready —
        not before.
      </p>
    </div>

    <div class="card mailchimp-embed">
      <iframe
        src="https://eepurl.com/jy9kaA"
        title="Waitlist sign-up form"
        width="100%"
        height="1200"
        frameborder="0"
        scrolling="auto"
        style="border: none"
      ></iframe>
    </div>
  </main>
</template>

<script setup lang="ts">
// Mailchimp embed - no additional logic needed
useSeoMeta({
  title: "Join the Waitlist — Quark",
  description:
    "Get early access to Quark by AutoButler. Join the waitlist for a private home cloud you run at your place.",
  ogTitle: "Join the Waitlist — Quark",
  ogDescription:
    "Get early access to Quark by AutoButler. Join the waitlist for a private home cloud you run at your place.",
  ogType: "website",
});
</script>

<style scoped>
.launch-info {
  margin-bottom: 2rem;
  padding: 1rem 1.25rem;
  border-radius: var(--radius-md);
  background: var(--pastel-yellow);
  color: var(--color-text-strong);
}

.launch-info p {
  margin: 0;
}

.launch-info .launch-label {
  margin-bottom: 0.35rem;
  font-family: var(--font-mono);
  font-size: var(--text-micro);
  font-weight: 500;
  letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
  color: var(--pastel-yellow-ink);
}

.mailchimp-embed {
  padding: 0;
  overflow: hidden;
}

.mailchimp-embed iframe {
  display: block;
  min-height: 1200px;
}
</style>
