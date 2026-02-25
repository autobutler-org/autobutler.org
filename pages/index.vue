<template>
  <div class="landing-page">
    <div class="gradient-overlay" />
    <div class="hero-section">
      <h1>Data Autonomy For Everyone.</h1>
      <p class="subtitle">
        A router plug-in device that turns your USB storage into cloud storage.
      </p>
    </div>

    <div class="image-showcase">
      <div class="image-container left">
        <img src="/assets/images/files.png" alt="Files" />
      </div>
      <div class="image-container right">
        <img src="/assets/images/casing.webp" alt="Casing" />
      </div>
    </div>

    <div class="content-wrapper">
      <div class="manifesto-section">
        <h2>The convenience of the cloud, the privacy of your home.</h2>
        <p>
          Our plug-and-play, no-subscription, no-AI product seeks to restore
          control to consumers, storing your data in a physical device in your
          home. Automatically back up your photos, documents, and more without
          your data leaving your house. Store your content on physical hard
          drives again with automatic backups.
        </p>
        <p>
          AutoButler is just a little device you plug in to the ethernet port of
          your router, and then plug in any external USB storage you want to
          use. The device automatically runs on your home network, allowing you
          to back up photos automatically.
        </p>
        <p>Make yourself independent of major cloud providers.</p>
        <hr class="divider" />
        <p>
          No venture capital involved - completely funded by normal people, like
          you.
        </p>
        <a href="https://github.com/autobutler-org/autobutler"
          >Completely open-source for transparency.</a
        >
        <p>We show all of our code where anyone can look at it.</p>
      </div>

      <div class="cta-section">
        <h2 class="highlight">The cloud, in your home.</h2>
        <p class="subtitle">
          Instead of renting your device and storage, you own your own private
          cloud. Pay for fixes or upgrades... or do them yourself. It's yours to
          manage as you please.
        </p>
        <p class="subtitle">
          AutoButler gives you private document editing, file storage, calendar,
          photos, VPN, and more. All your files are stored in your home. Add or
          remove external hard drives if you want. Mail a backup to your grandma
          if you feel like it.
        </p>
        <div id="mc_embed_shell">
          <div id="mc_embed_signup">
            <form
              action="https://autobutler.us5.list-manage.com/subscribe/post?u=83e0cf2d6edd852308ba6671f&amp;id=a3382ba074&amp;f_id=00a0c2e1f0"
              method="post"
              id="mc-embedded-subscribe-form"
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
                    type="email"
                    name="EMAIL"
                    class="required email"
                    id="mce-EMAIL"
                    required="true"
                    value=""
                  />
                </div>
                <div id="mce-responses" class="clear">
                  <div
                    class="response"
                    id="mce-error-response"
                    style="display: none"
                  ></div>
                  <div
                    class="response"
                    id="mce-success-response"
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
                    type="submit"
                    name="subscribe"
                    id="mc-embedded-subscribe"
                    class="button"
                    value="Subscribe"
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';

// Load Mailchimp CSS
useHead({
  link: [
    {
      rel: 'stylesheet',
      href: '//cdn-images.mailchimp.com/embedcode/classic-061523.css',
      type: 'text/css'
    }
  ]
});

// Initialize Mailchimp validation and custom functionality
onMounted(() => {
  // Load the Mailchimp validation script
  const script = document.createElement('script');
  script.src = '//s3.amazonaws.com/downloads.mailchimp.com/js/mc-validate.js';
  script.type = 'text/javascript';
  script.onload = () => {
    // Initialize Mailchimp validation
    if (typeof window !== 'undefined' && (window as any).jQuery) {
      (function ($: any) {
        (window as any).fnames = new Array();
        (window as any).ftypes = new Array();
        (window as any).fnames[0] = 'EMAIL';
        (window as any).ftypes[0] = 'email';
        (window as any).fnames[1] = 'FNAME';
        (window as any).ftypes[1] = 'text';
        (window as any).fnames[2] = 'LNAME';
        (window as any).ftypes[2] = 'text';
        (window as any).fnames[6] = 'COMPANY';
        (window as any).ftypes[6] = 'text';
        (window as any).fnames[3] = 'OTHER';
        (window as any).ftypes[3] = 'text';
      })((window as any).jQuery);
      (window as any).$mcj = (window as any).jQuery.noConflict(true);
    }

    // SMS Phone Multi-Country Functionality
    if (!(window as any).MC) {
      (window as any).MC = {};
    }
    (window as any).MC.smsPhoneData = {
      defaultCountryCode: 'US',
      programs: [],
      smsProgramDataCountryNames: []
    };

    // Initialize SMS phone dropdowns if they exist
    const smsPhoneFields = document.querySelectorAll('[id^="country-select-"]');
    smsPhoneFields.forEach(function (dropdown: any) {
      const fieldName = dropdown?.id.replace('country-select-', '');
      // initializeSmsPhoneDropdown would go here if SMS fields are used
    });
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
  font: 14px Helvetica, Arial, sans-serif;
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
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.1)) !important;
  border: 1px solid rgba(255, 255, 255, 0.3) !important;
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
}

#mc_embed_signup .button:hover {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.2)) !important;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
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

.manifesto-section {
  padding: 4rem 2rem;
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
}

.manifesto-section h2 {
  font-family: var(--font-hero);
  font-size: 1.5rem;
  margin-bottom: 2rem;
  background: linear-gradient(135deg, #ffffff, rgba(255, 255, 255, 0.8));
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.manifesto-section a {
  font-family: var(--font-hero);
  color: rgba(0, 187, 255, 0.9);
  text-decoration: none;
  transition: color 0.2s ease;
  font-size: 1.1rem;
}

.manifesto-section a:hover {
  color: rgba(0, 255, 170, 0.9);
  text-decoration: underline;
}

.divider {
  width: 80%;
  margin: 2rem auto;
  border: none;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
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

.image-showcase {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3rem;
  padding: 4rem 2rem;
  margin: 4rem 0;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.02);
  max-width: 1200px;
  width: 100%;
}

.image-container {
  flex: 1;
  max-width: 500px;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.15);
  background: rgba(0, 0, 0, 0.3);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

.image-container:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.4);
}

.image-container img {
  width: 100%;
  height: auto;
  display: block;
  object-fit: cover;
  aspect-ratio: 16 / 10;
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

  .image-showcase {
    flex-direction: column;
    gap: 2rem;
    padding: 2rem 1rem;
  }

  .image-container {
    max-width: 100%;
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
