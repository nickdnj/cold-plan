/**
 * Post-build pre-rendering script.
 *
 * Reads the built dist/index.html, renders each SEO-critical route using
 * React's renderToString, and writes a static HTML file per route.
 *
 * The generated HTML includes the full page content so Google's crawler
 * sees real content, not a blank shell. The SPA JavaScript then hydrates
 * on top for interactivity.
 *
 * Run: npx tsx scripts/prerender.ts
 */
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { HelmetProvider } from 'react-helmet-async';
import { createElement } from 'react';
import * as fs from 'fs';
import * as path from 'path';

// Import the app
import App from '../src/App';

const DIST = path.resolve(import.meta.dirname, '..', 'dist');
const TEMPLATE = fs.readFileSync(path.join(DIST, 'index.html'), 'utf-8');

// All routes to pre-render
const ROUTES = [
  '/',
  '/brands',
  '/brands/nyquil-cold-flu',
  '/brands/nyquil-severe',
  '/brands/theraflu-night',
  '/brands/advil-pm',
  '/brands/tylenol-pm',
  '/brands/zzzquil',
  '/brands/dayquil-cold-flu',
  '/brands/dayquil-severe',
  '/brands/theraflu-day',
  '/brands/mucinex-dm',
  '/brands/mucinex-d',
  '/brands/robitussin-dm',
  '/brands/robitussin-cf',
  '/brands/advil-cold-sinus',
  '/brands/sudafed-original',
  '/brands/sudafed-pe',
  '/brands/tylenol-cold-flu-severe',
  '/brands/alka-seltzer-plus-cold',
  '/brands/coricidin-hbp',
  '/brands/nyquil-dayquil-combo',
  '/brands/benadryl',
  '/brands/claritin',
  '/kits',
  '/kits/home',
  '/kits/travel',
  '/kits/college',
  '/kits/office',
  '/about',
  '/planner',
];

async function prerender() {
  let count = 0;

  for (const route of ROUTES) {
    const helmetContext: { helmet?: { title?: { toString(): string }; meta?: { toString(): string }; link?: { toString(): string }; script?: { toString(): string } } } = {};

    const appHtml = renderToString(
      createElement(
        HelmetProvider,
        { context: helmetContext },
        createElement(
          StaticRouter,
          { location: route },
          createElement(App)
        )
      )
    );

    const { helmet } = helmetContext;

    // Build the full HTML
    let html = TEMPLATE;

    // Replace the root div with pre-rendered content
    html = html.replace(
      '<div id="root"></div>',
      `<div id="root">${appHtml}</div>`
    );

    // Inject helmet tags into <head>
    if (helmet) {
      const headTags = [
        helmet.title?.toString() || '',
        helmet.meta?.toString() || '',
        helmet.link?.toString() || '',
        helmet.script?.toString() || '',
      ].filter(Boolean).join('\n    ');

      if (headTags) {
        html = html.replace('</head>', `    ${headTags}\n  </head>`);
      }
    }

    // Determine output path
    const outputPath = route === '/'
      ? path.join(DIST, 'index.html')
      : path.join(DIST, route, 'index.html');

    // Ensure directory exists
    const dir = path.dirname(outputPath);
    fs.mkdirSync(dir, { recursive: true });

    fs.writeFileSync(outputPath, html);
    count++;
  }

  console.log(`Pre-rendered ${count} routes to ${DIST}`);
}

prerender().catch((err) => {
  console.error('Pre-render failed:', err);
  process.exit(1);
});
