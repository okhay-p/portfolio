// Derives the homepage's transparent character from the supplied artwork on a white studio backdrop.
// Thresholds are tuned to oakkar-character-v2.png; check the soles and hair edges after any change.
// Usage: node scripts/make-character-cutout.mjs [input.png] [output.webp]
import sharp from 'sharp';

const [input = 'public/images/oakkar-character-v2.png', output = 'public/images/oakkar-cutout.webp'] = process.argv.slice(2);
const { data, info } = await sharp(input).removeAlpha().raw().toBuffer({ resolveWithObject: true });
const { width: w, height: h } = info;
const px = i => [data[i * 3], data[i * 3 + 1], data[i * 3 + 2]];
const tone = i => { const [r, g, b] = px(i); const min = Math.min(r, g, b); return { lum: (r + g + b) / 3, min, sat: Math.max(r, g, b) - min }; };
const background = new Uint8Array(w * h);

// Backdrop: flood from the borders through neutral near-white pixels. The soles' cream stripe is
// warmer (saturation 17+) than the backdrop, so it stays put.
const stack = [];
for (let x = 0; x < w; x++) stack.push(x, (h - 1) * w + x);
for (let y = 0; y < h; y++) stack.push(y * w, y * w + w - 1);
while (stack.length) {
  const i = stack.pop();
  if (background[i]) continue;
  const { min, sat } = tone(i);
  if (min <= 200 || sat >= 10) continue;
  background[i] = 1;
  const x = i % w, y = (i / w) | 0;
  if (x > 0) stack.push(i - 1); if (x < w - 1) stack.push(i + 1); if (y > 0) stack.push(i - w); if (y < h - 1) stack.push(i + w);
}

// Floor: slightly warm reflections hide behind the heels. Below the lowest solid sole pixel in
// each column everything is floor, kept as a soft contact shadow.
const floorY = Math.round(h * 0.84);
const shadow = new Float32Array(w * h).fill(-1);
const solid = i => { const { lum, sat } = tone(i); return sat >= 24 || lum < 150; };
for (let x = 0; x < w; x++) {
  let lowest = floorY;
  for (let y = h - 1; y > floorY; y--) if (solid(y * w + x)) { lowest = y; break; }
  for (let y = lowest + 1; y < h; y++) { const i = y * w + x; background[i] = 1; shadow[i] = Math.max(0, Math.min(1, (250 - tone(i).lum) / 160)); }
}

// Hair: backdrop showing between curls is enclosed, so the flood can't reach it. Nothing real above
// the eyebrows is near-white; the glasses and eye whites sit lower.
for (let i = 0; i < Math.round(h * 0.105) * w; i++) { const { min, sat } = tone(i); if (min > 205 && sat < 16) background[i] = 1; }

// Fringe: neutral light pixels within 2px of the backdrop are blends with white; unpremultiply them.
const near = (x, y) => { for (let dy = -2; dy <= 2; dy++) for (let dx = -2; dx <= 2; dx++) { const xx = x + dx, yy = y + dy; if (xx >= 0 && yy >= 0 && xx < w && yy < h && background[yy * w + xx]) return true; } return false; };
const out = Buffer.alloc(w * h * 4);
for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
  const i = y * w + x, [r, g, b] = px(i), { lum, sat } = tone(i);
  if (background[i]) {
    const alpha = shadow[i] >= 0 ? shadow[i] : Math.max(0, Math.min(1, (250 - lum) / 225));
    out.set([58, 44, 36, Math.round(alpha * 255)], i * 4);
  } else if (lum > 150 && sat < 22 && near(x, y)) {
    const alpha = Math.max(0, Math.min(1, (255 - lum) / 120));
    const unblend = c => alpha > 0.02 ? Math.max(0, Math.min(255, Math.round((c - (1 - alpha) * 255) / alpha))) : 0;
    out.set([unblend(r), unblend(g), unblend(b), Math.round(alpha * 255)], i * 4);
  } else out.set([r, g, b, 255], i * 4);
}

await sharp(out, { raw: { width: w, height: h, channels: 4 } })
  .trim({ threshold: 1 })
  .extend({ top: 8, bottom: 8, left: 8, right: 8, background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .webp({ quality: 88, alphaQuality: 90 })
  .toFile(output);
const { width, height } = await sharp(output).metadata();
console.log(`Wrote ${output} (${width} × ${height}).`);
