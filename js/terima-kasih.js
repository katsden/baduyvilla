/* ==========================================================================
   terima-kasih.js — Baduy Villa
   Memulihkan tautan WhatsApp kalau jendelanya tadi diblokir peramban.
   ========================================================================== */

(function () {
  'use strict';

  var tautan = document.querySelector('[data-buka-lagi]');
  if (!tautan) return;

  var tersimpan;
  try { tersimpan = sessionStorage.getItem('pesan-wa'); } catch (e) {}

  if (!tersimpan) return;

  tautan.href = tersimpan;
  tautan.target = '_blank';
  tautan.rel = 'noopener';
})();
