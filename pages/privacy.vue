<template>
  <main class="privacy-page">
    <div class="privacy-content">
      <h1>Privacy Policy</h1>
      
      <div class="section">
        <p class="last-updated">Last Updated: July 5, 2025</p>
      </div>

      <div class="section">
        <h2>We Don't Want Your Data</h2>
        <p>
          Here's the thing: we really don't want to collect your personal information. 
          We built this service to be useful without needing to know who you are or track what you do.
        </p>
      </div>

      <div class="section">
        <h2>What We Don't Collect</h2>
        <p>We don't collect:</p>
        <ul>
          <li>Your name, email, or contact information (unless you specifically give it to us)</li>
          <li>Your location or personal details</li>
          <li>Your browsing history or behavior patterns</li>
          <li>Any information we don't absolutely need</li>
        </ul>
      </div>

      <div class="section">
        <h2>What We Do Collect (And Why)</h2>
        <p>The only information we gather is what's necessary to keep things running:</p>
        
        <div class="subsection">
          <h3>Basic Technical Stuff</h3>
          <p>
            When you visit our site, our servers automatically see your IP address and what browser you're using. 
            This is just how the internet works - we can't avoid it. But we don't store this information or use it to track you.
          </p>
        </div>

        <div class="subsection">
          <h3>If You Contact Us</h3>
          <p>
            If you reach out to us with a question or problem, we'll have whatever information you choose to share. 
            We use this only to help you and then we delete it.
          </p>
        </div>

        <div class="subsection">
          <h3>Cookies (The Bare Minimum)</h3>
          <p>
            We use a few cookies to remember your preferences so the site works better for you. 
            These don't track you across other websites. You can turn them off in your browser if you want.
            Otherwise, the only cookies we like are chocolate chip.
          </p>
        </div>
      </div>

      <div class="section">
        <h2>What We Do With Information</h2>
        <p>Any information we do have, we use only to:</p>
        <ul>
          <li>Keep our service working properly</li>
          <li>Fix problems when they come up</li>
          <li>Respond if you contact us for help</li>
        </ul>
        <p>That's it. We don't analyze it, sell it, or share it with anyone else.</p>
      </div>

      <div class="section">
        <h2>Third Parties</h2>
        <p>
          We don't share your information with other companies, advertisers, or data brokers. 
          If we ever need to use a service provider (like hosting), we make sure they follow the same privacy-first approach.
        </p>
      </div>

      <div class="section">
        <h2>Your Control</h2>
        <p>
          Since we're not collecting much to begin with, there's not much you need to worry about. 
          But if you want to know what (if any) information we have about you, or if you want us to delete it, just ask.
        </p>
      </div>

      <div class="section">
        <h2>Changes</h2>
        <p>
          If we ever need to change how we handle privacy, we'll update this page and let you know. 
          We won't start collecting more data without being upfront about it.
        </p>
      </div>

      <div class="section">
        <h2>Questions?</h2>
        <p>
          If you have any questions about privacy or how we handle information, email us at [your-email]. 
          We're happy to explain anything that's unclear.
          <br>
          If you have ideas for how we can improve, you can also write us to-do items at our <a href="https://github.com/autobutler-org/autobutler.org/issues/new/choose" target="_blank">GitHub repository</a>.
        </p>
      </div>

      <div class="section bottom-line">
        <p class="emphasis">
          The bottom line: We built this to work without invading your privacy. Your business is your business.
        </p>
      </div>
    </div>
  </main>
</template>

<style scoped>
.privacy-page {
  flex: 1;
  width: 100%;
  padding: 2rem 0;
}

.privacy-content {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 1rem;
}

h1 {
  color: #4caf50;
  font-size: 2.5rem;
  margin-bottom: 2rem;
}

.section {
  margin-bottom: 2.5rem;
}

.subsection {
  margin-bottom: 1.5rem;
  padding-left: 1rem;
}

h2 {
  color: #81c784;
  font-size: 1.8rem;
  margin-bottom: 1rem;
}

h3 {
  color: #a5d6a7;
  font-size: 1.4rem;
  margin-bottom: 0.8rem;
}

p {
  color: #e0e0e0;
  line-height: 1.6;
  margin-bottom: 1rem;
}

.last-updated {
  color: #b0b0b0;
  font-style: italic;
  font-size: 0.9rem;
  margin-bottom: 0;
}

.emphasis {
  color: #81c784;
  font-weight: 600;
  font-size: 1.1rem;
  text-align: center;
}

.bottom-line {
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 2rem;
  margin-top: 3rem;
}

ul {
  list-style-type: none;
  padding-left: 1.5rem;
}

ul li {
  color: #e0e0e0;
  line-height: 1.6;
  margin-bottom: 0.5rem;
  position: relative;
}

ul li::before {
  content: "•";
  color: #4caf50;
  position: absolute;
  left: -1.5rem;
  font-size: 1.2rem;
}
</style>