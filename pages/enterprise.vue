<template>
  <div class="landing-page">
    <div class="gradient-overlay" />
    <div class="card">
      <h1>Enterprise Solutions</h1>
      <p class="intro">
        Secure, reliable, and cost-effective storage solutions for churches and small businesses.
      </p>

      <section class="section">
        <h2>Why AutoButler for Your Organization?</h2>
        <p>
          Stop paying monthly subscriptions for cloud storage. AutoButler gives you complete control 
          over your data with a one-time purchase, ensuring privacy and long-term cost savings.
        </p>
      </section>

      <section class="section">
        <h2>Perfect For</h2>
        <div class="use-cases">
          <div class="use-case">
            <h3>Churches</h3>
            <ul>
              <li>Store sermons, recordings, and media archives</li>
              <li>Manage member directories and sensitive information securely</li>
              <li>Share resources across staff and ministry teams</li>
              <li>Keep financial records private and accessible</li>
            </ul>
          </div>
          <div class="use-case">
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

      <section class="section">
        <h2>Key Benefits</h2>
        <ul class="benefits-list">
          <li><strong>One-Time Cost:</strong> No recurring monthly fees - pay once, own forever</li>
          <li><strong>Data Privacy:</strong> Your data stays on your hardware, not in the cloud</li>
          <li><strong>Easy Setup:</strong> Simple installation with minimal technical knowledge required</li>
          <li><strong>Scalable Storage:</strong> Add more capacity as your organization grows</li>
          <li><strong>Reliable Access:</strong> Local network access means faster speeds and no internet dependency</li>
        </ul>
      </section>

      <section class="section cta-section">
        <h2>Ready to Get Started?</h2>
        <p>
          Contact us to discuss how AutoButler can serve your organization's storage needs.
        </p>
        <div class="cta-buttons">
          <NuxtLink to="/contact" class="btn btn-primary">Contact Us</NuxtLink>
          <a href="https://n0epk0-rt.myshopify.com/" target="_blank" class="btn btn-secondary">Purchase Now</a>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
// Component logic can be added here if needed
</script>

<style scoped>
@import "@/assets/css/common.css";

.card {
  max-width: 900px;
}

.intro {
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.85);
  margin-bottom: 2rem;
}

.section {
  margin: 2.5rem 0;
}

.section h2 {
  color: rgba(255, 255, 255, 0.95);
  margin-bottom: 1rem;
  font-size: 1.8rem;
}

.section h3 {
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 0.75rem;
  font-size: 1.4rem;
}

.section p {
  color: rgba(255, 255, 255, 0.85);
}

.use-cases {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 1.5rem;
}

.use-case {
  background: rgba(255, 255, 255, 0.05);
  padding: 1.5rem;
  border-radius: 8px;
  border-left: 4px solid #20b2aa;
  backdrop-filter: blur(5px);
}

.use-case ul {
  margin-top: 1rem;
  padding-left: 1.5rem;
  color: rgba(255, 255, 255, 0.85);
}

.use-case li {
  margin-bottom: 0.5rem;
  line-height: 1.6;
}

.benefits-list {
  list-style: none;
  padding-left: 0;
}

.benefits-list li {
  padding: 0.75rem 0;
  padding-left: 1.5rem;
  position: relative;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.85);
}

.benefits-list li::before {
  content: "✓";
  position: absolute;
  left: 0;
  color: #20b2aa;
  font-weight: bold;
  font-size: 1.2rem;
}

.benefits-list strong {
  color: rgba(255, 255, 255, 0.95);
}

.cta-section {
  text-align: center;
  margin-top: 3rem;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.cta-section p {
  color: rgba(255, 255, 255, 0.85);
}

.cta-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 1.5rem;
}

.btn-primary {
  background: #20b2aa;
  color: white;
  padding: 0.75rem 2rem;
  border-radius: 6px;
  text-decoration: none;
  font-weight: 600;
  transition: background 0.3s ease;
}

.btn-primary:hover {
  background: #1a8f89;
}

.btn-secondary {
  background: rgba(255, 255, 255, 0.1);
  color: white;
  padding: 0.75rem 2rem;
  border-radius: 6px;
  text-decoration: none;
  font-weight: 600;
  border: 2px solid rgba(255, 255, 255, 0.3);
  transition: all 0.3s ease;
  backdrop-filter: blur(5px);
}

.btn-secondary:hover {
  background: rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.5);
}

@media (max-width: 768px) {
  .use-cases {
    grid-template-columns: 1fr;
  }
  
  .cta-buttons {
    flex-direction: column;
    align-items: stretch;
  }
}
</style>
