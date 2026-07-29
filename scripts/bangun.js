/* ==========================================================================
   bangun.js — Baduy Villa

   Membangun seluruh halaman situs kecuali index.html.

     node scripts/bangun.js

   index.html sengaja ditulis tangan: dia yang memegang blok nav dan footer
   yang dipotong ulang oleh setiap halaman lain. Kalau nav berubah di sana,
   jalankan perintah di atas dan tiga belas halaman lainnya ikut berubah.
   ========================================================================== */

var fs = require('fs');
var path = require('path');
var k = require('./komponen.js');

var halaman = []
  .concat(require('./halaman-paviliun.js')())
  .concat(require('./halaman-lain.js')());

halaman.forEach(function (h) {
  fs.writeFileSync(path.join(k.AKAR, h.berkas), h.isi, 'utf8');
  console.log('  ' + h.berkas);
});

console.log('\n' + halaman.length + ' halaman dibangun. Nav dan footer diambil dari index.html.');
