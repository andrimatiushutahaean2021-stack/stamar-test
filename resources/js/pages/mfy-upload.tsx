import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/layouts/public-layout';
import { useState, useRef, DragEvent, ChangeEvent, FormEvent } from 'react';
import {
    UploadCloud,
    FileText,
    Image as ImageIcon,
    Code,
    CheckCircle2,
    X,
    AlertCircle,
    AlertTriangle,
    Compass,
    Waves,
    BookOpen,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SelectedFile {
    file: File;
    id: string;
}

export default function MfyUpload() {
    const [selectedCategory, setSelectedCategory] = useState<
        'peringatan-dini' | 'mfy' | 'bahari' | 'buletin'
    >('mfy');
    const [selectedFiles, setSelectedFiles] = useState<SelectedFile[]>([]);
    const [isDragging, setIsDragging] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadSuccess, setUploadSuccess] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const allowedExtensions = ['pdf', 'png', 'jpg', 'jpeg', 'json'];

    const categories = [
        {
            id: 'peringatan-dini',
            label: '1. Peringatan Dini',
            icon: AlertTriangle,
            folder: 'storage/peringatan-dini/',
        },
        {
            id: 'mfy',
            label: '2. MFY (Marine Forecast)',
            icon: Compass,
            folder: 'storage/mfy/',
        },
        {
            id: 'bahari',
            label: '3. Bahari',
            icon: Waves,
            folder: 'storage/bahari/',
        },
        {
            id: 'buletin',
            label: '4. Buletin',
            icon: BookOpen,
            folder: 'storage/buletin/',
        },
    ] as const;

    const handleFiles = (files: FileList | null) => {
        if (!files) return;
        setUploadSuccess(null);
        setErrorMessage(null);

        const newFiles: SelectedFile[] = [];
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const ext = file.name.split('.').pop()?.toLowerCase() || '';

            if (allowedExtensions.includes(ext)) {
                newFiles.push({
                    file,
                    id: `${file.name}-${Date.now()}-${Math.random()}`,
                });
            } else {
                setErrorMessage(
                    `File "${file.name}" tidak didukung. Hanya file .pdf, .png, .jpg, dan .json yang diperbolehkan.`,
                );
            }
        }

        setSelectedFiles((prev) => [...prev, ...newFiles]);
    };

    const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
        handleFiles(e.dataTransfer.files);
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        handleFiles(e.target.files);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const removeFile = (id: string) => {
        setSelectedFiles((prev) => prev.filter((f) => f.id !== id));
    };

    const clearAll = () => {
        setSelectedFiles([]);
        setUploadSuccess(null);
        setErrorMessage(null);
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (selectedFiles.length === 0) return;

        setIsUploading(true);
        setErrorMessage(null);
        setUploadSuccess(null);

        const formData = new FormData();
        formData.append('category', selectedCategory);
        selectedFiles.forEach(({ file }) => {
            formData.append('files[]', file);
        });

        try {
            const response = await fetch('/upload', {
                method: 'POST',
                headers: {
                    'X-Requested-With': 'XMLHttpRequest',
                    'X-CSRF-TOKEN':
                        (
                            document.querySelector(
                                'meta[name="csrf-token"]',
                            ) as HTMLMetaElement
                        )?.content || '',
                },
                body: formData,
            });

            const data = await response.json();

            if (response.ok && data.status === 'success') {
                setUploadSuccess(
                    data.message ||
                        `${selectedFiles.length} file berhasil diunggah!`,
                );
                setSelectedFiles([]);
            } else {
                setErrorMessage(
                    data.message || 'Gagal mengunggah file. Silakan coba lagi.',
                );
            }
        } catch {
            setErrorMessage('Terjadi kesalahan jaringan saat proses upload.');
        } finally {
            setIsUploading(false);
        }
    };

    const getFileIcon = (fileName: string) => {
        const ext = fileName.split('.').pop()?.toLowerCase();
        if (ext === 'pdf') return <FileText className="h-5 w-5 text-red-500" />;
        if (ext === 'png' || ext === 'jpg' || ext === 'jpeg')
            return <ImageIcon className="h-5 w-5 text-cyan-500" />;
        if (ext === 'json') return <Code className="h-5 w-5 text-amber-500" />;
        return <FileText className="h-5 w-5 text-slate-400" />;
    };

    const formatBytes = (bytes: number) => {
        if (bytes < 1024) return bytes + ' B';
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
        return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
    };

    return (
        <PublicLayout>
            <Head title="Upload Berkas Terklasifikasi - BMKG STAMAR" />

            <div className="min-h-screen bg-slate-50 pb-24 dark:bg-[#070b14]">
                {/* Header */}
                <div className="relative overflow-hidden border-b border-slate-800 bg-slate-900 pt-10 pb-16 lg:pt-16 lg:pb-24">
                    <div className="absolute inset-0 opacity-20">
                        <svg
                            className="h-full w-full"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <defs>
                                <pattern
                                    id="upload-grid"
                                    width="40"
                                    height="40"
                                    patternUnits="userSpaceOnUse"
                                >
                                    <path
                                        d="M0 40L40 0H20L0 20M40 40V20L20 40"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1"
                                    />
                                </pattern>
                            </defs>
                            <rect
                                width="100%"
                                height="100%"
                                fill="url(#upload-grid)"
                            />
                        </svg>
                    </div>

                    <div className="pointer-events-none absolute top-0 left-1/3 h-[450px] w-[450px] rounded-full bg-cyan-500/20 blur-[140px]"></div>

                    <div className="relative z-10 container mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
                        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3.5 py-1.5 text-xs font-medium tracking-wide text-cyan-300 uppercase backdrop-blur-md">
                            <UploadCloud className="h-4 w-4 text-cyan-400" />
                            <span>Pusat Unggah Berkas Terklasifikasi</span>
                        </div>

                        <h1 className="mb-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
                            Upload File & Dokumen
                        </h1>
                        <p className="mx-auto max-w-xl text-sm leading-relaxed text-slate-300 sm:text-base">
                            Pilih klasifikasi folder tujuan (Peringatan Dini,
                            MFY, Bahari, atau Buletin) lalu unggah berkas Anda
                            secara instan.
                        </p>
                    </div>
                </div>

                {/* Upload Card */}
                <div className="relative z-20 container mx-auto -mt-8 max-w-3xl px-4 sm:px-6 lg:px-8">
                    <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-2xl backdrop-blur-xl sm:p-8 dark:border-slate-800 dark:bg-slate-900">
                        {/* Folder Classification Selector */}
                        <div className="mb-6">
                            <label className="mb-3 block text-xs font-bold tracking-wider text-slate-700 uppercase dark:text-slate-300">
                                1. Pilih Folder Tujuan Upload:
                            </label>
                            <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                                {categories.map((cat) => {
                                    const Icon = cat.icon;
                                    const isSelected =
                                        selectedCategory === cat.id;
                                    return (
                                        <button
                                            key={cat.id}
                                            type="button"
                                            onClick={() =>
                                                setSelectedCategory(cat.id)
                                            }
                                            className={`flex flex-col justify-between rounded-2xl border p-3 text-left transition-all duration-200 ${
                                                isSelected
                                                    ? 'border-cyan-500 bg-cyan-500/10 font-bold text-cyan-700 shadow-sm ring-2 ring-cyan-500/30 dark:text-cyan-300'
                                                    : 'border-slate-200 text-slate-600 hover:bg-slate-50 dark:border-slate-800 dark:text-slate-400 dark:hover:bg-slate-800/60'
                                            }`}
                                        >
                                            <Icon
                                                className={`mb-2 h-5 w-5 ${isSelected ? 'text-cyan-600 dark:text-cyan-400' : 'text-slate-400'}`}
                                            />
                                            <div>
                                                <span className="block text-xs leading-tight">
                                                    {cat.label}
                                                </span>
                                                <span className="mt-1 block font-mono text-[9px] opacity-70">
                                                    {cat.folder}
                                                </span>
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Notifications */}
                        {uploadSuccess && (
                            <div className="mb-6 flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-800 dark:border-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300">
                                <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0" />
                                <div className="text-sm">
                                    <p className="font-bold">{uploadSuccess}</p>
                                    <p className="mt-1 text-xs text-emerald-600 dark:text-emerald-400">
                                        Data tersimpan di folder{' '}
                                        <code className="rounded bg-emerald-100 px-1 py-0.5 font-mono dark:bg-emerald-900">
                                            storage/{selectedCategory}/
                                        </code>{' '}
                                        dan dapat dilihat di{' '}
                                        <Link
                                            href="/admin/documents"
                                            className="font-semibold underline"
                                        >
                                            Manajemen File
                                        </Link>
                                        .
                                    </p>
                                </div>
                            </div>
                        )}

                        {errorMessage && (
                            <div className="mb-6 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-red-800 dark:border-red-800 dark:bg-red-950/40 dark:text-red-300">
                                <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0" />
                                <p className="text-sm font-semibold">
                                    {errorMessage}
                                </p>
                            </div>
                        )}

                        {/* Drag and Drop Zone */}
                        <div
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                            onClick={() => fileInputRef.current?.click()}
                            className={`relative cursor-pointer rounded-3xl border-2 border-dashed p-8 text-center transition-all duration-300 sm:p-12 ${
                                isDragging
                                    ? 'scale-[1.01] border-cyan-500 bg-cyan-50/50 dark:bg-cyan-950/20'
                                    : 'border-slate-300 hover:border-cyan-500/70 hover:bg-slate-50/50 dark:border-slate-700 dark:hover:bg-slate-800/50'
                            }`}
                        >
                            <input
                                ref={fileInputRef}
                                type="file"
                                multiple
                                accept=".pdf,.png,.jpg,.jpeg,.json"
                                onChange={handleInputChange}
                                className="hidden"
                            />

                            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-100 text-cyan-600 shadow-inner dark:bg-cyan-900/40 dark:text-cyan-400">
                                <UploadCloud className="h-8 w-8" />
                            </div>

                            <h3 className="mb-1 text-lg font-bold text-slate-900 dark:text-white">
                                Tarik & Lepas file ke sini
                            </h3>
                            <p className="mb-4 text-xs text-slate-500 sm:text-sm dark:text-slate-400">
                                atau{' '}
                                <span className="font-semibold text-cyan-600 underline dark:text-cyan-400">
                                    pilih dari komputer
                                </span>
                            </p>

                            <div className="inline-flex items-center gap-2 rounded-xl bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-400 dark:bg-slate-800">
                                <span>Format:</span>
                                <span className="font-bold text-red-500">
                                    PDF
                                </span>
                                <span>&bull;</span>
                                <span className="font-bold text-cyan-500">
                                    PNG / JPG
                                </span>
                                <span>&bull;</span>
                                <span className="font-bold text-amber-500">
                                    JSON
                                </span>
                            </div>
                        </div>

                        {/* Selected Files List */}
                        {selectedFiles.length > 0 && (
                            <div className="mt-8">
                                <div className="mb-3 flex items-center justify-between px-1">
                                    <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">
                                        File Siap Diupload (
                                        {selectedFiles.length}) &rarr;{' '}
                                        <span className="font-mono text-xs text-cyan-600 uppercase dark:text-cyan-400">
                                            {selectedCategory}
                                        </span>
                                    </h4>
                                    <button
                                        type="button"
                                        onClick={clearAll}
                                        className="text-xs font-semibold text-red-500 hover:underline"
                                    >
                                        Hapus Semua
                                    </button>
                                </div>

                                <div className="max-h-64 space-y-2 overflow-y-auto pr-1">
                                    {selectedFiles.map(({ file, id }) => (
                                        <div
                                            key={id}
                                            className="group flex items-center justify-between rounded-2xl border border-slate-200/80 bg-slate-50 p-3 dark:border-slate-700/60 dark:bg-slate-800/60"
                                        >
                                            <div className="flex items-center gap-3 overflow-hidden">
                                                <div className="flex-shrink-0 rounded-xl bg-white p-2 shadow-sm dark:bg-slate-700">
                                                    {getFileIcon(file.name)}
                                                </div>
                                                <div className="overflow-hidden">
                                                    <p className="truncate text-sm font-semibold text-slate-800 dark:text-slate-200">
                                                        {file.name}
                                                    </p>
                                                    <p className="text-[11px] text-slate-500">
                                                        {formatBytes(file.size)}
                                                    </p>
                                                </div>
                                            </div>

                                            <button
                                                type="button"
                                                onClick={() => removeFile(id)}
                                                className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-950/30"
                                            >
                                                <X className="h-4 w-4" />
                                            </button>
                                        </div>
                                    ))}
                                </div>

                                {/* Upload Action Button */}
                                <div className="mt-6">
                                    <Button
                                        onClick={handleSubmit}
                                        disabled={isUploading}
                                        className="h-12 w-full gap-2 rounded-2xl bg-cyan-600 text-sm font-bold text-white shadow-xl hover:bg-cyan-500 hover:shadow-cyan-500/20"
                                    >
                                        {isUploading ? (
                                            <>
                                                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                                                <span>
                                                    Mengunggah ke folder{' '}
                                                    {selectedCategory}...
                                                </span>
                                            </>
                                        ) : (
                                            <>
                                                <UploadCloud className="h-5 w-5" />
                                                <span>
                                                    Mulai Upload{' '}
                                                    {selectedFiles.length} File
                                                    ke Folder{' '}
                                                    {selectedCategory.toUpperCase()}
                                                </span>
                                            </>
                                        )}
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
}
