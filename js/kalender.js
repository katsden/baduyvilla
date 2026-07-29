/* ==========================================================================
   kalender.js — Baduy Villa
   Pemilih rentang tanggal.

   Ditulis sendiri karena input tanggal bawaan browser hanya bisa menyatakan
   satu tanggal, sementara yang dibutuhkan di sini rentang menginap dengan
   batas paling singkat dua malam. Tidak ada pustaka yang dipasang.

   Kalau berkas ini gagal dimuat, dua medan tersembunyi tetap ada dan borang
   tetap bisa dikirim tanpa tanggal — tanggalnya tinggal ditulis di catatan.
   ========================================================================== */

(function () {
  'use strict';

  var akar = document.querySelector('[data-kalender]');
  if (!akar) return;

  var BULAN = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
               'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
  var SINGKAT = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun',
                 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];

  var MIN_MALAM = 2;

  var panel  = akar.querySelector('[data-kalender-panel]');
  var petak  = akar.querySelector('[data-kalender-petak]');
  var judul  = akar.querySelector('[data-kalender-bulan]');
  var mundur = akar.querySelector('[data-kalender-mundur]');
  var maju   = akar.querySelector('[data-kalender-maju]');

  var slot = {
    masuk:  akar.querySelector('[data-kalender-slot="masuk"]'),
    keluar: akar.querySelector('[data-kalender-slot="keluar"]')
  };
  var teks = {
    masuk:  akar.querySelector('[data-kalender-teks="masuk"]'),
    keluar: akar.querySelector('[data-kalender-teks="keluar"]')
  };
  var nilai = {
    masuk:  akar.querySelector('[data-kalender-nilai="masuk"]'),
    keluar: akar.querySelector('[data-kalender-nilai="keluar"]')
  };

  /* ---- Tanggal --------------------------------------------------------- */

  function murni(d) { return new Date(d.getFullYear(), d.getMonth(), d.getDate()); }
  function tambahHari(d, n) { return new Date(d.getFullYear(), d.getMonth(), d.getDate() + n); }
  function sama(a, b) { return a && b && a.getTime() === b.getTime(); }

  function iso(d) {
    var b = String(d.getMonth() + 1).padStart(2, '0');
    var t = String(d.getDate()).padStart(2, '0');
    return d.getFullYear() + '-' + b + '-' + t;
  }

  function baca(d) { return d.getDate() + ' ' + SINGKAT[d.getMonth()] + ' ' + d.getFullYear(); }

  var hariIni = murni(new Date());
  var pilih = { masuk: null, keluar: null };
  var aktif = 'masuk';
  var tampil = new Date(hariIni.getFullYear(), hariIni.getMonth(), 1);

  /* ---- Menggambar ------------------------------------------------------ */

  function gambar() {
    judul.textContent = BULAN[tampil.getMonth()] + ' ' + tampil.getFullYear();

    /* Tidak ada gunanya mundur ke bulan yang sudah lewat. */
    mundur.disabled = tampil.getFullYear() === hariIni.getFullYear() &&
                      tampil.getMonth() === hariIni.getMonth();

    petak.textContent = '';

    var pertama = new Date(tampil.getFullYear(), tampil.getMonth(), 1);
    var jumlah = new Date(tampil.getFullYear(), tampil.getMonth() + 1, 0).getDate();

    /* Pekan dimulai Senin, bukan Minggu. */
    var geser = (pertama.getDay() + 6) % 7;

    var i;
    for (i = 0; i < geser; i++) {
      var kosong = document.createElement('span');
      kosong.className = 'kalender__tgl';
      kosong.setAttribute('data-kosong', '');
      petak.appendChild(kosong);
    }

    for (i = 1; i <= jumlah; i++) {
      var tanggal = new Date(tampil.getFullYear(), tampil.getMonth(), i);
      var tombol = document.createElement('button');

      tombol.type = 'button';
      tombol.className = 'kalender__tgl';
      tombol.textContent = String(i);
      tombol.setAttribute('data-iso', iso(tanggal));

      var batasBawah = (aktif === 'keluar' && pilih.masuk)
        ? tambahHari(pilih.masuk, MIN_MALAM)
        : hariIni;

      if (tanggal < batasBawah) tombol.disabled = true;

      if (sama(tanggal, pilih.masuk) || sama(tanggal, pilih.keluar)) {
        tombol.setAttribute('data-ujung', 'true');
      } else if (pilih.masuk && pilih.keluar &&
                 tanggal > pilih.masuk && tanggal < pilih.keluar) {
        tombol.setAttribute('data-antara', 'true');
      }

      tombol.setAttribute('aria-label', baca(tanggal));
      petak.appendChild(tombol);
    }

    for (var s in slot) {
      if (!Object.prototype.hasOwnProperty.call(slot, s)) continue;
      teks[s].textContent = pilih[s] ? baca(pilih[s]) : 'Pilih tanggal';
      nilai[s].value = pilih[s] ? iso(pilih[s]) : '';
      slot[s].setAttribute('data-aktif', String(aktif === s && !panel.hidden));
    }
  }

  /* ---- Perilaku -------------------------------------------------------- */

  function bukaPanel(nama) {
    aktif = nama;
    panel.hidden = false;

    var acuan = pilih[nama] || (nama === 'keluar' && pilih.masuk) || hariIni;
    tampil = new Date(acuan.getFullYear(), acuan.getMonth(), 1);
    gambar();
  }

  function tutupPanel() {
    panel.hidden = true;
    gambar();
  }

  slot.masuk.addEventListener('click', function () {
    if (!panel.hidden && aktif === 'masuk') tutupPanel();
    else bukaPanel('masuk');
  });

  slot.keluar.addEventListener('click', function () {
    if (!panel.hidden && aktif === 'keluar') tutupPanel();
    else bukaPanel('keluar');
  });

  mundur.addEventListener('click', function () {
    tampil = new Date(tampil.getFullYear(), tampil.getMonth() - 1, 1);
    gambar();
  });

  maju.addEventListener('click', function () {
    tampil = new Date(tampil.getFullYear(), tampil.getMonth() + 1, 1);
    gambar();
  });

  petak.addEventListener('click', function (e) {
    var tombol = e.target.closest('button[data-iso]');
    if (!tombol || tombol.disabled) return;

    var bagian = tombol.getAttribute('data-iso').split('-');
    var dipilih = new Date(+bagian[0], +bagian[1] - 1, +bagian[2]);

    if (aktif === 'masuk') {
      pilih.masuk = dipilih;

      /* Tanggal keluar yang lama jadi tidak masuk akal kalau tanggal masuk
         digeser melewatinya. Lebih jujur dihapus daripada digeser diam-diam. */
      if (pilih.keluar && pilih.keluar < tambahHari(dipilih, MIN_MALAM)) {
        pilih.keluar = null;
      }

      bukaPanel('keluar');
      return;
    }

    pilih.keluar = dipilih;
    tutupPanel();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !panel.hidden) {
      tutupPanel();
      slot[aktif].focus();
    }
  });

  /* Ditangkap di fase capture, jadi pemeriksaan ini berjalan SEBELUM petak
     digambar ulang. Kalau dipasang di fase bubble, tombol tanggal yang
     barusan diklik sudah dilepas dari DOM lebih dulu, akar.contains()
     mengembalikan false, dan panelnya menutup sendiri persis pada saat
     seharusnya berpindah ke tanggal keluar. */
  document.addEventListener('click', function (e) {
    if (panel.hidden) return;
    if (akar.contains(e.target)) return;
    tutupPanel();
  }, true);

  /* Dipakai reservasi.js untuk menyusun pesan dan memeriksa isian. */
  akar.kalender = {
    ambil: function () { return { masuk: pilih.masuk, keluar: pilih.keluar }; },
    malam: function () {
      if (!pilih.masuk || !pilih.keluar) return 0;
      return Math.round((pilih.keluar - pilih.masuk) / 86400000);
    },
    baca: baca,
    minMalam: MIN_MALAM
  };

  gambar();
})();
