// Minimal dependency-free static file server for the `deploy/` static site.
// Localhost preview only — NOT deployed. Emulates Vercel cleanUrls + deep-link
// rewrites so clean paths (/projects/maze, /build-log, /robotics-warehouse-sim)
// can be tested exactly as they'll behave in production.
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve('deploy');
const PORT = Number(process.env.PORT) || 5055;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
  '.gif': 'image/gif', '.webp': 'image/webp', '.svg': 'image/svg+xml', '.ico': 'image/x-icon',
  '.glb': 'model/gltf-binary', '.gltf': 'model/gltf+json',
  '.obj': 'text/plain; charset=utf-8', '.mtl': 'text/plain; charset=utf-8', '.bin': 'application/octet-stream',
  '.pdf': 'application/pdf',
  '.woff': 'font/woff', '.woff2': 'font/woff2', '.ttf': 'font/ttf', '.wasm': 'application/wasm',
  '.mp4': 'video/mp4', '.webm': 'video/webm', '.ogv': 'video/ogg', '.mov': 'video/quicktime', '.m4v': 'video/x-m4v',
};

const inRoot = (p) => p.startsWith(ROOT) ? p : null;
const isFile = (p) => { try { return !!p && fs.statSync(p).isFile(); } catch { return false; } };

// Resolve a request path to a file — emulates Vercel cleanUrls + SPA rewrites.
function resolveFile(urlPath) {
  if (urlPath.endsWith('/')) urlPath += 'index.html';
  const direct = inRoot(path.join(ROOT, urlPath));
  if (isFile(direct)) return direct;
  if (path.extname(urlPath) === '') {
    const asHtml = inRoot(path.join(ROOT, urlPath + '.html')); // cleanUrls: /foo -> /foo.html
    if (isFile(asHtml)) return asHtml;
    return path.join(ROOT, 'index.html'); // SPA rewrite: /projects/x, /skills, ... -> index.html
  }
  return null;
}

function serve(filePath, req, res) {
  const st = fs.statSync(filePath);
  const type = MIME[path.extname(filePath).toLowerCase()] || 'application/octet-stream';
  const range = req.headers.range;
  if (range) {
    const m = /^bytes=(\d*)-(\d*)$/.exec(range);
    if (m) {
      let start = m[1] === '' ? undefined : parseInt(m[1], 10);
      let end = m[2] === '' ? undefined : parseInt(m[2], 10);
      if (start === undefined) { start = st.size - end; end = st.size - 1; }
      if (end === undefined) end = st.size - 1;
      if (Number.isNaN(start) || Number.isNaN(end) || start > end || end >= st.size) {
        res.writeHead(416, { 'content-range': 'bytes */' + st.size }); res.end(); return;
      }
      res.writeHead(206, {
        'content-type': type, 'content-range': 'bytes ' + start + '-' + end + '/' + st.size,
        'accept-ranges': 'bytes', 'content-length': end - start + 1,
        'access-control-allow-origin': '*', 'cache-control': 'no-cache',
      });
      if (req.method === 'HEAD') { res.end(); return; }
      fs.createReadStream(filePath, { start, end }).pipe(res); return;
    }
  }
  res.writeHead(200, {
    'content-type': type, 'content-length': st.size, 'accept-ranges': 'bytes',
    'access-control-allow-origin': '*', 'cache-control': 'no-cache',
  });
  if (req.method === 'HEAD') { res.end(); return; }
  fs.createReadStream(filePath).pipe(res);
}

const server = http.createServer((req, res) => {
  try {
    const urlPath = decodeURIComponent((req.url || '/').split('?')[0]);
    const fp = resolveFile(urlPath);
    if (!isFile(fp)) { res.writeHead(404, { 'content-type': 'text/plain' }); res.end('404 Not Found: ' + urlPath); return; }
    serve(fp, req, res);
  } catch (e) { res.writeHead(500); res.end('500 ' + e.message); }
});

server.listen(PORT, () => console.log('[static] serving ' + ROOT + ' (cleanUrls + SPA) at http://localhost:' + PORT));
