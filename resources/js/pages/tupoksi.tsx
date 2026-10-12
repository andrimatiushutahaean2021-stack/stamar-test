import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/layouts/public-layout';
import {
    Briefcase,
    FileText,
    Eye,
    Database,
    Waves,
    Wrench,
    Users,
    FolderKanban,
    Sparkles,
    CheckCircle2,
    BookOpen,
    Network,
    Target,
    ArrowRight,
    ShieldCheck,
    Layers,
    Server,
    LineChart,
    Search,
    HardDrive,
} from 'lucide-react';

export default function Tupoksi() {
    const dataManagementSteps = [
        {
            title: 'Pengumpulan Data',
            icon: Database,
            desc: 'Menghimpun seluruh data hasil pengamatan sinoptik, AWS Maritim, sensor gelombang, radar cuaca, dan citra satelit maritim secara terpusat.',
        },
        {
            title: 'Pengolahan Data',
            icon: Server,
            desc: 'Melakukan validasi, quality control (QC), dan standardisasi format data meteorologi kelautan sesuai kaidah organisasi meteorologi dunia (WMO).',
        },
        {
            title: 'Analisis & Prakiraan',
            icon: LineChart,
            desc: 'Menganalisis dinamika atmosfer dan interaksi laut-udara untuk menghasilkan prakiraan cuaca 18 zona perairan, pelabuhan, dan jalur penyeberangan.',
        },
        {
            title: 'Penyimpanan Data',
            icon: HardDrive,
            desc: 'Mengarsipkan database cuaca dan iklim maritim secara digital jangka panjang untuk keperluan historis, klimatologis, dan kajian sains.',
        },
        {
            title: 'Pengaksesan Data',
            icon: Search,
            desc: 'Menyediakan akses data terbuka dan transparan bagi masyarakat umum, akademisi, instansi pemerintah maritim, dan operator transportasi laut.',
        },
    ];

    const mainFunctions = [
        {
            number: '1',
            title: 'Pengamatan (Observasi)',
            icon: Eye,
            badge: 'Operasional 24/7',
            badgeColor: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
            desc: 'Melaksanakan pengamatan meteorologi maritim permukaan dan atmosfer secara kontinyu sesuai jadwal standar internasional.',
            points: [
                'Pengamatan parameter fisik atmosfer (suhu, kelembapan, tekanan udara, angin)',
                'Pemantauan parameter oseanografi (tinggi gelombang laut, swell, pasang surut air laut)',
                'Pengamatan jarak pandang mendatar (visibility) dan fenomena cuaca signifikan',
            ],
        },
        {
            number: '2',
            title: 'Pengelolaan Data',
            icon: Database,
            badge: 'Sistem Terpadu',
            badgeColor: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
            desc: 'Meliputi 5 rangkaian kerja: pengumpulan, pengolahan, analisis & prakiraan, penyimpanan, dan pengaksesan data cuaca maritim.',
            points: [
                'Pengumpulan & pengolahan data otomatis dari stasiun pemantau cuaca laut',
                'Analisis prakiraan cuaca harian dan peringatan dini gelombang tinggi',
                'Penyimpanan arsip digital serta penyediaan akses data resmi',
            ],
        },
        {
            number: '3',
            title: 'Pelayanan Jasa Meteorologi',
            icon: Waves,
            badge: 'Pelayanan Publik',
            badgeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
            desc: 'Menyediakan diseminasi produk informasi meteorologi maritim dan peringatan dini cuaca bagi pengguna jasa transportasi laut.',
            points: [
                'Prakiraan cuaca 18 zona perairan Maluku dan Laut Banda',
                'Prakiraan cuaca area pelabuhan dan rute penyeberangan feri',
                'Diseminasi peringatan dini gelombang tinggi (Early Warning System) 24/7',
            ],
        },
        {
            number: '4',
            title: 'Pemeliharaan Peralatan',
            icon: Wrench,
            badge: 'Keandalan Teknis',
            badgeColor: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
            desc: 'Melakukan pemeliharaan rutin, kalibrasi, serta perbaikan instrumen observasi meteorologi maritim dan jaringan komunikasi.',
            points: [
                'Perawatan berkala sensor AWS Maritim, tide gauge, dan anemometer',
                'Kalibrasi instrumen agar sesuai standar akurasi Badan Meteorologi Dunia (WMO)',
                'Pemeliharaan kontinuitas transmisi jaringan data telemetri',
            ],
        },
        {
            number: '5',
            title: 'Koordinasi & Kerjasama',
            icon: Users,
            badge: 'Sinergi Lintas Sektor',
            badgeColor: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
            desc: 'Membangun sinergi aktif dengan seluruh pemangku kepentingan maritim demi keselamatan transportasi laut dan kemaritiman.',
            points: [
                'Koordinasi dengan KSOP, Pelindo, Basarnas, TNI AL, dan Ditpolairud',
                'Kerjasama dengan asosiasi nelayan tradisional dan operator kapal niaga',
                'Integrasi data cuaca maritim dengan Pusat Informasi Pelabuhan',
            ],
        },
        {
            number: '6',
            title: 'Tugas Administrasi',
            icon: FolderKanban,
            badge: 'Tata Kelola',
            badgeColor: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
            desc: 'Penyelenggaraan administrasi umum, perencanaan anggaran, kepegawaian, keuangan, dan perlengkapan sarana stasiun.',
            points: [
                'Pengelolaan ketatausahaan, arsip dinas, dan persuratan elektronik',
                'Pengelolaan anggaran DIPA, pelaporan keuangan, dan akuntabilitas kinerja',
                'Manajemen SDM aparatur dan pemeliharaan aset Barang Milik Negara (BMN)',
            ],
        },
        {
            number: '7',
            title: 'Tugas Tambahan',
            icon: Sparkles,
            badge: 'Penugasan Khusus',
            badgeColor: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
            desc: 'Pelaksanaan tugas-tugas kedinasan khusus lainnya yang diamanatkan pimpinan BMKG untuk kemaslahatan masyarakat luas.',
            points: [
                'Penyelenggaraan Sekolah Lapang Cuaca Nelayan (SLCN) di pulau-pulau Maluku',
                'Dukungan cuaca maritim darurat saat terjadi operasi SAR kecelakaan laut',
                'Pengawalan informasi cuaca untuk event nasional/internasional kemaritiman',
            ],
        },
    ];

    return (
        <PublicLayout>
            <Head title="Tugas dan Fungsi - Stasiun Meteorologi Kelas II Maritim Yos Soedarso Ambon - BMKG" />

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
                        <span className="font-semibold text-foreground">Tugas dan Fungsi</span>
                    </nav>
                </div>
            </div>

            {/* Hero Section */}
            <section className="border-b border-slate-800 bg-slate-950 py-16 text-white lg:py-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-3xl text-center">
                        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-500/40 bg-blue-500/20 px-4 py-1.5 text-xs font-semibold tracking-wide text-blue-300">
                            <Briefcase className="h-3.5 w-3.5" />
                            <span>TUGAS POKOK & FUNGSI (TUPOKSI)</span>
                        </div>
                        <h1 className="mb-6 text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
                            Tugas dan Fungsi Stasiun Meteorologi Kelas II Maritim Yos Soedarso Ambon
                        </h1>
                        <p className="text-base leading-relaxed text-slate-300 sm:text-lg">
                            Mandat regulasi dan rincian tanggung jawab operasional dalam menyelenggarakan pelayanan
                            meteorologi maritim yang handal, cepat, dan akurat di perairan Maluku.
                        </p>
                    </div>
                </div>
            </section>

            {/* Legal Basis Callout Banner */}
            <section className="border-b bg-background py-12">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-4xl rounded-3xl border border-blue-500/20 bg-gradient-to-r from-blue-50/50 via-slate-50 to-cyan-50/50 p-8 shadow-sm dark:from-blue-950/20 dark:via-slate-900 dark:to-cyan-950/20 md:p-10">
                        <div className="flex flex-col gap-6 md:flex-row md:items-center">
                            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-md">
                                <FileText className="h-7 w-7" />
                            </div>
                            <div>
                                <div className="mb-1 text-xs font-bold tracking-wider text-blue-600 uppercase dark:text-blue-400">
                                    Landasan Regulasi Utama
                                </div>
                                <h2 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
                                    Peraturan Kepala BMKG Nomor 9 Tahun 2014
                                </h2>
                                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                                    Berdasarkan Perka BMKG No. 9 Tahun 2014 tentang <em>Uraian Tugas Stasiun Meteorologi</em>,
                                    Stasiun Meteorologi Maritim mengemban tugas pokok melaksanakan pengamatan, pengelolaan data,
                                    pelayanan jasa, pemeliharaan alat, koordinasi/kerjasama, tugas administrasi, dan tugas tambahan.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 7 Main Functions Section */}
            <section className="py-16 lg:py-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mx-auto mb-14 max-w-2xl text-center">
                        <div className="mb-2 inline-flex items-center gap-1.5 text-xs font-bold tracking-wider text-primary uppercase">
                            <Layers className="h-4 w-4" />
                            <span>7 PILAR OPERASIONAL</span>
                        </div>
                        <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
                            Rincian Tugas & Fungsi Pokok
                        </h2>
                        <p className="mt-3 text-muted-foreground">
                            Pilar fungsi kerja yang dilaksanakan secara berkesinambungan setiap hari.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {mainFunctions.map((item, idx) => {
                            const IconCmp = item.icon;
                            return (
                                <div
                                    key={idx}
                                    className="flex flex-col justify-between rounded-2xl border bg-card p-6 shadow-sm transition-all duration-300 hover:border-primary/40 hover:shadow-md"
                                >
                                    <div>
                                        <div className="mb-4 flex items-center justify-between">
                                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400">
                                                <IconCmp className="h-6 w-6" />
                                            </div>
                                            <span
                                                className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold ${item.badgeColor}`}
                                            >
                                                {item.badge}
                                            </span>
                                        </div>

                                        <div className="text-xs font-bold text-primary">Fungsi {item.number}</div>
                                        <h3 className="mt-1 text-xl font-bold text-foreground">{item.title}</h3>

                                        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                                            {item.desc}
                                        </p>
                                    </div>

                                    <div className="mt-6 border-t pt-4">
                                        <div className="mb-2 text-xs font-bold tracking-wider text-foreground uppercase">
                                            Ruang Lingkup:
                                        </div>
                                        <ul className="space-y-1.5">
                                            {item.points.map((pt, pIdx) => (
                                                <li
                                                    key={pIdx}
                                                    className="flex items-start gap-2 text-xs text-muted-foreground"
                                                >
                                                    <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-600 dark:text-emerald-400" />
                                                    <span>{pt}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Deep Dive: 5 Rangkaian Pengelolaan Data */}
            <section className="border-t bg-muted/30 py-16 lg:py-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mx-auto mb-12 max-w-2xl text-center">
                        <div className="mb-2 inline-flex items-center gap-1.5 text-xs font-bold tracking-wider text-primary uppercase">
                            <Database className="h-4 w-4" />
                            <span>ALUR KERJA DATA</span>
                        </div>
                        <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
                            5 Tahapan Pengelolaan Data Meteorologi Maritim
                        </h2>
                        <p className="mt-3 text-muted-foreground">
                            Siklus pengolahan data mulai dari sensor hingga menjadi informasi bermanfaat bagi publik.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
                        {dataManagementSteps.map((step, idx) => {
                            const IconCmp = step.icon;
                            return (
                                <div
                                    key={idx}
                                    className="flex flex-col rounded-2xl border bg-card p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
                                >
                                    <div className="mb-3 flex items-center justify-between">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400">
                                            <IconCmp className="h-5 w-5" />
                                        </div>
                                        <span className="text-xs font-extrabold text-muted-foreground">
                                            0{idx + 1}
                                        </span>
                                    </div>
                                    <h4 className="text-base font-bold text-foreground">{step.title}</h4>
                                    <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                                        {step.desc}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Other Profiles Navigation */}
            <section className="border-t bg-muted/40 py-12">
                <div className="container mx-auto px-4 text-center sm:px-6 lg:px-8">
                    <h3 className="mb-2 text-xl font-bold text-foreground">
                        Kenali Profil Stasiun Lebih Lanjut
                    </h3>
                    <p className="mb-6 text-sm text-muted-foreground">
                        Pelajari rekam jejak sejarah, bagan struktur organisasi, serta visi dan misi stasiun.
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
                            href="/visimisi"
                            className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2 text-sm font-semibold text-primary-foreground shadow-md hover:bg-primary/90"
                        >
                            <Target className="h-4 w-4" />
                            <span>Visi & Misi</span>
                            <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
