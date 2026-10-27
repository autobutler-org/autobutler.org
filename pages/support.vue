<script setup lang="ts">
const formData = ref({
  title: "",
  component: [] as string[],
  whatHappened: "",
  browsers: [] as string[],
  url: "",
  logs: "",
});

const componentOptions = [
  "N/A",
  "Calendar",
  "Photos",
  "Docs",
  "Books",
  "Cirrus (Drive)",
  "General UI",
  "Backend",
];

const browserOptions = [
  "Firefox",
  "Chrome",
  "Safari",
  "Microsoft Edge",
  "Other",
];

const submitToGitHub = () => {
  // Build the GitHub issue URL with query parameters
  const baseUrl = "https://github.com/autobutler-org/quark/issues/new";
  const params = new URLSearchParams();

  params.append("template", "bug.yaml");
  params.append("title", `[Bug] ${formData.value.title}`);

  if (formData.value.whatHappened) {
    params.append("what-happened", formData.value.whatHappened);
  }

  if (formData.value.url) {
    params.append("url", formData.value.url);
  }

  if (formData.value.logs) {
    params.append("logs", formData.value.logs);
  }

  // Open GitHub in a new tab with pre-filled data
  const issueUrl = `${baseUrl}?${params.toString()}`;
  window.open(issueUrl, "_blank");
};
useSeoMeta({
  title: "Support — AutoButler",
  description:
    "Get help with Quark. Report bugs, request features, and find answers.",
  ogTitle: "Support — AutoButler",
  ogDescription:
    "Get help with Quark. Report bugs, request features, and find answers.",
  ogType: "website",
});
</script>

<template>
  <main class="page">
    <h1>Support</h1>

    <div class="help-links">
      <h2>Need Help?</h2>
      <p>Check our documentation first — most questions are answered there.</p>
      <div class="help-link-grid">
        <a
          href="https://quark.autobutler.org/docs/getting-started"
          target="_blank"
          rel="noopener"
          class="help-link-card"
          aria-label="Getting started guide"
        >
          <Icon name="heroicons:rocket-launch" class="help-link-icon" />
          <span class="help-link-title">Getting Started</span>
          <span class="help-link-desc"
            >Set up your Quark for the first time</span
          >
        </a>
        <a
          href="https://quark.autobutler.org/docs/help"
          target="_blank"
          rel="noopener"
          class="help-link-card"
          aria-label="Troubleshooting guide"
        >
          <Icon name="heroicons:wrench-screwdriver" class="help-link-icon" />
          <span class="help-link-title">Troubleshooting</span>
          <span class="help-link-desc">Common issues and how to fix them</span>
        </a>
        <a
          href="https://github.com/autobutler-org/quark/issues"
          target="_blank"
          rel="noopener"
          class="help-link-card"
          aria-label="GitHub Issues — ask questions and report problems (opens in new tab)"
        >
          <Icon
            name="heroicons:chat-bubble-left-right"
            class="help-link-icon"
          />
          <span class="help-link-title">GitHub Issues</span>
          <span class="help-link-desc">Ask questions and report problems</span>
        </a>
        <a
          href="https://github.com/autobutler-org/quark"
          target="_blank"
          rel="noopener"
          class="help-link-card"
          aria-label="Quark GitHub repository (opens in new tab)"
        >
          <Icon name="mdi:github" class="help-link-icon" />
          <span class="help-link-title">GitHub</span>
          <span class="help-link-desc"
            >Browse source, file issues, and contribute</span
          >
        </a>
      </div>
    </div>

    <h2>Report an Issue</h2>
    <p>
      Found a bug? Report it directly to our GitHub issue tracker. Or, if you
      have a feature request, head to
      <a
        href="https://github.com/autobutler-org/quark/issues/new?template=feature.yaml"
        target="_blank"
        rel="noopener"
        >our Feature request page</a
      >.
    </p>

    <form class="card bug-report-form" @submit.prevent="submitToGitHub">
      <div class="form-group">
        <label for="title">Bug/Feature Title *</label>
        <input
          id="title"
          v-model="formData.title"
          type="text"
          placeholder="Brief description of the bug"
          required
        />
      </div>

      <div class="form-group">
        <label for="component">Component(s) Affected</label>
        <div class="checkbox-group">
          <label
            v-for="option in componentOptions"
            :key="option"
            class="checkbox-label"
          >
            <input
              v-model="formData.component"
              type="checkbox"
              :value="option"
            />
            {{ option }}
          </label>
        </div>
      </div>

      <div class="form-group">
        <label for="what-happened">What happened? *</label>
        <textarea
          id="what-happened"
          v-model="formData.whatHappened"
          placeholder="Describe the bug and what you expected to happen..."
          rows="6"
          required
        ></textarea>
      </div>

      <div class="form-group">
        <label for="browsers">Browser(s)</label>
        <div class="checkbox-group">
          <label
            v-for="browser in browserOptions"
            :key="browser"
            class="checkbox-label"
          >
            <input
              v-model="formData.browsers"
              type="checkbox"
              :value="browser"
            />
            {{ browser }}
          </label>
        </div>
      </div>

      <div class="form-group">
        <label for="url">URL of Problem</label>
        <input
          id="url"
          v-model="formData.url"
          type="text"
          placeholder="https://example.com or local URL"
        />
      </div>

      <div class="form-group">
        <label for="logs">Relevant Log Output</label>
        <textarea
          id="logs"
          v-model="formData.logs"
          placeholder="Paste any error messages or logs here..."
          rows="6"
        ></textarea>
      </div>

      <button type="submit" class="btn btn-primary submit-btn">
        Open GitHub Issue
      </button>
    </form>
  </main>
