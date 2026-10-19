import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/layouts/public-layout';
import {
    CloudRain,
    Wind,
    Waves,
    ChevronRight,
    AlertTriangle,
    Ship,
    Anchor,
    ChevronLeft,
    ExternalLink,
    MapPin,
    Calendar,
    FileText,
    ArrowUpRight,
    CheckCircle2,
    Clock,
    Image as ImageIcon,
    ZoomIn,
    X,
    Camera,
    Newspaper,
    Download,
    Building2,
    Users,
    Smartphone,
    Share2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState, useEffect, useMemo } from 'react';

interface DocumentItem {
    id: number;
    title: string;
    category: string;
    region_code?: string;
    region_number?: number;
    forecast_date?: string;
    period_type?: string;
    description?: string;
    file_path: string;
    file_type?: string;
    file_size?: string;
    created_at: string;
}

interface Props {
    warningDocs?: DocumentItem[];
    latestProvinsiDocs?: DocumentItem[];
    latestPelabuhanDocs?: DocumentItem[];
    latestBuletinDocs?: DocumentItem[];
    latestInfografisDocs?: DocumentItem[];
    recentDocs?: DocumentItem[];
}

export default function Welcome({
    warningDocs = [],
    latestProvinsiDocs = [],
    latestPelabuhanDocs = [],
    latestBuletinDocs = [],
    latestInfografisDocs = [],
}: Props) {
    // State slider peringatan dini di widget hero
    const [activeWarningSlide, setActiveWarningSlide] = useState(0);

    // State slider "Galeri Kami" di sidebar (mengikuti style website lama .slideshow-container23)
    const [activeGallerySlide, setActiveGallerySlide] = useState(0);

    // Lightbox modal state untuk zoom gambar infografis / galeri
    const [activeLightbox, setActiveLightbox] = useState<{
        url: string;
        title: string;
        date?: string;
        desc?: string;
        badge?: string;
    } | null>(null);

    // Filter daftar wilayah maritim Maluku untuk seleksi di Widget Hero
    const availableRegions = useMemo(() => {
        return [
            {
                id: 4,
                name: 'Perairan P. Ambon - P. Lease',
                defaultWave: '1.25 - 2.5 m',
                waveStatus: 'Sedang',
                waveColor: 'text-amber-400 bg-amber-400/10 border-amber-400/20',
                wind: '10 - 20 knot',
                windDir: 'Tenggara - Selatan',
            },
            {
                id: 10,
                name: 'Perairan Kep. Banda Neira',
                defaultWave: '2.5 - 4.0 m',
                waveStatus: 'Tinggi',
                waveColor: 'text-red-400 bg-red-400/10 border-red-400/20',
                wind: '15 - 25 knot',
                windDir: 'Timur - Tenggara',
            },
            {
                id: 1,
                name: 'Perairan Utara P. Buru',
                defaultWave: '0.5 - 1.25 m',
                waveStatus: 'Rendah',
                waveColor: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
                wind: '05 - 15 knot',
                windDir: 'Timur - Tenggara',
            },
            {
                id: 11,
                name: 'Perairan Kep. Kai',
                defaultWave: '1.25 - 2.5 m',
                waveStatus: 'Sedang',
                waveColor: 'text-amber-400 bg-amber-400/10 border-amber-400/20',
                wind: '10 - 20 knot',
                windDir: 'Tenggara - Selatan',
            },
            {
                id: 14,
                name: 'Perairan Barat Kep. Tanimbar',
                defaultWave: '2.5 - 4.0 m',
                waveStatus: 'Tinggi',
                waveColor: 'text-red-400 bg-red-400/10 border-red-400/20',
                wind: '15 - 25 knot',
                windDir: 'Tenggara - Barat Daya',
            },
            {
                id: 12,
                name: 'Perairan Utara Kep. Aru',
                defaultWave: '1.25 - 2.5 m',
                waveStatus: 'Sedang',
                waveColor: 'text-amber-400 bg-amber-400/10 border-amber-400/20',
                wind: '10 - 20 knot',
                windDir: 'Timur - Tenggara',
            },
        ];
    }, []);

    const [selectedRegionId, setSelectedRegionId] = useState<number>(4);

    const activeRegion = useMemo(() => {
        return availableRegions.find((r) => r.id === selectedRegionId) || availableRegions[0];
    }, [availableRegions, selectedRegionId]);

    // Format tanggal rilis terakhir
    const latestReleaseDate = useMemo(() => {
        if (latestProvinsiDocs.length > 0 && latestProvinsiDocs[0].forecast_date) {
            return new Date(latestProvinsiDocs[0].forecast_date).toLocaleDateString('id-ID', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
            });
        }
        return new Date().toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        });
    }, [latestProvinsiDocs]);

    // Data Peringatan Dini Slides
    const defaultWarningSlides = [
        {
            title: 'Peringatan Dini Gelombang Tinggi (1 Hari Ke Depan)',
            desc: 'Waspada gelombang mencapai 2.5 - 4.0 m di Perairan Kep. Tanimbar, Laut Banda, dan Laut Arafura bagian barat.',
            image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
            url: '#',
        },
        {
            title: 'Peringatan Dini Gelombang Tinggi (3 Hari Ke Depan)',
            desc: 'Pola angin timuran berkecepatan 15 - 25 knot memicu peningkatan tinggi gelombang laut di Maluku bagian selatan.',
            image: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=800&q=80',
            url: '#',
        },
    ];

    const warningSlides =
        warningDocs.length > 0
            ? warningDocs.map((doc) => ({
                  title: doc.title,
                  desc:
                      doc.description ||
                      'Rilis peringatan dini resmi Stasiun Meteorologi Kelas II Maritim Yos Soedarso Ambon.',
                  image:
                      doc.file_type &&
                      ['png', 'jpg', 'jpeg'].includes(doc.file_type.toLowerCase())
                          ? `/storage/${doc.file_path}`
                          : 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
                  url: `/storage/${doc.file_path}`,
              }))
            : defaultWarningSlides;

    useEffect(() => {
        if (warningSlides.length <= 1) return;
        const timer = setInterval(() => {
            setActiveWarningSlide((prev) => (prev + 1) % warningSlides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [warningSlides.length]);

    // Data Galeri Kegiatan Stasiun (untuk widget slideshow sidebar)
    const galleryItems = [
        {
            id: 1,
            title: 'Kunjungan Kerja & Pengamatan Maritim Stamar Ambon',
            location: 'Stasiun Meteorologi Maritim Latuhalat',
            image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80',
            caption: 'Kunjungan Stamar Ambon',
        },
        {
            id: 2,
            title: 'Sekolah Lapang Cuaca Nelayan (SLCN) BMKG Maluku',
            location: 'Teluk Ambon & Dermaga Tradisional',
            image: 'https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?auto=format&fit=crop&w=800&q=80',
            caption: 'Kegiatan SLCN Nelayan 2026',
        },
        {
            id: 3,
            title: 'Pemeliharaan & Kalibrasi Sensor Maritim Otomatis',
            location: 'Perairan Pulau Banda & Latuhalat',
            image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
            caption: 'Operasional Alat & Sensor Maritim',
        },
        {
            id: 4,
            title: 'Koordinasi Keselamatan Pelayaran bersama KSOP & Pelindo',
            location: 'Pelabuhan Yos Sudarso Ambon',
            image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=800&q=80',
            caption: 'Kemitraan Stakeholder Maritim',
        },
    ];

    // Auto-advance sidebar gallery slider
    useEffect(() => {
        const timer = setInterval(() => {
            setActiveGallerySlide((prev) => (prev + 1) % galleryItems.length);
        }, 4000);
        return () => clearInterval(timer);
    }, [galleryItems.length]);

    // Data Berita & Siaran Pers Stasiun (untuk widget sidebar)
    const recentNews = [
        {
            id: 1,
            title: 'Apel Siaga Kesiapan Angkutan Laut & Posko Terpadu Keselamatan Pelayaran di Ambon',
            date: '18 Oktober 2026',
            category: 'Siaran Pers',
        },
        {
            id: 2,
            title: 'BMKG Stamar Ambon Gelar SLCN: Tingkatkan Keselamatan Nelayan Hadapi Cuaca Ekstrem Laut Banda',
            date: '14 Oktober 2026',
            category: 'Kegiatan',
        },
        {
            id: 3,
            title: 'Prakiraan Musim Angin Timuran & Potensi Upwelling Perairan Maluku Tenggara',
            date: '10 Oktober 2026',
            category: 'Analisis Cuaca',
        },
    ];

    return (
        <PublicLayout>
            <Head title="Stasiun Meteorologi Maritim Ambon - Informasi Cuaca Maritim BMKG Maluku" />

            {/* HERO SECTION DENGAN WIDGET DAN RINGKASAN CUACA */}
            <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-sky-950 to-slate-900 pt-8 pb-12 text-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
                        {/* Judul & Pengantar */}
                        <div className="lg:col-span-7 text-center lg:text-left">
                            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-blue-500/20 px-3.5 py-1 text-xs font-semibold text-cyan-300 border border-blue-400/30">
                                <span className="flex h-2 w-2 animate-pulse rounded-full bg-cyan-400"></span>
                                BMKG Kelas II Maritim Yos Soedarso Ambon
                            </div>
                            <h1 className="text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl leading-tight">
                                Informasi Cuaca Maritim & Peringatan Dini Maluku
                            </h1>
                            <p className="mt-3 text-sm leading-relaxed text-slate-300 max-w-2xl mx-auto lg:mx-0">
                                Menyajikan prakiraan cuaca perairan provinsi Maluku, pelabuhan rakyat dan penyeberangan feri, buletin maritim resmi, serta infografis rilis harian.
                            </p>
                        </div>

                        {/* Interactive Marine Weather Box */}
                        <div className="lg:col-span-5">
                            <div className="overflow-hidden rounded-2xl border border-white/20 bg-slate-900/80 p-5 shadow-2xl backdrop-blur-md">
                                <div className="mb-3 flex items-center justify-between border-b border-white/10 pb-3">
                                    <div className="flex items-center gap-2">
                                        <MapPin className="h-4 w-4 text-cyan-400" />
                                        <select
                                            value={selectedRegionId}
                                            onChange={(e) => setSelectedRegionId(Number(e.target.value))}
                                            className="rounded-lg border border-white/20 bg-slate-950 px-2.5 py-1 text-xs font-bold text-white focus:border-cyan-400 focus:outline-none"
                                        >
                                            {availableRegions.map((region) => (
                                                <option key={region.id} value={region.id} className="bg-slate-900 text-white">
                                                    {region.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <span className="text-[11px] text-cyan-300 font-mono">
                                        {latestReleaseDate}
                                    </span>
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <div className="rounded-xl border border-slate-700/60 bg-slate-950/60 p-3">
                                        <div className="flex items-center gap-1.5 text-slate-400 text-xs mb-1">
                                            <Waves className="h-3.5 w-3.5 text-cyan-400" />
                                            <span>Gelombang</span>
                                        </div>
                                        <div className="text-xl font-black text-white">
                                            {activeRegion.defaultWave}
                                        </div>
                                        <span className={`mt-1 inline-block rounded px-2 py-0.5 text-[10px] font-bold border ${activeRegion.waveColor}`}>
                                            Kategori {activeRegion.waveStatus}
                                        </span>
                                    </div>

                                    <div className="rounded-xl border border-slate-700/60 bg-slate-950/60 p-3">
                                        <div className="flex items-center gap-1.5 text-slate-400 text-xs mb-1">
                                            <Wind className="h-3.5 w-3.5 text-blue-400" />
                                            <span>Kecepatan Angin</span>
                                        </div>
                                        <div className="text-xl font-black text-white">
                                            {activeRegion.wind}
                                        </div>
                                        <div className="mt-1 text-[10px] text-slate-300">
                                            Arah: <span className="font-semibold text-cyan-300">{activeRegion.windDir}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-3 flex items-center justify-between pt-2 text-xs">
                                    <Link href="/provinsi" className="text-cyan-300 hover:underline font-bold flex items-center gap-1">
                                        <span>Buka Prakiraan 18 Wilayah Maluku</span>
                                        <ChevronRight className="h-3.5 w-3.5" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* UNDUH DOKUMEN & LAYANAN CEPAT GRID (MENGIKUTI STYLE ASLI WEBSITE LAMA BMKG) */}
            <section className="border-b border-border bg-card py-6 shadow-sm">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="mb-4 text-center text-lg font-bold text-foreground tracking-tight sm:text-xl">
                        Unduh Dokumen & Layanan Prakiraan Cuaca
                    </h2>

                    {/* Master Unified Grid Layout seperti .download-grid pada website lama */}
                    <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-12 max-w-5xl mx-auto">
                        {/* 1. Peringatan Dini 1 Hari (Full Width di Desktop) */}
                        <div className="lg:col-span-12">
                            <button
                                type="button"
                                onClick={() => {
                                    if (warningDocs.length > 0) {
                                        const doc = warningDocs[0];
                                        if (doc.file_type && ['png', 'jpg', 'jpeg', 'webp'].includes(doc.file_type.toLowerCase())) {
                                            setActiveLightbox({
                                                url: `/storage/${doc.file_path}`,
                                                title: doc.title,
                                                desc: doc.description,
                                                badge: 'Peringatan Dini Gelombang 1 Hari',
                                            });
                                            return;
                                        }
                                        window.open(`/storage/${doc.file_path}`, '_blank');
                                    }
                                }}
                                className="group flex w-full items-center justify-between rounded-lg border border-red-200 dark:border-red-900/60 bg-red-50/60 dark:bg-red-950/20 px-5 py-3 text-left text-sm font-bold text-red-700 dark:text-red-400 shadow-xs transition-all hover:bg-red-600 hover:text-white hover:shadow-md cursor-pointer"
                            >
                                <span className="flex items-center gap-2">
                                    <AlertTriangle className="h-4 w-4 text-red-600 group-hover:text-white" />
                                    Peringatan Dini Gelombang Tinggi 1 Hari Kedepan
                                </span>
                                <span className="text-xs font-semibold opacity-80 group-hover:opacity-100 flex items-center gap-1">
                                    Lihat Dokumen ↗
                                </span>
                            </button>
                        </div>

                        {/* 2. Peringatan Dini 3 Hari (Full Width di Desktop) */}
                        <div className="lg:col-span-12">
                            <button
                                type="button"
                                onClick={() => {
                                    if (warningDocs.length > 1) {
                                        const doc = warningDocs[1];
                                        if (doc.file_type && ['png', 'jpg', 'jpeg', 'webp'].includes(doc.file_type.toLowerCase())) {
                                            setActiveLightbox({
                                                url: `/storage/${doc.file_path}`,
                                                title: doc.title,
                                                desc: doc.description,
                                                badge: 'Peringatan Dini Gelombang 3 Hari',
                                            });
                                            return;
                                        }
                                        window.open(`/storage/${doc.file_path}`, '_blank');
                                    }
                                }}
                                className="group flex w-full items-center justify-between rounded-lg border border-amber-200 dark:border-amber-900/60 bg-amber-50/60 dark:bg-amber-950/20 px-5 py-3 text-left text-sm font-bold text-amber-700 dark:text-amber-400 shadow-xs transition-all hover:bg-amber-600 hover:text-white hover:shadow-md cursor-pointer"
                            >
                                <span className="flex items-center gap-2">
                                    <AlertTriangle className="h-4 w-4 text-amber-600 group-hover:text-white" />
                                    Peringatan Dini Gelombang Tinggi 3 Hari Kedepan
                                </span>
                                <span className="text-xs font-semibold opacity-80 group-hover:opacity-100 flex items-center gap-1">
                                    Lihat Dokumen ↗
                                </span>
                            </button>
                        </div>

                        {/* 3. Prakiraan Wilayah Provinsi (1/3 Width) */}
                        <div className="lg:col-span-4">
                            <Link
                                href="/provinsi"
                                className="group flex h-full items-center justify-center rounded-lg border border-blue-200 dark:border-blue-900/60 bg-background px-4 py-3.5 text-center text-sm font-bold text-foreground shadow-xs transition-all hover:bg-blue-600 hover:text-white hover:border-blue-600 hover:shadow-md"
                            >
                                <span>Prakiraan Wilayah Provinsi</span>
                            </Link>
                        </div>

                        {/* 4. Prakiraan Penyeberangan (1/3 Width) */}
                        <div className="lg:col-span-4">
                            <a
                                href="https://maritim.bmkg.go.id/cuaca/rute"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex h-full items-center justify-center rounded-lg border border-blue-200 dark:border-blue-900/60 bg-background px-4 py-3.5 text-center text-sm font-bold text-foreground shadow-xs transition-all hover:bg-blue-600 hover:text-white hover:border-blue-600 hover:shadow-md"
                            >
                                <span>Prakiraan Penyeberangan</span>
                            </a>
                        </div>

                        {/* 5. Prakiraan Pelabuhan (1/3 Width) */}
                        <div className="lg:col-span-4">
                            <Link
                                href="/pelabuhan"
                                className="group flex h-full items-center justify-center rounded-lg border border-blue-200 dark:border-blue-900/60 bg-background px-4 py-3.5 text-center text-sm font-bold text-foreground shadow-xs transition-all hover:bg-blue-600 hover:text-white hover:border-blue-600 hover:shadow-md"
                            >
                                <span>Prakiraan Pelabuhan</span>
                            </Link>
                        </div>

                        {/* 6. Produk Prakiraan Wisata Bahari (Full Width) */}
                        <div className="lg:col-span-12">
                            <Link
                                href="/wisata-bahari"
                                className="group flex items-center justify-between rounded-lg border border-emerald-200 dark:border-emerald-900/60 bg-background px-5 py-3 text-sm font-bold text-foreground shadow-xs transition-all hover:bg-emerald-600 hover:text-white hover:border-emerald-600 hover:shadow-md"
                            >
                                <span className="flex items-center gap-2">
                                    <Anchor className="h-4 w-4 text-emerald-600 group-hover:text-white" />
                                    Produk Prakiraan Wisata Bahari Maluku
                                </span>
                                <span className="text-xs font-semibold text-muted-foreground group-hover:text-white">
                                    Pantai & Destinasi Bahari ↗
                                </span>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* STRUKTUR UTAMA DUA KOLOM: MAIN CONTENT (8 COLS) + SIDEBAR WIDGETS (4 COLS) */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-start">
                    
                    {/* KOLOM UTAMA (CONTENT) */}
                    <div className="lg:col-span-8 space-y-8">
                        
                        {/* 1. VISUAL PERINGATAN DINI GELOMBANG (1 HARI & 3 HARI) */}
                        <div className="rounded-2xl border border-border bg-card p-6 shadow-xs">
                            <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-border/80 pb-3">
                                <div>
                                    <h2 className="text-lg font-bold text-foreground">
                                        Peta Peringatan Dini Gelombang Maluku
                                    </h2>
                                    <p className="text-xs text-muted-foreground">
                                        Peta sebaran area perairan berpotensi gelombang tinggi hingga ekstrem.
                                    </p>
                                </div>
                                <span className="rounded-full bg-red-500/10 px-3 py-1 text-[11px] font-bold text-red-600 dark:text-red-400 self-start sm:self-auto">
                                    Rilis Resmi Stamar
                                </span>
                            </div>

                            {/* Warning Slider Container */}
                            <div className="relative overflow-hidden rounded-xl bg-slate-900 group">
                                <div className="relative aspect-[16/9] w-full">
                                    {warningSlides.map((slide, idx) => (
                                        <div
                                            key={idx}
                                            onClick={() =>
                                                setActiveLightbox({
                                                    url: slide.image,
                                                    title: slide.title,
                                                    desc: slide.desc,
                                                    badge: 'Peta Peringatan Dini Gelombang',
                                                })
                                            }
                                            className={`absolute inset-0 cursor-pointer transition-opacity duration-700 ${
                                                idx === activeWarningSlide ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                                            }`}
                                            title="Klik untuk memperbesar tampilan peta"
                                        >
                                            <img
                                                src={slide.image}
                                                alt={slide.title}
                                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-102"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                                            <div className="absolute bottom-4 left-4 right-16 text-white">
                                                <h3 className="text-base font-bold text-yellow-400">
                                                    {slide.title}
                                                </h3>
                                                <p className="mt-1 text-xs text-slate-200 line-clamp-2">
                                                    {slide.desc}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Tombol Perbesar / Zoom Cepat */}
                                <button
                                    type="button"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        const currentSlide = warningSlides[activeWarningSlide];
                                        if (currentSlide) {
                                            setActiveLightbox({
                                                url: currentSlide.image,
                                                title: currentSlide.title,
                                                desc: currentSlide.desc,
                                                badge: 'Peta Peringatan Dini Gelombang',
                                            });
                                        }
                                    }}
                                    className="absolute top-3 right-3 z-30 flex h-9 w-9 items-center justify-center rounded-xl bg-black/60 text-white shadow-lg backdrop-blur-md hover:bg-black/85 hover:scale-105 transition-all cursor-pointer"
                                    title="Perbesar Peta Peringatan Dini"
                                >
                                    <ZoomIn className="h-4 w-4" />
                                </button>

                                {/* Controls */}
                                <div className="absolute top-1/2 left-2 right-2 z-20 flex -translate-y-1/2 justify-between pointer-events-none">
                                    <button
                                        type="button"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setActiveWarningSlide((prev) =>
                                                prev === 0 ? warningSlides.length - 1 : prev - 1,
                                            );
                                        }}
                                        className="pointer-events-auto flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors cursor-pointer"
                                    >
                                        <ChevronLeft className="h-5 w-5" />
                                    </button>
                                    <button
                                        type="button"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setActiveWarningSlide((prev) => (prev + 1) % warningSlides.length);
                                        }}
                                        className="pointer-events-auto flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors cursor-pointer"
                                    >
                                        <ChevronRight className="h-5 w-5" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* 2. INFOGRAFIS CUACA MARITIM & PELABUHAN MALUKU */}
                        <div className="rounded-2xl border border-border bg-card p-6 shadow-xs">
                            <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-border/80 pb-3">
                                <div>
                                    <h2 className="text-lg font-bold text-foreground">
                                        Infografis Cuaca Maritim & Pelabuhan
                                    </h2>
                                    <p className="text-xs text-muted-foreground">
                                        Visualisasi harian resolusi tinggi cuaca perairan dan pelabuhan Maluku.
                                    </p>
                                </div>

                                <div className="flex items-center gap-2">
                                    <Link href="/infografis">
                                        <Button variant="outline" size="sm" className="h-8 gap-1 text-xs">
                                            <span>Lihat Semua Infografis</span>
                                            <ArrowUpRight className="h-3 w-3" />
                                        </Button>
                                    </Link>
                                </div>
                            </div>

                            {/* Infografis Content Card */}
                            {latestInfografisDocs.length > 0 ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {latestInfografisDocs.slice(0, 2).map((doc, idx) => {
                                        const isPerairan = doc.region_code?.startsWith('P_AH') || idx === 0;
                                        const targetHref = isPerairan ? '/infografis-provinsi' : '/infografis-pelabuhan';
                                        const badgeText = isPerairan ? 'Perairan Provinsi' : 'Pelabuhan Maluku';

                                        return (
                                            <div
                                                key={doc.id}
                                                className="group overflow-hidden rounded-xl border border-border bg-background transition-all hover:shadow-md"
                                            >
                                                <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
                                                    <img
                                                        src={`/storage/${doc.file_path}`}
                                                        alt={doc.title}
                                                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                                    />
                                                    <div className="absolute top-2 left-2">
                                                        <span className="rounded-full bg-black/75 px-2.5 py-0.5 text-[10px] font-semibold text-white backdrop-blur-md">
                                                            {badgeText}
                                                        </span>
                                                    </div>
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            setActiveLightbox({
                                                                url: `/storage/${doc.file_path}`,
                                                                title: doc.title,
                                                                date: doc.forecast_date ? new Date(doc.forecast_date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : '',
                                                                desc: doc.description,
                                                                badge: badgeText,
                                                            })
                                                        }
                                                        className="absolute bottom-2 right-2 flex h-8 w-8 items-center justify-center rounded-lg bg-black/70 text-white shadow-md hover:bg-black"
                                                    >
                                                        <ZoomIn className="h-4 w-4" />
                                                    </button>
                                                </div>
                                                <div className="p-3">
                                                    <h4 className="text-xs font-bold text-foreground line-clamp-1 group-hover:text-primary">
                                                        {doc.title}
                                                    </h4>
                                                    <div className="mt-2 flex items-center justify-between text-[11px] text-muted-foreground">
                                                        <span>{doc.forecast_date || 'Rilis Terkini'}</span>
                                                        <Link
                                                            href={targetHref}
                                                            className="font-bold text-primary hover:underline flex items-center gap-1"
                                                        >
                                                            <span>Lihat Detail ↗</span>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="group overflow-hidden rounded-xl border border-border bg-background transition-all hover:shadow-md">
                                        <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
                                            <img
                                                src="https://images.unsplash.com/photo-1534088568595-a066f410bcda?auto=format&fit=crop&w=800&q=80"
                                                alt="Infografis Perairan Maluku"
                                                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                            />
                                            <div className="absolute top-2 left-2">
                                                <span className="rounded-full bg-amber-600/90 px-2.5 py-0.5 text-[10px] font-bold text-white shadow-md backdrop-blur-md">
                                                    Perairan Provinsi
                                                </span>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setActiveLightbox({
                                                        url: 'https://images.unsplash.com/photo-1534088568595-a066f410bcda?auto=format&fit=crop&w=800&q=80',
                                                        title: 'Infografis Prakiraan Cuaca Perairan Maluku',
                                                        date: latestReleaseDate,
                                                        desc: 'Peta sebaran tinggi gelombang dan pola angin di perairan Maluku.',
                                                        badge: 'Infografis Perairan Provinsi',
                                                    })
                                                }
                                                className="absolute bottom-2 right-2 flex h-8 w-8 items-center justify-center rounded-lg bg-black/70 text-white shadow-md hover:bg-black"
                                            >
                                                <ZoomIn className="h-4 w-4" />
                                            </button>
                                        </div>
                                        <div className="p-3">
                                            <h4 className="text-xs font-bold text-foreground line-clamp-1 group-hover:text-amber-600">
                                                Infografis Cuaca Perairan Provinsi
                                            </h4>
                                            <div className="mt-2 flex items-center justify-between text-[11px] text-muted-foreground">
                                                <span>{latestReleaseDate}</span>
                                                <Link href="/infografis-provinsi" className="font-bold text-amber-600 hover:underline">
                                                    Lihat Detail ↗
                                                </Link>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="group overflow-hidden rounded-xl border border-border bg-background transition-all hover:shadow-md">
                                        <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
                                            <img
                                                src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80"
                                                alt="Infografis Pelabuhan Maluku"
                                                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                            />
                                            <div className="absolute top-2 left-2">
                                                <span className="rounded-full bg-blue-600/90 px-2.5 py-0.5 text-[10px] font-bold text-white shadow-md backdrop-blur-md">
                                                    Pelabuhan Maluku
                                                </span>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setActiveLightbox({
                                                        url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
                                                        title: 'Infografis Cuaca Area Pelabuhan Maluku',
                                                        date: latestReleaseDate,
                                                        desc: 'Prakiraan visual cuaca pelabuhan Yos Sudarso Ambon, Tulehu, Namlea, dan Saumlaki.',
                                                        badge: 'Infografis Pelabuhan',
                                                    })
                                                }
                                                className="absolute bottom-2 right-2 flex h-8 w-8 items-center justify-center rounded-lg bg-black/70 text-white shadow-md hover:bg-black"
                                            >
                                                <ZoomIn className="h-4 w-4" />
                                            </button>
                                        </div>
                                        <div className="p-3">
                                            <h4 className="text-xs font-bold text-foreground line-clamp-1 group-hover:text-blue-600">
                                                Infografis Cuaca Pelabuhan Maluku
                                            </h4>
                                            <div className="mt-2 flex items-center justify-between text-[11px] text-muted-foreground">
                                                <span>{latestReleaseDate}</span>
                                                <Link href="/infografis-pelabuhan" className="font-bold text-blue-600 hover:underline">
                                                    Lihat Detail ↗
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* 3. BULETIN CUACA MARITIM TERKINI */}
                        <div className="rounded-2xl border border-border bg-card p-6 shadow-xs">
                            <div className="mb-4 flex items-center justify-between border-b border-border/80 pb-3">
                                <div>
                                    <h2 className="text-lg font-bold text-foreground">
                                        Buletin Cuaca Maritim Terkini
                                    </h2>
                                    <p className="text-xs text-muted-foreground">
                                        Publikasi analisis atmosfer dan meteorologi kelautan berkala Stamar Ambon.
                                    </p>
                                </div>
                                <Link href="/buletin">
                                    <Button variant="outline" size="sm" className="h-8 gap-1 text-xs">
                                        <span>Semua Buletin</span>
                                        <ArrowUpRight className="h-3 w-3" />
                                    </Button>
                                </Link>
                            </div>

                            {latestBuletinDocs.length > 0 ? (
                                <div className="space-y-3">
                                    {latestBuletinDocs.map((buletin) => (
                                        <div
                                            key={buletin.id}
                                            className="flex items-center justify-between rounded-xl border border-border/60 bg-muted/20 p-3.5 hover:bg-muted/40 transition-colors"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-400">
                                                    <FileText className="h-4 w-4" />
                                                </div>
                                                <div>
                                                    <h4 className="text-xs font-bold text-foreground line-clamp-1">
                                                        {buletin.title}
                                                    </h4>
                                                    <span className="text-[11px] text-muted-foreground">
                                                        {new Date(buletin.created_at).toLocaleDateString('id-ID', {
                                                            day: 'numeric',
                                                            month: 'long',
                                                            year: 'numeric',
                                                        })}
                                                    </span>
                                                </div>
                                            </div>
                                            <a
                                                href={`/storage/${buletin.file_path}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-xs font-bold text-primary hover:underline flex items-center gap-1"
                                            >
                                                <span>Unduh PDF</span>
                                                <Download className="h-3.5 w-3.5" />
                                            </a>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="p-4 text-center text-xs text-muted-foreground border border-dashed rounded-xl">
                                    Belum ada buletin baru yang diterbitkan. Silakan cek halaman Buletin.
                                </div>
                            )}
                        </div>

                        {/* 4. MENGENAL STASIUN METEOROLOGI MARITIM AMBON */}
                        <div className="rounded-2xl border border-border bg-card p-6 shadow-xs">
                            <div className="flex flex-col sm:flex-row gap-6 items-center">
                                <div className="w-full sm:w-1/3 aspect-[4/3] rounded-xl overflow-hidden bg-slate-800">
                                    <img
                                        src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=600&q=80"
                                        alt="Kantor Stamar Ambon"
                                        className="h-full w-full object-cover"
                                    />
                                </div>
                                <div className="w-full sm:w-2/3">
                                    <h3 className="text-base font-bold text-foreground">
                                        Stasiun Meteorologi Kelas II Maritim Yos Soedarso Ambon
                                    </h3>
                                    <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                                        Bertugas melaksanakan pengamatan, pengelolaan data, pelayanan jasa informasi cuaca maritim, dan pemeliharaan alat meteorologi kelautan di seluruh wilayah kepulauan Maluku.
                                    </p>
                                    <div className="mt-4 flex flex-wrap gap-2 text-xs">
                                        <Link href="/sejarah">
                                            <Button size="sm" variant="outline" className="h-8 text-xs font-semibold">
                                                Profil & Sejarah
                                            </Button>
                                        </Link>
                                        <Link href="/informasi">
                                            <Button size="sm" variant="outline" className="h-8 text-xs font-semibold">
                                                Pelayanan Jasa
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* SIDEBAR WIDGETS (MENGIKUTI STRUKTUR ASLI #sidebar PADA WEBSITE LAMA) */}
                    <div className="lg:col-span-4 space-y-6">

                        {/* WIDGET 1: "Galeri Kami" (Slideshow seperti .slideshow-container23 di website lama) */}
                        <div className="rounded-2xl border border-border bg-card p-5 shadow-xs">
                            <div className="mb-3 flex items-center justify-between border-b border-border/80 pb-2">
                                <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
                                    <Camera className="h-4 w-4 text-teal-600" />
                                    Galeri Kami
                                </h3>
                                <Link href="/galeri" className="text-[11px] font-bold text-primary hover:underline">
                                    Lihat Semua ↗
                                </Link>
                            </div>

                            {/* Slideshow Container */}
                            <div className="relative overflow-hidden rounded-xl bg-slate-900 aspect-[4/3]">
                                {galleryItems.map((item, idx) => (
                                    <div
                                        key={item.id}
                                        className={`absolute inset-0 transition-opacity duration-500 ${
                                            idx === activeGallerySlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
                                        }`}
                                    >
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            className="h-full w-full object-cover"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                                        <div className="absolute bottom-3 left-3 right-3 text-center text-white">
                                            <div className="text-xs font-semibold">
                                                {item.caption}
                                            </div>
                                            <div className="text-[10px] text-slate-300">
                                                {item.location}
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                {/* Prev & Next Buttons */}
                                <button
                                    type="button"
                                    onClick={() =>
                                        setActiveGallerySlide((prev) =>
                                            prev === 0 ? galleryItems.length - 1 : prev - 1,
                                        )
                                    }
                                    className="absolute left-2 top-1/2 -translate-y-1/2 z-20 flex h-7 w-7 items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/80"
                                >
                                    ❮
                                </button>
                                <button
                                    type="button"
                                    onClick={() =>
                                        setActiveGallerySlide((prev) => (prev + 1) % galleryItems.length)
                                    }
                                    className="absolute right-2 top-1/2 -translate-y-1/2 z-20 flex h-7 w-7 items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/80"
                                >
                                    ❯
                                </button>
                            </div>

                            {/* Dots Pagination */}
                            <div className="mt-3 flex justify-center gap-1.5">
                                {galleryItems.map((_, idx) => (
                                    <button
                                        key={idx}
                                        type="button"
                                        onClick={() => setActiveGallerySlide(idx)}
                                        className={`h-2 rounded-full transition-all ${
                                            idx === activeGallerySlide ? 'w-5 bg-teal-600' : 'w-2 bg-muted-foreground/30'
                                        }`}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* WIDGET 2: "Berita" (Mengikuti #block-8 di website lama) */}
                        <div className="rounded-2xl border border-border bg-card p-5 shadow-xs">
                            <div className="mb-3 flex items-center justify-between border-b border-border/80 pb-2">
                                <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
                                    <Newspaper className="h-4 w-4 text-blue-600" />
                                    Berita Stasiun
                                </h3>
                                <Link href="/berita" className="text-[11px] font-bold text-primary hover:underline">
                                    Lihat Semua ↗
                                </Link>
                            </div>

                            <div className="divide-y divide-border/60">
                                {recentNews.map((news) => (
                                    <div key={news.id} className="py-2.5 first:pt-0 last:pb-0">
                                        <div className="flex items-center gap-2 text-[10px] text-muted-foreground mb-1">
                                            <span className="font-semibold text-blue-600 dark:text-blue-400">
                                                {news.category}
                                            </span>
                                            <span>•</span>
                                            <span>{news.date}</span>
                                        </div>
                                        <Link
                                            href="/berita"
                                            className="text-xs font-bold text-foreground hover:text-primary transition-colors line-clamp-2"
                                        >
                                            {news.title}
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* WIDGET 3: "Aplikasi Mobile Info BMKG" */}
                        <div className="rounded-2xl border border-border bg-card p-5 shadow-xs">
                            <div className="mb-3 flex items-center gap-2 border-b border-border/80 pb-2">
                                <Smartphone className="h-4 w-4 text-sky-600" />
                                <h3 className="text-sm font-bold text-foreground">
                                    Aplikasi Info BMKG
                                </h3>
                            </div>
                            <p className="text-xs text-muted-foreground leading-relaxed">
                                Dapatkan info cuaca maritim, gempa bumi, dan peringatan dini langsung di smartphone Anda.
                            </p>
                            <div className="mt-3 flex gap-2">
                                <a
                                    href="https://play.google.com/store/apps/details?id=com.Info_BMKG"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex-1 rounded-lg border border-border bg-muted/40 p-2 text-center text-[11px] font-bold text-foreground hover:bg-muted transition-colors"
                                >
                                    Google Play ↗
                                </a>
                                <a
                                    href="https://itunes.apple.com/id/app/id1114372539?l=id"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex-1 rounded-lg border border-border bg-muted/40 p-2 text-center text-[11px] font-bold text-foreground hover:bg-muted transition-colors"
                                >
                                    App Store ↗
                                </a>
                            </div>
                        </div>

                        {/* WIDGET 4: "Postingan X @infoBMKGMaluku" */}
                        <div className="rounded-2xl border border-border bg-card p-5 shadow-xs">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-xs font-bold text-foreground flex items-center gap-1.5">
                                    <Share2 className="h-3.5 w-3.5 text-sky-500" />
                                    Postingan X / Twitter
                                </span>
                                <span className="text-[10px] text-muted-foreground">@infoBMKGMaluku</span>
                            </div>
                            <p className="text-xs text-muted-foreground">
                                Pantau rilis cepat dan pembaruan cuaca satelit harian melalui akun resmi BMKG Maluku.
                            </p>
                            <a
                                href="https://x.com/infoBMKGMaluku"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-3 block text-center rounded-lg bg-sky-500/10 hover:bg-sky-500/20 text-sky-600 dark:text-sky-400 py-2 text-xs font-bold transition-colors"
                            >
                                Kunjungi @infoBMKGMaluku ↗
                            </a>
                        </div>

                    </div>

                </div>
            </div>

            {/* LIGHTBOX MODAL */}
            {activeLightbox && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm animate-in fade-in duration-200"
                    onClick={() => setActiveLightbox(null)}
                >
                    <div
                        className="relative max-h-[90vh] max-w-4xl w-full overflow-hidden rounded-2xl border border-slate-700 bg-slate-950 p-5 shadow-2xl text-white"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            type="button"
                            onClick={() => setActiveLightbox(null)}
                            className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-white hover:bg-white/40"
                        >
                            <X className="h-4 w-4" />
                        </button>
                        <div className="mb-3">
                            <span className="rounded-full bg-blue-600 px-2.5 py-0.5 text-[10px] font-bold">
                                {activeLightbox.badge || 'Infografis'}
                            </span>
                            <h3 className="mt-1 text-base font-bold">{activeLightbox.title}</h3>
                            {activeLightbox.date && (
                                <p className="text-xs text-slate-400">{activeLightbox.date}</p>
                            )}
                        </div>
                        <div className="flex max-h-[65vh] items-center justify-center overflow-auto rounded-lg bg-black/50 p-2">
                            <img
                                src={activeLightbox.url}
                                alt={activeLightbox.title}
                                className="max-h-[60vh] w-auto object-contain"
                            />
                        </div>
                        {activeLightbox.desc && (
                            <p className="mt-3 text-xs text-slate-300">{activeLightbox.desc}</p>
                        )}
                    </div>
                </div>
            )}
        </PublicLayout>
    );
}
