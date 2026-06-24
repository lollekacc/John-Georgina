const http = require("http");
const fs = require("fs");
const path = require("path");

const root = process.cwd();
const types = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "text/javascript",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".jfif": "image/jpeg",
  ".mov": "video/quicktime",
  ".mp4": "video/mp4",
  ".mp3": "audio/mpeg",
};

http
  .createServer((request, response) => {
    const url = decodeURIComponent(request.url.split("?")[0]);
    const target = path.join(root, url === "/" ? "index.html" : url);

    if (!target.startsWith(root)) {
      response.writeHead(403);
      response.end("Forbidden");
      return;
    }

    fs.readFile(target, (error, data) => {
      if (error) {
        response.writeHead(404);
        response.end("Not found");
        return;
      }

      response.writeHead(200, {
        "Content-Type": types[path.extname(target)] || "application/octet-stream",
      });
      response.end(data);
    });
  })
  .listen(4173, "127.0.0.1", () => {
    console.log("http://127.0.0.1:4173");
  });
