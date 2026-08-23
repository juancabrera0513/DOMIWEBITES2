const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const BUILD_DIR = path.join(ROOT, "build");
const SITE_URL = "https://domiwebsites.com";
const DEFAULT_IMAGE = `${SITE_URL}/domi-websites-custom-business-software-og.jpg`;

const PRIVATE_ROUTES = {
  "/thank-you": {
    title: "Thank You | Domi Websites",
    description: "Your message has been received by Domi Websites.",
  },
  "/auth/callback": {
    title: "Account Verification | Domi Websites",
    description: "Secure account verification for Domi Websites.",
  },
  "/set-password": {
    title: "Set Password | Domi Websites",
    description: "Set a password for your Domi Websites account.",
  },
  "/forgot-password": {
    title: "Reset Password | Domi Websites",
    description: "Request a password reset for your Domi Websites account.",
  },
  "/admin/login": {
    title: "Admin Login | Domi Websites",
    description: "Private administration area for Domi Websites.",
  },
  "/admin/inbox": {
    title: "Admin Inbox | Domi Websites",
    description: "Private administration area for Domi Websites.",
  },
};

const PAGE_MODULES = {
  "/": ["HomePage", "/"],
  "/about": ["AboutPage", "/about"],
  "/services": ["ServicesPage", "/services"],
  "/pricing": ["PricingPage", "/pricing"],
  "/contact": ["ContactPage", "/contact"],
  "/work": ["WorkPage", "/work"],
  "/blog": ["BlogPage", "/blog"],
  "/special": ["SpecialOfferPage", "/special"],
  "/audit": ["FreeAuditPage", "/audit"],
  "/privacy": ["PrivacyPage", "/privacy"],
  "/terms": ["TermsPage", "/terms"],
};

const SERVICE_PATHS = new Set([
  "/web-design-st-louis",
  "/small-business-websites",
  "/website-redesign-st-louis",
  "/local-seo-st-louis",
  "/customer-follow-up-tools",
  "/custom-business-tools",
]);

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function safeJson(value) {
  return JSON.stringify(value)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026");
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

function imageMimeType(imageUrl) {
  if (/\.webp(?:$|\?)/i.test(imageUrl)) return "image/webp";
  if (/\.png(?:$|\?)/i.test(imageUrl)) return "image/png";
  return "image/jpeg";
}

function breadcrumbItems(routePath, title) {
  const items = [{ name: "Home", url: `${SITE_URL}/` }];

  if (routePath.startsWith("/blog/")) {
    items.push({ name: "Blog", url: `${SITE_URL}/blog` });
  } else if (routePath.startsWith("/work/")) {
    items.push({ name: "Our Work", url: `${SITE_URL}/work` });
  } else if (SERVICE_PATHS.has(routePath)) {
    items.push({ name: "Services", url: `${SITE_URL}/services` });
  }

  if (routePath !== "/") {
    items.push({
      name: title.split("|")[0].trim(),
      url: `${SITE_URL}${routePath}`,
    });
  }

  return items;
}

function pageSchemaMarkup(routePath, seo) {
  const canonical = `${SITE_URL}${routePath === "/" ? "/" : routePath}`;
  const image = seo.image || DEFAULT_IMAGE;
  const items = breadcrumbItems(routePath, seo.title);
  let pageType = "WebPage";
  if (routePath === "/about") pageType = "AboutPage";
  if (routePath === "/contact") pageType = "ContactPage";
  if (routePath === "/blog" || routePath === "/work") pageType = "CollectionPage";

  const graph = [
    {
      "@type": pageType,
      "@id": `${canonical}#webpage`,
      url: canonical,
      name: seo.title,
      description: seo.description,
      isPartOf: { "@id": `${SITE_URL}#website` },
      about: { "@id": `${SITE_URL}#business` },
      primaryImageOfPage: {
        "@type": "ImageObject",
        url: image,
      },
      inLanguage: "en-US",
    },
  ];

  if (items.length > 1) {
    graph.push({
      "@type": "BreadcrumbList",
      "@id": `${canonical}#breadcrumb`,
      itemListElement: items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        item: item.url,
      })),
    });
    graph[0].breadcrumb = { "@id": `${canonical}#breadcrumb` };
  }

  return `<script type="application/ld+json">${safeJson({
    "@context": "https://schema.org",
    "@graph": graph,
  })}</script>`;
}

