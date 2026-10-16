import { Head } from '@inertiajs/react';
import PublicLayout from '@/layouts/public-layout';
import { useState, useMemo } from 'react';
import { FileText, Calendar, CloudRain, Waves, Anchor, CheckCircle, Clock } from 'lucide-react';

interface DocumentItem {
    id: number;
    title: string;
    category?: string;
    region_code?: string;
    region_number?: number;
    forecast_date?: string;
    period_type?: string;
    file_path: string;
    file_type?: string;
    file_size?: string;
    created_at: string;
}

interface Props {
    documents?: DocumentItem[];
}

export default function Pelabuhan({ documents = [] }: Props) {
    const pelabuhanList = [
        'Pelabuhan Yos Sudarso',
        'Pelabuhan Penyeberangan Galala',
        'Pelabuhan Penyeberangan Poka',
        'Pelabuhan Penyeberangan Hunimua (Liang)',
        'Pelabuhan Penyeberangan Wairiang (Kailolo)',
        'Pelabuhan Penyeberangan Umeputih (Kulur)',
        'Pelabuhan Penyeberangan Wahai',
        'Pelabuhan Penyeberangan Nalahia (Nusa Laut)',
        'Pelabuhan Penyeberangan Jazirah Salahutu (Waai)',
        'Pelabuhan Penyeberangan Amahai Ina Marina (Masohi)',
        'Pelabuhan Penyeberangan Namlea',
        'Pelabuhan Penyeberangan Teluk Bara',
        'Pelabuhan Penyeberangan Waipirit',
        'Pelabuhan Penyeberangan Waisala',
        'Pelabuhan Penyeberangan Wailey',
        'Pelabuhan Penyeberangan Air Nanang',
        'Pelabuhan Penyeberangan Geser',
        'Pelabuhan Penyeberangan Gorom',
        'Pelabuhan Penyeberangan Kesui - Pulau Kasiui',
        'Pelabuhan Penyeberangan Teor',
        'Pelabuhan Penyeberangan Ilwaki',
        'Pelabuhan Penyeberangan Lakor',
        'Pelabuhan Penyeberangan Wonreli (Kisar)',
        'Pelabuhan Penyeberangan Letwurung (Tepa)',
        'Pelabuhan Penyeberangan Sermata',
        'Pelabuhan Penyeberangan Tual',
        'Pelabuhan Penyeberangan Toyando',
        'Pelabuhan Penyeberangan Elat',
        'Pelabuhan Penyeberangan Dobo',
        'Pelabuhan Penyeberangan Benjina',
        'Pelabuhan Penyeberangan Dermaga Lamerang',
        'Pelabuhan Penyeberangan Tabarfane',
        'Pelabuhan Penyeberangan Saumlaki',
        'Pelabuhan Penyeberangan Larat',
        'Pelabuhan Penyeberangan Wunlah',
        'Pelabuhan Banda Neira',
        'Pelabuhan Tulehu',
    ];

    // Deteksi tanggal-tanggal unik yang diunggah
    const { tab1Info, tab2Info } = useMemo(() => {
        // Ambil tanggal prakiraan atau tanggal pembuatan berkas yang unik
        const dateMap = new Map<string, DocumentItem[]>();

        documents.forEach((doc) => {
            const rawDate = doc.forecast_date ? doc.forecast_date.split('T')[0] : doc.created_at.split('T')[0];
            if (!dateMap.has(rawDate)) {
                dateMap.set(rawDate, []);
            }
            dateMap.get(rawDate)!.push(doc);
        });

        // Urutkan tanggal dari yang paling lampau ke paling baru
        const sortedDates = Array.from(dateMap.keys()).sort();

        let date1: string;
        let date2: string;

        if (sortedDates.length >= 2) {
            // Jika ada minimal 2 batch (misal 15 Okt dan 16 Okt)
            date1 = sortedDates[sortedDates.length - 2];
            date2 = sortedDates[sortedDates.length - 1];
        } else if (sortedDates.length === 1) {
            // Hanya 1 batch tanggal diunggah
            date1 = sortedDates[0];
            const d2 = new Date(date1);
            d2.setDate(d2.getDate() + 1);
            date2 = d2.toISOString().split('T')[0];
        } else {
            // Default jika belum ada dokumen
            const now = new Date();
            date1 = now.toISOString().split('T')[0];
            const d2 = new Date(now);
            d2.setDate(d2.getDate() + 1);
            date2 = d2.toISOString().split('T')[0];
        }

        // Format label Tab 1: "[Tgl] [Bulan] [Tahun]" (Contoh: "15 Oktober 2026")
        const d1Obj = new Date(date1);
        const tab1Label = d1Obj.toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        });

        // Format label Tab 2: "[Tgl] [Bulan] [Tahun] - [Tgl+3] [Bulan] [Tahun]" (Contoh: "16 Oktober 2026 - 19 Oktober 2026")
        const d2ObjStart = new Date(date2);
        const d2ObjEnd = new Date(date2);
        d2ObjEnd.setDate(d2ObjEnd.getDate() + 3);

        const tab2Label = `${d2ObjStart.toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        })} - ${d2ObjEnd.toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        })}`;

        return {
            tab1Info: { dateKey: date1, label: tab1Label },
            tab2Info: { dateKey: date2, label: tab2Label },
        };
    }, [documents]);

    const [activeTab, setActiveTab] = useState<'tab1' | 'tab2'>('tab1');

    const pad = (num: number) => num.toString().padStart(3, '0');

    // Helper format waktu pembaharuan WIT
    const formatWitTime = (isoString?: string) => {
        if (!isoString) return '-';
        const d = new Date(isoString);
        // Format: DD-MM-YYYY HH:mm:ss WIT
        const padZ = (n: number) => n.toString().padStart(2, '0');
        const day = padZ(d.getDate());
        const month = padZ(d.getMonth() + 1);
        const year = d.getFullYear();
        const hours = padZ(d.getHours());
        const mins = padZ(d.getMinutes());
        const secs = padZ(d.getSeconds());

        return `${day}-${month}-${year} ${hours}:${mins}:${secs} WIT`;
    };

    return (
        <PublicLayout>
            <Head title="Prakiraan Cuaca Maritim Pelabuhan - BMKG Stamar Ambon" />

            <div className="min-h-screen bg-slate-50 pb-24 dark:bg-[#0B1120]">
                {/* Hero Section */}
                <div className="relative overflow-hidden bg-slate-900 pt-12 pb-16 lg:pt-20 lg:pb-24">
                    <div className="absolute inset-0 opacity-20">
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
                    {/* Decorative Gradients */}
                    <div className="pointer-events-none absolute top-0 left-1/4 h-96 w-96 rounded-full bg-blue-500 opacity-40 mix-blend-screen blur-[128px]"></div>
                    <div className="pointer-events-none absolute right-1/4 bottom-0 h-96 w-96 rounded-full bg-teal-400 opacity-30 mix-blend-screen blur-[128px]"></div>

                    <div className="relative z-10 container mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
                        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-medium tracking-wide text-white uppercase backdrop-blur-md">
                            <Anchor className="h-4 w-4 text-blue-300" />
                            <span>Area Pelayanan 37 Pelabuhan Maluku</span>
                        </div>
                        <h1 className="mb-4 text-3xl font-extrabold tracking-tight text-white md:text-5xl lg:text-6xl">
                            Prakiraan Cuaca Maritim Pelabuhan
                        </h1>
                        <h2 className="mb-6 text-xl font-bold text-blue-300 sm:text-2xl">
                            BMKG Stasiun Meteorologi Maritim Ambon
                        </h2>
                        <p className="mx-auto max-w-2xl text-sm leading-relaxed text-slate-300 sm:text-base">
                            Informasi cuaca maritim, tinggi gelombang, dan angin di 37 titik pelabuhan dan penyeberangan Maluku yang diperbarui setiap hari kerja (Kode AH).
                        </p>
                    </div>
                </div>

                {/* Content Section */}
                <div className="relative z-20 container mx-auto -mt-8 max-w-5xl px-4 sm:px-6 lg:px-8">
                    {/* Modern 2-Tab Switcher persis website lama */}
                    <div className="mb-8 flex justify-center">
                        <div className="inline-flex rounded-2xl border border-slate-200/80 bg-white p-1.5 shadow-xl backdrop-blur-xl dark:border-slate-700/80 dark:bg-slate-800">
                            <button
                                onClick={() => setActiveTab('tab1')}
                                className={`relative flex items-center gap-2 rounded-xl px-5 py-2.5 text-xs sm:text-sm font-bold transition-all duration-200 ${
                                    activeTab === 'tab1'
                                        ? 'bg-blue-600 text-white shadow-md'
                                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-white'
                                }`}
                            >
                                <Calendar className="h-4 w-4" />
                                <span>{tab1Info.label}</span>
                            </button>
                            <button
                                onClick={() => setActiveTab('tab2')}
                                className={`relative flex items-center gap-2 rounded-xl px-5 py-2.5 text-xs sm:text-sm font-bold transition-all duration-200 ${
                                    activeTab === 'tab2'
                                        ? 'bg-blue-600 text-white shadow-md'
                                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-white'
                                }`}
                            >
                                <Waves className="h-4 w-4" />
                                <span>{tab2Info.label}</span>
                            </button>
                        </div>
                    </div>

                    {/* Table Card */}
                    <div className="overflow-hidden rounded-2xl border border-blue-200 bg-white shadow-xl dark:border-slate-700 dark:bg-slate-800">
                        {/* Table Header Decoration */}
                        <div className="flex items-center justify-between border-b border-blue-100 bg-gradient-to-r from-blue-50/70 to-slate-50 px-6 py-4 dark:border-slate-700 dark:bg-slate-800/80">
                            <div className="flex items-center gap-3">
                                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-white shadow-sm">
                                    <Anchor className="h-4 w-4" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base">
                                        Prakiraan Cuaca Pelabuhan — {activeTab === 'tab1' ? tab1Info.label : tab2Info.label}
                                    </h3>
                                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                                        37 Titik Pelabuhan Maluku (Format Resmi AH001 s/d AH037)
                                    </p>
                                </div>
                            </div>
                            <span className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-800 dark:bg-blue-950/70 dark:text-blue-300">
                                <Clock className="h-3.5 w-3.5" />
                                Rilis Harian Stamar
                            </span>
                        </div>

                        {/* Table */}
                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse text-left text-sm">
                                <thead>
                                    <tr className="bg-blue-600 text-white text-xs font-bold uppercase tracking-wider">
                                        <th className="w-14 px-4 py-3.5 text-center">
                                            NO
                                        </th>
                                        <th className="px-5 py-3.5">
                                            NAMA PERAIRAN / PELABUHAN
                                        </th>
                                        <th className="w-36 px-4 py-3.5 text-center">
                                            UNDUH FILE
                                        </th>
                                        <th className="w-56 px-5 py-3.5 text-left">
                                            WAKTU PEMBAHARUAN
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 dark:divide-slate-700/60 font-medium">
                                    {pelabuhanList.map((pelabuhan, index) => {
                                        const regionNumber = index + 1;
                                        const padNumber = pad(regionNumber);
                                        const defaultCode = `AH${padNumber}`;
                                        const activeDateKey = activeTab === 'tab1' ? tab1Info.dateKey : tab2Info.dateKey;

                                        // Cari dokumen yang cocok dengan nomor pelabuhan & tanggal batch aktif
                                        const doc = documents.find((d) => {
                                            const isMatchRegion =
                                                d.region_number === regionNumber ||
                                                (d.region_code && d.region_code.toUpperCase() === defaultCode) ||
                                                new RegExp(`\\bAH[._\\-\\s]?0*${regionNumber}\\b`, 'i').test(d.title || '') ||
                                                new RegExp(`\\bAH[._\\-\\s]?0*${regionNumber}\\b`, 'i').test(d.file_path || '');

                                            if (!isMatchRegion) return false;

                                            // Cocokkan tanggal
                                            const docDate = d.forecast_date ? d.forecast_date.split('T')[0] : d.created_at.split('T')[0];
                                            return docDate === activeDateKey;
                                        }) || documents.find((d) => {
                                            // Fallback jika hanya ada 1 versi diunggah
                                            return (
                                                d.region_number === regionNumber ||
                                                (d.region_code && d.region_code.toUpperCase() === defaultCode) ||
                                                new RegExp(`\\bAH[._\\-\\s]?0*${regionNumber}\\b`, 'i').test(d.title || '') ||
                                                new RegExp(`\\bAH[._\\-\\s]?0*${regionNumber}\\b`, 'i').test(d.file_path || '')
                                            );
                                        });

                                        const type = activeTab === 'tab1' ? '06102026' : '07102026';
                                        const fallbackUrl = `https://stamar-ambon.bmkg.go.id/content/MFY/AH${padNumber}_${type}.pdf`;
                                        const targetUrl = doc ? `/storage/${doc.file_path}` : fallbackUrl;

                                        return (
                                            <tr
                                                key={index}
                                                className="transition-colors hover:bg-blue-50/40 dark:hover:bg-slate-700/40"
                                            >
                                                <td className="px-4 py-3 text-center text-xs text-slate-500 font-mono">
                                                    {regionNumber}
                                                </td>
                                                <td className="px-5 py-3">
                                                    <div className="flex flex-wrap items-center gap-2">
                                                        <span className="font-semibold text-slate-800 dark:text-slate-100">
                                                            {pelabuhan}
                                                        </span>
                                                        <span className="rounded bg-blue-50 px-1.5 py-0.5 font-mono text-[10px] font-bold text-blue-700 border border-blue-200/60 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800">
                                                            {doc?.region_code || defaultCode}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-3 text-center">
                                                    <a
                                                        href={targetUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="font-bold text-blue-600 hover:text-blue-800 underline dark:text-blue-400 dark:hover:text-blue-300 text-xs tracking-wide"
                                                    >
                                                        LIHAT PDF
                                                    </a>
                                                </td>
                                                <td className="px-5 py-3 text-xs text-slate-600 dark:text-slate-300 font-mono">
                                                    {doc ? formatWitTime(doc.created_at) : '-'}
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
}
