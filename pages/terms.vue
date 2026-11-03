<script setup lang="ts">
useSeoMeta({
  title: "Terms and Conditions — AutoButler / Quark",
  description:
    "Terms for Quark and the AutoButler website. Open-source, self-hosted, and straightforward.",
  ogTitle: "Terms and Conditions — AutoButler / Quark",
  ogDescription:
    "Terms for Quark and the AutoButler website. Open-source, self-hosted, and straightforward.",
  ogType: "website",
});
</script>

<template>
  <main class="page">
    <h1>Terms and Conditions</h1>
    <p class="last-updated">Last updated: October 27, 2026</p>

    <div>
      <h2>Definitions</h2>
      <p>
        <strong>AutoButler</strong> (or <strong>AutoButler LLC</strong>, "we",
        "us", "our") means the company that owns and sells Quark and operates
        autobutler.org.
      </p>
      <p>
        <strong>Quark</strong> means the personal cloud hardware product and
        related software experience sold or distributed by AutoButler.
      </p>
      <p>
        <strong>Software</strong> means the Quark application and related
        open-source components that run on your Quark device (or other supported
        hardware you control). The Software is not "the AutoButler application."
      </p>
      <p>
        <strong>Website</strong> means autobutler.org and related
        AutoButler-operated web properties (including waitlist and marketing
        pages).
      </p>
    </div>

    <div>
      <h2>1. Personal Use</h2>
      <p>
        Quark is designed for personal use to manage and back up your own photos
        and files. You may not use the Software to store or distribute content
        that violates applicable laws or the rights of others.
      </p>
    </div>

    <div>
      <h2>2. Your Data</h2>
      <p>
        You retain full ownership of all data you store with Quark. By default
        your content stays on hardware you control. Any optional backup or sync
        service we may offer later would require your explicit opt-in.
      </p>
      <p>
        Some optional features involve AutoButler services or third-party
        networks. Remote access is a service AutoButler runs that an admin on
        your Quark must turn on; when a direct connection isn't possible, its
        encrypted traffic may pass through third-party relay servers. Imports
        from third-party services you choose happen only when you take an
        explicit action. Our
        <NuxtLink to="/privacy">Privacy Policy</NuxtLink> explains what remote
        access shares. You are solely responsible for the security and backup of
        your data and for any third-party services you connect.
      </p>
    </div>

    <div>
      <h2>3. No Warranty</h2>
      <p>
        Quark and the Software are provided "as is", without warranty of any
        kind, express or implied. We make no guarantees regarding uptime, data
        integrity, or fitness for a particular purpose. Use at your own risk.
      </p>
      <p>
        Hardware purchase warranties, if any, will be stated separately at the
        point of sale or in the applicable product materials.
      </p>
    </div>

    <div>
      <h2>4. Acceptable Use</h2>
      <p>
        You agree not to use Quark for any unlawful purpose, to attempt to gain
        unauthorised access to other systems, or to interfere with the operation
        of the Software for other users. Because Quark primarily runs on
        hardware you control and we generally have no access to your device
        content, these terms are legally binding but often not technically
        enforceable by us against on-device activity. You are solely responsible
        for your own compliance with applicable laws.
      </p>
    </div>

    <div>
      <h2>5. Limitation of Liability</h2>
      <p>
        To the maximum extent permitted by law, AutoButler and the developers of
        Quark shall not be liable for any indirect, incidental, special, or
        consequential damages arising from your use of Quark, the Software, or
        the Website, even if advised of the possibility of such damages.
      </p>
    </div>

    <div>
      <h2>6. Website / Waitlist</h2>
      <p>
        If you join a waitlist, create an account on the Website, or contact us,
        you agree to provide accurate information and to receive operational
        messages related to that request (for example waitlist confirmation or
        support replies). Marketing emails, if any, will follow applicable
        consent and unsubscribe rules.
      </p>
    </div>

    <div>
      <h2>7. Changes to These Terms</h2>
      <p>
        We may update these Terms from time to time. For material changes, we
        will post an updated version on the Website (and in-app where
        applicable) with a revised "Last updated" date. Continued use of Quark
        or the Website after changes are posted constitutes acceptance of the
        revised Terms, except where applicable law requires a different process.
      </p>
    </div>

    <div>
      <h2>8. Contact</h2>
      <p>
        Questions about these Terms:
        <a href="mailto:support@autobutler.org">support@autobutler.org</a>.
        Software license details for open-source components:
        <a href="https://github.com/autobutler-org/quark" target="_blank"
          >https://github.com/autobutler-org/quark</a
        >.
      </p>
    </div>
  </main>
</template>

<style scoped>
.last-updated {
  font-family: var(--font-mono);
  font-size: var(--text-micro);
  letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
  color: var(--color-text-muted);
}
</style>
