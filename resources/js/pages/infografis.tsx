import { Head } from '@inertiajs/react';
import PublicLayout from '@/layouts/public-layout';
import {
    Image as ImageIcon,
    Calendar,
    ZoomIn,
    X,
    Sparkles,
    Search,
    MapPin,
    ArrowUpRight,
    Layers,
    Clock,
} from 'lucide-react';
import { useState, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface DocumentItem {
    id: number;
    title: string;
    category: string;
    forecast_date?: string;
    description?: string;
    file_path: string;
    file_type?: string;
    file_size?: string;
    created_at: string;
}

interface Props {
    documents?: DocumentItem[];
}

export default function Infografis({ documents = [] }: Props) {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeModalImage, setActiveModalImage] = useState<{
        url: string;
        title: string;
        date: string;
        desc?: string;
    } | null>(null);

    // Mockup default infografis jika belum ada unggahan dari admin
    const defaultInfografis = [
        {
            id: 101,
            title: 'Prakiraan Cuaca Perairan & Tinggi Gelombang Maluku',
            forecast_date: new Date().toISOString().split('T')[0],
            created_at: new Date().toISOString(),
            description: 'Peta rilis harian tinggi gelombang, arah angin, dan sebaran awan konvektif di 18 wilayah perairan Maluku.',
            file_path: 'https://images.unsplash.com/photo-1534088568595-a066f410bcda?auto=format&fit=crop&w=1200&q=80',
            file_type: 'jpg',
            file_size: '1.8 MB',
            isExternal: true,
        },
        {
            id: 102,
            title: 'Infografis Potensi Gelombang Tinggi Laut Banda & Kep. Tanimbar',
            forecast_date: new Date().toISOString().split('T')[0],
            created_at: new Date().toISOString(),
            description: 'Peringatan dini visual tinggi gelombang 2.5 - 4.0 meter untuk pelayaran kapal cepat dan nelayan tradisional.',
            file_path: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
            file_type: 'jpg',
            file_size: '2.1 MB',
            isExternal: true,
        },
        {
            id: 103,
            title: 'Infografis Kecepatan & Arah Angin Permukaan Laut Maluku',
            forecast_date: new Date().toISOString().split('T')[0],
            created_at: new Date().toISOString(),
            description: 'Pola sirkulasi angin timuran yang mendominasi perairan Maluku Tengah, Tenggara, dan Kepulauan Aru.',
            file_path: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80',
            file_type: 'jpg',
            file_size: '1.5 MB',
            isExternal: true,
        },
    ];

    const displayItems = useMemo(() => {
        if (documents.length > 0) {
            return documents.map((doc) => ({
                id: doc.id,
                title: doc.title,
                forecast_date: doc.forecast_date || doc.created_at.split('T')[0],
                created_at: doc.created_at,
                description: doc.description || 'Infografis visual rilis resmi Stasiun Meteorologi Kelas II Maritim Yos Soedarso Ambon.',
                file_path: `/storage/${doc.file_path}`,
                file_type: doc.file_type || 'image',
                file_size: doc.file_size || 'Gambar',
                isExternal: false,
            }));
        }
        return defaultInfografis;
    }, [documents]);

    const filteredItems = useMemo(() => {
        return displayItems.filter(
            (item) =>
                item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [displayItems, searchTerm]);

    return (
        <PublicLayout>
            <Head title="Infografis Cuaca Visual & Peta Rilis - BMKG Stamar Ambon" />

            <div className="min-h-screen bg-slate-50 pb-24 dark:bg-[#0B1120]">
                {/* Hero Header */}
                <div className="relative overflow-hidden bg-slate-900 pt-14 pb-20 text-white lg:pt-20 lg:pb-28">
                    <div className="absolute inset-0 opacity-15">
                        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
                            <defs>
                                <pattern id="dots" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
                                    <circle fill="currentColor" cx="2" cy="2" r="1.5" />
                                </pattern>
                            </defs>
                            <rect width="100%" height="100%" fill="url(#dots)" />
                        </svg>
                    </div>

                    <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="mx-auto max-w-3xl text-center">
                            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-indigo-400/30 bg-indigo-500/10 px-4 py-1.5 text-xs font-semibold text-indigo-300 backdrop-blur-md">
                                <Sparkles className="h-3.5 w-3.5 text-indigo-400" />
                                <span>Publikasi Visual & Peta Rilis Harian</span>
                            </div>
                            <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
                                Infografis Cuaca Maritim
                            </h1>
                            <p className="mt-4 text-base text-slate-300 sm:text-lg">
                                Ringkasan kondisi cuaca perairan, tinggi gelombang, serta dinamika angin Maluku dalam format visual beresolusi tinggi yang mudah dipahami.
                            </p>

                            {/* Search Bar */}
                            <div className="mt-8 mx-auto max-w-md">
                                <div className="relative">
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                    <Input
                                        type="text"
                                        placeholder="Cari judul infografis atau tema peta..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="h-12 w-full rounded-2xl border-white/20 bg-slate-800/80 pl-11 pr-4 text-sm text-white shadow-xl placeholder:text-slate-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/20"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content Section */}
                <div className="container mx-auto -mt-10 px-4 sm:px-6 lg:px-8">
                    {filteredItems.length > 0 ? (
                        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                            {filteredItems.map((item) => (
                                <div
                                    key={item.id}
                                    className="group flex flex-col overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl dark:border-slate-800 dark:bg-slate-900"
                                >
                                    {/* Thumbnail Image Container */}
                                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-800">
                                        <img
                                            src={item.file_path}
                                            alt={item.title}
                                            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                                            loading="lazy"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 transition-opacity group-hover:opacity-40" />

                                        {/* Badge Tanggal */}
                                        <div className="absolute top-3.5 left-3.5">
                                            <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-900/85 px-3 py-1 text-xs font-semibold text-white shadow-lg backdrop-blur-md">
                                                <Calendar className="h-3 w-3 text-indigo-400" />
                                                {new Date(item.forecast_date).toLocaleDateString('id-ID', {
                                                    day: 'numeric',
                                                    month: 'short',
                                                    year: 'numeric',
                                                })}
                                            </span>
                                        </div>

                                        {/* Overlay Quick Zoom Button */}
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setActiveModalImage({
                                                    url: item.file_path,
                                                    title: item.title,
                                                    date: new Date(item.forecast_date).toLocaleDateString('id-ID', {
                                                        day: 'numeric',
                                                        month: 'long',
                                                        year: 'numeric',
                                                    }),
                                                    desc: item.description,
                                                })
                                            }
                                            className="absolute bottom-3.5 right-3.5 flex h-10 w-10 items-center justify-center rounded-2xl bg-white/90 text-slate-900 shadow-xl backdrop-blur-md transition-all hover:scale-110 hover:bg-white dark:bg-slate-900/90 dark:text-white"
                                            title="Perbesar Tampilan"
                                        >
                                            <ZoomIn className="h-4 w-4" />
                                        </button>
                                    </div>

                                    {/* Content Card Body */}
                                    <div className="flex flex-1 flex-col justify-between p-6">
                                        <div>
                                            <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-2 dark:text-white dark:group-hover:text-indigo-400">
                                                {item.title}
                                            </h3>
                                            <p className="mt-2 text-xs leading-relaxed text-slate-600 line-clamp-3 dark:text-slate-400">
                                                {item.description}
                                            </p>
                                        </div>

                                        <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4 dark:border-slate-800">
                                            <span className="text-[11px] font-mono text-slate-400">
                                                {item.file_size}
                                            </span>

                                            <div className="flex items-center gap-2">
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        setActiveModalImage({
                                                            url: item.file_path,
                                                            title: item.title,
                                                            date: new Date(item.forecast_date).toLocaleDateString('id-ID', {
                                                                day: 'numeric',
                                                                month: 'long',
                                                                year: 'numeric',
                                                            }),
                                                            desc: item.description,
                                                        })
                                                    }
                                                    className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 px-3.5 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-indigo-500 transition-colors"
                                                >
                                                    <ZoomIn className="h-3.5 w-3.5" />
                                                    <span>Lihat Infografis</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
                            <ImageIcon className="h-12 w-12 text-slate-400 opacity-40 mb-3" />
                            <h3 className="text-base font-bold text-slate-900 dark:text-white">
                                Tidak ada infografis yang sesuai pencarian
                            </h3>
                            <p className="mt-1 text-xs text-slate-500 max-w-sm">
                                Coba gunakan kata kunci lain atau bersihkan kotak pencarian.
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* Lightbox Modal Image Preview */}
            {activeModalImage && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4 backdrop-blur-md animate-in fade-in duration-200"
                    onClick={() => setActiveModalImage(null)}
                >
                    <div
                        className="relative max-h-[90vh] max-w-5xl w-full overflow-hidden rounded-3xl border border-slate-700 bg-slate-950 p-6 shadow-2xl text-white"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="mb-4 flex items-center justify-between border-b border-slate-800 pb-3">
                            <div>
                                <h3 className="text-base font-bold text-white sm:text-lg">
                                    {activeModalImage.title}
                                </h3>
                                <p className="text-xs text-slate-400 mt-0.5">
                                    Tanggal Rilis: {activeModalImage.date}
                                </p>
                            </div>

                            <div className="flex items-center gap-2">
                                <button
                                    type="button"
                                    onClick={() => setActiveModalImage(null)}
                                    className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white"
                                >
                                    <X className="h-5 w-5" />
                                </button>
                            </div>
                        </div>

                        <div className="max-h-[70vh] overflow-auto flex items-center justify-center rounded-2xl bg-black/60 p-2">
                            <img
                                src={activeModalImage.url}
                                alt={activeModalImage.title}
                                className="max-h-[68vh] w-auto rounded-lg object-contain"
                            />
                        </div>

                        {activeModalImage.desc && (
                            <p className="mt-3 text-xs text-slate-400">
                                {activeModalImage.desc}
                            </p>
                        )}
                    </div>
                </div>
            )}
        </PublicLayout>
    );
}
