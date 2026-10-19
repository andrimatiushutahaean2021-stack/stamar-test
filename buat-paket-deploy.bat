@echo off
setlocal enabledelayedexpansion
title STAMAR AMBON - Pembuat Paket Deployment Otomatis

echo =====================================================================
echo        STASIUN METEOROLOGI KELAS II MARITIM YOS SOEDARSO AMBON
echo             GENERATOR PAKET DEPLOYMENT SERVER (ANTI-ERROR)
echo =====================================================================
echo.
echo [1/4] Memeriksa direktori proyek...
if not exist "artisan" (
    echo [ERROR] File artisan tidak ditemukan! Pastikan script dijalankan di folder root proyek.
    pause
    exit /b 1
)

echo.
echo [2/4] Melakukan build aset frontend produksi (npm run build)...
call npm run build
if %errorlevel% neq 0 (
    echo [ERROR] Build Vite frontend gagal! Periksa error di atas.
    pause
    exit /b 1
)

echo.
echo [3/4] Menyiapkan paket zip bersih (Mengabaikan node_modules, vendor, .env lokal)...
set "OUTPUT_ZIP=stamar-deploy-siap.zip"
if exist "%OUTPUT_ZIP%" del /f /q "%OUTPUT_ZIP%"

:: Gunakan PowerShell untuk zip dengan filter pengecualian otomatis
powershell -NoProfile -ExecutionPolicy Bypass -Command ^
    "$exclude = @('node_modules', 'vendor', '.git', '.github', '.env', '.env.backup', 'storage\\app\\public', '*.zip', 'tests', '.agents');" ^
    "$source = (Get-Item .).FullName;" ^
    "$zipPath = Join-Path $source '%OUTPUT_ZIP%';" ^
    "Add-Type -AssemblyName System.IO.Compression.FileSystem;" ^
    "$archive = [System.IO.Compression.ZipFile]::Open($zipPath, 'Create');" ^
    "Get-ChildItem -Path $source -Recurse | Where-Object {" ^
    "    $rel = $_.FullName.Substring($source.Length + 1);" ^
    "    $skip = $false;" ^
    "    foreach ($pat in $exclude) {" ^
    "        if ($rel -like \"$pat*\" -or $rel -like \"*\\$pat*\") { $skip = $true; break }" ^
    "    }" ^
    "    -not $skip -and -not $_.PSIsContainer" ^
    "} | ForEach-Object {" ^
    "    $rel = $_.FullName.Substring($source.Length + 1);" ^
    "    [System.IO.Compression.ZipFileExtensions]::CreateEntryFromFile($archive, $_.FullName, $rel, [System.IO.Compression.CompressionLevel]::Optimal) | Out-Null;" ^
    "};" ^
    "$archive.Dispose();"

if not exist "%OUTPUT_ZIP%" (
    echo [ERROR] Gagal membuat file zip.
    pause
    exit /b 1
)

echo.
echo =====================================================================
echo [SUKSES 4/4] PAKET BERHASIL DIBUAT DENGAN AMAN!
echo =====================================================================
echo.
echo File paket Anda: %OUTPUT_ZIP%
echo.
echo LANGKAH SELANJUTNYA SAAT DEPLOY:
echo 1. Hubungkan NetBird VPN dan buka MobaXterm.
echo 2. Upload file '%OUTPUT_ZIP%' ke server BMKG.
echo 3. Di terminal server, ekstrak file zip tersebut:
echo      unzip -o %OUTPUT_ZIP%
echo 4. Jalankan script penyelamat di server:
echo      bash deploy.sh
echo.
echo Folder berbahaya (node_modules, vendor, .env lokal) OTOMATIS TIDAK IKUT!
echo =====================================================================
echo.
pause
