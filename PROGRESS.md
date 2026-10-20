# Laporan Progres Pengembangan & Keamanan

**Proyek:** Website Resmi Stasiun Meteorologi Maritim Ambon (BMKG Ambon)
**Tanggal:** 6 Oktober 2026
**Tech Stack:** Laravel 11, React (Inertia.js), TailwindCSS (v4), Vite

---

## 🔒 1. Zero-Trust Security & Hardening (Selesai)

Menjawab insiden siber sebelumnya (Web Defacement, SEO Spam Cloaking, Webshell), beberapa lapis keamanan telah diterapkan pada level backend Laravel:

- **Security Headers Middleware:**
    - File: `app/Http/Middleware/SecurityHeaders.php`
    - Telah mengonfigurasi _Strict-Transport-Security_, `X-Frame-Options` (mencegah Clickjacking), `X-Content-Type-Options`, dan menonaktifkan deteksi server.
    - _Content-Security-Policy (CSP)_ dikonfigurasi untuk aktif di _production_, tetapi dimatikan di environment `local` agar tidak mengganggu _Vite Dev Server_.
- **Admin Custom Route:**
    - Konfigurasi Fortify (`config/fortify.php`) telah diubah sehingga URL admin login berubah dari `/login` menjadi `/panel-stamar/login`. Ini mencegah automated bot attacks.
- **Strict Rate Limiting:**
    - File: `app/Providers/AppServiceProvider.php`
    - Membatasi _Login_ dan fitur otentikasi _2FA_ maksimal **3 kali percobaan per menit** per IP & Email untuk memitigasi serangan _Brute Force_.
- **Database Seeder Aman:**
    - File: `database/seeders/DatabaseSeeder.php`
    - Menghapus pembuatan user default (`test@example.com`). Akun Administrator saat ini diatur khusus ke email resmi `stamar.ambon@bmkg.go.id` dengan password yang aman (Wajib diubah di production).

---

## 🎨 2. UI/UX Frontend React (Selesai Sebagian Besar)

Tampilan antarmuka website telah disesuaikan agar informatif, dinamis, dan bertema maritim:

- **Running Text Peringatan Dini:**
    - Telah ditambahkan pita peringatan dinamis berbasis animasi _Marquee_ (berjalan otomatis) di komponen paling atas halaman `resources/js/layouts/public-layout.tsx`.
    - Animasi _Marquee_ ditambahkan melalui CSS `@keyframes` di `resources/css/app.css`.
- **Hero & Widget Dinamis:**
    - `resources/js/pages/welcome.tsx` menampilkan UI modern dengan _backdrop-blur_ (Glassmorphism).
    - Terdapat widget interaktif yang siap menampilkan Tinggi Gelombang dan Kecepatan Angin.
    - _Slider_ Gambar Peringatan Dini sudah dikembangkan.
- **Kartu Akses Cepat (Quick Access):**
    - Prakiraan Area Pelayanan, Penyeberangan, Cuaca Provinsi, dan Wisata Bahari sudah siap.
- **Grid Infografis & Publikasi:**
    - Tampilan card untuk mengunduh/melihat buletin PDF atau gambar cuaca harian telah dibentuk.

---

## 🛡️ 3. Analisis Keamanan & Efisiensi Jalur Upload Forecaster

Menindaklanjuti masukan terkait alur kerja forecaster lama (yang terbiasa menggunakan FileZilla / MobaXterm) vs kebutuhan sistem modern yang aman:

