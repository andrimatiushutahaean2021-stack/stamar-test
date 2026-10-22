import { Head } from '@inertiajs/react';
import PublicLayout from '@/layouts/public-layout';
import { useState, useEffect, useCallback } from 'react';
import {
    ChevronLeft,
    ChevronRight,
    Maximize2,
    X,
    Layers,
    LayoutGrid,
    SlidersHorizontal,
    Search,
    ExternalLink,
    Compass,
    Eye,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface MFYItem {
    id: number;
    code: string;
    url: string;
    caption: string;
}

export default function MFY() {
    const imagesData: MFYItem[] = [
        {
            id: 1,
            code: 'P.AH.01',
            url: 'https://stamar-ambon.bmkg.go.id/content/MFY/P.AH.01.png',
            caption: 'Perairan Utara P. Buru',
        },
        {
            id: 2,
            code: 'P.AH.02',
            url: 'https://stamar-ambon.bmkg.go.id/content/MFY/P.AH.02.png',
            caption: 'Perairan Selatan P. Buru',
        },
        {
            id: 3,
            code: 'P.AH.03',
            url: 'https://stamar-ambon.bmkg.go.id/content/MFY/P.AH.03.png',
            caption: 'Perairan Seram Bagian Barat',
        },
        {
            id: 4,
            code: 'P.AH.04',
            url: 'https://stamar-ambon.bmkg.go.id/content/MFY/P.AH.04.png',
            caption: 'Perairan P. Ambon - P. Lease',
        },
        {
            id: 5,
            code: 'P.AH.05',
            url: 'https://stamar-ambon.bmkg.go.id/content/MFY/P.AH.05.png',
            caption: 'Perairan Utara Maluku Tengah',
        },
        {
            id: 6,
            code: 'P.AH.06',
            url: 'https://stamar-ambon.bmkg.go.id/content/MFY/P.AH.06.png',
            caption: 'Perairan Selatan Maluku Tengah',
        },
        {
            id: 7,
            code: 'P.AH.07',
            url: 'https://stamar-ambon.bmkg.go.id/content/MFY/P.AH.07.png',
            caption: 'Perairan Seram Bagian Timur (Utara)',
        },
        {
            id: 8,
            code: 'P.AH.08',
            url: 'https://stamar-ambon.bmkg.go.id/content/MFY/P.AH.08.png',
            caption: 'Perairan Seram Bagian Timur (Selatan)',
        },
        {
            id: 9,
            code: 'P.AH.09',
            url: 'https://stamar-ambon.bmkg.go.id/content/MFY/P.AH.09.png',
            caption: 'Perairan Seram Bagian Timur (P. Gorong)',
        },
        {
            id: 10,
            code: 'P.AH.10',
            url: 'https://stamar-ambon.bmkg.go.id/content/MFY/P.AH.10.png',
            caption: 'Perairan Kep. Banda Neira',
        },
        {
            id: 11,
            code: 'P.AH.11',
            url: 'https://stamar-ambon.bmkg.go.id/content/MFY/P.AH.11.png',
            caption: 'Perairan Kep. Kai',
        },
        {
            id: 12,
            code: 'P.AH.12',
            url: 'https://stamar-ambon.bmkg.go.id/content/MFY/P.AH.12.png',
            caption: 'Perairan Utara Kep. Aru',
        },
        {
            id: 13,
            code: 'P.AH.13',
            url: 'https://stamar-ambon.bmkg.go.id/content/MFY/P.AH.13.png',
            caption: 'Perairan Selatan Kep. Aru',
        },
        {
            id: 14,
            code: 'P.AH.14',
            url: 'https://stamar-ambon.bmkg.go.id/content/MFY/P.AH.14.png',
            caption: 'Perairan Barat Kep. Tanimbar',
        },
        {
            id: 15,
            code: 'P.AH.15',
            url: 'https://stamar-ambon.bmkg.go.id/content/MFY/P.AH.15.png',
            caption: 'Perairan Timur Kep. Tanimbar',
        },
        {
            id: 16,
            code: 'P.AH.16',
            url: 'https://stamar-ambon.bmkg.go.id/content/MFY/P.AH.16.png',
            caption: 'Perairan Kep. Babar',
        },
        {
            id: 17,
            code: 'P.AH.17',
            url: 'https://stamar-ambon.bmkg.go.id/content/MFY/P.AH.17.png',
            caption: 'Perairan Kep. Sermata - Kep. Leti',
        },
        {
            id: 18,
            code: 'P.AH.18',
            url: 'https://stamar-ambon.bmkg.go.id/content/MFY/P.AH.18.png',
            caption: 'Perairan Wetar',
        },
    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    const [viewMode, setViewMode] = useState<'carousel' | 'grid'>('carousel');
    const [searchTerm, setSearchTerm] = useState('');
    const [fullscreenIndex, setFullscreenIndex] = useState<number | null>(null);

    const filteredItems = imagesData.filter(
        (item) =>
            item.caption.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.code.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    const totalImages = imagesData.length;

    const prevSlide = useCallback(() => {
        setCurrentIndex((prev) => (prev > 0 ? prev - 1 : totalImages - 1));
    }, [totalImages]);

    const nextSlide = useCallback(() => {
        setCurrentIndex((prev) => (prev < totalImages - 1 ? prev + 1 : 0));
    }, [totalImages]);

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (fullscreenIndex !== null) {
                if (e.key === 'ArrowLeft') {
                    setFullscreenIndex((prev) =>
                        prev !== null && prev > 0 ? prev - 1 : totalImages - 1,
                    );
                } else if (e.key === 'ArrowRight') {
                    setFullscreenIndex((prev) =>
                        prev !== null && prev < totalImages - 1 ? prev + 1 : 0,
                    );
                } else if (e.key === 'Escape') {
                    setFullscreenIndex(null);
                }
            } else if (viewMode === 'carousel') {
                if (e.key === 'ArrowLeft') prevSlide();
                if (e.key === 'ArrowRight') nextSlide();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [fullscreenIndex, viewMode, prevSlide, nextSlide, totalImages]);

    return (
        <PublicLayout>
            <Head title="Prakiraan Cuaca MFY - Visualisasi Perairan Maluku" />

            <div className="min-h-screen bg-slate-50 pb-24 dark:bg-[#070b14]">
                {/* Hero Section */}
                <div className="relative overflow-hidden border-b border-slate-800 bg-slate-900 pt-12 pb-20 lg:pt-20 lg:pb-28">
                    <div className="absolute inset-0 opacity-20">
                        <svg
                            className="h-full w-full"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <defs>
                                <pattern
                                    id="grid-pattern-mfy"
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
                                fill="url(#grid-pattern-mfy)"
                            />
                        </svg>
                    </div>

                    {/* Glowing Accents */}
                    <div className="pointer-events-none absolute top-0 left-1/3 h-[500px] w-[500px] rounded-full bg-blue-500/20 blur-[140px]"></div>
                    <div className="pointer-events-none absolute right-1/4 bottom-0 h-[450px] w-[450px] rounded-full bg-blue-500/20 blur-[140px]"></div>

                    <div className="relative z-10 container mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
                        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-3.5 py-1.5 text-xs font-medium tracking-wide text-blue-300 uppercase shadow-sm ">
                            <Compass className="h-4 w-4 text-blue-400" />
                            <span>Marine Forecast Graphics (MFY)</span>
                        </div>

                        <h1 className="mb-6 text-4xl font-bold tracking-tight text-white sm:text-4xl lg:text-4xl">
                            Peta & Visual Cuaca{' '}
                            <br className="hidden sm:block" />
                            <span className="text-blue-400">
                                Perairan Maluku (MFY)
                            </span>
                        </h1>

                        <p className="mx-auto max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
                            Akses visual grafis ramalan cuaca maritim harian
                            untuk 18 titik wilayah perairan Maluku dengan
                            tampilan carousel interaktif maupun galeri lengkap.
                        </p>
                    </div>
                </div>

                {/* Control Toolbar */}
                <div className="relative z-20 container mx-auto -mt-8 max-w-6xl px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col items-center justify-between gap-4 rounded-lg border border-slate-200/80 bg-white/90 p-4 shadow-sm md:flex-row dark:border-slate-800 dark:bg-slate-900/90">
                        {/* Search Bar */}
                        <div className="relative w-full md:w-96">
                            <Search className="absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-slate-400" />
                            <Input
                                type="text"
                                placeholder="Cari wilayah perairan atau kode (mis: Buru, P.AH.01)..."
                                className="h-11 rounded-lg border-slate-200 bg-slate-100/70 pl-10 text-sm dark:border-slate-700 dark:bg-slate-800/80"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            {searchTerm && (
                                <button
                                    onClick={() => setSearchTerm('')}
                                    className="absolute top-1/2 right-3 flex h-5 w-5 -translate-y-1/2 items-center justify-center rounded-full bg-slate-200 text-xs text-slate-400 hover:text-slate-600 dark:bg-slate-700 dark:hover:text-slate-200"
                                >
                                    ✕
                                </button>
                            )}
                        </div>

                        {/* View Mode Toggle */}
                        <div className="flex w-full items-center justify-end gap-2 md:w-auto">
                            <div className="inline-flex rounded-lg border border-slate-200 bg-slate-100 p-1 dark:border-slate-700 dark:bg-slate-800">
                                <button
                                    onClick={() => setViewMode('carousel')}
                                    className={`flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-semibold transition-all ${
                                        viewMode === 'carousel'
                                            ? 'bg-white text-blue-600 shadow-sm dark:bg-slate-900 dark:text-blue-400'
                                            : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
                                    }`}
                                >
                                    <SlidersHorizontal className="h-3.5 w-3.5" />
                                    <span>Tampilan Slide</span>
                                </button>
                                <button
                                    onClick={() => setViewMode('grid')}
                                    className={`flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-semibold transition-all ${
                                        viewMode === 'grid'
                                            ? 'bg-white text-blue-600 shadow-sm dark:bg-slate-900 dark:text-blue-400'
                                            : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
                                    }`}
                                >
                                    <LayoutGrid className="h-3.5 w-3.5" />
                                    <span>Galeri Grid</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="container mx-auto mt-8 max-w-6xl px-4 sm:px-6 lg:px-8">
                    {/* View Mode 1: CAROUSEL */}
                    {viewMode === 'carousel' && (
                        <div className="space-y-6">
                            <div className="rounded-lg border border-slate-200/80 bg-white p-3 shadow-sm sm:p-6 dark:border-slate-800 dark:bg-slate-900">
                                {/* Image Showcase Box */}
                                <div className="group relative flex aspect-[16/10] items-center justify-center overflow-hidden rounded-lg border border-slate-800 bg-slate-950 sm:aspect-[16/9]">
                                    {/* Main Image */}
                                    <img
                                        src={imagesData[currentIndex].url}
                                        alt={imagesData[currentIndex].caption}
                                        className="max-h-full max-w-full cursor-zoom-in object-contain transition-transform duration-500 group-hover:scale-[1.01]"
                                        onClick={() =>
                                            setFullscreenIndex(currentIndex)
                                        }
                                    />

                                    {/* Top Controls Overlay */}
                                    <div className="pointer-events-none absolute top-4 right-4 left-4 flex items-center justify-between">
                                        <span className="pointer-events-auto rounded-full border border-white/10 bg-black/60 px-3 py-1.5 font-mono text-xs font-semibold text-white shadow-sm ">
                                            {imagesData[currentIndex].code}{' '}
                                            &bull; {currentIndex + 1} /{' '}
                                            {totalImages}
                                        </span>

                                        <div className="pointer-events-auto flex items-center gap-2">
                                            <button
                                                onClick={() =>
                                                    setFullscreenIndex(
                                                        currentIndex,
                                                    )
                                                }
                                                className="rounded-full bg-black/60 p-2.5 text-white shadow-sm transition-all hover:bg-blue-600"
                                                title="Perbesar Layar Penuh"
                                            >
                                                <Maximize2 className="h-4 w-4" />
                                            </button>
                                            <a
                                                href={
                                                    imagesData[currentIndex].url
                                                }
                                                target="_blank"
                                                rel="noreferrer"
                                                className="rounded-full bg-black/60 p-2.5 text-white shadow-sm transition-all hover:bg-blue-600"
                                                title="Buka Gambar Asli"
                                            >
                                                <ExternalLink className="h-4 w-4" />
                                            </a>
                                        </div>
                                    </div>

                                    {/* Navigation Arrow Buttons */}
                                    <button
                                        onClick={prevSlide}
                                        aria-label="Previous image"
                                        className="absolute top-1/2 left-4 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white shadow-sm transition-all hover:bg-blue-600 active:scale-95"
                                    >
                                        <ChevronLeft className="h-6 w-6" />
                                    </button>

                                    <button
                                        onClick={nextSlide}
                                        aria-label="Next image"
                                        className="absolute top-1/2 right-4 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white shadow-sm transition-all hover:bg-blue-600 active:scale-95"
                                    >
                                        <ChevronRight className="h-6 w-6" />
                                    </button>

                                    {/* Bottom Caption Bar */}
                                    <div className="pointer-events-none absolute right-0 bottom-0 left-0 flex flex-col items-center justify-between gap-3 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-4 sm:flex-row sm:p-6">
                                        <div className="text-center sm:text-left">
                                            <p className="mb-0.5 text-xs font-semibold tracking-wider text-blue-400 uppercase">
                                                Wilayah Perairan
                                            </p>
                                            <h2 className="text-lg font-bold text-white sm:text-2xl">
                                                {
                                                    imagesData[currentIndex]
                                                        .caption
                                                }
                                            </h2>
                                        </div>
                                        <Button
                                            size="sm"
                                            onClick={() =>
                                                setFullscreenIndex(currentIndex)
                                            }
                                            className="pointer-events-auto gap-1.5 rounded-lg bg-blue-600 font-semibold text-white shadow-sm hover:bg-blue-500"
                                        >
                                            <Eye className="h-4 w-4" />
                                            Lihat Detail
                                        </Button>
                                    </div>
                                </div>

                                {/* Thumbnail Strip */}
                                <div className="mt-4 border-t border-slate-200/80 pt-4 dark:border-slate-800">
                                    <p className="mb-3 flex items-center justify-between px-1 text-xs font-semibold text-slate-500 dark:text-slate-400">
                                        <span>Pilih Wilayah (1 - 18):</span>
                                        <span className="text-[11px] text-blue-600 dark:text-blue-400">
                                            Gunakan panah &larr; / &rarr;
                                            keyboard
                                        </span>
                                    </p>

                                    <div className="custom-scrollbar flex gap-2.5 overflow-x-auto px-1 pb-3">
                                        {imagesData.map((item, index) => (
                                            <button
                                                key={item.id}
                                                onClick={() =>
                                                    setCurrentIndex(index)
                                                }
                                                className={`group/thumb relative w-24 flex-shrink-0 overflow-hidden rounded-lg border-2 text-left transition-all sm:w-28 ${
                                                    currentIndex === index
                                                        ? 'scale-105 border-blue-500 shadow-sm ring-2 ring-blue-500/30'
                                                        : 'border-slate-200 opacity-60 hover:opacity-100 dark:border-slate-800'
                                                }`}
                                            >
                                                <div className="relative aspect-[16/10] bg-slate-900">
                                                    <img
                                                        src={item.url}
                                                        alt={item.caption}
                                                        className="h-full w-full object-cover"
                                                        loading="lazy"
                                                    />
                                                    <span className="absolute top-1 left-1 rounded bg-black/70 px-1 font-mono text-[9px] text-white">
                                                        {item.code}
                                                    </span>
                                                </div>
                                                <div className="truncate bg-white p-1.5 text-[10px] font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                                                    {item.caption}
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* View Mode 2: GRID GALLERY */}
                    {viewMode === 'grid' && (
                        <div className="space-y-6">
                            {filteredItems.length === 0 ? (
                                <div className="rounded-lg border border-slate-200 bg-white p-12 text-center dark:border-slate-800 dark:bg-slate-900">
                                    <Layers className="mx-auto mb-4 h-12 w-12 text-slate-400" />
                                    <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">
                                        Tidak ada wilayah yang sesuai
                                    </h3>
                                    <p className="mt-1 text-sm text-slate-500">
                                        Coba gunakan kata kunci pencarian lain.
                                    </p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                    {filteredItems.map((item) => (
                                        <div
                                            key={item.id}
                                            className="group flex flex-col overflow-hidden rounded-lg border border-slate-200/80 bg-white shadow-sm transition-all duration-300 hover:border-blue-500/50 hover:shadow-sm dark:border-slate-800 dark:bg-slate-900"
                                        >
                                            {/* Card Image */}
                                            <div
                                                className="relative aspect-[16/10] cursor-pointer overflow-hidden bg-slate-950"
                                                onClick={() => {
                                                    const realIndex =
                                                        imagesData.findIndex(
                                                            (d) =>
                                                                d.id ===
                                                                item.id,
                                                        );
                                                    setFullscreenIndex(
                                                        realIndex >= 0
                                                            ? realIndex
                                                            : 0,
                                                    );
                                                }}
                                            >
                                                <img
                                                    src={item.url}
                                                    alt={item.caption}
                                                    className="h-full w-full object-cover transition-transform duration-500 "
                                                    loading="lazy"
                                                />
                                                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-black/60 via-transparent to-black/30 opacity-0 transition-opacity group-hover:opacity-100">
                                                    <span className="flex translate-y-2 transform items-center gap-1.5 rounded-full bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white shadow-sm transition-transform group-hover:translate-y-0">
                                                        <Maximize2 className="h-3.5 w-3.5" />
                                                        Perbesar
                                                    </span>
                                                </div>
                                                <span className="absolute top-2.5 left-2.5 rounded-md border border-white/10 bg-black/70 px-2 py-0.5 font-mono text-[10px] font-semibold text-white ">
                                                    {item.code}
                                                </span>
                                            </div>

                                            {/* Card Details */}
                                            <div className="flex flex-grow flex-col justify-between p-4">
                                                <div>
                                                    <span className="mb-1 block text-[11px] font-semibold tracking-wider text-blue-600 uppercase dark:text-blue-400">
                                                        Wilayah Perairan{' '}
                                                        {item.id}
                                                    </span>
                                                    <h3 className="line-clamp-2 text-base font-bold text-slate-900 dark:text-white">
                                                        {item.caption}
                                                    </h3>
                                                </div>

                                                <div className="mt-4 flex items-center justify-between gap-2 border-t border-slate-100 pt-3 dark:border-slate-800">
                                                    <button
                                                        onClick={() => {
                                                            const realIndex =
                                                                imagesData.findIndex(
                                                                    (d) =>
                                                                        d.id ===
                                                                        item.id,
                                                                );
                                                            setCurrentIndex(
                                                                realIndex >= 0
                                                                    ? realIndex
                                                                    : 0,
                                                            );
                                                            setViewMode(
                                                                'carousel',
                                                            );
                                                            window.scrollTo({
                                                                top: 250,
                                                                behavior:
                                                                    'smooth',
                                                            });
                                                        }}
                                                        className="text-xs font-medium text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400"
                                                    >
                                                        Buka di Slide &rarr;
                                                    </button>
                                                    <a
                                                        href={item.url}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-white"
                                                        title="Buka Tab Baru"
                                                    >
                                                        <ExternalLink className="h-4 w-4" />
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Fullscreen Zoom Lightbox Modal */}
            {fullscreenIndex !== null && (
                <div
                    className="fixed inset-0 z-[100] flex animate-in items-center justify-center bg-slate-950/95 p-2 duration-200 fade-in sm:p-6"
                    onClick={() => setFullscreenIndex(null)}
                >
                    {/* Header Controls */}
                    <div className="pointer-events-none absolute top-4 right-4 left-4 z-20 flex items-center justify-between">
                        <div className="pointer-events-auto rounded-full border border-white/10 bg-black/60 px-4 py-2 text-xs font-semibold text-white ">
                            {imagesData[fullscreenIndex].code} &mdash;{' '}
                            {imagesData[fullscreenIndex].caption} (
                            {fullscreenIndex + 1} / {totalImages})
                        </div>

                        <button
                            className="pointer-events-auto flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-all hover:rotate-90 hover:bg-white/20"
                            onClick={() => setFullscreenIndex(null)}
                            title="Tutup (Esc)"
                        >
                            <X className="h-5 w-5" />
                        </button>
                    </div>

                    {/* Left/Right Buttons */}
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            setFullscreenIndex((prev) =>
                                prev !== null && prev > 0
                                    ? prev - 1
                                    : totalImages - 1,
                            );
                        }}
                        className="absolute top-1/2 left-4 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white transition-all hover:bg-blue-600"
                    >
                        <ChevronLeft className="h-6 w-6" />
                    </button>

                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            setFullscreenIndex((prev) =>
                                prev !== null && prev < totalImages - 1
                                    ? prev + 1
                                    : 0,
                            );
                        }}
                        className="absolute top-1/2 right-4 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white transition-all hover:bg-blue-600"
                    >
                        <ChevronRight className="h-6 w-6" />
                    </button>

                    {/* Full Image */}
                    <div
                        className="relative flex max-h-[85vh] max-w-[95vw] items-center justify-center"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <img
                            src={imagesData[fullscreenIndex].url}
                            alt={imagesData[fullscreenIndex].caption}
                            className="max-h-[85vh] max-w-full animate-in rounded-lg object-contain shadow-sm duration-200 zoom-in-95"
                        />
                    </div>
                </div>
            )}

            <style
                dangerouslySetInnerHTML={{
                    __html: `
                .custom-scrollbar::-webkit-scrollbar {
                    height: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background-color: #cbd5e1;
                    border-radius: 20px;
                }
                .dark .custom-scrollbar::-webkit-scrollbar-thumb {
                    background-color: #334155;
                }
            `,
                }}
            />
        </PublicLayout>
    );
}
