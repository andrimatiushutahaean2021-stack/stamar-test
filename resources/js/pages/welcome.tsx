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
    Video,
    Play,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState, useEffect, useMemo } from 'react';
import BuletinShowcaseCarousel from '@/components/buletin-showcase-carousel';

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
    warning1Hari?: DocumentItem | null;
    warning3Hari?: DocumentItem | null;
    warningDocs?: DocumentItem[];
    latestProvinsiDocs?: DocumentItem[];
    latestPelabuhanDocs?: DocumentItem[];
    latestBuletinDocs?: DocumentItem[];
    latestInfografisDocs?: DocumentItem[];
    recentDocs?: DocumentItem[];
}

export default function Welcome({
    warning1Hari,
    warning3Hari,
    warningDocs = [],
    latestProvinsiDocs = [],
    latestPelabuhanDocs = [],
    latestBuletinDocs = [],
    latestInfografisDocs = [],
}: Props) {
    // State slideshow peringatan dini (mengikuti konsep 'Galeri Kami', auto-advance 4 detik)
    const [currentWarningSlide, setCurrentWarningSlide] = useState(0);

    // Auto-advance slideshow peringatan dini setiap 4 detik (seperti 'Galeri Kami')
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentWarningSlide((prev) => (prev === 0 ? 1 : 0));
        }, 4000);
        return () => clearInterval(timer);
    }, []);

    // State slider peringatan dini di widget hero
    const [activeWarningSlide, setActiveWarningSlide] = useState(0);

    // State slider "Galeri Kami" di sidebar (mengikuti style website lama .slideshow-container23)
    const [activeGallerySlide, setActiveGallerySlide] = useState(0);

    // Real-time WIT (Waktu Indonesia Timur - UTC+9) clock state
    const [currentTime, setCurrentTime] = useState<{
        timeStr: string;
        dateStr: string;
    }>({
        timeStr: '',
        dateStr: '',
    });

    useEffect(() => {
        const updateClock = () => {
            const now = new Date();
            const timeStr = now
                .toLocaleTimeString('id-ID', {
                    timeZone: 'Asia/Jayapura',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                    hour12: false,
                })
                .replace(/\./g, ':');

            const dateStr = now.toLocaleDateString('id-ID', {
                timeZone: 'Asia/Jayapura',
                weekday: 'long',
                day: 'numeric',
                month: 'long',
                year: 'numeric',
            });

            setCurrentTime({ timeStr, dateStr });
        };

        updateClock();
        const timer = setInterval(updateClock, 1000);
        return () => clearInterval(timer);
    }, []);

    // Lightbox modal state untuk zoom gambar infografis / video player
    const [activeLightbox, setActiveLightbox] = useState<{
        url: string;
        title: string;
        date?: string;
        desc?: string;
        badge?: string;
        isVideo?: boolean;
    } | null>(null);

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
            title: 'Kunjungan Lapangan & Pengamatan Maritim di Atas Kapal',
            location: 'Pelabuhan Slamet Riyadi',
            image: '/images/galeri/galeri-1.jpg',
            caption: 'Port Meteorological Officer',
        },
        {
            id: 2,
            title: 'Upacara Peringatan HUT Kemerdekaan RI Ke-81',
            location: 'Halaman Kantor Stamet Penerbangan Pattimura Ambon',
            image: '/images/galeri/galeri-2.jpg',
            caption: 'Peringatan HUT RI Ke-81',
        },
        {
            id: 3,
            title: 'Edukasi Literasi Cuaca Maritim - BMKG Goes To School',
            location: 'Aula SMA Negeri 1 Ambon',
            image: '/images/galeri/galeri-3.jpg',
            caption: 'BMKG Goes To School',
        },
        {
            id: 4,
            title: 'Apel Bersama Peringatan Hari Meteorologi Klimatologi dan Geofisika',
            location: 'Stasiun Meteorologi Maritim Yos Soedarso Ambon',
            image: '/images/galeri/galeri-4.jpg',
            caption: 'Peringatan HMKG 2026',
        },
        {
            id: 5,
            title: 'Aksi Bersih Pantai & Pelabuhan oleh Tim Maritimers Ambon',
            location: 'Dermaga Kontainer Pelabuhan Yos Sudarso',
            image: '/images/galeri/galeri-5.jpg',
            caption: 'Aksi Bersih Pelabuhan Maritim',
        },
        {
            id: 6,
            title: 'Sekolah Lapang Cuaca Nelayan (SLCN) Kota Ambon 2026',
            location: 'Balai Kota Ambon',
            image: '/images/galeri/galeri-6.jpg',
            caption: 'SLCN Kota Ambon 2026',
        },
    ];

    // Auto-advance sidebar gallery slider
    useEffect(() => {
        const timer = setInterval(() => {
            setActiveGallerySlide((prev) => (prev + 1) % galleryItems.length);
        }, 4000);
        return () => clearInterval(timer);
    }, [galleryItems.length]);

    // Data Berita & Siaran Pers Stasiun (diselaraskan dengan halaman /berita)
    const recentNews = [
        {
            id: 4,
            title: 'STAMAR Ambon Sediakan Infografis Prakiraan Cuaca Maritim Perairan Maluku',
            date: '24 Oktober 2026',
            category: 'Siaran Pers',
            image: '/images/berita/prakiraan.png',
        },
        {
            id: 3,
            title: 'BMKG: Asap Sempat Terpantau Sesaat di Jabodetabek, Kini Sudah Menjauh',
            date: '17 Oktober 2026',
            category: 'Siaran Pers',
            image: '/images/berita/asap.png',
        },
        {
            id: 2,
            title: 'BMKG Resmikan HF Radar Array di Aceh untuk Memperkuat Observasi Maritim',
            date: '8 Oktober 2026',
            category: 'Siaran Pers',
            image: '/images/berita/HF-Radar.png',
        },
        {
            id: 1,
            title: 'BMKG dan Bakamla RI Perkuat Kolaborasi untuk Keselamatan dan Keamanan Maritim',
            date: '31 Agustus 2026',
            category: 'Siaran Pers',
            image: '/images/berita/kolaborasi.png',
        },
    ];

    return (
        <PublicLayout>
            <Head title="Stasiun Meteorologi Maritim Ambon - Informasi Cuaca Maritim BMKG Maluku" />

            {/* HERO SECTION */}
            <section className="relative overflow-hidden bg-slate-900 py-12 text-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-3xl text-center">
                        <div className="mb-4 inline-flex items-center gap-2 rounded-md border border-slate-700 bg-slate-800 px-3 py-1 text-xs font-medium text-slate-200">
                            Stasiun Meteorologi Maritim Kelas II Yos Soedarso Ambon
                        </div>
                        <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl leading-tight">
                            Informasi Cuaca Maritim & Peringatan Dini Maluku
                        </h1>
                        <p className="mx-auto mt-4 max-w-2xl text-sm sm:text-base leading-relaxed text-slate-300">
                            Menyajikan prakiraan cuaca perairan provinsi Maluku, pelabuhan rakyat dan penyeberangan feri, buletin maritim resmi, serta infografis rilis harian.
                        </p>

                        {/* Jam Real-Time WIT (Waktu Indonesia Timur - UTC+9) */}
                        <div className="mt-8 inline-flex flex-col items-center gap-3 rounded-lg border border-slate-700 bg-slate-800 px-5 py-3 sm:flex-row sm:gap-6">
                            <div className="text-center sm:text-left">
                                <div className="flex items-center justify-center gap-1.5 text-[11px] font-medium uppercase tracking-wide text-slate-400 sm:justify-start">
                                    <Clock className="h-3 w-3" />
                                    <span>Waktu Operasional Stasiun</span>
                                </div>
                                <div className="mt-0.5 text-xs font-medium capitalize text-slate-200">
                                    {currentTime.dateStr || 'Memuat tanggal...'}
                                </div>
                            </div>

                            <div className="hidden h-8 w-px bg-slate-700 sm:block" />

                            <div className="flex items-baseline gap-2">
                                <span className="font-mono text-2xl font-bold tabular-nums text-white sm:text-3xl">
                                    {currentTime.timeStr || '--:--:--'}
                                </span>
                                <span className="rounded border border-slate-600 px-1.5 py-0.5 font-mono text-[11px] font-bold text-slate-200">
                                    WIT
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* UNDUH DOKUMEN & LAYANAN CEPAT GRID */}
            <section className="border-b border-border bg-slate-50 py-10 dark:bg-card">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-2xl mx-auto mb-6">
                        <h2 className="text-xl font-bold text-foreground tracking-tight sm:text-2xl">
                            Unduh Dokumen & Layanan Prakiraan Cuaca
                        </h2>
                        <p className="mt-1 text-xs text-muted-foreground">
                            Akses cepat produk informasi cuaca maritim resmi perairan Maluku
                        </p>
                    </div>

                    {/* Symmetrical 4-Card Grid Layout */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
                        {/* 1. Prakiraan Wilayah Provinsi */}
                        <Link
                            href="/provinsi"
                            className="group relative flex flex-col justify-between overflow-hidden rounded-lg border border-blue-200/80 dark:border-blue-900/50 bg-background p-5 shadow-xs transition-all duration-300 hover:border-blue-500 hover:shadow-sm dark:hover:border-blue-400"
                        >
                            <div className="flex items-center gap-3.5">
                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400 transition-transform">
                                    <Waves className="h-5 w-5" />
                                </div>
                                <div className="text-left">
                                    <h3 className="text-sm font-bold text-foreground group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                        Prakiraan Provinsi
                                    </h3>
                                    <span className="text-[11px] font-medium text-muted-foreground">
                                        18 Wilayah Perairan
                                    </span>
                                </div>
                            </div>
                            <div className="mt-4 flex items-center justify-between border-t border-border/60 pt-3 text-[11px] font-semibold text-blue-600 dark:text-blue-400">
                                <span>Unduh PDF & Peta</span>
                                <span className="group-hover:translate-x-1 transition-transform">→</span>
                            </div>
                        </Link>

                        {/* 2. Prakiraan Penyeberangan */}
                        <a
                            href="https://maritim.bmkg.go.id/cuaca/rute"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group relative flex flex-col justify-between overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-800 bg-background p-5 shadow-xs transition-colors hover:border-blue-500 hover:shadow-sm dark:hover:border-blue-400"
                        >
                            <div className="flex items-center gap-3.5">
                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400 transition-transform">
                                    <Ship className="h-5 w-5" />
                                </div>
                                <div className="text-left">
                                    <h3 className="text-sm font-bold text-foreground group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                        Prakiraan Penyeberangan
                                    </h3>
                                    <span className="text-[11px] font-medium text-muted-foreground">
                                        Jalur Kapal Feri
                                    </span>
                                </div>
                            </div>
                            <div className="mt-4 flex items-center justify-between border-t border-border/60 pt-3 text-[11px] font-semibold text-blue-600 dark:text-blue-400">
                                <span>Peta Rute BMKG Pusat</span>
                                <span className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">↗</span>
                            </div>
                        </a>

                        {/* 3. Prakiraan Pelabuhan */}
                        <Link
                            href="/pelabuhan"
                            className="group relative flex flex-col justify-between overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-800 bg-background p-5 shadow-xs transition-colors hover:border-blue-500 hover:shadow-sm dark:hover:border-blue-400"
                        >
                            <div className="flex items-center gap-3.5">
                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400 transition-transform">
                                    <Building2 className="h-5 w-5" />
                                </div>
                                <div className="text-left">
                                    <h3 className="text-sm font-bold text-foreground group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                        Prakiraan Pelabuhan
                                    </h3>
                                    <span className="text-[11px] font-medium text-muted-foreground">
                                        Dermaga & Pelabuhan Rakyat
                                    </span>
                                </div>
                            </div>
                            <div className="mt-4 flex items-center justify-between border-t border-border/60 pt-3 text-[11px] font-semibold text-blue-600 dark:text-blue-400">
                                <span>Kondisi & Pasang Surut</span>
                                <span className="group-hover:translate-x-1 transition-transform">→</span>
                            </div>
                        </Link>

                        {/* 4. Produk Prakiraan Wisata Bahari */}
                        <Link
                            href="/wisata-bahari"
                            className="group relative flex flex-col justify-between overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-800 bg-background p-5 shadow-xs transition-colors hover:border-blue-500 hover:shadow-sm dark:hover:border-blue-400"
                        >
                            <div className="flex items-center gap-3.5">
                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400 transition-transform">
                                    <Anchor className="h-5 w-5" />
                                </div>
                                <div className="text-left">
                                    <h3 className="text-sm font-bold text-foreground group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                        Prakiraan Wisata Bahari
                                    </h3>
                                    <span className="text-[11px] font-medium text-muted-foreground">
                                        Pantai & Destinasi Bahari
                                    </span>
                                </div>
                            </div>
                            <div className="mt-4 flex items-center justify-between border-t border-border/60 pt-3 text-[11px] font-semibold text-blue-600 dark:text-blue-400">
                                <span>Wisata & Rekreasi Laut</span>
                                <span className="group-hover:translate-x-1 transition-transform">→</span>
                            </div>
                        </Link>
                    </div>
                </div>
            </section>

            {/* STRUKTUR UTAMA DUA KOLOM: MAIN CONTENT (8 COLS) + SIDEBAR WIDGETS (4 COLS) */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-start">
                    
                    {/* KOLOM UTAMA (CONTENT) */}
                    <div className="lg:col-span-8 space-y-8">
                        
                        {/* 1. VISUAL PERINGATAN DINI GELOMBANG (SLIDESHOW OTOMATIS 4 DETIK SEPERTI GALERI KAMI) */}
                        <div id="peringatan-dini-section" className="rounded-lg border border-border bg-card p-6 shadow-xs">
                            <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-border/80 pb-4">
                                <div>
                                    <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
                                        <AlertTriangle className="h-5 w-5 text-amber-500" />
                                        <span>Peringatan Dini Gelombang Maluku</span>
                                    </h2>
                                    <p className="text-xs text-muted-foreground mt-0.5">
                                        Rilis resmi: 1 hari kedepan dan 3 hari kedepan.
                                    </p>
                                </div>

                                {/* Tab Toggle: 1 Hari Kedepan vs 3 Hari Kedepan */}
                                <div className="flex items-center rounded-lg bg-muted p-1 border border-border self-start sm:self-auto">
                                    <button
                                        type="button"
                                        onClick={() => setCurrentWarningSlide(0)}
                                        className={`rounded-lg px-3.5 py-1.5 text-xs font-bold transition-all cursor-pointer ${
                                            currentWarningSlide === 0
                                                ? 'bg-background text-foreground shadow-xs'
                                                : 'text-muted-foreground hover:text-foreground'
                                        }`}
                                    >
                                        <span>1 Hari Kedepan</span>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setCurrentWarningSlide(1)}
                                        className={`rounded-lg px-3.5 py-1.5 text-xs font-bold transition-all cursor-pointer ${
                                            currentWarningSlide === 1
                                                ? 'bg-background text-foreground shadow-xs'
                                                : 'text-muted-foreground hover:text-foreground'
                                        }`}
                                    >
                                        <span>3 Hari Kedepan</span>
                                    </button>
                                </div>
                            </div>

                            {/* Slideshow Display Area (Mengikuti Konsep 'Galeri Kami') */}
                            <div className="space-y-3">
                                {/* Header Info Slide Aktif */}
                                <div className="flex items-center justify-between text-xs text-muted-foreground">
                                    <span className="font-semibold text-foreground">
                                        {currentWarningSlide === 0
                                            ? 'Peringatan Dini Gelombang 1 Hari Kedepan'
                                            : 'Peringatan Dini Gelombang 3 Hari Kedepan'}
                                    </span>
                                    {currentWarningSlide === 0 && warning1Hari?.forecast_date ? (
                                        <span className="font-mono text-[11px] text-blue-600 dark:text-blue-400">
                                            Rilis: {new Date(warning1Hari.forecast_date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                                        </span>
                                    ) : currentWarningSlide === 1 && warning3Hari?.forecast_date ? (
                                        <span className="font-mono text-[11px] text-blue-600 dark:text-blue-400">
                                            Rilis: {new Date(warning3Hari.forecast_date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                                        </span>
                                    ) : null}
                                </div>

                                {/* Slides Container dengan Rasio 16/9 */}
                                <div className="relative overflow-hidden rounded-lg bg-slate-950 aspect-[16/9] border border-border/80 shadow-inner group">
                                    {/* SLIDE 0: 1 HARI KEDEPAN (GAMBAR) */}
                                    <div
                                        className={`absolute inset-0 transition-opacity duration-700 ${
                                            currentWarningSlide === 0
                                                ? 'opacity-100 z-10 pointer-events-auto'
                                                : 'opacity-0 z-0 pointer-events-none'
                                        }`}
                                    >
                                        <div
                                            onClick={() =>
                                                setActiveLightbox({
                                                    url: warning1Hari ? `/storage/${warning1Hari.file_path}` : 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
                                                    title: warning1Hari?.title || 'Peringatan Dini Gelombang 1 Hari Kedepan',
                                                    desc: warning1Hari?.description || 'Peta peringatan dini tinggi gelombang 1 hari kedepan rilis resmi BMKG Stamar Ambon.',
                                                    badge: 'Peringatan Dini 1 Hari Kedepan',
                                                    isVideo: false,
                                                })
                                            }
                                            className="relative h-full w-full cursor-pointer"
                                            title="Klik untuk memperbesar tampilan peta"
                                        >
                                            <img
                                                src={warning1Hari ? `/storage/${warning1Hari.file_path}` : 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80'}
                                                alt="Peringatan Dini Gelombang 1 Hari"
                                                className="h-full w-full object-contain bg-slate-900 transition-transform duration-500 "
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
                                            <div className="absolute bottom-4 left-4 right-16 text-white">
                                                <h3 className="text-base font-bold text-yellow-400">
                                                    {warning1Hari?.title || 'Peta Peringatan Dini Gelombang Maluku 1 Hari'}
                                                </h3>
                                                <p className="mt-1 text-xs text-slate-200 line-clamp-2">
                                                    {warning1Hari?.description || 'Rilis sebaran potensi tinggi gelombang perairan Maluku 24 jam kedepan.'}
                                                </p>
                                            </div>
                                        </div>

                                        <button
                                            type="button"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setActiveLightbox({
                                                    url: warning1Hari ? `/storage/${warning1Hari.file_path}` : 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
                                                    title: warning1Hari?.title || 'Peringatan Dini Gelombang 1 Hari Kedepan',
                                                    desc: warning1Hari?.description || 'Peta peringatan dini tinggi gelombang 1 hari kedepan rilis resmi BMKG Stamar Ambon.',
                                                    badge: 'Peringatan Dini 1 Hari Kedepan',
                                                    isVideo: false,
                                                });
                                            }}
                                            className="absolute top-3 right-3 z-30 flex h-9 w-9 items-center justify-center rounded-lg bg-black/60 text-white shadow-sm hover:bg-black/85 transition-all cursor-pointer"
                                            title="Perbesar Peta Peringatan Dini"
                                        >
                                            <ZoomIn className="h-4 w-4" />
                                        </button>
                                    </div>

                                    {/* SLIDE 1: 3 HARI KEDEPAN (VIDEO / GAMBAR) */}
                                    <div
                                        className={`absolute inset-0 transition-opacity duration-700 ${
                                            currentWarningSlide === 1
                                                ? 'opacity-100 z-10 pointer-events-auto'
                                                : 'opacity-0 z-0 pointer-events-none'
                                        }`}
                                    >
                                        {warning3Hari && ['mp4', 'webm', 'mov', 'ogg'].includes((warning3Hari.file_type || '').toLowerCase()) ? (
                                            <video
                                                controls
                                                controlsList="nodownload"
                                                autoPlay
                                                muted
                                                loop
                                                playsInline
                                                src={`/storage/${warning3Hari.file_path}`}
                                                className="w-full h-full object-contain bg-black"
                                            >
                                                Peramban Anda tidak mendukung pemutar video HTML5.
                                            </video>
                                        ) : (
                                            <div
                                                onClick={() =>
                                                    setActiveLightbox({
                                                        url: warning3Hari ? `/storage/${warning3Hari.file_path}` : 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=1200&q=80',
                                                        title: warning3Hari?.title || 'Peringatan Dini Gelombang 3 Hari Kedepan',
                                                        desc: warning3Hari?.description || 'Peta peringatan dini tinggi gelombang 3 hari kedepan rilis resmi BMKG Stamar Ambon.',
                                                        badge: 'Peringatan Dini 3 Hari Kedepan',
                                                        isVideo: false,
                                                    })
                                                }
                                                className="relative h-full w-full cursor-pointer"
                                                title="Klik untuk memperbesar tampilan peta"
                                            >
                                                <img
                                                    src={warning3Hari ? `/storage/${warning3Hari.file_path}` : 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=1200&q=80'}
                                                    alt="Peringatan Dini Gelombang 3 Hari"
                                                    className="h-full w-full object-contain bg-slate-900 transition-transform duration-500 "
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
                                                <div className="absolute bottom-4 left-4 right-16 text-white">
                                                    <h3 className="text-base font-bold text-yellow-400">
                                                        {warning3Hari?.title || 'Peta Peringatan Dini Gelombang Maluku 3 Hari'}
                                                    </h3>
                                                    <p className="mt-1 text-xs text-slate-200 line-clamp-2">
                                                        {warning3Hari?.description || 'Rilis sebaran potensi tinggi gelombang perairan Maluku 72 jam kedepan.'}
                                                    </p>
                                                </div>
                                            </div>
                                        )}

                                        {/* Tombol Perbesar jika format gambar */}
                                        {(!warning3Hari || !['mp4', 'webm', 'mov', 'ogg'].includes((warning3Hari.file_type || '').toLowerCase())) && (
                                            <button
                                                type="button"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setActiveLightbox({
                                                        url: warning3Hari ? `/storage/${warning3Hari.file_path}` : 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=1200&q=80',
                                                        title: warning3Hari?.title || 'Peringatan Dini Gelombang 3 Hari Kedepan',
                                                        desc: warning3Hari?.description || 'Peta peringatan dini tinggi gelombang 3 hari kedepan rilis resmi BMKG Stamar Ambon.',
                                                        badge: 'Peringatan Dini 3 Hari Kedepan',
                                                        isVideo: false,
                                                    });
                                                }}
                                                className="absolute top-3 right-3 z-30 flex h-9 w-9 items-center justify-center rounded-lg bg-black/60 text-white shadow-sm hover:bg-black/85 transition-all cursor-pointer"
                                                title="Perbesar Peta Peringatan Dini"
                                            >
                                                <ZoomIn className="h-4 w-4" />
                                            </button>
                                        )}
                                    </div>

                                    {/* Navigasi Prev & Next (Mengikuti Style Galeri Kami) */}
                                    <button
                                        type="button"
                                        onClick={() => setCurrentWarningSlide((prev) => (prev === 0 ? 1 : 0))}
                                        className="absolute left-3 top-1/2 -translate-y-1/2 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/85 transition-all shadow-sm cursor-pointer"
                                        aria-label="Slide Sebelumnya"
                                    >
                                        ❮
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setCurrentWarningSlide((prev) => (prev === 0 ? 1 : 0))}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/85 transition-all shadow-sm cursor-pointer"
                                        aria-label="Slide Selanjutnya"
                                    >
                                        ❯
                                    </button>
                                </div>

                                {/* Dots Pagination (Mengikuti Style Galeri Kami) */}
                                <div className="mt-3 flex flex-col sm:flex-row items-center justify-between gap-2">
                                    <div className="text-xs text-muted-foreground text-center sm:text-left">
                                        {currentWarningSlide === 0 ? (
                                            <p>{warning1Hari?.description || 'Rilis sebaran potensi tinggi gelombang perairan Maluku 24 jam kedepan.'}</p>
                                        ) : (
                                            <p>{warning3Hari?.description || 'Prakiraan potensi dinamika tinggi gelombang 3 hari kedepan perairan Maluku.'}</p>
                                        )}
                                    </div>
                                    <div className="flex items-center gap-1.5 shrink-0">
                                        <button
                                            type="button"
                                            onClick={() => setCurrentWarningSlide(0)}
                                            className={`h-2 rounded-full transition-all cursor-pointer ${
                                                currentWarningSlide === 0 ? 'w-6 bg-blue-600' : 'w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50'
                                            }`}
                                            aria-label="Slide 1 Hari Kedepan"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setCurrentWarningSlide(1)}
                                            className={`h-2 rounded-full transition-all cursor-pointer ${
                                                currentWarningSlide === 1 ? 'w-6 bg-blue-600' : 'w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50'
                                            }`}
                                            aria-label="Slide 3 Hari Kedepan"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 2. INFOGRAFIS CUACA MARITIM & PELABUHAN MALUKU */}
                        <div className="rounded-lg border border-border bg-card p-6 shadow-xs">
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
                                                className="group overflow-hidden rounded-lg border border-border bg-background transition-all hover:shadow-sm"
                                            >
                                                <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
                                                    <img
                                                        src={`/storage/${doc.file_path}`}
                                                        alt={doc.title}
                                                        className="h-full w-full object-cover transition-transform duration-300 "
                                                    />
                                                    <div className="absolute top-2 left-2">
                                                        <span className="rounded-full bg-black/75 px-2.5 py-0.5 text-[10px] font-semibold text-white ">
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
                                                        className="absolute bottom-2 right-2 flex h-8 w-8 items-center justify-center rounded-lg bg-black/70 text-white shadow-sm hover:bg-black"
                                                    >
                                                        <ZoomIn className="h-4 w-4" />
                                                    </button>
                                                </div>
                                                <div className="p-3">
                                                    <h4 className="text-xs font-bold text-foreground line-clamp-1 group-hover:text-primary">
                                                        {doc.title}
                                                    </h4>
                                                    <div className="mt-2 flex items-center justify-between text-[11px] text-muted-foreground">
                                                        <span>
                                                            {doc.forecast_date
                                                                ? new Date(doc.forecast_date).toLocaleDateString('id-ID', {
                                                                      day: 'numeric',
                                                                      month: 'short',
                                                                      year: 'numeric',
                                                                  })
                                                                : 'Rilis Terkini'}
                                                        </span>
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
                                    <div className="group overflow-hidden rounded-lg border border-border bg-background transition-all hover:shadow-sm">
                                        <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
                                            <img
                                                src="https://images.unsplash.com/photo-1534088568595-a066f410bcda?auto=format&fit=crop&w=800&q=80"
                                                alt="Infografis Perairan Maluku"
                                                className="h-full w-full object-cover transition-transform duration-300 "
                                            />
                                            <div className="absolute top-2 left-2">
                                                <span className="rounded-full bg-amber-600/90 px-2.5 py-0.5 text-[10px] font-bold text-white shadow-sm ">
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
                                                className="absolute bottom-2 right-2 flex h-8 w-8 items-center justify-center rounded-lg bg-black/70 text-white shadow-sm hover:bg-black"
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

                                    <div className="group overflow-hidden rounded-lg border border-border bg-background transition-all hover:shadow-sm">
                                        <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
                                            <img
                                                src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80"
                                                alt="Infografis Pelabuhan Maluku"
                                                className="h-full w-full object-cover transition-transform duration-300 "
                                            />
                                            <div className="absolute top-2 left-2">
                                                <span className="rounded-full bg-blue-600/90 px-2.5 py-0.5 text-[10px] font-bold text-white shadow-sm ">
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
                                                className="absolute bottom-2 right-2 flex h-8 w-8 items-center justify-center rounded-lg bg-black/70 text-white shadow-sm hover:bg-black"
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

                        {/* 3. BULETIN CUACA MARITIM BULANAN (SHOWCASE CAROUSEL MATCHING REFERENCE) */}
                        {latestBuletinDocs.length > 0 ? (
                            <BuletinShowcaseCarousel
                                documents={latestBuletinDocs}
                                stationName="Stasiun Maritim Ambon"
                            />
                        ) : (
                            <div className="rounded-lg border border-border bg-card p-6 shadow-xs">
                                <div className="mb-4 flex items-center justify-between border-b border-border/80 pb-3">
                                    <div>
                                        <h2 className="text-lg font-bold text-foreground">
                                            Buletin Bulanan Stasiun Maritim Ambon
                                        </h2>
                                        <p className="text-xs text-muted-foreground">
                                            Publikasi resmi evaluasi dan analisis cuaca maritim edisi bulanan
                                        </p>
                                    </div>
                                    <Link href="/buletin">
                                        <Button variant="outline" size="sm" className="h-8 gap-1 text-xs">
                                            <span>Semua Buletin</span>
                                            <ArrowUpRight className="h-3 w-3" />
                                        </Button>
                                    </Link>
                                </div>
                                <div className="p-4 text-center text-xs text-muted-foreground border border-dashed rounded-lg">
                                    Belum ada buletin baru yang diterbitkan. Silakan cek halaman Buletin.
                                </div>
                            </div>
                        )}

                        {/* 4. MENGENAL STASIUN METEOROLOGI MARITIM AMBON */}
                        <div className="rounded-lg border border-border bg-card p-6 shadow-xs">
                            <div className="flex flex-col sm:flex-row gap-6 items-center">
                                <div className="w-full sm:w-1/3 aspect-[4/3] rounded-lg overflow-hidden bg-slate-800">
                                    <img
                                        src="/images/profil-stasiun.jpg"
                                        alt="Kantor & Staf Stasiun Meteorologi Maritim Ambon - Zona Integritas WBK"
                                        className="h-full w-full object-cover object-center"
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
                        <div className="rounded-lg border border-border bg-card p-5 shadow-xs">
                            <div className="mb-3 flex items-center justify-between border-b border-border/80 pb-2">
                                <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
                                    <Camera className="h-4 w-4 text-blue-600" />
                                    Galeri Kami
                                </h3>
                            </div>

                            {/* Slideshow Container */}
                            <div className="relative overflow-hidden rounded-lg bg-slate-900 aspect-[4/3]">
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
                                            idx === activeGallerySlide ? 'w-5 bg-blue-600' : 'w-2 bg-muted-foreground/30'
                                        }`}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* WIDGET 2: "Berita" (Mengikuti #block-8 di website lama) */}
                        <div className="rounded-lg border border-border bg-card p-5 shadow-xs">
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
                                    <div key={news.id} className="flex items-center gap-3 py-2.5 first:pt-0 last:pb-0 group">
                                        {news.image && (
                                            <Link
                                                href="/berita"
                                                className="shrink-0 overflow-hidden rounded-md border border-border/80 bg-muted"
                                            >
                                                <img
                                                    src={news.image}
                                                    alt={news.title}
                                                    className="h-12 w-16 object-cover transition-transform duration-300 group-hover:scale-105"
                                                    loading="lazy"
                                                />
                                            </Link>
                                        )}
                                        <div className="min-w-0 flex-1">
                                            <div className="mb-0.5 flex items-center gap-1.5 text-[10px] text-muted-foreground">
                                                <span className="font-semibold text-blue-600 dark:text-blue-400">
                                                    {news.category}
                                                </span>
                                                <span>•</span>
                                                <span>{news.date}</span>
                                            </div>
                                            <Link
                                                href="/berita"
                                                className="line-clamp-2 text-xs font-bold leading-snug text-foreground transition-colors group-hover:text-primary"
                                            >
                                                {news.title}
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* WIDGET 3: "Aplikasi Mobile Info BMKG" */}
                        <div className="rounded-lg border border-border bg-card p-5 shadow-xs">
                            <div className="mb-3 flex items-center gap-2 border-b border-border/80 pb-2">
                                <Smartphone className="h-4 w-4 text-blue-600" />
                                <h3 className="text-sm font-bold text-foreground">
                                    Aplikasi Info BMKG
                                </h3>
                            </div>
                            <p className="text-xs text-muted-foreground leading-relaxed">
                                Dapatkan info cuaca maritim, gempa bumi, dan peringatan dini langsung di smartphone Anda.
                            </p>
                            <div className="mt-3 flex flex-wrap gap-2">
                                <a
                                    href="https://play.google.com/store/apps/details?id=com.Info_BMKG"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-block transition-transform hover:scale-[1.02] active:scale-[0.98]"
                                >
                                    <img
                                        src="/images/google-play-badge.svg"
                                        alt="Temukan di Google Play"
                                        className="h-9 w-auto object-contain drop-shadow-xs"
                                    />
                                </a>
                                <a
                                    href="https://apps.apple.com/id/app/info-bmkg/id1114372539"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-block transition-transform hover:scale-[1.02] active:scale-[0.98]"
                                >
                                    <img
                                        src="/images/app-store-badge.svg"
                                        alt="Unduh di App Store"
                                        className="h-9 w-auto object-contain drop-shadow-xs"
                                    />
                                </a>
                            </div>
                        </div>

                        {/* WIDGET 4: "Postingan X @infoBMKGMaluku" */}
                        <div className="rounded-lg border border-border bg-card p-5 shadow-xs">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-xs font-bold text-foreground flex items-center gap-1.5">
                                    <Share2 className="h-3.5 w-3.5 text-blue-500" />
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
                                className="mt-3 block text-center rounded-lg bg-blue-500/10 hover:bg-blue-500/20 text-blue-600 dark:text-blue-400 py-2 text-xs font-bold transition-colors"
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
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4 animate-in fade-in duration-200"
                    onClick={() => setActiveLightbox(null)}
                >
                    <div
                        className="relative max-h-[90vh] max-w-4xl w-full overflow-hidden rounded-lg border border-slate-700 bg-slate-950 p-5 shadow-sm text-white"
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
                            {activeLightbox.isVideo || activeLightbox.url.match(/\.(mp4|webm|mov|ogg)$/i) ? (
                                <video
                                    src={activeLightbox.url}
                                    controls
                                    controlsList="nodownload"
                                    autoPlay
                                    className="max-h-[60vh] w-auto max-w-full rounded-lg"
                                >
                                    Peramban Anda tidak mendukung pemutar video.
                                </video>
                            ) : (
                                <img
                                    src={activeLightbox.url}
                                    alt={activeLightbox.title}
                                    className="max-h-[60vh] w-auto object-contain"
                                />
                            )}
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
