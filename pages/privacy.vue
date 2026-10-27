<script setup lang="ts">
useSeoMeta({
  title: "Privacy Policy — AutoButler / Quark",
  description:
    "How AutoButler handles Website data, and how Quark keeps your files on hardware you control.",
  ogTitle: "Privacy Policy — AutoButler / Quark",
  ogDescription:
    "How AutoButler handles Website data, and how Quark keeps your files on hardware you control.",
  ogType: "website",
});
</script>

<template>
  <main class="page">
    <h1>Privacy Policy</h1>

    <div>
      <p class="last-updated">Last Updated: October 27, 2026</p>
    </div>

    <div>
      <h2>We Built Quark to Keep Your Stuff Yours</h2>
      <p>
        AutoButler sells Quark, a personal cloud that runs on hardware you own.
        We designed the product so your photos, files, and documents stay under
        your control. This policy covers (1) the Quark product and (2) the
        Autobutler website and related online services.
      </p>
    </div>

    <div>
      <h2>Quark Product (On Your Hardware)</h2>
      <p>
        Content you store in Quark lives on your device by default. We do not
        run a central library of your personal files, and we do not use your
        photos or documents to train AI models.
      </p>
      <p>
        If you use sync or import features that involve third-party services
        (for example importing from Google, iCloud, or OneDrive), those services
        process data according to their own terms and your settings. That is
        your choice and your responsibility.
      </p>
      <p>
        You are responsible for securing your device, credentials, and backups.
      </p>

      <div class="subsection">
        <h3>Remote access</h3>
        <p>
          Remote access is optional and stays off until an admin on your Quark
          turns it on. AutoButler runs the service that connects your Quark and
          your phones.
        </p>
        <p>
          While it is on, our coordination server sees a generated name for each
          device (not the name you gave it), basic device details such as the
          operating system, IP addresses, when each device is online, and
          pairing requests. We use this to connect your devices. Your files do
          not pass through our servers.
        </p>
        <p>
          Your phone usually connects straight to your Quark. To find that path,
          and to carry traffic when a direct connection isn't possible, your
          devices use relay servers run by a third party. The traffic is
          encrypted end to end, so those relays can't read it, but they do see
          IP addresses.
        </p>
        <p>
          The networking software that remote access is built on can send
          diagnostic logs to its maker. We are turning that off on Quark and in
          the phone apps (<a
            href="https://github.com/autobutler-org/quark/issues/3786"
            target="_blank"
            rel="noopener noreferrer"
            >quark#3786</a
          >). Until that update ships, a Quark or phone with remote access on
          may send some of these logs, which can include device details and IP
          addresses, while it connects.
        </p>
      </div>
    </div>

    <div>
      <h2>Website &amp; Online Services (What We Collect)</h2>
      <p>
        When you use autobutler.org (including waitlist/sign-up, blog,
        community, or contact flows), we may process:
      </p>

      <div class="subsection">
        <h3>Technical data</h3>
        <p>
          Servers may see your IP address, browser/user-agent, and basic request
          logs. We use this to operate and secure the site. We do not sell this
          information.
        </p>
      </div>

      <div class="subsection">
        <h3>Information you give us</h3>
        <p>
          If you join a waitlist, create an account, or email support, we
          receive what you submit (for example an email address and message
          content). We use it to respond, operate the waitlist or account, and
          improve the service. We delete support correspondence when we no
          longer need it for that purpose, subject to legal retention needs.
        </p>
      </div>

      <div class="subsection">
        <h3>Cookies / local preferences</h3>
        <p>
          The Website does not currently set cookies or use local storage of its
          own. The waitlist and newsletter sign-up forms are provided by
          Mailchimp (see Sharing below), which may set its own cookies under its
          own policies. You can block cookies in your browser; some features may
          not work as well.
        </p>
      </div>

      <div class="subsection">
        <h3>Analytics / marketing measurement</h3>
        <p>
          We do not currently use analytics or marketing measurement tools on
          the Website. If we add privacy-respecting measurement tools later, we
          will update this policy before they collect personal data beyond what
          is described here.
        </p>
      </div>
    </div>

    <div>
      <h2>What We Don't Do</h2>
      <ul>
        <li>Sell your personal information to data brokers or advertisers</li>
        <li>Use Quark library content for advertising profiles</li>
        <li>Train generative AI on your Quark photos or documents</li>
      </ul>
    </div>

    <div>
      <h2>Sharing</h2>
      <p>
        We share personal information only with service providers who help us
        run the Website (for example hosting), under obligations consistent with
        this policy, or when required by law.
      </p>
      <p>
        Our waitlist and newsletter sign-up forms are provided by Mailchimp
        (Intuit Inc.). Mailchimp processes the email address and any other
        details you submit through those forms on our behalf, and your browser
        connects to Mailchimp's servers when a form loads. Mailchimp handles
        that information according to its own
        <a
          href="https://mailchimp.com/legal/"
          target="_blank"
          rel="noopener noreferrer"
          >legal terms and privacy policy</a
        >.
      </p>
    </div>

    <div>
      <h2>Your Choices</h2>
      <p>
        You can ask what personal information we hold about you from
        Website/waitlist/support channels, and request correction or deletion,
        by emailing
        <a href="mailto:support@autobutler.org">support@autobutler.org</a>.
        Device-local Quark content is under your control on your hardware — we
        typically cannot access or delete it remotely.
      </p>
    </div>

    <div>
      <h2>Children</h2>
      <p>
        Quark and the Website are not directed at children under 13. Do not
        submit a child's personal information to us through the Website. If you
        believe we collected such information, contact us and we will delete it.
      </p>
    </div>

    <div>
      <h2>Changes</h2>
      <p>
        If we change how we handle privacy in a material way, we will update
        this page and note the new date. We will not expand Website data
        collection in a material way without updating this policy.
      </p>
    </div>

    <div>
      <h2>Questions?</h2>
      <p>
        Email
        <a href="mailto:support@autobutler.org">support@autobutler.org</a>.
        Feedback and to-dos also welcome via our
        <a
          href="https://github.com/autobutler-org/autobutler.org/issues/new/choose"
          target="_blank"
          >GitHub repository</a
        >.
      </p>
    </div>

    <div class="bottom-line">
      <p class="emphasis">
        Bottom line: Quark is built so your files stay yours. The Website only
        needs enough information to run waitlist, support, and the site itself.
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

.subsection {
  padding-left: 1rem;
  border-left: 1px solid var(--color-border);
}

.bottom-line {
  margin-top: 3.5rem;
  padding-top: 2rem;
  border-top: 1px solid var(--color-border-strong);
}

.emphasis {
  font-family: var(--font-serif);
  font-size: clamp(1.375rem, 1.2rem + 0.8vw, 1.75rem);
  font-style: italic;
  line-height: 1.3;
  letter-spacing: var(--tracking-snug);
  color: var(--color-text-strong);
}
</style>
