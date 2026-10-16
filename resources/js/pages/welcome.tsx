import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/layouts/public-layout';
import {
    CloudRain,
    Wind,
    Thermometer,
    Waves,
    ChevronRight,
    AlertTriangle,
    Ship,
    Anchor,
    ChevronLeft,
    ExternalLink,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';

interface DocumentItem {
    id: number;
    title: string;
    category: string;
    description?: string;
    file_path: string;
    file_type?: string;
    file_size?: string;
    created_at: string;
}

interface Props {
    warningDocs?: DocumentItem[];
}

export default function Welcome({ warningDocs = [] }: Props) {
    // State for warning slider
    const [activeWarningSlide, setActiveWarningSlide] = useState(0);

    const defaultWarningSlides = [
        {
            title: 'Peringatan Dini Gelombang (1 Hari Ke Depan)',
            desc: 'Waspada gelombang tinggi 2.5 - 4.0 meter di Laut Banda dan Perairan Kep. Babar - Tanimbar.',
            image: 'https://via.placeholder.com/600x300/1e293b/ef4444?text=Peta+Gelombang+Hari+Ini',
            url: '#',
        },
        {
            title: 'Peringatan Dini Gelombang (3 Hari Ke Depan)',
            desc: 'Potensi gelombang tinggi masih berlanjut di wilayah perairan selatan Maluku.',
            image: 'https://via.placeholder.com/600x300/1e293b/f59e0b?text=Peta+Gelombang+3+Hari+Kedepan',
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
                      ['png', 'jpg', 'jpeg'].includes(
                          doc.file_type.toLowerCase(),
                      )
                          ? `/storage/${doc.file_path}`
                          : 'https://via.placeholder.com/600x300/1e293b/ef4444?text=Dokumen+Peringatan+Dini',
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

    return (
        <PublicLayout>
            <Head title="Beranda - Stasiun Meteorologi Kelas II Maritim Yos Soedarso Ambon" />

            {/* Hero Section */}
            <section className="relative overflow-hidden bg-slate-900 pt-16 pb-32">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                    <svg
                        className="h-full w-full"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <defs>
                            <pattern
                                id="grid-pattern"
                                width="40"
                                height="40"
                                patternUnits="userSpaceOnUse"
                            >
                                <path
                                    d="M0 40L40 0H20L0 20M40 40V20L20 40"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1"
                                />
                            </pattern>
                        </defs>
                        <rect
                            width="100%"
                            height="100%"
                            fill="url(#grid-pattern)"
                        />
                    </svg>
                </div>

                <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
                        <div className="text-center lg:text-left">
                            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/20 px-3 py-1 text-sm font-medium text-primary-foreground">
                                <span className="flex h-2 w-2 animate-pulse rounded-full bg-blue-400"></span>
                                Informasi Cuaca Maritim Terkini
                            </div>
                            <h1 className="mb-6 text-4xl leading-tight font-extrabold tracking-tight text-white md:text-5xl lg:text-6xl">
                                Pantau Cuaca Perairan{' '}
                                <span className="bg-gradient-to-r from-blue-400 to-teal-300 bg-clip-text text-transparent">
                                    Maluku
                                </span>{' '}
                                Dengan Akurat
                            </h1>
                            <p className="mx-auto mb-8 max-w-2xl text-lg leading-relaxed text-slate-300 md:text-xl lg:mx-0">
                                Dapatkan prakiraan cuaca, peringatan dini
                                gelombang tinggi, dan informasi iklim maritim
                                terpercaya langsung dari sumber resminya.
                            </p>
                        </div>

                        <div className="relative">
                            {/* Weather Widget Mockup & Warning Slider */}
                            <div className="relative flex flex-col gap-6 overflow-hidden rounded-2xl border border-white/20 bg-white/10 p-6 shadow-2xl backdrop-blur-xl">
                                <div className="absolute top-0 right-0 -mt-4 -mr-4 h-24 w-24 rounded-full bg-blue-500 opacity-50 blur-3xl"></div>
                                <div className="absolute bottom-0 left-0 -mb-4 -ml-4 h-24 w-24 rounded-full bg-teal-500 opacity-50 blur-3xl"></div>

                                <div className="relative z-10 text-white">
                                    <div className="mb-6 flex items-start justify-between">
                                        <div>
                                            <h3 className="text-2xl font-bold">
                                                Perairan Ambon
                                            </h3>
                                            <p className="mt-1 text-slate-300">
                                                Hari ini,{' '}
                                                {new Date().toLocaleDateString(
                                                    'id-ID',
                                                    {
                                                        day: 'numeric',
                                                        month: 'short',
                                                        year: 'numeric',
                                                    },
                                                )}
                                            </p>
                                        </div>
                                        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-500/20">
                                            <CloudRain className="h-7 w-7 text-blue-300" />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="rounded-xl border border-slate-700/50 bg-slate-900/50 p-4">
                                            <div className="mb-2 flex items-center gap-2 text-slate-400">
                                                <Waves className="h-4 w-4 text-teal-400" />
                                                <span className="text-xs font-medium">
                                                    Tinggi Gelombang
                                                </span>
                                            </div>
                                            <div className="text-2xl font-bold">
                                                1.25 - 2.5
                                                <span className="ml-1 text-sm text-slate-400">
                                                    m
                                                </span>
                                            </div>
                                            <div className="mt-1 inline-block rounded bg-yellow-400/10 px-2 py-1 text-[10px] font-medium text-yellow-400">
                                                Kategori Sedang
                                            </div>
                                        </div>

                                        <div className="rounded-xl border border-slate-700/50 bg-slate-900/50 p-4">
                                            <div className="mb-2 flex items-center gap-2 text-slate-400">
                                                <Wind className="h-4 w-4 text-blue-400" />
                                                <span className="text-xs font-medium">
                                                    Kecepatan Angin
                                                </span>
                                            </div>
                                            <div className="text-2xl font-bold">
                                                10 - 20
                                                <span className="ml-1 text-sm text-slate-400">
                                                    knot
                                                </span>
                                            </div>
                                            <div className="mt-1 text-[10px] font-medium text-slate-300">
                                                Tenggara - Selatan
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Warning Slider */}
                                <div className="group relative z-10 overflow-hidden rounded-xl border border-slate-700/50 bg-slate-900/60">
                                    <div className="absolute top-3 left-3 z-20 flex items-center gap-1 rounded bg-red-500/90 px-2 py-1 text-[10px] font-bold text-white shadow-lg backdrop-blur-sm">
                                        <AlertTriangle className="h-3 w-3" />{' '}
                                        PERINGATAN DINI
                                    </div>

                                    {/* Slider Images */}
                                    <div className="relative h-40 w-full overflow-hidden bg-black/50">
                                        {warningSlides.map((slide, index) => (
                                            <div
                                                key={index}
                                                className={`absolute inset-0 transition-opacity duration-1000 ${index === activeWarningSlide ? 'opacity-100' : 'opacity-0'}`}
                                            >
                                                <img
                                                    src={slide.image}
                                                    alt={slide.title}
                                                    className="h-full w-full object-cover opacity-60"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
                                                <div className="absolute bottom-0 left-0 w-full p-4">
                                                    <h4 className="text-sm font-semibold text-yellow-400">
                                                        {slide.title}
                                                    </h4>
                                                    <p className="mt-1 line-clamp-2 text-xs text-slate-300">
                                                        {slide.desc}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Slider Controls */}
                                    <div className="absolute top-1/2 flex w-full -translate-y-1/2 justify-between px-2 opacity-0 transition-opacity group-hover:opacity-100">
                                        <button
                                            onClick={() =>
                                                setActiveWarningSlide((prev) =>
                                                    prev === 0
                                                        ? warningSlides.length -
                                                          1
                                                        : prev - 1,
                                                )
                                            }
                                            className="flex h-6 w-6 items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/80"
                                        >
                                            <ChevronLeft className="h-4 w-4" />
                                        </button>
                                        <button
                                            onClick={() =>
                                                setActiveWarningSlide(
                                                    (prev) =>
                                                        (prev + 1) %
                                                        warningSlides.length,
                                                )
                                            }
                                            className="flex h-6 w-6 items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/80"
                                        >
                                            <ChevronRight className="h-4 w-4" />
                                        </button>
                                    </div>

                                    {/* Slider Indicators */}
                                    <div className="absolute right-4 bottom-2 z-20 flex gap-1">
                                        {warningSlides.map((_, index) => (
                                            <button
                                                key={index}
                                                onClick={() =>
                                                    setActiveWarningSlide(index)
                                                }
                                                className={`h-1.5 rounded-full transition-all ${index === activeWarningSlide ? 'w-4 bg-yellow-400' : 'w-1.5 bg-slate-500'}`}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Quick Access Menu (4 Cards) */}
            <section className="relative z-20 -mt-16 py-16">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                        {/* Card 1 */}
                        <div className="flex h-full flex-col rounded-2xl border bg-card p-6 text-card-foreground shadow-xl transition-transform duration-300 hover:-translate-y-2">
                            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                                <Ship className="h-6 w-6" />
                            </div>
                            <h3 className="mb-2 text-lg font-bold">
                                Prakiraan Area Pelayanan
                            </h3>
                            <p className="mb-4 line-clamp-3 flex-grow text-sm text-muted-foreground">
                                Informasi prakiraan cuaca khusus untuk pelabuhan
                                dan area aktivitas maritim.
                            </p>
                            <Link
                                href="/pelabuhan"
                                className="mt-auto inline-flex items-center text-sm font-medium text-primary hover:underline"
                            >
                                Selengkapnya{' '}
                                <ChevronRight className="ml-1 h-4 w-4" />
                            </Link>
                        </div>

                        {/* Card 2 */}
                        <div className="flex h-full flex-col rounded-2xl border bg-card p-6 text-card-foreground shadow-xl transition-transform duration-300 hover:-translate-y-2">
                            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-teal-100 text-teal-600 dark:bg-teal-900/30 dark:text-teal-400">
                                <Waves className="h-6 w-6" />
                            </div>
                            <h3 className="mb-2 text-lg font-bold">
                                Prakiraan Area Penyeberangan
                            </h3>
                            <p className="mb-4 line-clamp-3 flex-grow text-sm text-muted-foreground">
                                Data cuaca perairan rute penyeberangan kapal
                                ferry antar pulau di Maluku.
                            </p>
                            <a
                                href="https://maritim.bmkg.go.id/cuaca/rute"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-auto inline-flex items-center text-sm font-medium text-teal-600 hover:underline dark:text-teal-400"
                            >
                                Buka BMKG Rute Penyeberangan{' '}
                                <ExternalLink className="ml-1.5 h-3.5 w-3.5" />
                            </a>
                        </div>

                        {/* Card 3 */}
                        <div className="flex h-full flex-col rounded-2xl border bg-card p-6 text-card-foreground shadow-xl transition-transform duration-300 hover:-translate-y-2">
                            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400">
                                <Thermometer className="h-6 w-6" />
                            </div>
                            <h3 className="mb-2 text-lg font-bold">
                                Prakiraan Cuaca Provinsi
                            </h3>
                            <p className="mb-4 line-clamp-3 flex-grow text-sm text-muted-foreground">
                                Detail kondisi cuaca, suhu, dan kelembapan untuk
                                seluruh wilayah provinsi Maluku.
                            </p>
                            <Link
                                href="/provinsi"
                                className="mt-auto inline-flex items-center text-sm font-medium text-amber-600 hover:underline dark:text-amber-400"
                            >
                                Selengkapnya{' '}
                                <ChevronRight className="ml-1 h-4 w-4" />
                            </Link>
                        </div>

                        {/* Card 4 - Wisata Bahari */}
                        <div className="flex h-full flex-col rounded-2xl border bg-card p-6 text-card-foreground shadow-xl transition-transform duration-300 hover:-translate-y-2">
                            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400">
                                <Anchor className="h-6 w-6" />
                            </div>
                            <h3 className="mb-2 text-lg font-bold">
                                Prakiraan Wisata Bahari
                            </h3>
                            <p className="mb-4 line-clamp-3 flex-grow text-sm text-muted-foreground">
                                Informasi cuaca kelautan khusus untuk
                                lokasi-lokasi pariwisata bahari.
                            </p>
                            <Link
                                href="/wisata-bahari"
                                className="mt-auto inline-flex items-center text-sm font-medium text-emerald-600 hover:underline dark:text-emerald-400"
                            >
                                Selengkapnya{' '}
                                <ChevronRight className="ml-1 h-4 w-4" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section className="py-16">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col items-center gap-12 lg:flex-row">
                        <div className="w-full lg:w-1/2">
                            <div className="group relative flex aspect-video items-center justify-center overflow-hidden rounded-2xl border bg-slate-200 shadow-lg dark:bg-slate-800">
                                <CloudRain className="h-24 w-24 text-slate-400 opacity-20 transition-transform duration-700 group-hover:scale-110" />
                                <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 to-transparent p-8">
                                    <h4 className="text-lg font-semibold text-white">
                                        Gedung Stasiun Meteorologi Kelas II Maritim Yos Soedarso Ambon
                                    </h4>
                                </div>
                            </div>
                        </div>
                        <div className="w-full lg:w-1/2">
                            <h2 className="mb-6 text-3xl font-bold">
                                Mengenal Lebih Dekat Stasiun Meteorologi Kelas II Maritim Yos Soedarso Ambon
                            </h2>
                            <p className="mb-6 text-lg leading-relaxed text-muted-foreground">
                                Stasiun Meteorologi Kelas II Maritim Yos Soedarso Ambon memiliki tugas
                                pokok melaksanakan pengamatan, pengelolaan data,
                                pelayanan jasa meteorologi maritim, dan
                                pemeliharaan alat meteorologi maritim.
                            </p>
                            <p className="mb-8 leading-relaxed text-muted-foreground">
                                Visi kami adalah mewujudkan BMKG yang handal,
                                tanggap dan mampu dalam mendukung keselamatan
                                pelayaran serta pembangunan nasional di wilayah
                                Maluku yang berkarakteristik kepulauan.
                            </p>
                            <Link href="/sejarah">
                                <Button
                                    variant="outline"
                                    className="h-11 rounded-full px-6"
                                >
                                    Lihat Profil & Sejarah Stasiun
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
