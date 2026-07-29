/* ==========================================================================
   kontak.js — Baduy Villa

   SATU TEMPAT UNTUK MENGGANTI NOMOR WHATSAPP.

   Ubah baris NOMOR di bawah, simpan, selesai. Seluruh tautan WhatsApp di
   semua halaman ikut berubah saat halaman dibuka — tidak perlu menjalankan
   ulang scripts/bangun.js, dan tidak perlu menyunting halaman satu per satu.

   Tulis nomornya dengan kode negara, tanpa tanda plus dan tanpa spasi.
   Contoh: 0812-3456-7890 ditulis 6281234567890
   ========================================================================== */

window.KONTAK = {
  wa: '6281234567890',
  email: 'halo@baduyvilla.id'
};

(function () {
  'use strict';

  var k = window.KONTAK;

  function pasang() {
    document.querySelectorAll('[data-wa]').forEach(function (a) {
      var teks = a.getAttribute('data-wa-teks');
      a.href = 'https://wa.me/' + k.wa + (teks ? '?text=' + encodeURIComponent(teks) : '');
    });

    document.querySelectorAll('[data-email]').forEach(function (a) {
      a.href = 'mailto:' + k.email;
      if (!a.textContent.trim()) a.textContent = k.email;
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', pasang);
  } else {
    pasang();
  }
})();
