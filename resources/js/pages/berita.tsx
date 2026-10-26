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


type ArticleItem = {
    id: number;
    title: string;
    category: string;
    date: string;
    author: string;
    image: string;
    summary: string;
    content: string[];
    sourceUrl: string;
};


export default function Berita() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [activeArticle, setActiveArticle] = useState<ArticleItem | null>(null);

    
const newsArticles: ArticleItem[] = [
    {
        id: 1,
        title: 'BMKG dan Bakamla RI Perkuat Kolaborasi untuk Keselamatan dan Keamanan Maritim',
        category: 'siaran pers',
        date: '31 Agustus 2026',
        author: 'Humas BMKG',
        image: '/images/berita/kolaborasi.png',
        summary:
            'BMKG dan Bakamla RI memperkuat sinergi melalui pemanfaatan data meteorologi dan oseanografi, informasi pemantauan kapal, serta pengembangan teknologi observasi maritim untuk mendukung keselamatan di wilayah perairan Indonesia.',
        content: [
            'Badan Meteorologi, Klimatologi, dan Geofisika (BMKG) memperkuat kerja sama dengan Badan Keamanan Laut Republik Indonesia (Bakamla RI) untuk mendukung keselamatan dan keamanan wilayah perairan Indonesia.',
            'Kerja sama ini mencakup pertukaran informasi, peningkatan kapasitas sumber daya manusia, dan pemanfaatan sarana serta prasarana. Integrasi data cuaca dan kondisi laut dengan informasi pergerakan kapal juga menjadi salah satu peluang pengembangan.',
            'Informasi tersebut diharapkan membantu pemantauan wilayah laut, perencanaan operasi, serta penguatan layanan informasi maritim.',
            'Sumber: BMKG. Artikel ini merupakan berita tingkat nasional, bukan laporan kegiatan khusus STAMAR Ambon.',
        ],
        sourceUrl:
            'https://www.bmkg.go.id/berita/utama/bmkg-dan-bakamla-ri-berkolaborasi-dalam-mendukung-keselamatan-dan-keamanan-maritim',
    },
    {
        id: 2,
        title: 'BMKG Resmikan HF Radar Array di Aceh untuk Memperkuat Observasi Maritim',
        category: 'Siaran Pers',
        date: '8 Oktober 2026',
        author: 'Humas BMKG',
        image: '/images/berita/hf-radar.png',
        summary:
            'BMKG meresmikan pengoperasian HF Radar Array di Ujong Batee, Aceh Besar, sebagai bagian dari penguatan observasi kelautan, layanan meteorologi maritim, dan mitigasi bencana pesisir.',
        content: [
            'BMKG meresmikan pengoperasian High Frequency (HF) Radar Array di Ujong Batee, Kabupaten Aceh Besar, Provinsi Aceh.',
            'Teknologi tersebut menjadi bagian dari upaya penguatan observasi kelautan dan peningkatan kualitas layanan informasi meteorologi maritim.',
            'Pengembangan observasi maritim juga mendukung upaya mitigasi bencana di kawasan pesisir.',
            'Sumber: Siaran Pers resmi BMKG, 8 Oktober 2026. Informasi ini merupakan kegiatan BMKG di Aceh, bukan kegiatan STAMAR Ambon.',
        ],
        sourceUrl: 'https://www.bmkg.go.id/siaran-pers/bmkg-resmikan-hf-radar-array-ujong-batee-aceh-perkuat-observasi-maritim-dan-mitigasi-bencana-pesisir',
    },
    {
        id: 3,
        title: 'BMKG: Asap Sempat Terpantau Sesaat di Jabodetabek, Kini Sudah Menjauh',
        category: 'Siaran Pers',
        date: '17 Oktober 2026',
        author: 'Humas BMKG',
        image: '/images/berita/asap.png',
        summary:
            'Portal resmi BMKG menyediakan siaran pers terkait informasi meteorologi, klimatologi, geofisika, dan upaya penanganan berbagai fenomena yang berdampak pada masyarakat.',
        content: [
            'Badan Meteorologi, Klimatologi, dan Geofisika (BMKG) memantau sebaran asap kebakaran hutan dan lahan (karhutla) yang mulai menjauhi wilayah Jawa bagian Barat, termasuk Jakarta, Bogor, Depok, Tangerang, dan Bekasi (Jabodetabek), sejak Sabtu, 17 Oktober 2026. Meski demikian, BMKG masih mendeteksi sisa sebaran asap di Pesisir Barat Banten pada ketinggian sekitar 10.000–18.000 kaki atau 3–5,4 kilometer.',
            'Pengunjung dapat membaca artikel asli melalui portal BMKG untuk memperoleh konteks, tanggal publikasi, dan penjelasan lengkap dari sumbernya.',
            'Untuk informasi cuaca maritim yang berkaitan dengan Maluku, masyarakat juga dapat menggunakan layanan khusus STAMAR Ambon.',
            'Sumber: Portal Siaran Pers resmi BMKG. Judul ini merupakan pengantar ke portal publikasi, bukan judul siaran pers tertentu.',
        ],
        sourceUrl: 'https://www.bmkg.go.id/siaran-pers/bmkg-asap-sempat-terpantau-sesaat-di-jabodetabek-kini-sudah-menjauh',
    },
    {
        id: 4,
        title: 'STAMAR Ambon Sediakan Infografis Prakiraan Cuaca Maritim Perairan Maluku',
        category: 'Siaran Pers',
        date: '24 Oktober 2026',
        author: 'STAMAR Ambon',
        image: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1000&q=80',
        summary:
            'Website resmi STAMAR Ambon menyediakan infografis prakiraan cuaca maritim untuk berbagai wilayah perairan Maluku, termasuk Perairan Pulau Ambon–Pulau Lease. Waktu pembaruan dan periode prakiraan perlu diperiksa pada halaman sumber.',
        content: [
            'Stasiun Meteorologi Maritim Ambon menyediakan halaman infografis prakiraan cuaca maritim perairan melalui website resminya.',
            'Informasi yang tersedia mencakup sejumlah wilayah perairan di Provinsi Maluku, termasuk Perairan Pulau Ambon–Pulau Lease.',
            'Masyarakat, nelayan, dan pengguna transportasi laut dianjurkan membuka halaman resmi untuk melihat periode prakiraan dan waktu pembaruan terbaru sebelum melakukan perjalanan.',
            'Catatan: tanggal 24 Oktober 2026 merupakan tanggal data yang ditemukan pada hasil penelusuran, bukan jaminan bahwa data tersebut masih berlaku saat halaman dibuka.',
        ],
        sourceUrl:
            'https://stamar-ambon.bmkg.go.id/Infografis_Perairan_BMKG_Maluku/',
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
                                    { key: 'siaran pers', label: 'Siaran Pers' }
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
                        
                        <a
                            href={activeArticle.sourceUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-blue-700"
                        >
                            Baca Sumber Resmi BMKG
                        </a>

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
