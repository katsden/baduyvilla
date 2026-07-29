/* ==========================================================================
   halaman-lain.js — Baduy Villa
   Santapan, Pengalaman, Reservasi, dan halaman terima kasih.
   Dipanggil oleh scripts/bangun.js.
   ========================================================================== */

var path = require('path');
var k = require('./komponen.js');
var data = require(path.join(k.AKAR, 'data', 'paviliun.js'));

/* ---- Santapan ---------------------------------------------------------- */

function santapan() {
  var isi = [
    '',
    '  <section class="media r-hero" data-scrim="bawah" data-parallax',
    '           style="display:grid; place-items:end start; text-align:left">',
    '    ' + k.foto('hero-santapan.jpg',
      'Meja jati panjang di dapur terbuka tanpa dinding, kosong, asap tipis dari tungku kayu di pagi hari.',
      { utama: true }),
    '    <div class="wadah" style="position:relative; z-index:3; padding-bottom:var(--sp-5)">',
    '      <span class="label">Santapan</span>',
    '      <h1 style="margin-top:var(--sp-2)">Satu meja,<br>dua kali sehari</h1>',
    '    </div>',
    '  </section>',
    '',
    '  <section class="section">',
    '    <div class="wadah">',
    '      <div class="grid">',
    '        <div class="kolom-offset" data-reveal-grup>',
    '          <p class="lead" data-reveal>Tidak ada daftar menu, dan tidak ada yang perlu dipilih.',
    '            Yang dimasak menyesuaikan apa yang matang di kebun pagi itu.</p>',
    '          <p data-reveal style="margin-top:var(--sp-3)">Makan disiapkan dua kali: sekitar pukul',
    '            tujuh pagi, dan menjelang gelap. Di antara keduanya dapur tetap menyala, dan siapa pun',
    '            boleh minta nasi.</p>',
    '          <p data-reveal>Kalau ada yang tidak bisa dimakan &mdash; pantangan, alergi, apa pun &mdash;',
    '            sebutkan waktu memesan. Dapurnya kecil, dan lebih mudah diatur sebelum daripada sesudah.</p>',
    '        </div>',
    '      </div>',
    '    </div>',
    '  </section>',
    '',
    '  <section class="section">',
    '    <div class="wadah">',
    '      <div class="grid">',
    '        <div class="kolom-kiri" data-reveal-grup>',
    '          <span class="label" data-reveal>Dari mana</span>',
    '          <h2 data-reveal style="margin-top:var(--sp-2)">Yang tumbuh di sini,<br>dimasak di sini</h2>',
    '        </div>',
    '      </div>',
    '',
    '      <div class="bahan" data-reveal-grup style="margin-top:var(--sp-5)">',
    '        <figure data-reveal>',
    '          <div class="media r-makro" data-img="Kebun sayur di lereng, embun pagi, tanah gelap"></div>',
    '          <p class="bahan__nama">Kebun di belakang</p>',
    '          <p class="bahan__teks">Sayur dipetik pagi hari, beberapa jam sebelum dimasak. Yang tidak tumbuh di sini dibeli di pasar kampung, dua kali seminggu.</p>',
    '        </figure>',
    '        <figure data-reveal>',
    '          <div class="media r-makro" data-img="Tungku kayu menyala di dapur terbuka, asap tipis"></div>',
    '          <p class="bahan__nama">Tungku kayu</p>',
    '          <p class="bahan__teks">Nasi dan air panas dimasak di atas kayu, bukan gas. Rasanya sedikit berasap, dan itu memang tidak dihilangkan.</p>',
    '        </figure>',
    '        <figure data-reveal>',
    '          <div class="media r-makro" data-img="Deretan mangkuk dan kendi tanah liat di rak bambu"></div>',
    '          <p class="bahan__nama">Wadah tanah</p>',
    '          <p class="bahan__teks">Mangkuk, kendi, dan periuknya dibuat oleh satu keluarga di kampung bawah. Setiap yang pecah diganti dari sana juga.</p>',
    '        </figure>',
    '      </div>',
    '    </div>',
    '  </section>',
    '',
    '  <section class="section" data-section="terang">',
    '    <div class="wadah">',
    '      <div class="grid">',
    '        <div class="kolom-tengah" data-reveal-grup>',
    '          <span class="label" data-reveal>Cara makannya</span>',
    '          <h2 data-reveal style="margin-top:var(--sp-2)">Duduk di lantai,<br>ambil sendiri</h2>',
    '          <p data-reveal style="margin-top:var(--sp-3)">Tidak ada pelayan yang berdiri menunggu.',
    '            Lauknya ditaruh di tengah, dan semua orang mengambil sendiri &mdash; termasuk tamu yang',
    '            baru datang malam itu.</p>',
    '        </div>',
    '      </div>',
    '    </div>',
    '  </section>',
    '',
    '  <section class="section">',
    '    <div class="wadah">',
    '      <hr class="garis">',
    '      <p data-reveal><a class="tombol tombol--rotan" href="reservasi.html">Reservasi</a></p>',
    '    </div>',
    '  </section>',
    ''
  ].join('\n');

  return {
    berkas: 'santapan.html',
    isi: k.halaman({
      judul: 'Santapan — Baduy Villa',
      deskripsi: 'Dua kali sehari, dimasak dari apa yang matang di kebun pagi itu. Tanpa daftar menu.',
      isi: isi,
      hero: true
    })
  };
}

