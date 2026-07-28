/* ==========================================================================
   data/paviliun.js — Baduy Villa

   Satu-satunya tempat isi paviliun ditulis. Halaman daftar dan kedelapan
   halaman detail semuanya dibangun dari berkas ini oleh
   scripts/bangun-paviliun.js.

   Menambah paviliun kesembilan berarti menambah satu objek di bawah, lalu
   menjalankan:  node scripts/bangun-paviliun.js
   Tidak ada HTML yang perlu disalin, tidak ada CSS yang perlu ditulis.

   Berkas ini bisa dibaca dua-duanya: oleh Node saat membangun halaman,
   dan oleh browser kalau suatu saat dibutuhkan di sisi klien.
   ========================================================================== */

(function (lingkup) {
  'use strict';

  /* ---- Tiga denah yang dipakai bergantian ------------------------------
     Garis saja, mewarisi warna dari CSS lewat currentColor. Panah kecil
     menunjukkan arah matahari pagi, karena itu yang menentukan letak
     bukaan di setiap paviliun. */

  var DENAH = {
    sapu: {
      nama: 'Sapu',
      ringkas: 'Satu ruang, satu teras.',
      svg: [
        '<svg viewBox="0 0 400 280" role="img" aria-label="Denah tipe Sapu: satu ruang persegi dengan teras di sisi timur">',
        '<g fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="square">',
        '<rect x="70" y="50" width="190" height="180"/>',
        '<path d="M260 50 h70 v180 h-70"/>',
        '<path d="M260 96 v88" stroke-dasharray="4 6"/>',
        '<rect x="96" y="80" width="74" height="52"/>',
        '<path d="M70 128 v-34"/>',
        '<path d="M186 230 h44"/>',
        '</g>',
        '<g fill="currentColor" opacity=".65">',
        '<path d="M352 132 l14 8 -14 8 z"/>',
        '</g>',
        '<g fill="currentColor" opacity=".55" font-size="11" font-family="Archivo, sans-serif" letter-spacing="1.6">',
        '<text x="104" y="72">TIDUR</text>',
        '<text x="276" y="146">TERAS</text>',
        '<text x="300" y="118">PAGI</text>',
        '</g>',
        '</svg>'
      ].join('')
    },

    panggung: {
      nama: 'Panggung',
      ringkas: 'Ruang di atas tiang, geladak menghadap air.',
      svg: [
        '<svg viewBox="0 0 400 280" role="img" aria-label="Denah tipe Panggung: satu ruang di atas tiang dengan geladak menjorok ke air">',
        '<g fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="square">',
        '<rect x="60" y="56" width="170" height="168"/>',
        '<rect x="230" y="86" width="110" height="108"/>',
        '<path d="M230 110 v56" stroke-dasharray="4 6"/>',
        '<rect x="86" y="84" width="70" height="50"/>',
        '<path d="M60 172 v-34"/>',
        '</g>',
        '<g fill="none" stroke="currentColor" stroke-width="1" opacity=".45">',
        '<circle cx="252" cy="108" r="3"/><circle cx="318" cy="108" r="3"/>',
        '<circle cx="252" cy="172" r="3"/><circle cx="318" cy="172" r="3"/>',
        '<path d="M60 244 q26 -8 52 0 q26 8 52 0 q26 -8 52 0 q26 8 52 0 q26 -8 52 0"/>',
        '<path d="M60 258 q26 -8 52 0 q26 8 52 0 q26 -8 52 0 q26 8 52 0 q26 -8 52 0"/>',
        '</g>',
        '<g fill="currentColor" opacity=".55" font-size="11" font-family="Archivo, sans-serif" letter-spacing="1.6">',
        '<text x="94" y="76">TIDUR</text>',
        '<text x="248" y="146">GELADAK</text>',
        '<text x="60" y="274">AIR</text>',
        '</g>',
        '</svg>'
      ].join('')
    },

    julang: {
      nama: 'Julang',
      ringkas: 'Dua ruang tidur mengapit ruang tengah terbuka.',
      svg: [
        '<svg viewBox="0 0 400 280" role="img" aria-label="Denah tipe Julang: dua ruang tidur mengapit ruang tengah terbuka">',
        '<g fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="square">',
        '<rect x="40" y="60" width="130" height="160"/>',
        '<rect x="230" y="60" width="130" height="160"/>',
        '<path d="M170 60 h60 M170 220 h60"/>',
        '<path d="M170 96 v88" stroke-dasharray="4 6"/>',
        '<path d="M230 96 v88" stroke-dasharray="4 6"/>',
        '<rect x="62" y="86" width="66" height="48"/>',
        '<rect x="252" y="86" width="66" height="48"/>',
        '<path d="M170 220 v26 M230 220 v26"/>',
        '</g>',
        '<g fill="currentColor" opacity=".65">',
        '<path d="M372 132 l14 8 -14 8 z"/>',
        '</g>',
        '<g fill="currentColor" opacity=".55" font-size="11" font-family="Archivo, sans-serif" letter-spacing="1.6">',
        '<text x="70" y="78">TIDUR</text>',
        '<text x="260" y="78">TIDUR</text>',
        '<text x="176" y="152">TENGAH</text>',
        '<text x="322" y="118">PAGI</text>',
        '</g>',
        '</svg>'
      ].join('')
    }
  };

  /* ---- Bahan -----------------------------------------------------------
     Dikunci di satu tempat supaya keterangannya sama persis di kedelapan
     halaman. Kalau kalimatnya diperbaiki, cukup diperbaiki di sini. */

  var BAHAN = {
    bambu: {
      nama: 'Bambu',
      teks: 'Ditebang saat bulan tua supaya tidak dimakan kumbang. Dibelah, direndam, lalu dianyam di tempat.',
      foto: 'makro-bambu.jpg',
      alt: 'Bambu belah diikat tali ijuk hitam, terlihat sangat dekat.'
    },
    jati: {
      nama: 'Kayu jati bekas',
      teks: 'Diambil dari rumah lama yang dibongkar. Lubang paku dan bekas gergajinya dibiarkan terlihat.',
      foto: 'makro-jati.jpg',
      alt: 'Balok jati bekas dengan lubang paku lama dan bekas gergaji.'
    },
    ijuk: {
      nama: 'Atap ijuk',
      teks: 'Serat aren, dipasang berlapis-lapis. Menahan panas, dan mengubah hujan jadi suara yang rata.',
      foto: 'makro-ijuk.jpg',
      alt: 'Tepi atap ijuk dilihat dari bawah, setetes air di ujung serat.'
    },
    tanah: {
      nama: 'Lantai tanah padat',
      teks: 'Tanah setempat ditumbuk sampai keras, disapu tiap pagi. Dingin di telapak kaki sepanjang hari.',
      foto: 'makro-tanah.jpg',
      alt: 'Lantai tanah padat yang tersapu rata, bertemu dasar dinding bambu.'
    },
    tenun: {
      nama: 'Tenun nila',
      teks: 'Diwarnai daun tarum. Warnanya turun sedikit tiap tahun, dan memang begitu seharusnya.',
      foto: 'makro-tenun.jpg',
      alt: 'Kain tenun nila di alat tenun, benangnya tidak rata.'
    }
  };

  /* ---- Delapan paviliun ------------------------------------------------ */

  var PAVILIUN = [
    {
      id: 'awi',
      nama: 'Awi',
      arti: 'bambu',
      orientasi: 'Hutan',
      tamu: 2,
      luas: 42,
      harga: 2400000,
      denah: 'sapu',
      bahan: ['bambu', 'ijuk', 'tanah'],
      ringkas: 'Dinding anyaman bambu di keempat sisi, satu bukaan menghadap rumpun yang lebih tua dari bangunannya.',
      terdengar: 'Daun jatuh di atap, sepanjang malam.',
      cahaya: 'Matahari pagi masuk lewat celah anyaman, dan selama satu jam dinding dalamnya bergaris-garis.',
      alt: 'Kamar berdinding bambu dengan satu tempat tidur rendah dan bukaan persegi menghadap hutan.'
    },
    {
      id: 'ijuk',
      nama: 'Ijuk',
      arti: 'serat atap aren',
      orientasi: 'Hutan',
      tamu: 2,
      luas: 38,
      harga: 2200000,
      denah: 'sapu',
      bahan: ['ijuk', 'bambu', 'tanah'],
      ringkas: 'Paviliun terkecil. Atapnya turun sangat rendah di dua sisi, jadi dari dalam yang terlihat cuma tanah dan batang pohon.',
      terdengar: 'Hujan yang diredam serat, berubah jadi bunyi yang rata.',
      cahaya: 'Karena atapnya rendah, cahaya masuk mendatar dan baru sampai ke lantai menjelang pukul sembilan.',
      alt: 'Paviliun kecil dilihat dari bawah, atap ijuk tebal mendominasi, kanopi hutan di kedua sisi.'
    },
    {
      id: 'jati',
      nama: 'Jati',
      arti: 'kayu jati bekas',
      orientasi: 'Lembah',
      tamu: 4,
      luas: 68,
      harga: 3600000,
      denah: 'julang',
      bahan: ['jati', 'ijuk', 'tenun'],
      ringkas: 'Tiang-tiangnya diambil dari satu rumah tua yang dibongkar di kampung sebelah. Umurnya lebih dari seabad.',
      terdengar: 'Kayu yang menyusut waktu suhu turun, sesekali, seperti langkah.',
      cahaya: 'Ruang tengahnya terbuka di dua sisi. Pagi masuk dari timur, sore keluar lewat barat, dan siang hampir tidak ada bayangan.',
      alt: 'Sudut ruang dengan tiang jati bekas yang berat dan bukaan lebar menghadap lembah berkabut.'
    },
    {
      id: 'tarum',
      nama: 'Tarum',
      arti: 'tanaman pewarna nila',
      orientasi: 'Lembah',
      tamu: 2,
      luas: 45,
      harga: 2600000,
      denah: 'sapu',
      bahan: ['tenun', 'bambu', 'jati'],
      ringkas: 'Pembatas ruangnya kain nila yang ditenun di sini. Kalau angin naik dari lembah, seluruh dinding bergerak.',
      terdengar: 'Kain yang bergerak pelan, dan angin lembah di baliknya.',
      cahaya: 'Cahaya pagi menembus tenunan dan jatuh ke lantai sebagai kisi-kisi yang berubah sepanjang pagi.',
      alt: 'Ruang dengan kain nila tergantung sebagai penyekat, cahaya menembus anyaman benangnya.'
    },
    {
      id: 'halimun',
      nama: 'Halimun',
      arti: 'kabut',
      orientasi: 'Lembah',
      tamu: 2,
      luas: 52,
      harga: 3200000,
      denah: 'panggung',
      bahan: ['bambu', 'jati', 'ijuk'],
      ringkas: 'Berdiri paling tinggi di antara delapan. Sampai pukul sembilan pagi, yang terlihat dari terasnya cuma putih.',
      terdengar: 'Nyaris tidak ada. Kabut menyerap suara, dan itu yang paling sering dibicarakan tamu.',
      cahaya: 'Matahari baru menembus kabut sekitar pukul sembilan, dan lembahnya muncul sekaligus, bukan sedikit demi sedikit.',
      alt: 'Pagar teras bambu gelap dengan kabut tebal menghapus segalanya lebih dari dua meter.'
    },
    {
      id: 'cai',
      nama: 'Cai',
      arti: 'air',
      orientasi: 'Sungai',
      tamu: 2,
      luas: 40,
      harga: 2800000,
      denah: 'panggung',
      bahan: ['bambu', 'jati', 'tanah'],
      ringkas: 'Dibangun di atas tiang, sejengkal di atas air. Geladaknya menjorok sampai ke tengah aliran.',
      terdengar: 'Sungai, tanpa henti. Orang cepat terbiasa, dan susah tidur di tempat lain sesudahnya.',
      cahaya: 'Air memantulkan cahaya ke langit-langit, jadi bagian atas ruangan lebih terang daripada lantainya.',
      alt: 'Paviliun panggung di atas sungai dangkal berbatu, air berlumut di sekelilingnya.'
    },
    {
      id: 'leuweung',
      nama: 'Leuweung',
      arti: 'hutan',
      orientasi: 'Hutan',
      tamu: 4,
      luas: 64,
      harga: 3400000,
      denah: 'julang',
      bahan: ['bambu', 'ijuk', 'tanah'],
      ringkas: 'Paling jauh dari jalan setapak utama. Dari luar yang terlihat cuma garis atap dan satu pintu yang menyala.',
      terdengar: 'Serangga malam yang berhenti serentak kalau ada yang lewat.',
      cahaya: 'Ditutup kanopi, jadi tidak pernah kena matahari langsung. Terangnya hijau, dan rata sepanjang hari.',
      alt: 'Paviliun hampir tertelan hutan, hanya garis atap dan satu pintu menyala terlihat di antara batang pohon.'
    },
    {
      id: 'isuk',
      nama: 'Isuk',
      arti: 'pagi',
      orientasi: 'Sungai',
      tamu: 2,
      luas: 44,
      harga: 2900000,
      denah: 'panggung',
      bahan: ['tanah', 'bambu', 'tenun'],
      ringkas: 'Satu-satunya yang dindingnya dibuka penuh ke timur. Dinamai begitu karena tidak ada alasan lain untuk memilihnya.',
      terdengar: 'Sungai di kejauhan, dan burung yang mulai lebih dulu daripada di paviliun lain.',
      cahaya: 'Matahari terbit jatuh langsung ke lantai tanahnya sebagai satu bidang tajam, dan bergerak sampai hilang pukul delapan.',
      alt: 'Ruang menghadap timur saat matahari terbit, satu bidang cahaya tajam melintasi lantai tanah padat.'
    }
  ];

  var keluaran = { PAVILIUN: PAVILIUN, DENAH: DENAH, BAHAN: BAHAN };

  if (typeof module !== 'undefined' && module.exports) module.exports = keluaran;
  else { lingkup.PAVILIUN = PAVILIUN; lingkup.DENAH = DENAH; lingkup.BAHAN = BAHAN; }

})(typeof globalThis !== 'undefined' ? globalThis : this);
