import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/layouts/public-layout';
import { CloudRain, Wind, Thermometer, Waves, ChevronRight, AlertTriangle, Ship, Anchor, Image as ImageIcon, ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';

export default function Welcome() {
    // State for warning slider
    const [activeWarningSlide, setActiveWarningSlide] = useState(0);
    const warningSlides = [
        {
            title: "Peringatan Dini Gelombang (1 Hari Ke Depan)",
            desc: "Waspada gelombang tinggi 2.5 - 4.0 meter di Laut Banda dan Perairan Kep. Babar - Tanimbar.",
            image: "https://via.placeholder.com/600x300/1e293b/ef4444?text=Peta+Gelombang+Hari+Ini" // Placeholder
        },
        {
            title: "Peringatan Dini Gelombang (3 Hari Ke Depan)",
            desc: "Potensi gelombang tinggi masih berlanjut di wilayah perairan selatan Maluku.",
            image: "https://via.placeholder.com/600x300/1e293b/f59e0b?text=Peta+Gelombang+3+Hari+Kedepan" // Placeholder
        }
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setActiveWarningSlide((prev) => (prev + 1) % warningSlides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [warningSlides.length]);

    return (
        <PublicLayout>
            <Head title="Beranda - Stasiun Meteorologi Maritim Ambon" />
            
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-slate-900 pt-16 pb-32">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                    <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
                                <path d="M0 40L40 0H20L0 20M40 40V20L20 40" fill="none" stroke="currentColor" strokeWidth="1"/>
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#grid-pattern)" />
                    </svg>
                </div>
                
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="text-center lg:text-left">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 text-primary-foreground font-medium text-sm mb-6">
                                <span className="flex h-2 w-2 rounded-full bg-blue-400 animate-pulse"></span>
                                Informasi Cuaca Maritim Terkini
                            </div>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight mb-6">
                                Pantau Cuaca Perairan <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-300">Maluku</span> Dengan Akurat
                            </h1>
                            <p className="text-lg md:text-xl text-slate-300 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                                Dapatkan prakiraan cuaca, peringatan dini gelombang tinggi, dan informasi iklim maritim terpercaya langsung dari sumber resminya.
                            </p>

                        </div>
                        
                        <div className="relative">
                            {/* Weather Widget Mockup & Warning Slider */}
                            <div className="rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 p-6 shadow-2xl relative overflow-hidden flex flex-col gap-6">
                                <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-blue-500 rounded-full blur-3xl opacity-50"></div>
                                <div className="absolute bottom-0 left-0 -mb-4 -ml-4 w-24 h-24 bg-teal-500 rounded-full blur-3xl opacity-50"></div>
                                
                                <div className="relative z-10 text-white">
                                    <div className="flex justify-between items-start mb-6">
                                        <div>
                                            <h3 className="text-2xl font-bold">Perairan Ambon</h3>
                                            <p className="text-slate-300 mt-1">Hari ini, {new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                                        </div>
                                        <div className="flex items-center justify-center h-14 w-14 bg-blue-500/20 rounded-full">
                                            <CloudRain className="h-7 w-7 text-blue-300" />
                                        </div>
                                    </div>
                                    
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-700/50">
                                            <div className="flex items-center gap-2 text-slate-400 mb-2">
                                                <Waves className="h-4 w-4 text-teal-400" />
                                                <span className="text-xs font-medium">Tinggi Gelombang</span>
                                            </div>
                                            <div className="text-2xl font-bold">1.25 - 2.5<span className="text-sm text-slate-400 ml-1">m</span></div>
                                            <div className="text-[10px] text-yellow-400 mt-1 font-medium bg-yellow-400/10 inline-block px-2 py-1 rounded">Kategori Sedang</div>
                                        </div>
                                        
                                        <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-700/50">
                                            <div className="flex items-center gap-2 text-slate-400 mb-2">
                                                <Wind className="h-4 w-4 text-blue-400" />
                                                <span className="text-xs font-medium">Kecepatan Angin</span>
                                            </div>
                                            <div className="text-2xl font-bold">10 - 20<span className="text-sm text-slate-400 ml-1">knot</span></div>
                                            <div className="text-[10px] text-slate-300 mt-1 font-medium">Tenggara - Selatan</div>
                                        </div>
                                    </div>
                                </div>

                                {/* Warning Slider */}
                                <div className="relative z-10 bg-slate-900/60 border border-slate-700/50 rounded-xl overflow-hidden group">
                                    <div className="absolute top-3 left-3 z-20 bg-red-500/90 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-1 rounded flex items-center gap-1 shadow-lg">
                                        <AlertTriangle className="h-3 w-3" /> PERINGATAN DINI
                                    </div>
                                    
                                    {/* Slider Images */}
                                    <div className="relative h-40 w-full bg-black/50 overflow-hidden">
                                        {warningSlides.map((slide, index) => (
                                            <div 
                                                key={index} 
                                                className={`absolute inset-0 transition-opacity duration-1000 ${index === activeWarningSlide ? 'opacity-100' : 'opacity-0'}`}
                                            >
                                                <img 
                                                    src={slide.image} 
                                                    alt={slide.title} 
                                                    className="w-full h-full object-cover opacity-60"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
                                                <div className="absolute bottom-0 left-0 w-full p-4">
                                                    <h4 className="font-semibold text-yellow-400 text-sm">{slide.title}</h4>
                                                    <p className="text-xs text-slate-300 mt-1 line-clamp-2">{slide.desc}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Slider Controls */}
                                    <div className="absolute top-1/2 -translate-y-1/2 w-full flex justify-between px-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button 
                                            onClick={() => setActiveWarningSlide((prev) => (prev === 0 ? warningSlides.length - 1 : prev - 1))}
                                            className="h-6 w-6 rounded-full bg-black/50 flex items-center justify-center text-white hover:bg-black/80"
                                        >
                                            <ChevronLeft className="h-4 w-4" />
                                        </button>
                                        <button 
                                            onClick={() => setActiveWarningSlide((prev) => (prev + 1) % warningSlides.length)}
                                            className="h-6 w-6 rounded-full bg-black/50 flex items-center justify-center text-white hover:bg-black/80"
                                        >
                                            <ChevronRight className="h-4 w-4" />
                                        </button>
                                    </div>

                                    {/* Slider Indicators */}
                                    <div className="absolute bottom-2 right-4 z-20 flex gap-1">
                                        {warningSlides.map((_, index) => (
                                            <button 
                                                key={index}
                                                onClick={() => setActiveWarningSlide(index)}
                                                className={`h-1.5 rounded-full transition-all ${index === activeWarningSlide ? 'w-4 bg-yellow-400' : 'w-1.5 bg-slate-500'}`}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            
            {/* Quick Access Menu (4 Cards) */}
            <section className="py-16 -mt-16 relative z-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {/* Card 1 */}
                        <div className="bg-card text-card-foreground rounded-2xl shadow-xl border p-6 hover:-translate-y-2 transition-transform duration-300 flex flex-col h-full">
                            <div className="h-12 w-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center text-blue-600 dark:text-blue-400 mb-4">
                                <Ship className="h-6 w-6" />
                            </div>
                            <h3 className="text-lg font-bold mb-2">Prakiraan Area Pelayanan</h3>
                            <p className="text-sm text-muted-foreground mb-4 line-clamp-3 flex-grow">
                                Informasi prakiraan cuaca khusus untuk pelabuhan dan area aktivitas maritim.
                            </p>
                            <Link href="#" className="inline-flex items-center font-medium text-sm text-primary hover:underline mt-auto">
                                Selengkapnya <ChevronRight className="ml-1 h-4 w-4" />
                            </Link>
                        </div>
                        
                        {/* Card 2 */}
                        <div className="bg-card text-card-foreground rounded-2xl shadow-xl border p-6 hover:-translate-y-2 transition-transform duration-300 flex flex-col h-full">
                            <div className="h-12 w-12 bg-teal-100 dark:bg-teal-900/30 rounded-xl flex items-center justify-center text-teal-600 dark:text-teal-400 mb-4">
                                <Waves className="h-6 w-6" />
                            </div>
                            <h3 className="text-lg font-bold mb-2">Prakiraan Area Penyeberangan</h3>
                            <p className="text-sm text-muted-foreground mb-4 line-clamp-3 flex-grow">
                                Data cuaca perairan rute penyeberangan kapal ferry antar pulau di Maluku.
                            </p>
                            <Link href="#" className="inline-flex items-center font-medium text-sm text-teal-600 dark:text-teal-400 hover:underline mt-auto">
                                Selengkapnya <ChevronRight className="ml-1 h-4 w-4" />
                            </Link>
                        </div>
                        
                        {/* Card 3 */}
                        <div className="bg-card text-card-foreground rounded-2xl shadow-xl border p-6 hover:-translate-y-2 transition-transform duration-300 flex flex-col h-full">
                            <div className="h-12 w-12 bg-amber-100 dark:bg-amber-900/30 rounded-xl flex items-center justify-center text-amber-600 dark:text-amber-400 mb-4">
                                <Thermometer className="h-6 w-6" />
                            </div>
                            <h3 className="text-lg font-bold mb-2">Prakiraan Cuaca Provinsi</h3>
                            <p className="text-sm text-muted-foreground mb-4 line-clamp-3 flex-grow">
                                Detail kondisi cuaca, suhu, dan kelembapan untuk seluruh wilayah provinsi Maluku.
                            </p>
                            <Link href="#" className="inline-flex items-center font-medium text-sm text-amber-600 dark:text-amber-400 hover:underline mt-auto">
                                Selengkapnya <ChevronRight className="ml-1 h-4 w-4" />
                            </Link>
                        </div>

                        {/* Card 4 - Wisata Bahari */}
                        <div className="bg-card text-card-foreground rounded-2xl shadow-xl border p-6 hover:-translate-y-2 transition-transform duration-300 flex flex-col h-full">
                            <div className="h-12 w-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-4">
                                <Anchor className="h-6 w-6" />
                            </div>
                            <h3 className="text-lg font-bold mb-2">Prakiraan Wisata Bahari</h3>
                            <p className="text-sm text-muted-foreground mb-4 line-clamp-3 flex-grow">
                                Informasi cuaca kelautan khusus untuk lokasi-lokasi pariwisata bahari.
                            </p>
                            <Link href="#" className="inline-flex items-center font-medium text-sm text-emerald-600 dark:text-emerald-400 hover:underline mt-auto">
                                Selengkapnya <ChevronRight className="ml-1 h-4 w-4" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Infografis Section */}
            <section className="py-16 bg-slate-50 dark:bg-slate-900/50">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-end mb-8">
                        <div>
                            <h2 className="text-3xl font-bold tracking-tight mb-2">Infografis & Publikasi</h2>
                            <p className="text-muted-foreground">Informasi visual terkini seputar cuaca dan iklim.</p>
                        </div>
                        <Button variant="outline" className="hidden sm:flex">Lihat Semua</Button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[1, 2, 3].map((item) => (
                            <div key={item} className="group rounded-xl overflow-hidden bg-white dark:bg-slate-800 shadow-md border hover:shadow-xl transition-all duration-300 cursor-pointer">
                                <div className="aspect-[4/3] bg-slate-200 dark:bg-slate-700 relative overflow-hidden">
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <ImageIcon className="h-12 w-12 text-slate-400 opacity-50" />
                                    </div>
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                                        <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 text-black text-sm font-semibold px-4 py-2 rounded-full transform translate-y-4 group-hover:translate-y-0">
                                            Perbesar
                                        </span>
                                    </div>
                                </div>
                                <div className="p-5">
                                    <div className="text-xs text-primary font-medium mb-1">Infografis Cuaca</div>
                                    <h3 className="font-semibold text-lg line-clamp-2 group-hover:text-primary transition-colors">
                                        Prakiraan Cuaca Harian Wilayah Maluku dan Sekitarnya
                                    </h3>
                                    <p className="text-xs text-muted-foreground mt-3">Diperbarui: {new Date().toLocaleDateString('id-ID')}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-8 text-center sm:hidden">
                        <Button variant="outline" className="w-full">Lihat Semua Infografis</Button>
                    </div>
                </div>
            </section>
            
            {/* About Section */}
            <section className="py-16">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col lg:flex-row items-center gap-12">
                        <div className="w-full lg:w-1/2">
                            <div className="aspect-video bg-slate-200 dark:bg-slate-800 rounded-2xl overflow-hidden shadow-lg border relative flex items-center justify-center group">
                                <CloudRain className="h-24 w-24 text-slate-400 opacity-20 group-hover:scale-110 transition-transform duration-700" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
                                    <h4 className="text-white font-semibold text-lg">Gedung Stasiun Meteorologi Maritim Ambon</h4>
                                </div>
                            </div>
                        </div>
                        <div className="w-full lg:w-1/2">
                            <h2 className="text-3xl font-bold mb-6">Mengenal Lebih Dekat Stasiun Maritim Ambon</h2>
                            <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                                Stasiun Meteorologi Maritim Ambon memiliki tugas pokok melaksanakan pengamatan, pengelolaan data, pelayanan jasa meteorologi maritim, dan pemeliharaan alat meteorologi maritim.
                            </p>
                            <p className="text-muted-foreground mb-8 leading-relaxed">
                                Visi kami adalah mewujudkan BMKG yang handal, tanggap dan mampu dalam mendukung keselamatan pelayaran serta pembangunan nasional di wilayah Maluku yang berkarakteristik kepulauan.
                            </p>
                            <Button variant="outline" className="h-11 px-6 rounded-full">
                                Lihat Profil Lengkap
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
            
        </PublicLayout>
    );
}
