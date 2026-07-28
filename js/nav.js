/* ==========================================================================
   nav.js — Baduy Villa
   Perilaku nav saja. Markup nav sudah lengkap di HTML, jadi tanpa JS pun
   seluruh tautan tetap bisa diklik — termasuk Reservasi.
   ========================================================================== */

(function () {
  'use strict';

  var nav = document.querySelector('[data-nav]');
  if (!nav) return;

  /* ---- Tandai halaman aktif -------------------------------------------
     Dikerjakan di JS supaya blok nav bisa disalin apa adanya ke halaman
     baru tanpa perlu mengedit aria-current satu per satu. */

  var berkas = location.pathname.split('/').pop() || 'index.html';

  nav.querySelectorAll('a[href]').forEach(function (a) {
    var tujuan = a.getAttribute('href').split('/').pop().split('#')[0];
    if (tujuan === berkas) a.setAttribute('aria-current', 'page');
  });

  /* ---- Mengecil saat scroll -------------------------------------------
     Boleh mengecil, tidak boleh hilang. Ambangnya diberi jeda naik-turun
     supaya nav tidak berkedip saat scroll berhenti tepat di batas. */

  var kecil = false;

  function periksaScroll() {
    var y = window.scrollY;
    if (!kecil && y > 88) {
      kecil = true;
      nav.classList.add('nav--kecil');
    } else if (kecil && y < 40) {
      kecil = false;
      nav.classList.remove('nav--kecil');
    }
  }

  var menunggu = false;

  window.addEventListener('scroll', function () {
    if (menunggu) return;
    menunggu = true;
    requestAnimationFrame(function () {
      periksaScroll();
      menunggu = false;
    });
  }, { passive: true });

  periksaScroll();

  /* ---- Panel menu mobile ---------------------------------------------- */

  var tombol = nav.querySelector('[data-menu-tombol]');
  var panel = document.querySelector('[data-menu-panel]');
  if (!tombol || !panel) return;

  function setMenu(buka) {
    tombol.setAttribute('aria-expanded', String(buka));
    panel.setAttribute('data-buka', String(buka));
    tombol.setAttribute('aria-label', buka ? 'Tutup menu' : 'Buka menu');
    document.body.style.overflow = buka ? 'hidden' : '';
    if (buka) {
      var pertama = panel.querySelector('a');
      if (pertama) pertama.focus();
    }
  }

  tombol.addEventListener('click', function () {
    setMenu(tombol.getAttribute('aria-expanded') !== 'true');
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && tombol.getAttribute('aria-expanded') === 'true') {
      setMenu(false);
      tombol.focus();
    }
  });

  /* Kembali ke lebar desktop saat menu terbuka: tutup, dan lepas kunci scroll. */
  var lebar = window.matchMedia('(min-width: 768px)');
  lebar.addEventListener('change', function (e) {
    if (e.matches) setMenu(false);
  });
})();