/* ---- Pengalaman -------------------------------------------------------- */

function pengalaman() {
  var isi = [
    '',
    '  <section class="media r-hero" data-scrim="bawah" data-parallax',
    '           style="display:grid; place-items:end start; text-align:left">',
    '    ' + k.foto('pengalaman-beranda.jpg',
      'Pisau bambu, pintalan berbenang nila, dan tenunan setengah jadi di atas kain nila.',
      { utama: true }),
    '    <div class="wadah" style="position:relative; z-index:3; padding-bottom:var(--sp-5)">',
    '      <span class="label">Pengalaman</span>',
    '      <h1 style="margin-top:var(--sp-2)">Belajar dari<br>yang mengerjakan</h1>',
    '    </div>',
    '  </section>',
    '',
    '  <section class="section">',
    '    <div class="wadah">',
    '      <div class="grid">',
    '        <div class="kolom-offset" data-reveal-grup>',
    '          <p class="lead" data-reveal>Tidak ada jadwal yang ditempel di pintu. Kegiatan di bawah ini',
    '            berjalan karena memang dikerjakan setiap hari, bukan karena ada tamu.</p>',
    '          <p data-reveal style="margin-top:var(--sp-3)">Siapa pun boleh ikut, boleh berhenti di tengah,',
    '            boleh cuma duduk melihat. Yang mengajari bukan pemandu &mdash; mereka orang yang memang',
    '            mengerjakannya, dan hari itu kebetulan ada yang menonton.</p>',
    '        </div>',
    '      </div>',
    '    </div>',
    '  </section>',
    '',
    '  <section class="section">',
    '    <div class="wadah">',
    '      <div class="kartu-daftar kartu-daftar--tiga" data-reveal-grup>',
    '        <article class="kartu" data-reveal>',
    '          <div class="media r-kartu" data-img="Tangan di alat tenun gedogan, benang nila terentang"></div>',
    '          <div class="kartu__kepala">',
    '            <span class="kartu__nama">Menenun</span>',
    '            <span class="kartu__arah">Pagi</span>',
    '          </div>',
    '          <p class="kartu__teks">Alat tenunnya diikat ke pinggang dan ke tiang. Sehari penuh biasanya',
    '            menghasilkan selebar dua telapak tangan, dan itu kalau lancar.</p>',
    '        </article>',
    '',
    '        <article class="kartu" data-reveal>',
    '          <div class="media r-kartu" data-img="Bambu dibelah tipis lalu dianyam di atas bangku kayu"></div>',
    '          <div class="kartu__kepala">',
    '            <span class="kartu__nama">Menganyam</span>',
    '            <span class="kartu__arah">Siang</span>',
    '          </div>',
    '          <p class="kartu__teks">Membelah bambu jauh lebih sulit daripada menganyamnya. Sebagian besar',
    '            waktu habis di pisau, bukan di pola.</p>',
    '        </article>',
    '',
    '        <article class="kartu" data-reveal>',
    '          <div class="media r-kartu" data-img="Kain dicelup dalam bak nila, tangan biru gelap"></div>',
    '          <div class="kartu__kepala">',
    '            <span class="kartu__nama">Mewarnai</span>',
    '            <span class="kartu__arah">Sore</span>',
    '          </div>',
    '          <p class="kartu__teks">Daun tarum difermentasi berhari-hari sebelum bisa dipakai. Kain dicelup',
    '            berulang; warna yang pekat butuh belasan kali.</p>',
    '        </article>',
    '      </div>',
    '    </div>',
    '  </section>',
    '',
    '  <section class="section" data-section="terang">',
    '    <div class="wadah">',
    '      <div class="grid">',
    '        <div class="kolom-tengah" data-reveal-grup>',
    '          <span class="label" data-reveal>Atau tidak sama sekali</span>',
    '          <h2 data-reveal style="margin-top:var(--sp-2)">Berjalan sampai sungai<br>juga dihitung</h2>',
    '          <p data-reveal style="margin-top:var(--sp-3)">Sebagian tamu tidak turun sama sekali dari',
    '            terasnya selama dua hari. Itu bukan kesempatan yang terlewat.</p>',
    '        </div>',
    '      </div>',
    '    </div>',
    '  </section>',
    '',
    '  <section class="section">',
    '    <div class="wadah">',
    '      <hr class="garis">',
    '      <p data-reveal><a class="tombol tombol--rotan" href="reservasi.html">Reservasi</a></p>',
    '    </div>',
    '  </section>',
    ''
  ].join('\n');

  return {
    berkas: 'pengalaman.html',
    isi: k.halaman({
      judul: 'Pengalaman — Baduy Villa',
      deskripsi: 'Menenun, menganyam bambu, mewarnai kain dengan tarum. Diajarkan oleh yang mengerjakannya tiap hari.',
      isi: isi,
      hero: true
    })
  };
}

