<template>
  <main class="page">
    <h1>Enterprise Solutions</h1>
    <p class="lede">
      Secure, reliable, and cost-effective storage solutions for churches and
      small businesses.
    </p>

    <section>
      <h2>Why Quark for Your Organization?</h2>
      <p>
        Stop paying monthly subscriptions for cloud storage. Quark gives you
        complete control over your data with a one-time purchase, ensuring
        privacy and long-term cost savings.
      </p>
    </section>

    <section>
      <h2>Perfect For</h2>
      <div class="use-cases">
        <div class="card use-case">
          <h3>Churches</h3>
          <ul>
            <li>Store sermons, recordings, and media archives</li>
            <li>
              Manage member directories and sensitive information securely
            </li>
            <li>Share resources across staff and ministry teams</li>
            <li>Keep financial records private and accessible</li>
          </ul>
        </div>
        <div class="card use-case">
          <h3>Small Businesses</h3>
          <ul>
            <li>Centralize company documents and files</li>
            <li>Backup customer data and business records</li>
            <li>Collaborate across teams without subscription fees</li>
            <li>Maintain compliance with data privacy regulations</li>
          </ul>
        </div>
      </div>
    </section>

    <section>
      <h2>Key Benefits</h2>
      <ul class="benefits-list">
        <li>
          <strong>One-Time Cost:</strong> No recurring monthly fees - pay once,
          own forever
        </li>
        <li>
          <strong>Data Privacy:</strong> Your data stays on your hardware, not
          in the cloud
        </li>
        <li>
          <strong>Easy Setup:</strong> Simple installation with minimal
          technical knowledge required
        </li>
        <li>
          <strong>Scalable Storage:</strong> Add more capacity as your
          organization grows
        </li>
        <li>
          <strong>Reliable Access:</strong> Local network access means faster
          speeds and no internet dependency
        </li>
      </ul>
    </section>

    <section class="card cta-section">
      <h2>Ready to Get Started?</h2>
      <p>
        Contact us to discuss how Quark can serve your organization's storage
        needs.
      </p>
      <div class="actions">
        <NuxtLink to="/contact" class="btn btn-primary">Contact Us</NuxtLink>
        <NuxtLink to="/waitlist" class="btn btn-secondary">Sign Up</NuxtLink>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
useSeoMeta({
  title: "Enterprise — AutoButler",
  description:
    "Quark for organizations. Private, self-hosted cloud storage with no vendor lock-in.",
  ogTitle: "Enterprise — AutoButler",
  ogDescription:
    "Quark for organizations. Private, self-hosted cloud storage with no vendor lock-in.",
  ogType: "website",
});
</script>

<style scoped>
.use-cases {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(16rem, 100%), 1fr));
  gap: 1rem;
  margin-top: 1.5rem;
}

.use-case h3 {
  margin-top: 0;
}

.use-case ul {
  margin-bottom: 0;
}

.benefits-list {
  padding: 0;
  border-top: 1px solid var(--color-text-strong);
  list-style: none;
}

.benefits-list li {
  margin: 0;
  padding: 0.85rem 0;
  border-bottom: 1px solid var(--color-border-strong);
}

.cta-section {
  margin-top: 3.5rem;
}

.cta-section h2 {
  margin-top: 0;
}

.cta-section .actions {
  margin-top: 1.5rem;
}
</style>