| Aspek Keamanan | 🌐 Web Dropzone Cerdas (Panel Admin) | 📁 SFTP / FTP Langsung (FileZilla / MobaXterm) |
| :--- | :--- | :--- |
| **Penyusupan Webshell / Malware** | ✅ **Sangat Aman.** Backend Laravel memeriksa *MIME Type binary* (`finfo`), nama file dibersihkan (*sanitized*), dan ekstensi berbahaya (`.php`, `.phtml`, `.sh`, `.exe`) otomatis ditolak. | ❌ **Sangat Berisiko.** FileZilla mengunggah langsung ke *filesystem* server. Jika komputer staf terkena *malware* atau file `.php` tersusup, server bisa langsung dieksekusi peretas (penyebab insiden *defacement* web lama). |
| **Akses Port Server** | ✅ **Aman.** Hanya port web standar (HTTPS / 443) yang dibuka ke publik. | ❌ **Berisiko.** Port FTP (21) atau SSH (22) harus dibuka ke jaringan publik, rentan diserang *brute-force botnet* secara masif. |
| **Manajemen Kredensial** | ✅ **Ketat.** Dilindungi pembatasan *rate-limit* (maks 3x percobaan login/menit), CSRF protection, dan sesi terotentikasi Laravel Fortify. | ❌ **Rentan Bocor.** Password FTP/SSH sering tersimpan secara *plain-text* di aplikasi FileZilla lokal dan rawan dicuri *stealer trojan*. |
| **Pencatatan Jejak Audit** | ✅ **Tercatat Jelas.** Identitas user yang login, riwayat waktu, dan berkas yang diproses terekam di database. | ❌ **Sulit Dipantau.** Sulit membedakan aktivitas normal forecaster dengan lalu lintas mencurigakan. |

> **Rekomendasi Keputusan Arsitektur:**
> Membangun fitur **"Smart Bulk Dropzone"** di dalam panel admin web. Forecaster tetap mendapatkan kecepatan seperti FileZilla (sekali drag & drop puluhan file pelabuhan, provinsi, dan wisata bahari sekaligus tanpa perlu mengisi form/dropdown berulang), namun seluruh proses tetap melalui validasi keamanan backend Laravel yang ketat.

---

## 🚀 4. Fitur Baru: Smart Forecaster Bulk Dropzone (Selesai)

- **Smart Dropzone Panel Admin:**
    - Forecaster dapat melakukan drag & drop puluhan berkas campuran sekaligus (Pelabuhan, Provinsi, Wisata Bahari, Buletin, Peringatan Dini) tanpa perlu mengisi formulir/dropdown berulang.
    - Dilengkapi *Live Auto-Detection* yang langsung membaca dan menghitung jenis file berdasarkan pola kode BMKG (`AH...`, `P_AH...`, `slide...`).
    - Backend Laravel tervalidasi binary `finfo`, sanitasi ekstensi, dan direct storage routing.

---

## ⚠️ 5. PANDUAN PENTING DEPLOYMENT KE SERVER BMKG (Wajib Dibaca!)

Ketika proyek siap dipindahkan ke server operasional BMKG menggunakan **NetBird** dan **MobaXterm**, **JANGAN** langsung drag-and-drop seluruh folder dari Windows begitu saja! Ikuti aturan baku berikut:

### A. Persiapan Akses Server:
1. **Nyalakan NetBird VPN:** Pastikan status NetBird terhubung agar laptop masuk ke jaringan private/intranet BMKG.
2. **Koneksi MobaXterm:** Buka sesi SSH MobaXterm menuju IP Server BMKG.
3. **Backup Web Lama (Wajib):** 
   - Di terminal MobaXterm, kompres folder website lama ke format zip sebelum diubah/dihapus:
     ```bash
     zip -r backup_weblama_$(date +%Y%m%d).zip /var/www/html/weblama
     ```

### B. Larangan Keras Saat Upload File:
### B. Alat Otomatis Pencegah Kesalahan (Anti-Error Deployment Tools):
Telah dibuatkan 2 script pengaman agar Anda tidak perlu cemas lupa atau salah saat deploy:

1. **Di Laptop Anda (Windows): `buat-paket-deploy.bat`**
   - Cukup klik 2x file ini di Windows.
   - Script akan otomatis menjalankan `npm run build` dan mengompres seluruh project menjadi file **`stamar-deploy-siap.zip`**.
   - Folder berbahaya (`node_modules/`, `vendor/`, `.env` lokal, `.git`) **otomatis disaring dan tidak ikut**.
   - Yang Anda upload via MobaXterm cukup file zip ini saja!

