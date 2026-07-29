/* ==========================================================================
   halaman-paviliun.js — Baduy Villa
   Menyusun halaman daftar paviliun dan kedelapan halaman detailnya
   dari data/paviliun.js. Dipanggil oleh scripts/bangun.js.
   ========================================================================== */

var path = require('path');
var k = require('./komponen.js');
var data = require(path.join(k.AKAR, 'data', 'paviliun.js'));

var PAVILIUN = data.PAVILIUN;
var DENAH = data.DENAH;
var BAHAN = data.BAHAN;

/* Angka di halaman daftar dihitung dari data, bukan ditulis tangan. Menambah
   paviliun kesembilan otomatis memperbarui rentangnya. */
function rentang(medan) {
  var nilai = PAVILIUN.map(function (p) { return p[medan]; });
  var min = Math.min.apply(null, nilai);
  var max = Math.max.apply(null, nilai);
  return min === max ? String(min) : min + '–' + max;
}

function arah() {
  var unik = [];
  PAVILIUN.forEach(function (p) {
    if (unik.indexOf(p.orientasi) === -1) unik.push(p.orientasi);
  });
  return unik.join(', ');
}

function kartu(p) {
  return [
    '        <a class="kartu" href="paviliun-' + p.id + '.html" data-reveal',
    '           data-tamu="' + p.tamu + '" data-orientasi="' + p.orientasi + '">',
    '          <div class="media r-kartu" data-img="' + k.aman(p.alt) + '">' +
      k.foto('pav-' + p.id + '.jpg', p.alt) + '</div>',
    '          <div class="kartu__kepala">',
    '            <span class="kartu__nama">' + p.nama + '</span>',
    '            <span class="kartu__arah">' + p.orientasi + '</span>',
    '          </div>',
    '          <p class="kartu__teks">' + p.ringkas + '</p>',
    '          <p class="kartu__harga tabular">' + p.luas + ' m&sup2; &middot; ' + p.tamu +
      ' tamu &middot; mulai ' + k.rupiah(p.harga) + ' / malam</p>',
    '        </a>'
  ].join('\n');
}

