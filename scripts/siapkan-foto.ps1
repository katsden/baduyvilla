# =============================================================================
# siapkan-foto.ps1 - Baduy Villa
#
# Mengubah PNG mentah dari folder foto/ menjadi JPEG siap web di assets/img/.
# PNG hasil generator besarnya 1,5 sampai 2,9 MB per berkas; di beranda ada
# lima, jadi tanpa konversi halaman ini menyeret 10 MB hanya untuk gambar.
#
# Berkas ini sengaja ditulis tanpa karakter di luar ASCII: PowerShell 5.1
# membaca .ps1 sebagai ANSI kalau tidak ada BOM, dan tanda pisah panjang
# maupun huruf beraksen akan merusak parser.
#
# Jalankan ulang kapan saja setelah menambah foto baru:
#   powershell -ExecutionPolicy Bypass -File scripts\siapkan-foto.ps1
# =============================================================================

Add-Type -AssemblyName System.Drawing

$akar   = Split-Path -Parent $PSScriptRoot
$sumber = Join-Path $akar 'foto'
$tujuan = Join-Path $akar 'assets\img'

if (-not (Test-Path $tujuan)) { New-Item -ItemType Directory -Force $tujuan | Out-Null }

# Nama berkas sumber dipetakan ke nama slot yang dipakai di HTML.
# Lebar maksimal disesuaikan pemakaiannya: hero melebar penuh, kartu tidak.
$peta = @(
  @{ Cocok = '10_12_11 PM'; Nama = 'hero-beranda.jpg';       LebarMaks = 1672 }
  @{ Cocok = '10_13_45 PM'; Nama = 'jalan-masuk.jpg';        LebarMaks = 1536 }
  @{ Cocok = '05_49_27 AM'; Nama = 'santapan-beranda.jpg';   LebarMaks = 900  }
  @{ Cocok = '05_50_33 AM'; Nama = 'pengalaman-beranda.jpg'; LebarMaks = 900  }
  @{ Cocok = '05_57_10 AM'; Nama = 'penutup.jpg';            LebarMaks = 1672 }
)

$encoder = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() |
           Where-Object { $_.MimeType -eq 'image/jpeg' }
$params  = New-Object System.Drawing.Imaging.EncoderParameters 1
$params.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter(
  [System.Drawing.Imaging.Encoder]::Quality, 82L)

$totalSebelum = 0
$totalSesudah = 0

foreach ($slot in $peta) {
  $berkas = Get-ChildItem $sumber -Filter *.png |
            Where-Object { $_.Name -like "*$($slot.Cocok)*" } |
            Select-Object -First 1

  if (-not $berkas) {
    Write-Host ("LEWAT  {0} - sumber tidak ditemukan" -f $slot.Nama)
    continue
  }

  $asli = [System.Drawing.Image]::FromFile($berkas.FullName)

  $lebar  = [math]::Min($asli.Width, $slot.LebarMaks)
  $tinggi = [int][math]::Round($asli.Height * ($lebar / $asli.Width))

  $kanvas = New-Object System.Drawing.Bitmap($lebar, $tinggi)
  $g = [System.Drawing.Graphics]::FromImage($kanvas)
  $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
  $g.PixelOffsetMode   = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
  $g.SmoothingMode     = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
  $g.DrawImage($asli, 0, 0, $lebar, $tinggi)

  $keluar = Join-Path $tujuan $slot.Nama
  $kanvas.Save($keluar, $encoder, $params)

  $g.Dispose(); $kanvas.Dispose(); $asli.Dispose()

  $sebelumKB = [math]::Round($berkas.Length / 1KB)
  $sesudahKB = [math]::Round((Get-Item $keluar).Length / 1KB)
  $totalSebelum += $sebelumKB
  $totalSesudah += $sesudahKB

  Write-Host ("{0,-24} {1,5}x{2,-5} {3,6} KB -> {4,5} KB" -f $slot.Nama, $lebar, $tinggi, $sebelumKB, $sesudahKB)
}

Write-Host ''
$turun = [math]::Round(100 - ($totalSesudah / $totalSebelum * 100))
Write-Host ("Total: {0} KB -> {1} KB (turun {2} persen)" -f $totalSebelum, $totalSesudah, $turun)
