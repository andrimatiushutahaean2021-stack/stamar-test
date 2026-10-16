import { Head, Link, router } from '@inertiajs/react';
import {
    FileText,
    Compass,
    BookOpen,
    Waves,
    Globe,
    ArrowUpRight,
    ShieldCheck,
    AlertTriangle,
    Folder,
    ExternalLink,
    Trash2,
    PlusCircle,
    MapPin,
    Anchor,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DocumentItem {
    id: number;
    title: string;
    category: 'peringatan-dini' | 'provinsi' | 'buletin' | 'pelabuhan' | 'mfy' | 'bahari';
    description?: string;
    file_path: string;
    file_type: string;
    file_size: string;
    created_at: string;
}

interface CategoryCounts {
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
        'peringatan-dini': 0,
        provinsi: 0,
        buletin: 0,
        pelabuhan: 0,
        mfy: 0,
        bahari: 0,
    },
}: DashboardProps) {
    const categoryCards = [
        {
            id: 'peringatan-dini',
            title: '1. Peringatan Dini',
            subtitle: 'Cuaca Ekstrem & Gelombang Tinggi',
            folder: 'uploads/peringatan-dini/',
            count: categoryCounts['peringatan-dini'] || 0,
            icon: AlertTriangle,
            color: 'text-red-500',
            bgColor: 'bg-red-500/10',
            borderColor: 'hover:border-red-500/50',
            badgeBg:
                'bg-red-100 text-red-700 dark:bg-red-950/60 dark:text-red-300 border-red-200 dark:border-red-900',
            filterUrl: '/admin/documents?category=peringatan-dini',
        },
        {
            id: 'provinsi',
            title: '2. Cuaca Provinsi',
            subtitle: 'Upload Prakiraan Cuaca Provinsi Maluku',
            folder: 'uploads/provinsi/',
            count: categoryCounts['provinsi'] || 0,
            icon: MapPin,
            color: 'text-amber-500',
            bgColor: 'bg-amber-500/10',
            borderColor: 'hover:border-amber-500/50',
            badgeBg:
                'bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 border-amber-200 dark:border-amber-900',
            filterUrl: '/admin/documents?category=provinsi&action=upload',
        },
        {
            id: 'buletin',
            title: '3. Buletin Maritim',
            subtitle: 'Upload Majalah Digital & E-Magazine',
            folder: 'uploads/buletin/',
            count: categoryCounts['buletin'] || 0,
            icon: BookOpen,
            color: 'text-purple-500',
            bgColor: 'bg-purple-500/10',
            borderColor: 'hover:border-purple-500/50',
            badgeBg:
                'bg-purple-100 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300 border-purple-200 dark:border-purple-900',
            filterUrl: '/admin/documents?category=buletin&action=upload',
        },
        {
            id: 'pelabuhan',
            title: '4. Cuaca Pelabuhan',
            subtitle: 'Upload Dokumen Prakiraan Cuaca Pelabuhan',
            folder: 'uploads/pelabuhan/',
            count: (categoryCounts['pelabuhan'] ?? categoryCounts['mfy']) || 0,
            icon: Anchor,
            color: 'text-cyan-500',
            bgColor: 'bg-cyan-500/10',
            borderColor: 'hover:border-cyan-500/50',
            badgeBg:
                'bg-cyan-100 text-cyan-700 dark:bg-cyan-950/60 dark:text-cyan-300 border-cyan-200 dark:border-cyan-900',
            filterUrl: '/admin/documents?category=pelabuhan&action=upload',
        },
        {
            id: 'bahari',
            title: '5. Wisata Bahari',
            subtitle: 'Wisata Bahari & Keselamatan Pantai',
            folder: 'uploads/bahari/',
            count: categoryCounts['bahari'] || 0,
            icon: Waves,
            color: 'text-teal-500',
            bgColor: 'bg-teal-500/10',
            borderColor: 'hover:border-teal-500/50',
            badgeBg:
                'bg-teal-100 text-teal-700 dark:bg-teal-950/60 dark:text-teal-300 border-teal-200 dark:border-teal-900',
            filterUrl: '/admin/documents?category=bahari',
        },
    ];

    const deleteDocument = (id: number, title: string) => {
        if (confirm(`Apakah Anda yakin ingin menghapus file "${title}"?`)) {
            router.delete(`/admin/documents/${id}`, {
                preserveScroll: true,
            });
        }
    };

    const getCategoryBadge = (category: string) => {
        const found = categoryCards.find((c) => c.id === category || (c.id === 'pelabuhan' && category === 'mfy'));
        if (found) {
            const Icon = found.icon;
            return (
                <span
                    className={`inline-flex items-center gap-1.5 rounded-md border px-2.5 py-0.5 text-xs font-bold ${found.badgeBg}`}
                >
                    <Icon className="h-3 w-3" />
                    {found.title.split('. ')[1] || found.title}
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

            {/* Top Welcome Hero */}
            <div className="relative overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 p-6 text-white shadow-xl sm:p-8">
                <div className="pointer-events-none absolute top-0 right-0 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl"></div>
                <div className="pointer-events-none absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-cyan-500/10 blur-3xl"></div>

                <div className="relative z-10 flex flex-col justify-between gap-6 md:flex-row md:items-center">
                    <div className="space-y-2">
                        <div className="inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/20 px-3 py-1 text-xs font-semibold text-blue-300 backdrop-blur-md">
                            <ShieldCheck className="h-3.5 w-3.5 text-blue-400" />
                            <span>
                                Pusat Kendali Managemen File STAMAR Ambon
                            </span>
                        </div>
                        <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl lg:text-4xl">
                            Manajemen File & Dokumen
                        </h1>
                        <p className="max-w-2xl text-sm leading-relaxed text-slate-300">
                            Kelola 5 klasifikasi folder upload:{' '}
                            <span className="font-semibold text-white">
                                Peringatan Dini
                            </span>
                            ,{' '}
                            <span className="font-semibold text-white">
                                Cuaca Provinsi
                            </span>
                            ,{' '}
                            <span className="font-semibold text-white">
                                Buletin Maritim
                            </span>
                            ,{' '}
                            <span className="font-semibold text-white">
                                Cuaca Pelabuhan
                            </span>
                            , dan{' '}
                            <span className="font-semibold text-white">
                                Wisata Bahari
                            </span>
                            .
                        </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                        <Link href="/admin/documents">
                            <Button className="h-10 gap-2 rounded-xl bg-blue-600 px-4 text-xs font-semibold text-white shadow-lg hover:bg-blue-500">
                                <PlusCircle className="h-4 w-4" />
                                <span>Unggah & Kelola File</span>
                            </Button>
                        </Link>
                        <Link href="/" target="_blank">
                            <Button
                                variant="outline"
                                className="h-10 gap-2 rounded-xl border-slate-700 bg-slate-800/80 px-4 text-xs font-semibold text-white hover:bg-slate-700"
                            >
                                <Globe className="h-4 w-4 text-cyan-400" />
                                <span>Lihat Web Publik</span>
                                <ArrowUpRight className="h-3.5 w-3.5 opacity-60" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>

            {/* 5 Classification Folders Metric Cards */}
            <div>
                <div className="mb-3.5 flex items-center justify-between">
                    <div>
                        <h2 className="flex items-center gap-2 text-base font-bold text-foreground">
                            <Folder className="h-5 w-5 text-primary" />
                            Klasifikasi Folder Upload Berkas
                        </h2>
                        <p className="text-xs text-muted-foreground">
                            Struktur 5 folder penyimpanan berkas publikasi BMKG
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
                    {categoryCards.map((cat) => {
                        const Icon = cat.icon;
                        return (
                            <Link
                                key={cat.id}
                                href={cat.filterUrl}
                                className={`group flex flex-col justify-between rounded-2xl border border-border bg-card p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg ${cat.borderColor}`}
                            >
                                <div>
                                    <div className="mb-3 flex items-center justify-between">
                                        <div
                                            className={`rounded-xl p-3 ${cat.bgColor} ${cat.color} transition-transform group-hover:scale-110`}
                                        >
                                            <Icon className="h-6 w-6" />
                                        </div>
                                        <span className="text-lg font-extrabold text-foreground">
                                            {cat.count}{' '}
                                            <span className="text-xs font-normal text-muted-foreground">
                                                file
                                            </span>
                                        </span>
                                    </div>
                                    <h3 className="text-base font-bold text-foreground transition-colors group-hover:text-primary">
                                        {cat.title}
                                    </h3>
                                    <p className="mt-1 text-xs text-muted-foreground">
                                        {cat.subtitle}
                                    </p>
                                </div>

                                <div className="mt-4 flex items-center justify-between border-t border-border pt-3 text-xs font-semibold">
                                    <span className="max-w-[120px] truncate font-mono text-[10px] text-muted-foreground">
                                        {cat.folder}
                                    </span>
                                    <span className="flex items-center gap-1 text-primary group-hover:underline">
                                        Kelola &rarr;
                                    </span>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>

            {/* Recent Uploaded Documents Table */}
            <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-sm">
                <div className="flex flex-col justify-between gap-4 border-b border-border bg-muted/20 p-5 sm:flex-row sm:items-center sm:p-6">
                    <div>
                        <h3 className="text-base font-bold text-foreground">
                            Daftar Berkas Terakhir Diunggah
                        </h3>
                        <p className="text-xs text-muted-foreground">
                            Total {totalDocuments} berkas tersimpan di semua
                            folder upload
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Link href="/admin/documents">
                            <Button
                                size="sm"
                                className="gap-1.5 rounded-xl text-xs font-semibold"
                            >
                                <PlusCircle className="h-3.5 w-3.5" />
                                <span>Unggah Berkas Baru</span>
                            </Button>
                        </Link>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="border-b border-border bg-muted/40 text-xs font-semibold text-muted-foreground uppercase">
                            <tr>
                                <th className="px-6 py-3.5">Nama Dokumen</th>
                                <th className="px-6 py-3.5">Kategori Folder</th>
                                <th className="px-6 py-3.5">Format & Ukuran</th>
                                <th className="px-6 py-3.5">Waktu Unggah</th>
                                <th className="px-6 py-3.5 text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {recentDocuments.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan={5}
                                        className="px-6 py-10 text-center text-xs text-muted-foreground"
                                    >
                                        Belum ada berkas yang diunggah. Silakan
                                        klik tombol{' '}
                                        <strong>Unggah Berkas Baru</strong>.
                                    </td>
                                </tr>
                            ) : (
                                recentDocuments.map((doc) => (
                                    <tr
                                        key={doc.id}
                                        className="group transition-colors hover:bg-muted/30"
                                    >
                                        <td className="px-6 py-4 font-medium text-foreground">
                                            <div className="flex items-center gap-3">
                                                <div className="rounded-lg bg-primary/10 p-2 text-primary">
                                                    <FileText className="h-4 w-4" />
                                                </div>
                                                <div>
                                                    <span className="block font-bold text-foreground transition-colors group-hover:text-primary">
                                                        {doc.title}
                                                    </span>
                                                    {doc.description && (
                                                        <span className="line-clamp-1 text-xs text-muted-foreground">
                                                            {doc.description}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            {getCategoryBadge(doc.category)}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <span className="rounded border border-border bg-muted px-2 py-0.5 font-mono text-[10px] font-bold text-foreground uppercase">
                                                    {doc.file_type || 'PDF'}
                                                </span>
                                                <span className="text-xs text-muted-foreground">
                                                    {doc.file_size}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-xs text-muted-foreground">
                                            {new Date(
                                                doc.created_at,
                                            ).toLocaleDateString('id-ID', {
                                                day: 'numeric',
                                                month: 'short',
                                                year: 'numeric',
                                            })}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <a
                                                    href={`/storage/${doc.file_path}`}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="inline-flex h-8 items-center gap-1 rounded-lg bg-muted px-3 text-xs font-semibold transition-colors hover:bg-primary hover:text-primary-foreground"
                                                >
                                                    <ExternalLink className="h-3.5 w-3.5" />
                                                    <span>Lihat</span>
                                                </a>

                                                <Button
                                                    variant="destructive"
                                                    size="sm"
                                                    onClick={() =>
                                                        deleteDocument(
                                                            doc.id,
                                                            doc.title,
                                                        )
                                                    }
                                                    className="h-8 rounded-lg px-2.5"
                                                    title="Hapus File"
                                                >
                                                    <Trash2 className="h-3.5 w-3.5" />
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
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