function seoMarkup(routePath, seo, options = {}) {
  const indexable = options.indexable !== false;
  const canonical = `${SITE_URL}${routePath === "/" ? "/" : routePath}`;
  const image = seo.image || DEFAULT_IMAGE;
  const type = seo.type || "website";
  const title = escapeHtml(seo.title);
  const description = escapeHtml(seo.description);
  const escapedCanonical = escapeHtml(canonical);
  const escapedImage = escapeHtml(image);
  const robots = indexable
    ? "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1"
    : "noindex,follow";

  const tags = [
    "    <!-- static-seo:start -->",
    `    <title data-rh="true">${title}</title>`,
    `    <meta data-rh="true" name="description" content="${description}">`,
    `    <meta data-rh="true" name="robots" content="${robots}">`,
    `    <link data-rh="true" rel="canonical" href="${escapedCanonical}">`,
  ];

  if (indexable) {
    tags.push(
      '    <meta data-rh="true" name="author" content="Domi Websites">',
      '    <meta data-rh="true" property="og:site_name" content="Domi Websites">',
      '    <meta data-rh="true" property="og:locale" content="en_US">',
      `    <meta data-rh="true" property="og:type" content="${type}">`,
      `    <meta data-rh="true" property="og:url" content="${escapedCanonical}">`,
      `    <meta data-rh="true" property="og:title" content="${title}">`,
      `    <meta data-rh="true" property="og:description" content="${description}">`,
      `    <meta data-rh="true" property="og:image" content="${escapedImage}">`,
      `    <meta data-rh="true" property="og:image:secure_url" content="${escapedImage}">`,
      `    <meta data-rh="true" property="og:image:type" content="${imageMimeType(image)}">`,
      `    <meta data-rh="true" property="og:image:alt" content="${title}">`,
      `    <meta data-rh="true" property="og:image:width" content="${seo.imageWidth || 1260}">`,
      `    <meta data-rh="true" property="og:image:height" content="${seo.imageHeight || 630}">`,
      '    <meta data-rh="true" name="twitter:card" content="summary_large_image">',
      `    <meta data-rh="true" name="twitter:title" content="${title}">`,
      `    <meta data-rh="true" name="twitter:description" content="${description}">`,
      `    <meta data-rh="true" name="twitter:image" content="${escapedImage}">`,
      `    <meta data-rh="true" name="twitter:image:alt" content="${title}">`,
      `    ${pageSchemaMarkup(routePath, seo)}`
    );
  }

  if (options.extraHead) tags.push(`    ${options.extraHead}`);
  tags.push("    <!-- static-seo:end -->");
  return tags.join("\n");
}

function injectSeo(template, routePath, seo, options = {}) {
  const withoutTitle = template.replace(
    /\s*<title(?:\s[^>]*)?>[\s\S]*?<\/title>\s*/i,
    "\n"
  );
  return withoutTitle.replace(
    "</head>",
    `${seoMarkup(routePath, seo, options)}\n  </head>`
  );
}

function injectStaticBody(template, bodyMarkup) {
  if (!bodyMarkup) return template;
  const rootPattern = /<div id="root"><\/div>/;
  if (!rootPattern.test(template)) {
    throw new Error("Unable to find the React root in the build template.");
  }
  return template.replace(
    rootPattern,
    `<div id="root" data-prerendered="true">${bodyMarkup}</div>`
  );
}

function outputPathForRoute(routePath) {
  if (routePath === "/") return path.join(BUILD_DIR, "index.html");
  const segments = routePath.slice(1).split("/");
  const filename = `${segments.pop()}.html`;
  return path.join(BUILD_DIR, ...segments, filename);
}

