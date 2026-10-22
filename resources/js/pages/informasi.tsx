import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/layouts/public-layout';
import { useState } from 'react';
import {
    FileText,
    Download,
    ExternalLink,
    Phone,
    Mail,
    MapPin,
    Clock,
    CheckCircle2,
    Scale,
    Receipt,
    Video,
    Layers,
    ShieldCheck,
    Users,
    GraduationCap,
    HeartHandshake,
    Maximize2,
    X,
    FileCheck,
    Sparkles,
    ChevronRight,
    Star,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Informasi() {
    const [selectedImage, setSelectedImage] = useState<{
        title: string;
        src: string;
    } | null>(null);

    const [activeTab, setActiveTab] = useState<'alur' | 'tarif' | 'regulasi' | 'kontak'>('alur');

    const regulations = [
        {
            title: 'Persyaratan & Tata Cara Pengenaan Tarif Nol Rupiah (Rp 0,00)',
            desc: 'Pedoman permohonan data meteorologi maritim bebas biaya untuk kegiatan pendidikan, penelitian, dan penanggulangan bencana.',
            url: 'https://stamar-ambon.bmkg.go.id/content/permintaandata/Nol%20Rupiah/PERSYARATAN%20DAN%20TATA%20CARA%20PENGENAAN%20TARIF%20RPO,OO%20(NOL%20RUPIAH).PDF',
            badge: 'Bebas Biaya / Mahasiswa',
            color: 'emerald',
            docSize: 'PDF • Resmi BMKG',
        },
        {
            title: 'Peraturan Kepala BMKG No. 01 Tahun 2019',
            desc: 'Tata cara pelaksanaan jenis dan tarif atas jenis penerimaan negara bukan pajak yang berlaku pada lingkungan BMKG.',
            url: 'https://stamar-ambon.bmkg.go.id/content/permintaandata/Peraturan/Perka%20No.%2001%20Tahun%202019.pdf',
            badge: 'Perka BMKG',
            color: 'blue',
            docSize: 'PDF • Regulasi Pelaksanaan',
        },
        {
            title: 'Peraturan Pemerintah (PP) No. 47 Tahun 2018',
            desc: 'Regulasi pemerintah mengenai jenis dan tarif atas jenis Penerimaan Negara Bukan Pajak (PNBP) yang berlaku pada BMKG.',
            url: 'https://stamar-ambon.bmkg.go.id/content/permintaandata/Peraturan/PP%20No.%2047%20Tahun%202018.pdf',
            badge: 'Peraturan Pemerintah',
            color: 'amber',
            docSize: 'PDF • Dasar Hukum PNBP',
        },
    ];

    const freeTarifCategories = [
        {
            title: 'Pendidikan & Penelitian',
            desc: 'Mahasiswa / akademisi penyusun tugas akhir, skripsi, tesis, disertasi, atau riset non-komersial.',
            icon: GraduationCap,
            requirements: [
                'Surat pengantar resmi perguruan tinggi / Dekan',
                'Proposal riset disetujui dosen pembimbing',
                'Surat komitmen tidak mengkomersialkan data',
            ],
        },
        {
            title: 'Penanggulangan Bencana & SAR',
            desc: 'Instansi pemerintah, BPBD, Basarnas, atau relawan dalam operasi tanggap darurat kecelakaan laut.',
            icon: HeartHandshake,
            requirements: [
                'Surat kedinasan resmi instansi terkait',
                'Keterangan lokasi & rentang waktu operasi darurat',
            ],
        },
        {
            title: 'Pertahanan & Keamanan',
            desc: 'TNI, Polri, dan instansi navigasi laut untuk keperluan patroli kedaulatan maritim kepulauan.',
            icon: ShieldCheck,
            requirements: [
                'Surat dinas dari komandan satuan / pimpinan',
                'Koordinasi teknis operasional navigasi',
            ],
        },
        {
            title: 'Kegiatan Sosial & Keagamaan',
            desc: 'Penyelenggaraan acara sosial atau keagamaan skala besar yang membutuhkan pengawalan cuaca laut.',
            icon: Users,
            requirements: [
                'Surat permohonan dari panitia penyelenggara',
                'Jadwal & rute kegiatan pelayaran masyarakat',
            ],
        },
    ];

    const serviceSteps = [
        {
            step: '01',
            title: 'Pengajuan Permohonan',
            desc: 'Pemohon menyampaikan permohonan ke ruang layanan atau koordinasi resmi dengan identitas diri dan surat pengantar.',
        },
        {
            step: '02',
            title: 'Verifikasi & Kategori',
            desc: 'Petugas memverifikasi ketersediaan data dan kelengkapan dokumen (kategori PNBP atau Tarif Nol Rupiah).',
        },
        {
            step: '03',
            title: 'Billing SIMPONI',
            desc: 'Untuk permohonan berbayar, kode billing SIMPONI (MPN G2) diterbitkan. Pemohon menyetor via bank/ATM/mobile banking.',
        },
        {
            step: '04',
            title: 'Penyerahan Data Resmi',
            desc: 'Data maritim disiapkan, divalidasi keabsahannya dengan tanda tangan resmi BMKG, lalu diserahkan ke pemohon.',
        },
    ];

    return (
        <PublicLayout>
            <Head title="Pelayanan Informasi dan Jasa - Stasiun Meteorologi Kelas II Maritim Yos Soedarso Ambon" />

            {/* Compact Header / Hero */}
            <div className="relative border-b border-border bg-slate-950 py-10 text-white sm:py-12">
                <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col items-center justify-between gap-6 md:flex-row md:items-end">
                        <div className="space-y-2 text-center md:text-left">
                            <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-3.5 py-1 text-xs font-semibold text-blue-400">
                                <Scale className="h-3.5 w-3.5" />
                                Standar Pelayanan Publik BMKG
                            </div>
                            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
                                Pelayanan Informasi dan Jasa
                            </h1>
                            <p className="text-sm font-medium text-blue-200/90 sm:text-base">
                                Stasiun Meteorologi Kelas II Maritim Yos Soedarso Ambon
                            </p>
                            <p className="max-w-2xl text-xs leading-relaxed text-slate-300 sm:text-sm">
                                Pusat penyediaan data cuaca maritim, informasi gelombang, iklim laut, dan konsultasi meteorologi yang transparan, terstandardisasi, dan akuntabel.
                            </p>
                        </div>

                        {/* Quick Action Buttons */}
                        <div className="flex flex-wrap items-center justify-center gap-3">
                            <Link
                                href="/survey-ikm"
                                className="inline-flex h-10 items-center gap-2 rounded-lg border border-blue-500/30 bg-blue-500/20 px-4 text-xs font-bold text-blue-300 transition-all hover:bg-blue-500/30"
                            >
                                <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                                Survei IKM (e-SKM)
                            </Link>
                            <a
                                href="https://wa.me/6281296265822?text=Halo%20Admin%20Layanan%20Informasi,%20saya%20ingin%20mengirimkan%20bukti%20bayar%20billing%20SIMPONI."
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex h-10 items-center gap-2 rounded-lg border border-amber-500/30 bg-amber-500/20 px-4 text-xs font-bold text-amber-300 transition-all hover:bg-amber-500/30"
                            >
                                <Receipt className="h-4 w-4 text-amber-400" />
                                Konfirmasi Bukti Bayar
                            </a>
                            <a
                                href="https://wa.me/6281296265822?text=Halo%20Admin%20Layanan%20Informasi%20Stamar%20Ambon,%20saya%20ingin%20berkonsultasi%20mengenai%20permohonan%20data%20cuaca%20maritim."
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex h-10 items-center gap-2 rounded-lg bg-emerald-600 px-4 text-xs font-bold text-white shadow-sm transition-all hover:bg-emerald-500"
                            >
                                <Phone className="h-4 w-4" />
                                Konsultasi WhatsApp
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Interactive Hub Container */}
            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                {/* Segmented Control / Tab Switcher Bar */}
                <div className="mb-8 flex flex-wrap items-center justify-center gap-2 rounded-lg border border-border bg-card p-1.5 shadow-sm sm:justify-start">
                    <button
                        onClick={() => setActiveTab('alur')}
                        className={`flex items-center gap-2 rounded-lg px-4 py-2.5 text-xs font-bold transition-all sm:text-sm ${
                            activeTab === 'alur'
                                ? 'bg-primary text-primary-foreground shadow-sm'
                                : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                        }`}
                    >
                        <Layers className="h-4 w-4" />
                        <span>Alur & Video Panduan</span>
                    </button>

                    <button
                        onClick={() => setActiveTab('tarif')}
                        className={`flex items-center gap-2 rounded-lg px-4 py-2.5 text-xs font-bold transition-all sm:text-sm ${
                            activeTab === 'tarif'
                                ? 'bg-primary text-primary-foreground shadow-sm'
                                : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                        }`}
                    >
                        <Receipt className="h-4 w-4" />
                        <span>Tarif PNBP & Nol Rupiah</span>
                    </button>

                    <button
                        onClick={() => setActiveTab('regulasi')}
                        className={`flex items-center gap-2 rounded-lg px-4 py-2.5 text-xs font-bold transition-all sm:text-sm ${
                            activeTab === 'regulasi'
                                ? 'bg-primary text-primary-foreground shadow-sm'
                                : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                        }`}
                    >
                        <Scale className="h-4 w-4" />
                        <span>Regulasi Resmi</span>
                    </button>

                    <button
                        onClick={() => setActiveTab('kontak')}
                        className={`flex items-center gap-2 rounded-lg px-4 py-2.5 text-xs font-bold transition-all sm:text-sm ${
                            activeTab === 'kontak'
                                ? 'bg-primary text-primary-foreground shadow-sm'
                                : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                        }`}
                    >
                        <MapPin className="h-4 w-4" />
                        <span>Kontak & Ruang Layanan</span>
                    </button>
                </div>

                {/* TAB 1: ALUR & VIDEO PANDUAN */}
                {activeTab === 'alur' && (
                    <div className="space-y-6">
                        {/* 4 Tahapan Ringkas */}
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                            {serviceSteps.map((step, idx) => (
                                <div
                                    key={idx}
                                    className="flex flex-col justify-between rounded-lg border border-border bg-card p-5 shadow-sm transition-all hover:border-primary/40 hover:shadow-sm"
                                >
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-xs font-bold text-primary">
                                                {step.step}
                                            </span>
                                            <span className="text-[10px] font-bold tracking-wider text-muted-foreground uppercase">
                                                Langkah {idx + 1}
                                            </span>
                                        </div>
                                        <h3 className="text-sm font-bold text-foreground">
                                            {step.title}
                                        </h3>
                                        <p className="text-xs leading-relaxed text-muted-foreground">
                                            {step.desc}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Video Panduan + Bagan Alur Sampingan */}
                        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
                            {/* Kolom Kiri: Video Panduan */}
                            <div className="lg:col-span-6">
                                <div className="flex h-full flex-col justify-between overflow-hidden rounded-lg border border-border bg-card p-5 shadow-sm">
                                    <div className="mb-3 flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-500/10 text-red-500">
                                                <Video className="h-4 w-4" />
                                            </div>
                                            <div>
                                                <h3 className="text-sm font-bold text-foreground">
                                                    Video Panduan Pelayanan
                                                </h3>
                                                <p className="text-[11px] text-muted-foreground">
                                                    Penjelasan langkah permohonan data dan jasa BMKG
                                                </p>
                                            </div>
                                        </div>
                                        <span className="rounded-full bg-red-500/10 px-2 py-0.5 text-[10px] font-bold text-red-500 uppercase">
                                            Video Resmi
                                        </span>
                                    </div>

                                    <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-border/80 bg-black shadow-inner">
                                        <iframe
                                            className="h-full w-full border-0"
                                            src="https://drive.google.com/file/d/17hW1OP4_uuOWc6u4bk2t6-cDqiTepncG/preview"
                                            title="Video Panduan Pelayanan Informasi BMKG"
                                            allow="autoplay"
                                            allowFullScreen
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Kolom Kanan: Bagan Alur Permintaan Data */}
                            <div className="lg:col-span-6">
                                <div className="flex h-full flex-col justify-between overflow-hidden rounded-lg border border-border bg-card p-5 shadow-sm">
                                    <div className="mb-3 flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/10 text-blue-500">
                                                <Layers className="h-4 w-4" />
                                            </div>
                                            <div>
                                                <h3 className="text-sm font-bold text-foreground">
                                                    Bagan Alur Permintaan Data
                                                </h3>
                                                <p className="text-[11px] text-muted-foreground">
                                                    Infografis resmi alur pelayanan informasi maritim
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex gap-1.5">
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                onClick={() =>
                                                    setSelectedImage({
                                                        title: 'Bagan Alur Permintaan Data BMKG',
                                                        src: 'https://stamar-ambon.bmkg.go.id/content/Alur-Permintaan-Data.png',
                                                    })
                                                }
                                                className="h-7 gap-1 rounded-lg px-2 text-[11px] font-semibold"
                                            >
                                                <Maximize2 className="h-3 w-3" />
                                                Perbesar
                                            </Button>
                                            <a
                                                href="https://stamar-ambon.bmkg.go.id/content/Alur-Permintaan-Data.png"
                                                download="Alur-Permintaan-Data-BMKG.png"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex h-7 items-center gap-1 rounded-lg bg-primary px-2 text-[11px] font-semibold text-primary-foreground hover:opacity-90"
                                            >
                                                <Download className="h-3 w-3" />
                                                Unduh
                                            </a>
                                        </div>
                                    </div>

                                    <div
                                        className="group relative flex aspect-video w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg border border-border/80 bg-slate-900 shadow-inner"
                                        onClick={() =>
                                            setSelectedImage({
                                                title: 'Bagan Alur Permintaan Data BMKG',
                                                src: 'https://stamar-ambon.bmkg.go.id/content/Alur-Permintaan-Data.png',
                                            })
                                        }
                                    >
                                        <img
                                            src="https://stamar-ambon.bmkg.go.id/content/Alur-Permintaan-Data.png"
                                            alt="Bagan Alur Permintaan Data"
                                            className="h-full w-full object-contain p-2 transition-transform duration-300 "
                                        />
                                        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
                                            <span className="flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 text-xs font-bold text-slate-900 shadow">
                                                <Maximize2 className="h-3.5 w-3.5" />
                                                Klik untuk Memperbesar
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* TAB 2: TARIF PNBP & NOL RUPIAH */}
                {activeTab === 'tarif' && (
                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
                        {/* Kolom Kiri: Bagan Tabel Tarif PNBP */}
                        <div className="lg:col-span-6">
                            <div className="flex h-full flex-col justify-between overflow-hidden rounded-lg border border-border bg-card p-5 shadow-sm">
                                <div>
                                    <div className="mb-3 flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/10 text-amber-500">
                                                <Receipt className="h-4 w-4" />
                                            </div>
                                            <div>
                                                <h3 className="text-sm font-bold text-foreground">
                                                    Daftar Tarif PNBP Resmi
                                                </h3>
                                                <p className="text-[11px] text-muted-foreground">
                                                    Sesuai PP No. 47 Tahun 2018
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex gap-1.5">
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                onClick={() =>
                                                    setSelectedImage({
                                                        title: 'Daftar Tarif PNBP Pelayanan Data BMKG',
                                                        src: 'https://stamar-ambon.bmkg.go.id/content/TARIF.png',
                                                    })
                                                }
                                                className="h-7 gap-1 rounded-lg px-2 text-[11px] font-semibold"
                                            >
                                                <Maximize2 className="h-3 w-3" />
                                                Perbesar
                                            </Button>
                                            <a
                                                href="https://stamar-ambon.bmkg.go.id/content/TARIF.png"
                                                download="Tarif-PNBP-BMKG.png"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex h-7 items-center gap-1 rounded-lg bg-primary px-2 text-[11px] font-semibold text-primary-foreground hover:opacity-90"
                                            >
                                                <Download className="h-3 w-3" />
                                                Unduh
                                            </a>
                                        </div>
                                    </div>

                                    <div
                                        className="group relative flex aspect-[4/3] w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg border border-border/80 bg-slate-900 shadow-inner"
                                        onClick={() =>
                                            setSelectedImage({
                                                title: 'Daftar Tarif PNBP Pelayanan Data BMKG',
                                                src: 'https://stamar-ambon.bmkg.go.id/content/TARIF.png',
                                            })
                                        }
                                    >
                                        <img
                                            src="https://stamar-ambon.bmkg.go.id/content/TARIF.png"
                                            alt="Tabel Tarif PNBP BMKG"
                                            className="h-full w-full object-contain p-2 transition-transform duration-300 "
                                        />
                                        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
                                            <span className="flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 text-xs font-bold text-slate-900 shadow">
                                                <Maximize2 className="h-3.5 w-3.5" />
                                                Klik untuk Memperbesar Tabel
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-4 rounded-lg border border-border bg-muted/40 p-3 text-[11px] text-muted-foreground">
                                    💡 <strong>Catatan:</strong> Pembayaran tarif PNBP menggunakan kode billing <strong>SIMPONI (MPN G2)</strong> yang langsung disetor ke kas negara tanpa pungutan perantara.
                                </div>
                            </div>
                        </div>

                        {/* Kolom Kanan: Kategori Tarif Nol Rupiah (Rp 0,00) */}
                        <div className="lg:col-span-6">
                            <div className="flex h-full flex-col justify-between rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-5 shadow-sm">
                                <div>
                                    <div className="mb-4">
                                        <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-0.5 text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                                            <CheckCircle2 className="h-3.5 w-3.5" />
                                            Fasilitas Bebas Biaya (Rp 0,00)
                                        </div>
                                        <h3 className="mt-2 text-base font-bold text-foreground sm:text-lg">
                                            Kategori Tarif Nol Rupiah
                                        </h3>
                                        <p className="text-xs text-muted-foreground">
                                            Pemohon yang memenuhi kriteria berikut berhak mendapatkan data tanpa dikenakan biaya PNBP:
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                                        {freeTarifCategories.map((cat, idx) => {
                                            const Icon = cat.icon;
                                            return (
                                                <div
                                                    key={idx}
                                                    className="flex flex-col justify-between rounded-lg border border-border bg-card/90 p-3.5 shadow-xs transition-all hover:border-emerald-500/40"
                                                >
                                                    <div className="space-y-1.5">
                                                        <div className="flex items-center gap-2">
                                                            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                                                                <Icon className="h-3.5 w-3.5" />
                                                            </div>
                                                            <h4 className="text-xs font-bold text-foreground">
                                                                {cat.title}
                                                            </h4>
                                                        </div>
                                                        <p className="text-[11px] leading-relaxed text-muted-foreground">
                                                            {cat.desc}
                                                        </p>
                                                    </div>

                                                    <div className="mt-2.5 border-t border-border pt-2">
                                                        <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                                                            Dokumen Wajib:
                                                        </span>
                                                        <ul className="mt-1 space-y-0.5 text-[10px] text-muted-foreground">
                                                            {cat.requirements.map((req, rIdx) => (
                                                                <li key={rIdx} className="flex items-start gap-1">
                                                                    <span className="text-emerald-500 font-bold">•</span>
                                                                    <span>{req}</span>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>

                                <div className="mt-4 flex items-center justify-between rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-4 py-2.5">
                                    <span className="text-xs font-medium text-emerald-800 dark:text-emerald-300">
                                        Pelajari tata cara & unduh juknis lengkap tarif Rp 0,00
                                    </span>
                                    <button
                                        onClick={() => setActiveTab('regulasi')}
                                        className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 underline hover:text-emerald-800 dark:text-emerald-300 dark:hover:text-emerald-200"
                                    >
                                        Buka Regulasi
                                        <ChevronRight className="h-3.5 w-3.5" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* TAB 3: REGULASI RESMI */}
                {activeTab === 'regulasi' && (
                    <div className="space-y-6">
                        <div className="rounded-lg border border-border bg-card p-5 shadow-sm">
                            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                                <div>
                                    <h3 className="text-base font-bold text-foreground">
                                        Landasan Hukum & Regulasi Pelayanan
                                    </h3>
                                    <p className="text-xs text-muted-foreground">
                                        Seluruh berkas peraturan perundang-undangan resmi yang menjadi pedoman tarif dan pelayanan BMKG dapat diunduh langsung dalam format PDF.
                                    </p>
                                </div>
                                <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/10 px-3 py-1 text-xs font-bold text-blue-600 dark:text-blue-400">
                                    <FileCheck className="h-3.5 w-3.5" />
                                    Dokumen Terverifikasi BMKG
                                </span>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
                            {regulations.map((reg, idx) => (
                                <div
                                    key={idx}
                                    className="flex flex-col justify-between rounded-lg border border-border bg-card p-5 shadow-sm transition-all hover:border-primary/50 hover:shadow-sm"
                                >
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between">
                                            <span className="inline-block rounded-full bg-primary/10 px-2.5 py-0.5 text-[10px] font-bold text-primary">
                                                {reg.badge}
                                            </span>
                                            <span className="text-[10px] text-muted-foreground">
                                                {reg.docSize}
                                            </span>
                                        </div>
                                        <h4 className="text-sm font-bold text-foreground">
                                            {reg.title}
                                        </h4>
                                        <p className="text-xs leading-relaxed text-muted-foreground">
                                            {reg.desc}
                                        </p>
                                    </div>

                                    <div className="mt-5 pt-3 border-t border-border">
                                        <a
                                            href={reg.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-3 py-2 text-xs font-bold text-primary-foreground transition-opacity hover:opacity-90"
                                        >
                                            <Download className="h-3.5 w-3.5" />
                                            <span>Unduh Dokumen PDF</span>
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* TAB 4: KONTAK & RUANG LAYANAN */}
                {activeTab === 'kontak' && (
                    <div className="space-y-6">
                        {/* 3 Kartu Kompak */}
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                            {/* Card 1: Konfirmasi Bukti Bayar */}
                            <div className="flex flex-col justify-between rounded-lg border border-amber-500/20 bg-card p-5 shadow-sm">
                                <div className="space-y-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400">
                                        <Receipt className="h-5 w-5" />
                                    </div>
                                    <h3 className="text-sm font-bold text-foreground">
                                        Konfirmasi Bukti Bayar
                                    </h3>
                                    <p className="text-xs leading-relaxed text-muted-foreground">
                                        Kirimkan foto atau tangkapan layar bukti setor kode billing <strong>SIMPONI (MPN G2)</strong> untuk mempercepat penyerahan berkas data Anda.
                                    </p>
                                </div>
                                <div className="mt-5 pt-3 border-t border-border">
                                    <a
                                        href="https://wa.me/6281296265822?text=Halo%20Admin%20Layanan%20Informasi,%20saya%20ingin%20mengirimkan%20bukti%20bayar%20billing%20SIMPONI%20permohonan%20data."
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-amber-500 px-4 py-2 text-xs font-bold text-white transition-opacity hover:opacity-90"
                                    >
                                        <Receipt className="h-3.5 w-3.5" />
                                        <span>Kirim Bukti Bayar WhatsApp</span>
                                    </a>
                                </div>
                            </div>

                            {/* Card 2: Jam Operasional */}
                            <div className="flex flex-col justify-between rounded-lg border border-border bg-card p-5 shadow-sm">
                                <div className="space-y-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10 text-blue-500">
                                        <Clock className="h-5 w-5" />
                                    </div>
                                    <h3 className="text-sm font-bold text-foreground">
                                        Waktu Operasional Layanan
                                    </h3>
                                    <div className="space-y-1.5 text-xs text-muted-foreground">
                                        <p><strong>Senin - Kamis:</strong> 08.00 - 16.00 WIT</p>
                                        <p><strong>Jumat:</strong> 08.30 - 16.30 WIT</p>
                                        <p className="text-[11px] font-semibold text-amber-500">
                                            *Peringatan Dini Cuaca Laut aktif 24 Jam
                                        </p>
                                    </div>
                                </div>
                                <div className="mt-5 pt-3 border-t border-border text-[11px] text-muted-foreground">
                                    Layanan tatap muka di ruang operasional stasiun.
                                </div>
                            </div>

                            {/* Card 3: Narahubung & Alamat */}
                            <div className="flex flex-col justify-between rounded-lg border border-border bg-card p-5 shadow-sm">
                                <div className="space-y-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-500">
                                        <MapPin className="h-5 w-5" />
                                    </div>
                                    <h3 className="text-sm font-bold text-foreground">
                                        Alamat & Kontak Resmi
                                    </h3>
                                    <div className="space-y-1 text-xs text-muted-foreground">
                                        <p className="font-semibold text-foreground">
                                            Stasiun Meteorologi Maritim Yos Soedarso Ambon
                                        </p>
                                        <p>Jl. Amanlanite, Waimahu, Desa Latuhalat, Nusaniwe, Kota Ambon, Maluku 97118</p>
                                        <p className="pt-1">Telp: (0911) 3834398</p>
                                        <p>Email: stamar.ambon@bmkg.go.id</p>
                                    </div>
                                </div>
                                <div className="mt-5 pt-3 border-t border-border">
                                    <a
                                        href="https://wa.me/6281296265822"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-xs font-bold text-white transition-opacity hover:opacity-90"
                                    >
                                        <Phone className="h-3.5 w-3.5" />
                                        <span>Chat WhatsApp (0812-9626-5822)</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Modal Lightbox untuk Zoom Gambar */}
            {selectedImage && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 "
                    onClick={() => setSelectedImage(null)}
                >
                    <div
                        className="relative max-h-[90vh] max-w-5xl overflow-hidden rounded-lg bg-slate-900 p-2 shadow-sm"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-center justify-between border-b border-slate-800 p-3 text-white">
                            <span className="text-sm font-bold">
                                {selectedImage.title}
                            </span>
                            <button
                                onClick={() => setSelectedImage(null)}
                                className="rounded-lg p-1 text-slate-400 hover:bg-slate-800 hover:text-white"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>
                        <div className="max-h-[80vh] overflow-auto p-2">
                            <img
                                src={selectedImage.src}
                                alt={selectedImage.title}
                                className="h-auto w-full rounded-lg object-contain"
                            />
                        </div>
                    </div>
                </div>
            )}
        </PublicLayout>
    );
}
