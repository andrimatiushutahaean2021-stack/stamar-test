import { Head, useForm, router } from '@inertiajs/react';
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
    Sparkles,
    Zap,
    Layers,
    ArrowRight,
    Image as ImageIcon,
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
    category: 'infografis' | 'peringatan-dini' | 'provinsi' | 'buletin' | 'pelabuhan' | 'mfy' | 'bahari';
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
    infografis?: number;
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
    const [showNamingGuide, setShowNamingGuide] = useState(false);

    const todayStr = useMemo(() => new Date().toISOString().split('T')[0], []);
    const tomorrowStr = useMemo(() => {
        const d = new Date();
        d.setDate(d.getDate() + 1);
        return d.toISOString().split('T')[0];
    }, []);

    const defaultCat = (
        ['infografis', 'peringatan-dini', 'provinsi', 'buletin', 'pelabuhan', 'mfy', 'bahari'].includes(
            selectedTab !== 'all' ? selectedTab : currentCategory,
        )
            ? selectedTab !== 'all'
                ? selectedTab
                : currentCategory
            : 'pelabuhan'
    ) as 'infografis' | 'peringatan-dini' | 'provinsi' | 'buletin' | 'pelabuhan' | 'bahari';

    const { data, setData, post, processing, errors, reset } = useForm<{
        title: string;
        category: 'auto' | 'infografis' | 'peringatan-dini' | 'provinsi' | 'buletin' | 'pelabuhan' | 'mfy' | 'bahari';
        region_number: string | number;
        forecast_date: string;
        period_type: 'daily' | 'weekly';
        description: string;
        files: File[];
        file: File | null;
    }>({
        title: '',
        category: 'auto',
        region_number: '',
        forecast_date: new Date().toISOString().split('T')[0],
        period_type: 'daily',
        description: '',
        files: [],
        file: null,
    });

    const categoryConfig = {
        infografis: {
            label: 'Infografis & Peta',
            icon: ImageIcon,
            color: 'text-indigo-500',
            bgColor: 'bg-indigo-500/10',
            badgeBg:
                'bg-indigo-100 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300 border-indigo-200 dark:border-indigo-900',
            folder: 'uploads/infografis/',
        },
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

    const processFilesSelection = (filesArr: File[]): boolean => {
        const allowedExts = ['pdf', 'png', 'jpg', 'jpeg'];
        const invalidFile = filesArr.find((f) => {
            const ext = f.name.split('.').pop()?.toLowerCase() || '';
            return !allowedExts.includes(ext);
        });
        if (invalidFile) {
            alert(`File "${invalidFile.name}" tidak didukung. Format didukung: PDF, PNG, JPG, dan JPEG.`);
            return false;
        }

        // Khusus peringatan-dini dan infografis, format berkas wajib .png
        if (data.category === 'peringatan-dini' || data.category === 'infografis') {
            const nonPngFile = filesArr.find((f) => !f.name.toLowerCase().endsWith('.png'));
            if (nonPngFile) {
                const label = data.category === 'peringatan-dini' ? 'Peringatan Dini Gelombang' : 'Infografis Cuaca';
                alert(`File "${nonPngFile.name}" ditolak. Kategori ${label} saat ini wajib berformat gambar .PNG.`);
                return false;
            }
        } else if (data.category === 'auto') {
            const invalidWarning = filesArr.find((f) => {
                const lower = f.name.toLowerCase();
                const isWarning = lower.includes('peringatan') || lower.includes('warning') || lower.includes('dini');
                return isWarning && !lower.endsWith('.png');
            });
            if (invalidWarning) {
                alert(`File "${invalidWarning.name}" terdeteksi sebagai Peringatan Dini. Format file untuk fitur Peringatan Dini saat ini wajib .PNG.`);
                return false;
            }

            const invalidInfografis = filesArr.find((f) => {
                const lower = f.name.toLowerCase();
                const isInfografis = ['infografis', 'grafis', 'peta', 'infographic', 'map', 'rilis-harian', 'rilis_harian'].some((kw) => lower.includes(kw));
                return isInfografis && !lower.endsWith('.png');
            });
            if (invalidInfografis) {
                alert(`File "${invalidInfografis.name}" terdeteksi sebagai Infografis Cuaca. Format file untuk fitur Infografis saat ini wajib .PNG.`);
                return false;
            }
        }

        if (filesArr.length > 112) {
            alert('Maksimal 112 file yang dapat dipilih sekaligus.');
            return false;
        }

        const totalBytes = filesArr.reduce((acc, curr) => acc + curr.size, 0);
        if (totalBytes > 112 * 1024 * 1024) {
            alert(`Total ukuran berkas (${(totalBytes / (1024 * 1024)).toFixed(2)} MB) melebihi batas 112MB.`);
            return false;
        }

        setData('files', filesArr);
        setData('file', filesArr[0] || null);
        return true;
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        // Validasi khusus: jika kategori peringatan-dini atau infografis, pastikan format file wajib .png
        if (data.category === 'peringatan-dini' || data.category === 'infografis') {
            const nonPng = data.files.find((f) => !f.name.toLowerCase().endsWith('.png'));
            if (nonPng) {
                const label = data.category === 'peringatan-dini' ? 'Peringatan Dini Gelombang' : 'Infografis Cuaca';
                alert(`File "${nonPng.name}" ditolak. Kategori ${label} saat ini wajib berformat gambar .PNG.`);
                return;
            }
        } else if (data.category === 'auto') {
            const invalidWarning = data.files.find((f) => {
                const lower = f.name.toLowerCase();
                const isWarning = lower.includes('peringatan') || lower.includes('warning') || lower.includes('dini');
                return isWarning && !lower.endsWith('.png');
            });
            if (invalidWarning) {
                alert(`File "${invalidWarning.name}" terdeteksi sebagai Peringatan Dini. Format file untuk fitur Peringatan Dini saat ini wajib .PNG.`);
                return;
            }

            const invalidInfografis = data.files.find((f) => {
                const lower = f.name.toLowerCase();
                const isInfografis = ['infografis', 'grafis', 'peta', 'infographic', 'map', 'rilis-harian', 'rilis_harian'].some((kw) => lower.includes(kw));
                return isInfografis && !lower.endsWith('.png');
            });
            if (invalidInfografis) {
                alert(`File "${invalidInfografis.name}" terdeteksi sebagai Infografis Cuaca. Format file untuk fitur Infografis saat ini wajib .PNG.`);
                return;
            }
        }

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
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 p-4 sm:p-6 lg:p-8">
            <Head title="Manajemen File & Folder Upload - Admin STAMAR" />
                {/* Header Title & Actions */}
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                    <div>
                        <h1 className="flex items-center gap-2.5 text-2xl font-extrabold tracking-tight text-foreground">
                            <Folder className="h-7 w-7 text-primary" />
                            Manajemen File & Folder Upload
                        </h1>
                        <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
                            Kelola berkas terklasifikasi ke dalam 6 folder:
                            Infografis & Peta, Peringatan Dini, Cuaca Provinsi, Buletin, Cuaca Pelabuhan, dan
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
                {/* Upload Form Card (Expandable) */}
                {showUploadModal && (
                    <div className="animate-in rounded-3xl border border-border bg-card p-6 shadow-xl duration-300 slide-in-from-top-3">
                        <div className="mb-5 flex flex-wrap items-center justify-between gap-2 border-b border-border pb-4">
                            <div>
                                <h3 className="flex items-center gap-2 text-base font-bold text-foreground">
                                    <Sparkles className="h-5 w-5 text-amber-500" />
                                    Smart Forecaster Dropzone & Upload
                                </h3>
                                <p className="text-xs text-muted-foreground mt-0.5">
                                    Seret berkas campuran (Pelabuhan, Provinsi, Wisata Bahari, Buletin, Peringatan Dini) sekaligus tanpa perlu isi form rumit.
                                </p>
                            </div>
                            <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                                Maks. 112 File • Total 112MB • PDF / PNG / JPG
                            </span>
                        </div>

                        <form onSubmit={submit} className="space-y-5">
                            {/* Kotak Petunjuk Format Penamaan Berkas (Ringkas & Collapsible) */}
                            <div className="rounded-2xl border border-border bg-muted/20 p-3 text-xs">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2 font-semibold text-foreground">
                                        <Zap className="h-4 w-4 text-amber-500" />
                                        <span>Sistem otomatis mendeteksi kategori berdasarkan nama berkas</span>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => setShowNamingGuide(!showNamingGuide)}
                                        className="text-xs font-semibold text-primary hover:underline"
                                    >
                                        {showNamingGuide ? 'Sembunyikan Pola' : 'Lihat Pola Format Nama'}
                                    </button>
                                </div>

                                {showNamingGuide && (
                                    <div className="mt-3 grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-5 pt-3 border-t border-border text-slate-600 dark:text-slate-300">
                                        <div className="rounded-xl border border-indigo-200/50 bg-indigo-50/50 p-2.5 dark:border-indigo-900/40 dark:bg-indigo-950/30">
                                            <span className="font-bold text-indigo-800 dark:text-indigo-300 block mb-0.5">
                                                🖼️ Infografis Cuaca (.PNG)
                                            </span>
                                            Format: <code className="font-bold text-indigo-700 dark:text-indigo-300 font-mono">P_AH / AH / infografis</code>
                                        </div>
                                        <div className="rounded-xl border border-rose-200/50 bg-rose-50/50 p-2.5 dark:border-rose-900/40 dark:bg-rose-950/30">
                                            <span className="font-bold text-rose-800 dark:text-rose-300 block mb-0.5">
                                                ⚠️ Peringatan Dini (.PNG)
                                            </span>
                                            Format: <code className="font-bold text-rose-700 dark:text-rose-300 font-mono">peringatan / warning / dini</code>
                                        </div>
                                        <div className="rounded-xl border border-cyan-200/50 bg-cyan-50/50 p-2.5 dark:border-cyan-900/40 dark:bg-cyan-950/30">
                                            <span className="font-bold text-cyan-800 dark:text-cyan-300 block mb-0.5">
                                                ⚓ Cuaca Pelabuhan (PDF)
                                            </span>
                                            Awalan: <code className="font-bold text-cyan-700 dark:text-cyan-300 font-mono">AH001 .. AH037</code>
                                        </div>
                                        <div className="rounded-xl border border-amber-200/50 bg-amber-50/50 p-2.5 dark:border-amber-900/40 dark:bg-amber-950/30">
                                            <span className="font-bold text-amber-800 dark:text-amber-300 block mb-0.5">
                                                📍 Cuaca Provinsi (PDF)
                                            </span>
                                            Awalan: <code className="font-bold text-amber-700 dark:text-amber-300 font-mono">P_AH001 .. P_AH018</code>
                                        </div>
                                        <div className="rounded-xl border border-teal-200/50 bg-teal-50/50 p-2.5 dark:border-teal-900/40 dark:bg-teal-950/30">
                                            <span className="font-bold text-teal-800 dark:text-teal-300 block mb-0.5">
                                                🌊 Wisata Bahari
                                            </span>
                                            Nama: <code className="font-bold text-teal-700 dark:text-teal-300 font-mono">slide1..7, pantai</code>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Dropzone Area Besar & Elegan */}
                            <div className="space-y-3">
                                <div
                                    onDragOver={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                    }}
                                    onDrop={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
                                            processFilesSelection(Array.from(e.dataTransfer.files));
                                        }
                                    }}
                                    className={`relative flex min-h-[160px] flex-col items-center justify-center rounded-2xl border-2 border-dashed p-6 text-center transition-all ${
                                        data.files.length > 0
                                            ? 'border-emerald-500 bg-emerald-500/5 dark:bg-emerald-950/20'
                                            : 'border-border bg-muted/10 hover:border-primary hover:bg-muted/30'
                                    }`}
                                >
                                    <input
                                        id="smart-file-upload"
                                        type="file"
                                        multiple
                                        accept=".pdf,.png,.jpg,.jpeg"
                                        onChange={(e) => {
                                            const fileList = e.target.files;
                                            if (fileList && fileList.length > 0) {
                                                const ok = processFilesSelection(Array.from(fileList));
                                                if (!ok) {
                                                    e.target.value = '';
                                                    setData('files', []);
                                                    setData('file', null);
                                                }
                                            }
                                        }}
                                        className="absolute inset-0 z-20 h-full w-full cursor-pointer opacity-0"
                                    />

                                    <div className="pointer-events-none flex flex-col items-center gap-2">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary shadow-sm">
                                            <UploadCloud className="h-6 w-6" />
                                        </div>
                                        <div className="text-center">
                                            <p className="text-sm font-bold text-foreground">
                                                {data.files.length > 0
                                                    ? `${data.files.length} Berkas Siap Diproses!`
                                                    : 'Tarik & Letakkan (Drag & Drop) File ke Sini'}
                                            </p>
                                            <p className="text-xs text-muted-foreground mt-0.5">
                                                Atau klik di area ini untuk memilih berkas dari komputer (Bisa blok puluhan file sekaligus)
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Preview Klasifikasi Cerdas Sebelum Diunggah */}
                                {data.files && data.files.length > 0 && (() => {
                                    const detectedCounts = {
                                        infografis: 0,
                                        pelabuhan: 0,
                                        provinsi: 0,
                                        bahari: 0,
                                        buletin: 0,
                                        'peringatan-dini': 0,
                                        lainnya: 0,
                                    };

                                    data.files.forEach((f) => {
                                        const name = f.name.toLowerCase();
                                        const isPng = name.endsWith('.png');

                                        if (name.includes('peringatan') || name.includes('warning') || name.includes('dini') || name.includes('gelombang')) {
                                            detectedCounts['peringatan-dini']++;
                                        } else if (
                                            ['infografis', 'grafis', 'peta', 'infographic', 'map'].some((kw) => name.includes(kw)) ||
                                            (isPng && (/^(?:p[._\-\s]?ah)[._\-\s]?0*[1-9]/i.test(name) || /^ah[._\-\s]?0*[1-9]/i.test(name)))
                                        ) {
                                            detectedCounts.infografis++;
                                        } else if (/^(?:p[._\-\s]?ah)[._\-\s]?0*[1-9]/i.test(name)) {
                                            detectedCounts.provinsi++;
                                        } else if (/^ah[._\-\s]?0*[1-9]/i.test(name)) {
                                            detectedCounts.pelabuhan++;
                                        } else if (
                                            ['bahari', 'wisata', 'slide', 'pantai', 'liang', 'ora', 'morela', 'hukurila', 'natsepa', 'jikumerasa', 'cover', 'sampul'].some((kw) => name.includes(kw))
                                        ) {
                                            detectedCounts.bahari++;
                                        } else if (name.includes('buletin') || name.includes('bulletin')) {
                                            detectedCounts.buletin++;
                                        } else {
                                            detectedCounts.lainnya++;
                                        }
                                    });

                                    return (
                                        <div className="rounded-2xl border border-emerald-300/60 bg-emerald-500/10 p-4 text-xs dark:border-emerald-600/40">
                                            <div className="flex flex-wrap items-center justify-between gap-2">
                                                <span className="font-bold text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5">
                                                    <Check className="h-4 w-4 text-emerald-500" />
                                                    {data.files.length} Berkas Terdeteksi (Total: {(data.files.reduce((acc, f) => acc + f.size, 0) / (1024 * 1024)).toFixed(2)} MB):
                                                </span>
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setData('files', []);
                                                        setData('file', null);
                                                    }}
                                                    className="text-xs text-red-500 hover:underline font-semibold"
                                                >
                                                    Batalkan Pilihan
                                                </button>
                                            </div>

                                            <div className="mt-2.5 flex flex-wrap gap-2">
                                                {detectedCounts.infografis > 0 && (
                                                    <span className="rounded-lg bg-indigo-500/20 px-2.5 py-1 font-semibold text-indigo-800 dark:text-indigo-200">
                                                        🖼️ {detectedCounts.infografis} Infografis & Peta
                                                    </span>
                                                )}
                                                {detectedCounts.pelabuhan > 0 && (
                                                    <span className="rounded-lg bg-cyan-500/20 px-2.5 py-1 font-semibold text-cyan-800 dark:text-cyan-200">
                                                        ⚓ {detectedCounts.pelabuhan} Cuaca Pelabuhan
                                                    </span>
                                                )}
                                                {detectedCounts.provinsi > 0 && (
                                                    <span className="rounded-lg bg-amber-500/20 px-2.5 py-1 font-semibold text-amber-800 dark:text-amber-200">
                                                        📍 {detectedCounts.provinsi} Cuaca Provinsi
                                                    </span>
                                                )}
                                                {detectedCounts.bahari > 0 && (
                                                    <span className="rounded-lg bg-teal-500/20 px-2.5 py-1 font-semibold text-teal-800 dark:text-teal-200">
                                                        🌊 {detectedCounts.bahari} Wisata Bahari
                                                    </span>
                                                )}
                                                {detectedCounts.buletin > 0 && (
                                                    <span className="rounded-lg bg-purple-500/20 px-2.5 py-1 font-semibold text-purple-800 dark:text-purple-200">
                                                        📖 {detectedCounts.buletin} Buletin
                                                    </span>
                                                )}
                                                {detectedCounts['peringatan-dini'] > 0 && (
                                                    <span className="rounded-lg bg-red-500/20 px-2.5 py-1 font-semibold text-red-800 dark:text-red-200">
                                                        ⚠️ {detectedCounts['peringatan-dini']} Peringatan Dini
                                                    </span>
                                                )}
                                                {detectedCounts.lainnya > 0 && (
                                                    <span className="rounded-lg bg-slate-500/20 px-2.5 py-1 font-medium text-slate-700 dark:text-slate-300">
                                                        📁 {detectedCounts.lainnya} Berkas Umum
                                                    </span>
                                                )}
                                            </div>

                                            {/* Scrollable File Tags */}
                                            <div className="mt-3 flex max-h-24 flex-wrap gap-1 overflow-y-auto rounded-lg border border-border bg-background/80 p-2">
                                                {data.files.slice(0, 40).map((f, i) => (
                                                    <span
                                                        key={i}
                                                        className="inline-block rounded bg-muted px-1.5 py-0.5 text-[10px] font-mono text-muted-foreground"
                                                    >
                                                        {f.name}
                                                    </span>
                                                ))}
                                                {data.files.length > 40 && (
                                                    <span className="self-center pl-1 text-[10px] font-semibold text-muted-foreground">
                                                        +{data.files.length - 40} file lainnya...
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })()}
                            </div>

                            {/* Pengaturan Target Periode & Tanggal Prakiraan (Jelas & Terbuka) */}
                            <div className="rounded-2xl border border-border bg-card/60 p-4 shadow-sm">
                                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border pb-3">
                                    <div>
                                        <h4 className="text-xs font-bold text-foreground flex items-center gap-2">
                                            <span>📅 Target Tab & Tanggal Prakiraan:</span>
                                        </h4>
                                        <p className="text-[11px] text-muted-foreground mt-0.5">
                                            Pilih tab tujuan file ini akan ditampilkan di halaman publik (Pelabuhan, Provinsi, Infografis)
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setData((prev) => ({
                                                    ...prev,
                                                    forecast_date: todayStr,
                                                    period_type: 'daily',
                                                }));
                                            }}
                                            className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold border transition-all ${
                                                data.period_type === 'daily'
                                                    ? 'bg-blue-600 text-white border-blue-600 shadow-sm ring-2 ring-blue-500/20'
                                                    : 'bg-background hover:bg-muted text-foreground border-border'
                                            }`}
                                        >
                                            📅 Tab 1: Harian (24 Jam)
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setData((prev) => ({
                                                    ...prev,
                                                    forecast_date: tomorrowStr,
                                                    period_type: 'weekly',
                                                }));
                                            }}
                                            className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold border transition-all ${
                                                data.period_type === 'weekly'
                                                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm ring-2 ring-indigo-500/20'
                                                    : 'bg-background hover:bg-muted text-foreground border-border'
                                            }`}
                                        >
                                            🌊 Tab 2: Mingguan (3 Hari)
                                        </button>
                                    </div>
                                </div>

                                <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-3">
                                    <div className="space-y-1.5">
                                        <Label htmlFor="category" className="text-xs font-semibold text-muted-foreground uppercase">
                                            Kategori Target
                                        </Label>
                                        <select
                                            id="category"
                                            value={data.category}
                                            onChange={(e) => setData('category', e.target.value as any)}
                                            className="h-10 w-full rounded-xl border border-input bg-background px-3 py-1.5 text-xs ring-offset-background focus:ring-2 focus:ring-ring focus:outline-none"
                                        >
                                            <option value="auto">⚡ Otomatis Cerdas (Rekomendasi)</option>
                                            <option value="infografis">🖼️ Infografis Cuaca Visual (PNG)</option>
                                            <option value="pelabuhan">⚓ Cuaca Pelabuhan (PDF)</option>
                                            <option value="provinsi">📍 Cuaca Provinsi (PDF)</option>
                                            <option value="bahari">🌊 Wisata Bahari</option>
                                            <option value="buletin">📖 Buletin Maritim</option>
                                            <option value="peringatan-dini">⚠️ Peringatan Dini Gelombang (.PNG)</option>
                                        </select>
                                    </div>

                                    <div className="space-y-1.5">
                                        <Label htmlFor="forecast_date" className="text-xs font-semibold text-muted-foreground uppercase">
                                            Tanggal Berlaku
                                        </Label>
                                        <Input
                                            id="forecast_date"
                                            type="date"
                                            value={data.forecast_date}
                                            onChange={(e) => setData('forecast_date', e.target.value)}
                                            className="h-10 rounded-xl text-xs"
                                        />
                                    </div>

                                    <div className="space-y-1.5">
                                        <Label htmlFor="period_type" className="text-xs font-semibold text-muted-foreground uppercase">
                                            Periode
                                        </Label>
                                        <select
                                            id="period_type"
                                            value={data.period_type}
                                            onChange={(e) => setData('period_type', e.target.value as any)}
                                            className="h-10 w-full rounded-xl border border-input bg-background px-3 py-1.5 text-xs ring-offset-background focus:ring-2 focus:ring-ring focus:outline-none"
                                        >
                                            <option value="daily">Harian (Tab 1 - 24 Jam)</option>
                                            <option value="weekly">Mingguan (Tab 2 - 3 Hari)</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* Tombol Simpan & Submit */}
                            <div className="flex items-center justify-end gap-3 pt-2">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => {
                                        reset();
                                        setShowUploadModal(false);
                                    }}
                                    className="rounded-xl"
                                >
                                    Batal
                                </Button>
                                <Button
                                    type="submit"
                                    disabled={processing || data.files.length === 0}
                                    className="h-11 gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 font-bold text-white shadow-lg hover:from-blue-500 hover:to-indigo-500 disabled:opacity-50"
                                >
                                    <Sparkles className="h-4 w-4" />
                                    {processing
                                        ? `Sedang Memproses ${data.files.length} Berkas...`
                                        : data.files.length > 0
                                          ? `Proses & Terbitkan ${data.files.length} Berkas Sekaligus`
                                          : 'Pilih / Seret Berkas Dulu'}
                                </Button>
                            </div>
                        </form>
                    </div>
                )}

                {/* Main Management Table Card */}
                <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-sm">
                    {/* Filter Tabs & Search Bar */}
                    <div className="flex flex-col justify-between gap-4 border-b border-border bg-muted/20 p-4 sm:p-6 md:flex-row md:items-center">
                        {/* Filter Tabs */}
                        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                            <button
                                onClick={() => setSelectedTab('all')}
                                className={`inline-flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-bold transition-all ${
                                    selectedTab === 'all'
                                        ? 'bg-primary text-primary-foreground shadow-sm'
                                        : 'bg-muted/70 text-muted-foreground hover:bg-muted hover:text-foreground'
                                }`}
                            >
                                <Layers className="h-3.5 w-3.5" />
                                <span>Semua</span>
                                <span
                                    className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                                        selectedTab === 'all'
                                            ? 'bg-primary-foreground/20 text-primary-foreground'
                                            : 'bg-background text-muted-foreground border border-border'
                                    }`}
                                >
                                    {categoryCounts?.all || documents.length}
                                </span>
                            </button>

                            {(
                                [
                                    'infografis',
                                    'pelabuhan',
                                    'provinsi',
                                    'bahari',
                                    'buletin',
                                    'peringatan-dini',
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
                                        onClick={() => setSelectedTab(catKey)}
                                        className={`inline-flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-semibold transition-all ${
                                            isSelected
                                                ? 'bg-primary text-primary-foreground shadow-sm font-bold'
                                                : 'bg-muted/70 text-muted-foreground hover:bg-muted hover:text-foreground'
                                        }`}
                                    >
                                        <Icon className="h-3.5 w-3.5" />
                                        <span>{conf.label}</span>
                                        <span
                                            className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                                                isSelected
                                                    ? 'bg-primary-foreground/20 text-primary-foreground'
                                                    : 'bg-background text-muted-foreground border border-border'
                                            }`}
                                        >
                                            {count}
                                        </span>
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
    );
}

DocumentIndex.layout = {
    breadcrumbs,
};
