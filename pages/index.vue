<template>
  <main class="home">
    <section class="hero">
      <div class="texture" aria-hidden="true"></div>
      <div class="hero-inner">
        <div class="hero-copy">
          <h1>Data Autonomy For Everyone.</h1>
          <p class="subhead">
            AutoButler is a company that makes products for humans.
          </p>
          <p class="hero-lede">
            AutoButler is Brandon and James, who want to change the world.
            Technology isn't evil, we just think there's a better vision for
            what we can use it to do to improve the lives of people.
          </p>
          <div class="actions">
            <a href="https://quark.autobutler.org" class="btn btn-primary"
              >Meet Quark</a
            >
            <NuxtLink to="/about" class="btn btn-secondary"
              >About AutoButler</NuxtLink
            >
          </div>
        </div>
        <dl class="facts" aria-label="AutoButler at a glance">
          <div class="fact">
            <dt>Founders</dt>
            <dd>Brandon Apol, James Orson</dd>
          </div>
          <div class="fact">
            <dt>Flagship product</dt>
            <dd>Quark</dd>
          </div>
          <div class="fact">
            <dt>Subscription</dt>
            <dd>None</dd>
          </div>
          <div class="fact">
            <dt>Funding</dt>
            <dd>No venture capital</dd>
          </div>
          <div class="fact">
            <dt>Source</dt>
            <dd>Public, MIT-0</dd>
          </div>
        </dl>
      </div>
    </section>

    <section class="split">
      <header class="split-aside">
        <p class="eyebrow">Tenets</p>
        <h2>What We Believe</h2>
      </header>
      <ol class="tenets reveal">
        <li>
          We believe that there is an ongoing movement towards creating a
          permanent "rental class," and that the way out of that is to create
          non-rental products.
        </li>
        <li>We believe in an open, transparent, safe internet.</li>
        <li>
          We believe that individuals should have control over data associated
          with them.
        </li>
        <li>We believe that products are made for people.</li>
        <li>
          We believe that if a customer doesn't want something, they shouldn't
          be forced into it.
        </li>
        <li>
          We believe that better products and companies are the answer to bad
          products and companies.
        </li>
        <li>We believe that the Fourth Amendment applies to data.</li>
        <li>
          We believe in the inherent dignity and value of humanity and human
          creativity.
        </li>
        <li>
          We believe that we have the right to do what we want with our own
          product, even if that makes it less profitable.
        </li>
        <li>
          We believe that one of the pending benefits of artificial intelligence
          is the ability to create things that help the working class opt out of
          bad systems.
        </li>
      </ol>
    </section>

    <section class="split">
      <header class="split-aside">
        <p class="eyebrow">Quark</p>
        <h2>Our Flagship Product</h2>
      </header>
      <div class="flagship reveal">
        <p>
          Our flagship product is called
          <a href="https://quark.autobutler.org">Quark</a>, which is a
          wifi-router plug-in device that turns your USB storage into cloud
          storage.
        </p>
        <p>
          Your photos, files, documents and spreadsheets live on a drive you
          own, in a room you can walk into. Everyone in the house gets their own
          account and their own private space, and there is a password vault.
          Reaching it from outside the house is coming soon. Encrypted household
          chat and a shared calendar are in review now.
        </p>
        <p>
          Quark is in beta, with friends-and-family access opening in early
          2027. All of the code is public, so you can
          <a href="https://github.com/autobutler-org/quark">read it yourself</a
          >, and the
          <a href="https://quark.autobutler.org/docs">documentation</a> is there
          before you buy anything.
        </p>
        <div class="actions">
          <a href="https://quark.autobutler.org" class="btn btn-secondary"
            >quark.autobutler.org</a
          >
        </div>
      </div>
    </section>

    <section class="cta-section">
      <ClientOnly>
        <div id="mc_embed_shell" class="card reveal">
          <div id="mc_embed_signup">
            <form
              id="mc-embedded-subscribe-form"
              action="https://autobutler.us5.list-manage.com/subscribe/post?u=83e0cf2d6edd852308ba6671f&amp;id=a3382ba074&amp;f_id=00a0c2e1f0"
              method="post"
              name="mc-embedded-subscribe-form"
              class="validate"
              target="_blank"
            >
              <div id="mc_embed_signup_scroll">
                <h2>Want updates?</h2>
                <p class="mc-powered-by">Powered by Mailchimp</p>
                <div class="mc-field-group">
                  <label for="mce-EMAIL">Email Address</label
                  ><input
                    id="mce-EMAIL"
                    type="email"
                    name="EMAIL"
                    class="required email"
                    required="true"
                    value=""
                  />
                </div>
                <div id="mce-responses" class="clear">
                  <div
                    id="mce-error-response"
                    class="response"
                    style="display: none"
                  ></div>
                  <div
                    id="mce-success-response"
                    class="response"
                    style="display: none"
                  ></div>
                </div>
                <!-- Anti-bot honeypot: real subscribers never see or fill this in. -->
                <div class="honeypot" aria-hidden="true">
                  <input
                    type="text"
                    name="b_83e0cf2d6edd852308ba6671f_a3382ba074"
                    tabindex="-1"
                    value=""
                  />
                </div>
                <div class="clear">
                  <input
                    id="mc-embedded-subscribe"
                    type="submit"
                    name="subscribe"
                    class="button btn btn-primary"
                    value="Subscribe"
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </ClientOnly>
    </section>
  </main>
