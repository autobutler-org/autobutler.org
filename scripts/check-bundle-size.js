#!/usr/bin/env node
/**
 * Bundle size budget check.
 *
 * Scans the .output/public directory after `npm run generate` and enforces
 * size budgets per resource type. Exits non-zero if any budget is exceeded.
 *
 * Budgets (uncompressed):
 *   JS total:    500 KB
 *   CSS total:   100 KB
 *   Images total: 500 KB
 *   Overall total: 5 MB
 */

import { readdirSync, statSync } from 'fs';
import { join, extname } from 'path';

const OUTPUT_DIR = '.output/public';

const BUDGETS = {
  js: { label: 'JavaScript', maxKB: 500 },
  css: { label: 'CSS', maxKB: 100 },
  images: { label: 'Images', maxKB: 500 },
  total: { label: 'Total', maxKB: 5120 },
};

// Source maps are excluded from budgets — they're dev artifacts and
// would inflate JS/CSS totals by 5-10x.
const EXCLUDED_EXTS = new Set(['.map']);

const EXT_MAP = {
  '.js': 'js',
  '.mjs': 'js',
  '.cjs': 'js',
  '.css': 'css',
  '.png': 'images',
  '.jpg': 'images',
  '.jpeg': 'images',
  '.gif': 'images',
  '.webp': 'images',
  '.svg': 'images',
  '.ico': 'images',
};

function walkDir(dir, results = []) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      walkDir(fullPath, results);
    } else {
      results.push(fullPath);
    }
  }
  return results;
}

function formatKB(bytes) {
  return `${(bytes / 1024).toFixed(1)} KB`;
}

let files;
try {
  files = walkDir(OUTPUT_DIR);
} catch {
  console.error(`❌ Output directory not found: ${OUTPUT_DIR}`);
  console.error('   Run `npm run generate` first.');
  process.exit(1);
}

const totals = { js: 0, css: 0, images: 0, total: 0 };

for (const file of files) {
  const ext = extname(file).toLowerCase();
  if (EXCLUDED_EXTS.has(ext)) continue;
  const size = statSync(file).size;
  totals.total += size;
  const type = EXT_MAP[ext];
  if (type) totals[type] += size;
}

console.log('\n📊 Bundle Size Report\n');

let failed = false;

for (const [key, { label, maxKB }] of Object.entries(BUDGETS)) {
  const actualKB = totals[key] / 1024;
  const budgetKB = maxKB;
  const pct = ((actualKB / budgetKB) * 100).toFixed(1);
  const over = actualKB > budgetKB;
  const icon = over ? '❌' : actualKB > budgetKB * 0.9 ? '⚠️ ' : '✅';
  console.log(
    `  ${icon} ${label.padEnd(14)} ${formatKB(totals[key]).padStart(10)} / ${formatKB(maxKB * 1024).padStart(10)}  (${pct}%)`,
  );
  if (over) failed = true;
}

console.log('');

if (failed) {
  console.error(
    '❌ One or more performance budgets exceeded. See report above.',
  );
  process.exit(1);
} else {
  console.log('✅ All performance budgets passed.');
}