function daftar() {
  var isi = [
    '',
    '  <section class="media r-hero" data-scrim="bawah" data-parallax',
    '           data-img="Beberapa atap ijuk di ketinggian berbeda di lereng, terlihat lewat kabut"',
    '           style="display:grid; place-items:end start; text-align:left">',
    '    ' + k.foto('hero-paviliun.jpg',
      'Beberapa atap ijuk pada ketinggian berbeda di sebuah lereng, terlihat samar lewat kabut.',
      { utama: true }),
    '    <div class="wadah" style="position:relative; z-index:3; padding-bottom:var(--sp-5)">',
    '      <span class="label">Delapan paviliun</span>',
    '      <h1 style="margin-top:var(--sp-2)">Paviliun</h1>',
    '    </div>',
    '  </section>',
    '',
    '  <section class="section">',
    '    <div class="wadah">',
    '',
    '      <!-- Strip angka menahan lebar penuh, jadi paragraf di bawahnya boleh',
    '           bergeser ke kanan tanpa meninggalkan sisi kiri kosong melompong. -->',
    '      <dl class="angka" data-reveal-grup>',
    '        <div data-reveal><dt class="label">Jumlah</dt><dd class="tabular">' +
      PAVILIUN.length + ' paviliun</dd></div>',
    '        <div data-reveal><dt class="label">Arah pandang</dt><dd>' + arah() + '</dd></div>',
    '        <div data-reveal><dt class="label">Luas</dt><dd class="tabular">' +
      rentang('luas') + ' m&sup2;</dd></div>',
    '        <div data-reveal><dt class="label">Tamu</dt><dd class="tabular">' +
      rentang('tamu') + ' orang</dd></div>',
    '      </dl>',
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
    '        <button class="saring__pemicu" type="button" data-saring-buka aria-expanded="false">',
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

  return {
    berkas: 'paviliun.html',
    isi: k.halaman({
      judul: 'Paviliun — Baduy Villa',
      deskripsi: 'Delapan paviliun di kaki Pegunungan Kendeng. Masing-masing menghadap arah yang berbeda.',
      isi: isi,
      hero: true,
      skrip: '<script src="js/saring.js"></script>'
    })
  };
}

function detail(p, indeks) {
  var sebelum = PAVILIUN[(indeks - 1 + PAVILIUN.length) % PAVILIUN.length];
  var sesudah = PAVILIUN[(indeks + 1) % PAVILIUN.length];
  var denah = DENAH[p.denah];

  var bahanBlok = p.bahan.map(function (kunci) {
    var b = BAHAN[kunci];
    return [
      '        <figure data-reveal>',
      '          <div class="media r-makro" data-img="' + k.aman(b.alt) + '">' +
        k.foto(b.foto, b.alt) + '</div>',
      '          <p class="bahan__nama">' + b.nama + '</p>',
      '          <p class="bahan__teks">' + b.teks + '</p>',
      '        </figure>'
    ].join('\n');
  }).join('\n');

  var isi = [
    '',
    '  <section class="media r-hero" data-scrim="bawah" data-parallax',
    '           data-img="' + k.aman(p.alt) + '"',
    '           style="display:grid; place-items:end start; text-align:left">',
    '    ' + k.foto('pav-' + p.id + '.jpg', p.alt, { utama: true }),
    '    <div class="wadah" style="position:relative; z-index:3; padding-bottom:var(--sp-5)">',
    '      <span class="label">' + p.orientasi + ' &middot; ' + p.tamu + ' tamu</span>',
    '      <h1 style="margin-top:var(--sp-2)">' + p.nama + '</h1>',
    '      <p class="caption" style="margin-top:var(--sp-2)">' + p.nama + ', dari bahasa Sunda: ' + p.arti + '.</p>',
    '    </div>',
    '  </section>',
    '',
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
    '        <div data-reveal><dt class="label">Tarif</dt><dd class="tabular">mulai ' + k.rupiah(p.harga) + ' / malam</dd></div>',
    '      </dl>',
    '    </div>',
    '  </section>',
    '',
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
    '  <section class="section">',
    '    <div class="wadah">',
    '      <span class="label" data-reveal>Galeri</span>',
    '    </div>',
    '    <div class="galeri" data-reveal>',
    '      <div class="media r-galeri" data-img="' + k.aman(p.nama) + ' — kendi tanah di rak bambu">' +
      k.foto('galeri-1.jpg', 'Kendi tanah liat di rak bambu, cahaya dari samping.') + '</div>',
    '      <div class="media r-galeri" data-img="' + k.aman(p.nama) + ' — lipatan kain nila">' +
      k.foto('galeri-2.jpg', 'Tumpukan kain nila terlipat di atas kayu gelap, dilihat dari atas.') + '</div>',
    '      <div class="media r-galeri" data-img="' + k.aman(p.nama) + ' — kancing pintu bambu">' +
      k.foto('galeri-3.jpg', 'Kancing pintu bambu yang dipahat tangan, aus dan halus.') + '</div>',
    '      <div class="media r-galeri" data-img="' + k.aman(p.nama) + ' — teras menjelang malam"></div>',
    '    </div>',
    '    <div class="wadah">',
    '      <p class="caption" style="margin-top:var(--sp-2)">Geser untuk melihat selebihnya.</p>',
    '    </div>',
    '  </section>',
    '',
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
    '        <a class="tombol tombol--rotan" href="reservasi.html?paviliun=' + p.id + '">Tanya ketersediaan ' + p.nama + '</a>',
    '      </p>',
    '    </div>',
    '  </section>',
    ''
  ].join('\n');

  return {
    berkas: 'paviliun-' + p.id + '.html',
    isi: k.halaman({
      judul: p.nama + ' — Paviliun Baduy Villa',
      deskripsi: p.ringkas,
      isi: isi,
      hero: true
    })
  };
}

module.exports = function () {
  return [daftar()].concat(PAVILIUN.map(detail));
};
