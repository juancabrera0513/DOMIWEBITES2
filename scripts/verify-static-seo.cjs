const fs = require("fs");
const path = require("path");
const {
  PRIVATE_ROUTES,
  SITE_URL,
  outputPathForRoute,
  sitemapPaths,
} = require("./generate-static-seo.cjs");

const ROOT = path.resolve(__dirname, "..");
const BUILD_DIR = path.join(ROOT, "build");
const sitemap = fs.readFileSync(path.join(ROOT, "public", "sitemap.xml"), "utf8");
const publicRoutes = sitemapPaths(sitemap);
const publicRouteSet = new Set(publicRoutes);
const failures = [];

function countMatches(value, pattern) {
  return [...value.matchAll(pattern)].length;
}

function check(condition, message) {
  if (!condition) failures.push(message);
}

function verifyJsonLd(html, routePath) {
  const scripts = [...html.matchAll(
    /<script[^>]+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi
  )];
  check(scripts.length > 0, `${routePath}: missing JSON-LD`);
  for (const [, json] of scripts) {
    try {
      JSON.parse(json);
    } catch (error) {
      failures.push(`${routePath}: invalid JSON-LD (${error.message})`);
    }
  }
}

for (const routePath of publicRoutes) {
  const outputPath = outputPathForRoute(routePath);
  check(fs.existsSync(outputPath), `${routePath}: output file is missing`);
  if (!fs.existsSync(outputPath)) continue;

  const html = fs.readFileSync(outputPath, "utf8");
  const canonical = `${SITE_URL}${routePath === "/" ? "/" : routePath}`;
  check(html.includes('data-prerendered="true"'), `${routePath}: body was not pre-rendered`);
  check(/<html[^>]+lang="en"/i.test(html), `${routePath}: HTML language is missing`);
  check(countMatches(html, /<main\b/gi) === 1, `${routePath}: expected one main element`);
  check(countMatches(html, /<h1\b/gi) === 1, `${routePath}: expected one H1`);
  check(!/<div id="root"><\/div>/i.test(html), `${routePath}: React root is empty`);
  check(!/name="robots" content="noindex/i.test(html), `${routePath}: public route is noindex`);
  check(
    html.includes(`rel="canonical" href="${canonical}"`),
    `${routePath}: canonical URL is incorrect`
  );
  check(countMatches(html, /<title\b/gi) === 1, `${routePath}: expected one title element`);
  check(
    countMatches(html, /<link[^>]+rel="canonical"/gi) === 1,
    `${routePath}: expected one canonical link`
  );
  check(
    countMatches(html, /<meta[^>]+name="description"/gi) === 1,
    `${routePath}: expected one meta description`
  );
  verifyJsonLd(html, routePath);

  const internalLinks = [...html.matchAll(/href="(\/[^"#]*)"/gi)].map(
    (match) => match[1].replace(/&amp;/g, "&")
  );
  for (const href of internalLinks) {
    const pathname = new URL(href, SITE_URL).pathname.replace(/\/+$/, "") || "/";
    if (path.extname(pathname)) continue;
    check(
      publicRouteSet.has(pathname),
      `${routePath}: internal link points to unknown route ${pathname}`
    );
  }
}

for (const routePath of Object.keys(PRIVATE_ROUTES)) {
  const outputPath = outputPathForRoute(routePath);
  check(fs.existsSync(outputPath), `${routePath}: noindex shell is missing`);
  if (!fs.existsSync(outputPath)) continue;
  const html = fs.readFileSync(outputPath, "utf8");
  check(
    html.includes('name="robots" content="noindex,follow"'),
    `${routePath}: noindex directive is missing`
  );
}

const notFoundPath = path.join(BUILD_DIR, "404.html");
check(fs.existsSync(notFoundPath), "/404: output file is missing");
if (fs.existsSync(notFoundPath)) {
  const html = fs.readFileSync(notFoundPath, "utf8");
  check(html.includes('name="robots" content="noindex,follow"'), "/404: noindex is missing");
}

const robots = fs.readFileSync(path.join(ROOT, "public", "robots.txt"), "utf8");
check(/User-agent:\s*\*/i.test(robots), "robots.txt: wildcard group is missing");
check(/Allow:\s*\//i.test(robots), "robots.txt: public crawling is not allowed");
check(!/^Disallow:/im.test(robots), "robots.txt: noindex routes must remain crawlable");
check(robots.includes(`${SITE_URL}/sitemap.xml`), "robots.txt: sitemap URL is missing");

if (failures.length) {
  console.error(`SEO build verification failed with ${failures.length} issue(s):`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(
  `Verified ${publicRoutes.length} crawlable pages, ${
    Object.keys(PRIVATE_ROUTES).length
  } noindex routes, robots.txt, JSON-LD, and the 404 page.`
);
