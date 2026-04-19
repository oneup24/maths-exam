/**
 * convert-images.mjs — Convert public mascot PNGs to WebP
 * Run automatically as "prebuild" before every vite build.
 */
import sharp from 'sharp';
import { readdir } from 'fs/promises';
import { join, extname, basename } from 'path';

const PUBLIC = 'public';
const QUALITY = 82;

// Only convert the runtime-served images (not app icons / splash)
const TARGETS = ['mascot.png', 'mascot-happy.png', 'mascot-ok.png', 'mascot-sad.png'];

for (const file of TARGETS) {
  const src  = join(PUBLIC, file);
  const dest = join(PUBLIC, basename(file, '.png') + '.webp');
  await sharp(src).webp({ quality: QUALITY }).toFile(dest);
  const { size: s } = await import('fs').then(m => m.promises.stat(src));
  const { size: d } = await import('fs').then(m => m.promises.stat(dest));
  console.log(`  ${file} → ${basename(dest)}  ${(s/1024).toFixed(0)}kB → ${(d/1024).toFixed(0)}kB`);
}
console.log('✓ WebP conversion done');
