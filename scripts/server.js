/* ==========================================================================
   server.js — Baduy Villa
   Server statis untuk pengembangan lokal. Situs ini tidak punya build step,
   jadi berkasnya disajikan apa adanya.

   Dipakai karena transisi tirai bersandar pada sessionStorage, dan
   sessionStorage tidak berperilaku konsisten kalau halaman dibuka lewat
   file://. Untuk mengujinya, situs harus disajikan lewat http://.

     node scripts/server.js          → port 4173
     PORT=8080 node scripts/server.js

   Produksi memakai Vercel; berkas ini tidak ikut berperan di sana.
   ========================================================================== */

var http = require('http');
var fs = require('fs');
var path = require('path');
var url = require('url');

var AKAR = path.resolve(__dirname, '..');
var PORT = Number(process.env.PORT) || 4173;

var TIPE = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.woff2': 'font/woff2',
  '.ico': 'image/x-icon'
};

http.createServer(function (req, res) {
  var jalur = decodeURIComponent(url.parse(req.url).pathname);
  if (jalur.endsWith('/')) jalur += 'index.html';

  /* Tetap di dalam folder proyek, apa pun yang diminta. */
  var berkas = path.join(AKAR, path.normalize(jalur));
  if (!berkas.startsWith(AKAR)) {
    res.writeHead(403).end('Terlarang');
    return;
  }

  fs.readFile(berkas, function (err, isi) {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end('<meta charset="utf-8"><body style="background:#151A18;color:#F2EDE4;' +
              'font:16px system-ui;padding:3rem"><h1>404</h1><p>' + jalur + '</p>');
      return;
    }

    res.writeHead(200, {
      'Content-Type': TIPE[path.extname(berkas).toLowerCase()] || 'application/octet-stream',
      'Cache-Control': 'no-cache'
    });
    res.end(isi);
  });
}).listen(PORT, function () {
  console.log('Baduy Villa disajikan di http://localhost:' + PORT);
});
