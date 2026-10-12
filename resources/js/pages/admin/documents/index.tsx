import { Head, useForm, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { useState, useMemo } from 'react';
import {
    FileText,
    Trash2,
    UploadCloud,
    Search,
    Folder,
    AlertTriangle,
    Compass,
    Waves,
    BookOpen,
    HardDrive,
    MapPin,
    Copy,
    Check,
    Download,
    Eye,
    Plus,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Manajemen File & Dokumen',
        href: '/admin/documents',
    },
];

interface Document {
    id: number;
    title: string;
    category: 'peringatan-dini' | 'provinsi' | 'buletin' | 'mfy' | 'bahari';
    description: string | null;
    file_path: string;
    file_type: string | null;
    file_size: string | null;
    created_at: string;
}

interface CategoryCounts {
    all: number;
    'peringatan-dini': number;
    provinsi: number;
    buletin: number;
    mfy: number;
    bahari: number;
}

interface Props {
    documents: Document[];
    categoryCounts: CategoryCounts;
    currentCategory: string;
    initialAction?: string;
}

export default function DocumentIndex({
    documents,
    categoryCounts,
    currentCategory,
    initialAction,
}: Props) {
    const [selectedTab, setSelectedTab] = useState<string>(currentCategory);
    const [searchTerm, setSearchTerm] = useState('');
    const [copiedId, setCopiedId] = useState<number | null>(null);
    const [showUploadModal, setShowUploadModal] = useState(
        initialAction === 'upload',
    );

    const defaultCat = (
        ['peringatan-dini', 'provinsi', 'buletin', 'mfy', 'bahari'].includes(
            selectedTab !== 'all' ? selectedTab : currentCategory,
        )
            ? selectedTab !== 'all'
                ? selectedTab
                : currentCategory
            : 'buletin'
    ) as 'peringatan-dini' | 'provinsi' | 'buletin' | 'mfy' | 'bahari';

    const { data, setData, post, processing, errors, reset } = useForm({
        title: '',
        category: defaultCat,
        description: '',
        file: null as File | null,
    });

    const categoryConfig = {
        'peringatan-dini': {
            label: 'Peringatan Dini',
            icon: AlertTriangle,
            color: 'text-red-500',
            bgColor: 'bg-red-500/10',
            badgeBg:
                'bg-red-100 text-red-700 dark:bg-red-950/60 dark:text-red-300 border-red-200 dark:border-red-900',
            folder: 'uploads/peringatan-dini/',
        },
        provinsi: {
            label: 'Cuaca Provinsi',
            icon: MapPin,
            color: 'text-amber-500',
            bgColor: 'bg-amber-500/10',
            badgeBg:
                'bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 border-amber-200 dark:border-amber-900',
            folder: 'uploads/provinsi/',
        },
        buletin: {
            label: 'Buletin Maritim',
            icon: BookOpen,
            color: 'text-purple-500',
            bgColor: 'bg-purple-500/10',
            badgeBg:
                'bg-purple-100 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300 border-purple-200 dark:border-purple-900',
            folder: 'uploads/buletin/',
        },
        mfy: {
            label: 'MFY',
            icon: Compass,
            color: 'text-cyan-500',
            bgColor: 'bg-cyan-500/10',
            badgeBg:
                'bg-cyan-100 text-cyan-700 dark:bg-cyan-950/60 dark:text-cyan-300 border-cyan-200 dark:border-cyan-900',
            folder: 'uploads/mfy/',
        },
        bahari: {
            label: 'Wisata Bahari',
            icon: Waves,
            color: 'text-teal-500',
            bgColor: 'bg-teal-500/10',
            badgeBg:
                'bg-teal-100 text-teal-700 dark:bg-teal-950/60 dark:text-teal-300 border-teal-200 dark:border-teal-900',
            folder: 'uploads/bahari/',
        },
    };

    const filteredDocuments = useMemo(() => {
        return documents.filter((doc) => {
            const matchesCategory =
                selectedTab === 'all' || doc.category === selectedTab;
            const matchesSearch =
                doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (doc.description &&
                    doc.description
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase()));
            return matchesCategory && matchesSearch;
        });
    }, [documents, selectedTab, searchTerm]);

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/admin/documents', {
            onSuccess: () => {
                reset();
                setShowUploadModal(false);
            },
            preserveScroll: true,
        });
    };

    const deleteDocument = (id: number, title: string) => {
        if (
            confirm(
                `Apakah Anda yakin ingin menghapus file "${title}"? Tindakan ini tidak dapat dibatalkan.`,
            )
        ) {
            router.delete(`/admin/documents/${id}`, {
                preserveScroll: true,
            });
        }
    };

    const copyLink = (filePath: string, id: number) => {
        const url = `${window.location.origin}/storage/${filePath}`;
        void navigator.clipboard.writeText(url);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2500);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Manajemen File & Folder Upload - Admin STAMAR" />

            <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 p-4 sm:p-6 lg:p-8">
                {/* Header Title & Actions */}
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                    <div>
                        <h1 className="flex items-center gap-2.5 text-2xl font-extrabold tracking-tight text-foreground">
                            <Folder className="h-7 w-7 text-primary" />
                            Manajemen File & Folder Upload
                        </h1>
                        <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
                            Kelola berkas terklasifikasi ke dalam 5 folder:
                            Peringatan Dini, Cuaca Provinsi, Buletin, MFY, dan
                            Wisata Bahari.
                        </p>
                    </div>

                    <Button
                        onClick={() => {
                            if (!showUploadModal) {
                                if (selectedTab !== 'all') {
                                    setData('category', selectedTab as any);
                                }
                            }
                            setShowUploadModal(!showUploadModal);
                        }}
                        className="h-11 gap-2 rounded-xl px-5 text-xs font-bold shadow-md"
                    >
                        <UploadCloud className="h-4 w-4" />
                        <span>
                            {showUploadModal
                                ? 'Tutup Form Upload'
                                : 'Unggah File Baru'}
                        </span>
                    </Button>
                </div>

                {/* Upload Form Card (Expandable) */}
                {showUploadModal && (
                    <div className="animate-in rounded-3xl border border-border bg-card p-6 shadow-xl duration-300 slide-in-from-top-3">
                        <div className="mb-5 flex items-center justify-between border-b border-border pb-4">
                            <h3 className="flex items-center gap-2 text-base font-bold text-foreground">
                                <UploadCloud className="h-5 w-5 text-primary" />{' '}
                                Formulir Unggah File
                            </h3>
                            <span className="text-xs text-muted-foreground">
                                Format didukung: PDF, PNG, JPG, JSON (Maks.
                                50MB)
                            </span>
                        </div>

                        <form onSubmit={submit} className="space-y-5">
                            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                                {/* Judul File */}
                                <div className="space-y-2">
                                    <Label
                                        htmlFor="title"
                                        className="text-xs font-semibold tracking-wider text-muted-foreground uppercase"
                                    >
                                        Judul / Nama File{' '}
                                        <span className="text-red-500">*</span>
                                    </Label>
                                    <Input
                                        id="title"
                                        type="text"
                                        placeholder="Contoh: Peringatan Gelombang Tinggi Laut Banda"
                                        value={data.title}
                                        onChange={(e) =>
                                            setData('title', e.target.value)
                                        }
                                        required
                                        className="h-11 rounded-xl"
                                    />
                                    {errors.title && (
                                        <p className="text-xs text-red-500">
                                            {errors.title}
                                        </p>
                                    )}
                                </div>

                                {/* Folder Kategori */}
                                <div className="space-y-2">
                                    <Label
                                        htmlFor="category"
                                        className="text-xs font-semibold tracking-wider text-muted-foreground uppercase"
                                    >
                                        Klasifikasi Folder{' '}
                                        <span className="text-red-500">*</span>
                                    </Label>
                                    <select
                                        id="category"
                                        value={data.category}
                                        onChange={(e) =>
                                            setData(
                                                'category',
                                                e.target.value as any,
                                            )
                                        }
                                        className="h-11 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:outline-none"
                                    >
                                        <option value="peringatan-dini">
                                            ⚠️ 1. Peringatan Dini
                                            (storage/peringatan-dini/)
                                        </option>
                                        <option value="provinsi">
                                            📍 2. Cuaca Provinsi
                                            (storage/provinsi/)
                                        </option>
                                        <option value="buletin">
                                            📖 3. Buletin Maritim
                                            (storage/buletin/)
                                        </option>
                                        <option value="mfy">
                                            🧭 4. MFY (storage/mfy/)
                                        </option>
                                        <option value="bahari">
                                            🌊 5. Wisata Bahari
                                            (storage/bahari/)
                                        </option>
                                    </select>
                                    {errors.category && (
                                        <p className="text-xs text-red-500">
                                            {errors.category}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Deskripsi */}
                            <div className="space-y-2">
                                <Label
                                    htmlFor="description"
                                    className="text-xs font-semibold tracking-wider text-muted-foreground uppercase"
                                >
                                    Deskripsi / Catatan Rilis (Opsional)
                                </Label>
                                <Input
                                    id="description"
                                    type="text"
                                    placeholder="Contoh: Berlaku tanggal 07 - 10 Oktober 2026"
                                    value={data.description}
                                    onChange={(e) =>
                                        setData('description', e.target.value)
                                    }
                                    className="h-11 rounded-xl"
                                />
                                {errors.description && (
                                    <p className="text-xs text-red-500">
                                        {errors.description}
                                    </p>
                                )}
                            </div>

                            {/* File Input */}
                            <div className="space-y-2">
                                <Label
                                    htmlFor="file"
                                    className="text-xs font-semibold tracking-wider text-muted-foreground uppercase"
                                >
                                    Pilih Berkas File{' '}
                                    <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    id="file"
                                    type="file"
                                    accept=".pdf,.png,.jpg,.jpeg,.json"
                                    onChange={(e) =>
                                        setData(
                                            'file',
                                            e.target.files
                                                ? e.target.files[0]
                                                : null,
                                        )
                                    }
                                    required
                                    className="h-12 cursor-pointer rounded-xl bg-muted/40 pt-2.5"
                                />
                                {errors.file && (
                                    <p className="text-xs text-red-500">
                                        {errors.file}
                                    </p>
                                )}
                            </div>

                            <div className="flex justify-end gap-3 pt-2">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => setShowUploadModal(false)}
                                    className="rounded-xl"
                                >
                                    Batal
                                </Button>
                                <Button
                                    type="submit"
                                    disabled={processing}
                                    className="rounded-xl px-6 font-bold"
                                >
                                    {processing
                                        ? 'Mengunggah file...'
                                        : 'Simpan & Unggah Berkas'}
                                </Button>
                            </div>
                        </form>
                    </div>
                )}

                {/* 5 Classification Folders Metric Cards */}
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
                    {(
                        [
                            'peringatan-dini',
                            'provinsi',
                            'buletin',
                            'mfy',
                            'bahari',
                        ] as const
                    ).map((catKey) => {
                        const conf = categoryConfig[catKey];
                        const Icon = conf.icon;
                        const count = categoryCounts
                            ? categoryCounts[catKey]
                            : 0;
                        const isSelected = selectedTab === catKey;

                        return (
                            <button
                                key={catKey}
                                onClick={() =>
                                    setSelectedTab(isSelected ? 'all' : catKey)
                                }
                                className={`flex items-center justify-between rounded-2xl border p-4 text-left shadow-sm transition-all duration-200 ${
                                    isSelected
                                        ? 'scale-[1.02] border-primary bg-primary/10 ring-2 ring-primary/20'
                                        : 'border-border bg-card hover:border-primary/40 hover:bg-muted/30'
                                }`}
                            >
                                <div className="space-y-1">
                                    <p className="flex items-center gap-1.5 text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                                        <span>{conf.label}</span>
                                    </p>
                                    <h3 className="text-xl font-bold text-foreground">
                                        {count} Berkas
                                    </h3>
                                    <p className="font-mono text-[10px] text-muted-foreground">
                                        {conf.folder}
                                    </p>
                                </div>
                                <div
                                    className={`rounded-xl p-3 ${conf.bgColor} ${conf.color}`}
                                >
                                    <Icon className="h-5 w-5" />
                                </div>
                            </button>
                        );
                    })}
                </div>

                {/* Main Management Table Card */}
                <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-sm">
                    {/* Filter Tabs & Search Bar */}
                    <div className="flex flex-col justify-between gap-4 border-b border-border bg-muted/20 p-4 sm:p-6 md:flex-row md:items-center">
                        {/* Filter Tabs */}
                        <div className="flex flex-wrap gap-1.5">
                            <button
                                onClick={() => setSelectedTab('all')}
                                className={`rounded-xl px-3.5 py-1.5 text-xs font-bold transition-all ${
                                    selectedTab === 'all'
                                        ? 'bg-primary text-primary-foreground shadow-sm'
                                        : 'bg-muted text-muted-foreground hover:bg-muted/80'
                                }`}
                            >
                                Semua ({categoryCounts?.all || documents.length}
                                )
                            </button>

                            {(
                                [
                                    'peringatan-dini',
                                    'provinsi',
                                    'buletin',
                                    'mfy',
                                    'bahari',
                                ] as const
                            ).map((catKey) => {
                                const conf = categoryConfig[catKey];
                                const count = categoryCounts
                                    ? categoryCounts[catKey]
                                    : 0;
                                return (
                                    <button
                                        key={catKey}
                                        onClick={() => setSelectedTab(catKey)}
                                        className={`rounded-xl px-3 py-1.5 text-xs font-semibold transition-all ${
                                            selectedTab === catKey
                                                ? 'bg-primary text-primary-foreground shadow-sm'
                                                : 'bg-muted text-muted-foreground hover:bg-muted/80'
                                        }`}
                                    >
                                        {conf.label} ({count})
                                    </button>
                                );
                            })}
                        </div>

                        {/* Search Input */}
                        <div className="relative w-full md:w-72">
                            <Search className="absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                type="text"
                                placeholder="Cari nama dokumen..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="h-10 rounded-xl pl-10 text-xs"
                            />
                        </div>
                    </div>

                    {/* Table View */}
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="border-b border-border bg-muted/40 text-xs font-semibold text-muted-foreground uppercase">
                                <tr>
                                    <th className="w-12 px-6 py-4 text-center">
                                        No
                                    </th>
                                    <th className="px-6 py-4">
                                        Nama Dokumen & Deskripsi
                                    </th>
                                    <th className="px-6 py-4">
                                        Klasifikasi Folder
                                    </th>
                                    <th className="px-6 py-4">Tipe & Ukuran</th>
                                    <th className="px-6 py-4">Waktu Unggah</th>
                                    <th className="px-6 py-4 text-right">
                                        Aksi
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                {filteredDocuments.length === 0 ? (
                                    <tr>
                                        <td
                                            colSpan={6}
                                            className="px-6 py-16 text-center text-xs text-muted-foreground"
                                        >
                                            <div className="flex flex-col items-center justify-center gap-3">
                                                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-muted/60 text-muted-foreground/60">
                                                    <HardDrive className="h-7 w-7" />
                                                </div>
                                                <div className="max-w-sm space-y-1">
                                                    <p className="text-sm font-bold text-foreground">
                                                        Belum ada berkas pada
                                                        kategori ini
                                                    </p>
                                                    <p className="text-xs text-muted-foreground">
                                                        {selectedTab === 'all'
                                                            ? 'Mulai unggah berkas PDF atau gambar untuk ditampilkan di website utama.'
                                                            : `Kategori "${categoryConfig[selectedTab as keyof typeof categoryConfig]?.label || selectedTab}" masih kosong.`}
                                                    </p>
                                                </div>
                                                <Button
                                                    type="button"
                                                    size="sm"
                                                    onClick={() => {
                                                        if (
                                                            selectedTab !==
                                                            'all'
                                                        ) {
                                                            setData(
                                                                'category',
                                                                selectedTab as any,
                                                            );
                                                        }
                                                        setShowUploadModal(
                                                            true,
                                                        );
                                                    }}
                                                    className="mt-2 h-9 gap-1.5 rounded-xl px-4 text-xs font-semibold shadow-sm"
                                                >
                                                    <Plus className="h-3.5 w-3.5" />
                                                    <span>
                                                        Unggah Berkas ke
                                                        Kategori Ini
                                                    </span>
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    filteredDocuments.map((doc, idx) => {
                                        const cat = doc.category || 'mfy';
                                        const conf =
                                            categoryConfig[cat] ||
                                            categoryConfig['mfy'];
                                        const Icon = conf.icon;
                                        const isCopied = copiedId === doc.id;

                                        return (
                                            <tr
                                                key={doc.id}
                                                className="group transition-colors hover:bg-muted/30"
                                            >
                                                <td className="px-6 py-4 text-center font-mono text-xs text-muted-foreground">
                                                    {idx + 1}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div
                                                            className={`h-10 w-10 rounded-xl ${conf.bgColor} ${conf.color} flex flex-shrink-0 items-center justify-center shadow-xs`}
                                                        >
                                                            <FileText className="h-5 w-5" />
                                                        </div>
                                                        <div className="max-w-xs min-w-0 sm:max-w-sm md:max-w-md">
                                                            <p className="truncate text-sm font-bold text-foreground transition-colors group-hover:text-primary">
                                                                {doc.title}
                                                            </p>
                                                            {doc.description ? (
                                                                <p className="mt-0.5 line-clamp-1 text-xs text-muted-foreground">
                                                                    {
                                                                        doc.description
                                                                    }
                                                                </p>
                                                            ) : (
                                                                <p className="mt-0.5 font-mono text-[11px] text-muted-foreground/70">
                                                                    storage/
                                                                    {
                                                                        doc.file_path
                                                                    }
                                                                </p>
                                                            )}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span
                                                        className={`inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-xs font-bold ${conf.badgeBg}`}
                                                    >
                                                        <Icon className="h-3.5 w-3.5" />
                                                        {conf.label}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-2">
                                                        <span className="rounded border border-border bg-muted px-2 py-0.5 font-mono text-[10px] font-bold text-foreground uppercase">
                                                            {doc.file_type ||
                                                                'PDF'}
                                                        </span>
                                                        <span className="text-xs text-muted-foreground">
                                                            {doc.file_size ||
                                                                '-'}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-xs text-muted-foreground">
                                                    {new Date(
                                                        doc.created_at,
                                                    ).toLocaleDateString(
                                                        'id-ID',
                                                        {
                                                            day: 'numeric',
                                                            month: 'short',
                                                            year: 'numeric',
                                                            hour: '2-digit',
                                                            minute: '2-digit',
                                                        },
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <div className="flex items-center justify-end gap-1.5">
                                                        {/* Pratinjau / Preview */}
                                                        <a
                                                            href={`/storage/${doc.file_path}`}
                                                            target="_blank"
                                                            rel="noreferrer"
                                                            className="inline-flex h-8 items-center gap-1 rounded-lg border border-border bg-card px-2.5 text-xs font-semibold text-foreground shadow-xs transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground"
                                                            title="Buka / Pratinjau di Tab Baru"
                                                        >
                                                            <Eye className="h-3.5 w-3.5" />
                                                            <span className="hidden sm:inline">
                                                                Lihat
                                                            </span>
                                                        </a>

                                                        {/* Unduh File */}
                                                        <a
                                                            href={`/storage/${doc.file_path}`}
                                                            download
                                                            className="inline-flex h-8 items-center gap-1 rounded-lg border border-border bg-card px-2.5 text-xs font-semibold text-foreground shadow-xs transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground"
                                                            title="Unduh Berkas Langsung"
                                                        >
                                                            <Download className="h-3.5 w-3.5" />
                                                            <span className="hidden sm:inline">
                                                                Unduh
                                                            </span>
                                                        </a>

                                                        {/* Salin Link Berkas */}
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            onClick={() =>
                                                                copyLink(
                                                                    doc.file_path,
                                                                    doc.id,
                                                                )
                                                            }
                                                            className={`h-8 rounded-lg px-2.5 text-xs font-semibold transition-all ${
                                                                isCopied
                                                                    ? 'border-emerald-500 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                                                                    : 'text-foreground'
                                                            }`}
                                                            title="Salin Link URL Publik"
                                                        >
                                                            {isCopied ? (
                                                                <>
                                                                    <Check className="h-3.5 w-3.5" />
                                                                    <span className="hidden sm:inline">
                                                                        Disalin!
                                                                    </span>
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <Copy className="h-3.5 w-3.5" />
                                                                    <span className="hidden sm:inline">
                                                                        Link
                                                                    </span>
                                                                </>
                                                            )}
                                                        </Button>

                                                        {/* Hapus Berkas */}
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            onClick={() =>
                                                                deleteDocument(
                                                                    doc.id,
                                                                    doc.title,
                                                                )
                                                            }
                                                            className="h-8 rounded-lg px-2.5 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                                                            title="Hapus Berkas Permanen"
                                                        >
                                                            <Trash2 className="h-3.5 w-3.5" />
                                                        </Button>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