/* ---- Reservasi ---------------------------------------------------------
   Bagian atas halaman tetap tenang. Detail teknis tinggal di bawah dalam
   accordion, terbuka kalau memang dicari. */

function reservasi() {
  var pilihan = data.PAVILIUN.map(function (p) {
    return '            <option value="' + p.id + '">' + p.nama + ' &middot; ' +
           p.orientasi + ' &middot; ' + p.tamu + ' tamu</option>';
  }).join('\n');

  var tanya = [
    {
      t: 'Waktu masuk dan keluar',
      i: 'Masuk mulai pukul 14.00, keluar sebelum pukul 11.00. Kalau datang lebih awal, tas bisa dititipkan di ruang tengah dan jalan setapaknya tetap boleh dipakai.'
    },
    {
      t: 'Cara sampai ke sini',
      i: 'Dari Rangkasbitung sekitar dua jam berkendara. Kendaraan berhenti di ujung kampung, lalu dua puluh menit berjalan kaki menanjak. Tas dibawakan. Kalau ada yang tidak kuat berjalan, beri tahu saat memesan &mdash; ada jalan memutar yang lebih landai tapi lebih lama.'
    },
    {
      t: 'Pembatalan',
      i: 'Batal lebih dari 14 hari sebelum tanggal masuk: dikembalikan penuh. Antara 7 sampai 14 hari: dikembalikan separuh. Kurang dari 7 hari: tidak dikembalikan, tapi tanggalnya bisa dipindah satu kali dalam enam bulan.'
    },
    {
      t: 'Aturan di dalam area',
      i: 'Tidak ada televisi, dan pengeras suara tidak dipakai di mana pun. Merokok hanya di teras masing-masing. Alas kaki dilepas sebelum naik ke lantai tanah. Anak-anak boleh, tapi sungainya tidak berpagar.'
    },
    {
      t: 'Sinyal dan listrik',
      i: 'Sinyal telepon ada di teras Halimun dan di jalan setapak dekat gerbang; di paviliun lain hampir tidak ada. Listrik dari surya, cukup untuk lampu dan mengisi daya telepon, tidak cukup untuk pengering rambut atau pemanas.'
    },
    {
      t: 'Menginap paling singkat',
      i: 'Dua malam. Satu malam habis untuk datang dan pergi, dan hampir semua yang menginap semalam bilang mereka baru merasa sampai ketika sudah harus turun.'
    }
  ].map(function (d) {
    return [
      '        <details class="tanya">',
      '          <summary>' + d.t + '</summary>',
      '          <div class="tanya__isi"><p>' + d.i + '</p></div>',
      '        </details>'
    ].join('\n');
  }).join('\n');

  var isi = [
    '',
    '  <section class="media r-hero" data-scrim="bawah" data-parallax',
    '           data-img="Teras kosong menghadap lembah saat subuh, dua bangku, tidak ada yang lain"',
    '           style="display:grid; place-items:end start; text-align:left">',
    '    ' + k.foto('hero-reservasi.jpg',
      'Teras kosong menghadap lembah saat subuh, dua bangku kayu, tidak ada apa-apa lagi.',
      { utama: true }),
    '    <div class="wadah" style="position:relative; z-index:3; padding-bottom:var(--sp-5)">',
    '      <span class="label">Reservasi</span>',
    '      <h1 style="margin-top:var(--sp-2)">Tanya dulu,<br>tidak apa-apa</h1>',
    '    </div>',
    '  </section>',
    '',
    '  <section class="section">',
    '    <div class="wadah">',
    '      <div class="grid">',
    '        <div class="kolom-offset" data-reveal>',
    '          <p>Pemesanan tidak diselesaikan di halaman ini. Isi keterangan di bawah, dan',
    '            pertanyaannya dikirim lewat WhatsApp &mdash; dibalas dalam satu hari, oleh orang.</p>',
    '        </div>',
    '      </div>',
    '    </div>',
    '  </section>',
    '',
    '  <section class="section" style="padding-top:0">',
    '    <div class="wadah">',
    '      <form class="borang" data-reservasi novalidate>',
    '        <div class="borang__baris">',
    '          <label class="borang__medan">',
    '            <span class="label">Nama</span>',
    '            <input type="text" name="nama" autocomplete="name" required placeholder="Nama yang dipakai saat datang">',
    '          </label>',
    '',
    '          <label class="borang__medan">',
    '            <span class="label">Jumlah tamu</span>',
    '            <input type="number" name="tamu" min="1" max="8" value="2" inputmode="numeric" required>',
    '          </label>',
    '        </div>',
    '',
    '        <label class="borang__medan">',
    '          <span class="label">Paviliun</span>',
    '          <select name="paviliun">',
    '            <option value="">Belum tahu, tolong sarankan</option>',
    pilihan,
    '          </select>',
    '        </label>',
    '',
    '        <fieldset class="borang__medan borang__tanggal">',
    '          <legend class="label">Tanggal</legend>',
    '          <div class="kalender" data-kalender>',
    '            <div class="kalender__ringkas">',
    '              <button type="button" class="kalender__slot" data-kalender-slot="masuk" aria-live="polite">',
    '                <span class="label">Masuk</span><span data-kalender-teks="masuk">Pilih tanggal</span>',
    '              </button>',
    '              <span class="kalender__panah" aria-hidden="true">&rarr;</span>',
    '              <button type="button" class="kalender__slot" data-kalender-slot="keluar" aria-live="polite">',
    '                <span class="label">Keluar</span><span data-kalender-teks="keluar">Pilih tanggal</span>',
    '              </button>',
    '            </div>',
    '',
    '            <div class="kalender__panel" data-kalender-panel hidden>',
    '              <div class="kalender__kepala">',
    '                <button type="button" class="kalender__geser" data-kalender-mundur aria-label="Bulan sebelumnya">&larr;</button>',
    '                <span class="kalender__bulan" data-kalender-bulan aria-live="polite"></span>',
    '                <button type="button" class="kalender__geser" data-kalender-maju aria-label="Bulan berikutnya">&rarr;</button>',
    '              </div>',
    '              <div class="kalender__hari" aria-hidden="true">',
    '                <span>Sen</span><span>Sel</span><span>Rab</span><span>Kam</span><span>Jum</span><span>Sab</span><span>Min</span>',
    '              </div>',
    '              <div class="kalender__petak" data-kalender-petak role="grid"></div>',
    '              <p class="caption kalender__catatan">Menginap paling singkat dua malam.</p>',
    '            </div>',
    '',
    '            <input type="hidden" name="masuk" data-kalender-nilai="masuk">',
    '            <input type="hidden" name="keluar" data-kalender-nilai="keluar">',
    '          </div>',
    '        </fieldset>',
    '',
    '        <label class="borang__medan">',
    '          <span class="label">Catatan</span>',
    '          <textarea name="catatan" rows="3" placeholder="Pantangan makan, kesulitan berjalan, jam sampai &mdash; apa saja yang perlu kami tahu lebih dulu"></textarea>',
    '        </label>',
    '',
    '        <p class="borang__galat" data-borang-galat hidden role="alert"></p>',
    '',
    '        <div class="borang__kirim">',
    '          <button class="tombol tombol--rotan" type="submit">Kirim lewat WhatsApp</button>',
    '          <p class="caption">Membuka WhatsApp dengan pesan yang sudah terisi. Belum ada yang terkirim sebelum kamu menekan kirim di sana.</p>',
    '        </div>',
    '      </form>',
    '    </div>',
    '  </section>',
    '',
    '  <section class="section">',
    '    <div class="wadah">',
    '      <div class="grid">',
    '        <div class="kolom-kiri" data-reveal-grup>',
    '          <span class="label" data-reveal>Sebelum datang</span>',
    '          <h2 data-reveal style="margin-top:var(--sp-2)">Hal-hal teknis</h2>',
    '        </div>',
    '      </div>',
    '',
    '      <div class="tanya-daftar" style="margin-top:var(--sp-4)">',
    tanya,
    '      </div>',
    '    </div>',
    '  </section>',
    ''
  ].join('\n');

  return {
    berkas: 'reservasi.html',
    isi: k.halaman({
      judul: 'Reservasi — Baduy Villa',
      deskripsi: 'Tanya ketersediaan lewat WhatsApp. Dibalas dalam satu hari.',
      isi: isi,
      hero: true,
      skrip: '<script src="js/kalender.js"></script>\n<script src="js/reservasi.js"></script>'
    })
  };
}

