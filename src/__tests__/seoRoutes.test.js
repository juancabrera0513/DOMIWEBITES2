import fs from "fs";
import path from "path";
import seoPages from "../data/seoPages.json";
import { blogPosts } from "../data/blogPosts";
import { PROJECTS } from "../data/projects";

const SITE_URL = "https://domiwebsites.com";
const sitemap = fs.readFileSync(
  path.join(process.cwd(), "public", "sitemap.xml"),
  "utf8"
);
const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(
  (match) => match[1]
);
const sitemapLastModified = [...sitemap.matchAll(/<lastmod>([^<]+)<\/lastmod>/g)].map(
  (match) => match[1]
);
const sitemapPaths = sitemapUrls.map((value) => new URL(value).pathname);
const expectedContentPaths = [
  "/",
  "/about",
  "/services",
  "/pricing",
  "/work",
  "/contact",
  "/audit",
  "/special",
  "/blog",
  "/privacy",
  "/terms",
  "/web-design-st-louis",
  "/small-business-websites",
  "/website-redesign-st-louis",
  "/local-seo-st-louis",
  "/customer-follow-up-tools",
  "/custom-business-tools",
  ...blogPosts.map((post) => `/blog/${post.slug}`),
  ...PROJECTS.map((project) => `/work/${project.id}`),
];

describe("public SEO routes", () => {
  test("the sitemap and SEO content cover the same routes", () => {
    expect(new Set(sitemapPaths)).toEqual(new Set(expectedContentPaths));
    expect(new Set(Object.keys(seoPages))).toEqual(
      new Set(expectedContentPaths)
    );
    expect(sitemapPaths).toHaveLength(expectedContentPaths.length);
  });

  test("every sitemap URL uses the production domain and is unique", () => {
    expect(sitemapUrls.every((url) => url.startsWith(`${SITE_URL}/`))).toBe(
      true
    );
    expect(new Set(sitemapUrls).size).toBe(sitemapUrls.length);
    expect(sitemapLastModified).toHaveLength(sitemapUrls.length);
    expect(
      sitemapLastModified.every((date) => /^\d{4}-\d{2}-\d{2}$/.test(date))
    ).toBe(true);
  });

  test("every public route has useful, unique metadata", () => {
    const entries = Object.entries(seoPages);

    for (const [routePath, seo] of entries) {
      expect(routePath.startsWith("/")).toBe(true);
      expect(seo.title.length).toBeGreaterThan(20);
      expect(seo.description.length).toBeGreaterThan(70);
      expect(seo.description.length).toBeLessThanOrEqual(170);
      if (seo.image) {
        expect(seo.image.startsWith(`${SITE_URL}/`)).toBe(true);
        expect(seo.imageWidth).toBeGreaterThan(0);
        expect(seo.imageHeight).toBeGreaterThan(0);
      }
    }

    expect(new Set(entries.map(([, seo]) => seo.title)).size).toBe(
      entries.length
    );
  });

  test("blog and portfolio metadata stays synchronized with page content", () => {
    for (const post of blogPosts) {
      const seo = seoPages[`/blog/${post.slug}`];
      expect(seo.title).toBe(`${post.title} | Domi Websites`);
      expect(seo.description).toBe(post.summary);
      expect(seo.type).toBe("article");
    }

    for (const project of PROJECTS) {
      const seo = seoPages[`/work/${project.id}`];
      expect(seo.title).toBe(`${project.title} | Domi Websites Portfolio`);
      expect(seo.description).toBe(project.description);
      expect(seo.image).toBe(`${SITE_URL}${project.image}`);
    }
  });

  test("private and conversion-only routes stay out of the sitemap", () => {
    const privatePaths = [
      "/admin/login",
      "/admin/inbox",
      "/auth/callback",
      "/set-password",
      "/forgot-password",
      "/thank-you",
    ];
    for (const routePath of privatePaths) {
      expect(sitemapPaths).not.toContain(routePath);
    }
  });
});
