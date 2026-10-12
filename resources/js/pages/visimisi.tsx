import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/layouts/public-layout';
import {
    Compass,
    Target,
    Award,
    CheckCircle2,
    Waves,
    ShieldAlert,
    Eye,
    TrendingUp,
    HeartHandshake,
    Sparkles,
    BookOpen,
    Network,
    ArrowRight,
    Zap,
    Clock,
    Globe2,
} from 'lucide-react';

export default function VisiMisi() {
    const coreValues = [
        {
            keyword: 'Cepat & Tanggap',
            icon: Zap,
            color: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
            desc: 'Penyampaian informasi cuaca dan peringatan dini cuaca ekstrem laut secara responsif dan tepat waktu untuk keselamatan operasional pelayaran.',
        },
        {
            keyword: 'Tepat & Akurat',
            icon: Target,
            color: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
            desc: 'Analisis berbasis sains atmosfer kelautan dan instrumen observasi maritim terkini guna memastikan presisi prakiraan cuaca tinggi.',
        },
        {
            keyword: 'Berjangkauan Luas',
            icon: Globe2,
            color: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
            desc: 'Menjangkau 18 zona perairan Maluku, rute penyeberangan antarpulau, hingga pelabuhan terpencil di kawasan kepulauan Maluku.',
        },
        {
            keyword: 'Mudah Dipahami',
            icon: HeartHandshake,
            color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
            desc: 'Menyajikan informasi dalam format infografis visual, peta, dan bahasa yang komunikatif bagi nelayan dan masyarakat umum.',
        },
    ];

    const missions = [
        {
            number: '01',
            title: 'Pengamatan & Pemahaman Fenomena Atmosfer Maritim',
            statement:
                'Mengamati dan memahami fenomena meteorologi di Stasiun Meteorologi Maritim Ambon.',
            details: [
                'Melaksanakan pengamatan sinoptik dan oseanografi permukaan 24 jam terus-menerus',
                'Mengoperasikan dan merawat instrumen stasiun otomatis (AWS Maritim) dan sensor kelautan',
                'Mempelajari karakteristik angin monsun, gelombang laut, dan dinamika iklim kepulauan Maluku',
            ],
            icon: Eye,
            gradient: 'from-blue-600/20 to-cyan-600/20',
        },
        {
            number: '02',
            title: 'Penyediaan Data & Informasi Cuaca Maritim yang Handal',
            statement:
                'Menyediakan data dan pelayanan informasi meteorologi maritim yang handal di wilayah Perairan Maluku.',
            details: [
                'Menghasilkan prakiraan cuaca 18 zona perairan Maluku, cuaca pelabuhan, dan penyeberangan feri',
                'Menerbitkan rilis peringatan dini gelombang tinggi dan angin kencang secara tepat sasaran',
                'Menyediakan layanan data meteorologi kelautan untuk kebutuhan riset, pelayaran, dan komersial',
            ],
            icon: Waves,
            gradient: 'from-cyan-600/20 to-teal-600/20',
        },
        {
            number: '03',
            title: 'Pengurangan Risiko Bencana & Kesejahteraan Bahari',
            statement:
                'Meningkatkan pemahaman informasi meteorologi maritim untuk kepentingan pembangunan dan mengurangi resiko bencana guna kesejahteraan di wilayah Perairan Maluku.',
            details: [
                'Penyelenggaraan Sekolah Lapang Cuaca Nelayan (SLCN) bagi para nelayan tradisional Maluku',
                'Sinergi aktif bersama KSOP, Basarnas, TNI AL, dan BNPB dalam operasi keselamatan laut',
                'Mendukung pertumbuhan ekonomi sektor maritim, perikanan tangkap, dan pariwisata bahari',
            ],
            icon: ShieldAlert,
            gradient: 'from-emerald-600/20 to-blue-600/20',
        },
    ];

    return (
        <PublicLayout>
            <Head title="Visi & Misi - Stasiun Meteorologi Kelas II Maritim Yos Soedarso Ambon - BMKG" />

            {/* Breadcrumb Header */}
            <div className="border-b bg-muted/40 py-4">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <nav className="flex items-center space-x-2 text-xs font-medium text-muted-foreground sm:text-sm">
                        <Link href="/" className="transition-colors hover:text-primary">
                            Beranda
                        </Link>
                        <span>/</span>
                        <span className="text-muted-foreground">Profil Stasiun</span>
                        <span>/</span>
                        <span className="font-semibold text-foreground">Visi & Misi</span>
                    </nav>
                </div>
            </div>

            {/* Hero Section */}
            <section className="border-b border-slate-800 bg-slate-950 py-16 text-white lg:py-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-3xl text-center">
                        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-500/40 bg-blue-500/20 px-4 py-1.5 text-xs font-semibold tracking-wide text-blue-300">
                            <Target className="h-3.5 w-3.5" />
                            <span>ARAH & TUJUAN STRATEGIS BMKG</span>
                        </div>
                        <h1 className="mb-6 text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
                            Visi dan Misi Stasiun Meteorologi Kelas II Maritim Yos Soedarso Ambon
                        </h1>
                        <p className="text-base leading-relaxed text-slate-300 sm:text-lg">
                            Komitmen fundamental dalam menghadirkan pelayanan informasi meteorologi maritim
                            terbaik untuk menjamin keselamatan pelayaran dan kemajuan ekonomi kelautan Maluku.
                        </p>
                    </div>
                </div>
            </section>

            {/* Visi Section */}
            <section className="border-b bg-background py-16 lg:py-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-4xl">
                        <div className="relative overflow-hidden rounded-3xl border border-blue-500/20 bg-gradient-to-br from-blue-950 via-slate-900 to-slate-900 p-8 text-white shadow-xl sm:p-12">
                            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-blue-500/20 px-3.5 py-1 text-xs font-bold tracking-wider text-blue-300 uppercase">
                                <Sparkles className="h-4 w-4" />
                                <span>VISI KELEMBAGAAN</span>
                            </div>

                            <blockquote className="relative mt-2 text-2xl font-extrabold leading-snug tracking-tight text-white sm:text-3xl lg:text-4xl">
                                “Terwujudnya pelayanan jasa dan informasi meteorologi maritim yang cepat, tepat,
                                akurat, berjangkauan luas, dan dapat dipahami di wilayah perairan Maluku.”
                            </blockquote>

                            <p className="mt-6 text-sm text-slate-300 sm:text-base">
                                Visi ini menjadi pedoman utama Stasiun Meteorologi Kelas II Maritim Yos Soedarso
                                Ambon dalam setiap detil operasional pengamatan cuaca, analisis numerik, dan
                                penyampaian informasi kepada seluruh mitra bahari.
                            </p>

                            {/* 4 Pillars Breakdown Grid */}
                            <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                                {coreValues.map((val, idx) => {
                                    const IconCmp = val.icon;
                                    return (
                                        <div
                                            key={idx}
                                            className="rounded-2xl border border-white/10 bg-white/5 p-4 transition-all duration-200 hover:bg-white/10"
                                        >
                                            <div
                                                className={`mb-3 flex h-9 w-9 items-center justify-center rounded-xl border ${val.color}`}
                                            >
                                                <IconCmp className="h-4 w-4" />
                                            </div>
                                            <div className="text-sm font-bold text-white">{val.keyword}</div>
                                            <p className="mt-1 text-xs leading-relaxed text-slate-300">
                                                {val.desc}
                                            </p>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Misi Section */}
            <section className="py-16 lg:py-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mx-auto mb-14 max-w-2xl text-center">
                        <div className="mb-2 inline-flex items-center gap-1.5 text-xs font-bold tracking-wider text-primary uppercase">
                            <Compass className="h-4 w-4" />
                            <span>LANGKAH STRATEGIS</span>
                        </div>
                        <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
                            3 Misi Utama Stasiun
                        </h2>
                        <p className="mt-3 text-muted-foreground">
                            Pilar tindakan operasional yang dijalankan setiap hari untuk merealisasikan visi kelembagaan.
                        </p>
                    </div>

                    <div className="mx-auto max-w-4xl space-y-6">
                        {missions.map((misi, idx) => {
                            const IconCmp = misi.icon;
                            return (
                                <div
                                    key={idx}
                                    className="overflow-hidden rounded-2xl border bg-card p-6 shadow-sm transition-all duration-300 hover:border-primary/40 hover:shadow-md sm:p-8"
                                >
                                    <div className="flex flex-col gap-6 md:flex-row md:items-start">
                                        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-blue-600 font-extrabold text-white shadow-md">
                                            <span className="text-xl">{misi.number}</span>
                                        </div>

                                        <div className="flex-grow">
                                            <div className="mb-1 text-xs font-semibold tracking-wider text-primary uppercase">
                                                Misi #{idx + 1}
                                            </div>
                                            <h3 className="text-xl font-bold text-foreground">
                                                {misi.title}
                                            </h3>

                                            <div className="mt-3 rounded-xl border border-primary/20 bg-primary/5 p-4 text-sm font-medium text-foreground italic">
                                                "{misi.statement}"
                                            </div>

                                            <div className="mt-5 space-y-2">
                                                <div className="text-xs font-bold tracking-wider text-muted-foreground uppercase">
                                                    Penerapan Operasional:
                                                </div>
                                                {misi.details.map((detail, dIdx) => (
                                                    <div
                                                        key={dIdx}
                                                        className="flex items-start gap-2.5 text-xs text-muted-foreground sm:text-sm"
                                                    >
                                                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
                                                        <span>{detail}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Other Profiles Navigation */}
            <section className="border-t bg-muted/30 py-12">
                <div className="container mx-auto px-4 text-center sm:px-6 lg:px-8">
                    <h3 className="mb-2 text-xl font-bold text-foreground">
                        Kenali Profil Stasiun Lebih Lanjut
                    </h3>
                    <p className="mb-6 text-sm text-muted-foreground">
                        Pelajari rekam jejak sejarah, bagan organisasi, serta rincian tugas pokok dan fungsi stasiun.
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-3">
                        <Link
                            href="/sejarah"
                            className="inline-flex items-center gap-2 rounded-full border bg-background px-5 py-2 text-sm font-semibold text-foreground shadow-sm hover:bg-muted"
                        >
                            <BookOpen className="h-4 w-4 text-primary" />
                            <span>Sejarah Stasiun</span>
                        </Link>
                        <Link
                            href="/struktur"
                            className="inline-flex items-center gap-2 rounded-full border bg-background px-5 py-2 text-sm font-semibold text-foreground shadow-sm hover:bg-muted"
                        >
                            <Network className="h-4 w-4 text-primary" />
                            <span>Struktur Organisasi</span>
                        </Link>
                        <Link
                            href="/tupoksi"
                            className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2 text-sm font-semibold text-primary-foreground shadow-md hover:bg-primary/90"
                        >
                            <span>Tugas dan Fungsi</span>
                            <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
