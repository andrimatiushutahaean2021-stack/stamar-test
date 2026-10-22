import { Head } from '@inertiajs/react';
import PublicLayout from '@/layouts/public-layout';
import {
    Camera,
    Calendar,
    MapPin,
    ZoomIn,
    X,
    Sparkles,
} from 'lucide-react';
import { useState, useMemo } from 'react';

export default function Galeri() {
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [activeLightbox, setActiveLightbox] = useState<{
        image?: string;
        url?: string;
        title: string;
        caption?: string;
        date: string;
        location: string;
        desc: string;
        categoryName: string;
    } | null>(null);

    const galleryItems = [
        {
            id: 1,
            title: 'Kunjungan Lapangan & Pengamatan Port Meteorological Officer',
            category: 'operasional',
            categoryName: 'Operasional & Pelayaran',
            date: 'Oktober 2026',
            location: 'Pelabuhan Slamet Riyadi',
            image: '/images/galeri/galeri-1.jpg',
            caption: 'Port Meteorological Officer',
            desc: 'Kegiatan Port Meteorological Officer (PMO) dalam rangka koordinasi teknis, pengamatan cuaca laut, dan keselamatan pelayaran bersama mitra maritim di atas kapal.',
        },
        {
            id: 2,
            title: 'Upacara Peringatan HUT Kemerdekaan Republik Indonesia Ke-81',
            category: 'kegiatan',
            categoryName: 'Kegiatan Stasiun',
            date: '17 Agustus 2026',
            location: 'Halaman Kantor Stamet Penerbangan Pattimura Ambon',
            image: '/images/galeri/galeri-2.jpg',
            caption: 'Peringatan HUT RI Ke-81',
            desc: 'Peringatan HUT ke-81 Republik Indonesia bersama di halaman kantor Stamet Penerbangan Pattimura Ambon dengan busana adat nusantara.',
        },
        {
            id: 3,
            title: 'Edukasi Cuaca Maritim - BMKG Goes To School',
            category: 'edukasi',
            categoryName: 'Edukasi & Sosialisasi',
            date: 'September 2026',
            location: 'Aula SMA Negeri 1 Ambon',
            image: '/images/galeri/galeri-3.jpg',
            caption: 'BMKG Goes To School',
            desc: 'Sosialisasi dan edukasi pengenalan cuaca maritim, pemahaman bahaya gelombang laut, dan mitigasi dini bencana pesisir kepada siswa-siswi SMA Negeri 1 Ambon.',
        },
        {
            id: 4,
            title: 'Apel Bersama Peringatan Hari Meteorologi Klimatologi dan Geofisika Ke-79',
            category: 'kegiatan',
            categoryName: 'Kegiatan Stasiun',
            date: 'Juli 2026',
            location: 'Stasiun Meteorologi Maritim Yos Soedarso Ambon',
            image: '/images/galeri/galeri-4.jpg',
            caption: 'Peringatan HMKG 2026',
            desc: 'Apel bersama peringatan HMKG 2026 dengan semangat BMKG Hebat, Indonesia Berdaulat, Adil dan Makmur.',
        },
        {
            id: 5,
            title: 'Aksi Bersih Pantai & Pelabuhan oleh Tim Maritimers Ambon',
            category: 'kemitraan',
            categoryName: 'Aksi Lingkungan & Kemitraan',
            date: 'Agustus 2026',
            location: 'Dermaga Kontainer Pelabuhan Yos Sudarso',
            image: '/images/galeri/galeri-5.jpg',
            caption: 'Aksi Bersih Pelabuhan Maritim',
            desc: 'Aksi nyata peduli kelestarian laut dan kebersihan dermaga pelabuhan yang diinisiasi oleh komunitas Maritimers BMKG Stamar Ambon.',
        },
        {
            id: 6,
            title: 'Sekolah Lapang Cuaca Nelayan (SLCN) Kota Ambon 2026',
            category: 'slcn',
            categoryName: 'Sekolah Lapang (SLCN)',
            date: '2026',
            location: 'Balai Kota Ambon',
            image: '/images/galeri/galeri-6.jpg',
            caption: 'SLCN Kota Ambon 2026',
            desc: 'Pelaksanaan Sekolah Lapang Cuaca Nelayan (SLCN) 2026 di Balai Kota Ambon guna meningkatkan literasi informasi cuaca maritim dan keselamatan melaut para nelayan.',
        },
    ];

    const filteredItems = useMemo(() => {
        if (selectedCategory === 'all') return galleryItems;
        return galleryItems.filter((item) => item.category === selectedCategory);
    }, [galleryItems, selectedCategory]);

    return (
        <PublicLayout>
            <Head title="Galeri Foto Kegiatan - BMKG Stamar Ambon" />

            <div className="min-h-screen bg-slate-50 pb-24 dark:bg-[#0B1120]">
                {/* Hero Header */}
                <div className="relative overflow-hidden bg-slate-900 pt-14 pb-20 text-white lg:pt-20 lg:pb-24">
                    <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="mx-auto max-w-3xl text-center">
                            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/10 px-4 py-1.5 text-xs font-semibold text-blue-300">
                                <Camera className="h-3.5 w-3.5" />
                                <span>Dokumentasi Resmi Kegiatan Stasiun</span>
                            </div>
                            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-4xl">
                                Galeri Foto Stamar Ambon
                            </h1>
                            <p className="mt-4 text-sm text-slate-300 sm:text-base">
                                Rekam jejak kegiatan Sekolah Lapang Cuaca Nelayan (SLCN), operasional cuaca maritim, edukasi BMKG Goes to School, aksi lingkungan, serta agenda resmi BMKG di Maluku.
                            </p>

                            {/* Category Filter Pills */}
                            <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
                                {[
                                    { key: 'all', label: 'Semua Foto' },
                                    { key: 'slcn', label: 'Sekolah Lapang (SLCN)' },
                                    { key: 'operasional', label: 'Operasional Pelayaran' },
                                    { key: 'edukasi', label: 'Edukasi Sekolah' },
                                    { key: 'kemitraan', label: 'Aksi Lingkungan' },
                                    { key: 'kegiatan', label: 'Kegiatan Stasiun' },
                                ].map((tab) => (
                                    <button
                                        key={tab.key}
                                        onClick={() => setSelectedCategory(tab.key)}
                                        className={`rounded-lg px-4 py-2 text-xs font-bold transition-all ${
                                            selectedCategory === tab.key
                                                ? 'bg-blue-500 text-white shadow-sm'
                                                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
                                        }`}
                                    >
                                        {tab.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content Cards */}
                <div className="container mx-auto -mt-8 px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {filteredItems.map((item) => (
                            <div
                                key={item.id}
                                className="group flex flex-col overflow-hidden rounded-lg border border-slate-200/80 bg-white shadow-sm transition-all duration-300 hover:shadow-sm dark:border-slate-800 dark:bg-slate-900"
                            >
                                <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-800">
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="h-full w-full object-cover transition-transform duration-500 "
                                        loading="lazy"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60" />
                                    <div className="absolute top-3 left-3 flex flex-wrap items-center gap-1.5">
                                        <span className="rounded-full bg-blue-600/95 px-3 py-1 text-[10px] font-bold text-white shadow-sm">
                                            {item.categoryName}
                                        </span>
                                        {item.caption && (
                                            <span className="rounded-full bg-slate-900/80 px-2.5 py-1 text-[10px] font-medium text-slate-200 shadow-sm border border-white/10">
                                                {item.caption}
                                            </span>
                                        )}
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => setActiveLightbox(item)}
                                        className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-lg bg-white/90 text-slate-900 shadow-sm transition-transform "
                                        title="Perbesar Foto"
                                    >
                                        <ZoomIn className="h-4 w-4" />
                                    </button>
                                </div>
                                <div className="flex flex-1 flex-col justify-between p-5">
                                    <div>
                                        <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2 dark:text-white dark:group-hover:text-blue-400">
                                            {item.title}
                                        </h3>
                                        <p className="mt-2 text-xs leading-relaxed text-slate-600 line-clamp-3 dark:text-slate-400">
                                            {item.desc}
                                        </p>
                                    </div>
                                    <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3 text-[11px] text-slate-500 dark:border-slate-800 dark:text-slate-400">
                                        <span className="flex items-center gap-1">
                                            <Calendar className="h-3.5 w-3.5 text-blue-500" />
                                            {item.date}
                                        </span>
                                        <span className="flex items-center gap-1 font-medium">
                                            <MapPin className="h-3.5 w-3.5 text-blue-500" />
                                            {item.location.split(',')[0]}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Lightbox Modal */}
            {activeLightbox && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4 animate-in fade-in duration-200"
                    onClick={() => setActiveLightbox(null)}
                >
                    <div
                        className="relative max-h-[90vh] max-w-4xl w-full overflow-hidden rounded-lg border border-slate-700 bg-slate-950 p-6 shadow-sm text-white"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="mb-4 flex items-center justify-between border-b border-slate-800 pb-3">
                            <div>
                                <div className="flex items-center gap-2">
                                    <span className="rounded-full bg-blue-500/20 px-2.5 py-0.5 text-[10px] font-bold text-blue-300">
                                        {activeLightbox.categoryName}
                                    </span>
                                    {activeLightbox.caption && (
                                        <span className="rounded-full bg-slate-800 px-2.5 py-0.5 text-[10px] font-medium text-slate-300 border border-slate-700">
                                            {activeLightbox.caption}
                                        </span>
                                    )}
                                </div>
                                <h3 className="text-base font-bold text-white sm:text-lg mt-1.5">
                                    {activeLightbox.title}
                                </h3>
                                <p className="text-xs text-slate-400 mt-0.5">
                                    {activeLightbox.date} • {activeLightbox.location}
                                </p>
                            </div>
                            <button
                                type="button"
                                onClick={() => setActiveLightbox(null)}
                                className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        <div className="max-h-[65vh] overflow-auto flex items-center justify-center rounded-lg bg-black/50 p-2">
                            <img
                                src={activeLightbox.image || activeLightbox.url}
                                alt={activeLightbox.title}
                                className="max-h-[63vh] w-auto rounded-lg object-contain shadow-sm"
                            />
                        </div>

                        <p className="mt-3 text-xs text-slate-300 leading-relaxed">
                            {activeLightbox.desc}
                        </p>
                    </div>
                </div>
            )}
        </PublicLayout>
    );
}
