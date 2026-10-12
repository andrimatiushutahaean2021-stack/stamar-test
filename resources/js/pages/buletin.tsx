import { Head } from '@inertiajs/react';
import PublicLayout from '@/layouts/public-layout';
import {
    BookOpen,
    FileText,
    Download,
    Calendar,
    ArrowRight,
    BookMarked,
    Sparkles,
} from 'lucide-react';

interface DocumentItem {
    id: number;
    title: string;
    category: string;
    description?: string;
    file_path: string;
    file_type?: string;
    file_size?: string;
    created_at: string;
}

interface Props {
    documents?: DocumentItem[];
}

export default function Buletin({ documents = [] }: Props) {
    const defaultArchives = [
        {
            title: '05. BULETIN MEI 2026.pdf',
            date: 'Mei 2026',
            size: '2.4 MB',
            url: '#',
        },
        {
            title: '03. BULETIN Maret 2026.pdf',
            date: 'Maret 2026',
            size: '3.1 MB',
            url: '#',
        },
        {
            title: '02. BULETIN Februari 2026.pdf',
            date: 'Februari 2026',
            size: '2.8 MB',
            url: '#',
        },
        {
            title: '12. BULETIN Desember 2025.pdf',
            date: 'Desember 2025',
            size: '4.2 MB',
            url: '#',
        },
    ];

    const hasUploads = documents.length > 0;
    const latestDoc = hasUploads ? documents[0] : null;
    const archiveList = hasUploads
        ? documents.slice(1).map((doc) => ({
              title: doc.title,
              date: new Date(doc.created_at).toLocaleDateString('id-ID', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
              }),
              size: doc.file_size || 'PDF',
              url: `/storage/${doc.file_path}`,
          }))
        : defaultArchives;

    return (
        <PublicLayout>
            <Head title="Buletin Maritim" />

            <div className="min-h-screen bg-slate-50 pb-24 dark:bg-[#0B1120]">
                {/* Hero Section */}
                <div className="relative overflow-hidden bg-slate-900 pt-12 pb-16 text-white lg:pt-20 lg:pb-24">
                    <div className="absolute inset-0 opacity-10">
                        <svg
                            className="h-full w-full"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <defs>
                                <pattern
                                    id="dots"
                                    x="0"
                                    y="0"
                                    width="20"
                                    height="20"
                                    patternUnits="userSpaceOnUse"
                                >
                                    <circle
                                        fill="currentColor"
                                        cx="2"
                                        cy="2"
                                        r="2"
                                    ></circle>
                                </pattern>
                            </defs>
                            <rect
                                x="0"
                                y="0"
                                width="100%"
                                height="100%"
                                fill="url(#dots)"
                            ></rect>
                        </svg>
                    </div>
                    {/* Decorative Gradients */}
                    <div className="pointer-events-none absolute top-0 right-1/4 h-96 w-96 rounded-full bg-indigo-500 opacity-40 mix-blend-screen blur-[128px]"></div>
                    <div className="pointer-events-none absolute bottom-0 left-1/4 h-96 w-96 rounded-full bg-blue-500 opacity-30 mix-blend-screen blur-[128px]"></div>

                    <div className="relative z-10 container mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
                        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-medium tracking-wide text-white uppercase backdrop-blur-md">
                            <BookOpen className="h-4 w-4 text-indigo-300" />
                            <span>Publikasi Bulanan</span>
                        </div>
                        <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-white md:text-5xl lg:text-6xl">
                            Buletin{' '}
                            <span className="bg-gradient-to-r from-indigo-400 to-blue-300 bg-clip-text text-transparent">
                                Maritim
                            </span>
                        </h1>
                        <p className="mx-auto max-w-2xl text-lg leading-relaxed text-slate-300">
                            Akses ragam informasi, evaluasi cuaca, analisis
                            iklim maritim, serta rangkuman fenomena kelautan
                            melalui buletin edisi terbaru dan arsip kami.
                        </p>
                    </div>
                </div>

                <div className="relative z-20 container mx-auto -mt-8 max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
                        {/* Latest Edition Section (Featured) */}
                        <div className="lg:col-span-8">
                            <div className="flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-6 shadow-xl sm:p-8 dark:border-slate-700/50 dark:bg-slate-800">
                                <div className="mb-6 flex items-center gap-3">
                                    <div className="rounded-xl bg-indigo-100 p-3 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400">
                                        <BookMarked className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                                            Edisi Terbaru
                                        </h2>
                                        <p className="text-sm text-slate-500 dark:text-slate-400">
                                            {latestDoc
                                                ? latestDoc.title
                                                : 'Buletin Maritim Maluku'}
                                        </p>
                                    </div>
                                </div>

                                {/* PDF Viewer Card */}
                                <div className="relative flex min-h-[500px] flex-grow flex-col items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 p-6 text-center dark:border-slate-700 dark:bg-slate-900">
                                    {/* Mock / Actual Toolbar */}
                                    <div className="absolute top-0 right-0 left-0 flex h-12 items-center justify-between border-b border-slate-700 bg-slate-800 px-4 text-slate-300">
                                        <div className="line-clamp-1 font-mono text-xs">
                                            {latestDoc
                                                ? latestDoc.title
                                                : '06. BULETIN STAMAR AMBON.pdf'}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            {hasUploads && (
                                                <span className="flex items-center gap-1 rounded-full bg-indigo-500/20 px-2 py-0.5 text-[10px] font-semibold text-indigo-300">
                                                    <Sparkles className="h-3 w-3" />{' '}
                                                    Rilis Terbaru
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    <FileText className="mt-12 mb-4 h-24 w-24 text-indigo-400 opacity-60" />
                                    <h3 className="mb-2 text-xl font-bold text-slate-800 dark:text-white">
                                        {latestDoc
                                            ? latestDoc.title
                                            : 'Buletin Maritim Edisi Resmi'}
                                    </h3>
                                    <p className="mb-6 max-w-md text-sm text-slate-500 dark:text-slate-400">
                                        {latestDoc?.description ||
                                            'Publikasi resmi bulanan Stasiun Meteorologi Maritim Ambon mengenai iklim, cuaca, dan kelautan wilayah Maluku.'}
                                    </p>

                                    {latestDoc ? (
                                        <a
                                            href={`/storage/${latestDoc.file_path}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 rounded-full bg-indigo-600 px-6 py-3 font-semibold text-white shadow-lg transition-transform duration-300 hover:scale-105 hover:bg-indigo-700"
                                        >
                                            <Download className="h-5 w-5" />{' '}
                                            Unduh Dokumen PDF (
                                            {latestDoc.file_size || 'PDF'})
                                        </a>
                                    ) : (
                                        <button className="flex items-center gap-2 rounded-full bg-indigo-600 px-6 py-3 font-medium text-white opacity-70">
                                            <Download className="h-5 w-5" />{' '}
                                            Belum Ada Berkas Terunggah
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Archive Section */}
                        <div className="lg:col-span-4">
                            <div className="h-full rounded-3xl border border-slate-200 bg-white p-6 shadow-xl dark:border-slate-700/50 dark:bg-slate-800">
                                <div className="mb-6 flex items-center gap-3">
                                    <div className="rounded-xl bg-slate-100 p-3 text-slate-600 dark:bg-slate-700 dark:text-slate-300">
                                        <Calendar className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                                            Arsip Edisi
                                        </h2>
                                        <p className="text-sm text-slate-500 dark:text-slate-400">
                                            Daftar publikasi lainnya
                                        </p>
                                    </div>
                                </div>

                                <div className="custom-scrollbar max-h-[600px] space-y-4 overflow-y-auto pr-2">
                                    {archiveList.map((item, index) => (
                                        <a
                                            key={index}
                                            href={item.url}
                                            target={
                                                item.url !== '#'
                                                    ? '_blank'
                                                    : undefined
                                            }
                                            rel="noopener noreferrer"
                                            className="group block rounded-2xl border border-slate-100 bg-slate-50/50 p-4 transition-all hover:border-indigo-300 hover:bg-white hover:shadow-md dark:border-slate-700 dark:bg-slate-800/50 dark:hover:border-indigo-500 dark:hover:bg-slate-800"
                                        >
                                            <div className="flex gap-4">
                                                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-rose-100 text-rose-600 dark:bg-rose-900/30">
                                                    <FileText className="h-6 w-6" />
                                                </div>
                                                <div className="flex-grow">
                                                    <h4 className="mb-1 line-clamp-2 text-sm font-semibold text-slate-800 group-hover:text-indigo-600 dark:text-slate-200 dark:group-hover:text-indigo-400">
                                                        {item.title}
                                                    </h4>
                                                    <div className="flex items-center justify-between text-xs text-slate-500">
                                                        <span>{item.date}</span>
                                                        <span className="font-medium">
                                                            {item.size}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="mt-3 flex justify-end border-t border-slate-100 pt-3 dark:border-slate-700">
                                                <span className="flex translate-x-2 transform items-center gap-1 text-xs font-bold text-indigo-600 opacity-0 transition-opacity group-hover:translate-x-0 group-hover:opacity-100 dark:text-indigo-400">
                                                    Buka Berkas{' '}
                                                    <ArrowRight className="h-3 w-3" />
                                                </span>
                                            </div>
                                        </a>
                                    ))}
                                </div>

                                <button className="mt-6 w-full rounded-xl border-2 border-dashed border-slate-300 py-3 text-sm font-medium text-slate-500 transition-colors hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-600 dark:border-slate-600 dark:hover:bg-indigo-900/20">
                                    Muat Arsip Lama...
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style
                dangerouslySetInnerHTML={{
                    __html: `
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background-color: #cbd5e1;
                    border-radius: 20px;
                }
                .dark .custom-scrollbar::-webkit-scrollbar-thumb {
                    background-color: #475569;
                }
            `,
                }}
            />
        </PublicLayout>
    );
}
