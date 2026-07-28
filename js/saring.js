/* ==========================================================================
   saring.js — Baduy Villa
   Saringan daftar paviliun.

   Delapan unit terlalu sedikit untuk butuh pencarian, jadi tidak ada kotak
   cari di sini. Yang ada cuma dua pilihan: jumlah tamu dan arah pandang.

   Kartu-kartunya sudah ada sebagai HTML statis. Berkas ini hanya
   menyembunyikan sebagian — tanpa JS, kedelapan kartu tetap tampil dan
   halaman tetap berguna.
   ========================================================================== */

(function () {
  'use strict';

  var saring = document.querySelector('[data-saring]');
  if (!saring) return;

  var daftar = saring.parentNode.querySelector('[data-saring-daftar]');
  var kosong = saring.parentNode.querySelector('[data-saring-kosong]');
  var jumlah = saring.querySelector('[data-saring-jumlah]');
  if (!daftar) return;

  var kartu = Array.prototype.slice.call(daftar.querySelectorAll('.kartu'));

  /* ---- Menyaring ------------------------------------------------------- */

  function nilai(nama) {
    var terpilih = saring.querySelector('input[name="' + nama + '"]:checked');
    return terpilih ? terpilih.value : 'semua';
  }

  function terapkan(perbaruiAlamat) {
    var tamu = nilai('tamu');
    var orientasi = nilai('orientasi');
    var lolos = 0;

    kartu.forEach(function (k) {
      var cocok =
        (tamu === 'semua' || k.dataset.tamu === tamu) &&
        (orientasi === 'semua' || k.dataset.orientasi === orientasi);

      k.hidden = !cocok;
      if (cocok) lolos++;
    });

    if (jumlah) jumlah.textContent = String(lolos);
    if (kosong) kosong.hidden = lolos !== 0;

    if (perbaruiAlamat !== false) simpanKeAlamat(tamu, orientasi);
  }

  /* ---- Alamat ----------------------------------------------------------
     Saringan ikut masuk ke URL supaya hasilnya bisa dikirim ke orang lain
     dan bertahan saat halaman dimuat ulang. */

  function simpanKeAlamat(tamu, orientasi) {
    var bagian = [];
    if (tamu !== 'semua') bagian.push('tamu=' + tamu);
    if (orientasi !== 'semua') bagian.push('arah=' + orientasi);

    var alamat = location.pathname + (bagian.length ? '?' + bagian.join('&') : '');
    history.replaceState(null, '', alamat);
  }

  function bacaAlamat() {
    var cari = new URLSearchParams(location.search);
    var pasang = function (nama, nilaiDicari) {
      if (!nilaiDicari) return;
      var input = saring.querySelector(
        'input[name="' + nama + '"][value="' + nilaiDicari.replace(/"/g, '') + '"]');
      if (input) input.checked = true;
    };

    pasang('tamu', cari.get('tamu'));
    pasang('orientasi', cari.get('arah'));
  }

  /* ---- Lembar bawah di mobile ------------------------------------------ */

  var buka = saring.querySelector('[data-saring-buka]');
  var tutup = saring.querySelector('[data-saring-tutup]');

  function setLembar(terbuka) {
    saring.setAttribute('data-buka', String(terbuka));
    if (buka) buka.setAttribute('aria-expanded', String(terbuka));
  }

  if (buka) buka.addEventListener('click', function () { setLembar(true); });
  if (tutup) tutup.addEventListener('click', function () { setLembar(false); });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && saring.getAttribute('data-buka') === 'true') {
      setLembar(false);
      if (buka) buka.focus();
    }
  });

  /* ---- Pasang ---------------------------------------------------------- */

  saring.addEventListener('change', function () { terapkan(); });
  saring.addEventListener('submit', function (e) { e.preventDefault(); });

  setLembar(false);
  bacaAlamat();
  terapkan(false);
})();
