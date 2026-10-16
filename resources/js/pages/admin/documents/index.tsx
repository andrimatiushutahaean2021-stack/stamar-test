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
    Anchor,
    CheckSquare,
    Square,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

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
    category: 'peringatan-dini' | 'provinsi' | 'buletin' | 'pelabuhan' | 'mfy' | 'bahari';
    region_code?: string | null;
    region_number?: number | null;
    forecast_date?: string | null;
    period_type?: string | null;
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
    pelabuhan?: number;
    mfy?: number;
    bahari: number;
}

interface Props {
    documents: Document[];
    categoryCounts: CategoryCounts;
    currentCategory: string;
    initialAction?: string;
    provinsiList?: Record<number, string>;
    pelabuhanList?: Record<number, string>;
}

export default function DocumentIndex({
    documents,
    categoryCounts,
    currentCategory,
    initialAction,
    provinsiList = {},
    pelabuhanList = {},
}: Props) {
    const [selectedTab, setSelectedTab] = useState<string>(currentCategory);
    const [searchTerm, setSearchTerm] = useState('');
    const [copiedId, setCopiedId] = useState<number | null>(null);
    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    const [isDeletingBatch, setIsDeletingBatch] = useState(false);
    const [showUploadModal, setShowUploadModal] = useState(
        initialAction === 'upload',
    );

    const defaultCat = (
        ['peringatan-dini', 'provinsi', 'buletin', 'pelabuhan', 'mfy', 'bahari'].includes(
            selectedTab !== 'all' ? selectedTab : currentCategory,
        )
            ? selectedTab !== 'all'
                ? selectedTab
                : currentCategory
            : 'pelabuhan'
    ) as 'peringatan-dini' | 'provinsi' | 'buletin' | 'pelabuhan' | 'bahari';

    const { data, setData, post, processing, errors, reset } = useForm<{
        title: string;
        category: 'peringatan-dini' | 'provinsi' | 'buletin' | 'pelabuhan' | 'mfy' | 'bahari';
        region_number: string | number;
        forecast_date: string;
        period_type: 'daily' | 'weekly';
        description: string;
        files: File[];
        file: File | null;
    }>({
        title: '',
        category: defaultCat,
        region_number: '',
        forecast_date: new Date().toISOString().split('T')[0],
        period_type: 'daily',
        description: '',
        files: [],
        file: null,
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
        pelabuhan: {
            label: 'Cuaca Pelabuhan',
            icon: Anchor,
            color: 'text-cyan-500',
            bgColor: 'bg-cyan-500/10',
            badgeBg:
                'bg-cyan-100 text-cyan-700 dark:bg-cyan-950/60 dark:text-cyan-300 border-cyan-200 dark:border-cyan-900',
            folder: 'uploads/pelabuhan/',
        },
        mfy: {
            label: 'Cuaca Pelabuhan',
            icon: Anchor,
            color: 'text-cyan-500',
            bgColor: 'bg-cyan-500/10',
            badgeBg:
                'bg-cyan-100 text-cyan-700 dark:bg-cyan-950/60 dark:text-cyan-300 border-cyan-200 dark:border-cyan-900',
            folder: 'uploads/pelabuhan/',
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
                selectedTab === 'all' || doc.category === selectedTab || (selectedTab === 'pelabuhan' && doc.category === 'mfy');
            const matchesSearch =
                doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (doc.description &&
                    doc.description
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase()));
            return matchesCategory && matchesSearch;
        });
    }, [documents, selectedTab, searchTerm]);

    const isAllSelected = useMemo(() => {
        if (filteredDocuments.length === 0) return false;
        return filteredDocuments.every((doc) => selectedIds.includes(doc.id));
    }, [filteredDocuments, selectedIds]);

    const isSomeSelected = useMemo(() => {
        return (
            filteredDocuments.some((doc) => selectedIds.includes(doc.id)) &&
            !isAllSelected
        );
    }, [filteredDocuments, selectedIds, isAllSelected]);

    const toggleSelectAll = () => {
        if (isAllSelected) {
            // Unselect all in current filtered list
            const currentIds = new Set(filteredDocuments.map((doc) => doc.id));
            setSelectedIds((prev) => prev.filter((id) => !currentIds.has(id)));
        } else {
            // Select all in current filtered list
            const currentIds = filteredDocuments.map((doc) => doc.id);
            setSelectedIds((prev) => Array.from(new Set([...prev, ...currentIds])));
        }
    };

    const toggleSelectOne = (id: number) => {
        setSelectedIds((prev) =>
            prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
        );
    };

    const deleteBatch = () => {
        const count = selectedIds.length;
        if (count === 0) return;

        if (
            confirm(
                `Apakah Anda yakin ingin menghapus ${count} file yang dipilih sekaligus? Tindakan ini tidak dapat dibatalkan.`,
            )
        ) {
            setIsDeletingBatch(true);
            router.post(
                '/admin/documents/batch-delete',
                { ids: selectedIds },
                {
                    preserveScroll: true,
                    onSuccess: () => {
                        setSelectedIds([]);
                    },
                    onFinish: () => {
                        setIsDeletingBatch(false);
                    },
                },
            );
        }
    };

    const clearCurrentCategory = () => {
        const catLabel =
            selectedTab === 'all'
                ? 'SEMUA berkas dokumen'
                : `seluruh berkas kategori "${categoryConfig[selectedTab as keyof typeof categoryConfig]?.label || selectedTab}"`;

        if (
            confirm(
                `PERINGATAN: Apakah Anda benar-benar yakin ingin menghapus ${catLabel}? Tindakan ini akan menghapus semua file terkait di server secara permanen!`,
            )
        ) {
            setIsDeletingBatch(true);
            router.post(
                '/admin/documents/clear-category',
                { category: selectedTab },
                {
                    preserveScroll: true,
                    onSuccess: () => {
                        setSelectedIds([]);
                    },
                    onFinish: () => {
                        setIsDeletingBatch(false);
                    },
                },
            );
        }
    };

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
                onSuccess: () => {
                    setSelectedIds((prev) => prev.filter((item) => item !== id));
                },
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
                            Peringatan Dini, Cuaca Provinsi, Buletin, Cuaca Pelabuhan, dan
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
                                Format didukung: PDF, PNG, JPG, JPEG (Maks. 112 File / Total Maks. 112MB)
                            </span>
                        </div>

                        <form onSubmit={submit} className="space-y-5">
                            {/* Kotak Petunjuk Sinkronisasi BMKG */}
                            {(data.category === 'provinsi' || data.category === 'pelabuhan' || data.category === 'mfy') && (
                                <div className="rounded-2xl border border-sky-200/70 bg-gradient-to-r from-sky-500/10 via-sky-500/5 to-transparent p-4 text-xs dark:border-sky-500/30">
                                    <div className="flex items-center gap-2 font-bold text-sky-800 dark:text-sky-300">
                                        <Anchor className="h-4 w-4" />
                                        <span>Panduan Sinkronisasi Berkas Otomatis BMKG:</span>
                                    </div>
                                    <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2 text-slate-600 dark:text-slate-300">
                                        <div className="rounded-xl border border-amber-200/50 bg-amber-50/50 p-2.5 dark:border-amber-900/40 dark:bg-amber-950/30">
                                            <span className="font-bold text-amber-800 dark:text-amber-300 block mb-0.5">
                                                📍 Cuaca Provinsi (18 Wilayah)
                                            </span>
                                            Awalan nama file: <code className="font-bold text-amber-700 dark:text-amber-300">P_AH001</code> s/d <code className="font-bold text-amber-700 dark:text-amber-300">P_AH018</code><br />
                                            Contoh: <code className="text-[11px] text-slate-500">P_AH001_12102026.pdf</code>
                                        </div>
                                        <div className="rounded-xl border border-cyan-200/50 bg-cyan-50/50 p-2.5 dark:border-cyan-900/40 dark:bg-cyan-950/30">
                                            <span className="font-bold text-cyan-800 dark:text-cyan-300 block mb-0.5">
                                                ⚓ Cuaca Pelabuhan (37 Titik)
                                            </span>
                                            Awalan nama file: <code className="font-bold text-cyan-700 dark:text-cyan-300">AH001</code> s/d <code className="font-bold text-cyan-700 dark:text-cyan-300">AH037</code><br />
                                            Contoh: <code className="text-[11px] text-slate-500">AH001_12102026.pdf</code>
                                        </div>
                                    </div>
                                    <p className="mt-2 text-[11px] text-slate-500 dark:text-slate-400">
                                        * Jika nama file sudah diawali kode tersebut, sistem akan <strong>otomatis memetakan nomor urut daerah, tanggal prakiraan, dan nama wilayahnya</strong> ke tabel publik.
                                    </p>
                                </div>
                            )}

                            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
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
                                        className="h-12 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:outline-none"
                                    >
                                        <option value="pelabuhan">
                                            ⚓ 1. Cuaca Pelabuhan (Format: AH001 - AH037)
                                        </option>
                                        <option value="provinsi">
                                            📍 2. Cuaca Provinsi (Format: P_AH001 - P_AH018)
                                        </option>
                                        <option value="peringatan-dini">
                                            ⚠️ 3. Peringatan Dini
                                        </option>
                                        <option value="buletin">
                                            📖 4. Buletin Maritim
                                        </option>
                                        <option value="bahari">
                                            🌊 5. Wisata Bahari
                                        </option>
                                    </select>
                                    {errors.category && (
                                        <p className="text-xs text-red-500">
                                            {errors.category}
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
                                        <span className="ml-1 text-[11px] font-normal text-muted-foreground">
                                            (Bisa pilih s.d. 112 file, total maks. 112MB)
                                        </span>
                                    </Label>
                                    <Input
                                        id="file"
                                        type="file"
                                        multiple
                                        accept=".pdf,.png,.jpg,.jpeg"
                                        onChange={(e) => {
                                            const fileList = e.target.files;
                                            if (fileList) {
                                                const filesArr = Array.from(fileList);
                                                const allowedExts = ['pdf', 'png', 'jpg', 'jpeg'];
                                                const invalidFile = filesArr.find((f) => {
                                                    const ext = f.name.split('.').pop()?.toLowerCase() || '';
                                                    return !allowedExts.includes(ext);
                                                });
                                                if (invalidFile) {
                                                    alert(`File "${invalidFile.name}" tidak didukung. Format JSON sudah dinonaktifkan. Hanya diperbolehkan berkas PDF, PNG, JPG, dan JPEG.`);
                                                    e.target.value = '';
                                                    setData('files', []);
                                                    setData('file', null);
                                                    return;
                                                }
                                                if (filesArr.length > 112) {
                                                    alert('Maksimal 112 file yang dapat dipilih sekaligus.');
                                                    e.target.value = '';
                                                    setData('files', []);
                                                    setData('file', null);
                                                    return;
                                                }
                                                const totalBytes = filesArr.reduce((acc, curr) => acc + curr.size, 0);
                                                const MAX_TOTAL_BYTES = 112 * 1024 * 1024; // 112 MB
                                                if (totalBytes > MAX_TOTAL_BYTES) {
                                                    const totalMb = (totalBytes / (1024 * 1024)).toFixed(2);
                                                    alert(`Total ukuran berkas yang dipilih (${totalMb} MB) melebihi batas maksimal 112MB.`);
                                                    e.target.value = '';
                                                    setData('files', []);
                                                    setData('file', null);
                                                    return;
                                                }
                                                setData('files', filesArr);
                                                setData('file', filesArr[0] || null);
                                            }
                                        }}
                                        required
                                        className="h-12 cursor-pointer rounded-xl bg-muted/40 pt-2.5"
                                    />
                                    {data.files && data.files.length > 0 && (
                                        <div className="space-y-1.5 pt-1">
                                            <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                                                ✓ {data.files.length} file dipilih (Total: {(data.files.reduce((acc, f) => acc + f.size, 0) / (1024 * 1024)).toFixed(2)} MB / Batas 112MB)
                                            </p>
                                            {data.files.length > 1 && (
                                                <div className="flex flex-wrap gap-1 max-h-24 overflow-y-auto rounded-lg border border-border bg-background p-2">
                                                    {data.files.slice(0, 37).map((f, i) => (
                                                        <span key={i} className="inline-block rounded bg-muted px-1.5 py-0.5 text-[10px] font-mono text-muted-foreground">
                                                            {f.name}
                                                        </span>
                                                    ))}
                                                    {data.files.length > 37 && (
                                                        <span className="text-[10px] text-muted-foreground self-center pl-1">
                                                            +{data.files.length - 37} lainnya
                                                        </span>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    )}
                                    {errors.file && (
                                        <p className="text-xs text-red-500">
                                            {errors.file}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Additional metadata for Provinsi / Pelabuhan */}
                            {(data.category === 'provinsi' || data.category === 'pelabuhan' || data.category === 'mfy') && (
                                <div className="grid grid-cols-1 gap-5 md:grid-cols-3 rounded-2xl border border-border bg-muted/20 p-4">
                                    {/* Pilihan Wilayah Satuan (Opsional jika multi-file) */}
                                    <div className="space-y-1.5">
                                        <Label
                                            htmlFor="region_number"
                                            className="text-xs font-semibold text-muted-foreground uppercase"
                                        >
                                            Wilayah Spesifik (Opsional)
                                        </Label>
                                        <select
                                            id="region_number"
                                            value={data.region_number}
                                            onChange={(e) => setData('region_number', e.target.value)}
                                            className="h-11 w-full rounded-xl border border-input bg-background px-3 py-1.5 text-xs ring-offset-background focus:ring-2 focus:ring-ring focus:outline-none"
                                        >
                                            <option value="">-- Otomatis Dari Nama File --</option>
                                            {data.category === 'provinsi'
                                                ? Object.entries(provinsiList).map(([num, name]) => (
                                                      <option key={num} value={num}>
                                                          P_AH{num.toString().padStart(3, '0')} - {name}
                                                      </option>
                                                  ))
                                                : Object.entries(pelabuhanList).map(([num, name]) => (
                                                      <option key={num} value={num}>
                                                          AH{num.toString().padStart(3, '0')} - {name}
                                                      </option>
                                                  ))}
                                        </select>
                                        <p className="text-[10px] text-muted-foreground">
                                            Biarkan otomatis jika mengunggah banyak berkas sekaligus.
                                        </p>
                                    </div>

                                    {/* Tanggal Prakiraan */}
                                    <div className="space-y-1.5">
                                        <Label
                                            htmlFor="forecast_date"
                                            className="text-xs font-semibold text-muted-foreground uppercase"
                                        >
                                            Tanggal Berlaku Prakiraan
                                        </Label>
                                        <Input
                                            id="forecast_date"
                                            type="date"
                                            value={data.forecast_date}
                                            onChange={(e) => setData('forecast_date', e.target.value)}
                                            className="h-11 rounded-xl text-xs"
                                        />
                                        <p className="text-[10px] text-muted-foreground">
                                            Default: Hari ini (atau terbaca dari nama file).
                                        </p>
                                    </div>

                                    {/* Periode */}
                                    <div className="space-y-1.5">
                                        <Label
                                            htmlFor="period_type"
                                            className="text-xs font-semibold text-muted-foreground uppercase"
                                        >
                                            Periode Prakiraan
                                        </Label>
                                        <select
                                            id="period_type"
                                            value={data.period_type}
                                            onChange={(e) => setData('period_type', e.target.value as any)}
                                            className="h-11 w-full rounded-xl border border-input bg-background px-3 py-1.5 text-xs ring-offset-background focus:ring-2 focus:ring-ring focus:outline-none"
                                        >
                                            <option value="daily">Harian</option>
                                            <option value="weekly">Mingguan</option>
                                        </select>
                                        <p className="text-[10px] text-muted-foreground">
                                            Menentukan tab tampil di halaman publik.
                                        </p>
                                    </div>
                                </div>
                            )}

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
                                        ? data.files.length > 1
                                            ? `Mengunggah ${data.files.length} Berkas...`
                                            : 'Mengunggah file...'
                                        : data.files.length > 1
                                          ? `Unggah ${data.files.length} Berkas Sekaligus`
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
                            'pelabuhan',
                            'bahari',
                        ] as const
                    ).map((catKey) => {
                        const conf = categoryConfig[catKey];
                        const Icon = conf.icon;
                        const count = categoryCounts
                            ? (catKey === 'pelabuhan'
                                  ? (categoryCounts['pelabuhan'] ?? categoryCounts['mfy'] ?? 0)
                                  : categoryCounts[catKey])
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
                                    'pelabuhan',
                                    'bahari',
                                ] as const
                            ).map((catKey) => {
                                const conf = categoryConfig[catKey];
                                const count = categoryCounts
                                    ? (catKey === 'pelabuhan'
                                          ? (categoryCounts['pelabuhan'] ?? categoryCounts['mfy'] ?? 0)
                                          : categoryCounts[catKey])
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

                        {/* Search Input & Bulk Category Action */}
                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full md:w-auto">
                            <div className="relative w-full md:w-64">
                                <Search className="absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                <Input
                                    type="text"
                                    placeholder="Cari nama dokumen..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="h-10 rounded-xl pl-10 text-xs"
                                />
                            </div>

                            {filteredDocuments.length > 0 && (
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={clearCurrentCategory}
                                    disabled={isDeletingBatch}
                                    className="h-10 rounded-xl border-destructive/30 px-3 text-xs font-semibold text-destructive hover:bg-destructive/10 hover:border-destructive transition-colors shrink-0"
                                    title="Hapus sekaligus semua berkas pada filter kategori ini"
                                >
                                    <Trash2 className="mr-1.5 h-3.5 w-3.5" />
                                    <span>Bersihkan Kategori ({filteredDocuments.length})</span>
                                </Button>
                            )}
                        </div>
                    </div>

                    {/* Batch Selection Action Floating / Banner Bar */}
                    {selectedIds.length > 0 && (
                        <div className="flex flex-wrap items-center justify-between gap-3 bg-destructive/10 border-b border-destructive/20 px-4 py-3 sm:px-6">
                            <div className="flex items-center gap-2">
                                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-destructive text-[11px] font-bold text-destructive-foreground">
                                    {selectedIds.length}
                                </span>
                                <span className="text-xs font-bold text-destructive">
                                    {selectedIds.length} file dipilih
                                </span>
                                <span className="text-xs text-muted-foreground hidden sm:inline">
                                    (dari {filteredDocuments.length} berkas ditampilkan)
                                </span>
                            </div>

                            <div className="flex items-center gap-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setSelectedIds([])}
                                    className="h-8 rounded-lg text-xs"
                                >
                                    Batalkan Pilihan
                                </Button>
                                <Button
                                    variant="destructive"
                                    size="sm"
                                    disabled={isDeletingBatch}
                                    onClick={deleteBatch}
                                    className="h-8 gap-1.5 rounded-lg text-xs font-bold shadow-sm"
                                >
                                    <Trash2 className="h-3.5 w-3.5" />
                                    <span>{isDeletingBatch ? 'Menghapus...' : `Hapus ${selectedIds.length} File Sekaligus`}</span>
                                </Button>
                            </div>
                        </div>
                    )}

                    {/* Table View */}
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="border-b border-border bg-muted/40 text-xs font-semibold text-muted-foreground uppercase">
                                <tr>
                                    <th className="w-10 px-4 py-4 text-center">
                                        <Checkbox
                                            checked={isAllSelected ? true : isSomeSelected ? 'indeterminate' : false}
                                            onCheckedChange={toggleSelectAll}
                                            aria-label="Pilih semua file"
                                            className="translate-y-0.5"
                                        />
                                    </th>
                                    <th className="w-12 px-2 py-4 text-center">
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
                                            colSpan={7}
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
                                        const cat = (doc.category === 'mfy' ? 'pelabuhan' : doc.category) || 'pelabuhan';
                                        const conf =
                                            categoryConfig[cat as keyof typeof categoryConfig] ||
                                            categoryConfig['pelabuhan'];
                                        const Icon = conf.icon;
                                        const isCopied = copiedId === doc.id;
                                        const isSelected = selectedIds.includes(doc.id);

                                        return (
                                            <tr
                                                key={doc.id}
                                                className={`group transition-colors ${
                                                    isSelected ? 'bg-primary/5 dark:bg-primary/10' : 'hover:bg-muted/30'
                                                }`}
                                            >
                                                <td className="px-4 py-4 text-center">
                                                    <Checkbox
                                                        checked={isSelected}
                                                        onCheckedChange={() => toggleSelectOne(doc.id)}
                                                        aria-label={`Pilih file ${doc.title}`}
                                                        className="translate-y-0.5"
                                                    />
                                                </td>
                                                <td className="px-2 py-4 text-center font-mono text-xs text-muted-foreground">
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
                                                            <div className="flex flex-wrap items-center gap-1.5 mt-1">
                                                                {doc.region_code && (
                                                                    <span className="rounded-md border border-primary/30 bg-primary/10 px-1.5 py-0.5 font-mono text-[10px] font-bold text-primary">
                                                                        {doc.region_code} {doc.region_number ? `(#${doc.region_number})` : ''}
                                                                    </span>
                                                                )}
                                                                {doc.forecast_date && (
                                                                    <span className="rounded-md border border-border bg-muted/60 px-1.5 py-0.5 text-[10px] font-semibold text-muted-foreground">
                                                                        📅 {new Date(doc.forecast_date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                                                                    </span>
                                                                )}
                                                                {doc.period_type && (
                                                                    <span className="rounded-md border border-border bg-muted/60 px-1.5 py-0.5 text-[10px] font-semibold text-muted-foreground">
                                                                        {doc.period_type === 'weekly' ? 'Mingguan' : 'Harian'}
                                                                    </span>
                                                                )}
                                                            </div>
                                                            {doc.description ? (
                                                                <p className="mt-1 line-clamp-1 text-xs text-muted-foreground">
                                                                    {doc.description}
                                                                </p>
                                                            ) : (
                                                                <p className="mt-0.5 font-mono text-[11px] text-muted-foreground/70">
                                                                    storage/{doc.file_path}
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
