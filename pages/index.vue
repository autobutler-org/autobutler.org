<template>
  <div class="landing-page">
    <div class="gradient-overlay" />
    <div class="hero-section">
      <h1>Data Autonomy For Everyone.</h1>
      <p class="subtitle">
        AutoButler is a company that makes products for humans.
      </p>
    </div>

    <div class="content-wrapper">
      <div class="about-section">
        <p>
          AutoButler is Brandon and James, who want to change the world.
          Technology isn't evil, we just think there's a better vision for what
          we can use it to do to improve the lives of people.
        </p>
      </div>

      <div class="tenets-section">
        <h2 class="highlight">What We Believe</h2>
        <div class="tenets-list">
          <div class="tenet-card">
            <p>
              We believe that there is an ongoing movement towards creating a
              permanent "rental class," and that the way out of that is to
              create non-rental products.
            </p>
          </div>
          <div class="tenets-grid-middle">
            <div class="tenet-card">
              <p>We believe in an open, transparent, safe internet.</p>
            </div>
            <div class="tenet-card">
              <p>
                We believe that individuals should have control over data
                associated with them.
              </p>
            </div>
            <div class="tenet-card">
              <p>We believe that products are made for people.</p>
            </div>
            <div class="tenet-card">
              <p>
                We believe that if a customer doesn't want something, they
                shouldn't be forced into it.
              </p>
            </div>
            <div class="tenet-card">
              <p>
                We believe that better products and companies are the answer to
                bad products and companies.
              </p>
            </div>
            <div class="tenet-card">
              <p>We believe that the Fourth Amendment applies to data.</p>
            </div>
            <div class="tenet-card">
              <p>
                We believe in the inherent dignity and value of humanity and
                human creativity.
              </p>
            </div>
            <div class="tenet-card">
              <p>
                We believe that we have the right to do what we want with our
                own product, even if that makes it less profitable.
              </p>
            </div>
          </div>
          <div class="tenet-card">
            <p>
              We believe that one of the pending benefits of artificial
              intelligence is the ability to create things that help the working
              class opt out of bad systems.
            </p>
          </div>
        </div>
      </div>

      <div class="flagship-section">
        <h2 class="highlight">Our Flagship Product</h2>
        <p>
          Our flagship product is called
          <a href="https://quark.autobutler.org">Quark</a>, which is a
          wifi-router plug-in device that turns your USB storage into cloud
          storage.
        </p>
        <p>
          Your photos, files, documents and spreadsheets live on a drive you
          own, in a room you can walk into. Everyone in the house gets their own
          account and their own private space, there is a password vault, and
          you can reach any of it from outside the house over a private network
          only your household is on. Encrypted household chat and a shared
          calendar are in review now.
        </p>
        <p>
          Quark is in beta, with friends-and-family access opening in early
          2027. All of the code is public, so you can
          <a href="https://github.com/autobutler-org/quark">read it yourself</a
          >, and the
          <a href="https://quark.autobutler.org/docs">documentation</a> is there
          before you buy anything.
        </p>
      </div>

      <div class="cta-section">
        <ClientOnly>
          <div id="mc_embed_shell">
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
                  <div
                    aria-hidden="true"
                    style="position: absolute; left: -5000px"
                  >
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
                      class="button"
                      value="Subscribe"
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </ClientOnly>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";

// SEO meta
useSeoMeta({
  title: "AutoButler — Data Autonomy For Everyone",
  description:
    "AutoButler believes products should be made for people, not the other way around. See what we stand for.",
  ogTitle: "AutoButler — Data Autonomy For Everyone",
  ogDescription:
    "AutoButler believes products should be made for people, not the other way around. See what we stand for.",
  ogType: "website",
  ogUrl: "https://autobutler.org",
  twitterCard: "summary_large_image",
  twitterTitle: "AutoButler — Data Autonomy For Everyone",
  twitterDescription:
    "AutoButler believes products should be made for people, not the other way around. See what we stand for.",
});

