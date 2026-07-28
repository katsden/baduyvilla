/* ==========================================================================
   bangun-paviliun.js — Baduy Villa

   Membangun halaman daftar paviliun dan kedelapan halaman detailnya dari
   data/paviliun.js.

     node scripts/bangun-paviliun.js

   Blok nav dan footer tidak ditulis ulang di sini — keduanya dipotong
   langsung dari index.html lewat penanda komentar. Jadi kalau nav berubah
   di beranda, jalankan ulang skrip ini dan kesembilan halaman ikut berubah.
   Tidak ada dua sumber yang bisa berbeda diam-diam.
   ========================================================================== */

var fs = require('fs');
var path = require('path');

var AKAR = path.resolve(__dirname, '..');
var data = require(path.join(AKAR, 'data', 'paviliun.js'));

var PAVILIUN = data.PAVILIUN;
var DENAH = data.DENAH;
var BAHAN = data.BAHAN;

/* ---- Potong komponen bersama dari index.html --------------------------- */

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

/* ---- Bantuan ----------------------------------------------------------- */

function rupiah(angka) {
  return 'Rp ' + angka.toLocaleString('id-ID');
}

function aman(teks) {
  return String(teks)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
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
    '<script src="js/nav.js"></script>',
    '<script src="js/tirai.js"></script>',
    '<script src="js/gerak.js"></script>',
    opsi.skrip || '',
    '</body>',
    '</html>',
    ''
  ].join('\n');
}

/* ---- Kartu untuk halaman daftar ---------------------------------------- */

function kartu(p) {
  return [
    '        <a class="kartu" href="paviliun-' + p.id + '.html" data-reveal',
    '           data-tamu="' + p.tamu + '" data-orientasi="' + p.orientasi + '">',
    '          <div class="media r-kartu" data-img="' + aman(p.alt) + '"></div>',
    '          <div class="kartu__kepala">',
    '            <span class="kartu__nama">' + p.nama + '</span>',
    '            <span class="kartu__arah">' + p.orientasi + '</span>',
    '          </div>',
    '          <p class="kartu__teks">' + p.ringkas + '</p>',
    '          <p class="kartu__harga tabular">' + p.luas + ' m&sup2; &middot; ' + p.tamu +
      ' tamu &middot; mulai ' + rupiah(p.harga) + ' / malam</p>',
    '        </a>'
  ].join('\n');
}

/* ---- Halaman daftar ---------------------------------------------------- */

function halamanDaftar() {
  var isi = [
    '',
    '  <section class="section">',
    '    <div class="wadah">',
    '      <div class="grid">',
    '        <div class="kolom-kiri" data-reveal-grup>',
    '          <span class="label" data-reveal>Delapan paviliun</span>',
    '          <h1 data-reveal style="margin-top:var(--sp-2)">Paviliun</h1>',
    '        </div>',
    '      </div>',
    '',
    '      <div class="grid" style="margin-top:var(--sp-4)">',
    '        <div class="kolom-offset" data-reveal>',
    '          <p>Tidak ada dua yang sama. Yang membedakan bukan ukurannya, tapi arah',
    '            bukaannya dan apa yang terdengar dari dalam.</p>',
    '        </div>',
    '      </div>',
    '',
    '      <!-- Saring. Tanpa JS, seluruh kartu tetap tampil. -->',
    '      <form class="saring" data-saring aria-label="Saring paviliun" style="margin-top:var(--sp-5)">',
    '        <button class="saring__pemicu" type="button" data-saring-buka>',
    '          Saring <span class="saring__jumlah" data-saring-jumlah>8</span>',
    '        </button>',
    '',
    '        <div class="saring__isi" data-saring-isi>',
    '          <fieldset class="saring__grup">',
    '            <legend class="label">Jumlah tamu</legend>',
    '            <label><input type="radio" name="tamu" value="semua" checked> Semua</label>',
    '            <label><input type="radio" name="tamu" value="2"> 2 tamu</label>',
    '            <label><input type="radio" name="tamu" value="4"> 4 tamu</label>',
    '          </fieldset>',
    '',
    '          <fieldset class="saring__grup">',
    '            <legend class="label">Pemandangan</legend>',
    '            <label><input type="radio" name="orientasi" value="semua" checked> Semua</label>',
    '            <label><input type="radio" name="orientasi" value="Lembah"> Lembah</label>',
    '            <label><input type="radio" name="orientasi" value="Hutan"> Hutan</label>',
    '            <label><input type="radio" name="orientasi" value="Sungai"> Sungai</label>',
    '          </fieldset>',
    '',
    '          <button class="saring__tutup" type="button" data-saring-tutup>Tutup</button>',
    '        </div>',
    '      </form>',
    '',
    '      <p class="caption" data-saring-kosong hidden style="margin-top:var(--sp-4)">',
    '        Tidak ada paviliun dengan gabungan itu. Coba longgarkan salah satu saringan.</p>',
    '',
    '      <div class="kartu-daftar" data-saring-daftar data-reveal-grup style="margin-top:var(--sp-4)">',
    PAVILIUN.map(kartu).join('\n'),
    '      </div>',
    '    </div>',
    '  </section>',
    ''
  ].join('\n');

  return halaman({
    judul: 'Paviliun — Baduy Villa',
    deskripsi: 'Delapan paviliun di kaki Pegunungan Kendeng. Masing-masing menghadap arah yang berbeda.',
    isi: isi,
    skrip: '<script src="data/paviliun.js"></script>\n<script src="js/saring.js"></script>'
  });
}