</template>

<script setup lang="ts">
import { onMounted } from "vue";

// SEO meta
useSeoMeta({
  title: "AutoButler | Data Autonomy for Everyone",
  description:
    "AutoButler builds open-source tools for data autonomy, starting with Quark, a private home cloud for your router.",
  ogTitle: "AutoButler | Data Autonomy for Everyone",
  ogDescription:
    "AutoButler builds open-source tools for data autonomy, starting with Quark, a private home cloud for your router.",
  ogType: "website",
  ogUrl: "https://autobutler.org",
  twitterCard: "summary_large_image",
  twitterTitle: "AutoButler | Data Autonomy for Everyone",
  twitterDescription:
    "AutoButler builds open-source tools for data autonomy, starting with Quark, a private home cloud for your router.",
});

// Organization structured data for search engines. The Mailchimp form is
// styled below on the site tokens, so Mailchimp's own stylesheet is not loaded.
useHead({
  script: [
    {
      type: "application/ld+json",
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "AutoButler",
        url: "https://autobutler.org",
        logo: "https://autobutler.org/android-chrome-512x512.png",
        sameAs: ["https://github.com/autobutler-org"],
      }),
    },
  ],
});

// Initialize Mailchimp validation and custom functionality
onMounted(() => {
  // Load the Mailchimp validation script
  const script = document.createElement("script");
  script.src = "//s3.amazonaws.com/downloads.mailchimp.com/js/mc-validate.js";
  script.type = "text/javascript";
  script.onload = () => {
    /* eslint-disable @typescript-eslint/no-explicit-any */
    // Initialize Mailchimp validation
    if (typeof window !== "undefined" && (window as any).jQuery) {
      (function (_$: any) {
        (window as any).fnames = [];
        (window as any).ftypes = [];
        (window as any).fnames[0] = "EMAIL";
        (window as any).ftypes[0] = "email";
        (window as any).fnames[1] = "FNAME";
        (window as any).ftypes[1] = "text";
        (window as any).fnames[2] = "LNAME";
        (window as any).ftypes[2] = "text";
        (window as any).fnames[6] = "COMPANY";
        (window as any).ftypes[6] = "text";
        (window as any).fnames[3] = "OTHER";
        (window as any).ftypes[3] = "text";
      })((window as any).jQuery);
      (window as any).$mcj = (window as any).jQuery.noConflict(true);
    }

    // SMS Phone Multi-Country Functionality
    if (!(window as any).MC) {
      (window as any).MC = {};
    }
    (window as any).MC.smsPhoneData = {
      defaultCountryCode: "US",
      programs: [],
      smsProgramDataCountryNames: [],
    };

    // Initialize SMS phone dropdowns if they exist
    const smsPhoneFields = document.querySelectorAll('[id^="country-select-"]');
    smsPhoneFields.forEach(function (dropdown: any) {
      const _fieldName = dropdown?.id.replace("country-select-", "");
      // initializeSmsPhoneDropdown would go here if SMS fields are used
    });
    /* eslint-enable @typescript-eslint/no-explicit-any */
  };
  document.head.appendChild(script);
});
</script>

<style scoped>
.hero {
  position: relative;
  isolation: isolate;
}

/* A faint drafting grid behind the headline, fading out toward the facts. */
.texture {
  position: absolute;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  background-image:
    linear-gradient(var(--color-grid-line) 1px, var(--mask-clear) 1px),
    linear-gradient(90deg, var(--color-grid-line) 1px, var(--mask-clear) 1px);
  background-size: 4rem 4rem;
  background-position: center top;
  -webkit-mask-image: radial-gradient(
    ellipse 80% 70% at 30% 20%,
    var(--mask-opaque),
    var(--mask-clear)
  );
  mask-image: radial-gradient(
    ellipse 80% 70% at 30% 20%,
    var(--mask-opaque),
    var(--mask-clear)
  );
}

.hero-inner {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 3.5rem;
  max-width: var(--content-width);
  margin: 0 auto;
  padding: clamp(4rem, 9vw, 8rem) var(--gutter) clamp(3rem, 6vw, 5rem);
}

h1 {
  max-width: 11ch;
  margin: 0;
  font-family: var(--font-serif);
  font-size: var(--text-display);
  font-weight: 400;
  line-height: var(--leading-tight);
  letter-spacing: -0.035em;
  color: var(--color-text-strong);
}

.subhead {
  margin: 2rem 0 0;
  font-size: var(--text-lede);
  font-weight: 500;
  letter-spacing: var(--tracking-snug);
  color: var(--color-text-strong);
}

.hero-lede {
  max-width: var(--lede-width);
  margin: 0.75rem 0 0;
  font-size: var(--text-lede);
  color: var(--color-text-muted);
  text-wrap: pretty;
}

