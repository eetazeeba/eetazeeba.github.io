const { loadContentEntries } = require("./lib/content");

const REQUIRED_FIELDS = [
  "id",
  "type",
  "title",
  "status",
  "author",
  "published_at",
  "updated_at",
  "copyright",
  "tags",
  "media_types",
];

const TYPE_VALUES = new Set(["blog", "profile", "lesson"]);
const STATUS_VALUES = new Set(["draft", "published", "archived"]);
const MEDIA_VALUES = new Set(["image", "audio", "video", "embed", "sheet", "download"]);
const LESSON_DIFFICULTY = new Set(["beginner", "intermediate", "advanced"]);
const ID_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function isIsoDate(value) {
  return typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value);
}

function isIsoDateMinute(value) {
  return typeof value === "string" && /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/.test(value);
}

function asArray(value) {
  if (Array.isArray(value)) return value;
  if (value === undefined || value === null || value === "") return [];
  return [value];
}

function validateEntry(entry) {
  const errors = [];
  const { data } = entry;

  for (const field of REQUIRED_FIELDS) {
    if (data[field] === undefined || data[field] === null || data[field] === "") {
      errors.push(`missing required field '${field}'`);
    }
  }

  if (data.type !== undefined && !TYPE_VALUES.has(data.type)) {
    errors.push(`invalid type '${data.type}'`);
  }

  if (data.id !== undefined && (typeof data.id !== "string" || !ID_PATTERN.test(data.id))) {
    errors.push("id must be lowercase URL-safe text (letters, numbers, hyphens)");
  }

  if (data.status !== undefined && !STATUS_VALUES.has(data.status)) {
    errors.push(`invalid status '${data.status}'`);
  }

  if (data.published_at !== undefined && !isIsoDate(data.published_at)) {
    errors.push("published_at must be ISO 8601 date (YYYY-MM-DD)");
  }

  if (
    data.updated_at !== undefined &&
    !isIsoDate(data.updated_at) &&
    !isIsoDateMinute(data.updated_at)
  ) {
    errors.push("updated_at must be YYYY-MM-DD or YYYY-MM-DD HH:mm");
  }

  if (data.collaboration_start !== undefined && !isIsoDate(data.collaboration_start)) {
    errors.push("collaboration_start must be ISO 8601 date (YYYY-MM-DD)");
  }

  if (!Array.isArray(data.tags)) {
    errors.push("tags must be a list");
  } else if (data.tags.some((value) => typeof value !== "string")) {
    errors.push("tags must contain only strings");
  }

  if (!Array.isArray(data.media_types)) {
    errors.push("media_types must be a list");
  } else {
    const invalidMedia = data.media_types.filter((value) => !MEDIA_VALUES.has(value));
    if (invalidMedia.length > 0) {
      errors.push(`invalid media_types: ${invalidMedia.join(", ")}`);
    }
  }

  if (data.type === "profile" && !data.role) {
    errors.push("profile entries must include role");
  }

  if (data.type === "lesson") {
    if (!data.difficulty) {
      errors.push("lesson entries must include difficulty");
    } else if (!LESSON_DIFFICULTY.has(data.difficulty)) {
      errors.push(`invalid lesson difficulty '${data.difficulty}'`);
    }
  }

  if (data.related_ids !== undefined && !Array.isArray(data.related_ids)) {
    errors.push("related_ids must be a list");
  } else if (Array.isArray(data.related_ids) && data.related_ids.some((value) => typeof value !== "string")) {
    errors.push("related_ids must contain only strings");
  }

  if (data.author !== undefined) {
    const authors = asArray(data.author);
    if (authors.length === 0 || authors.some((a) => typeof a !== "string")) {
      errors.push("author must be a string or list of strings");
    }
  }

  return errors;
}

function run() {
  const entries = loadContentEntries();
  const allErrors = [];

  if (entries.length === 0) {
    console.error("No content entries found under content/.");
    process.exit(1);
  }

  const idToEntry = new Map();
  for (const entry of entries) {
    const { data, relPath } = entry;
    const errors = validateEntry(entry);

    for (const error of errors) {
      allErrors.push(`${relPath}: ${error}`);
    }

    if (data.id) {
      if (idToEntry.has(data.id)) {
        allErrors.push(`${relPath}: duplicate id '${data.id}'`);
      } else {
        idToEntry.set(data.id, entry);
      }
    }
  }

  for (const entry of entries) {
    const related = asArray(entry.data.related_ids);
    for (const ref of related) {
      if (!idToEntry.has(ref)) {
        allErrors.push(`${entry.relPath}: related_ids contains unknown id '${ref}'`);
      }
    }
  }

  if (allErrors.length > 0) {
    console.error("CMS content validation failed:");
    for (const error of allErrors) {
      console.error(`- ${error}`);
    }
    process.exit(1);
  }

  console.log(`CMS content validation passed (${entries.length} entries).`);
}

run();
