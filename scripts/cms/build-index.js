const fs = require("fs");
const path = require("path");
const { CONTENT_ROOT, loadContentEntries } = require("./lib/content");

const OUTPUT_PATH = path.join(CONTENT_ROOT, "_index.json");

function toSlug(entry) {
  return path.basename(entry.filePath, ".md");
}

function parseSortableDate(value) {
  if (!value || typeof value !== "string") {
    return null;
  }

  const raw = value.trim();
  const dateOnlyMatch = raw.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  const minutePrecisionMatch = raw.match(/^(\d{4})-(\d{2})-(\d{2})[ T](\d{2}):(\d{2})$/);

  if (dateOnlyMatch) {
    return Date.UTC(
      Number(dateOnlyMatch[1]),
      Number(dateOnlyMatch[2]) - 1,
      Number(dateOnlyMatch[3])
    );
  }

  if (minutePrecisionMatch) {
    return Date.UTC(
      Number(minutePrecisionMatch[1]),
      Number(minutePrecisionMatch[2]) - 1,
      Number(minutePrecisionMatch[3]),
      Number(minutePrecisionMatch[4]),
      Number(minutePrecisionMatch[5])
    );
  }

  const parsed = new Date(raw);
  return Number.isNaN(parsed.getTime()) ? null : parsed.getTime();
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
      bucket: data.bucket || null,
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
    const aSortValue = parseSortableDate(a.published_at);
    const bSortValue = parseSortableDate(b.published_at);

    if (aSortValue === null && bSortValue === null) return 0;
    if (aSortValue === null) return 1;
    if (bSortValue === null) return -1;
    return aSortValue < bSortValue ? 1 : -1;
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
