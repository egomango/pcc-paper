import { chromium } from 'playwright';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PUBLIC_OG = resolve(__dirname, '..', 'public', 'og.png');

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 2 });
await page.goto('http://localhost:4321/og-preview');
await page.waitForSelector('#og-svg [data-cell]');
await page.screenshot({ path: PUBLIC_OG });
await browser.close();
console.log('OG image written to', PUBLIC_OG);
