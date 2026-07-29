/* ==========================================================================
   komponen.js — Baduy Villa
   Bahan bersama untuk semua pembangun halaman.

   Blok nav dan footer tidak pernah ditulis di sini. Keduanya dipotong dari
   index.html lewat penanda komentar, jadi beranda tetap jadi satu-satunya
   tempat markup itu ada. Ubah nav di beranda, jalankan ulang pembangunnya,
   dan seluruh halaman ikut berubah.
   ========================================================================== */

var fs = require('fs');
var path = require('path');

var AKAR = path.resolve(__dirname, '..');
var beranda = fs.readFileSync(path.join(AKAR, 'index.html'), 'utf8');

function potong(nama) {
  var mulai = beranda.indexOf('<!-- ==== ' + nama + ' ');
  var akhir = beranda.indexOf('<!-- ==== /' + nama + ' ');
  if (mulai === -1 || akhir === -1) {
    throw new Error('Penanda ' + nama + ' tidak ditemukan di index.html');
  }
  return beranda.slice(mulai, beranda.indexOf('-->', akhir) + 3);
}

var NAV = potong('NAV');
var FOOTER = potong('FOOTER');

function aman(teks) {
  return String(teks)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function rupiah(angka) {
  return 'Rp ' + angka.toLocaleString('id-ID');
}

/* Menuliskan <img> hanya kalau berkasnya benar-benar ada di assets/img.
   Kalau belum ada, yang dikembalikan string kosong dan wadahnya tetap
   memakai placeholder bertekstur lewat atribut data-img. Foto baru cukup
   dijatuhkan ke folder itu lalu situs dibangun ulang — tidak ada markup
   yang perlu disunting. */
function foto(berkas, alt, opsi) {
  if (!berkas) return '';
  if (!fs.existsSync(path.join(AKAR, 'assets', 'img', berkas))) return '';

  opsi = opsi || {};
  return '<img src="assets/img/' + berkas + '" alt="' + aman(alt) + '"' +
         (opsi.utama ? ' fetchpriority="high"' : ' loading="lazy"') + '>';
}

function halaman(opsi) {
  return [
    '<!DOCTYPE html>',
    '<html lang="id">',
    '<head>',
    '<meta charset="utf-8">',
    '<meta name="viewport" content="width=device-width, initial-scale=1">',
    '<title>' + aman(opsi.judul) + '</title>',
    '<meta name="description" content="' + aman(opsi.deskripsi) + '">',
    '<meta property="og:title" content="' + aman(opsi.judul) + '">',
    '<meta property="og:description" content="' + aman(opsi.deskripsi) + '">',
    '<meta property="og:type" content="website">',
    (opsi.noindex ? '<meta name="robots" content="noindex">' : null),
    '<link rel="preconnect" href="https://fonts.googleapis.com">',
    '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>',
    '<link href="https://fonts.googleapis.com/css2?family=Bodoni+Moda:opsz,wght@6..96,400;6..96,500&family=Archivo:wght@400;500&display=swap" rel="stylesheet">',
    '<link rel="stylesheet" href="css/tokens.css">',
    '<link rel="stylesheet" href="css/base.css">',
    '<link rel="stylesheet" href="css/komponen.css">',
    '<script>try{var s=sessionStorage;if(s.getItem(\'tirai-masuk\')||!s.getItem(\'sudah-datang\'))document.documentElement.classList.add(\'tirai-tertutup\')}catch(e){}</script>',
    '</head>',
    '<body' + (opsi.hero ? ' data-hero' : '') + '>',
    '',
    '<div class="tirai" data-tirai aria-hidden="true"></div>',
    '',
    '<a class="lewati" href="#utama">Lewati ke konten</a>',
    '',
    NAV,
    '',
    '<main id="utama">',
    opsi.isi,
    '</main>',
    '',
    FOOTER,
    '',
    '<script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js"></script>',
    '<script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollTrigger.min.js"></script>',
    '<script src="https://cdn.jsdelivr.net/npm/lenis@1.1.13/dist/lenis.min.js"></script>',
    '<script src="js/kontak.js"></script>',
    '<script src="js/nav.js"></script>',
    '<script src="js/tirai.js"></script>',
    '<script src="js/gerak.js"></script>',
    (opsi.skrip || null),
    '</body>',
    '</html>'
  ].filter(function (baris) { return baris !== null; }).join('\n') + '\n';
}

module.exports = {
  AKAR: AKAR, NAV: NAV, FOOTER: FOOTER,
  halaman: halaman, aman: aman, rupiah: rupiah, foto: foto
};
