const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const BUILD_DIR = path.join(ROOT, "build");
const SITE_URL = "https://domiwebsites.com";
const DEFAULT_IMAGE = `${SITE_URL}/domi-websites-custom-business-software-og.jpg`;

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function sitemapPaths(xml) {
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => {
    const url = new URL(match[1]);
    if (url.origin !== SITE_URL) {
      throw new Error(`Unexpected sitemap origin: ${url.origin}`);
    }
    return url.pathname === "/" ? "/" : url.pathname.replace(/\/+$/, "");
  });
}

function buildSeoManifest() {
  return require(path.join(ROOT, "src", "data", "seoPages.json"));
}

function seoMarkup(routePath, seo) {
  const canonical = `${SITE_URL}${routePath === "/" ? "/" : routePath}`;
  const image = seo.image || DEFAULT_IMAGE;
  const type = seo.type || "website";
  const title = escapeHtml(seo.title);
  const description = escapeHtml(seo.description);
  const escapedCanonical = escapeHtml(canonical);
  const escapedImage = escapeHtml(image);

  return [
    "    <!-- static-seo:start -->",
    `    <title data-rh="true">${title}</title>`,
    `    <meta data-rh="true" name="description" content="${description}">`,
    '    <meta data-rh="true" name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1">',
    `    <link data-rh="true" rel="canonical" href="${escapedCanonical}">`,
    '    <meta data-rh="true" property="og:site_name" content="Domi Websites">',
    '    <meta data-rh="true" property="og:locale" content="en_US">',
    `    <meta data-rh="true" property="og:type" content="${type}">`,
    `    <meta data-rh="true" property="og:url" content="${escapedCanonical}">`,
    `    <meta data-rh="true" property="og:title" content="${title}">`,
    `    <meta data-rh="true" property="og:description" content="${description}">`,
    `    <meta data-rh="true" property="og:image" content="${escapedImage}">`,
    `    <meta data-rh="true" property="og:image:alt" content="${title}">`,
    '    <meta data-rh="true" property="og:image:width" content="1200">',
    '    <meta data-rh="true" property="og:image:height" content="630">',
    '    <meta data-rh="true" name="twitter:card" content="summary_large_image">',
    `    <meta data-rh="true" name="twitter:title" content="${title}">`,
    `    <meta data-rh="true" name="twitter:description" content="${description}">`,
    `    <meta data-rh="true" name="twitter:image" content="${escapedImage}">`,
    `    <meta data-rh="true" name="twitter:image:alt" content="${title}">`,
    "    <!-- static-seo:end -->",
  ].join("\n");
}

function injectSeo(template, routePath, seo) {
  const withoutTitle = template.replace(
    /\s*<title(?:\s[^>]*)?>[\s\S]*?<\/title>\s*/i,
    "\n"
  );
  return withoutTitle.replace(
    "</head>",
    `${seoMarkup(routePath, seo)}\n  </head>`
  );
}

function outputPathForRoute(routePath) {
  if (routePath === "/") return path.join(BUILD_DIR, "index.html");
  return path.join(BUILD_DIR, ...routePath.slice(1).split("/"), "index.html");
}

function generateStaticSeoPages() {
  const templatePath = path.join(BUILD_DIR, "index.html");
  const sitemapPath = path.join(ROOT, "public", "sitemap.xml");
  if (!fs.existsSync(templatePath)) {
    throw new Error("Build output is missing. Run the React build first.");
  }

  const template = fs.readFileSync(templatePath, "utf8");
  const routes = sitemapPaths(fs.readFileSync(sitemapPath, "utf8"));
  const manifest = buildSeoManifest();
  const missing = routes.filter((routePath) => !manifest[routePath]);
  const extra = Object.keys(manifest).filter(
    (routePath) => !routes.includes(routePath)
  );

  if (missing.length || extra.length) {
    throw new Error(
      `SEO route mismatch. Missing: ${missing.join(", ") || "none"}. Extra: ${
        extra.join(", ") || "none"
      }.`
    );
  }

  for (const routePath of routes) {
    const outputPath = outputPathForRoute(routePath);
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    fs.writeFileSync(
      outputPath,
      injectSeo(template, routePath, manifest[routePath]),
      "utf8"
    );
  }

  console.log(`Generated static SEO HTML for ${routes.length} public routes.`);
}

if (require.main === module) {
  generateStaticSeoPages();
}

module.exports = {
  SITE_URL,
  buildSeoManifest,
  generateStaticSeoPages,
  injectSeo,
  sitemapPaths,
};
