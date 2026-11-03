# Script Pembuat Paket Deployment Otomatis STAMAR Ambon
$ErrorActionPreference = 'Stop'

$outputZip = "stamar-deploy-siap.zip"
$sourcePath = (Get-Item .).FullName
$zipFullPath = Join-Path $sourcePath $outputZip

Write-Host "======================================================" -ForegroundColor Cyan
Write-Host "   STAMAR AMBON - GENERATOR PAKET DEPLOYMENT ZIP      " -ForegroundColor Yellow
Write-Host "======================================================" -ForegroundColor Cyan

# 1. Pastikan folder build sudah ada
if (-not (Test-Path "public\build\manifest.json")) {
    Write-Host "[!] Peringatan: public\build\manifest.json tidak ditemukan." -ForegroundColor Red
    Write-Host "[*] Menjalankan npm run build terlebih dahulu..." -ForegroundColor Yellow
    npm run build
}

# 2. Hapus file zip lama jika sudah ada
if (Test-Path $zipFullPath) {
    Write-Host "[*] Menghapus $outputZip lama..." -ForegroundColor Gray
    Remove-Item -Path $zipFullPath -Force
}

# 3. Kriteria pengecualian
$excludePatterns = @(
    'node_modules',
    'vendor',
    '.git',
    '.github',
    '.env',
    '.env.backup',
    'storage\app\public',
    'storage\framework\cache',
    'storage\framework\sessions',
    'storage\framework\views',
    'storage\inertia-devtools',
    'storage\logs',
    'bootstrap\cache',
    '*.zip',
    'tests',
    '.agents',
    'public\hot'
)

Write-Host "[*] Mengompres file proyek (mengecualikan node_modules, vendor, .git, .env)..." -ForegroundColor Cyan

Add-Type -AssemblyName System.IO.Compression.FileSystem
$archive = [System.IO.Compression.ZipFile]::Open($zipFullPath, 'Create')

$count = 0
$allFiles = Get-ChildItem -Path $sourcePath -Recurse -File

foreach ($file in $allFiles) {
    $relPath = $file.FullName.Substring($sourcePath.Length + 1)
    
    # Periksa apakah file termasuk yang dikecualikan
    $skip = $false
    if ($file.Name -eq '.env' -or $file.Name -like '*.zip') {
        $skip = $true
    } else {
        foreach ($pat in $excludePatterns) {
            if ($relPath -like "$pat*" -or $relPath -like "*\$pat*") {
                $skip = $true
                break
            }
        }
    }

    if (-not $skip) {
        # Gunakan forward slash pada zip entry agar kompatibel dengan Linux server
        $entryName = $relPath.Replace('\', '/')
        [System.IO.Compression.ZipFileExtensions]::CreateEntryFromFile(
            $archive,
            $file.FullName,
            $entryName,
            [System.IO.Compression.CompressionLevel]::Optimal
        ) | Out-Null
        $count++
    }
}

$archive.Dispose()

$zipItem = Get-Item $zipFullPath
$sizeMB = [math]::Round($zipItem.Length / 1MB, 2)

Write-Host ""
Write-Host "======================================================" -ForegroundColor Green
Write-Host " [SUKSES] Paket ZIP Deployment Berhasil Dibuat!" -ForegroundColor Green
Write-Host "======================================================" -ForegroundColor Green
Write-Host "Nama File : $outputZip" -ForegroundColor White
Write-Host "Ukuran    : $sizeMB MB" -ForegroundColor White
Write-Host "Jumlah    : $count file" -ForegroundColor White
Write-Host "Lokasi    : $zipFullPath" -ForegroundColor White
Write-Host "======================================================" -ForegroundColor Green
