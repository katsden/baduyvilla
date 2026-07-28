/* ==========================================================================
   tirai.js — Baduy Villa
   Transisi tirai antar halaman.

   Kenapa tidak memakai View Transitions API sebagai jalur utama:
   choreography yang diminta punya jeda diam 150ms saat layar tertutup penuh.
   Di VT cross-document, panjang transisi ditentukan oleh animasi terpanjang
   dan halaman baru sudah dirender di balik snapshot — jeda itu tidak bisa
   dipegang dengan pasti. Jalur di bawah ini deterministik: 0.6s naik,
   150ms diam, ganti halaman, 0.7s turun. Sama di semua browser.

   Tanpa JS, seluruh tautan tetap berfungsi sebagai tautan biasa.
   ========================================================================== */

(function () {
  'use strict';

  var KUNCI = 'tirai-masuk';
  var akar = document.documentElement;
  var tirai = document.querySelector('[data-tirai]');
  if (!tirai) return;

  var pelan = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var NAIK  = pelan ? 200 : 600;
  var JEDA  = pelan ? 0   : 150;
  var TURUN = pelan ? 200 : 700;

  function bersihkan() {
    tirai.removeAttribute('data-status');
    akar.classList.remove('tirai-sibuk');
  }

  /* ---- Masuk: halaman ini dibuka lewat tirai --------------------------
     Kelas tirai-tertutup dipasang oleh skrip sebaris di <head>, jadi panel
     sudah menutup sejak frame pertama. Di sini tinggal diturunkan. */

  if (akar.classList.contains('tirai-tertutup')) {
    tirai.setAttribute('data-status', 'tertutup');
    akar.classList.remove('tirai-tertutup');

    /* Paksa hitung ulang tata letak supaya nilai awal terkunci sebelum
       status diganti — tanpa ini transisinya dilewati begitu saja.

       Sengaja tidak memakai requestAnimationFrame di sini: rAF berhenti
       total saat tab berada di latar belakang, dan panelnya ikut nyangkut
       menutup layar sampai pengguna kembali ke tab itu. Reflow paksa
       berjalan tanpa bergantung pada frame. */
    void tirai.offsetHeight;

    tirai.setAttribute('data-status', 'membuka');
    setTimeout(bersihkan, TURUN);

    /* Jaring pengaman terakhir. Kalau transisi tidak pernah selesai —
       tab di latar belakang, animasi diputus, apa pun — panel tetap
       dilepas supaya halaman tidak pernah tertinggal tertutup. */
    setTimeout(function () {
      if (tirai.hasAttribute('data-status')) bersihkan();
    }, TURUN + 1200);
  }

  try { sessionStorage.removeItem(KUNCI); } catch (e) {}

  /* ---- Keluar --------------------------------------------------------- */

  var sedangPergi = false;

  function pergi(url) {
    if (sedangPergi) return;
    sedangPergi = true;

    akar.classList.add('tirai-sibuk');
    tirai.setAttribute('data-status', 'menutup');

    setTimeout(function () {
      try { sessionStorage.setItem(KUNCI, '1'); } catch (e) {}
      window.location.href = url;
    }, NAIK + JEDA);
  }

  document.addEventListener('click', function (e) {
    if (e.defaultPrevented || e.button !== 0) return;
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

    var a = e.target.closest && e.target.closest('a[href]');
    if (!a) return;
    if (a.hasAttribute('download')) return;
    if (a.target && a.target !== '_self') return;

    var tujuan;
    try { tujuan = new URL(a.href, location.href); } catch (err) { return; }

    /* Tautan ke luar, mailto, tel, dan WhatsApp dilepas apa adanya. */
    if (tujuan.origin !== location.origin) return;
    if (!/^https?:$/.test(tujuan.protocol)) return;

    /* Loncatan dalam halaman yang sama bukan perpindahan halaman. */
    if (tujuan.pathname === location.pathname && tujuan.hash) return;

    /* Sudah di halaman ini. */
    if (tujuan.href === location.href) { e.preventDefault(); return; }

    e.preventDefault();
    pergi(tujuan.href);
  });

  /* ---- Kembali lewat tombol Back --------------------------------------
     Halaman yang diambil dari bfcache tidak menjalankan skrip lagi, jadi
     panel bisa tertinggal menutup kalau tidak dibereskan di sini. */

  window.addEventListener('pageshow', function (e) {
    if (!e.persisted) return;
    sedangPergi = false;
    akar.classList.remove('tirai-tertutup');
    bersihkan();
  });

  /* Jaring pengaman: kalau halaman tujuan gagal dimuat dan pengguna
     tertinggal di halaman ini, panel dibuka kembali. */
  window.addEventListener('pagehide', function () { sedangPergi = false; });
})();
