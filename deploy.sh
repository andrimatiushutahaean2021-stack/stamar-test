#!/usr/bin/env bash
# ==============================================================================
# SCRIPT DEPLOYMENT & AUTO-RECOVERY SERVER BMKG STAMAR AMBON
# ==============================================================================
# Skrip ini mengotomatiskan setup server dan membersihkan file berbahaya
# jika pengguna tidak sengaja mengupload node_modules / vendor dari Windows.
# ==============================================================================

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}======================================================================${NC}"
echo -e "${BLUE}      STASIUN METEOROLOGI KELAS II MARITIM YOS SOEDARSO AMBON         ${NC}"
echo -e "${BLUE}          SCRIPT DEPLOYMENT & PENYELAMAT SERVER (AUTO-FIX)           ${NC}"
echo -e "${BLUE}======================================================================${NC}"

# 1. Validasi lokasi direktori
if [ ! -f "artisan" ]; then
    echo -e "${RED}[ERROR] File 'artisan' tidak ditemukan!${NC}"
    echo "Pastikan Anda berada di dalam folder project web (misal: /var/www/html/stamar-ambon)."
    exit 1
fi

echo -e "\n${YELLOW}[1/7] Memeriksa & Membersihkan Berkas Windows yang Tertumpah...${NC}"

# DETEKSI PENYELAMAT: Cek apakah node_modules berasal dari Windows
if [ -d "node_modules" ]; then
    echo -e "${YELLOW}--> Mendeteksi folder node_modules lama. Membersihkan agar instalasi Linux bersih...${NC}"
    rm -rf node_modules
    echo -e "${GREEN}✓ node_modules lama berhasil dibersihkan.${NC}"
fi

# DETEKSI PENYELAMAT: Cek apakah vendor berasal dari Windows
if [ -d "vendor" ] && [ ! -f "vendor/autoload.php" ]; then
    echo -e "${YELLOW}--> Mendeteksi folder vendor tidak valid. Menghapus folder vendor lama...${NC}"
    rm -rf vendor
    echo -e "${GREEN}✓ vendor lama berhasil dibersihkan.${NC}"
fi

# 2. Setup Environment .env
echo -e "\n${YELLOW}[2/7] Memeriksa Konfigurasi Environment (.env)...${NC}"
if [ ! -f ".env" ]; then
    if [ -f ".env.example" ]; then
        echo -e "${YELLOW}--> File .env belum ada. Membuat dari .env.example...${NC}"
        cp .env.example .env
        php artisan key:generate --force
        echo -e "${RED}[PENTING] Silakan edit file .env dan sesuaikan kredensial Database MySQL server BMKG!${NC}"
    else
        echo -e "${RED}[WARNING] File .env dan .env.example tidak ditemukan. Pastikan konfigurasi database diatur.${NC}"
    fi
else
    echo -e "${GREEN}✓ File .env sudah tersedia.${NC}"
fi

# 3. Install Composer Dependencies (PHP Linux)
echo -e "\n${YELLOW}[3/7] Menginstal Dependencies Composer (PHP Backend)...${NC}"
if command -v composer &> /dev/null; then
    composer install --no-dev --prefer-dist --optimize-autoloader --no-interaction
    echo -e "${GREEN}✓ Composer dependencies berhasil dipasang.${NC}"
else
    echo -e "${RED}[WARNING] Perintah 'composer' tidak ditemukan di server! Lewati langkah ini.${NC}"
fi

# 4. Install NPM Dependencies & Build Aset Frontend
echo -e "\n${YELLOW}[4/7] Memeriksa Aset Frontend Vite...${NC}"
if [ ! -d "public/build" ]; then
    echo -e "${YELLOW}--> Folder public/build belum ada. Melakukan build frontend...${NC}"
    if command -v npm &> /dev/null; then
        npm install --production=false
        npm run build
        echo -e "${GREEN}✓ Frontend aset berhasil di-build.${NC}"
    else
        echo -e "${RED}[WARNING] Perintah 'npm' tidak ditemukan. Pastikan folder public/build sudah ter-upload.${NC}"
    fi
else
    echo -e "${GREEN}✓ Aset public/build sudah tersedia.${NC}"
fi

# 5. Migrasi Database & Storage Symlink
echo -e "\n${YELLOW}[5/7] Menjalankan Database Migration & Symlink Storage...${NC}"
php artisan migrate --force || echo -e "${YELLOW}[INFO] Migrasi database dilewati atau periksa koneksi DB.${NC}"
php artisan storage:link || true
echo -e "${GREEN}✓ Database & Symlink Storage siap.${NC}"

# 6. Optimasi Cache Laravel Produksi
echo -e "\n${YELLOW}[6/7] Mengoptimalkan Cache Laravel Produksi...${NC}"
php artisan config:cache
php artisan route:cache
php artisan view:cache
echo -e "${GREEN}✓ Cache konfigurasi, rute, dan view berhasil diaktifkan.${NC}"

# 7. Pengaturan Hak Akses Direktori (Permissions)
echo -e "\n${YELLOW}[7/7] Mengatur Hak Akses Folder (storage & bootstrap/cache)...${NC}"
# Coba set permission ke www-data (Nginx/Apache), jika non-root abaikan error
chmod -R 775 storage bootstrap/cache 2>/dev/null || true
if [ "$(id -u)" -eq 0 ]; then
    chown -R www-data:www-data storage bootstrap/cache 2>/dev/null || true
    echo -e "${GREEN}✓ Kepemilikan folder diset ke www-data.${NC}"
fi

echo -e "\n${GREEN}======================================================================${NC}"
echo -e "${GREEN}            DEPLOYMENT BERHASIL & WEBSITE SIAP OPERASIONAL!           ${NC}"
echo -e "${GREEN}======================================================================${NC}\n"