/* ---- Halaman detail ---------------------------------------------------- */

function halamanDetail(p, indeks) {
  var sebelum = PAVILIUN[(indeks - 1 + PAVILIUN.length) % PAVILIUN.length];
  var sesudah = PAVILIUN[(indeks + 1) % PAVILIUN.length];
  var denah = DENAH[p.denah];

  var bahanBlok = p.bahan.map(function (kunci) {
    var b = BAHAN[kunci];
    return [
      '        <figure data-reveal>',
      '          <div class="media r-makro" data-img="' + aman(b.alt) + '"></div>',
      '          <p class="bahan__nama">' + b.nama + '</p>',
      '          <p class="bahan__teks">' + b.teks + '</p>',
      '        </figure>'
    ].join('\n');
  }).join('\n');

  var isi = [
    '',
    '  <!-- Hero paviliun -->',
    '  <section class="media r-hero" data-scrim="bawah" data-parallax',
    '           data-img="' + aman(p.alt) + '"',
    '           style="display:grid; place-items:end start; text-align:left">',
    '    <div class="wadah" style="position:relative; z-index:3; padding-bottom:var(--sp-5)">',
    '      <span class="label">' + p.orientasi + ' &middot; ' + p.tamu + ' tamu</span>',
    '      <h1 style="margin-top:var(--sp-2)">' + p.nama + '</h1>',
    '      <p class="caption" style="margin-top:var(--sp-2)">' + p.nama + ', dari bahasa Sunda: ' + p.arti + '.</p>',
    '    </div>',
    '  </section>',
    '',
    '  <!-- Ringkas dan angka -->',
    '  <section class="section">',
    '    <div class="wadah">',
    '      <div class="grid">',
    '        <div class="kolom-offset" data-reveal-grup>',
    '          <p class="lead" data-reveal>' + p.ringkas + '</p>',
    '          <p data-reveal style="margin-top:var(--sp-3)">' + p.cahaya + '</p>',
    '        </div>',
    '      </div>',
    '',
    '      <dl class="angka" data-reveal-grup style="margin-top:var(--sp-5)">',
    '        <div data-reveal><dt class="label">Luas</dt><dd class="tabular">' + p.luas + ' m&sup2;</dd></div>',
    '        <div data-reveal><dt class="label">Tamu</dt><dd class="tabular">' + p.tamu + ' orang</dd></div>',
    '        <div data-reveal><dt class="label">Menghadap</dt><dd>' + p.orientasi + '</dd></div>',
    '        <div data-reveal><dt class="label">Tarif</dt><dd class="tabular">mulai ' + rupiah(p.harga) + ' / malam</dd></div>',
    '      </dl>',
    '    </div>',
    '  </section>',
    '',
    '  <!-- Apa yang terdengar dari dalam -->',
    '  <section class="section" data-section="terang">',
    '    <div class="wadah">',
    '      <div class="grid">',
    '        <div class="kolom-tengah" data-reveal-grup>',
    '          <span class="label" data-reveal>Dari dalam kamar</span>',
    '          <h2 data-reveal style="margin-top:var(--sp-2)">' + p.terdengar + '</h2>',
    '        </div>',
    '      </div>',
    '    </div>',
    '  </section>',
    '',
    '  <!-- Denah -->',
    '  <section class="section">',
    '    <div class="wadah">',
    '      <div class="asimetris">',
    '        <div data-reveal-grup>',
    '          <span class="label" data-reveal>Denah</span>',
    '          <h2 data-reveal style="margin-top:var(--sp-2)">Tipe ' + denah.nama + '</h2>',
    '          <p data-reveal style="margin-top:var(--sp-3); max-width:44ch">' + denah.ringkas +
      ' Panah menunjukkan arah matahari pagi, karena itu yang menentukan letak bukaannya.</p>',
    '        </div>',
    '',
    '        <figure class="denah" data-reveal>',
    '          ' + denah.svg,
    '        </figure>',
    '      </div>',
    '    </div>',
    '  </section>',
    '',
    '  <!-- Bahan -->',
    '  <section class="section">',
    '    <div class="wadah">',
    '      <div class="grid">',
    '        <div class="kolom-kiri" data-reveal-grup>',
    '          <span class="label" data-reveal>Bahan</span>',
    '          <h2 data-reveal style="margin-top:var(--sp-2)">Yang dipakai di sini</h2>',
    '        </div>',
    '      </div>',
    '',
    '      <div class="bahan" data-reveal-grup style="margin-top:var(--sp-5)">',
    bahanBlok,
    '      </div>',
    '    </div>',
    '  </section>',
    '',
    '  <!-- Galeri: geser dengan jari, tanpa pustaka carousel -->',
    '  <section class="section">',
    '    <div class="wadah">',
    '      <span class="label" data-reveal>Galeri</span>',
    '    </div>',
    '    <div class="galeri" data-reveal>',
    '      <div class="media r-galeri" data-img="' + aman(p.nama) + ' — sudut ruang saat pagi"></div>',
    '      <div class="media r-galeri" data-img="' + aman(p.nama) + ' — bukaan menghadap ' + p.orientasi.toLowerCase() + '"></div>',
    '      <div class="media r-galeri" data-img="' + aman(p.nama) + ' — detail sambungan bambu dan kayu"></div>',
    '      <div class="media r-galeri" data-img="' + aman(p.nama) + ' — teras menjelang malam"></div>',
    '    </div>',
    '    <div class="wadah">',
    '      <p class="caption" style="margin-top:var(--sp-2)">Geser untuk melihat selebihnya.</p>',
    '    </div>',
    '  </section>',
    '',
    '  <!-- Pindah paviliun dan ajakan -->',
    '  <section class="section">',
    '    <div class="wadah">',
    '      <hr class="garis">',
    '      <div class="lanjut">',
    '        <a class="tautan" href="paviliun-' + sebelum.id + '.html">&larr; ' + sebelum.nama + '</a>',
    '        <a class="tautan" href="paviliun.html">Semua paviliun</a>',
    '        <a class="tautan" href="paviliun-' + sesudah.id + '.html">' + sesudah.nama + ' &rarr;</a>',
    '      </div>',
    '',
    '      <p style="margin-top:var(--sp-5)" data-reveal>',
    '        <a class="tombol tombol--rotan" href="reservasi.html">Tanya ketersediaan ' + p.nama + '</a>',
    '      </p>',
    '    </div>',
    '  </section>',
    ''
  ].join('\n');

  return halaman({
    judul: p.nama + ' — Paviliun Baduy Villa',
    deskripsi: p.ringkas,
    isi: isi,
    hero: true
  });
}

/* ---- Tulis ------------------------------------------------------------- */

var ditulis = [];

fs.writeFileSync(path.join(AKAR, 'paviliun.html'), halamanDaftar(), 'utf8');
ditulis.push('paviliun.html');

PAVILIUN.forEach(function (p, i) {
  var nama = 'paviliun-' + p.id + '.html';
  fs.writeFileSync(path.join(AKAR, nama), halamanDetail(p, i), 'utf8');
  ditulis.push(nama);
});

console.log('Dibangun dari data/paviliun.js:');
ditulis.forEach(function (n) { console.log('  ' + n); });
console.log('\n' + ditulis.length + ' halaman. Nav dan footer diambil dari index.html.');
