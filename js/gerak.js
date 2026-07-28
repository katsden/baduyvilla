/* ==========================================================================
   gerak.js — Baduy Villa
   Smooth scroll dan reveal saat scroll.

   Kalau berkas ini gagal dimuat, atau GSAP tidak sampai, seluruh isi
   halaman tetap terlihat: keadaan tersembunyi baru dipasang CSS setelah
   kelas .siap ditambahkan dari sini.
   ========================================================================== */

(function () {
  'use strict';

  var akar = document.documentElement;

  /* Gerak dikurangi: tidak ada reveal, tidak ada parallax, tidak ada Lenis.
     Halaman disajikan apa adanya. */
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (!window.gsap || !window.ScrollTrigger) return;

  gsap.registerPlugin(ScrollTrigger);
  akar.classList.add('siap');

  var desktop = window.matchMedia('(min-width: 768px)').matches;

  /* ---- Smooth scroll -------------------------------------------------- */

  if (window.Lenis) {
    var lenis = new Lenis({
      duration: 1.1,
      easing: function (t) { return Math.min(1, 1.001 - Math.pow(2, -10 * t)); }
    });

    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(function (waktu) { lenis.raf(waktu * 1000); });
    gsap.ticker.lagSmoothing(0);

    /* Laci menu mengunci scroll halaman; Lenis harus ikut berhenti,
       kalau tidak halaman di belakangnya masih bisa digeser. */
    document.addEventListener('click', function (e) {
      var tombol = e.target.closest && e.target.closest('[data-menu-tombol]');
      if (!tombol) return;
      setTimeout(function () {
        if (tombol.getAttribute('aria-expanded') === 'true') lenis.stop();
        else lenis.start();
      }, 0);
    });
  }

  /* ---- Reveal ---------------------------------------------------------
     Sekali saja per elemen. Scroll balik ke atas tidak mengulanginya. */

  var DURASI = desktop ? 0.9 : 0.6;

  function nilaiAkhir() {
    return { opacity: 1, y: 0, duration: DURASI, ease: 'power3.out', overwrite: 'auto' };
  }

  /* Grup: anak-anaknya masuk berurutan. */
  var grup = gsap.utils.toArray('[data-reveal-grup]');

  grup.forEach(function (kotak) {
    var anak = kotak.querySelectorAll('[data-reveal]');
    if (!anak.length) return;

    gsap.to(anak, Object.assign(nilaiAkhir(), {
      stagger: 0.09,
      scrollTrigger: { trigger: kotak, start: 'top 85%', once: true }
    }));
  });

  /* Sisanya: satu per satu. */
  gsap.utils.toArray('[data-reveal]').forEach(function (el) {
    if (el.closest('[data-reveal-grup]')) return;

    gsap.to(el, Object.assign(nilaiAkhir(), {
      scrollTrigger: { trigger: el, start: 'top 85%', once: true }
    }));
  });

  /* ---- Jaring pengaman ------------------------------------------------
     Kelas .siap menyembunyikan setiap [data-reveal] sampai ScrollTrigger
     menampilkannya. Kalau ScrollTrigger tidak pernah sampai menjalankan
     tugasnya — CDN putus separuh, galat di tengah jalan, tab dibuka di
     latar belakang lalu dibiarkan — isi halaman akan tinggal tak terlihat
     selamanya tanpa satu pun pesan galat.

     Jadi: kalau ada elemen yang sudah berada di dalam layar tapi masih
     tembus pandang setelah 3 detik, seluruh penyembunyian dibatalkan.
     Halaman tanpa animasi jauh lebih baik daripada halaman kosong. */

  function jaringPengaman() {
    if (document.hidden) return;

    var hilang = gsap.utils.toArray('[data-reveal]').some(function (el) {
      var kotak = el.getBoundingClientRect();
      var diLayar = kotak.top < window.innerHeight && kotak.bottom > 0;
      return diLayar && parseFloat(getComputedStyle(el).opacity) < 0.05;
    });

    if (!hilang) return;

    akar.classList.remove('siap');
    gsap.set('[data-reveal]', { clearProps: 'opacity,transform' });
  }

  setTimeout(jaringPengaman, 3000);

  document.addEventListener('visibilitychange', function () {
    if (!document.hidden) setTimeout(jaringPengaman, 3000);
  });

  /* Font yang baru selesai dimuat menggeser tata letak, dan titik picu
     ScrollTrigger ikut meleset kalau tidak dihitung ulang. */
  window.addEventListener('load', function () { ScrollTrigger.refresh(); });

  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(function () { ScrollTrigger.refresh(); });
  }

  /* ---- Parallax -------------------------------------------------------
     Pergeseran total 15%, dan hanya di desktop. Di bawah 768px parallax
     dimatikan sepenuhnya — scroll di HP harus terasa ringan.

     Yang digeser fotonya, bukan kotaknya. Selama foto belum ada, tidak
     ada yang bergerak dan itu memang benar. */

  if (!desktop) return;

  gsap.utils.toArray('[data-parallax]').forEach(function (kotak) {
    var foto = kotak.querySelector('img');
    if (!foto) return;

    gsap.set(foto, { scale: 1.16, transformOrigin: '50% 50%' });

    gsap.fromTo(foto,
      { yPercent: -7.5 },
      {
        yPercent: 7.5,
        ease: 'none',
        scrollTrigger: {
          trigger: kotak,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      }
    );
  });
})();