// Load Mailchimp CSS
useHead({
  link: [
    {
      rel: "stylesheet",
      href: "//cdn-images.mailchimp.com/embedcode/classic-061523.css",
      type: "text/css",
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

<style>
@import "@/assets/css/common.css";

/* Mailchimp form styles */
#mc_embed_shell {
  max-width: 100%;
  overflow: hidden;
}

#mc_embed_signup {
  background: rgba(255, 255, 255, 0.05);
  clear: left;
  font:
    14px Helvetica,
    Arial,
    sans-serif;
  width: 600px;
  max-width: 100%;
  margin: 2rem auto;
  padding: 3rem 2rem;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-sizing: border-box;
}

#mc_embed_signup * {
  box-sizing: border-box;
}

#mc_embed_signup h2 {
  font-family: var(--font-hero);
  font-size: 3rem;
  color: #fff;
  margin-bottom: 0.5rem;
  background: linear-gradient(135deg, #ffffff, rgba(255, 255, 255, 0.8));
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

#mc_embed_signup .mc-powered-by {
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.4);
  margin-bottom: 1.5rem;
  font-weight: 400;
}

#mc_embed_signup .mc-field-group {
  margin-bottom: 1.5rem;
}

#mc_embed_signup label {
  display: block;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 500;
  margin-bottom: 0.5rem;
  font-size: 1rem;
}

#mc_embed_signup input[type="email"],
#mc_embed_signup input[type="text"] {
  width: 100%;
  padding: 0.875rem 1rem;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  color: #fff;
  font-size: 1rem;
  transition: all 0.3s ease;
  box-sizing: border-box;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}

#mc_embed_signup input[type="email"]:focus,
#mc_embed_signup input[type="text"]:focus {
  outline: none;
  background: rgba(255, 255, 255, 0.12);
  border-color: rgba(255, 255, 255, 0.4);
}

#mc_embed_signup input[type="email"]::placeholder,
#mc_embed_signup input[type="text"]::placeholder {
  color: rgba(255, 255, 255, 0.4);
}

#mc_embed_signup .button {
  background: linear-gradient(
    135deg,
    rgba(0, 187, 255, 0.85),
    rgba(0, 149, 255, 0.75)
  ) !important;
  border: 1px solid rgba(0, 187, 255, 0.5) !important;
  color: #fff !important;
  padding: 1rem 2.5rem !important;
  font-size: 1.1rem !important;
  font-weight: 600 !important;
  border-radius: 8px !important;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 1rem !important;
  line-height: 1.5 !important;
  vertical-align: middle;
  display: inline-block;
  text-align: center;
  box-sizing: border-box;
  font-family: inherit !important;
  height: auto !important;
  min-height: auto !important;
  box-shadow: 0 4px 15px rgba(0, 187, 255, 0.3);
}

#mc_embed_signup .button:hover {
  background: linear-gradient(
    135deg,
    rgba(0, 220, 255, 0.95),
    rgba(0, 187, 255, 0.85)
  ) !important;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 187, 255, 0.5);
}

#mc_embed_signup .response {
  color: rgba(255, 255, 255, 0.9);
  margin-top: 1rem;
  padding: 0.75rem;
  border-radius: 6px;
}

#mc_embed_signup #mce-error-response {
  background: rgba(255, 50, 50, 0.1);
  border: 1px solid rgba(255, 50, 50, 0.3);
}

#mc_embed_signup #mce-success-response {
  background: rgba(50, 255, 150, 0.1);
  border: 1px solid rgba(50, 255, 150, 0.3);
}

#mc_embed_signup .clear {
  clear: both;
  text-align: center;
}

#mc_embed_signup div#mce-responses {
  margin: 0;
  padding: 0;
}

.landing-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: linear-gradient(135deg, #1a1a1a, #232323);
  padding: 20px;
  position: relative;
  overflow: hidden;
}

.hero-section {
  text-align: center;
  padding: 12rem 2rem 8rem;
  max-width: 800px;
  margin: 0 auto;
  width: 100%;
  min-height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-top: 8rem;
}

.content-wrapper {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
}

