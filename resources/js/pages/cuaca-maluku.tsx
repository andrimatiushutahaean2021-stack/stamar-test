import { Head } from '@inertiajs/react';
import PublicLayout from '@/layouts/public-layout';
import {
    CloudRain,
    Sun,
    Cloud,
    CloudLightning,
    Wind,
    Droplets,
    Thermometer,
    Compass,
    MapPin,
    Calendar,
    Search,
    ExternalLink,
    Clock,
    Sparkles,
} from 'lucide-react';
import { useState, useMemo } from 'react';
import { Input } from '@/components/ui/input';

interface CityWeather {
    id: string;
    cityName: string;
    regency: string;
    condition: string;
    temp: number;
    tempMin: number;
    tempMax: number;
    humidity: number;
    windSpeed: string;
    windDir: string;
    iconType: 'sun' | 'rain' | 'cloud' | 'lightning';
    detailUrl: string;
    forecast3Days: {
        day: string;
        condition: string;
        temp: string;
    }[];
}

export default function CuacaMaluku() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCityId, setSelectedCityId] = useState<string | null>(null);

    const cityWeatherList: CityWeather[] = [
        {
            id: 'ambon',
            cityName: 'Kota Ambon',
            regency: 'Pusat Ibukota Provinsi Maluku',
            condition: 'Cerah Berawan',
            temp: 29,
            tempMin: 24,
            tempMax: 31,
            humidity: 78,
            windSpeed: '18 km/jam',
            windDir: 'Tenggara',
            iconType: 'sun',
            detailUrl: 'https://www.bmkg.go.id/cuaca/prakiraan-cuaca.bmkg?Kota=Ambon&Prov=Maluku',
            forecast3Days: [
                { day: 'Besok', condition: 'Hujan Ringan', temp: '24°C - 30°C' },
                { day: 'Lusa', condition: 'Berawan Tebal', temp: '24°C - 31°C' },
                { day: 'H+3', condition: 'Cerah Berawan', temp: '25°C - 31°C' },
            ],
        },
        {
            id: 'masohi',
            cityName: 'Masohi',
            regency: 'Kabupaten Maluku Tengah',
            condition: 'Hujan Ringan',
            temp: 27,
            tempMin: 23,
            tempMax: 30,
            humidity: 84,
            windSpeed: '15 km/jam',
            windDir: 'Selatan',
            iconType: 'rain',
            detailUrl: 'https://www.bmkg.go.id/cuaca/prakiraan-cuaca.bmkg?Kota=Masohi&Prov=Maluku',
            forecast3Days: [
                { day: 'Besok', condition: 'Cerah Berawan', temp: '23°C - 31°C' },
                { day: 'Lusa', condition: 'Hujan Ringan', temp: '23°C - 29°C' },
                { day: 'H+3', condition: 'Berawan', temp: '24°C - 30°C' },
            ],
        },
        {
            id: 'namlea',
            cityName: 'Namlea',
            regency: 'Kabupaten Buru',
            condition: 'Cerah Berawan',
            temp: 30,
            tempMin: 24,
            tempMax: 32,
            humidity: 72,
            windSpeed: '12 km/jam',
            windDir: 'Timur Laut',
            iconType: 'sun',
            detailUrl: 'https://www.bmkg.go.id/cuaca/prakiraan-cuaca.bmkg?Kota=Namlea&Prov=Maluku',
            forecast3Days: [
                { day: 'Besok', condition: 'Cerah Berawan', temp: '24°C - 32°C' },
                { day: 'Lusa', condition: 'Cerah', temp: '24°C - 33°C' },
                { day: 'H+3', condition: 'Berawan', temp: '25°C - 31°C' },
            ],
        },
        {
            id: 'tual',
            cityName: 'Kota Tual',
            regency: 'Kepulauan Kei',
            condition: 'Berawan',
            temp: 28,
            tempMin: 25,
            tempMax: 31,
            humidity: 80,
            windSpeed: '22 km/jam',
            windDir: 'Timur',
            iconType: 'cloud',
            detailUrl: 'https://www.bmkg.go.id/cuaca/prakiraan-cuaca.bmkg?Kota=Tual&Prov=Maluku',
            forecast3Days: [
                { day: 'Besok', condition: 'Hujan Ringan', temp: '24°C - 30°C' },
                { day: 'Lusa', condition: 'Cerah Berawan', temp: '25°C - 31°C' },
                { day: 'H+3', condition: 'Cerah Berawan', temp: '25°C - 31°C' },
            ],
        },
        {
            id: 'dobo',
            cityName: 'Dobo',
            regency: 'Kabupaten Kepulauan Aru',
            condition: 'Hujan Petir',
            temp: 26,
            tempMin: 23,
            tempMax: 29,
            humidity: 88,
            windSpeed: '25 km/jam',
            windDir: 'Tenggara',
            iconType: 'lightning',
            detailUrl: 'https://www.bmkg.go.id/cuaca/prakiraan-cuaca.bmkg?Kota=Dobo&Prov=Maluku',
            forecast3Days: [
                { day: 'Besok', condition: 'Hujan Sedang', temp: '23°C - 29°C' },
                { day: 'Lusa', condition: 'Hujan Ringan', temp: '24°C - 30°C' },
                { day: 'H+3', condition: 'Berawan', temp: '24°C - 30°C' },
            ],
        },
        {
            id: 'saumlaki',
            cityName: 'Saumlaki',
            regency: 'Kabupaten Kepulauan Tanimbar',
            condition: 'Berawan',
            temp: 28,
            tempMin: 24,
            tempMax: 31,
            humidity: 79,
            windSpeed: '24 km/jam',
            windDir: 'Timur - Tenggara',
            iconType: 'cloud',
            detailUrl: 'https://www.bmkg.go.id/cuaca/prakiraan-cuaca.bmkg?Kota=Saumlaki&Prov=Maluku',
            forecast3Days: [
                { day: 'Besok', condition: 'Berawan Tebal', temp: '24°C - 30°C' },
                { day: 'Lusa', condition: 'Hujan Ringan', temp: '24°C - 29°C' },
                { day: 'H+3', condition: 'Cerah Berawan', temp: '25°C - 31°C' },
            ],
        },
        {
            id: 'bula',
            cityName: 'Bula',
            regency: 'Kabupaten Seram Bagian Timur',
            condition: 'Cerah Berawan',
            temp: 29,
            tempMin: 24,
            tempMax: 31,
            humidity: 76,
            windSpeed: '16 km/jam',
            windDir: 'Timur',
            iconType: 'sun',
            detailUrl: 'https://www.bmkg.go.id/cuaca/prakiraan-cuaca.bmkg?Kota=Bula&Prov=Maluku',
            forecast3Days: [
                { day: 'Besok', condition: 'Cerah Berawan', temp: '24°C - 31°C' },
                { day: 'Lusa', condition: 'Hujan Ringan', temp: '24°C - 30°C' },
                { day: 'H+3', condition: 'Berawan', temp: '24°C - 31°C' },
            ],
        },
        {
            id: 'piru',
            cityName: 'Piru',
            regency: 'Kabupaten Seram Bagian Barat',
            condition: 'Hujan Ringan',
            temp: 27,
            tempMin: 23,
            tempMax: 30,
            humidity: 82,
            windSpeed: '14 km/jam',
            windDir: 'Selatan',
            iconType: 'rain',
            detailUrl: 'https://www.bmkg.go.id/cuaca/prakiraan-cuaca.bmkg?Kota=Piru&Prov=Maluku',
            forecast3Days: [
                { day: 'Besok', condition: 'Berawan', temp: '23°C - 30°C' },
                { day: 'Lusa', condition: 'Cerah Berawan', temp: '24°C - 31°C' },
                { day: 'H+3', condition: 'Cerah', temp: '24°C - 32°C' },
            ],
        },
        {
            id: 'tiakur',
            cityName: 'Tiakur (Kisar)',
            regency: 'Kabupaten Maluku Barat Daya',
            condition: 'Cerah',
            temp: 31,
            tempMin: 25,
            tempMax: 33,
            humidity: 68,
            windSpeed: '20 km/jam',
            windDir: 'Tenggara',
            iconType: 'sun',
            detailUrl: 'https://www.bmkg.go.id/cuaca/prakiraan-cuaca.bmkg?Kota=Tiakur&Prov=Maluku',
            forecast3Days: [
                { day: 'Besok', condition: 'Cerah', temp: '25°C - 33°C' },
                { day: 'Lusa', condition: 'Cerah Berawan', temp: '25°C - 32°C' },
                { day: 'H+3', condition: 'Cerah Berawan', temp: '25°C - 32°C' },
            ],
        },
        {
            id: 'namrole',
            cityName: 'Namrole / Leksula',
            regency: 'Kabupaten Buru Selatan',
            condition: 'Berawan',
            temp: 28,
            tempMin: 24,
            tempMax: 30,
            humidity: 80,
            windSpeed: '17 km/jam',
            windDir: 'Tenggara',
            iconType: 'cloud',
            detailUrl: 'https://www.bmkg.go.id/cuaca/prakiraan-cuaca.bmkg?Kota=Namrole&Prov=Maluku',
            forecast3Days: [
                { day: 'Besok', condition: 'Hujan Ringan', temp: '24°C - 30°C' },
                { day: 'Lusa', condition: 'Berawan', temp: '24°C - 30°C' },
                { day: 'H+3', condition: 'Cerah Berawan', temp: '25°C - 31°C' },
            ],
        },
    ];

    const filteredCities = useMemo(() => {
        return cityWeatherList.filter(
            (c) =>
                c.cityName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                c.regency.toLowerCase().includes(searchTerm.toLowerCase()) ||
                c.condition.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [cityWeatherList, searchTerm]);

    const getWeatherIcon = (type: CityWeather['iconType']) => {
        switch (type) {
            case 'sun':
                return <Sun className="h-9 w-9 text-amber-400 animate-spin-slow" />;
            case 'rain':
                return <CloudRain className="h-9 w-9 text-blue-400" />;
            case 'lightning':
                return <CloudLightning className="h-9 w-9 text-yellow-400" />;
            case 'cloud':
            default:
                return <Cloud className="h-9 w-9 text-slate-300" />;
        }
    };

    return (
        <PublicLayout>
            <Head title="Prakiraan Cuaca 10 Kota & Kabupaten Maluku - BMKG Stamar Ambon" />

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
                            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/10 px-4 py-1.5 text-xs font-semibold text-blue-300 ">
                                <Sparkles className="h-3.5 w-3.5 text-blue-400" />
                                <span>Prakiraan Cuaca Wilayah Darat Maluku</span>
                            </div>
                            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-4xl">
                                Cuaca 10 Kota / Kabupaten Maluku
                            </h1>
                            <p className="mt-4 text-base text-slate-300 sm:text-lg">
                                Pantau suhu udara, kelembapan, kecepatan angin, dan kondisi cuaca di seluruh pusat wilayah kabupaten/kota se-Provinsi Maluku.
                            </p>

                            {/* Search Bar */}
                            <div className="mt-8 mx-auto max-w-md">
                                <div className="relative">
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                    <Input
                                        type="text"
                                        placeholder="Cari nama kota (contoh: Ambon, Tual, Dobo, Masohi)..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="h-12 w-full rounded-lg border-white/20 bg-slate-800/80 pl-11 pr-4 text-sm text-white shadow-sm placeholder:text-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Cities Grid Section */}
                <div className="container mx-auto -mt-10 px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {filteredCities.map((city) => (
                            <div
                                key={city.id}
                                className="group flex flex-col justify-between overflow-hidden rounded-lg border border-slate-200/80 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-sm dark:border-slate-800 dark:bg-slate-900"
                            >
                                <div>
                                    {/* City & Regency Header */}
                                    <div className="flex items-start justify-between gap-3">
                                        <div>
                                            <h3 className="text-xl font-bold text-slate-900 group-hover:text-primary transition-colors dark:text-white">
                                                {city.cityName}
                                            </h3>
                                            <p className="text-xs text-slate-500 font-medium dark:text-slate-400">
                                                {city.regency}
                                            </p>
                                        </div>
                                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 dark:bg-blue-500/20 shadow-inner">
                                            {getWeatherIcon(city.iconType)}
                                        </div>
                                    </div>

                                    {/* Temperature & Condition */}
                                    <div className="mt-5 flex items-baseline justify-between">
                                        <div className="flex items-baseline gap-1">
                                            <span className="text-4xl font-bold text-slate-900 dark:text-white">
                                                {city.temp}
                                            </span>
                                            <span className="text-xl font-bold text-blue-600 dark:text-blue-400">°C</span>
                                        </div>
                                        <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-blue-800 dark:bg-blue-950/60 dark:text-blue-300">
                                            {city.condition}
                                        </span>
                                    </div>

                                    {/* Weather Metrics */}
                                    <div className="mt-5 grid grid-cols-2 gap-2 text-xs">
                                        <div className="flex items-center gap-2 rounded-lg bg-slate-50 p-2.5 dark:bg-slate-800/60">
                                            <Droplets className="h-4 w-4 text-blue-500 shrink-0" />
                                            <div>
                                                <span className="text-[10px] text-slate-400 block">Kelembapan</span>
                                                <span className="font-bold text-slate-700 dark:text-slate-200">{city.humidity}%</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 rounded-lg bg-slate-50 p-2.5 dark:bg-slate-800/60">
                                            <Wind className="h-4 w-4 text-blue-500 shrink-0" />
                                            <div>
                                                <span className="text-[10px] text-slate-400 block">Angin</span>
                                                <span className="font-bold text-slate-700 dark:text-slate-200">{city.windSpeed}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* 3 Days Quick Forecast Glance */}
                                    <div className="mt-4 rounded-lg border border-slate-100 bg-slate-50/50 p-3 text-xs dark:border-slate-800/60 dark:bg-slate-800/30">
                                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                                            Prospek 3 Hari:
                                        </span>
                                        <div className="space-y-1.5">
                                            {city.forecast3Days.map((fc, i) => (
                                                <div key={i} className="flex items-center justify-between text-[11px]">
                                                    <span className="font-semibold text-slate-600 dark:text-slate-300">{fc.day}</span>
                                                    <span className="text-slate-500 dark:text-slate-400">{fc.condition}</span>
                                                    <span className="font-mono font-medium text-slate-700 dark:text-slate-200">{fc.temp}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* External BMKG Link */}
                                <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                                    <span className="text-[11px] text-slate-400">
                                        Arah: <strong className="text-slate-600 dark:text-slate-300">{city.windDir}</strong>
                                    </span>
                                    <a
                                        href={city.detailUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-500 dark:text-blue-400"
                                    >
                                        <span>Detail BMKG</span>
                                        <ExternalLink className="h-3.5 w-3.5" />
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
}