</template>

<style scoped>
.help-links {
  margin-bottom: 3.5rem;
}

.help-link-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(12rem, 100%), 1fr));
  gap: 1rem;
}

.help-link-card {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  padding: 1.25rem;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  background: var(--color-surface);
  color: inherit;
  text-decoration: none;
  transition:
    border-color var(--duration-fast) ease,
    box-shadow var(--duration-fast) ease;
}

.help-link-card:hover {
  border-color: var(--color-border-strong);
  box-shadow: var(--shadow-hover);
}

.help-link-icon {
  width: 1.4rem;
  height: 1.4rem;
  margin-bottom: 0.5rem;
  color: var(--color-text-strong);
}

.help-link-title {
  font-weight: 600;
  color: var(--color-text-strong);
}

.help-link-desc {
  font-size: var(--text-small);
  line-height: 1.45;
  color: var(--color-text-muted);
}

.bug-report-form {
  margin-top: 2rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group > label {
  display: block;
  margin-bottom: 0.5rem;
  font-size: var(--text-small);
  font-weight: 500;
  color: var(--color-text-strong);
}

.form-group input[type="text"],
.form-group textarea {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid var(--color-border-strong);
  border-radius: var(--radius-md);
  background: var(--color-canvas);
  color: var(--color-text-strong);
  font: inherit;
  transition: border-color var(--duration-fast) ease;
}

.form-group input[type="text"]:hover,
.form-group textarea:hover {
  border-color: var(--color-text-muted);
}

.form-group input::placeholder,
.form-group textarea::placeholder {
  color: var(--color-text-muted);
}

.form-group textarea {
  min-height: 100px;
  resize: vertical;
}

.checkbox-group {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem 1.25rem;
  padding: 0.25rem 0;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: var(--text-small);
  cursor: pointer;
}

.checkbox-label input[type="checkbox"] {
  width: 1rem;
  height: 1rem;
  margin: 0;
  accent-color: var(--color-ink);
  cursor: pointer;
}

.submit-btn {
  width: 100%;
  margin-top: 0.5rem;
}
</style>
