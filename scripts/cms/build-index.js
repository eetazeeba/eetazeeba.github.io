const fs = require("fs");
const path = require("path");
const { CONTENT_ROOT, loadContentEntries } = require("./lib/content");

const OUTPUT_PATH = path.join(CONTENT_ROOT, "_index.json");

function toSlug(entry) {
  return path.basename(entry.filePath, ".md");
}

function run() {
  const entries = loadContentEntries().map((entry) => {
    const { data, relPath } = entry;
    return {
      id: data.id || null,
      slug: toSlug(entry),
      type: data.type || null,
      status: data.status || null,
      title: data.title || null,
      summary: data.summary || null,
      tags: Array.isArray(data.tags) ? data.tags : [],
      media_types: Array.isArray(data.media_types) ? data.media_types : [],
      author: Array.isArray(data.author) ? data.author : data.author ? [data.author] : [],
      published_at: data.published_at || null,
      updated_at: data.updated_at || null,
      related_ids: Array.isArray(data.related_ids) ? data.related_ids : [],
      source: relPath.replace(/\\/g, "/"),
    };
  });

  entries.sort((a, b) => {
    if (!a.published_at && !b.published_at) return 0;
    if (!a.published_at) return 1;
    if (!b.published_at) return -1;
    return a.published_at < b.published_at ? 1 : -1;
  });

  const tagMap = {};
  for (const entry of entries) {
    for (const tag of entry.tags) {
      if (!tagMap[tag]) tagMap[tag] = [];
      tagMap[tag].push(entry.id || entry.slug);
    }
  }

  const payload = {
    generated_at: new Date().toISOString(),
    totals: {
      entries: entries.length,
      blog: entries.filter((e) => e.type === "blog").length,
      profiles: entries.filter((e) => e.type === "profile").length,
      lessons: entries.filter((e) => e.type === "lesson").length,
    },
    entries,
    tags: tagMap,
  };

  fs.writeFileSync(OUTPUT_PATH, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
  console.log(`Wrote ${OUTPUT_PATH}`);
}

run();
