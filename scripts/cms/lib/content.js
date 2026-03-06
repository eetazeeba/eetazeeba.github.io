const fs = require("fs");
const path = require("path");

const CONTENT_ROOT = path.resolve(__dirname, "..", "..", "..", "content");

function walkMarkdownFiles(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...walkMarkdownFiles(fullPath));
      continue;
    }
    if (entry.isFile() && entry.name.endsWith(".md")) {
      files.push(fullPath);
    }
  }

  return files;
}

function extractFrontMatter(raw) {
  if (!raw.startsWith("---\n") && !raw.startsWith("---\r\n")) {
    return { frontMatter: null, body: raw };
  }

  const newline = raw.includes("\r\n") ? "\r\n" : "\n";
  const marker = `${newline}---${newline}`;
  const end = raw.indexOf(marker, 3);

  if (end === -1) {
    return { frontMatter: null, body: raw };
  }

  const frontMatter = raw.slice(4, end);
  const body = raw.slice(end + marker.length);
  return { frontMatter, body };
}

function parseScalar(value) {
  const trimmed = value.trim();
  if (trimmed === "") return "";

  if (trimmed.startsWith("[") && trimmed.endsWith("]")) {
    const inner = trimmed.slice(1, -1).trim();
    if (!inner) return [];
    return inner.split(",").map((item) => parseScalar(item.trim()));
  }

  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1);
  }

  if (/^-?\d+$/.test(trimmed)) {
    return Number(trimmed);
  }

  if (trimmed === "true") return true;
  if (trimmed === "false") return false;

  return trimmed;
}

function parseKeyValue(line) {
  const match = line.match(/^([A-Za-z0-9_]+):\s*(.*)$/);
  if (!match) return null;
  return { key: match[1], value: match[2] };
}

function parseBlockList(lines, startIndex, baseIndent) {
  const list = [];
  let i = startIndex;

  while (i < lines.length) {
    const line = lines[i];
    if (!line.trim()) {
      i += 1;
      continue;
    }

    const indentMatch = line.match(/^(\s*)/);
    const indent = indentMatch ? indentMatch[1].length : 0;
    if (indent < baseIndent) break;

    const trimmed = line.trim();
    if (!trimmed.startsWith("- ")) break;

    const firstValue = trimmed.slice(2).trim();
    if (!firstValue) {
      i += 1;
      continue;
    }

    const kv = parseKeyValue(firstValue);
    if (!kv) {
      list.push(parseScalar(firstValue));
      i += 1;
      continue;
    }

    const obj = { [kv.key]: parseScalar(kv.value) };
    i += 1;

    while (i < lines.length) {
      const next = lines[i];
      if (!next.trim()) {
        i += 1;
        continue;
      }

      const nextIndentMatch = next.match(/^(\s*)/);
      const nextIndent = nextIndentMatch ? nextIndentMatch[1].length : 0;

      if (nextIndent <= baseIndent) break;

      const nextTrimmed = next.trim();
      if (nextTrimmed.startsWith("- ")) break;

      const childKv = parseKeyValue(nextTrimmed);
      if (childKv) {
        obj[childKv.key] = parseScalar(childKv.value);
      }
      i += 1;
    }

    list.push(obj);
  }

  return { value: list, nextIndex: i };
}

function parseFrontMatterYaml(yamlText) {
  const lines = yamlText.replace(/\r\n/g, "\n").split("\n");
  const result = {};
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    if (!line.trim() || line.trim().startsWith("#")) {
      i += 1;
      continue;
    }

    const indentMatch = line.match(/^(\s*)/);
    const indent = indentMatch ? indentMatch[1].length : 0;
    if (indent !== 0) {
      i += 1;
      continue;
    }

    const kv = parseKeyValue(line.trim());
    if (!kv) {
      i += 1;
      continue;
    }

    if (kv.value) {
      result[kv.key] = parseScalar(kv.value);
      i += 1;
      continue;
    }

    const { value, nextIndex } = parseBlockList(lines, i + 1, 2);
    result[kv.key] = value;
    i = nextIndex;
  }

  return result;
}

function loadContentEntries() {
  if (!fs.existsSync(CONTENT_ROOT)) return [];

  const files = walkMarkdownFiles(CONTENT_ROOT);
  return files.map((filePath) => {
    const raw = fs.readFileSync(filePath, "utf8");
    const { frontMatter, body } = extractFrontMatter(raw);
    const data = frontMatter ? parseFrontMatterYaml(frontMatter) : {};
    return {
      filePath,
      relPath: path.relative(path.resolve(__dirname, "..", "..", ".."), filePath),
      data,
      body,
    };
  });
}

module.exports = {
  CONTENT_ROOT,
  loadContentEntries,
};
