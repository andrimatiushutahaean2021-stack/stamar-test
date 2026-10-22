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
            role: 'Kepala Stasiun',
            title: 'Pimpinan Eksekutif Stasiun',
            icon: ShieldCheck,
            badge: 'Pimpinan UPT',
            badgeColor: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
            desc: 'Memimpin, mengarahkan, dan mengkoordinasikan pelaksanaan seluruh tugas dan fungsi Stasiun Meteorologi Kelas II Maritim Yos Soedarso Ambon dalam pengamatan, pengelolaan data, diseminasi informasi, serta kemitraan lintas sektoral.',
            tasks: [
                'Perumusan kebijakan operasional dan teknis meteorologi maritim',
                'Koordinasi dengan BMKG Pusat, Balai Besar MKG Wilayah IV, dan Pemda',
                'Pengawasan operasional 24 jam dan mitigasi darurat maritim',
            ],
        },
        {
            role: 'Subbagian Tata Usaha (TU)',
            title: 'Administrasi & Kepegawaian',
            icon: Briefcase,
            badge: 'Tata Kelola & SDM',
            badgeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
            desc: 'Melaksanakan urusan tata usaha, persuratan, kepegawaian, keuangan, penyusunan rencana kerja anggaran, serta pengelolaan Barang Milik Negara (BMN) dan rumah tangga stasiun.',
            tasks: [
                'Pengelolaan administrasi kepegawaian dan kepatuhan disiplin ASN',
                'Pengelolaan perbendaharaan dan pertanggungjawaban keuangan negara',
                'Inventarisasi, pemeliharaan sarana prasarana, dan rumah tangga kantor',
            ],
        },
        {
            role: 'Kelompok Observasi & Pengamatan',
            title: 'Pengamatan Meteorologi Maritim',
            icon: Compass,
            badge: 'Observasi 24/7',
            badgeColor: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
            desc: 'Melaksanakan pengamatan sinoptik dan cuaca maritim permukaan secara berkala non-stop 24 jam, pencatatan parameter atmosfer, serta pemantauan tinggi gelombang dan dinamika laut.',
            tasks: [
                'Pengamatan rutin permukaan laut, angin, arus, dan pasang surut',
                'Perekaman data cuaca menggunakan instrumen konvensional dan otomatis',
                'Pengiriman laporan sinoptik dan cuaca maritim secara berkala ke GTS',
            ],
        },
        {
            role: 'Kelompok Data & Informasi (Forecaster)',
            title: 'Analisis & Prakiraan Cuaca',
            icon: Waves,
            badge: 'Analisis & Diseminasi',
            badgeColor: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
            desc: 'Melakukan analisis dinamika atmosfer dan oseanografi, penyusunan produk prakiraan cuaca untuk 18 zona perairan Maluku, cuaca pelabuhan, rute feri, dan pembuatan peringatan dini gelombang tinggi.',
            tasks: [
                'Penyusunan prakiraan cuaca harian dan mingguan perairan Maluku',
                'Diseminasi peringatan dini cuaca maritim ekstrem ke stakeholder pelayaran',
                'Penerbitan buletin berkala dan publikasi digital info cuaca laut',
            ],
        },
        {
            role: 'Kelompok Teknisi & Instrumentasi',
            title: 'Pemeliharaan Alat & Jaringan',
            icon: Wrench,
            badge: 'Pemeliharaan Fasilitas',
            badgeColor: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
            desc: 'Melaksanakan pemeliharaan preventif dan kuratif peralatan operasional stasiun, Automated Weather Station (AWS), radar cuaca maritim, sensor gelombang, dan jaringan transmisi data.',
            tasks: [
                'Kalibrasi dan perawatan rutin instrumen sensor meteorologi kelautan',
                'Troubleshooting perangkat keras, catu daya listrik, dan sistem komunikasi',
                'Pengamanan infrastruktur server dan integrasi transmisi data online',
            ],
        },
        {
            role: 'Unit Layanan Jasa & Kemitraan',
            title: 'Layanan Publik & Edukasi',
            icon: Radio,
            badge: 'Pelayanan Publik',
            badgeColor: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
            desc: 'Penyelenggaraan layanan data dan informasi untuk masyarakat, instansi maritim, pelabuhan, serta pelaksanaan Sekolah Lapang Cuaca Nelayan (SLCN) sebagai bentuk edukasi keselamatan berlayar.',
            tasks: [
                'Pelayanan permohonan data cuaca maritim untuk riset dan komersial',
                'Koordinasi dengan KSOP, Basarnas, Pelindo, dan operator pelayaran',
                'Pelaksanaan edukasi cuaca dan Sekolah Lapang Cuaca Nelayan (SLCN)',
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
                                Kepala Stasiun Meteorologi Kelas II Maritim Yos Soedarso Ambon
                            </h2>
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
                            Representasi visual struktur organisasi sesuai Surat Penataan Organisasi UPT BMKG.
                        </p>
                    </div>

                    <div className="mx-auto max-w-4xl overflow-hidden rounded-lg border bg-card p-4 shadow-sm sm:p-8">
                        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg border bg-slate-100 dark:bg-slate-900">
                            <img
                                src="https://stamar-ambon.bmkg.go.id/content/Struktur-Organisasi.png"
                                alt="Bagan Struktur Organisasi Stasiun Meteorologi Maritim Ambon"
                                className="h-full w-full object-contain p-2"
                                loading="lazy"
                            />
                        </div>

                        <div className="mt-6 flex flex-col items-center justify-between gap-4 border-t pt-6 sm:flex-row">
                            <div className="text-xs text-muted-foreground">
                                Sumber: Dokumen Resmi Penataan Organisasi BMKG Stasiun Maritim Ambon
                            </div>
                            <a
                                href="https://stamar-ambon.bmkg.go.id/content/Struktur-Organisasi.png"
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
