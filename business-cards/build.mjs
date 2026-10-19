// Fills front.template.svg once per person in people.json and copies back.svg, once per theme,
// writing print-ready files (guides stripped) to build/. Run: node business-cards/build.mjs
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const dir = new URL("./", import.meta.url);
const out = new URL("build/", dir);
const read = (name) => readFileSync(new URL(name, dir), "utf8");
const stripGuides = (svg) =>
  svg.replace(/\n *<!-- guides:start -->[\s\S]*?<!-- guides:end -->/, "");
const escapeXml = (s) =>
  s.replace(
    /[&<>"]/g,
    (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c],
  );

// The sources are drawn in the light theme. Other themes swap its exact hex values, so the sources stay valid
// SVGs that open as-is in Affinity. Colors are quark.autobutler.org tokens (assets/main.css); dark is its warm
// dark variant. QR tiles stay white with black modules in every theme so they scan; the Quark mark never changes.
const THEMES = {
  light: {},
  dark: {
    "#f7f6f3": "#161615", // --color-canvas
    "#111111": "#f2f1ee", // --color-text-strong / --color-ink
    "#2f3437": "#d6d5d0", // --color-text
    "#6a6964": "#9c9a94", // --color-text-muted
  },
};
const applyTheme = (svg, map) =>
  Object.entries(map).reduce(
    (acc, [from, to]) => acc.replaceAll(`"${from}"`, `"${to}"`),
    svg,
  );

const front = stripGuides(read("front.template.svg"));
const back = stripGuides(read("back.svg"));
const people = JSON.parse(read("people.json"));

mkdirSync(out, { recursive: true });
for (const person of people) {
  // TITLE is set as an uppercase eyebrow; SVG 1.1 has no text-transform, so uppercase it here.
  const fields = {
    NAME: person.name,
    TITLE: person.title.toUpperCase(),
    EMAIL: person.email,
  };
  const svg = front.replace(/\{\{(NAME|TITLE|EMAIL)\}\}/g, (_, key) =>
    escapeXml(fields[key]),
  );
  for (const [theme, map] of Object.entries(THEMES)) {
    writeFileSync(
      new URL(`${person.slug}-front-${theme}.svg`, out),
      applyTheme(svg, map),
    );
  }
}
for (const [theme, map] of Object.entries(THEMES)) {
  writeFileSync(new URL(`back-${theme}.svg`, out), applyTheme(back, map));
}
console.log(
  `wrote ${people.length} fronts + 1 back x ${Object.keys(THEMES).length} themes to ${out.pathname}`,
);
