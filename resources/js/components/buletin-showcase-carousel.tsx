import { useRef } from 'react';
import { Link } from '@inertiajs/react';
import { BookOpen, ChevronLeft, ChevronRight, ExternalLink, Search } from 'lucide-react';
import PdfCoverCanvas from '@/components/pdf-cover-canvas';

export interface BuletinItem {
    id: number;
    title: string;
    category: string;
    forecast_date?: string;
    description?: string;
    file_path: string;
    file_type?: string;
    file_size?: string;
    created_at: string;
}

interface Props {
    documents: BuletinItem[];
    stationName?: string;
}

export default function BuletinShowcaseCarousel({
    documents = [],
    stationName = 'Stasiun Maritim Ambon',
}: Props) {
    const scrollContainerRef = useRef<HTMLDivElement | null>(null);

    const scrollLeft = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: -320, behavior: 'smooth' });
        }
    };

    const scrollRight = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: 320, behavior: 'smooth' });
        }
    };

    const formatEditionLabel = (doc: BuletinItem) => {
        if (doc.forecast_date) {
            const d = new Date(doc.forecast_date);
            return `Edisi ${d.toLocaleDateString('id-ID', { month: 'long', year: 'numeric' })}`;
        }
        return `Edisi ${new Date(doc.created_at).toLocaleDateString('id-ID', { month: 'long', year: 'numeric' })}`;
    };

    if (documents.length === 0) {
        return null;
    }

    return (
        <div className="relative overflow-hidden rounded-lg border border-slate-800 bg-[#0B132B] p-5 sm:p-7 text-white shadow-sm">
            {/* Ambient Background Glow */}
            <div className="pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl"></div>
            <div className="pointer-events-none absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl"></div>

            {/* Header: Judul & Link Arsip Lengkap */}
            <div className="relative z-10 mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500 p-0.5 shadow-sm">
                        <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-[#0B132B]">
                            <BookOpen className="h-5 w-5 text-blue-400" />
                        </div>
                    </div>
                    <div>
                        <h2 className="text-lg font-bold tracking-tight text-white sm:text-xl">
                            Buletin Bulanan {stationName}
                        </h2>
                        <p className="text-xs text-slate-400">
                            Publikasi resmi evaluasi dan analisis cuaca maritim edisi bulanan
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <div className="hidden sm:flex items-center gap-1.5 mr-2">
                        <button
                            type="button"
                            onClick={scrollLeft}
                            className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-700 bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white transition-all"
                            aria-label="Scroll Sebelumnya"
                        >
                            <ChevronLeft className="h-4 w-4" />
                        </button>
                        <button
                            type="button"
                            onClick={scrollRight}
                            className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-700 bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white transition-all"
                            aria-label="Scroll Selanjutnya"
                        >
                            <ChevronRight className="h-4 w-4" />
                        </button>
                    </div>

                    <Link
                        href="/buletin"
                        className="group inline-flex items-center gap-1 text-xs font-bold text-blue-400 hover:text-blue-300 transition-colors"
                    >
                        <span>Arsip Lengkap</span>
                        <span className="transition-transform group-hover:translate-x-1">→</span>
                    </Link>
                </div>
            </div>

            {/* Horizontal Track of Cards */}
            <div
                ref={scrollContainerRef}
                className="relative z-10 flex gap-5 overflow-x-auto pb-3 pt-1 scroll-smooth scrollbar-thin scrollbar-track-slate-900 scrollbar-thumb-slate-700"
                style={{ scrollSnapType: 'x mandatory' }}
            >
                {documents.map((buletin) => {
                    const editionTitle = formatEditionLabel(buletin);
                    const pdfHref = `/storage/${buletin.file_path}`;

                    return (
                        <div
                            key={buletin.id}
                            className="group flex w-[260px] sm:w-[290px] flex-shrink-0 flex-col justify-between rounded-lg border border-slate-800/90 bg-[#121E36] p-4 shadow-sm transition-all duration-300 hover:border-blue-500/60 hover:shadow-sm"
                            style={{ scrollSnapAlign: 'start' }}
                        >
                            {/* Card Top Title: Edisi Bulan Tahun */}
                            <div className="mb-3">
                                <h3 className="text-sm font-bold text-white tracking-wide group-hover:text-blue-300 transition-colors">
                                    {editionTitle}
                                </h3>
                            </div>

                            {/* Cover Container */}
                            <a
                                href={pdfHref}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block aspect-[1/1.38] w-full overflow-hidden rounded-lg border border-slate-700/80 bg-slate-950 shadow-inner group/cover relative"
                            >
                                <PdfCoverCanvas
                                    pdfUrl={pdfHref}
                                    title={buletin.title}
                                    editionLabel={editionTitle}
                                    className="h-full w-full object-cover transition-transform duration-500 group-hover/cover:scale-105"
                                />

                                {/* Subtle Hover Overlay */}
                                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover/cover:opacity-100 transition-opacity flex items-end justify-center p-3">
                                    <span className="text-[11px] font-semibold text-white drop-shadow flex items-center gap-1">
                                        <ExternalLink className="h-3.5 w-3.5" /> Buka Halaman Penuh
                                    </span>
                                </div>
                            </a>

                            {/* Card Action Button: 🔍 Buka / PDF */}
                            <div className="mt-4">
                                <a
                                    href={pdfHref}
                                    target="_blank"
                                    rel="noopener noreferrer"
 className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-500 px-4 py-2.5 text-xs sm:text-sm font-bold text-white shadow-sm transition-all duration-200 hover:bg-blue-400 hover:shadow-sm active:scale-[0.98]"
                                >
                                    <Search className="h-4 w-4" />
                                    <span>Buka / PDF</span>
                                </a>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
