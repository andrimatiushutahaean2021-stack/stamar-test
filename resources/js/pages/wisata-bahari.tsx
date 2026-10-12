import { Head } from '@inertiajs/react';
import PublicLayout from '@/layouts/public-layout';
import { useState } from 'react';
import {
    ChevronLeft,
    ChevronRight,
    CloudRain,
    Sun,
    Wind,
    Waves,
    Thermometer,
    MapPin,
    Palmtree,
} from 'lucide-react';

export default function WisataBahariBuku() {
    // Current spread state (0, 1, 2)
    const [currentSpread, setCurrentSpread] = useState(0);

    const totalSpreads = 3;

    const nextPage = () => {
        if (currentSpread < totalSpreads - 1)
            setCurrentSpread((prev) => prev + 1);
    };

    const prevPage = () => {
        if (currentSpread > 0) setCurrentSpread((prev) => prev - 1);
    };

    const todayDate = new Date().toLocaleDateString('id-ID', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    // Content definitions for destinations
    const destinations = {
        liang: {
            title: 'Pantai Liang',
            subtitle: 'Maluku Tengah',
            weather: 'Hujan Ringan',
            temp: '28°C',
            wind: '10-15 Knot',
            wave: 'Sedang (1.25m)',
            prose: 'Tersembunyi di balik rimbunnya pepohonan, Pantai Liang menyajikan keindahan pesisir yang magis. Hari ini, langit diperkirakan sedikit mendung dengan curah hujan ringan yang mungkin turun di siang hari. Angin berhembus sejuk dari arah timur laut, membawa aroma laut yang khas. Sangat cocok untuk bersantai di tepian tanpa terik yang menyengat.',
        },
        ora: {
            title: 'Pantai Ora',
            subtitle: 'Seram Utara',
            weather: 'Cerah Berawan',
            temp: '31°C',
            wind: '5-10 Knot',
            wave: 'Tenang (0.5m)',
            prose: 'Permata tersembunyi Pulau Seram ini menyambut Anda dengan perairan yang jernih bak kristal. Matahari bersinar cerah diselingi awan tipis, memberikan pencahayaan sempurna untuk menjelajahi terumbu karang. Arus terpantau sangat tenang hari ini, menjadikannya waktu yang paling ideal untuk aktivitas menyelam.',
        },
        natsepa: {
            title: 'Pantai Natsepa',
            subtitle: 'Pulau Ambon',
            weather: 'Berawan Tebal',
            temp: '26°C',
            wind: '15-20 Knot',
            wave: 'Tinggi (2.0m)',
            prose: 'Dikenal sebagai ikon pariwisata Ambon, Natsepa hari ini diselimuti awan tebal. Hembusan angin pesisir terasa lebih kuat dari biasanya, mengundang deburan ombak yang cukup tinggi merengkuh pasir putih. Wisatawan sangat disarankan untuk tidak berenang ke tengah, namun menikmati rujak khas di tepian tetaplah pilihan yang sempurna.',
        },
        hukurila: {
            title: 'Pantai Hukurila',
            subtitle: 'Leitimur Selatan',
            weather: 'Cerah',
            temp: '30°C',
            wind: '10-12 Knot',
            wave: 'Sedang (1.0m)',
            prose: 'Pesisir berkarang Hukurila menampilkan sisi eksotisnya di bawah langit biru tanpa cela. Cahaya matahari memantul indah di atas riak gelombang yang bersahabat. Kondisi cuaca yang prima ini sangat memanjakan para fotografer lanskap maupun pecinta keheningan alam laut Maluku.',
        },
    };

    // Helper component to render a destination page
    const DestinationPage = ({
        data,
        pageNumber,
    }: {
        data: any;
        pageNumber: number;
    }) => (
        <div className="relative flex h-full flex-col">
            <h2 className="mb-1 inline-block border-b-2 border-slate-300 pb-4 font-serif text-3xl font-bold text-slate-800">
                {data.title}
            </h2>
            <h3 className="mt-2 mb-8 flex items-center gap-1 text-sm font-bold tracking-widest text-slate-500 uppercase">
                <MapPin className="h-4 w-4" /> {data.subtitle}
            </h3>

            <div className="flex-grow">
                <p className="mb-8 text-justify font-serif text-lg leading-loose text-slate-700 first-letter:float-left first-letter:mt-[-5px] first-letter:mr-3 first-letter:text-5xl first-letter:font-bold first-letter:text-rose-700">
                    {data.prose}
                </p>

                <div className="mt-8 rounded-lg bg-slate-800 p-6 text-slate-100 shadow-inner">
                    <h4 className="mb-6 border-b border-slate-600 pb-2 text-center text-xs font-bold tracking-widest text-rose-300 uppercase">
                        Catatan Cuaca Hari Ini
                    </h4>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-6">
                        <div className="flex items-center gap-3">
                            {data.weather.includes('Hujan') ? (
                                <CloudRain className="h-6 w-6 text-blue-300" />
                            ) : (
                                <Sun className="h-6 w-6 text-amber-300" />
                            )}
                            <div>
                                <p className="text-[10px] text-slate-400 uppercase">
                                    Kondisi
                                </p>
                                <p className="text-sm font-semibold">
                                    {data.weather}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <Thermometer className="h-6 w-6 text-rose-300" />
                            <div>
                                <p className="text-[10px] text-slate-400 uppercase">
                                    Suhu Udara
                                </p>
                                <p className="text-sm font-semibold">
                                    {data.temp}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <Wind className="h-6 w-6 text-teal-300" />
                            <div>
                                <p className="text-[10px] text-slate-400 uppercase">
                                    Angin
                                </p>
                                <p className="text-sm font-semibold">
                                    {data.wind}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <Waves className="h-6 w-6 text-cyan-300" />
                            <div>
                                <p className="text-[10px] text-slate-400 uppercase">
                                    Gelombang
                                </p>
                                <p className="text-sm font-semibold">
                                    {data.wave}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-8 border-t border-slate-300 pt-4 text-center font-serif text-xs text-slate-400">
                — {pageNumber} —
            </div>
        </div>
    );

    return (
        <PublicLayout>
            <Head title="Buku Cuaca Wisata Bahari" />

            {/* Background Desk (Wood/Dark Leather texture) */}
            <div className="flex min-h-screen flex-col items-center justify-center bg-[#2c3e50] bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')] px-4 py-12">
                {/* Controls Top */}
                <div className="mb-8 flex w-full max-w-5xl items-center justify-between text-slate-300">
                    <h1 className="font-serif text-2xl tracking-wider italic">
                        Jurnal Maritim Maluku
                    </h1>
                    <div className="flex gap-4">
                        <button
                            onClick={prevPage}
                            disabled={currentSpread === 0}
                            className="flex items-center gap-2 rounded-full bg-slate-800/80 px-4 py-2 shadow-lg backdrop-blur-sm transition-all hover:bg-slate-800 disabled:opacity-30"
                        >
                            <ChevronLeft className="h-4 w-4" /> Buka Halaman
                            Sebelumnya
                        </button>
                        <button
                            onClick={nextPage}
                            disabled={currentSpread === totalSpreads - 1}
                            className="flex items-center gap-2 rounded-full bg-slate-800/80 px-4 py-2 shadow-lg backdrop-blur-sm transition-all hover:bg-slate-800 disabled:opacity-30"
                        >
                            Balik Halaman <ChevronRight className="h-4 w-4" />
                        </button>
                    </div>
                </div>

                {/* The Book Container */}
                <div className="relative flex w-full max-w-5xl flex-col rounded-sm shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-700 md:flex-row">
                    {/* Book Spine Shadow Effect */}
                    <div className="pointer-events-none absolute top-0 bottom-0 left-1/2 z-50 -ml-8 hidden w-16 bg-gradient-to-r from-transparent via-black/20 to-transparent md:block"></div>

                    {/* LEFT PAGE */}
                    <div className="relative min-h-[700px] w-full rounded-l-sm border-r border-slate-300/50 bg-[#f4f1ea] bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] p-10 shadow-[inset_-15px_0_30px_rgba(0,0,0,0.05)] md:w-1/2 lg:p-14">
                        {/* Spread 0: Cover / Title */}
                        {currentSpread === 0 && (
                            <div className="relative flex h-full flex-col items-center justify-center border-4 border-slate-800 p-8 text-center">
                                <div className="absolute top-4 right-4 bottom-4 left-4 border border-slate-800/30"></div>
                                <Palmtree className="mb-8 h-24 w-24 text-slate-800 opacity-80" />
                                <h1 className="mb-6 font-serif text-4xl leading-tight font-black tracking-widest text-slate-900 uppercase lg:text-5xl">
                                    Catatan <br />
                                    Cuaca
                                    <br />
                                    Bahari
                                </h1>
                                <div className="mx-auto mb-8 h-1 w-16 bg-rose-600"></div>
                                <p className="mb-12 font-serif text-lg text-slate-600 italic">
                                    Provinsi Maluku
                                </p>

                                <p className="mt-auto w-full border-t border-slate-400 pt-8 text-xs font-bold tracking-widest uppercase">
                                    BMKG Stasiun Maritim Ambon
                                </p>
                            </div>
                        )}

                        {/* Spread 1: Pantai Liang */}
                        {currentSpread === 1 && (
                            <DestinationPage
                                data={destinations.liang}
                                pageNumber={2}
                            />
                        )}

                        {/* Spread 2: Pantai Natsepa */}
                        {currentSpread === 2 && (
                            <DestinationPage
                                data={destinations.natsepa}
                                pageNumber={4}
                            />
                        )}
                    </div>

                    {/* RIGHT PAGE */}
                    <div className="relative min-h-[700px] w-full rounded-r-sm bg-[#f4f1ea] bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] p-10 shadow-[inset_15px_0_30px_rgba(0,0,0,0.05)] md:w-1/2 lg:p-14">
                        {/* Spread 0: Foreword / Intro */}
                        {currentSpread === 0 && (
                            <div className="flex h-full flex-col">
                                <h2 className="mb-8 border-b-2 border-slate-300 pb-4 font-serif text-2xl font-bold text-slate-800">
                                    Kata Pengantar
                                </h2>

                                <div className="flex-grow">
                                    <p className="mb-6 text-justify font-serif text-lg leading-loose text-slate-700">
                                        Selamat datang di lembaran jurnal cuaca
                                        maritim BMKG. Melalui lembaran-lembaran
                                        buku ini, kami mencoba menceritakan
                                        kondisi alam kepada Anda dengan cara
                                        yang berbeda.
                                    </p>
                                    <p className="mb-6 text-justify font-serif text-lg leading-loose text-slate-700">
                                        Maluku dianugerahi dengan pesisir pantai
                                        yang luar biasa indah. Namun, keindahan
                                        laut tidak pernah lepas dari dinamika
                                        cuaca yang menaunginya. Memahami cuaca
                                        adalah langkah pertama dalam menghargai
                                        dan menikmati alam bahari dengan aman.
                                    </p>
                                    <p className="mb-8 text-justify font-serif text-lg leading-loose text-slate-700">
                                        Silakan buka halaman selanjutnya untuk
                                        membaca prakiraan cuaca di beberapa
                                        destinasi wisata pantai terpopuler di
                                        Maluku pada hari ini,{' '}
                                        <span className="font-bold">
                                            {todayDate}
                                        </span>
                                        .
                                    </p>

                                    <div className="text-right">
                                        <p className="font-serif text-slate-600 italic">
                                            Salam hangat,
                                        </p>
                                        <p className="mt-2 text-sm font-bold tracking-wider uppercase">
                                            Prakirawan BMKG
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-8 border-t border-slate-300 pt-4 text-center font-serif text-xs text-slate-400">
                                    — 1 —
                                </div>
                            </div>
                        )}

                        {/* Spread 1: Pantai Ora */}
                        {currentSpread === 1 && (
                            <DestinationPage
                                data={destinations.ora}
                                pageNumber={3}
                            />
                        )}

                        {/* Spread 2: Pantai Hukurila */}
                        {currentSpread === 2 && (
                            <DestinationPage
                                data={destinations.hukurila}
                                pageNumber={5}
                            />
                        )}

                        {/* Floating "Next Page" hint if not on last page */}
                        {currentSpread < totalSpreads - 1 && (
                            <div
                                onClick={nextPage}
                                className="absolute right-4 bottom-10 hidden cursor-pointer items-center gap-1 text-xs font-bold tracking-widest text-slate-400 uppercase transition-colors hover:text-slate-800 md:flex"
                            >
                                Balik <ChevronRight className="h-4 w-4" />
                            </div>
                        )}
                    </div>
                </div>

                <div className="mt-8 font-serif text-sm text-slate-400 italic">
                    Gunakan tombol di atas atau klik tulisan "Balik" di pojok
                    halaman untuk membaca halaman selanjutnya.
                </div>
            </div>
        </PublicLayout>
    );
}
