const fs = require("fs");
const path = require("path");

const SITE_ORIGIN = "https://domiwebsites.com";
const INDEXNOW_ENDPOINT = "https://api.indexnow.org/indexnow";
const ROOT = path.resolve(__dirname, "..");
const PUBLIC_DIR = path.join(ROOT, "public");
const SITEMAP_PATH = path.join(PUBLIC_DIR, "sitemap.xml");

function readKey() {
  const keyFile = fs.readdirSync(PUBLIC_DIR).find((fileName) => {
    if (!/^[a-zA-Z0-9-]{8,128}\.txt$/.test(fileName)) return false;

    const key = path.basename(fileName, ".txt");
    return fs.readFileSync(path.join(PUBLIC_DIR, fileName), "utf8").trim() === key;
  });

  if (!keyFile) {
    throw new Error("IndexNow key file was not found in public/.");
  }

  return path.basename(keyFile, ".txt");
}

function sitemapUrls() {
  const xml = fs.readFileSync(SITEMAP_PATH, "utf8");
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
}

function requestedUrls() {
  const input = process.argv.slice(2);
  return input.length > 0 ? input : sitemapUrls();
}

function validateUrls(urls) {
  const uniqueUrls = [...new Set(urls)];

  if (uniqueUrls.length === 0) {
    throw new Error("No URLs were provided and the sitemap contains no URLs.");
  }

  for (const value of uniqueUrls) {
    const url = new URL(value);
    if (url.origin !== SITE_ORIGIN) {
      throw new Error(`IndexNow URL must belong to ${SITE_ORIGIN}: ${value}`);
    }
  }

  return uniqueUrls;
}

async function submit() {
  const key = readKey();
  const urlList = validateUrls(requestedUrls());
  const response = await fetch(INDEXNOW_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify({
      host: new URL(SITE_ORIGIN).host,
      key,
      keyLocation: `${SITE_ORIGIN}/${key}.txt`,
      urlList,
    }),
  });

  if (!response.ok) {
    const details = (await response.text()).trim();
    throw new Error(
      `IndexNow returned ${response.status}${details ? `: ${details}` : ""}`
    );
  }

  console.log(`IndexNow accepted ${urlList.length} URL${urlList.length === 1 ? "" : "s"}.`);
}

submit().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
