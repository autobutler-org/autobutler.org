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
  const baseUrl = "https://github.com/autobutler-org/autobutler/issues/new";
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
</script>

<template>
  <PageContainer>
    <div class="support-page">
      <h1>Support</h1>
      <p class="intro">
        Found a bug? Report it directly to our GitHub issue tracker. Or, if you have a feature request, head to 
        <a
          href="https://github.com/autobutler-org/autobutler/issues/new?template=feature.yaml"
          target="_blank"
          rel="noopener"
        >our Feature request page</a>.
      </p>

      <form class="bug-report-form" @submit.prevent="submitToGitHub">
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

        <button type="submit" class="submit-btn">Open GitHub Issue</button>
      </form>
    </div>
  </PageContainer>
</template>

<style scoped>
.support-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

.support-page h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, #00ffaa, #00bbff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.intro {
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
  margin-bottom: 2rem;
}

.bug-report-form {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 2rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 500;
  margin-bottom: 0.5rem;
  font-size: 1rem;
}

.form-group input[type="text"],
.form-group textarea {
  width: 100%;
  padding: 0.75rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  color: white;
  font-size: 1rem;
  font-family: inherit;
  transition: all 0.2s;
}

.form-group input[type="text"]:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #00ffaa;
  background: rgba(255, 255, 255, 0.08);
}

.form-group textarea {
  resize: vertical;
  min-height: 100px;
}

.checkbox-group {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  padding: 0.5rem 0;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: rgba(255, 255, 255, 0.8);
  font-weight: normal;
  cursor: pointer;
  font-size: 0.95rem;
}

.checkbox-label input[type="checkbox"] {
  cursor: pointer;
  width: 18px;
  height: 18px;
  accent-color: #00ffaa;
}

.submit-btn {
  width: 100%;
  padding: 1rem 2rem;
  background: linear-gradient(135deg, #00ffaa, #00bbff);
  color: #000;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  margin-top: 1rem;
}

.submit-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 30px rgba(0, 255, 170, 0.3);
}

.submit-btn:active {
  transform: translateY(0);
}

@media (max-width: 768px) {
  .support-page {
    padding: 1rem;
  }

  .bug-report-form {
    padding: 1.5rem;
  }

  .checkbox-group {
    flex-direction: column;
    gap: 0.5rem;
  }
}
</style>
