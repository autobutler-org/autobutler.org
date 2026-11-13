import assert from "node:assert/strict";
import { test } from "node:test";

import { pageViewUrl, shouldCount } from "../utils/pageViews.ts";

const production = {
  hostname: "autobutler.org",
  doNotTrack: null,
  globalPrivacyControl: undefined,
};

test("page views count on the production host", () => {
  assert.equal(shouldCount(production), true);
});

test("page views do not count on localhost or a preview host", () => {
  assert.equal(shouldCount({ ...production, hostname: "localhost" }), false);
  assert.equal(
    shouldCount({ ...production, hostname: "autobutler-org.github.io" }),
    false,
  );
});

test("page views do not count under Do Not Track or Global Privacy Control", () => {
  assert.equal(shouldCount({ ...production, doNotTrack: "1" }), false);
  assert.equal(
    shouldCount({ ...production, globalPrivacyControl: true }),
    false,
  );
});

test("a page view sends the host and path and nothing else", () => {
  const url = new URL(
    pageViewUrl({ host: "autobutler.org", path: "/blogs", referrer: "" }),
  );
  assert.equal(url.origin, "https://goatcounter.cloud.autobutler.org");
  assert.deepEqual([...url.searchParams.keys()], ["p"]);
  assert.equal(url.searchParams.get("p"), "autobutler.org/blogs");
});

test("a page view sends an outside referrer without its query string", () => {
  const url = new URL(
    pageViewUrl({
      host: "autobutler.org",
      path: "/",
      referrer: "https://news.ycombinator.com/item?id=1",
    }),
  );
  assert.equal(url.searchParams.get("r"), "https://news.ycombinator.com/item");
});

test("a page view drops a referrer from the same site", () => {
  const url = new URL(
    pageViewUrl({
      host: "autobutler.org",
      path: "/about",
      referrer: "https://autobutler.org/",
    }),
  );
  assert.equal(url.searchParams.has("r"), false);
});
