<script setup lang="ts">
const description =
  "AutoButler is a bootstrapped hardware and software company that makes Quark, a home personal cloud on hardware you own, for households who want their photos and files kept at home.";

useSeoMeta({
  title: "About AutoButler",
  description,
  ogTitle: "About AutoButler",
  ogDescription: description,
  ogType: "website",
});
</script>

<template>
  <main class="page">
    <h1>About AutoButler</h1>
    <!-- The company mission tagline goes here once #120 lands. -->
    <p class="lede">
      AutoButler is a bootstrapped hardware and software company that makes
      Quark, a home personal cloud on hardware you own, for households who want
      their photos and files kept at home instead of in a rented account.
    </p>

    <section>
      <h2>What AutoButler does</h2>
      <p>
        We build and sell one product today, and we write the software that runs
        on it.
      </p>
      <h3>Quark</h3>
      <p>
        <a href="https://quark.autobutler.org">Quark</a> is our flagship
        product. It is a device that plugs into your wifi router and turns your
        USB storage into cloud storage. Everyone in the house gets their own
        account and their own private space, and there is a password vault.
        Reaching it from outside the house is coming soon.
      </p>
      <p>
        The outcome is that your photos, files, documents and spreadsheets live
        on a drive you own, in a room you can walk into.
      </p>
    </section>

    <section>
      <h2>What makes AutoButler different</h2>
      <p>
        Most home cloud storage is rented by the month and kept on someone
        else's servers. We set the company up differently.
      </p>
      <h3>You buy the hardware once</h3>
      <p>
        There is no subscription. You buy Quark, and it is yours, with no
        ongoing claim on your data.
      </p>
      <h3>No venture capital</h3>
      <p>
        We are bootstrapped by sales instead of investor money, and funded by
        ordinary people who wanted this to exist. That means we answer to
        customers, not to shareholders asking for this quarter's growth number.
      </p>
      <h3>Your data stays on hardware you own</h3>
      <p>
        Your files and photos stay on a drive in your own home. If you want your
        data off the internet, you unplug it.
      </p>
      <h3>No analytics and no tracking</h3>
      <p>
        Quark has no analytics and no tracking, and this website does not use
        analytics either. We do not train generative AI on your Quark photos or
        documents.
      </p>
      <h3>The source is public</h3>
      <p>
        All of the Quark code is
        <a href="https://github.com/autobutler-org/quark">public on GitHub</a>
        under the MIT-0 license, so you can read it yourself. The
        <a href="https://quark.autobutler.org/docs">documentation</a> is there
        before you buy anything.
      </p>
    </section>

    <section>
      <h2>Who uses AutoButler</h2>
      <p>Quark is in beta, so this is who we are building it for:</p>
      <ul>
        <li>
          Households who want photos and documents on a drive in the house
          instead of in a rented account.
        </li>
        <li>
          People helping parents or family leave subscription cloud storage
          without setting up a NAS.
        </li>
        <li>
          Privacy-minded people who will read the source and will not accept
          analytics.
        </li>
        <li>
          Small teams, churches and shops that want local files and documents
          without an IT project.
        </li>
      </ul>
    </section>

    <section>
      <h2>The team behind AutoButler</h2>
      <img
        src="/assets/images/brandon-james-atlanta.jpeg"
        alt="Brandon and James in Atlanta"
        class="about-image"
      />
      <p>
        We are Brandon Apol, James Orson, and the host of people who help out
        with this.
      </p>
      <p>
        AutoButler started as a project to help Brandon's parents keep their
        data private. The choices were spending a lot of time setting up a
        finicky NAS or paying a subscription for cloud storage. We saw a need we
        could help with, and that project became Quark.
      </p>
      <h3>Brandon Apol</h3>
      <p>
        Brandon is one of our two founders. Quark began as his project to keep
        his parents' data private. He is on GitHub as
        <a href="https://github.com/brandonapol">brandonapol</a>.
      </p>
      <h3>James Orson</h3>
      <p>
        James is one of our two founders, and has been building Quark with
        Brandon since it was a project for Brandon's parents.
      </p>
    </section>

    <section>
      <h2>How AutoButler works</h2>
      <ul>
        <li>
          Email us at
          <a href="mailto:support@autobutler.org">support@autobutler.org</a>
          for questions and private inquiries.
        </li>
        <li>
          Report bugs and request features as
          <a href="https://github.com/autobutler-org/quark/issues"
            >GitHub issues on autobutler-org/quark</a
          >, where we track them in public.
        </li>
        <li>
          Documentation and product support live on
          <a href="https://quark.autobutler.org">quark.autobutler.org</a>.
        </li>
        <li>
          Quark is in beta. Friends-and-family access opens in early 2027, and
          you can <NuxtLink to="/waitlist">join the waitlist</NuxtLink> to hear
          when it is ready.
        </li>
      </ul>
      <p>
        We do not promise a response time yet. We would rather say that plainly
        than publish a number we have not earned.
      </p>
    </section>

    <section>
      <h2>Key facts</h2>
      <dl class="key-facts">
        <dt>Company name</dt>
        <dd>AutoButler</dd>
        <dt>Legal name</dt>
        <dd>AutoButler LLC</dd>
        <dt>Type</dt>
        <dd>Bootstrapped hardware and software company</dd>
        <dt>Founders</dt>
        <dd>Brandon Apol, James Orson</dd>
        <dt>Website</dt>
        <dd><a href="https://autobutler.org">https://autobutler.org</a></dd>
        <dt>Core offering</dt>
        <dd>Quark, a home personal cloud on hardware you own</dd>
        <dt>Products</dt>
        <dd>
          <a href="https://quark.autobutler.org">Quark</a>
        </dd>
        <dt>Availability</dt>
        <dd>Beta. Friends-and-family access opens in early 2027.</dd>
        <dt>Pricing</dt>
        <dd>Hardware purchased once. No subscription.</dd>
        <dt>Funding</dt>
        <dd>No venture capital</dd>
        <dt>License</dt>
        <dd>MIT-0 (Quark source)</dd>
        <dt>Alternative to</dt>
        <dd>Subscription cloud storage and rented file storage</dd>
        <dt>Communication</dt>
        <dd>
          <a href="mailto:support@autobutler.org">support@autobutler.org</a>
          and GitHub issues
        </dd>
        <dt>GitHub</dt>
        <dd>
          <a href="https://github.com/autobutler-org"
            >https://github.com/autobutler-org</a
          >
        </dd>
      </dl>
    </section>

    <section>
      <h2>Frequently asked questions</h2>
      <h3>What is AutoButler?</h3>
      <p>
        We are the company that builds and sells Quark. We are Brandon Apol and
        James Orson, plus the people who help out, and we run without a
        subscription and without venture capital.
      </p>
      <h3>What is Quark?</h3>
      <p>
        <a href="https://quark.autobutler.org">Quark</a> is our product: a
        device that plugs into your wifi router and turns your USB storage into
        cloud storage for your household. Your files stay on a drive you own.
      </p>
      <h3>Is there a subscription?</h3>
      <p>No. You buy the hardware once. We have not published a price yet.</p>
      <h3>Where does my data live?</h3>
      <p>
        On a drive you own, in your home. You can reach it from outside the
        house over a private network only your household is on, and if you want
        it off the internet you unplug it.
      </p>
      <h3>Is the software open source?</h3>
      <p>
        The Quark source is public at
        <a href="https://github.com/autobutler-org/quark"
          >github.com/autobutler-org/quark</a
        >
        under the MIT-0 license.
      </p>
      <h3>How do I get one?</h3>
      <p>
        Quark is in beta, and friends-and-family access opens in early 2027.
        <NuxtLink to="/waitlist">Join the waitlist</NuxtLink> and we will tell
        you when it is ready.
      </p>
      <h3>How do I contact you?</h3>
      <p>
        Email
        <a href="mailto:support@autobutler.org">support@autobutler.org</a>, or
        open a GitHub issue for bugs and feature requests. Both are on our
        <NuxtLink to="/contact">contact page</NuxtLink>.
      </p>
    </section>
  </main>
</template>

<style scoped>
.about-image {
  display: block;
  width: 100%;
  height: auto;
  margin: 1.5rem 0 2rem;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
}

/* A spec sheet: mono labels against values, ruled like Quark's hero facts. */
.key-facts {
  display: grid;
  grid-template-columns: minmax(8rem, 1fr) 2fr;
  margin: 0;
  border-top: 1px solid var(--color-text-strong);
}

.key-facts dt,
.key-facts dd {
  margin: 0;
  padding: 0.85rem 0;
  border-bottom: 1px solid var(--color-border-strong);
}

.key-facts dt {
  padding-right: 1.5rem;
  font-family: var(--font-mono);
  font-size: var(--text-micro);
  line-height: 2;
  letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
  color: var(--color-text-muted);
}

.key-facts dd {
  font-size: var(--text-small);
  font-weight: 500;
  color: var(--color-text-strong);
}

@media (max-width: 640px) {
  .key-facts {
    grid-template-columns: minmax(0, 1fr);
  }

  .key-facts dt {
    padding-bottom: 0;
    border-bottom: none;
  }

  .key-facts dd {
    padding-top: 0.25rem;
  }
}
</style>