/* ---- Terima kasih ------------------------------------------------------ */

function terimaKasih() {
  var isi = [
    '',
    '  <section class="section" style="min-height:62svh; display:grid; align-items:center">',
    '    <div class="wadah">',
    '      <div class="grid">',
    '        <div class="kolom-tengah">',
    '          <span class="label">Terkirim</span>',
    '          <h1 style="margin-top:var(--sp-3)">Sampai jumpa<br>di atas.</h1>',
    '          <p style="margin-top:var(--sp-4)">Pesannya sudah terbuka di WhatsApp. Kalau jendelanya',
    '            tidak muncul, buka lagi lewat tautan di bawah &mdash; keterangan yang kamu isi masih ada.</p>',
    '          <p style="margin-top:var(--sp-4)">',
    '            <a class="tautan" data-buka-lagi data-wa href="https://wa.me/628119886714">Buka WhatsApp lagi</a>',
    '          </p>',
    '          <p style="margin-top:var(--sp-5)">',
    '            <a class="tombol" href="index.html">Kembali ke beranda</a>',
    '          </p>',
    '        </div>',
    '      </div>',
    '    </div>',
    '  </section>',
    ''
  ].join('\n');

  return {
    berkas: 'terima-kasih.html',
    isi: k.halaman({
      judul: 'Terima kasih — Baduy Villa',
      deskripsi: 'Pertanyaan reservasi sudah dikirim.',
      isi: isi,
      noindex: true,
      skrip: '<script src="js/terima-kasih.js"></script>'
    })
  };
}

module.exports = function () {
  return [santapan(), pengalaman(), reservasi(), terimaKasih()];
};
