const path = require("path");
const MarkdownIt = require("markdown-it");
const { loadContentEntries } = require("../../scripts/cms/lib/content");

const markdown = new MarkdownIt({
  html: false,
  linkify: true
});

const PUBLIC_BUCKETS = [
  {
    slug: "guides",
    title: "Guides",
    shortLabel: "Guides",
    landingSummary: "Evergreen walkthroughs, checklists, and practical help for recurring artist problems.",
    hubDescription: "Evergreen walkthroughs, checklists, and practical guides for independent artists who need clear next steps without bloated course-speak.",
    ctaLabel: "Open guides"
  },
  {
    slug: "articles",
    title: "Articles",
    shortLabel: "Articles",
    landingSummary: "Editorial notes, perspective pieces, and field observations that add context without drowning the site in commentary.",
    hubDescription: "Editorial notes, essays, and perspective pieces that help artists think through decisions, tradeoffs, and the shape of the work.",
    ctaLabel: "Open articles"
  },
  {
    slug: "case-studies",
    title: "Case Studies",
    shortLabel: "Case studies",
    landingSummary: "Applied breakdowns and proof-oriented reading for work that benefits from a clearer process lens.",
    hubDescription: "Process breakdowns and applied examples that show how creative work moves from vague intention into something more legible and useful.",
    ctaLabel: "Open case studies"
  }
];

const BUCKET_MAP = new Map(PUBLIC_BUCKETS.map((bucket) => [bucket.slug, bucket]));

function toTitleCase(value) {
  return String(value || "")
    .split("-")
    .filter(Boolean)
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join(" ");
}

function normalizeBucket(value) {
  if (!value || typeof value !== "string") {
    return "articles";
  }

  return value.trim().toLowerCase();
}

function asArray(value) {
  if (Array.isArray(value)) {
    return value.filter(Boolean);
  }

  if (value === undefined || value === null || value === "") {
    return [];
  }

  return [value];
}

function metadataItem(label, href = null) {
  if (!label) {
    return null;
  }

  return href ? { label, href } : { label };
}

function buildPostCountLabel(count, qualifier = null) {
  const normalizedCount = Number.isInteger(count) && count >= 0 ? count : 0;
  const noun = normalizedCount === 1 ? "post" : "posts";

  return qualifier
    ? `${normalizedCount} ${qualifier} ${noun}`
    : `${normalizedCount} ${noun}`;
}

function buildBucketDisplayMeta(title, count) {
  const countLabelShort = buildPostCountLabel(count);
  const countLabelLong = buildPostCountLabel(count, "published");

  return {
    compactLabel: `${title} / ${countLabelShort}`,
    countLabelShort,
    countLabelLong
  };
}

function isPublicEntry(data) {
  const visibility = data.visibility || "public";
  return data.status === "published" && visibility === "public";
}

function toDateLabel(date) {
  if (!date) {
    return null;
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC"
  }).format(date);
}

function toDateTimeLabel(date) {
  if (!date) {
    return null;
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZone: "UTC",
    timeZoneName: "short"
  }).format(date);
}

function buildTimestampMeta(value) {
  if (!value) {
    return null;
  }

  const raw = String(value).trim();
  const dateOnlyMatch = raw.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  const minutePrecisionMatch = raw.match(/^(\d{4})-(\d{2})-(\d{2})[ T](\d{2}):(\d{2})$/);
  const hasMinutePrecision = Boolean(minutePrecisionMatch || /[T ]\d{2}:\d{2}/.test(raw));
  let date = null;

  if (dateOnlyMatch) {
    date = new Date(Date.UTC(
      Number(dateOnlyMatch[1]),
      Number(dateOnlyMatch[2]) - 1,
      Number(dateOnlyMatch[3])
    ));
  } else if (minutePrecisionMatch) {
    date = new Date(Date.UTC(
      Number(minutePrecisionMatch[1]),
      Number(minutePrecisionMatch[2]) - 1,
      Number(minutePrecisionMatch[3]),
      Number(minutePrecisionMatch[4]),
      Number(minutePrecisionMatch[5])
    ));
  } else {
    date = new Date(raw);
  }

  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return {
    raw,
    hasMinutePrecision,
    dateLabel: toDateLabel(date),
    dateTimeLabel: toDateTimeLabel(date),
    sortValue: date.getTime()
  };
}

