import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/layouts/public-layout';
import {
    History,
    FileText,
    Calendar,
    Award,
    Building2,
    ShieldCheck,
    Compass,
    Waves,
    Users,
    Anchor,
    ArrowRight,
    MapPin,
    Clock,
    Sparkles,
    CheckCircle2,
    BookOpen,
} from 'lucide-react';

export default function Sejarah() {
    const timelineEvents = [
        {
            year: 'Sebelum 2019',
            title: 'Pos Pengamatan Maritim Yos Soedarso',
            badge: 'Fase Rintisan',
            badgeColor: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
            description:
                'Pada masa awal perintisan, operasional pengamatan cuaca laut di wilayah perairan Ambon beroperasi sebagai Pos Pengamatan Maritim. Seluruh struktur organisasi, tata kerja, serta administrasinya menginduk secara langsung di bawah Stasiun Meteorologi Kelas II Pattimura Ambon.',
            details: [
                'Fokus pengamatan data sinoptik kelautan, pelabuhan, dan perairan Teluk Ambon',
                'Dukungan keselamatan pelayaran maritim lokal di perairan Maluku',
                'Struktur organisasi menginduk di bawah Sta. Met. Kelas II Pattimura Ambon',
            ],
            icon: Compass,
        },
        {
            year: '8 Februari 2019',
            title: 'Penetapan & Persetujuan MenPAN-RB',
            badge: 'Tonggak Sejarah',
            badgeColor: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
            description:
                'Titik balik penting penetapan kelembagaan saat Menteri Pendayagunaan Aparatur Negara dan Reformasi Birokrasi (MenPAN-RB) Republik Indonesia, Drs. Syafruddin, M.Si, menyetujui surat penataan organisasi melalui Surat Nomor: B/126/M.KT.01/2019 tanggal 8 Februari 2019 perihal Penataan Organisasi dan Tata Kerja Unit Pelaksana Teknis BMKG.',
            details: [
                'Surat Resmi Nomor: B/126/M.KT.01/2019',
                'Disetujui MenPAN-RB: Drs. Syafruddin, M.Si',
                'Pemisahan dari stasiun induk menjadi Unit Pelaksana Teknis (UPT) mandiri',
            ],
            icon: FileText,
        },
        {
            year: 'Transformasi Kelembagaan',
            title: 'Stasiun Meteorologi Kelas II Maritim Yos Soedarso Ambon',
            badge: 'Status Kelas II',
            badgeColor: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
            description:
                'Resmi bertransformasi dan diperkuat statusnya menjadi Stasiun Meteorologi Kelas II Maritim Yos Soedarso Ambon sebagai UPT mandiri di bawah BMKG. Memperluas jangkauan pemantauan oseanografi, instrumen otomatisasi cuaca maritim, serta layanan prakiraan laut di seluruh perairan Maluku.',
            details: [
                'Nomenklatur resmi: Stasiun Meteorologi Kelas II Maritim Yos Soedarso Ambon',
                'Peningkatan kapasitas pengamatan, teknologi maritim, dan kompetensi SDM',
                'Penyediaan layanan informasi cuaca maritim spesifik wilayah kepulauan Maluku',
            ],
            icon: Building2,
        },
        {
            year: 'Era Sekarang',
            title: 'Modernisasi, SLCN & Transformasi Digital',
            badge: 'Pelayanan Prima',
            badgeColor: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20',
            description:
                'Stasiun aktif menyelenggarakan Sekolah Lapang Cuaca Nelayan (SLCN) untuk meningkatkan literasi cuaca para nelayan tradisional, mengintegrasikan sistem prakiraan digital (Marine Forecast Year/MFY), serta menyediakan layanan informasi 24/7 bagi keselamatan pelayaran nasional dan internasional.',
            details: [
                'Penyelenggaraan berkala Sekolah Lapang Cuaca Nelayan (SLCN)',
                'Pemantauan 18 zona perairan Maluku dan puluhan rute penyeberangan feri',
                'Penyebaran informasi cepat via media digital, buletin maritim, dan situs web resmi',
            ],
            icon: Waves,
        },
    ];

    const galleryHighlights = [
        {
            title: 'Sekolah Lapang Cuaca Nelayan (SLCN)',
            category: 'Edukasi Nelayan',
            description:
                'Kegiatan pembinaan literasi cuaca kepada nelayan tradisional di Maluku agar mampu membaca informasi cuaca maritim dan memitigasi bahaya gelombang tinggi di laut.',
            icon: Users,
        },
        {
            title: 'Kunjungan Kerja & Supervisi Teknis',
            category: 'Penguatan Kelembagaan',
            description:
                'Supervisi dan peninjauan operasional stasiun oleh pimpinan BMKG guna memastikan keandalan radar, stasiun otomatis, dan kesiapan personel operasional 24 jam.',
            icon: ShieldCheck,
        },
        {
            title: 'Pengamatan & Pelayanan Maritim Terpadu',
            category: 'Operasional 24/7',
            description:
                'Pelaksanaan tugas pengamatan rutin, analisa dinamika atmosfer laut, dan diseminasi peringatan dini gelombang serta angin kencang untuk perairan Maluku.',
            icon: Anchor,
        },
    ];

    const stationFacts = [
        { label: 'Nama Resmi', val: 'Stasiun Meteorologi Kelas II Maritim Yos Soedarso Ambon' },
        { label: 'Dasar Hukum Pendirian', val: 'Surat MenPAN-RB No. B/126/M.KT.01/2019' },
        { label: 'Tanggal Disetujui', val: '8 Februari 2019' },
        { label: 'Instansi Pembina', val: 'Badan Meteorologi, Klimatologi, dan Geofisika (BMKG)' },
        { label: 'Status Kelembagaan', val: 'Unit Pelaksana Teknis (UPT) Mandiri Kelas II' },
        { label: 'Wilayah Layanan', val: 'Perairan Provinsi Maluku & Sekitarnya' },
        { label: 'Lokasi Kantor', val: 'Jl. Amanlanite, Waimahu, Latuhalat, Nusaniwe, Ambon' },
        { label: 'Waktu Operasional', val: '24 Jam Non-Stop (Setiap Hari)' },
    ];

    return (
        <PublicLayout>
            <Head title="Sejarah - Stasiun Meteorologi Kelas II Maritim Yos Soedarso Ambon - BMKG" />

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
                        <span className="font-semibold text-foreground">Sejarah</span>
                    </nav>
                </div>
            </div>

            {/* Hero Section - Solid, Crisp, High Contrast Dark Navy Theme */}
            <section className="border-b border-slate-800 bg-slate-950 py-16 text-white lg:py-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-3xl text-center">
                        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-500/40 bg-blue-500/20 px-4 py-1.5 text-xs font-semibold tracking-wide text-blue-300">
                            <History className="h-3.5 w-3.5" />
                            <span>PROFIL KELEMBAGAAN BMKG</span>
                        </div>
                        <h1 className="mb-6 text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
                            Sejarah Stasiun Meteorologi Kelas II Maritim Yos Soedarso Ambon
                        </h1>
                        <p className="text-base leading-relaxed text-slate-300 sm:text-lg">
                            Rekam jejak dan transformasi pengamatan meteorologi maritim di Kota Ambon:
                            berawal dari pos pengamatan hingga berdiri mandiri sebagai Unit Pelaksana
                            Teknis (UPT) yang menjaga keselamatan bahari di perairan Maluku.
                        </p>
                    </div>

                    {/* Quick Stats Grid - Crisp Solid Cards without blur */}
                    <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:gap-6">
                        <div className="rounded-2xl border border-slate-700/80 bg-slate-900/90 p-5 shadow-lg transition-transform duration-200 hover:-translate-y-1">
                            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/20 text-blue-400">
                                <Calendar className="h-5 w-5" />
                            </div>
                            <div className="text-2xl font-extrabold text-white sm:text-3xl">2019</div>
                            <div className="mt-1 text-xs font-medium text-slate-300">Tahun Ditetapkan UPT</div>
                        </div>

                        <div className="rounded-2xl border border-slate-700/80 bg-slate-900/90 p-5 shadow-lg transition-transform duration-200 hover:-translate-y-1">
                            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/20 text-cyan-400">
                                <Award className="h-5 w-5" />
                            </div>
                            <div className="text-2xl font-extrabold text-white sm:text-3xl">Kelas II</div>
                            <div className="mt-1 text-xs font-medium text-slate-300">Klasifikasi Stasiun BMKG</div>
                        </div>

                        <div className="rounded-2xl border border-slate-700/80 bg-slate-900/90 p-5 shadow-lg transition-transform duration-200 hover:-translate-y-1">
                            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/20 text-amber-400">
                                <Waves className="h-5 w-5" />
                            </div>
                            <div className="text-2xl font-extrabold text-white sm:text-3xl">18 Wilayah</div>
                            <div className="mt-1 text-xs font-medium text-slate-300">Zona Laut Maluku & Banda</div>
                        </div>

                        <div className="rounded-2xl border border-slate-700/80 bg-slate-900/90 p-5 shadow-lg transition-transform duration-200 hover:-translate-y-1">
                            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400">
                                <Clock className="h-5 w-5" />
                            </div>
                            <div className="text-2xl font-extrabold text-white sm:text-3xl">24 / 7</div>
                            <div className="mt-1 text-xs font-medium text-slate-300">Operasional Pelayanan</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Official Legal Basis Banner */}
            <section className="border-b bg-background py-12">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="relative overflow-hidden rounded-3xl border border-blue-500/20 bg-gradient-to-r from-blue-50/50 via-slate-50 to-cyan-50/50 p-8 shadow-sm dark:from-blue-950/20 dark:via-slate-900 dark:to-cyan-950/20 md:p-10">
                        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                            <div className="max-w-2xl">
                                <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-blue-600/10 px-3 py-1 text-xs font-semibold text-blue-600 dark:text-blue-400">
                                    <ShieldCheck className="h-4 w-4" />
                                    <span>LANDASAN HUKUM PENDIRIAN RESMI</span>
                                </div>
                                <h2 className="mb-3 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                                    Surat MenPAN-RB Nomor: B/126/M.KT.01/2019
                                </h2>
                                <p className="leading-relaxed text-muted-foreground">
                                    Stasiun Meteorologi Kelas II Maritim Yos Soedarso Ambon berdiri berdasarkan surat penataan organisasi
                                    yang disetujui oleh Menteri Pendayagunaan Aparatur Negara dan Reformasi
                                    Birokrasi, <strong>Drs. Syafruddin, M.Si</strong>, tertanggal <strong>8 Februari 2019</strong> perihal
                                    <em> Penataan Organisasi dan Tata Kerja Unit Pelaksana Teknis Badan Meteorologi, Klimatologi, dan Geofisika</em>.
                                    Sebelumnya merupakan pos pengamatan maritim dengan struktur organisasi mengikuti
                                    dari <strong>Stasiun Meteorologi Kelas II Pattimura Ambon</strong>.
                                </p>
                            </div>
                            <div className="shrink-0">
                                <div className="rounded-2xl border bg-card p-6 shadow-md dark:border-slate-800">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm">
                                            <Building2 className="h-6 w-6" />
                                        </div>
                                        <div>
                                            <div className="text-xs font-semibold text-muted-foreground uppercase">
                                                Klasifikasi UPT
                                            </div>
                                            <div className="text-base font-bold text-foreground">
                                                Stasiun Met. Kelas II Maritim
                                            </div>
                                            <div className="text-xs text-blue-600 dark:text-blue-400">
                                                Yos Soedarso Ambon, Maluku
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Timeline Section */}
            <section className="py-16 lg:py-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mx-auto mb-16 max-w-2xl text-center">
                        <div className="mb-2 inline-flex items-center gap-1.5 text-xs font-bold tracking-wider text-primary uppercase">
                            <Sparkles className="h-4 w-4" />
                            <span>PERJALANAN WAKTU</span>
                        </div>
                        <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
                            Kronologi Pembentukan & Perkembangan
                        </h2>
                        <p className="mt-3 text-muted-foreground">
                            Tahapan evolusi pelayanan meteorologi maritim di wilayah Maluku dari masa ke masa.
                        </p>
                    </div>

                    <div className="relative mx-auto max-w-4xl">
                        {/* Central vertical line for desktop */}
                        <div className="absolute top-0 bottom-0 left-8 hidden w-0.5 bg-border md:left-1/2 md:-ml-0.5 md:block" />

                        <div className="space-y-12">
                            {timelineEvents.map((event, index) => {
                                const isEven = index % 2 === 0;
                                const IconComponent = event.icon;

                                return (
                                    <div
                                        key={index}
                                        className={`relative flex flex-col md:flex-row md:items-center ${
                                            isEven ? 'md:flex-row-reverse' : ''
                                        }`}
                                    >
                                        {/* Center icon badge on timeline */}
                                        <div className="absolute top-0 left-8 -ml-4 flex h-8 w-8 items-center justify-center rounded-full border-4 border-background bg-blue-600 text-white shadow-md md:top-1/2 md:left-1/2 md:-mt-4 md:-ml-4">
                                            <IconComponent className="h-4 w-4" />
                                        </div>

                                        {/* Content Box */}
                                        <div className="ml-16 md:ml-0 md:w-1/2 md:px-8">
                                            <div className="rounded-2xl border bg-card p-6 shadow-sm transition-all duration-300 hover:border-primary/40 hover:shadow-md">
                                                <div className="mb-3 flex items-center justify-between gap-2">
                                                    <span className="text-sm font-bold text-primary">
                                                        {event.year}
                                                    </span>
                                                    <span
                                                        className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold ${event.badgeColor}`}
                                                    >
                                                        {event.badge}
                                                    </span>
                                                </div>

                                                <h3 className="mb-2 text-xl font-bold tracking-tight text-foreground">
                                                    {event.title}
                                                </h3>

                                                <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                                                    {event.description}
                                                </p>

                                                <div className="space-y-2 border-t pt-4">
                                                    {event.details.map((detail, dIdx) => (
                                                        <div
                                                            key={dIdx}
                                                            className="flex items-start gap-2 text-xs text-muted-foreground"
                                                        >
                                                            <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-600" />
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
                </div>
            </section>

            {/* Gallery Highlights & Documentation */}
            <section className="border-t bg-muted/30 py-16 lg:py-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mx-auto mb-12 max-w-2xl text-center">
                        <div className="mb-2 inline-flex items-center gap-1.5 text-xs font-bold tracking-wider text-primary uppercase">
                            <Users className="h-4 w-4" />
                            <span>DOKUMENTASI & KIPRAH</span>
                        </div>
                        <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
                            Fokus Pengabdian & Kegiatan Stasiun
                        </h2>
                        <p className="mt-3 text-muted-foreground">
                            Bentuk dedikasi operasional Stasiun Meteorologi Kelas II Maritim Yos Soedarso Ambon dalam memberikan edukasi dan jaminan keselamatan maritim.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                        {galleryHighlights.map((item, idx) => {
                            const IconCmp = item.icon;
                            return (
                                <div
                                    key={idx}
                                    className="flex flex-col rounded-2xl border bg-card p-6 shadow-sm transition-all duration-300 hover:shadow-md"
                                >
                                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400">
                                        <IconCmp className="h-6 w-6" />
                                    </div>
                                    <div className="mb-1 text-xs font-semibold tracking-wider text-primary uppercase">
                                        {item.category}
                                    </div>
                                    <h3 className="mb-3 text-lg font-bold text-foreground">
                                        {item.title}
                                    </h3>
                                    <p className="text-sm leading-relaxed text-muted-foreground">
                                        {item.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Station Identity & Specifications Table */}
            <section className="py-16">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-4xl rounded-3xl border bg-card p-8 shadow-sm md:p-12">
                        <div className="mb-8 flex flex-col items-start justify-between gap-4 border-b pb-6 sm:flex-row sm:items-center">
                            <div>
                                <h3 className="text-2xl font-bold tracking-tight text-foreground">
                                    Identitas Kelembagaan
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                    Data ringkas profil operasional Stasiun Meteorologi Kelas II Maritim Yos Soedarso Ambon.
                                </p>
                            </div>
                            <div className="inline-flex items-center gap-1.5 rounded-full border border-blue-500/20 bg-blue-500/10 px-3.5 py-1 text-xs font-semibold text-blue-600 dark:text-blue-400">
                                <BookOpen className="h-3.5 w-3.5" />
                                <span>Profil Resmi</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            {stationFacts.map((fact, fIdx) => (
                                <div
                                    key={fIdx}
                                    className="rounded-xl border bg-muted/20 p-4 transition-colors hover:bg-muted/40"
                                >
                                    <div className="text-xs font-medium text-muted-foreground">
                                        {fact.label}
                                    </div>
                                    <div className="mt-1 text-sm font-semibold text-foreground">
                                        {fact.val}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Location address highlight */}
                        <div className="mt-8 flex flex-col gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-900/50 sm:flex-row sm:items-center sm:justify-between">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                                    <MapPin className="h-5 w-5" />
                                </div>
                                <div>
                                    <div className="text-sm font-semibold text-foreground">
                                        Alamat Operasional
                                    </div>
                                    <div className="text-xs text-muted-foreground">
                                        Jl. Amanlanite, Waimahu, Latuhalat, Nusaniwe, Ambon 97118
                                    </div>
                                </div>
                            </div>
                            <a
                                href="https://stamar-ambon.bmkg.go.id/kontak"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
                            >
                                Hubungi Kantor Kami ↗
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Next Links CTA */}
            <section className="border-t bg-muted/40 py-12">
                <div className="container mx-auto px-4 text-center sm:px-6 lg:px-8">
                    <h3 className="mb-2 text-xl font-bold text-foreground">
                        Jelajahi Informasi Layanan Cuaca Maritim
                    </h3>
                    <p className="mb-6 text-sm text-muted-foreground">
                        Dapatkan data terkini prakiraan perairan pelabuhan dan peta cuaca maritim Maluku.
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-3">
                        <Link
                            href="/pelabuhan"
                            className="inline-flex items-center gap-2 rounded-full border bg-background px-5 py-2 text-sm font-semibold text-foreground shadow-sm hover:bg-muted"
                        >
                            <Anchor className="h-4 w-4 text-primary" />
                            <span>Prakiraan Pelabuhan</span>
                        </Link>
                        <Link
                            href="/mfy"
                            className="inline-flex items-center gap-2 rounded-full border bg-background px-5 py-2 text-sm font-semibold text-foreground shadow-sm hover:bg-muted"
                        >
                            <Waves className="h-4 w-4 text-primary" />
                            <span>Peta & Visual MFY</span>
                        </Link>
                        <Link
                            href="/buletin"
                            className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2 text-sm font-semibold text-primary-foreground shadow-md hover:bg-primary/90"
                        >
                            <span>Buletin Maritim</span>
                            <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
