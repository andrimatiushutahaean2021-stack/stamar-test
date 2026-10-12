import { Head } from '@inertiajs/react';
import PublicLayout from '@/layouts/public-layout';
import { useState } from 'react';
import { FileText, Calendar, CloudRain, Waves, Anchor } from 'lucide-react';

export default function Pelabuhan() {
    const [activeTab, setActiveTab] = useState<'daily' | 'weekly'>('daily');

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

    const today = new Date();
    const todayStr = today.toLocaleDateString('id-ID', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
    });
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const inThreeDays = new Date(today);
    inThreeDays.setDate(inThreeDays.getDate() + 3);
    const weeklyStr = `${tomorrow.toLocaleDateString('id-ID', { day: '2-digit', month: 'long' })} - ${inThreeDays.toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' })}`;

    const pad = (num: number) => num.toString().padStart(3, '0');

    return (
        <PublicLayout>
            <Head title="Prakiraan Cuaca Pelabuhan" />

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
                            <span>Area Pelayanan Maritim</span>
                        </div>
                        <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-white md:text-5xl lg:text-6xl">
                            Prakiraan Cuaca <br className="hidden md:block" />
                            <span className="bg-gradient-to-r from-blue-400 to-teal-300 bg-clip-text text-transparent">
                                Pelabuhan Maluku
                            </span>
                        </h1>
                        <p className="mx-auto max-w-2xl text-lg leading-relaxed text-slate-300">
                            Akses dokumen PDF rincian tinggi gelombang, arah
                            angin, dan peringatan dini secara terpusat untuk
                            keselamatan aktivitas pelayaran Anda.
                        </p>
                    </div>
                </div>

                {/* Content Section */}
                <div className="relative z-20 container mx-auto -mt-8 max-w-6xl px-4 sm:px-6 lg:px-8">
                    {/* Modern Tabs */}
                    <div className="mb-10 flex justify-center">
                        <div className="inline-flex rounded-full border border-slate-200/50 bg-white p-1.5 shadow-lg backdrop-blur-xl dark:border-slate-700/50 dark:bg-slate-800">
                            <button
                                onClick={() => setActiveTab('daily')}
                                className={`relative flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300 ${
                                    activeTab === 'daily'
                                        ? 'scale-100 transform bg-blue-600 text-white shadow-md'
                                        : 'scale-95 text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-700/50 dark:hover:text-slate-200'
                                }`}
                            >
                                <Calendar className="h-4 w-4" />
                                Harian ({todayStr})
                            </button>
                            <button
                                onClick={() => setActiveTab('weekly')}
                                className={`relative flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300 ${
                                    activeTab === 'weekly'
                                        ? 'scale-100 transform bg-blue-600 text-white shadow-md'
                                        : 'scale-95 text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-700/50 dark:hover:text-slate-200'
                                }`}
                            >
                                <Waves className="h-4 w-4" />
                                Mingguan ({weeklyStr})
                            </button>
                        </div>
                    </div>

                    {/* Table Card */}
                    <div className="overflow-hidden rounded-3xl border border-slate-200/50 bg-white/80 shadow-2xl backdrop-blur-xl dark:border-slate-700/50 dark:bg-slate-800/80">
                        {/* Table Header Decoration */}
                        <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50/50 px-6 py-5 dark:border-slate-700 dark:bg-slate-800/50">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                                    <CloudRain className="h-5 w-5" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-900 dark:text-white">
                                        Daftar Dokumen PDF
                                    </h3>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">
                                        Diperbarui pada{' '}
                                        {activeTab === 'daily'
                                            ? '17:59 WIT'
                                            : '15:56 WIT'}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Table */}
                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse text-left">
                                <thead>
                                    <tr className="border-b border-slate-200 bg-slate-50/30 dark:border-slate-700 dark:bg-slate-900/30">
                                        <th className="w-16 px-6 py-4 text-center text-xs font-semibold tracking-wider text-slate-500 uppercase dark:text-slate-400">
                                            No
                                        </th>
                                        <th className="px-6 py-4 text-xs font-semibold tracking-wider text-slate-500 uppercase dark:text-slate-400">
                                            Nama Perairan
                                        </th>
                                        <th className="w-40 px-6 py-4 text-center text-xs font-semibold tracking-wider text-slate-500 uppercase dark:text-slate-400">
                                            Dokumen
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50">
                                    {pelabuhanList.map((pelabuhan, index) => {
                                        const type =
                                            activeTab === 'daily'
                                                ? '06102026'
                                                : '07102026';
                                        const pdfUrl = `https://stamar-ambon.bmkg.go.id/content/MFY/AH${pad(index + 1)}_${type}.pdf`;

                                        return (
                                            <tr
                                                key={index}
                                                className="group transition-all duration-200 hover:bg-blue-50/50 dark:hover:bg-slate-700/30"
                                            >
                                                <td className="px-6 py-4 text-center">
                                                    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 text-xs font-medium text-slate-500 transition-colors group-hover:bg-blue-100 group-hover:text-blue-600 dark:bg-slate-800 dark:text-slate-400">
                                                        {index + 1}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 font-medium text-slate-800 transition-colors group-hover:text-blue-600 dark:text-slate-200 dark:group-hover:text-blue-400">
                                                    {pelabuhan}
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    <a
                                                        href={pdfUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2 text-xs font-bold text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-600 hover:shadow-md dark:bg-blue-600 dark:hover:bg-blue-500"
                                                    >
                                                        <FileText className="h-4 w-4 opacity-80" />
                                                        UNDUH PDF
                                                    </a>
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
