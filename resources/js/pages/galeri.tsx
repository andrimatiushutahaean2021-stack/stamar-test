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
        url: string;
        title: string;
        date: string;
        location: string;
        desc: string;
        categoryName: string;
    } | null>(null);

    const galleryItems = [
        {
            id: 1,
            title: 'Sekolah Lapang Cuaca Nelayan (SLCN) Wilayah Teluk Ambon',
            category: 'slcn',
            categoryName: 'Sekolah Lapang (SLCN)',
            date: '18 Oktober 2026',
            location: 'Dermaga Latuhalat, Teluk Ambon',
            image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1000&q=80',
            desc: 'Edukasi pemahaman navigasi cuaca laut, membaca tabel tinggi gelombang, dan mitigasi bahaya awan badai bagi nelayan tradisional.',
        },
        {
            id: 2,
            title: 'Pemeliharaan & Kalibrasi Sensor AWS Maritim Stasiun',
            category: 'operasional',
            categoryName: 'Operasional & Alat',
            date: '25 September 2026',
            location: 'Stasiun Meteorologi Latuhalat',
            image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1000&q=80',
            desc: 'Teknisi BMKG melakukan kalibrasi sensor anemometer, barometer digital, dan pemancar data satelit otomatis.',
        },
        {
            id: 3,
            title: 'Koordinasi Keselamatan Pelayaran bersama KSOP & Pelindo',
            category: 'kemitraan',
            categoryName: 'Kemitraan Stakeholder',
            date: '14 September 2026',
            location: 'Pelabuhan Yos Sudarso Ambon',
            image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1000&q=80',
            desc: 'Rapat koordinasi kesiapsiagaan peringatan dini gelombang tinggi guna menjamin zero-accident kapal penyeberangan.',
        },
        {
            id: 4,
            title: 'Kunjungan Edukasi Maritim Mahasiswa Fakultas Perikanan & Kelautan',
            category: 'edukasi',
            categoryName: 'Edukasi & Sosialisasi',
            date: '28 Agustus 2026',
            location: 'Ruang Forecaster Stamar Ambon',
            image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1000&q=80',
            desc: 'Pengenalan teknologi radar cuaca maritim dan pemodelan BMKG Ocean Forecast System (OFS) kepada generasi muda.',
        },
        {
            id: 5,
            title: 'Pengamatan Lapangan Dinamika Suhu & Arus Perairan Banda Neira',
            category: 'operasional',
            categoryName: 'Operasional & Alat',
            date: '10 Agustus 2026',
            location: 'Perairan Banda Neira, Maluku Tengah',
            image: 'https://images.unsplash.com/photo-1498084393753-b411b2d26b34?auto=format&fit=crop&w=1000&q=80',
            desc: 'Survei dan validasi data in-situ kondisi oseanografi laut dalam untuk verifikasi model gelombang maritim BMKG.',
        },
        {
            id: 6,
            title: 'Sosialisasi Keselamatan Berlayar bagi Nakhoda Kapal Cepat',
            category: 'slcn',
            categoryName: 'Sekolah Lapang (SLCN)',
            date: '22 Juli 2026',
            location: 'Pelabuhan Tulehu, Maluku Tengah',
            image: 'https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?auto=format&fit=crop&w=1000&q=80',
            desc: 'Penyerahan panduan praktis membaca cuaca pelabuhan dan peringatan dini sebelum keberangkatan rute Tulehu - Kailolo.',
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
                            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-teal-400/30 bg-teal-500/10 px-4 py-1.5 text-xs font-semibold text-teal-300">
                                <Camera className="h-3.5 w-3.5" />
                                <span>Dokumentasi Resmi Kegiatan Stasiun</span>
                            </div>
                            <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
                                Galeri Foto Stamar Ambon
                            </h1>
                            <p className="mt-4 text-sm text-slate-300 sm:text-base">
                                Rekam jejak pelaksanaan Sekolah Lapang Cuaca Nelayan (SLCN), pemeliharaan alat meteorologi kelautan, serta kolaborasi antar lembaga maritim di Maluku.
                            </p>

                            {/* Category Filter Pills */}
                            <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
                                {[
                                    { key: 'all', label: 'Semua Foto' },
                                    { key: 'slcn', label: 'Sekolah Lapang (SLCN)' },
                                    { key: 'operasional', label: 'Operasional & Alat' },
                                    { key: 'kemitraan', label: 'Kemitraan Stakeholder' },
                                    { key: 'edukasi', label: 'Edukasi & Sosialisasi' },
                                ].map((tab) => (
                                    <button
                                        key={tab.key}
                                        onClick={() => setSelectedCategory(tab.key)}
                                        className={`rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                                            selectedCategory === tab.key
                                                ? 'bg-teal-500 text-white shadow-lg'
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
                                className="group flex flex-col overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900"
                            >
                                <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-800">
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        loading="lazy"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60" />
                                    <div className="absolute top-3 left-3">
                                        <span className="rounded-full bg-teal-600/90 px-3 py-1 text-[10px] font-bold text-white shadow-md">
                                            {item.categoryName}
                                        </span>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => setActiveLightbox(item)}
                                        className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-xl bg-white/90 text-slate-900 shadow-lg backdrop-blur-sm transition-transform hover:scale-110"
                                        title="Perbesar Foto"
                                    >
                                        <ZoomIn className="h-4 w-4" />
                                    </button>
                                </div>
                                <div className="flex flex-1 flex-col justify-between p-5">
                                    <div>
                                        <h3 className="text-base font-bold text-slate-900 group-hover:text-teal-600 transition-colors line-clamp-2 dark:text-white dark:group-hover:text-teal-400">
                                            {item.title}
                                        </h3>
                                        <p className="mt-2 text-xs leading-relaxed text-slate-600 line-clamp-3 dark:text-slate-400">
                                            {item.desc}
                                        </p>
                                    </div>
                                    <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3 text-[11px] text-slate-500 dark:border-slate-800 dark:text-slate-400">
                                        <span className="flex items-center gap-1">
                                            <Calendar className="h-3.5 w-3.5 text-teal-500" />
                                            {item.date}
                                        </span>
                                        <span className="flex items-center gap-1 font-medium">
                                            <MapPin className="h-3.5 w-3.5 text-teal-500" />
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
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4 backdrop-blur-md animate-in fade-in duration-200"
                    onClick={() => setActiveLightbox(null)}
                >
                    <div
                        className="relative max-h-[90vh] max-w-4xl w-full overflow-hidden rounded-3xl border border-slate-700 bg-slate-950 p-6 shadow-2xl text-white"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="mb-4 flex items-center justify-between border-b border-slate-800 pb-3">
                            <div>
                                <span className="rounded-full bg-teal-500/20 px-2.5 py-0.5 text-[10px] font-bold text-teal-300">
                                    {activeLightbox.categoryName}
                                </span>
                                <h3 className="text-base font-bold text-white sm:text-lg mt-1">
                                    {activeLightbox.title}
                                </h3>
                                <p className="text-xs text-slate-400 mt-0.5">
                                    {activeLightbox.date} • {activeLightbox.location}
                                </p>
                            </div>
                            <button
                                type="button"
                                onClick={() => setActiveLightbox(null)}
                                className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        <div className="max-h-[65vh] overflow-auto flex items-center justify-center rounded-2xl bg-black/50 p-2">
                            <img
                                src={activeLightbox.url}
                                alt={activeLightbox.title}
                                className="max-h-[63vh] w-auto rounded-xl object-contain shadow-2xl"
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