function buildBucketMeta(bucketSlug) {
  const known = BUCKET_MAP.get(bucketSlug);

  if (known) {
    return {
      ...known,
      url: `/blog/${bucketSlug}/`,
      isPublicBucket: true
    };
  }

  const title = toTitleCase(bucketSlug);

  return {
    slug: bucketSlug,
    title,
    shortLabel: title,
    landingSummary: "Additional writing lane prepared for future editorial expansion.",
    hubDescription: "Additional writing lane prepared for future editorial expansion.",
    ctaLabel: `Open ${title.toLowerCase()}`,
    url: `/blog/${bucketSlug}/`,
    isPublicBucket: false
  };
}

function buildEntry(entry) {
  const { data, body } = entry;
  const slug = path.basename(entry.filePath, ".md");
  const bucket = normalizeBucket(data.bucket);
  const bucketMeta = buildBucketMeta(bucket);
  const author = asArray(data.author);
  const publishedTimestamp = buildTimestampMeta(data.published_at);
  const updatedTimestamp = buildTimestampMeta(data.updated_at);
  const readingTimeMinutes = Number.isInteger(data.reading_time_minutes)
    ? data.reading_time_minutes
    : null;
  const publishedLabel = publishedTimestamp ? publishedTimestamp.dateLabel : null;
  const updatedLabel = updatedTimestamp ? updatedTimestamp.dateLabel : null;
  const metadataParts = [
    bucketMeta.shortLabel,
    readingTimeMinutes ? `${readingTimeMinutes} min read` : null,
    publishedLabel
  ].filter(Boolean);
  const showUpdatedLine = Boolean(
    updatedTimestamp &&
    (!publishedTimestamp || updatedTimestamp.raw !== publishedTimestamp.raw)
  );
  const articleUpdatedLabel = showUpdatedLine
    ? (updatedTimestamp.hasMinutePrecision ? updatedTimestamp.dateTimeLabel : updatedTimestamp.dateLabel)
    : null;
  const articleMetadataLabel = metadataParts.join(" / ");
  const metadataItems = [
    bucketMeta.isPublicBucket
      ? {
          label: bucketMeta.shortLabel,
          href: bucketMeta.url
        }
      : {
          label: bucketMeta.shortLabel
        },
    readingTimeMinutes
      ? {
          label: `${readingTimeMinutes} min read`
        }
      : null,
    publishedLabel
      ? {
          label: publishedLabel
        }
      : null
  ].filter(Boolean);
  const articleDetailItems = [
    author.length
      ? {
          label: `By ${author.join(", ")}`
        }
      : null,
    articleUpdatedLabel
      ? {
          label: `Updated ${articleUpdatedLabel}`
        }
      : null
  ].filter(Boolean);

  return {
    id: data.id || slug,
    slug,
    type: data.type,
    status: data.status,
    title: data.title,
    summary: data.summary || "",
    author,
    publishedAt: data.published_at || null,
    updatedAt: data.updated_at || null,
    publishedLabel,
    updatedLabel,
    publishedTimestamp,
    updatedTimestamp,
    showUpdatedLine,
    articleUpdatedLabel,
    readingTimeMinutes,
    metadataLabel: articleMetadataLabel,
    articleMetadataLabel,
    metadataItems,
    articleDetailItems,
    copyright: data.copyright || null,
    tags: asArray(data.tags),
    relatedIds: asArray(data.related_ids),
    series: data.series || null,
    bucket,
    bucketTitle: bucketMeta.title,
    bucketShortLabel: bucketMeta.shortLabel,
    bucketUrl: bucketMeta.isPublicBucket ? bucketMeta.url : "/blog/",
    bucketIsPublic: bucketMeta.isPublicBucket,
    heroImagePath: data.hero_image || null,
    socialImagePath: data.hero_image || null,
    canonicalUrl: data.canonical_url || null,
    url: `/blog/${bucket}/${slug}/`,
    source: entry.relPath.replace(/\\/g, "/"),
    htmlContent: markdown.render(body || ""),
    isFeatured: asArray(data.tags).includes("featured"),
    visibility: data.visibility || "public"
  };
}

function comparePublishedDesc(a, b) {
  const aSortValue = a.publishedTimestamp ? a.publishedTimestamp.sortValue : null;
  const bSortValue = b.publishedTimestamp ? b.publishedTimestamp.sortValue : null;

  if (aSortValue === null && bSortValue === null) {
    return a.title.localeCompare(b.title);
  }

  if (aSortValue === null) {
    return 1;
  }

  if (bSortValue === null) {
    return -1;
  }

  if (aSortValue === bSortValue) {
    return a.title.localeCompare(b.title);
  }

  return aSortValue < bSortValue ? 1 : -1;
}

