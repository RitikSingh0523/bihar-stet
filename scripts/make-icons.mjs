// Generates PWA PNG icons from public/icon.svg (run once: node scripts/make-icons.mjs).
import sharp from 'sharp';
import fs from 'node:fs';

const svg = fs.readFileSync(new URL('../public/icon.svg', import.meta.url));
const out = (f) => new URL(`../public/${f}`, import.meta.url).pathname.replace(/^\/(\w:)/, '$1');

for (const [file, size] of [['pwa-192.png', 192], ['pwa-512.png', 512], ['apple-touch-icon.png', 180]]) {
  await sharp(svg, { density: 384 }).resize(size, size).png().toFile(out(file));
}
// Maskable icon: full-bleed background with the artwork inside the 80% safe zone.
const inner = await sharp(svg, { density: 384 }).resize(360, 360).png().toBuffer();
await sharp({ create: { width: 512, height: 512, channels: 4, background: '#4a4bf9' } })
  .composite([{ input: inner, gravity: 'centre' }]).png().toFile(out('pwa-maskable-512.png'));
console.log('icons written');
