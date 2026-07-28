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
      <h1>Terms and Conditions</h1>
      <p class="last-updated">Last updated: June 2026</p>

      <!-- 1 -->
      <div class="section">
        <h2>1. Personal Use</h2>
        <p>
          Autobutler is designed for personal use to manage and back up your
          own photos and files. You may not use the software to store or
          distribute content that violates applicable laws or the rights of
          others.
        </p>
      </div>

      <!-- 2 -->
      <div class="section">
        <h2>2. Your Data</h2>
        <p>
          You retain full ownership of all data stored through Autobutler. The
          app operates on your own hardware; no data is uploaded to third-party
          servers without your explicit action. You are solely responsible for
          the security and backup of your data.
        </p>
      </div>

      <!-- 3 -->
      <div class="section">
        <h2>3. No Warranty</h2>
        <p>
          Autobutler is provided "as is", without warranty of any kind, express
          or implied. The authors make no guarantees regarding uptime, data
          integrity, or fitness for a particular purpose. Use at your own risk.
        </p>
      </div>

      <!-- 4 -->
      <div class="section">
        <h2>4. Acceptable Use</h2>
        <p>
          You agree not to use Autobutler for any unlawful purpose, to attempt
          to gain unauthorised access to other systems, or to interfere with
          the operation of the software for other users. Because Autobutler
          runs entirely on your own hardware and we have no access to your data
          or device, these terms are legally binding but not technically
          enforceable by us. You are solely responsible for your own compliance
          with applicable laws.
        </p>
      </div>

      <!-- 5 -->
      <div class="section">
        <h2>5. Limitation of Liability</h2>
        <p>
          To the maximum extent permitted by law, the developers of Autobutler
          shall not be liable for any indirect, incidental, special, or
          consequential damages arising from your use of the software, even if
          advised of the possibility of such damages.
        </p>
      </div>

      <!-- 6 -->
      <div class="section">
        <h2>6. Changes to These Terms</h2>
        <p>
          We may update these Terms from time to time. Continued use of the
          application after changes are posted constitutes your acceptance of
          the revised Terms.
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
  color: #20b2aa;
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

h2 {
  color: #20b2aa;
  font-size: 1.4rem;
  margin-bottom: 0.75rem;
}

p {
  color: #e0e0e0;
  line-height: 1.7;
  margin-bottom: 1rem;
}

a {
  color: #20b2aa;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

strong {
  color: #ffffff;
}
</style>