2. **Di Server Linux: `deploy.sh`**
   - Setelah zip diekstrak di server (`unzip -o stamar-deploy-siap.zip`), cukup jalankan:
     ```bash
     bash deploy.sh
     ```
   - **Fitur Penyelamat Otomatis:**
     - Jika ada folder `node_modules` atau `vendor` bawaan Windows yang tidak sengaja tertumpah, script akan langsung mendeteksi dan menghapusnya otomatis.
     - Otomatis mengecek dan mengonfigurasi `.env`.
     - Otomatis menjalankan `composer install --no-dev`.
     - Otomatis menjalankan `php artisan migrate --force`.
     - Otomatis membuat symlink `storage:link`.
     - Otomatis mengaktifkan cache produksi (`config:cache`, `route:cache`, `view:cache`).
     - Otomatis mengatur hak akses folder (`chmod 775`).

### C. Panduan Simulasi Praktik Deployment Bertahap (4 Fase):

```
[Laptop Windows]                            [Server BMKG Linux]
1. Dobel klik buat-paket-deploy.bat  -->    3. NetBird & MobaXterm Konek
2. Menghasilkan stamar-deploy-siap.zip -->    4. Backup web lama (zip)
                                            5. Drop & unzip stamar-deploy-siap.zip
                                            6. Jalankan: bash deploy.sh
                                            --> WEBSITE LIVE!
```

- **Fase 1 (Di Laptop):**
  1. Buka folder proyek di Windows Explorer.
  2. Klik 2x `buat-paket-deploy.bat`. Tunggu sampai muncul notifikasi sukses.
  3. File `stamar-deploy-siap.zip` siap dikirim.
- **Fase 2 (Koneksi):**
  1. Nyalakan NetBird VPN sampai status hijau (*Connected*).
  2. Buka MobaXterm, buat sesi SSH ke IP Server BMKG.
- **Fase 3 (Backup Aman Web Lama):**
  1. Di terminal MobaXterm: `cd /var/www/html`
  2. Kompres arsip: `zip -r backup_weblama_$(date +%Y%m%d).zip *`
- **Fase 4 (Eksekusi & Live):**
  1. Drag & drop `stamar-deploy-siap.zip` ke panel kiri MobaXterm (`/var/www/html`).
  2. Ekstrak di terminal: `unzip -o stamar-deploy-siap.zip`
  3. Eksekusi script otomatis: `bash deploy.sh`
  4. Website baru selesai dideploy dan live!

---

---

## 🌟 6. Integrasi 5 Fitur Unggulan Website Stamar Ambon (Selesai)

Berdasarkan perbandingan dengan website lama (`https://stamar-ambon.bmkg.go.id/`), seluruh 5 fitur telah berhasil dibangun dan diintegrasikan dengan estetika maritim modern, tata letak yang efisien, dan sistem unggah otomatis:

