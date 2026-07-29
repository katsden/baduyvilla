/* ==========================================================================
   reservasi.js — Baduy Villa
   Menyusun pertanyaan reservasi jadi pesan WhatsApp.

   Tidak ada backend, tidak ada layanan borang pihak ketiga. Isian dirangkai
   jadi satu pesan, WhatsApp dibuka dengan pesan itu sudah terisi, dan tamu
   sendiri yang menekan kirim. Tidak ada apa pun yang terkirim tanpa
   sepengetahuan mereka.
   ========================================================================== */

(function () {
  'use strict';

  /* Nomornya tinggal di js/kontak.js, satu tempat untuk seluruh situs.
     Nilai cadangan di sini hanya dipakai kalau berkas itu gagal dimuat. */
  var NOMOR = (window.KONTAK && window.KONTAK.wa) || '6281234567890';

  var borang = document.querySelector('[data-reservasi]');
  if (!borang) return;

  var galat = borang.querySelector('[data-borang-galat]');
  var kalender = document.querySelector('[data-kalender]');

  function keluhkan(pesan, medan) {
    if (galat) {
      galat.textContent = pesan;
      galat.hidden = false;
    }
    if (medan && medan.focus) medan.focus();
    return false;
  }

  function bersihkan() {
    if (galat) galat.hidden = true;
  }

  function susunPesan() {
    var d = new FormData(borang);

    var nama = String(d.get('nama') || '').trim();
    var tamu = String(d.get('tamu') || '').trim();
    var catatan = String(d.get('catatan') || '').trim();

    var pilihanPaviliun = borang.querySelector('select[name="paviliun"]');
    var namaPaviliun = pilihanPaviliun && pilihanPaviliun.value
      ? pilihanPaviliun.options[pilihanPaviliun.selectedIndex].text.split(' · ')[0]
      : null;

    var baris = ['Halo Baduy Villa.', ''];

    baris.push('Nama: ' + nama);
    baris.push('Jumlah tamu: ' + tamu);
    baris.push('Paviliun: ' + (namaPaviliun || 'belum tahu, mohon disarankan'));

    var alat = kalender && kalender.kalender;
    if (alat) {
      var t = alat.ambil();
      if (t.masuk && t.keluar) {
        baris.push('Masuk: ' + alat.baca(t.masuk));
        baris.push('Keluar: ' + alat.baca(t.keluar));
        baris.push('Lama: ' + alat.malam() + ' malam');
      } else {
        baris.push('Tanggal: belum ditentukan');
      }
    }

    if (catatan) {
      baris.push('');
      baris.push('Catatan: ' + catatan);
    }

    baris.push('');
    baris.push('Mohon dibantu ketersediaannya. Terima kasih.');

    return baris.join('\n');
  }

  function sah() {
    var nama = borang.querySelector('input[name="nama"]');
    var tamu = borang.querySelector('input[name="tamu"]');

    if (!nama.value.trim()) {
      return keluhkan('Namanya belum diisi.', nama);
    }

    var jumlah = Number(tamu.value);
    if (!jumlah || jumlah < 1 || jumlah > 8) {
      return keluhkan('Jumlah tamu diisi antara 1 sampai 8.', tamu);
    }

    var alat = kalender && kalender.kalender;
    if (alat) {
      var t = alat.ambil();

      /* Satu tanggal saja lebih membingungkan daripada tidak sama sekali. */
      if ((t.masuk && !t.keluar) || (!t.masuk && t.keluar)) {
        return keluhkan('Tanggalnya baru terisi sebelah. Lengkapi keduanya, atau kosongkan dua-duanya dan tulis di catatan.');
      }

      if (t.masuk && t.keluar && alat.malam() < alat.minMalam) {
        return keluhkan('Menginap paling singkat ' + alat.minMalam + ' malam.');
      }
    }

    bersihkan();
    return true;
  }

  borang.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!sah()) return;

    var alamat = 'https://wa.me/' + NOMOR + '?text=' + encodeURIComponent(susunPesan());

    /* Disimpan supaya halaman terima kasih bisa menawarkan membuka ulang
       kalau jendela WhatsApp-nya diblokir peramban. */
    try { sessionStorage.setItem('pesan-wa', alamat); } catch (err) {}

    window.open(alamat, '_blank', 'noopener');

    /* Lewat tirai kalau tersedia, supaya perpindahannya sama dengan
       perpindahan halaman lain di situs ini. */
    if (window.Tirai && window.Tirai.pergi) window.Tirai.pergi('terima-kasih.html');
    else window.location.href = 'terima-kasih.html';
  });

  borang.addEventListener('input', bersihkan);

  /* Paviliun bisa dipilih lebih dulu dari halaman detailnya:
     reservasi.html?paviliun=halimun */
  var diminta = new URLSearchParams(location.search).get('paviliun');
  if (diminta) {
    var pilihan = borang.querySelector('select[name="paviliun"] option[value="' +
                                        diminta.replace(/[^a-z]/gi, '') + '"]');
    if (pilihan) pilihan.selected = true;
  }
})();