const allEntries = loadContentEntries()
  .filter((entry) => entry.data && entry.data.type === "blog")
  .map(buildEntry)
  .sort(comparePublishedDesc);

const entryMap = new Map(allEntries.map((entry) => [entry.id, entry]));

const publishedEntries = allEntries.filter((entry) => isPublicEntry(entry));
const featuredEntries = publishedEntries.filter((entry) => entry.isFeatured);

const publicBuckets = PUBLIC_BUCKETS.map((bucket) => {
  const entries = publishedEntries.filter((entry) => entry.bucket === bucket.slug);
  const count = entries.length;
  const displayMeta = buildBucketDisplayMeta(bucket.title, count);

  return {
    ...bucket,
    url: `/blog/${bucket.slug}/`,
    count,
    entries,
    latestEntry: entries[0] || null,
    displayMeta,
    countLabel: displayMeta.countLabelLong
  };
});

const publicBucketMap = publicBuckets.reduce((accumulator, bucket) => {
  accumulator[bucket.slug] = bucket;
  return accumulator;
}, {});

const featuredLeadCard = {
  kind: "editorial",
  title: "A curated lane for independent artists who need clearer next steps",
  summary: "Begin with a strong guide, then move outward into the broader reading lanes once you know which part of the work needs attention.",
  metadataItems: [
    metadataItem("Start here"),
    metadataItem("Guides lane")
  ].filter(Boolean),
  href: "/blog/guides/",
  ctaLabel: "Start with guides"
};

const featuredStory = featuredEntries[0] || publishedEntries[0] || null;

const landingFeaturedCards = [
  featuredLeadCard,
  featuredStory
    ? {
        kind: "entry",
        title: featuredStory.title,
        summary: featuredStory.summary,
        metadataItems: [
          metadataItem(
            `Featured ${featuredStory.bucketShortLabel.toLowerCase()}`,
            featuredStory.bucketIsPublic ? featuredStory.bucketUrl : null
          ),
          metadataItem(
            featuredStory.readingTimeMinutes ? `${featuredStory.readingTimeMinutes} min read` : null
          ),
          metadataItem(featuredStory.publishedLabel)
        ].filter(Boolean),
        href: featuredStory.url,
        ctaLabel: "Read featured post",
        entry: featuredStory
      }
    : null,
  publicBucketMap["articles"]
    ? {
        kind: "bucket",
        title: publicBucketMap["articles"].title,
        summary: publicBucketMap["articles"].landingSummary,
        metadataItems: [
          metadataItem("Perspective lane"),
          metadataItem(publicBucketMap["articles"].displayMeta.countLabelLong)
        ].filter(Boolean),
        href: publicBucketMap["articles"].url,
        ctaLabel: publicBucketMap["articles"].ctaLabel,
        bucket: publicBucketMap["articles"]
      }
    : null,
  publicBucketMap["case-studies"]
    ? {
        kind: "bucket",
        title: publicBucketMap["case-studies"].title,
        summary: publicBucketMap["case-studies"].landingSummary,
        metadataItems: [
          metadataItem("Applied lane"),
          metadataItem(publicBucketMap["case-studies"].displayMeta.countLabelLong)
        ].filter(Boolean),
        href: publicBucketMap["case-studies"].url,
        ctaLabel: publicBucketMap["case-studies"].ctaLabel,
        bucket: publicBucketMap["case-studies"]
      }
    : null
].filter(Boolean);

const priorityLaneCards = publicBuckets.map((bucket) => ({
  ...bucket,
  title: bucket.title,
  summary: bucket.landingSummary,
  metadataItems: [
    metadataItem(`${bucket.shortLabel} lane`, bucket.url),
    metadataItem(bucket.displayMeta.countLabelLong)
  ].filter(Boolean)
}));

const recentEntries = publishedEntries.slice(0, 6);

for (const entry of allEntries) {
  entry.relatedBlogEntries = entry.relatedIds
    .map((id) => entryMap.get(id))
    .filter((relatedEntry) => relatedEntry && relatedEntry.type === "blog" && isPublicEntry(relatedEntry));
}

module.exports = {
  allEntries,
  entryMap,
  publishedEntries,
  featuredEntries,
  featuredStory,
  recentEntries,
  publicBuckets,
  publicBucketMap,
  landingFeaturedCards,
  priorityLaneCards
};
