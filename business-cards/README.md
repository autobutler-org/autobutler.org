# Business cards

Founder business cards for AutoButler, as plain SVG that opens in Affinity and browsers.

- `front.template.svg`: the front, with `{{NAME}}`, `{{TITLE}}`, `{{EMAIL}}` placeholders and a hidden `guides`
  layer (trim and safe zone)
- `back.svg`: the shared back, with QR codes for `https://autobutler.org` and `https://quark.autobutler.org`
- `quark-mark.svg`: the Quark mark as three flat vector shapes, traced from `quark.autobutler.org`'s
  `public/quark.png`; the same paths are inlined in the front
- `people.json`: who gets a card
- `fonts/`: the fonts the cards use, with their SIL Open Font License files
- `build.mjs`: fills the template per person and copies the back, once per theme, with guides stripped
- `build/`: the print files, generated and git-ignored: `<slug>-front-<theme>.svg` and `back-<theme>.svg` for
  themes `light` and `dark` (for example `brandon-front-dark.svg`, `back-light.svg`)

## Themes

The sources are drawn in the light theme, so they open as-is in Affinity. The `THEMES` const in `build.mjs` maps each
light hex to its replacement for other themes, swapped as exact attribute values. `dark` uses the site's warm dark
variant (`prefers-color-scheme: dark` in `assets/main.css`). Fonts, layout and the Quark mark are identical in both
themes, and the QR tiles stay white with black modules so they scan. To add a theme, add an entry to `THEMES`.

## Rebuild

```sh
make business-cards
```

Node stdlib only, no network. Edit `people.json` or the template, then rerun.

## Export

```sh
make business-cards-export
```

Builds the cards, then writes print-ready files for every theme to `build/export/`, rendered with the bundled fonts so
nothing depends on fonts being installed:

- `<name>.svg`: every text element converted to outlines (glyph paths), at 3.75in × 2.25in
- `<name>.pdf`: vector, fonts embedded, full 3.75in × 2.25in bleed size
- `<name>.png`: 600 dpi raster of the full bleed area (2250 × 1350 px)

Upload the PDF (or the outlined SVG) to a print service; the PNG is for previews or services that only take images.
Requires `rsvg-convert` from librsvg (`brew install librsvg`); the target tells you if it's missing.

## Print specs

- Trim size 3.5in × 2in (US standard), 0.125in bleed on all sides, so the document is 3.75in × 2.25in.
- viewBox units are 1/100 in. Trim is 12.5–362.5 × 12.5–212.5; keep text inside the safe zone,
  25–350 × 25–200 (0.125in inside the trim).
- Style follows the `quark.autobutler.org` editorial redesign (`assets/main.css`): flat bone canvas `#f7f6f3`, ink
  `#111111` for display text, `#2f3437` for emails and URLs, muted `#6a6964` for the eyebrow, white QR tiles with a
  `#d3d0c8` hairline and a 0.06in radius, and a short ink hairline rule on the front. No shadows or transparency.
- Fonts, with the same role on both sides: Newsreader 16pt Medium for the "AutoButler" wordmark; Newsreader 16pt
  Regular for names, the tagline, and the "AutoButler" / "Quark" labels; Geist Mono Regular for the uppercase
  "FOUNDER" eyebrow, emails and URLs.
- Text is live, so **install the TTFs in `fonts/` before opening the files in Affinity**, or it substitutes another
  font. The family is named `Newsreader 16pt` (its 16pt optical size).
- Before sending to a printer, select all text in Affinity and use **Layer → Convert to Curves** so the printer
  doesn't need the fonts.
- Export from Affinity as **PDF/X-4** with bleed included and crop marks on. Have the printer convert RGB to CMYK, or
  convert in Affinity and check the Quark mark's colors on a proof.

## QR codes

The QR codes are baked into `back.svg` as vector paths: ECC level Q, version 3, 4-module quiet zone, black on a white
tile. They were generated with `uqr` (already in `node_modules` as a Nuxt dependency) and decoded from a render with
`zxing-cpp` to confirm the URLs. To regenerate a path, print its module runs and paste the result into the
matching `<path d="...">` (run from the repo root):

```sh
node -e 'import("uqr").then(({ encode }) => { const { data } = encode(process.argv[1], { ecc: "Q", border: 0 });
  console.log(data.map((row, y) => row.map((on, x) => (on ? `M${x} ${y}h1v1h-1z` : "")).join("")).join("")) })' \
  https://quark.autobutler.org
```