let jsxTranspilerReady = false;

function setupJsxTranspiler() {
  if (jsxTranspilerReady) return;
  const babel = require("@babel/core");
  const originalJsLoader = require.extensions[".js"];
  const projectSource = `${path.join(ROOT, "src")}${path.sep}`;

  const loader = (module, filename) => {
    if (!filename.startsWith(projectSource)) {
      return originalJsLoader(module, filename);
    }
    const result = babel.transformFileSync(filename, {
      presets: [
        [require.resolve("@babel/preset-env"), { targets: { node: "current" }, modules: "commonjs" }],
        [require.resolve("@babel/preset-react"), { runtime: "automatic" }],
      ],
      sourceMaps: false,
    });
    module._compile(result.code, filename);
  };

  require.extensions[".js"] = loader;
  require.extensions[".jsx"] = loader;
  jsxTranspilerReady = true;
}

function moduleForRoute(routePath) {
  if (routePath.startsWith("/blog/")) return ["BlogPost", "/blog/:slug"];
  if (routePath.startsWith("/work/")) return ["WorkProjectPage", "/work/:id"];
  if (SERVICE_PATHS.has(routePath)) return ["ServiceDetailPage", routePath];
  return PAGE_MODULES[routePath] || null;
}

function renderStaticRoute(routePath) {
  setupJsxTranspiler();
  require(path.join(ROOT, "src", "i18n"));

  const routeModule = moduleForRoute(routePath);
  if (!routeModule) throw new Error(`No static page component for ${routePath}`);

  const React = require("react");
  const { renderToStaticMarkup } = require("react-dom/server");
  const { HelmetProvider } = require("react-helmet-async");
  const { Route, Routes, StaticRouter } = require("react-router-dom");
  const [moduleName, routePattern] = routeModule;
  const Page = require(path.join(ROOT, "src", "pages", moduleName)).default;
  const helmetContext = {};

  const markup = renderToStaticMarkup(
    React.createElement(
      HelmetProvider,
      { context: helmetContext },
      React.createElement(
        StaticRouter,
        { location: routePath },
        React.createElement(
          Routes,
          null,
          React.createElement(Route, {
            path: routePattern,
            element: React.createElement(Page),
          })
        )
      )
    )
  );

  if (!/<main\b/i.test(markup) || !/<h1\b/i.test(markup)) {
    throw new Error(`Static HTML for ${routePath} is missing a main element or H1.`);
  }

  return {
    markup,
    helmetScripts: helmetContext.helmet?.script?.toString() || "",
  };
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
    const rendered = renderStaticRoute(routePath);
    const withBody = injectStaticBody(template, rendered.markup);
    const html = injectSeo(withBody, routePath, manifest[routePath], {
      extraHead: rendered.helmetScripts,
    });
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    fs.writeFileSync(outputPath, html, "utf8");
  }

  for (const [routePath, seo] of Object.entries(PRIVATE_ROUTES)) {
    const outputPath = outputPathForRoute(routePath);
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    fs.writeFileSync(
      outputPath,
      injectSeo(template, routePath, seo, { indexable: false }),
      "utf8"
    );
  }

  fs.writeFileSync(
    path.join(BUILD_DIR, "404.html"),
    injectSeo(
      template,
      "/404",
      {
        title: "Page Not Found | Domi Websites",
        description: "The requested page could not be found on Domi Websites.",
      },
      { indexable: false }
    ),
    "utf8"
  );

  console.log(
    `Generated crawlable static HTML for ${routes.length} public routes, ${
      Object.keys(PRIVATE_ROUTES).length
    } noindex routes, and the 404 page.`
  );
}

if (require.main === module) {
  generateStaticSeoPages();
}

module.exports = {
  PRIVATE_ROUTES,
  SITE_URL,
  buildSeoManifest,
  generateStaticSeoPages,
  injectSeo,
  injectStaticBody,
  outputPathForRoute,
  pageSchemaMarkup,
  renderStaticRoute,
  sitemapPaths,
};
