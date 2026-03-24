<script setup lang="ts">
useSeoMeta({
  title: "Terms of Service — AutoButler",
  description:
    "AutoButler terms of service. Open-source, self-hosted, and straightforward.",
  ogTitle: "Terms of Service — AutoButler",
  ogDescription:
    "AutoButler terms of service. Open-source, self-hosted, and straightforward.",
  ogType: "website",
});
</script>

<template>
  <main class="terms-page">
    <div class="terms-content">
      <h1>Terms of Service</h1>
      <p class="last-updated">Last updated: March 2026</p>

      <div class="section plain-talk">
        <p>
          Plain talk first: AutoButler is open-source software you run on your
          own hardware. We don't host your data and we don't have a subscription
          to cancel. These terms are about using this website
          (autobutler.org) and the software we publish here.
        </p>
      </div>

      <div class="section">
        <h2>1. The Software</h2>
        <p>
          AutoButler is released under an open-source license. You can view the
          source code, fork it, run it, and modify it within the terms of that
          license. The license file in the repository is the authoritative
          source on what you can and can't do with the code.
        </p>
        <p>
          <a
            href="https://github.com/autobutler-org/autobutler"
            target="_blank"
            rel="noopener noreferrer"
            >View the source and license on GitHub →</a
          >
        </p>
      </div>

      <div class="section">
        <h2>2. This Website</h2>
        <p>
          Autobutler.org is an informational site. You're welcome to read it,
          link to it, and share it. We ask only that you don't use it in a way
          that's misleading (for example, implying we endorse something we
          don't).
        </p>
      </div>

      <div class="section">
        <h2>3. No Warranty</h2>
        <p>
          AutoButler is provided as-is. We do our best to make it reliable and
          secure, but we can't guarantee it will always work perfectly. You're
          running it on your own hardware — you're responsible for your own
          data and backups.
        </p>
        <p>
          To be explicit: we're not liable for data loss, downtime, or anything
          else that goes wrong when you use this software. Back up your data.
        </p>
      </div>

      <div class="section">
        <h2>4. Contributing</h2>
        <p>
          If you contribute to AutoButler — code, bug reports, documentation —
          thank you. By submitting a pull request you agree that your
          contribution can be included under the project's existing license.
        </p>
      </div>

      <div class="section">
        <h2>5. Changes</h2>
        <p>
          If we update these terms, we'll update the date above. We won't
          change them in ways that are sneaky or harmful — if something
          significant changes, we'll say so clearly.
        </p>
      </div>

      <div class="section">
        <h2>Questions?</h2>
        <p>
          If something here is unclear or you have questions, open an issue on
          <a
            href="https://github.com/autobutler-org/autobutler"
            target="_blank"
            rel="noopener noreferrer"
            >GitHub</a
          >.
        </p>
      </div>
    </div>
  </main>
</template>

<style scoped>
.terms-page {
  flex: 1;
  width: 100%;
  padding: 2rem 0;
}

.terms-content {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 1rem;
}

h1 {
  color: #4caf50;
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
}

.last-updated {
  color: #b0b0b0;
  font-style: italic;
  font-size: 0.9rem;
  margin-bottom: 2rem;
}

.section {
  margin-bottom: 2.5rem;
}

.plain-talk {
  background: rgba(76, 175, 80, 0.06);
  border-left: 3px solid #4caf50;
  padding: 1rem 1.25rem;
  border-radius: 0 6px 6px 0;
}

h2 {
  color: #81c784;
  font-size: 1.5rem;
  margin-bottom: 0.75rem;
}

p {
  color: #e0e0e0;
  line-height: 1.7;
  margin-bottom: 1rem;
}

a {
  color: #4caf50;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}
</style>
