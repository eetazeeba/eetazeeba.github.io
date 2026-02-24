#!/usr/bin/env node

const http = require("http");
const fs = require("fs");
const path = require("path");

const HOST = process.env.HOST || "127.0.0.1";
const PORT = Number(process.env.PORT) || 8080;
const ROOT = process.cwd();

const MIME_TYPES = {
  ".css": "text/css; charset=utf-8",
  ".gif": "image/gif",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".mp3": "audio/mpeg",
  ".mp4": "video/mp4",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".txt": "text/plain; charset=utf-8",
  ".webp": "image/webp",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
};

function sendText(res, statusCode, body) {
  res.writeHead(statusCode, { "Content-Type": "text/plain; charset=utf-8" });
  res.end(body);
}

const server = http.createServer((req, res) => {
  const requestUrl = new URL(req.url, `http://${req.headers.host || `${HOST}:${PORT}`}`);
  let pathname;

  try {
    pathname = decodeURIComponent(requestUrl.pathname);
  } catch {
    sendText(res, 400, "400 Bad Request");
    return;
  }

  if (pathname.endsWith("/")) {
    pathname += "index.html";
  }

  const relativePath = pathname.replace(/^\/+/, "");
  const fullPath = path.normalize(path.join(ROOT, relativePath));
  const relativeToRoot = path.relative(ROOT, fullPath);

  if (relativeToRoot.startsWith("..") || path.isAbsolute(relativeToRoot)) {
    sendText(res, 403, "403 Forbidden");
    return;
  }

  fs.stat(fullPath, (statErr, stats) => {
    if (statErr || !stats.isFile()) {
      sendText(res, 404, "404 Not Found");
      return;
    }

    const ext = path.extname(fullPath).toLowerCase();
    const contentType = MIME_TYPES[ext] || "application/octet-stream";

    res.writeHead(200, { "Content-Type": contentType });
    const stream = fs.createReadStream(fullPath);
    stream.pipe(res);
    stream.on("error", () => sendText(res, 500, "500 Internal Server Error"));
  });
});

server.listen(PORT, HOST, () => {
  console.log("Local server running.");
  console.log(`Open: http://${HOST}:${PORT}`);
  console.log("Press Ctrl+C to stop.");
});

server.on("error", (err) => {
  if (err.code === "EADDRINUSE") {
    console.error(`Port ${PORT} is already in use. Try: PORT=8081 npm start`);
    process.exit(1);
  }
  console.error("Server error:", err.message);
  process.exit(1);
});
