import { Head, Link, router } from '@inertiajs/react';
import {
    FileText,
    BookOpen,
    Waves,
    Globe,
    ArrowUpRight,
    ShieldCheck,
    AlertTriangle,
    Folder,
    ExternalLink,
    MapPin,
    Anchor,
    Image as ImageIcon,
    UploadCloud,
    ArrowRight,
    Activity,
    Layers,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DocumentItem {
    id: number;
    title: string;
    category: 'infografis' | 'peringatan-dini' | 'provinsi' | 'buletin' | 'pelabuhan' | 'mfy' | 'bahari';
    description?: string;
    file_path: string;
    file_type: string;
    file_size: string;
    created_at: string;
}

interface CategoryCounts {
    infografis?: number;
    'peringatan-dini': number;
    provinsi: number;
    buletin: number;
    pelabuhan?: number;
    mfy?: number;
    bahari: number;
}

interface DashboardProps {
    recentDocuments?: DocumentItem[];
    totalDocuments?: number;
    categoryCounts?: CategoryCounts;
}

export default function Dashboard({
    recentDocuments = [],
    totalDocuments = 0,
    categoryCounts = {
        infografis: 0,
        'peringatan-dini': 0,
        provinsi: 0,
        buletin: 0,
        pelabuhan: 0,
        mfy: 0,
        bahari: 0,
    },
}: DashboardProps) {
    const categories = [
        {
            id: 'pelabuhan',
            title: 'Cuaca Pelabuhan',
            desc: 'Prakiraan harian/mingguan untuk 37 pelabuhan Maluku',
            count: (categoryCounts['pelabuhan'] ?? categoryCounts['mfy']) || 0,
            icon: Anchor,
            color: 'text-cyan-500',
            bgColor: 'bg-cyan-500/10',
            badgeBg: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-950/60 dark:text-cyan-300 border-cyan-200 dark:border-cyan-900',
        },
        {
            id: 'provinsi',
            title: 'Cuaca Wilayah Provinsi',
            desc: 'Informasi cuaca 18 wilayah perairan se-Provinsi Maluku',
            count: categoryCounts['provinsi'] || 0,
            icon: MapPin,
            color: 'text-amber-500',
            bgColor: 'bg-amber-500/10',
            badgeBg: 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border-amber-200 dark:border-amber-900',
        },
        {
            id: 'infografis',
            title: 'Infografis & Peta Visual',
            desc: 'Rilis visual harian, peta gelombang, dan grafis cuaca',
            count: categoryCounts['infografis'] || 0,
            icon: ImageIcon,
            color: 'text-indigo-500',
            bgColor: 'bg-indigo-500/10',
            badgeBg: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-950/60 dark:text-indigo-300 border-indigo-200 dark:border-indigo-900',
        },
        {
            id: 'bahari',
            title: 'Wisata Bahari',
            desc: 'Prakiraan kondisi cuaca di pesisir dan pantai wisata',
            count: categoryCounts['bahari'] || 0,
            icon: Waves,
            color: 'text-teal-500',
            bgColor: 'bg-teal-500/10',
            badgeBg: 'bg-teal-100 text-teal-800 dark:bg-teal-950/60 dark:text-teal-300 border-teal-200 dark:border-teal-900',
        },
        {
            id: 'buletin',
            title: 'Buletin Maritim',
            desc: 'E-magazine dan majalah bulanan cuaca maritim',
            count: categoryCounts['buletin'] || 0,
            icon: BookOpen,
            color: 'text-purple-500',
            bgColor: 'bg-purple-500/10',
            badgeBg: 'bg-purple-100 text-purple-800 dark:bg-purple-950/60 dark:text-purple-300 border-purple-200 dark:border-purple-900',
        },
        {
            id: 'peringatan-dini',
            title: 'Peringatan Dini Gelombang',
            desc: 'Peringatan potensi gelombang tinggi dan cuaca ekstrem',
            count: categoryCounts['peringatan-dini'] || 0,
            icon: AlertTriangle,
            color: 'text-red-500',
            bgColor: 'bg-red-500/10',
            badgeBg: 'bg-red-100 text-red-800 dark:bg-red-950/60 dark:text-red-300 border-red-200 dark:border-red-900',
        },
    ];

    const getCategoryBadge = (category: string) => {
        const found = categories.find(
            (c) => c.id === category || (c.id === 'pelabuhan' && category === 'mfy'),
        );
        if (found) {
            const Icon = found.icon;
            return (
                <span
                    className={`inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-0.5 text-xs font-semibold ${found.badgeBg}`}
                >
                    <Icon className="h-3 w-3" />
                    {found.title}
                </span>
            );
        }
        return (
            <span className="inline-flex items-center rounded bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                {category}
            </span>
        );
    };

    return (
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 p-4 sm:p-6 lg:p-8">
            <Head title="Panel Admin - BMKG Stamar Ambon" />

            {/* Top Welcome Hero Banner */}
            <div className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 p-6 text-white shadow-xl sm:p-8">
                <div className="pointer-events-none absolute top-0 right-0 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl"></div>
                <div className="pointer-events-none absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-cyan-500/10 blur-3xl"></div>

                <div className="relative z-10 flex flex-col justify-between gap-6 md:flex-row md:items-center">
                    <div className="space-y-2">
                        <div className="inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/20 px-3 py-1 text-xs font-semibold text-blue-300 backdrop-blur-md">
                            <ShieldCheck className="h-3.5 w-3.5 text-blue-400" />
                            <span>Stasiun Meteorologi Maritim Ambon</span>
                        </div>
                        <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl lg:text-4xl">
                            Panel Kontrol Operasional
                        </h1>
                        <p className="max-w-2xl text-sm leading-relaxed text-slate-300">
                            Ringkasan informasi publikasi cuaca maritim, monitoring status dokumen berkas publikasi, dan akses cepat pengelolaan website.
                        </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                        <Link href="/admin/documents">
                            <Button className="h-10 gap-2 rounded-xl bg-blue-600 px-4 text-xs font-bold text-white shadow-lg hover:bg-blue-500">
                                <Folder className="h-4 w-4" />
                                <span>Manajemen Dokumen</span>
                            </Button>
                        </Link>
                        <Link href="/admin/documents?action=upload">
                            <Button
                                variant="outline"
                                className="h-10 gap-2 rounded-xl border-slate-700 bg-slate-800/80 px-4 text-xs font-semibold text-white hover:bg-slate-700"
                            >
                                <UploadCloud className="h-4 w-4 text-blue-400" />
                                <span>Unggah Berkas</span>
                            </Button>
                        </Link>
                        <Link href="/" target="_blank">
                            <Button
                                variant="outline"
                                className="h-10 gap-2 rounded-xl border-slate-700 bg-slate-800/80 px-4 text-xs font-semibold text-white hover:bg-slate-700"
                            >
                                <Globe className="h-4 w-4 text-cyan-400" />
                                <span>Web Publik</span>
                                <ArrowUpRight className="h-3.5 w-3.5 opacity-60" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>

            {/* KPI Metric Summary Cards */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                            Total Berkas Publikasi
                        </span>
                        <div className="rounded-xl bg-primary/10 p-2.5 text-primary">
                            <Layers className="h-5 w-5" />
                        </div>
                    </div>
                    <div className="mt-3">
                        <h3 className="text-2xl font-black text-foreground">{totalDocuments}</h3>
                        <p className="mt-1 text-xs text-muted-foreground">Dokumen aktif terdistribusi di server</p>
                    </div>
                </div>

                <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                            Cuaca Pelabuhan
                        </span>
                        <div className="rounded-xl bg-cyan-500/10 p-2.5 text-cyan-500">
                            <Anchor className="h-5 w-5" />
                        </div>
                    </div>
                    <div className="mt-3">
                        <h3 className="text-2xl font-black text-foreground">
                            {(categoryCounts['pelabuhan'] ?? categoryCounts['mfy']) || 0}
                        </h3>
                        <p className="mt-1 text-xs text-muted-foreground">Prakiraan 37 pelabuhan penyeberangan</p>
                    </div>
                </div>

                <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                            Cuaca Provinsi
                        </span>
                        <div className="rounded-xl bg-amber-500/10 p-2.5 text-amber-500">
                            <MapPin className="h-5 w-5" />
                        </div>
                    </div>
                    <div className="mt-3">
                        <h3 className="text-2xl font-black text-foreground">{categoryCounts['provinsi'] || 0}</h3>
                        <p className="mt-1 text-xs text-muted-foreground">Prakiraan 18 perairan Maluku</p>
                    </div>
                </div>

                <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                            Infografis & Visual
                        </span>
                        <div className="rounded-xl bg-indigo-500/10 p-2.5 text-indigo-500">
                            <ImageIcon className="h-5 w-5" />
                        </div>
                    </div>
                    <div className="mt-3">
                        <h3 className="text-2xl font-black text-foreground">{categoryCounts['infografis'] || 0}</h3>
                        <p className="mt-1 text-xs text-muted-foreground">Peta rilis & infografis cuaca harian</p>
                    </div>
                </div>
            </div>

            {/* Two Column Layout: Channel Overview & Recent Activity */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
                {/* 6 Publication Channels Summary (5 Cols) */}
                <div className="flex flex-col rounded-3xl border border-border bg-card p-5 shadow-sm lg:col-span-5 sm:p-6">
                    <div className="mb-4 flex items-center justify-between">
                        <div>
                            <h3 className="text-base font-bold text-foreground flex items-center gap-2">
                                <Activity className="h-4 w-4 text-primary" />
                                Saluran Publikasi
                            </h3>
                            <p className="text-xs text-muted-foreground mt-0.5">
                                Status distribusi berkas di setiap kanal informasi
                            </p>
                        </div>
                        <Link
                            href="/admin/documents"
                            className="text-xs font-semibold text-primary hover:underline"
                        >
                            Kelola Semua &rarr;
                        </Link>
                    </div>

                    <div className="space-y-2.5 divide-y divide-border/60">
                        {categories.map((cat) => {
                            const Icon = cat.icon;
                            return (
                                <Link
                                    key={cat.id}
                                    href={`/admin/documents?category=${cat.id}`}
                                    className="group flex items-center justify-between pt-2.5 first:pt-0 transition-colors hover:text-primary"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className={`rounded-xl p-2.5 ${cat.bgColor} ${cat.color}`}>
                                            <Icon className="h-4 w-4" />
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-foreground group-hover:text-primary transition-colors">
                                                {cat.title}
                                            </p>
                                            <p className="text-[11px] text-muted-foreground line-clamp-1">
                                                {cat.desc}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2 shrink-0">
                                        <span className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-bold text-foreground">
                                            {cat.count}
                                        </span>
                                        <ArrowRight className="h-3.5 w-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </div>

                {/* Recent Documents Table (7 Cols) */}
                <div className="flex flex-col justify-between overflow-hidden rounded-3xl border border-border bg-card shadow-sm lg:col-span-7">
                    <div>
                        <div className="flex items-center justify-between border-b border-border bg-muted/20 p-5 sm:px-6">
                            <div>
                                <h3 className="text-base font-bold text-foreground flex items-center gap-2">
                                    <FileText className="h-4 w-4 text-primary" />
                                    Aktivitas Berkas Terbaru
                                </h3>
                                <p className="text-xs text-muted-foreground mt-0.5">
                                    Dokumen terakhir yang diterbitkan ke portal
                                </p>
                            </div>
                            <Link href="/admin/documents">
                                <Button size="sm" variant="outline" className="h-8 gap-1 rounded-xl text-xs font-semibold">
                                    <span>Lihat Semua</span>
                                    <ArrowRight className="h-3 w-3" />
                                </Button>
                            </Link>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm">
                                <tbody className="divide-y divide-border">
                                    {recentDocuments.length === 0 ? (
                                        <tr>
                                            <td className="px-6 py-12 text-center text-xs text-muted-foreground">
                                                Belum ada dokumen yang diunggah.
                                            </td>
                                        </tr>
                                    ) : (
                                        recentDocuments.slice(0, 6).map((doc) => (
                                            <tr key={doc.id} className="transition-colors hover:bg-muted/30">
                                                <td className="px-5 py-3.5">
                                                    <div className="max-w-[240px] sm:max-w-xs truncate">
                                                        <span className="block font-semibold text-xs text-foreground truncate">
                                                            {doc.title}
                                                        </span>
                                                        <span className="font-mono text-[10px] text-muted-foreground">
                                                            {new Date(doc.created_at).toLocaleDateString('id-ID', {
                                                                day: 'numeric',
                                                                month: 'short',
                                                                year: 'numeric',
                                                            })}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="px-3 py-3.5">
                                                    {getCategoryBadge(doc.category)}
                                                </td>
                                                <td className="px-5 py-3.5 text-right">
                                                    <a
                                                        href={`/storage/${doc.file_path}`}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className="inline-flex h-7 items-center gap-1 rounded-lg border border-border px-2 text-[11px] font-medium text-muted-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors"
                                                    >
                                                        <ExternalLink className="h-3 w-3" />
                                                        <span>Buka</span>
                                                    </a>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="border-t border-border bg-muted/10 p-3 text-center">
                        <Link
                            href="/admin/documents"
                            className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline"
                        >
                            <span>Buka Halaman Manajemen File & Dokumen Lengkap</span>
                            <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

Dashboard.layout = {
    breadcrumbs: [
        {
            title: 'Dashboard Panel',
            href: '/dashboard',
        },
    ],
};
