# Prompt Sheet Foto — Putaran Kedua

Sepuluh foto untuk menutup ruang kosong yang tersisa. Urut prioritas: kerjakan
bagian A dan B dulu — itu yang paling terlihat bolong.

Taruh hasilnya di `foto/` (boleh langsung di dalamnya, boleh bikin subfolder,
skrip konversinya menyapu keduanya). **Nama berkasnya harus persis** seperti
kolom Nama, karena kode sudah menunggu nama itu.

Setelah semua masuk:

```
powershell -ExecutionPolicy Bypass -File scripts\siapkan-foto.ps1
node scripts/bangun.js
```

---

## Aturan yang berlaku untuk semua

**Prefix — tempel di depan setiap prompt:**

> Editorial architectural photography of a small highland retreat in the Kendeng
> foothills, Banten, West Java. Handwoven split bamboo, reclaimed teak, black
> sugar-palm thatch, rammed earth floors, indigo-dyed handloom cloth. Soft
> overcast dawn light, low mist, no direct sun. Muted natural palette: deep pine
> green, warm grey stone, rattan tan, off-white. Shot on 35mm film, Kodak Portra
> 400, natural grain, shallow depth of field.

**Negative prompt — tempel di setiap generate:**

> no text, no letters, no signage, no logo, no watermark, no caption, no numbers,
> no faces, no bright blue sky, no oversaturated color, no HDR, no lens flare,
> no plastic, no modern furniture, no infinity pool, no drone shot

Sembilan belas foto sebelumnya bersih dari teks meleleh dengan negative ini —
jangan diubah.

**Catatan tangan:** empat foto di bagian B dan C butuh tangan yang sedang
bekerja. Tambahkan `hands only, no face, no portrait` ke prompt, dan jangan
hapus `no faces` dari negative.

---

## A. Dua penutup halaman (paling mendesak)

Section penutup Santapan dan Pengalaman sekarang cuma garis dan satu tombol di
ruang setinggi 400px. Dua foto ini yang mengisinya.

| # | Nama | Rasio | Prompt (setelah prefix) |
|---|---|---|---|
| 1 | `penutup-santapan.jpg` | 16:9 | Wide view of an open-sided kitchen pavilion at dusk, wood fire embers glowing low, one lamp lit, the valley behind it going dark. Nobody present. Mostly dark frame, one warm point of light. |
| 2 | `penutup-pengalaman.jpg` | 16:9 | Wide view of a work veranda at the end of the day, an unfinished weave still on the loom, tools set down, low light raking across the floor. Empty of people. Mostly shadow. |

Keduanya sengaja **gelap** — sama seperti `penutup.jpg` di beranda. Latar gelap
memang premis situs ini, dan penutup yang gelap membuat halaman terasa selesai.

## B. Enam isi Santapan dan Pengalaman

### Santapan — tiga makro, rasio 4:5

| # | Nama | Prompt (setelah prefix) |
|---|---|---|
| 3 | `santapan-kebun.jpg` | Close view of a small terraced vegetable plot on a slope, wet dark soil, young greens, dew still on the leaves, early morning. No tools, no people. |
| 4 | `santapan-tungku.jpg` | Close view of a clay wood-fired stove in an open kitchen, one blackened pot on it, thin smoke rising, embers visible underneath. Dark surroundings. |
| 5 | `santapan-wadah.jpg` | Close view of stacked earthenware bowls and a water jar on a bamboo shelf, unglazed, slightly uneven, one chipped rim. Side light from a doorway. |

### Pengalaman — tiga kartu, rasio 3:4

| # | Nama | Prompt (setelah prefix) |
|---|---|---|
| 6 | `pengalaman-menenun.jpg` | A backstrap loom tied to a post and to the weaver's waist, indigo warp threads stretched tight, hands only working the weft, no face. Morning light. |
| 7 | `pengalaman-menganyam.jpg` | Hands only splitting bamboo with a small knife on a low wooden bench, thin strips fanned out beside them, half-finished weave in the corner. No face. |
| 8 | `pengalaman-mewarnai.jpg` | Hands only lifting wet cloth out of an indigo dye vat, deep blue-black liquid dripping, stained fingers, wooden tub. No face. |

## C. Dua sisa

| # | Nama | Rasio | Prompt (setelah prefix) |
|---|---|---|---|
| 9 | `pembuka.jpg` | 4:5 | Tall vertical view of mist rising between old tree trunks on a steep slope, no building visible, deep green fading to grey. Quiet and almost abstract. |
| 10 | `galeri-4.jpg` | 1:1 | A folded blanket and a small oil lamp on a low wooden ledge beside a bed, evening, one soft light source. |

---

## Ke mana masing-masing dipasang

| Nama | Halaman | Menutup ruang kosong yang mana |
|---|---|---|
| `pembuka.jpg` | Beranda | Separuh kiri section "Jauh dari jalan besar" |
| `santapan-*.jpg` | Santapan | Tiga slot makro yang masih kosong |
| `penutup-santapan.jpg` | Santapan | Section penutup yang cuma berisi satu tombol |
| `pengalaman-*.jpg` | Pengalaman | Tiga kartu kegiatan yang masih kosong |
| `penutup-pengalaman.jpg` | Pengalaman | Section penutup yang cuma berisi satu tombol |
| `galeri-4.jpg` | 8 halaman paviliun | Slot keempat galeri di tiap paviliun |

## Kalau waktunya mepet

Kerjakan **1, 2, dan 9** saja (tiga foto). Ketiganya menutup jurang yang paling
kelihatan: dua penutup halaman dan separuh kiri beranda. Enam foto sisanya
mengisi slot yang sudah punya placeholder bertekstur — bolong, tapi tidak
terlihat rusak.
