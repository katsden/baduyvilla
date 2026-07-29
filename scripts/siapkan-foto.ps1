# =============================================================================
# siapkan-foto.ps1 - Baduy Villa
#
# Menyapu folder foto/ (termasuk subfolder), lalu menulis JPEG siap web ke
# assets/img/. PNG dari generator besarnya 2-3 MB per berkas; tanpa langkah
# ini situs menyeret puluhan megabita hanya untuk gambar.
#
# Nama berkas dirapikan otomatis:
#   - akhiran ganda ".jpg.png" jadi ".jpg"
#   - spasi jadi tanda hubung
#   - ejaan yang meleset diperbaiki lewat tabel $ganti di bawah
#
# Lebar keluaran ditentukan dari rasionya, jadi foto baru tidak perlu
# didaftarkan satu per satu.
#
# Berkas ini ditulis tanpa karakter di luar ASCII: PowerShell 5.1 membaca
# .ps1 sebagai ANSI kalau tidak ada BOM.
#
#   powershell -ExecutionPolicy Bypass -File scripts\siapkan-foto.ps1
# =============================================================================

Add-Type -AssemblyName System.Drawing

$akar   = Split-Path -Parent $PSScriptRoot
$sumber = Join-Path $akar 'foto'
$tujuan = Join-Path $akar 'assets\img'

if (-not (Test-Path $tujuan)) { New-Item -ItemType Directory -Force $tujuan | Out-Null }

# Berkas lama yang namanya masih bawaan generator.
$petaLama = @{
  '10_12_11 PM' = 'hero-beranda.jpg'
  '10_13_45 PM' = 'jalan-masuk.jpg'
  '05_49_27 AM' = 'santapan-beranda.jpg'
  '05_50_33 AM' = 'pengalaman-beranda.jpg'
  '05_57_10 AM' = 'penutup.jpg'
}

# Perbaikan ejaan dan penamaan.
$ganti = @{
  'pav isuk'     = 'pav-isuk'
  'pav-leuweng'  = 'pav-leuweung'
}

# Lebar maksimal menurut rasio lebar dibagi tinggi.
function LebarUntuk($rasio) {
  if ($rasio -gt 1.6) { return 1672 }   # 16:9  hero
  if ($rasio -gt 1.2) { return 1536 }   # 3:2   lanskap
  if ($rasio -gt 0.9) { return 1000 }   # 1:1   galeri
  if ($rasio -gt 0.78) { return 900 }   # 4:5   makro
  return 900                            # 3:4   kartu
}

function NamaKeluaran($berkas) {
  foreach ($kunci in $petaLama.Keys) {
    if ($berkas.Name -like "*$kunci*") { return $petaLama[$kunci] }
  }

  $n = $berkas.Name
  $n = $n -replace '\.jpg\.png$', ''
  $n = $n -replace '\.png$', ''
  $n = $n -replace '\.jpg$', ''
  $n = $n -replace '\s+', '-'
  $n = $n.ToLower()

  foreach ($kunci in $ganti.Keys) {
    if ($n -eq ($kunci -replace '\s+', '-')) { $n = $ganti[$kunci] }
    if ($n -eq $kunci) { $n = $ganti[$kunci] }
  }

  return "$n.jpg"
}

$encoder = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() |
           Where-Object { $_.MimeType -eq 'image/jpeg' }
$params  = New-Object System.Drawing.Imaging.EncoderParameters 1
$params.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter(
  [System.Drawing.Imaging.Encoder]::Quality, 82L)

$totalSebelum = 0
$totalSesudah = 0
$jumlah = 0

Get-ChildItem $sumber -Recurse -File -Include *.png, *.jpg, *.jpeg |
  Sort-Object Name | ForEach-Object {

  $asli = [System.Drawing.Image]::FromFile($_.FullName)
  $rasio = $asli.Width / $asli.Height

  $lebar  = [math]::Min($asli.Width, (LebarUntuk $rasio))
  $tinggi = [int][math]::Round($asli.Height * ($lebar / $asli.Width))

  $kanvas = New-Object System.Drawing.Bitmap($lebar, $tinggi)
  $g = [System.Drawing.Graphics]::FromImage($kanvas)
  $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
  $g.PixelOffsetMode   = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
  $g.SmoothingMode     = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
  $g.DrawImage($asli, 0, 0, $lebar, $tinggi)

  $nama = NamaKeluaran $_
  $keluar = Join-Path $tujuan $nama
  $kanvas.Save($keluar, $encoder, $params)

  $g.Dispose(); $kanvas.Dispose(); $asli.Dispose()

  $sebelumKB = [math]::Round($_.Length / 1KB)
  $sesudahKB = [math]::Round((Get-Item $keluar).Length / 1KB)
  $totalSebelum += $sebelumKB
  $totalSesudah += $sesudahKB
  $jumlah += 1

  Write-Host ("{0,-24} {1,5}x{2,-5} {3,6} KB -> {4,5} KB" -f $nama, $lebar, $tinggi, $sebelumKB, $sesudahKB)
}

Write-Host ''
$turun = [math]::Round(100 - ($totalSesudah / $totalSebelum * 100))
Write-Host ("{0} berkas. Total {1} KB -> {2} KB (turun {3} persen)" -f $jumlah, $totalSebelum, $totalSesudah, $turun)
