import { Head } from '@inertiajs/react';
import PublicLayout from '@/layouts/public-layout';
import {
    Newspaper,
    Calendar,
    ChevronRight,
    X,
    User,
    Clock,
    Search,
    Share2,
} from 'lucide-react';
import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface ArticleItem {
    id: number;
    title: string;
    category: string;
    date: string;
    author: string;
    image: string;
    summary: string;
    content: string[];
}

export default function Berita() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [activeArticle, setActiveArticle] = useState<ArticleItem | null>(null);

    const newsArticles: ArticleItem[] = [
        {
            id: 1,
            title: 'BMKG Stamar Ambon Gelar SLCN: Tingkatkan Keselamatan Nelayan Tradisional Hadapi Cuaca Ekstrem Laut Banda',
            category: 'Siaran Pers',
            date: '18 Oktober 2026',
            author: 'Humas Stamar Ambon',
            image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1000&q=80',
            summary: 'Stasiun Meteorologi Maritim Yos Soedarso Ambon kembali menyelenggarakan Sekolah Lapang Cuaca Nelayan guna meningkatkan kapasitas nelayan dalam memanfaatkan informasi cuaca maritim demi keselamatan berlayar dan peningkatan hasil tangkapan.',
            content: [
                'AMBON - Stasiun Meteorologi Kelas II Maritim Yos Soedarso Ambon secara konsisten berkomitmen mendukung keselamatan para nelayan di Provinsi Maluku. Pada kegiatan Sekolah Lapang Cuaca Nelayan (SLCN) terbaru, puluhan nelayan tradisional diberikan pelatihan intensif mengenai cara membaca arah angin, memprediksi potensi gelombang tinggi, serta mengenali tanda-tanda awan Cumulonimbus (CB) di laut lepas.',
                'Kepala Stasiun Meteorologi Maritim Yos Soedarso Ambon menyampaikan bahwa Maluku sebagai provinsi kepulauan sangat bergantung pada perairan laut. Dengan pemahaman cuaca yang baik, nelayan tidak hanya terhindar dari marabahaya laut, namun juga mampu merencanakan jalur tangkap ikan yang lebih produktif dan hemat bahan bakar.',
                'Para peserta mengapresiasi kemudahan akses informasi maritim melalui website dan aplikasi mobile Info BMKG yang kini menyajikan data tinggi gelombang dan peringatan dini hingga 3 hari ke depan.',
            ],
        },
        {
            id: 2,
            title: 'Peringatan Gelombang Signifikan 2.5 - 4.0 Meter: BMKG Imbau Nahkoda di Jalur Tanimbar dan Babar Selalu Waspada',
            category: 'Peringatan Cuaca',
            date: '16 Oktober 2026',
            author: 'Tim Forecaster Maritim',
            image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80',
            summary: 'Berdasarkan analisis dinamika atmosfer dan laut terkini, peningkatan kecepatan angin timuran hingga 25 knot memicu peningkatan tinggi gelombang laut di bagian selatan kepulauan Maluku.',
            content: [
                'AMBON - Forecaster BMKG Stamar Ambon merilis imbauan penting bagi operator pelayaran kapal penyeberangan feri, tongkang, serta perahu nelayan menyusul potensi gelombang laut setinggi 2.5 hingga 4.0 meter di perairan Kepulauan Tanimbar, Babar, dan Laut Arafura.',
                'Kecepatan angin yang bertiup kencang dari arah Timur ke Tenggara dengan kecepatan mencapai 25 knot diperkirakan masih berpeluang terjadi selama beberapa hari ke depan.',
                'BMKG meminta pihak pelabuhan dan operator kapal untuk secara berkala memantau update cuaca pelabuhan (AH) dan peta rute penyeberangan sebelum menerbitkan Surat Persetujuan Berlayar (SPB).',
            ],
        },
        {
            id: 3,
            title: 'Perkuat Sinergi Maritim: Stamar Ambon Bersama KSOP & Basarnas Tingkatkan Respon Cepat Cuaca Buruk',
            category: 'Kemitraan',
            date: '12 Oktober 2026',
            author: 'Humas Stamar Ambon',
            image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1000&q=80',
            summary: 'Pertemuan koordinasi triwulan antara BMKG Maritim, KSOP Kelas I Ambon, dan Kantor SAR Ambon memantapkan integrasi diseminasi peringatan dini di seluruh titik pelabuhan dan dermaga rakyat.',
            content: [
                'AMBON - Dalam rangka menciptakan transportasi laut yang aman, selamat, dan tertib, BMKG Stasiun Meteorologi Maritim Ambon menggelar audiensi kerja sama dengan KSOP Kelas I Ambon dan Kantor SAR Ambon.',
                'Fokus utama kolaborasi ini adalah percepatan penyampaian informasi peringatan dini gelombang ekstrem ke nakhoda kapal rakyat serta integrasi data cuaca maritim ke posko pengawasan pelabuhan Yos Sudarso dan Tulehu.',
                'Dengan sinergi lintas instansi ini, langkah pencegahan insiden maritim dapat diambil lebih awal dan terkoordinasi secara efektif.',
            ],
        },
        {
            id: 4,
            title: 'Kunjungan Edukasi Maritim: Puluhan Siswa Mengenal Pengamatan Cuaca dan Gelombang Laut di BMKG Ambon',
            category: 'Edukasi',
            date: '5 Oktober 2026',
            author: 'Staf Edukasi Stamar',
            image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1000&q=80',
            summary: 'Siswa-siswi sekolah menengah diajak berkeliling taman alat meteorologi dan melihat langsung proses kerja forecaster menyusun prakiraan cuaca maritim.',
            content: [
                'AMBON - Stasiun Meteorologi Maritim Ambon menerima kunjungan edukasi puluhan siswa dan guru pendamping dalam rangka program BMKG Mengajar.',
                'Para siswa antusias mempelajari instrumen pengukur arah angin, termometer bola basah dan bola kering, serta pengamatan visual awan laut.',
                'Diharapkan kegiatan ini memicu minat generasi muda Maluku terhadap ilmu kelautan dan sains kebumian.',
            ],
        },
    ];

    const filteredArticles = useMemo(() => {
        return newsArticles.filter((item) => {
            const matchesCategory =
                selectedCategory === 'all' || item.category.toLowerCase() === selectedCategory.toLowerCase();
            const matchesSearch =
                item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.summary.toLowerCase().includes(searchTerm.toLowerCase());
            return matchesCategory && matchesSearch;
        });
    }, [newsArticles, selectedCategory, searchTerm]);

    return (
        <PublicLayout>
            <Head title="Berita & Siaran Pers - BMKG Stamar Ambon" />

            <div className="min-h-screen bg-slate-50 pb-24 dark:bg-[#0B1120]">
                {/* Hero Header */}
                <div className="relative overflow-hidden bg-slate-900 pt-14 pb-20 text-white lg:pt-20 lg:pb-24">
                    <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="mx-auto max-w-3xl text-center">
                            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/10 px-4 py-1.5 text-xs font-semibold text-blue-300">
                                <Newspaper className="h-3.5 w-3.5" />
                                <span>Publikasi & Rilis Resmi Stasiun</span>
                            </div>
                            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-4xl">
                                Berita & Siaran Pers
                            </h1>
                            <p className="mt-4 text-sm text-slate-300 sm:text-base">
                                Ikuti perkembangan informasi terkini, rilis siaran pers keselamatan pelayaran, dan kegiatan operasional Stasiun Meteorologi Maritim Yos Soedarso Ambon.
                            </p>

                            {/* Search & Filter */}
                            <div className="mt-8 mx-auto max-w-md">
                                <div className="relative">
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                    <Input
                                        type="text"
                                        placeholder="Cari berita atau siaran pers..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="h-12 w-full rounded-lg border-white/20 bg-slate-800/80 pl-11 pr-4 text-sm text-white shadow-sm placeholder:text-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20"
                                    />
                                </div>
                            </div>

                            {/* Category Filter Pills */}
                            <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
                                {[
                                    { key: 'all', label: 'Semua Berita' },
                                    { key: 'siaran pers', label: 'Siaran Pers' },
                                    { key: 'peringatan cuaca', label: 'Peringatan Cuaca' },
                                    { key: 'kemitraan', label: 'Kemitraan' },
                                    { key: 'edukasi', label: 'Edukasi' },
                                ].map((tab) => (
                                    <button
                                        key={tab.key}
                                        onClick={() => setSelectedCategory(tab.key)}
                                        className={`rounded-lg px-4 py-2 text-xs font-bold transition-all ${
                                            selectedCategory === tab.key
                                                ? 'bg-blue-600 text-white shadow-sm'
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

                {/* News Grid */}
                <div className="container mx-auto -mt-8 px-4 sm:px-6 lg:px-8">
                    {filteredArticles.length > 0 ? (
                        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                            {filteredArticles.map((article) => (
                                <div
                                    key={article.id}
                                    className="group flex flex-col justify-between overflow-hidden rounded-lg border border-slate-200/80 bg-white shadow-sm transition-all duration-300 hover:shadow-sm dark:border-slate-800 dark:bg-slate-900"
                                >
                                    <div>
                                        <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-800">
                                            <img
                                                src={article.image}
                                                alt={article.title}
                                                className="h-full w-full object-cover transition-transform duration-500 "
                                                loading="lazy"
                                            />
                                            <div className="absolute top-3 left-3">
                                                <span className="rounded-full bg-blue-600 px-3 py-1 text-[10px] font-bold text-white shadow-sm">
                                                    {article.category}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="p-6">
                                            <div className="mb-2.5 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                                                <Calendar className="h-3.5 w-3.5 text-blue-500" />
                                                <span>{article.date}</span>
                                                <span>•</span>
                                                <span>{article.author}</span>
                                            </div>
                                            <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2 dark:text-white dark:group-hover:text-blue-400">
                                                {article.title}
                                            </h3>
                                            <p className="mt-2 text-xs leading-relaxed text-slate-600 line-clamp-3 dark:text-slate-400">
                                                {article.summary}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="p-6 pt-0">
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={() => setActiveArticle(article)}
                                            className="w-full justify-between rounded-lg text-xs font-bold border-slate-200 group-hover:border-blue-600 group-hover:bg-blue-50 dark:border-slate-800 dark:group-hover:bg-blue-950/20"
                                        >
                                            <span>Baca Siaran Pers Lengkap</span>
                                            <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-slate-300 bg-white p-12 text-center dark:border-slate-800 dark:bg-slate-900">
                            <Newspaper className="h-12 w-12 text-slate-400 opacity-40 mb-3" />
                            <h3 className="text-base font-bold text-slate-900 dark:text-white">
                                Tidak ada berita yang sesuai
                            </h3>
                            <p className="mt-1 text-xs text-slate-500">
                                Coba pilih kategori lain atau hapus kata kunci pencarian.
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* Modal Detail Berita */}
            {activeArticle && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 animate-in fade-in duration-200"
                    onClick={() => setActiveArticle(null)}
                >
                    <div
                        className="relative max-h-[88vh] max-w-2xl w-full overflow-y-auto rounded-lg border border-border bg-card p-6 shadow-sm text-foreground"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-start justify-between border-b border-border pb-4 mb-4">
                            <div>
                                <span className="rounded-full bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 px-3 py-1 text-xs font-bold">
                                    {activeArticle.category}
                                </span>
                                <h2 className="mt-2 text-xl font-bold leading-snug">
                                    {activeArticle.title}
                                </h2>
                                <p className="mt-1 text-xs text-muted-foreground">
                                    {activeArticle.date} • Ditulis oleh <strong className="text-foreground">{activeArticle.author}</strong>
                                </p>
                            </div>
                            <button
                                type="button"
                                onClick={() => setActiveArticle(null)}
                                className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted text-muted-foreground hover:bg-muted/80 shrink-0 ml-3"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        </div>

                        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg mb-5">
                            <img
                                src={activeArticle.image}
                                alt={activeArticle.title}
                                className="h-full w-full object-cover"
                            />
                        </div>

                        <div className="space-y-3.5 text-xs sm:text-sm leading-relaxed text-muted-foreground">
                            {activeArticle.content.map((p, idx) => (
                                <p key={idx}>{p}</p>
                            ))}
                        </div>

                        <div className="mt-6 border-t border-border pt-4 flex justify-end">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setActiveArticle(null)}
                                className="rounded-lg text-xs font-semibold"
                            >
                                Tutup Berita
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </PublicLayout>
    );
}
