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

## 🚀 3. Tindak Lanjut (Next Steps)

Saat Anda melanjutkan pekerjaan di hari berikutnya, silakan fokus pada hal-hal berikut:

1. **Integrasi Data API Dinamis:** Menghubungkan Widget Cuaca React dan _Slider_ Peringatan Dini di `welcome.tsx` dengan database atau sumber API BMKG.
2. **Dashboard Admin (CMS):** Membangun UI Admin untuk fitur unggah PDF Buletin Maritim, memastikan validasi tipe MIME PDF saat proses upload agar terhindar dari _Webshell_.
3. **Audit Logging:** Mengembangkan sistem _log_ untuk melacak aktivitas admin yang mengubah data (sesuai kaidah keamanan aplikasi).
4. **Persiapan Deployment Nginx:** Menerapkan _server block hardening_ di Nginx untuk mengunci folder unggahan (`storage/app/public`) agar script PHP tidak dapat dieksekusi dari dalam folder tersebut.

---

_Catatan: Anda dapat selalu merujuk ke file ini (`PROGRESS.md`) kapan pun Anda membuka kembali workspace Anda._
