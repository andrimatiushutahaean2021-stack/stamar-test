import { Head } from '@inertiajs/react';
import PublicLayout from '@/layouts/public-layout';
import { useState, useMemo } from 'react';
import {
    Calendar,
    CloudRain,
    Waves,
    MapPin,
    Clock,
} from 'lucide-react';

import ForecastCoverBanner, { CoverDocumentItem } from '@/components/forecast-cover-banner';

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
    documents?: DocumentItem[];
    coverDocuments?: CoverDocumentItem[];
    coverDocument?: CoverDocumentItem | null;
}

export default function Provinsi({
    documents = [],
    coverDocuments = [],
    coverDocument = null,
}: Props) {
    const wilayahList = [
        'Perairan Utara P. Buru',
        'Perairan Selatan P. Buru',
        'Perairan Seram Bagian Barat',
        'Perairan P. Ambon - P. Lease',
        'Perairan Utara Maluku Tengah',
        'Perairan Selatan Maluku Tengah',
        'Perairan Seram Bagian Timur (Utara)',
        'Perairan Seram Bagian Timur (Selatan)',
        'Perairan Seram Bagian Timur (P. Gorong)',
        'Perairan Kep. Banda Neira',
        'Perairan Kep. Kai',
        'Perairan Utara Kep. Aru',
        'Perairan Selatan Kep. Aru',
        'Perairan Barat Kep. Tanimbar',
        'Perairan Timur Kep. Tanimbar',
        'Perairan Kep. Babar',
        'Perairan Kep. Sermata - Kep. Leti',
        'Perairan Wetar',
    ];

    // Deteksi tanggal-tanggal unik yang diunggah
    const { tab1Info, tab2Info } = useMemo(() => {
        const dateMap = new Map<string, DocumentItem[]>();

        documents.forEach((doc) => {
            const rawDate = doc.forecast_date ? doc.forecast_date.split('T')[0] : doc.created_at.split('T')[0];
            if (!dateMap.has(rawDate)) {
                dateMap.set(rawDate, []);
            }
            dateMap.get(rawDate)!.push(doc);
        });

        const sortedDates = Array.from(dateMap.keys()).sort();

        let date1: string;
        let date2: string;

        if (sortedDates.length >= 2) {
            date1 = sortedDates[sortedDates.length - 2];
            date2 = sortedDates[sortedDates.length - 1];
        } else if (sortedDates.length === 1) {
            date1 = sortedDates[0];
            const d2 = new Date(date1);
            d2.setDate(d2.getDate() + 1);
            date2 = d2.toISOString().split('T')[0];
        } else {
            const now = new Date();
            date1 = now.toISOString().split('T')[0];
            const d2 = new Date(now);
            d2.setDate(d2.getDate() + 1);
            date2 = d2.toISOString().split('T')[0];
        }

        const d1Obj = new Date(date1);
        const tab1Label = d1Obj.toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        });

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

    // Helper format waktu pembaharuan WIT
    const formatWitTime = (isoString?: string) => {
        if (!isoString) return '-';
        const d = new Date(isoString);
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
            <Head title="Prakiraan Cuaca Perairan Provinsi - BMKG Stamar Ambon" />

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
                    <div className="pointer-events-none absolute top-0 left-1/4 h-96 w-96 rounded-full bg-amber-500 opacity-40 mix-blend-screen blur-[128px]"></div>
                    <div className="pointer-events-none absolute right-1/4 bottom-0 h-96 w-96 rounded-full bg-orange-400 opacity-30 mix-blend-screen blur-[128px]"></div>

                    <div className="relative z-10 container mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
                        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-medium tracking-wide text-white uppercase ">
                            <MapPin className="h-4 w-4 text-amber-300" />
                            <span>Area Perairan Provinsi Maluku</span>
                        </div>
                        <h1 className="mb-4 text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-4xl">
                            Prakiraan Cuaca Perairan Provinsi
                        </h1>
                        <h2 className="mb-6 text-xl font-bold text-amber-300 sm:text-2xl">
                            BMKG Stasiun Meteorologi Maritim Ambon
                        </h2>
                        <p className="mx-auto max-w-2xl text-sm leading-relaxed text-slate-300 sm:text-base">
                            Informasi rincian prakiraan cuaca, tinggi gelombang, arah angin, serta peringatan dini di seluruh wilayah perairan Provinsi Maluku secara berkala.
                        </p>
                    </div>
                </div>

                {/* Content Section */}
                <div className="relative z-20 container mx-auto -mt-8 max-w-5xl px-4 sm:px-6 lg:px-8">
                    {/* Official BMKG Cover Image (Diatas Kolom Tanggal) */}
                    <ForecastCoverBanner
                        type="provinsi"
                        activeTab={activeTab}
                        tab1Date={tab1Info.dateKey}
                        tab2Date={tab2Info.dateKey}
                        coverDocuments={coverDocuments}
                        coverDocument={coverDocument}
                    />

                    {/* Modern 2-Tab Switcher */}
                    <div className="mb-8 flex justify-center">
                        <div className="inline-flex rounded-lg border border-slate-200/80 bg-white p-1.5 shadow-sm dark:border-slate-700/80 dark:bg-slate-800">
                            <button
                                onClick={() => setActiveTab('tab1')}
                                className={`relative flex items-center gap-2 rounded-lg px-5 py-2.5 text-xs sm:text-sm font-bold transition-all duration-200 ${
                                    activeTab === 'tab1'
                                        ? 'bg-amber-600 text-white shadow-sm'
                                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-white'
                                }`}
                            >
                                <Calendar className="h-4 w-4" />
                                <span>{tab1Info.label}</span>
                            </button>
                            <button
                                onClick={() => setActiveTab('tab2')}
                                className={`relative flex items-center gap-2 rounded-lg px-5 py-2.5 text-xs sm:text-sm font-bold transition-all duration-200 ${
                                    activeTab === 'tab2'
                                        ? 'bg-amber-600 text-white shadow-sm'
                                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-white'
                                }`}
                            >
                                <Waves className="h-4 w-4" />
                                <span>{tab2Info.label}</span>
                            </button>
                        </div>
                    </div>

                    {/* Table Card */}
                    <div className="overflow-hidden rounded-lg border border-amber-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800">
                        {/* Table Header Decoration */}
                        <div className="flex items-center justify-between border-b border-amber-100 bg-slate-50 px-6 py-4 dark:border-slate-700 dark:bg-slate-800/80">
                            <div className="flex items-center gap-3">
                                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-600 text-white shadow-sm">
                                    <CloudRain className="h-4 w-4" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base">
                                         Prakiraan Cuaca Perairan — {activeTab === 'tab1' ? tab1Info.label : tab2Info.label}
                                     </h3>
                                     <p className="text-[11px] text-slate-500 dark:text-slate-400">
                                         Daftar Wilayah Perairan Maluku
                                     </p>
                                 </div>
                            </div>
                            <span className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-800 dark:bg-amber-950/70 dark:text-amber-300">
                                <Clock className="h-3.5 w-3.5" />
                                Rilis Harian Stamar
                            </span>
                        </div>

                        {/* Table */}
                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse text-left text-sm">
                                <thead>
                                    <tr className="bg-amber-600 text-white text-xs font-bold uppercase tracking-wider">
                                        <th className="w-14 px-4 py-3.5 text-center">
                                            NO
                                        </th>
                                        <th className="px-5 py-3.5">
                                            NAMA PERAIRAN
                                        </th>
                                        <th className="w-44 px-4 py-3.5 text-center">
                                            LIHAT PRAKIRAAN
                                        </th>
                                        <th className="w-56 px-5 py-3.5 text-left">
                                            WAKTU PEMBAHARUAN
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 dark:divide-slate-700/60 font-medium">
                                    {wilayahList.map((wilayah, index) => {
                                        const regionNumber = index + 1;
                                        const padNumber = regionNumber.toString().padStart(3, '0');
                                        const defaultCode = `P_AH${padNumber}`;
                                        const activeDateKey = activeTab === 'tab1' ? tab1Info.dateKey : tab2Info.dateKey;

                                        // Cari dokumen yang cocok dengan nomor perairan & tab aktif
                                        const doc = documents.find((d) => {
                                            const isMatchRegion =
                                                d.region_number === regionNumber ||
                                                (d.region_code && d.region_code.toUpperCase() === defaultCode) ||
                                                new RegExp(`\\bP[._\\-\\s]?AH[._\\-\\s]?0*${regionNumber}\\b`, 'i').test(d.title || '') ||
                                                new RegExp(`\\bP[._\\-\\s]?AH[._\\-\\s]?0*${regionNumber}\\b`, 'i').test(d.file_path || '');

                                            if (!isMatchRegion) return false;

                                            const docDate = d.forecast_date ? d.forecast_date.split('T')[0] : d.created_at.split('T')[0];
                                            if (tab1Info.dateKey !== tab2Info.dateKey) {
                                                return docDate === activeDateKey;
                                            }
                                            if (activeTab === 'tab1') {
                                                return docDate === tab1Info.dateKey || d.period_type === 'daily';
                                            } else {
                                                return docDate === tab2Info.dateKey || d.period_type === 'weekly';
                                            }
                                        }) || (tab1Info.dateKey === tab2Info.dateKey ? documents.find((d) => {
                                            return (
                                                d.region_number === regionNumber ||
                                                (d.region_code && d.region_code.toUpperCase() === defaultCode) ||
                                                new RegExp(`\\bP[._\\-\\s]?AH[._\\-\\s]?0*${regionNumber}\\b`, 'i').test(d.title || '') ||
                                                new RegExp(`\\bP[._\\-\\s]?AH[._\\-\\s]?0*${regionNumber}\\b`, 'i').test(d.file_path || '')
                                            );
                                        }) : undefined);

                                        return (
                                            <tr
                                                key={index}
                                                className="transition-colors hover:bg-amber-50/40 dark:hover:bg-slate-700/40"
                                            >
                                                <td className="px-4 py-3 text-center text-xs text-slate-500 font-mono">
                                                    {regionNumber}
                                                </td>
                                                <td className="px-5 py-3">
                                                    <span className="font-semibold text-slate-800 dark:text-slate-100">
                                                        {wilayah}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-3 text-center">
                                                    {doc ? (
                                                        <a
                                                            href={`/storage/${doc.file_path}`}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="font-bold text-amber-600 hover:text-amber-800 underline dark:text-amber-400 dark:hover:text-amber-300 text-xs tracking-wide"
                                                        >
                                                            LIHAT PRAKIRAAN
                                                        </a>
                                                    ) : (
                                                        <span className="text-xs text-slate-400 dark:text-slate-500">
                                                            -
                                                        </span>
                                                    )}
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
