import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const rootDir = process.cwd();
const standaloneDistDir = path.join(rootDir, 'dist-standalone');
const imagesDir = path.join(rootDir, 'src/assets/images');
const iconSvgPath = path.join(rootDir, 'public/icon.svg');

console.log('Building standalone offline bundle...');
execSync('npx vite build --config vite.config.standalone.ts', {
  cwd: rootDir,
  stdio: 'inherit',
});

let html = fs.readFileSync(path.join(standaloneDistDir, 'index.html'), 'utf8');

function findFileRecursive(dir, ext) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      const found = findFileRecursive(full, ext);
      if (found) return found;
    } else if (entry.name.endsWith(ext)) {
      return full;
    }
  }
  return null;
}

const cssPath = findFileRecursive(standaloneDistDir, '.css');
const jsPath = findFileRecursive(standaloneDistDir, '.js');

if (!cssPath || !jsPath) {
  throw new Error('Could not locate compiled CSS or JS bundle in dist-standalone.');
}

const cssContent = fs.readFileSync(cssPath, 'utf8');
let jsContent = fs.readFileSync(jsPath, 'utf8');

// Embed all temple photographs directly as base64 data URIs
let embeddedImagesCount = 0;
if (fs.existsSync(imagesDir)) {
  for (const file of fs.readdirSync(imagesDir)) {
    if (!/\.(jpg|jpeg|png|webp)$/i.test(file)) continue;
    const ext = path.extname(file).slice(1).toLowerCase();
    const mime = ext === 'jpg' ? 'jpeg' : ext;
    const base64 = fs.readFileSync(path.join(imagesDir, file)).toString('base64');
    const dataUri = `data:image/${mime};base64,${base64}`;
    const urlPattern = `/src/assets/images/${file}`;
    if (jsContent.includes(urlPattern)) {
      jsContent = jsContent.split(urlPattern).join(dataUri);
      embeddedImagesCount += 1;
    }
  }
}

// Embed SVG favicon as base64 data URI
let embeddedIconTag = '';
if (fs.existsSync(iconSvgPath)) {
  const iconB64 = fs.readFileSync(iconSvgPath).toString('base64');
  embeddedIconTag = `<link rel="icon" type="image/svg+xml" href="data:image/svg+xml;base64,${iconB64}" />`;
}

// Strip external font links, manifest/apple-touch-icon links, external stylesheets, and external module scripts
html = html
  .replace(/<link[^>]+href=["']https?:\/\/[^"']*["'][^>]*>\s*/gi, '')
  .replace(/<link[^>]+rel=["'](?:apple-touch-icon|icon|manifest|stylesheet)["'][^>]*>\s*/gi, '')
  .replace(/<script[^>]+src=["'][^"']*["'][^>]*><\/script>\s*/gi, '');

// Inject embedded favicon and inline CSS inside <head>
html = html.replace(
  '</head>',
  () => `  ${embeddedIconTag}\n    <style>\n${cssContent}\n    </style>\n  </head>`,
);

// Escape closing </script> tags safely inside JS string literals before inlining
const safeJsContent = jsContent.replace(/<\/script>/gi, '<\\/script>');

// Inject inline IIFE JavaScript before </body>
html = html.replace(
  '</body>',
  () => `    <script>\n${safeJsContent}\n    </script>\n  </body>`,
);

// Write to both root SmartTempleExplorer.html and public/SmartTempleExplorer.html for direct download
const rootOutPath = path.join(rootDir, 'SmartTempleExplorer.html');
const publicOutPath = path.join(rootDir, 'public/SmartTempleExplorer.html');
fs.writeFileSync(rootOutPath, html, 'utf8');
fs.writeFileSync(publicOutPath, html, 'utf8');

// Clean temporary build folder
fs.rmSync(standaloneDistDir, { recursive: true, force: true });

// Verify standalone integrity
const unresolvedAssets = /\/src\/assets\/images\//.test(html);
const externalTag = /<(?:script|link)[^>]+(?:src|href)=["']https?:\/\//i.test(html);
const sizeMb = (Buffer.byteLength(html, 'utf8') / (1024 * 1024)).toFixed(2);

console.log(`Generated SmartTempleExplorer.html (${sizeMb} MB)`);
console.log(`Embedded temple images: ${embeddedImagesCount}`);
if (unresolvedAssets || externalTag) {
  throw new Error('Verification failed: standalone HTML still references external assets.');
}
console.log('Verification passed: 100% self-contained single HTML file.');
