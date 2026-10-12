import { Head } from '@inertiajs/react';
import PublicLayout from '@/layouts/public-layout';
import { useState } from 'react';
import { Search, Wind, CloudRain, Sun, Navigation } from 'lucide-react';
import { Input } from '@/components/ui/input';

export default function Penyeberangan() {
    const [searchTerm, setSearchTerm] = useState('');

    const routes = [
        {
            id: 1,
            route: 'Ambon - Namlea',
            weather: 'Hujan Ringan',
            windDir: 'Timur Laut - Tenggara',
            windSpeed: '5 - 15',
            wave: '1.25 - 2.50',
            category: 'Sedang',
        },
        {
            id: 2,
            route: 'Hunimua - Waipirit',
            weather: 'Berawan',
            windDir: 'Timur - Tenggara',
            windSpeed: '4 - 10',
            wave: '0.50 - 1.25',
            category: 'Rendah',
        },
        {
            id: 3,
            route: 'Galala - Namlea',
            weather: 'Hujan Sedang',
            windDir: 'Timur Laut - Timur',
            windSpeed: '10 - 20',
            wave: '1.25 - 2.50',
            category: 'Sedang',
        },
        {
            id: 4,
            route: 'Ambon - Banda',
            weather: 'Hujan Lebat',
            windDir: 'Tenggara - Selatan',
            windSpeed: '15 - 25',
            wave: '2.50 - 4.00',
            category: 'Tinggi',
        },
        {
            id: 5,
            route: 'Tulehu - Amahai',
            weather: 'Cerah Berawan',
            windDir: 'Timur - Tenggara',
            windSpeed: '5 - 12',
            wave: '0.50 - 1.25',
            category: 'Rendah',
        },
        {
            id: 6,
            route: 'Tual - Dobo',
            weather: 'Berawan Tebal',
            windDir: 'Timur - Tenggara',
            windSpeed: '10 - 20',
            wave: '1.25 - 2.50',
            category: 'Sedang',
        },
        {
            id: 7,
            route: 'Saumlaki - Tual',
            weather: 'Hujan Ringan',
            windDir: 'Tenggara - Selatan',
            windSpeed: '15 - 25',
            wave: '2.50 - 4.00',
            category: 'Tinggi',
        },
        {
            id: 8,
            route: 'Wahai - Fakfak',
            weather: 'Berawan',
            windDir: 'Timur Laut - Timur',
            windSpeed: '5 - 15',
            wave: '0.50 - 1.25',
            category: 'Rendah',
        },
    ];

    const filteredRoutes = routes.filter((r) =>
        r.route.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    const getWeatherIcon = (weather: string) => {
        if (weather.includes('Hujan'))
            return <CloudRain className="h-5 w-5 text-blue-400" />;
        if (weather.includes('Cerah'))
            return <Sun className="h-5 w-5 text-yellow-400" />;
        return <CloudRain className="h-5 w-5 text-slate-400" />; // Fallback for Berawan
    };

    const getWaveColor = (category: string) => {
        switch (category) {
            case 'Rendah':
                return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800';
            case 'Sedang':
                return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800';
            case 'Tinggi':
                return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800';
            default:
                return 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400';
        }
    };

    return (
        <PublicLayout>
            <Head title="Prakiraan Cuaca Rute Penyeberangan" />

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
                    <div className="pointer-events-none absolute top-0 right-1/4 h-96 w-96 rounded-full bg-teal-500 opacity-40 mix-blend-screen blur-[128px]"></div>
                    <div className="pointer-events-none absolute bottom-0 left-1/4 h-96 w-96 rounded-full bg-blue-400 opacity-30 mix-blend-screen blur-[128px]"></div>

                    <div className="relative z-10 container mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
                        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-medium tracking-wide text-white uppercase backdrop-blur-md">
                            <Navigation className="h-4 w-4 text-teal-300" />
                            <span>Area Penyeberangan Kapal Ferry</span>
                        </div>
                        <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-white md:text-5xl lg:text-6xl">
                            Prakiraan Cuaca <br className="hidden md:block" />
                            <span className="bg-gradient-to-r from-teal-300 to-blue-400 bg-clip-text text-transparent">
                                Rute Penyeberangan
                            </span>
                        </h1>
                        <p className="mx-auto max-w-2xl text-lg leading-relaxed text-slate-300">
                            Pantau kondisi cuaca, arah angin, dan tinggi
                            gelombang secara langsung untuk berbagai rute
                            penyeberangan antar pulau.
                        </p>
                    </div>
                </div>

                {/* Content Section */}
                <div className="relative z-20 container mx-auto -mt-8 max-w-6xl px-4 sm:px-6 lg:px-8">
                    {/* Search & Filters */}
                    <div className="mb-8 flex items-center gap-4 rounded-2xl border border-slate-200/50 bg-white/80 p-4 shadow-lg backdrop-blur-xl dark:border-slate-700/50 dark:bg-slate-800/80">
                        <div className="relative flex-grow">
                            <Search className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-slate-400" />
                            <Input
                                type="text"
                                placeholder="Cari rute pelabuhan (contoh: Ambon - Namlea)..."
                                className="w-full rounded-xl border-slate-200 bg-white pl-10 dark:border-slate-700 dark:bg-slate-900"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Table Card */}
                    <div className="overflow-hidden rounded-3xl border border-slate-200/50 bg-white/80 shadow-2xl backdrop-blur-xl dark:border-slate-700/50 dark:bg-slate-800/80">
                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse text-left">
                                <thead>
                                    <tr className="border-b border-slate-200 bg-slate-50/30 dark:border-slate-700 dark:bg-slate-900/30">
                                        <th className="w-16 px-6 py-5 text-center text-xs font-semibold tracking-wider text-slate-500 uppercase dark:text-slate-400">
                                            No
                                        </th>
                                        <th className="px-6 py-5 text-xs font-semibold tracking-wider text-slate-500 uppercase dark:text-slate-400">
                                            Rute Perjalanan
                                        </th>
                                        <th className="px-6 py-5 text-xs font-semibold tracking-wider text-slate-500 uppercase dark:text-slate-400">
                                            Cuaca
                                        </th>
                                        <th className="px-6 py-5 text-xs font-semibold tracking-wider text-slate-500 uppercase dark:text-slate-400">
                                            Angin (Knot)
                                        </th>
                                        <th className="px-6 py-5 text-center text-xs font-semibold tracking-wider text-slate-500 uppercase dark:text-slate-400">
                                            Gelombang (M)
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50">
                                    {filteredRoutes.map((item, index) => (
                                        <tr
                                            key={item.id}
                                            className="group transition-all duration-200 hover:bg-teal-50/50 dark:hover:bg-slate-700/30"
                                        >
                                            <td className="px-6 py-5 text-center">
                                                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 text-xs font-medium text-slate-500 transition-colors group-hover:bg-teal-100 group-hover:text-teal-600 dark:bg-slate-800 dark:text-slate-400">
                                                    {index + 1}
                                                </span>
                                            </td>
                                            <td className="px-6 py-5 font-bold text-slate-800 transition-colors group-hover:text-teal-600 dark:text-slate-200 dark:group-hover:text-teal-400">
                                                {item.route}
                                            </td>
                                            <td className="px-6 py-5">
                                                <div className="flex items-center gap-2">
                                                    {getWeatherIcon(
                                                        item.weather,
                                                    )}
                                                    <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                                                        {item.weather}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-5">
                                                <div className="flex flex-col">
                                                    <span className="flex items-center gap-1 text-sm font-medium text-slate-700 dark:text-slate-200">
                                                        <Wind className="h-3 w-3 text-blue-500" />{' '}
                                                        {item.windSpeed} Knot
                                                    </span>
                                                    <span className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                                                        {item.windDir}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-5 text-center">
                                                <div className="flex flex-col items-center justify-center gap-2">
                                                    <span className="text-sm font-bold text-slate-800 dark:text-slate-200">
                                                        {item.wave}
                                                    </span>
                                                    <span
                                                        className={`rounded-md border px-2.5 py-1 text-[10px] font-bold tracking-wider uppercase ${getWaveColor(item.category)}`}
                                                    >
                                                        {item.category}
                                                    </span>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    {filteredRoutes.length === 0 && (
                                        <tr>
                                            <td
                                                colSpan={5}
                                                className="px-6 py-12 text-center text-slate-500 dark:text-slate-400"
                                            >
                                                Tidak ada rute yang cocok dengan
                                                pencarian Anda.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
}
