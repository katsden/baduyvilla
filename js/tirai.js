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
  var SUDAH_DATANG = 'sudah-datang';
  var akar = document.documentElement;
  var tirai = document.querySelector('[data-tirai]');
  if (!tirai) return;

  /* Durasi dibaca dari tokens.css supaya cuma ada satu sumber angka.
     tokens.css sudah menukar nilainya sendiri di bawah prefers-reduced-motion,
     jadi JS tidak perlu tahu-menahu soal itu. */
  function ms(nama, cadangan) {
    var v = getComputedStyle(akar).getPropertyValue(nama).trim();
    if (!v) return cadangan;
    var angka = parseFloat(v);
    if (isNaN(angka)) return cadangan;
    return v.indexOf('ms') > -1 ? angka : angka * 1000;
  }

  var NAIK  = ms('--tirai-naik', 900);
  var JEDA  = ms('--tirai-jeda', 250);
  var TURUN = ms('--tirai-turun', 900);

  function bersihkan() {
    tirai.removeAttribute('data-status');
    akar.classList.remove('tirai-sibuk');
  }

  /* ---- Masuk: halaman ini dibuka lewat tirai --------------------------
     Kelas tirai-tertutup dipasang oleh skrip sebaris di <head>, jadi panel
     sudah menutup sejak frame pertama. Di sini tinggal diturunkan. */

  function turunkan() {
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

  /* ---- Preloader kunjungan pertama -----------------------------------
     Panel yang sama, fungsi kedua. Layar dimulai tertutup, tirai turun
     setelah font siap. Tanpa spinner, tanpa angka persen, tanpa logo. */

  function tungguLaluTurunkan() {
    var mulai = Date.now();
    var MINIMAL = 900;   /* supaya tidak sekadar berkedip di koneksi cepat */
    var BATAS = 3500;    /* font gagal dimuat pun, layar tidak pernah terkunci */
    var sudah = false;

    function lepas() {
      if (sudah) return;
      sudah = true;
      setTimeout(turunkan, Math.max(0, MINIMAL - (Date.now() - mulai)));
    }

    setTimeout(lepas, BATAS);

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(lepas, lepas);
    } else {
      window.addEventListener('load', lepas);
    }
  }

  if (akar.classList.contains('tirai-tertutup')) {
    tirai.setAttribute('data-status', 'tertutup');
    akar.classList.remove('tirai-tertutup');

    var pertamaKali = false;
    try {
      pertamaKali = !sessionStorage.getItem(SUDAH_DATANG);
      sessionStorage.setItem(SUDAH_DATANG, '1');
    } catch (e) {}

    if (pertamaKali) tungguLaluTurunkan();
    else turunkan();
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
