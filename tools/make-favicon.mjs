// Generates public/favicon.ico: a square RGBA icon with the brand mark on a light pad.
import sharp from 'sharp';
import path from 'node:path';

const input = path.resolve('public/brand/bryn-mark.png');
const output = path.resolve('public/favicon.ico');

const source = await sharp(input).png().toFile('tools/favicon-tmp.png');
const { width, height } = await sharp('tools/favicon-tmp.png').metadata();

const bg = { r: 250, g: 250, b: 250, alpha: 1 };
const pad = Math.round(Math.max(width, height) * 0.09);

await sharp('tools/favicon-tmp.png')
  .resize(Math.max(width, height), Math.max(width, height), { fit: 'fill', background: bg })
  .extend({ top: pad, left: pad, right: pad, bottom: pad, background: bg })
  .toFile(output);
console.log('wrote', output);