.hero-section h1 {
  font-family: var(--font-hero);
  font-size: 3rem;
  line-height: 1.2;
  margin-bottom: 1.5rem;
  background: linear-gradient(135deg, #ffffff, rgba(255, 255, 255, 0.8));
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  transform: translateY(-10vh);
}

.subtitle {
  font-size: 1.5rem;
  margin-bottom: 2.5rem;
  opacity: 0.9;
}

.cta-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 2rem;
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  position: relative;
  z-index: 2;
  max-width: 1200px;
  margin: 0 auto;
}

.feature-card {
  padding: 2rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
  text-decoration: none;
  color: inherit;
  display: block;
  cursor: pointer;
  position: relative;
  z-index: 2;
}

.feature-card:hover {
  transform: translateY(-5px);
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(255, 255, 255, 0.2);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
}

.feature-card h3 {
  color: #fff;
  margin-bottom: 1rem;
  transition: color 0.3s ease;
}

.feature-card:hover h3 {
  color: #66d9ff;
}

.feature-card p {
  color: rgba(255, 255, 255, 0.8);
  transition: color 0.3s ease;
}

.feature-card:hover p {
  color: rgba(255, 255, 255, 0.9);
}

.tenets-section {
  padding: 4rem 2rem 2rem;
  text-align: center;
  max-width: 1100px;
  margin: 0 auto;
}

.tenets-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-top: 2.5rem;
  text-align: left;
}

.tenets-grid-middle {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
}

.tenet-card {
  padding: 1.75rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
}

.tenet-card:hover {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(255, 255, 255, 0.2);
}

.tenet-card p {
  color: rgba(255, 255, 255, 0.85);
  font-size: 1.05rem;
  line-height: 1.5;
  margin: 0;
}

.about-section {
  padding: 4rem 2rem 2rem;
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
}

.about-section p {
  font-size: 1.25rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.9);
}

.flagship-section {
  padding: 4rem 2rem;
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
}

.flagship-section p {
  font-size: 1.25rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.9);
}

.flagship-section a {
  color: rgba(0, 187, 255, 0.9);
  text-decoration: none;
  font-weight: 600;
  transition: color 0.2s ease;
}

.flagship-section a:hover {
  color: rgba(0, 255, 170, 0.9);
  text-decoration: underline;
}

.cta-section {
  padding: 4rem 2rem;
  text-align: center;
  background: rgba(255, 255, 255, 0.03);
  width: 100%;
}

.highlight {
  font-family: var(--font-hero);
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 2rem;
  background: linear-gradient(135deg, #ffffff, rgba(255, 255, 255, 0.8));
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.btn {
  font-size: 1.1rem;
  padding: 1rem 2rem;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.btn.primary {
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.2),
    rgba(255, 255, 255, 0.1)
  );
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.btn.primary:hover {
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.3),
    rgba(255, 255, 255, 0.2)
  );
  transform: translateY(-2px);
}

.btn.secondary {
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.btn.secondary:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: translateY(-2px);
}

@media (max-width: 900px) {
  .tenets-grid-middle {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .hero-section h1 {
    font-family: var(--font-hero);
    font-size: 2rem;
  }

  .subtitle {
    font-size: 1.2rem;
  }

  .cta-buttons {
    flex-direction: column;
  }

  .feature-grid {
    grid-template-columns: 1fr;
  }

  .tenets-grid-middle {
    grid-template-columns: 1fr;
  }

  #mc_embed_signup {
    padding: 2rem 1.5rem;
    width: 100%;
    margin: 1rem auto;
  }

  #mc_embed_signup h2 {
    font-size: 1.5rem;
    word-wrap: break-word;
    overflow-wrap: break-word;
  }

  #mc_embed_signup input[type="email"],
  #mc_embed_signup input[type="text"] {
    font-size: 16px !important; /* Prevents zoom on iOS */
    padding: 1rem !important;
  }

  #mc_embed_signup .button {
    width: 100%;
    padding: 1rem !important;
    font-size: 1rem !important;
  }

  #mc_embed_signup label {
    font-size: 0.95rem;
  }
}
</style>
