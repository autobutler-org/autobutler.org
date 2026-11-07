import assert from "node:assert/strict";
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { test } from "node:test";

const root = new URL("..", import.meta.url).pathname;
const read = (file) => readFileSync(join(root, file), "utf8");

const frontmatterKeys = (markdown) =>
  [
    ...(markdown.match(/^---\n([\s\S]*?)\n---/)?.[1] ?? "").matchAll(
      /^(\w+):/gm,
    ),
  ].map((match) => match[1]);

const posts = readdirSync(join(root, "content/blogs")).filter((file) =>
  file.endsWith(".md"),
);

test("every blog post names its author and date", () => {
  for (const post of posts) {
    const keys = frontmatterKeys(read(`content/blogs/${post}`));
    assert.ok(keys.includes("author"), `${post} has no author`);
    assert.ok(keys.includes("date"), `${post} has no date`);
  }
});

test("the content schema exposes author and date to the post page", () => {
  const config = read("content.config.ts");
  assert.match(config, /author:\s*z\./);
  assert.match(config, /date:\s*z\./);
  const post = read("pages/blogs/[...slug].vue");
  assert.match(post, /page\.author/);
  assert.match(post, /page\.date/);
});