.hero .actions {
  margin-top: 2.5rem;
}

.facts {
  margin: 0;
  border-top: 1px solid var(--color-text-strong);
  align-self: end;
}

.fact {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 0.25rem 1rem;
  padding: 0.85rem 0;
  border-bottom: 1px solid var(--color-border-strong);
}

dt {
  font-family: var(--font-mono);
  font-size: var(--text-micro);
  letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
  color: var(--color-text-muted);
}

dd {
  margin: 0;
  font-size: var(--text-small);
  font-weight: 500;
  color: var(--color-text-strong);
}

/* Two-column section: a sticky heading beside the body, as in Quark's manifesto. */
.split {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 3rem;
  max-width: var(--content-width);
  margin: 0 auto;
  padding: var(--section-gap) var(--gutter) 0;
}

.split h2,
#mc_embed_signup h2 {
  margin: 0;
  font-family: var(--font-serif);
  font-size: var(--text-h2);
  font-weight: 400;
  line-height: 1.1;
  letter-spacing: var(--tracking-tight);
  color: var(--color-text-strong);
  text-wrap: balance;
}

.tenets {
  margin: 0;
  padding: 0;
  border-top: 1px solid var(--color-text-strong);
  list-style: none;
  counter-reset: tenet;
}

.tenets li {
  display: grid;
  grid-template-columns: 2.5rem minmax(0, 1fr);
  gap: 1rem;
  padding: 1.25rem 0;
  border-bottom: 1px solid var(--color-border-strong);
  font-size: 1.0625rem;
  line-height: 1.6;
  color: var(--color-text-strong);
  text-wrap: pretty;
  counter-increment: tenet;
}

.tenets li::before {
  content: counter(tenet, decimal-leading-zero);
  padding-top: 0.3em;
  font-family: var(--font-mono);
  font-size: var(--text-micro);
  letter-spacing: var(--tracking-wide);
  color: var(--color-text-muted);
}

.flagship {
  max-width: var(--prose-width);
  font-size: 1.0625rem;
  line-height: 1.7;
}

.flagship p {
  margin: 0 0 1.5rem;
  text-wrap: pretty;
}

.flagship p:first-child {
  font-size: var(--text-lede);
  line-height: 1.6;
  color: var(--color-text-strong);
}

.flagship a:not(.btn) {
  color: var(--color-text-strong);
  font-weight: 500;
  text-decoration: underline;
  text-decoration-color: var(--color-border-strong);
  text-underline-offset: 0.25em;
  transition: text-decoration-color var(--duration-fast) ease;
}

.flagship a:not(.btn):hover {
  text-decoration-color: currentcolor;
}

.cta-section {
  max-width: var(--content-width);
  margin: 0 auto;
  padding: var(--section-gap) var(--gutter);
}

#mc_embed_shell {
  max-width: 40rem;
}

#mc_embed_signup .mc-powered-by {
  margin: 0.75rem 0 2rem;
  font-family: var(--font-mono);
  font-size: var(--text-micro);
  letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
  color: var(--color-text-muted);
}

#mc_embed_signup label {
  display: block;
  margin-bottom: 0.5rem;
  font-size: var(--text-small);
  font-weight: 500;
  color: var(--color-text-strong);
}

#mc_embed_signup input[type="email"] {
  width: 100%;
  min-height: 3rem;
  padding: 0 1rem;
  border: 1px solid var(--color-border-strong);
  border-radius: var(--radius-md);
  background: var(--color-canvas);
  color: var(--color-text-strong);
  font: inherit;
  font-size: max(16px, var(--text-body)); /* 16px keeps iOS from zooming in */
  transition: border-color var(--duration-fast) ease;
}

#mc_embed_signup input[type="email"]:hover {
  border-color: var(--color-text-muted);
}

#mc_embed_signup .honeypot {
  position: absolute;
  left: -5000px;
}

#mc_embed_signup .clear {
  margin-top: 1rem;
}

#mc_embed_signup .response {
  padding: 0.75rem 1rem;
  border-radius: var(--radius-md);
  font-size: var(--text-small);
}

#mc_embed_signup #mce-error-response,
#mc_embed_signup :deep(.mce_inline_error) {
  background: var(--pastel-red);
  color: var(--pastel-red-ink);
}

#mc_embed_signup :deep(.mce_inline_error) {
  margin-top: 0.5rem;
  padding: 0.5rem 0.75rem;
  border-radius: var(--radius-sm);
  font-size: var(--text-small);
}

#mc_embed_signup #mce-success-response {
  background: var(--pastel-green);
  color: var(--pastel-green-ink);
}

@media (min-width: 960px) {
  .hero-inner {
    grid-template-columns: minmax(0, 1fr) 19rem;
    gap: 5rem;
  }

  .split {
    grid-template-columns: minmax(0, 5fr) minmax(0, 7fr);
    gap: 5rem;
  }

  .split-aside {
    position: sticky;
    top: calc(var(--header-height) + 2.5rem);
    align-self: start;
  }
}
</style>
