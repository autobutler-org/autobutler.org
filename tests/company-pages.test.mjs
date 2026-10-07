import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { test } from "node:test";

const root = new URL("..", import.meta.url).pathname;
const read = (file) => readFileSync(join(root, file), "utf8");

const template = (file) => read(file).match(/<template>[\s\S]*<\/template>/)[0];

const headings = (html, level) =>
  [
    ...html.matchAll(
      new RegExp(`<h${level}[^>]*>([\\s\\S]*?)</h${level}>`, "g"),
    ),
  ].map((match) => match[1].replace(/\s+/g, " ").trim());

const about = template("pages/about.vue");

test("the about page has one h1 and the eight-section h2 outline", () => {
  assert.equal(headings(about, 1).length, 1);
  assert.deepEqual(headings(about, 2), [
    "What AutoButler does",
    "What makes AutoButler different",
    "Who uses AutoButler",
    "The team behind AutoButler",
    "How AutoButler works",
    "Key facts",
    "Frequently asked questions",
  ]);
});

test("the about page names Quark as the product and links to its site", () => {
  assert.ok(headings(about, 3).includes("Quark"));
  assert.match(about, /href="https:\/\/quark\.autobutler\.org"/);
  assert.match(about, /became\s+Quark/);
});

test("the about page lists each founder and keeps the photo", () => {
  const h3s = headings(about, 3);
  assert.ok(h3s.includes("Brandon Apol"));
  assert.ok(h3s.includes("James Orson"));
  assert.match(about, /brandon-james-atlanta\.jpeg/);
  assert.match(about, /<img[^>]*\salt="[^"]+"/);
});

test("the about page key facts are a real description list", () => {
  const list = about.match(/<dl[^>]*>([\s\S]*?)<\/dl>/)[1];
  const terms = [...list.matchAll(/<dt>([\s\S]*?)<\/dt>/g)].map((match) =>
    match[1].trim(),
  );
  assert.equal(terms.length, [...list.matchAll(/<dd>/g)].length);
  for (const term of ["Company name", "Founders", "Products", "Funding"]) {
    assert.ok(terms.includes(term), `missing key fact: ${term}`);
  }
});

test("the about page FAQ asks its questions as h3s", () => {
  const faq = about.split("Frequently asked questions")[1];
  const questions = headings(faq, 3);
  assert.ok(questions.length >= 5);
  for (const question of questions) {
    assert.match(question, /\?$/);
  }
});

test("the about page follows the branding guardrails", () => {
  const page = read("pages/about.vue");
  assert.match(about, /\b[Ww]e\b/);
  assert.doesNotMatch(page, /Autobutler\b/);
  assert.doesNotMatch(page, /the AutoButler (team|app|platform)/i);
  assert.doesNotMatch(
    page,
    /Google|Apple|iCloud|Dropbox|Microsoft|OneDrive|Synology|\bMeta\b|Facebook|Amazon/,
  );
  assert.doesNotMatch(page, /(?<![/.-])\bquark\b(?![/.-])/);
});

test("the newsletter form has a hidden honeypot named for its Mailchimp list", () => {
  const home = template("pages/index.vue");
  const [, user, list] = home.match(/subscribe\/post\?u=(\w+)&amp;id=(\w+)/);
  const honeypot = home.match(
    /<div class="honeypot" aria-hidden="true">([\s\S]*?)<\/div>/,
  )[1];
  assert.match(honeypot, /type="text"/);
  assert.match(honeypot, new RegExp(`name="b_${user}_${list}"`));
  assert.match(honeypot, /tabindex="-1"/);
  assert.match(read("pages/index.vue"), /\.honeypot\s*\{[^}]*left:\s*-5000px/);
});

test("og:title and og:url are set site-wide and twitter:card is unchanged", () => {
  const config = read("nuxt.config.ts");
  assert.match(config, /property: "og:title", content: "AutoButler"/);
  assert.match(config, /name: "twitter:card", content: "summary"/);
  assert.match(
    read("app.vue"),
    /ogUrl: \(\) => `https:\/\/autobutler\.org\$\{/,
  );
});
