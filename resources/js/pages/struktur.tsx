import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/layouts/public-layout';
import {
    Network,
    Users,
    Building2,
    ShieldCheck,
    Compass,
    Waves,
    FileSpreadsheet,
    Wrench,
    Radio,
    BookOpen,
    ArrowRight,
    ExternalLink,
    Briefcase,
    Sparkles,
    CheckCircle2,
} from 'lucide-react';

export default function Struktur() {
    const unitList = [
        {
            role: 'Kepala UPT',
            title: 'Pimpinan Tertinggi Stasiun',
            icon: ShieldCheck,
            badge: 'Pimpinan UPT',
            badgeColor: 'bg-blue-600/10 text-blue-700 dark:text-blue-300 border-blue-500/30',
            desc: 'Memimpin, mengarahkan, dan mengendalikan pelaksanaan seluruh tugas serta fungsi Stasiun Meteorologi Kelas II Maritim Yos Soedarso Ambon dalam pengamatan cuaca laut, analisis prakiraan, tata kelola kelembagaan, dan kemitraan kemaritiman di Maluku.',
            tasks: [
                'Penetapan kebijakan operasional dan teknis meteorologi maritim stasiun',
                'Pengawasan operasional 24 jam dan mitigasi darurat cuaca ekstrem maritim',
                'Koordinasi strategis dengan BMKG Pusat, BBMKG Wilayah IV, KSOP, Basarnas, Pelindo, dan Pemda',
            ],
        },
        {
            role: 'Tata Usaha',
            title: 'Urusan Administrasi, Kepegawaian & BMN',
            icon: Briefcase,
            badge: 'Administrasi & Umum',
            badgeColor: 'bg-teal-600/10 text-teal-700 dark:text-teal-300 border-teal-500/30',
            desc: 'Menyelenggarakan tata kelola administrasi persuratan dinas, kearsipan, pembinaan kepegawaian ASN, pengelolaan Barang Milik Negara (BMN), kerumahtanggaan kantor, serta mengoordinasikan penugasan tenaga pendukung (PPNPN).',
            tasks: [
                'Pengelolaan administrasi persuratan resmi, kearsipan dinas, dan ketatausahaan',
                'Administrasi kepegawaian, formasi, kenaikan pangkat, disiplin, dan diklat pegawai',
                'Pengelolaan, inventarisasi, dan perawatan sarana prasarana BMN serta rumah tangga dinas',
            ],
        },
        {
            role: 'PPNPN',
            title: 'Pegawai Pemerintah Non Pegawai Negeri',
            icon: Users,
            badge: 'Bawahan Tata Usaha',
            badgeColor: 'bg-blue-700/10 text-blue-800 dark:text-blue-200 border-blue-600/30',
            desc: 'Melaksanakan penugasan teknis dan dukungan operasional harian kantor di bawah supervisi Subbagian Tata Usaha, mencakup pengamanan fisik lingkungan kantor stasiun, ketertiban fasilitas, kebersihan, serta dukungan mobilitas kedinasan.',
            tasks: [
                'Pengamanan fisik gedung kantor, instalasi taman alat meteorologi, dan aset dinas selama 24 jam',
                'Pemeliharaan kebersihan ruang kerja, sarana operasional, dan lingkungan stasiun',
                'Dukungan operasional logistik kantor, ekspedisi kedinasan, dan tata graha fasilitas kerja',
            ],
        },
        {
            role: 'Bendahara',
            title: 'Pengelolaan Keuangan & Perbendaharaan',
            icon: FileSpreadsheet,
            badge: 'Keuangan & Anggaran',
            badgeColor: 'bg-teal-600/10 text-teal-700 dark:text-teal-300 border-teal-500/30',
            desc: 'Melaksanakan urusan penatausahaan perbendaharaan negara, pencatatan transaksi keuangan, verifikasi dokumen bukti pertanggungjawaban belanja dinas, serta penyusunan pelaporan keuangan stasiun yang transparan dan akuntabel.',
            tasks: [
                'Pencatatan kas dan penatausahaan transaksi perbendaharaan negara melalui sistem SAKTI',
                'Verifikasi keabsahan dokumen bukti pertanggungjawaban anggaran belanja (SPJ)',
                'Penyusunan laporan realisasi anggaran berkala dan koordinasi dengan KPPN Ambon',
            ],
        },
        {
            role: 'Operasional',
            title: 'Observasi, Analisis & Layanan Maritim 24/7',
            icon: Waves,
            badge: 'Teknis & Layanan Maritim',
            badgeColor: 'bg-teal-600/10 text-teal-700 dark:text-teal-300 border-teal-500/30',
            desc: 'Mengoordinasikan pelaksanaan seluruh kegiatan teknis operasional maritim non-stop 24 jam, mencakup pengamatan permukaan laut, analisis atmosfer, prakiraan wilayah perairan, peringatan dini gelombang tinggi, dan kesiapan instrumen.',
            tasks: [
                'Pengawasan operasional shift pengamatan cuaca laut dan sinoptik 24 jam secara berkelanjutan',
                'Pengendalian mutu (Quality Control) data pengamatan maritim dan diseminasi informasi publik',
                'Koordinasi penyusunan prakiraan cuaca 18 perairan Maluku, rute penyeberangan feri, dan buletin resmi',
            ],
        },
        {
            role: 'Pegawai',
            title: 'Fungsional Teknis (Forecaster, Observer, Teknisi)',
            icon: Network,
            badge: 'Bawahan Operasional',
            badgeColor: 'bg-blue-700/10 text-blue-800 dark:text-blue-200 border-blue-600/30',
            desc: 'Para pejabat fungsional dan staf pelaksana teknis yang bertugas langsung di garda terdepan (sistem shift 24 jam), mencakup Prakirawan Cuaca (Forecaster), Pengamat Cuaca (Observer), dan Teknisi Instrumentasi.',
            tasks: [
                'Melaksanakan pengamatan rutin cuaca permukaan laut, angin, arus, dan pasang surut di stasiun/pelabuhan',
                'Menganalisis dinamika atmosfer-laut dan memproduksi prakiraan maritim harian/mingguan serta peringatan dini',
                'Melaksanakan kalibrasi, pemeliharaan preventif sensor AWS maritim, radar cuaca, dan jaringan komunikasi data',
            ],
        },
    ];

    return (
        <PublicLayout>
            <Head title="Struktur Organisasi - Stasiun Meteorologi Kelas II Maritim Yos Soedarso Ambon - BMKG" />

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
                        <span className="font-semibold text-foreground">Struktur Organisasi</span>
                    </nav>
                </div>
            </div>

            {/* Hero Section */}
            <section className="border-b border-slate-800 bg-slate-950 py-12 text-white lg:py-14">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-3xl text-center">
                        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-500/40 bg-blue-500/20 px-4 py-1.5 text-xs font-semibold tracking-wide text-blue-300">
                            <Network className="h-3.5 w-3.5" />
                            <span>BAGAN & TATA KERJA ORGANISASI</span>
                        </div>
                        <h1 className="mb-6 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-4xl">
                            Struktur Organisasi Stasiun Meteorologi Kelas II Maritim Yos Soedarso Ambon
                        </h1>
                        <p className="text-base leading-relaxed text-slate-300 sm:text-lg">
                            Susunan hierarki kepemimpinan, unit tata usaha, dan kelompok jabatan fungsional teknis
                            dalam mengemban amanah pelayanan keselamatan meteorologi maritim di wilayah Maluku.
                        </p>
                    </div>

                    {/* Hierarchy Top Card */}
                    <div className="mx-auto mt-12 max-w-2xl rounded-lg border border-slate-700/80 bg-slate-900/90 p-6 shadow-sm sm:p-8">
                        <div className="flex flex-col items-center text-center">
                            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-lg bg-white p-2 shadow-sm border border-slate-700/80">
                                <img
                                    src="/images/logo-bmkg.png"
                                    alt="Logo BMKG"
                                    className="h-full w-full object-contain"
                                />
                            </div>
                            <span className="rounded-full border border-blue-400/30 bg-blue-500/10 px-3 py-1 text-xs font-bold text-blue-300 uppercase">
                                Pimpinan Tertinggi UPT
                            </span>
                            <h2 className="mt-2 text-2xl font-bold text-white">
                                Kepala UPT
                            </h2>
                            <p className="mt-1 text-sm font-semibold text-blue-300">
                                Stasiun Meteorologi Kelas II Maritim Yos Soedarso Ambon
                            </p>
                            <p className="mt-2 max-w-lg text-sm text-slate-300">
                                Bertanggung jawab secara operasional dan manajerial kepada Kepala Badan Meteorologi,
                                Klimatologi, dan Geofisika melalui koordinasi Balai Besar Meteorologi, Klimatologi,
                                dan Geofisika Wilayah IV.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Official Diagram Section */}
            <section className="border-b bg-background py-12">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mx-auto mb-10 max-w-2xl text-center">
                        <div className="mb-2 inline-flex items-center gap-1.5 text-xs font-bold tracking-wider text-primary uppercase">
                            <Sparkles className="h-4 w-4" />
                            <span>DIAGRAM RESMI</span>
                        </div>
                        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                            Bagan Struktur Organisasi
                        </h2>
                        <p className="mt-3 text-muted-foreground">
                            Representasi visual susunan hierarki unit kerja dan tata hubungan operasional pada UPT Stasiun Meteorologi Maritim Ambon.
                        </p>
                    </div>

                    <div className="mx-auto max-w-4xl overflow-hidden rounded-2xl border bg-card p-4 shadow-md sm:p-8">
                        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border bg-white dark:bg-slate-900 shadow-inner">
                            <img
                                src="/images/struktur-organisasi.jpg"
                                alt="Bagan Struktur Organisasi Stasiun Meteorologi Maritim Ambon - Kepala UPT, Tata Usaha, PPNPN, Bendahara, Operasional, Pegawai"
                                className="h-full w-full object-contain p-3 sm:p-4"
                                loading="lazy"
                            />
                        </div>

                        <div className="mt-6 flex flex-col items-center justify-between gap-4 border-t pt-6 sm:flex-row">
                            <div className="text-xs text-muted-foreground">
                                Sumber: Dokumen Resmi Bagan Struktur Organisasi BMKG Stasiun Maritim Ambon
                            </div>
                            <a
                                href="/images/struktur-organisasi.jpg"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 rounded-full border bg-background px-4 py-2 text-xs font-semibold text-foreground shadow-sm hover:bg-muted"
                            >
                                <ExternalLink className="h-3.5 w-3.5" />
                                <span>Buka Gambar Resolusi Penuh ↗</span>
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Detailed Unit Breakdown Grid */}
            <section className="py-12 lg:py-14">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mx-auto mb-12 max-w-2xl text-center">
                        <div className="mb-2 inline-flex items-center gap-1.5 text-xs font-bold tracking-wider text-primary uppercase">
                            <Users className="h-4 w-4" />
                            <span>PEMBAGIAN PERAN & TANGGUNG JAWAB</span>
                        </div>
                        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                            Uraian Unit Kerja & Fungsi
                        </h2>
                        <p className="mt-3 text-muted-foreground">
                            Setiap unit dan kelompok fungsional bersinergi menghadirkan data cuaca maritim yang akurat dan terpercaya.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {unitList.map((unit, idx) => {
                            const IconComponent = unit.icon;
                            return (
                                <div
                                    key={idx}
                                    className="flex flex-col justify-between rounded-lg border bg-card p-6 shadow-sm transition-all duration-300 hover:border-primary/40 hover:shadow-sm"
                                >
                                    <div>
                                        <div className="mb-4 flex items-center justify-between">
                                            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-600/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400">
                                                <IconComponent className="h-6 w-6" />
                                            </div>
                                            <span
                                                className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold ${unit.badgeColor}`}
                                            >
                                                {unit.badge}
                                            </span>
                                        </div>

                                        <h3 className="text-lg font-bold text-foreground">{unit.role}</h3>
                                        <div className="text-xs font-medium text-primary">{unit.title}</div>

                                        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                                            {unit.desc}
                                        </p>
                                    </div>

                                    <div className="mt-6 border-t pt-4">
                                        <div className="mb-2 text-xs font-bold tracking-wider text-foreground uppercase">
                                            Tugas Utama:
                                        </div>
                                        <ul className="space-y-1.5">
                                            {unit.tasks.map((task, tIdx) => (
                                                <li
                                                    key={tIdx}
                                                    className="flex items-start gap-2 text-xs text-muted-foreground"
                                                >
                                                    <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-600 dark:text-emerald-400" />
                                                    <span>{task}</span>
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

            {/* Other Profiles Navigation */}
            <section className="border-t bg-muted/30 py-12">
                <div className="container mx-auto px-4 text-center sm:px-6 lg:px-8">
                    <h3 className="mb-2 text-xl font-bold text-foreground">
                        Kenali Profil Stasiun Lebih Lanjut
                    </h3>
                    <p className="mb-6 text-sm text-muted-foreground">
                        Pelajari rekam jejak sejarah, visi misi kelembagaan, serta tugas pokok fungsi stasiun.
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
                            href="/visimisi"
                            className="inline-flex items-center gap-2 rounded-full border bg-background px-5 py-2 text-sm font-semibold text-foreground shadow-sm hover:bg-muted"
                        >
                            <Sparkles className="h-4 w-4 text-primary" />
                            <span>Visi & Misi</span>
                        </Link>
                        <Link
                            href="/tupoksi"
                            className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90"
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
