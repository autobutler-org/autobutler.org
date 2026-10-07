import assert from "node:assert/strict";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { test } from "node:test";

const root = new URL("..", import.meta.url).pathname;
const sourceDirs = ["pages", "components", "content", "layouts"];

const sourceFiles = sourceDirs.flatMap((dir) =>
  readdirSync(join(root, dir), { recursive: true, withFileTypes: true })
    .filter((entry) => entry.isFile())
    .map((entry) => join(entry.parentPath, entry.name)),
);

const filesMatching = (pattern) =>
  sourceFiles.filter((file) => pattern.test(readFileSync(file, "utf8")));

test("the login stub page is gone and nothing links to it", () => {
  assert.equal(existsSync(join(root, "pages/login.vue")), false);
  assert.deepEqual(filesMatching(/["'`]\/login\b/), []);
});

test("no links point at the old autobutler-org/autobutler repo", () => {
  assert.deepEqual(filesMatching(/autobutler-org\/autobutler(?![.\w-])/), []);
});

test("the custom error page uses the site layout and links home", () => {
  const errorPage = readFileSync(join(root, "error.vue"), "utf8");
  assert.match(errorPage, /<NuxtLayout>/);
  assert.match(errorPage, /href="\/"/);
});

test("the privacy policy names Mailchimp and claims no analytics", () => {
  const policy = readFileSync(join(root, "pages/privacy.vue"), "utf8");
  assert.match(policy, /Mailchimp/);
  assert.match(policy, /do not currently use analytics/);
  assert.doesNotMatch(policy, /We may use a small number of cookies/);
});
