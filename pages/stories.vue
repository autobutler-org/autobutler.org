<template>
  <main class="page">
    <h1>Why would I need this?</h1>
    <p class="lede">Here's a few scenarios where Quark might be for you.</p>

    <div class="stories">
      <section class="story reveal">
        <h2>You have kids.</h2>
        <p>
          Did you know that photos of your kid posted on social media can feed a
          profile of them before they ever have an account of their own? That
          background info can be used to target them with ads later on. Public
          photos can also end up as AI training data, and cloud photo services
          may use stored photos to improve their AI features.
        </p>
      </section>

      <section class="story reveal">
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
      </section>

      <section class="story reveal">
        <h2>You want privacy to be the normal option.</h2>
        <p>
          It can feel like that ship has sailed - we gave our data away for
          free, and received convenience in return. But we don't believe you
          have to make that into a binary decision - you can protect your data,
          and still have the convenience of automatically backing up your photos
          and memories.
        </p>
      </section>
    </div>
  </main>
</template>

<script setup lang="ts">
useSeoMeta({
  title: "Stories — AutoButler",
  description:
    "Everyday reasons people choose privacy and data independence with Quark.",
  ogTitle: "Stories — AutoButler",
  ogDescription:
    "Everyday reasons people choose privacy and data independence with Quark.",
  ogType: "website",
});
</script>

<style scoped>
.stories {
  margin-top: 3.5rem;
  border-top: 1px solid var(--color-text-strong);
  counter-reset: story;
}

.story {
  padding: 2.5rem 0 1.25rem;
  border-bottom: 1px solid var(--color-border-strong);
  counter-increment: story;
}

.story::before {
  content: counter(story, decimal-leading-zero);
  display: block;
  margin-bottom: 1rem;
  font-family: var(--font-mono);
  font-size: var(--text-micro);
  letter-spacing: var(--tracking-wide);
  color: var(--color-text-muted);
}

.story h2 {
  margin-top: 0;
}

.story p {
  font-size: 1.0625rem;
  line-height: 1.7;
}
</style>