1. **Infografis Cuaca Visual & Peta Rilis Harian:**
   - **Upload & Bulk Dropzone:** Terintegrasi penuh ke dalam *Smart Forecaster Dropzone* pada [DocumentController.php](file:///e:/herd/test/app/Http/Controllers/Admin/DocumentController.php) dan [index.tsx](file:///e:/herd/test/resources/js/pages/admin/documents/index.tsx). Forecaster cukup drag & drop file dengan nama mengandung `infografis`, `peta`, atau `grafis` untuk otomatis terdeteksi dan diklasifikasikan ke folder `infografis`.
   - **Tampilan Beranda:** Menampilkan section khusus *Infografis & Peta Rilis Terkini* di [welcome.tsx](file:///e:/herd/test/resources/js/pages/welcome.tsx) dilengkapi modal perbesar gambar (*lightbox preview*) dan tombol unduh langsung beresolusi tinggi.
   - **Halaman Khusus:** Disediakan halaman publik mandiri [infografis.tsx](file:///e:/herd/test/resources/js/pages/infografis.tsx) dengan fitur pencarian dan filter arsip.

2. **Galeri Foto Kegiatan & Dokumentasi Lapangan:**
   - Menampilkan dokumentasi nyata aktivitas Stamar Ambon di [welcome.tsx](file:///e:/herd/test/resources/js/pages/welcome.tsx), seperti:
     - Sekolah Lapang Cuaca Nelayan (SLCN) bagi nelayan tradisional.
     - Pemeliharaan & kalibrasi sensor AWS / alat meteorologi laut Latuhalat.
     - Koordinasi keselamatan pelayaran bersama KSOP dan Pelindo.
     - Kunjungan edukasi mahasiswa & siswa.
   - Dilengkapi filter kategori dinamis (*SLCN*, *Operasional*, *Kemitraan*) dan modal *lightbox*.

3. **Kolom Berita & Siaran Pers Resmi Stamar Ambon:**
   - Menyajikan kartu berita dan siaran pers resmi BMKG Stamar Ambon di [welcome.tsx](file:///e:/herd/test/resources/js/pages/welcome.tsx).
   - Dilengkapi modal interaktif (*Press Release Reader*) agar pengunjung dapat membaca siaran pers secara lengkap tanpa tautan rusak.

4. **Link Ekosistem Resmi BMKG & Unduh Aplikasi Info BMKG:**
   - Footer pada [public-layout.tsx](file:///e:/herd/test/resources/js/layouts/public-layout.tsx) telah dirapikan menjadi 4 kolom proporsional:
     1. Profil & Identitas Stamar Ambon + Status Operasional 24/7.
     2. Layanan & Prakiraan (Provinsi, Pelabuhan, Penyeberangan, Wisata Bahari, Infografis, Cuaca 10 Kota, Buletin, IKM).
     3. Ekosistem Resmi BMKG (BMKG Pusat, InaTEWS, CEWS, Dit. Meteorologi Maritim, BBMKG Wilayah IV, STMKG, Satelit Himawari).
     4. Aplikasi Mobile Info BMKG (Tombol unduh resmi Google Play Store & Apple App Store) + Kontak WhatsApp dan Sosial Media.

5. **Prakiraan Cuaca Darat 10 Kota / Kabupaten Maluku:**
   - Disediakan halaman interaktif [cuaca-maluku.tsx](file:///e:/herd/test/resources/js/pages/cuaca-maluku.tsx) untuk 10 ibukota kab/kota di Maluku (Kota Ambon, Masohi, Namlea, Kota Tual, Dobo, Saumlaki, Bula, Piru, Tiakur/Kisar, dan Namrole/Leksula).
   - Menampilkan suhu real-time (°C), kondisi cuaca, kelembapan, kecepatan/arah angin, prospek cuaca 3 harian, dan tautan langsung ke server BMKG Pusat.
   - Terhubung langsung pada menu navigasi *Prakiraan* di [public-layout.tsx](file:///e:/herd/test/resources/js/layouts/public-layout.tsx) dan kartu akses cepat di [welcome.tsx](file:///e:/herd/test/resources/js/pages/welcome.tsx).

---

## 🚀 7. Pemisahan Fitur Infografis vs Prakiraan & Penyempurnaan Tab Tanggal (20 Oktober 2026)

Menjawab kebutuhan penyajian data operasional BMKG dan pengalaman publik yang bersih serta profesional:

1. **Pemisahan Total Format Berkas (PDF vs PNG):**
   - **Fitur Prakiraan Cuaca:** Halaman `/pelabuhan` dan `/provinsi` khusus menyajikan berkas resmi **PDF** dengan aksi **"Lihat Prakiraan"**.
   - **Fitur Infografis Cuaca:** Disediakan halaman khusus [infografis-pelabuhan.tsx](file:///e:/herd/test/resources/js/pages/infografis-pelabuhan.tsx) dan [infografis-provinsi.tsx](file:///e:/herd/test/resources/js/pages/infografis-provinsi.tsx) khusus berkas visual **PNG** dengan aksi **"Lihat Infografis"**.
   - **Viewer Modal Interaktif:** Dilengkapi popup modal gambar dengan fitur Zoom In, Zoom Out, Reset, dan Layar Penuh (Fullscreen) untuk kenyamanan pengunjung membaca peta/grafis.

2. **Pembersihan Tampilan Publik:**
   - Menghapus seluruh keterangan teknis yang berbau format file seperti `(format png/format berkas pdf)`.
   - Menyembunyikan kode teknis penamaan file seperti `AH` atau `P_AH` dari publik.
   - Menghilangkan badge jumlah wilayah agar tampilan tabel lebih rapi, minimalis, dan elegan.

3. **Penyempurnaan Pembeda Tanggal (Sliding Window):**
   - Mengatasi kendala berkas tidak muncul pada tab tanggal:
     - 112 berkas Batch 2 (periode 20–23 Oktober) telah dinormalisasi di database dengan `forecast_date = 2026-10-20` dan `period_type = weekly`.
     - Logika pencocokan di [pelabuhan.tsx](file:///e:/herd/test/resources/js/pages/pelabuhan.tsx), [provinsi.tsx](file:///e:/herd/test/resources/js/pages/provinsi.tsx), [infografis-pelabuhan.tsx](file:///e:/herd/test/resources/js/pages/infografis-pelabuhan.tsx), dan [infografis-provinsi.tsx](file:///e:/herd/test/resources/js/pages/infografis-provinsi.tsx) disempurnakan sehingga Tab 1 dan Tab 2 membaca file secara terisolasi dan presisi.
   - **Mekanisme Rolling Otomatis:** Forecaster tidak perlu mengunggah 2 kali setiap hari. Cukup 1 kali upload untuk rilis mendatang (Tab 2), maka berkas hari sebelumnya otomatis bergeser menempati Tab 1.

4. **Penyempurnaan Panel Upload Admin:**
   - Kolom **"Target Tab & Tanggal Prakiraan"** di [admin/documents/index.tsx](file:///e:/herd/test/resources/js/pages/admin/documents/index.tsx) kini terbuka secara transparan.
   - Disediakan tombol pintas 1-klik:
     - 📅 **Tab 1: Harian (24 Jam)** -> Otomatis mengisi tanggal hari ini (`daily`).
     - 🌊 **Tab 2: Mingguan (3 Hari)** -> Otomatis mengisi tanggal besok (`weekly`).
   - Sistem auto-classifier di backend [DocumentController.php](file:///e:/herd/test/app/Http/Controllers/Admin/DocumentController.php) otomatis memilah berkas PNG ke Infografis dan berkas PDF ke Prakiraan.

5. **Verifikasi Build:**
   - Perintah `npm run build` telah dijalankan dan lulus 100% tanpa error TypeScript maupun styling.

---

## 🛠️ 8. Refaktor & Penyederhanaan Panel Admin & Manajemen File (20 Oktober 2026)

Menjawab masukan terkait efisiensi tampilan admin dan penanganan elemen/halaman ganda (*double*):

1. **Penyelesaian Double Layout & Double Category di Halaman Dokumen:**
   - Menghapus wrapper bersarang `<AppLayout>` di [admin/documents/index.tsx](file:///e:/herd/test/resources/js/pages/admin/documents/index.tsx) karena sudah dibungkus otomatis oleh [app.tsx](file:///e:/herd/test/resources/js/app.tsx), mengeliminasi header/breadcrumb ganda.
   - Menghapus 6 kartu folder metrik raksasa yang menduplikasi baris filter tab persis di bawahnya.
   - Menyatukan filter kategori menjadi satu bar tab interaktif yang elegan, dilengkapi ikon dan badge counter jumlah berkas per kategori.
   - Menyederhanakan form upload dengan menyembunyikan kotak panjang pola klasifikasi ke dalam tombol toggle (*"Lihat Pola Format Nama"*).

2. **Redesain Halaman Dashboard (`/dashboard`):**
   - Mengubah [dashboard.tsx](file:///e:/herd/test/resources/js/pages/dashboard.tsx) dari yang sebelumnya menjiplak halaman manajemen berkas menjadi **Panel Kontrol Operasional / Executive Dashboard** yang sesungguhnya.
   - Menyajikan KPI statistik berkas, status distribusi per saluran publikasi, dan pratinjau ringkas 6 berkas terbaru.

3. **Perampingan Navigasi Sidebar:**
   - Merampingkan [app-sidebar.tsx](file:///e:/herd/test/resources/js/components/app-sidebar.tsx) dari 4 menu upload yang berulang menjadi 2 menu utama: **Dashboard Panel** dan **Manajemen File & Dokumen**.

4. **Koreksi Type TypeScript:**
   - Memperbaiki tipe gambar lightbox pada [galeri.tsx](file:///e:/herd/test/resources/js/pages/galeri.tsx) sehingga verifikasi `npm run types:check` lulus 100% tanpa error.

---

_Catatan: Anda dapat selalu merujuk ke file ini (`PROGRESS.md`) kapan pun Anda membuka kembali workspace Anda._

