import { useState, useMemo } from 'react';
import {
    ZoomIn,
    X,
    RotateCcw,
} from 'lucide-react';

export interface CoverDocumentItem {
    id?: number;
    title?: string;
    file_path?: string;
    file_type?: string;
    forecast_date?: string;
    period_type?: string;
    description?: string;
}

interface ForecastCoverBannerProps {
    type: 'provinsi' | 'pelabuhan';
    activeTab?: 'tab1' | 'tab2';
    tab1Date?: string;
    tab2Date?: string;
    coverDocuments?: CoverDocumentItem[];
    coverDocument?: CoverDocumentItem | null;
}

export default function ForecastCoverBanner({
    type,
    activeTab = 'tab1',
    tab1Date,
    tab2Date,
    coverDocuments = [],
    coverDocument,
}: ForecastCoverBannerProps) {
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);
    const [zoomLevel, setZoomLevel] = useState(1);

    const isProvinsi = type === 'provinsi';
    const fallbackImage = isProvinsi
        ? '/images/cover-cuaca-provinsi.png'
        : '/images/cover-cuaca-pelabuhan.png';

    // Logika pemilihan gambar sampul sesuai tanggal kolom tab yang aktif
    const activeCover = useMemo(() => {
        const docs = coverDocuments && coverDocuments.length > 0
            ? coverDocuments
            : coverDocument ? [coverDocument] : [];

        if (docs.length === 0) return null;

        // 1. Cocokkan berdasarkan tanggal rilis (forecast_date)
        const targetDate = activeTab === 'tab1' ? tab1Date : tab2Date;
        if (targetDate) {
            const matchedByDate = docs.find((d) => {
                const dDate = d.forecast_date ? d.forecast_date.split('T')[0] : '';
                return dDate === targetDate;
            });
            if (matchedByDate) return matchedByDate;
        }

        // 2. Cocokkan berdasarkan period_type ('daily' untuk Tab 1, 'weekly' untuk Tab 2)
        const targetPeriod = activeTab === 'tab1' ? 'daily' : 'weekly';
        const matchedByPeriod = docs.find((d) => d.period_type === targetPeriod);
        if (matchedByPeriod) return matchedByPeriod;

        // 3. Jika ada minimal 2 cover berbeda di database:
        // Tab 1 mengambil cover kedua/pertama, Tab 2 mengambil cover terbaru
        if (docs.length >= 2) {
            return activeTab === 'tab1' ? docs[1] : docs[0];
        }

        return docs[0];
    }, [coverDocuments, coverDocument, activeTab, tab1Date, tab2Date]);

    const imageUrl = activeCover?.file_path
        ? `/storage/${activeCover.file_path}`
        : fallbackImage;

    const title = isProvinsi
        ? 'Sampul Prakiraan Cuaca Maritim Wilayah Provinsi Maluku'
        : 'Sampul Prakiraan Cuaca Pelabuhan Provinsi Maluku';

    const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 0.25, 2.5));
    const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 0.25, 0.75));
    const handleResetZoom = () => setZoomLevel(1);

    return (
        <>
            {/* Tampilan Sampul Bersih & Terpusat Tepat di Atas Kolom Tanggal */}
            <div className="mb-6 flex flex-col items-center justify-center">
                <div
                    onClick={() => {
                        setZoomLevel(1);
                        setIsLightboxOpen(true);
                    }}
                    className="group relative w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl cursor-pointer overflow-hidden rounded-lg border border-slate-200/90 bg-white p-2 sm:p-2.5 shadow-sm transition-all duration-300 hover:scale-[1.015] dark:border-slate-800 dark:bg-slate-900"
                    title="Klik untuk perbesar gambar sampul"
                >
                    <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-slate-950/5 dark:bg-slate-950">
                        <img
                            key={imageUrl}
                            src={imageUrl}
                            alt={title}
                            className="h-full w-full object-contain transition-transform duration-500 "
                            onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                if (target.src !== fallbackImage) {
                                    target.src = fallbackImage;
                                }
                            }}
                        />

                        {/* Petunjuk Klik Perbesar saat Hover */}
                        <div className="absolute inset-0 flex items-center justify-center bg-black/35 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover:opacity-100">
                            <div className="flex items-center gap-2 rounded-full border border-white/20 bg-slate-950/80 px-4 py-2 text-xs font-bold text-white shadow-sm ">
                                <ZoomIn className="h-4 w-4 text-blue-400" />
                                <span>Klik untuk Perbesar</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Lightbox Modal Saat Gambar Diklik */}
            {isLightboxOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-3 transition-all sm:p-6"
                    onClick={() => setIsLightboxOpen(false)}
                >
                    <div
                        className="relative flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-lg bg-slate-900 border border-slate-800 shadow-sm"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header Modal */}
                        <div className="flex items-center justify-between border-b border-slate-800 bg-slate-950/80 px-4 py-3 sm:px-6">
                            <h4 className="text-sm font-bold text-white sm:text-base">
                                {title}
                            </h4>

                            {/* Controls */}
                            <div className="flex items-center gap-1.5 sm:gap-2">
                                <button
                                    type="button"
                                    onClick={handleZoomIn}
                                    title="Perbesar"
                                    className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-800 text-slate-200 hover:bg-slate-700 hover:text-white transition-colors"
                                >
                                    <ZoomIn className="h-4 w-4" />
                                </button>
                                <button
                                    type="button"
                                    onClick={handleZoomOut}
                                    title="Perkecil"
                                    className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-800 text-slate-200 hover:bg-slate-700 hover:text-white transition-colors"
                                >
                                    <span className="text-base font-bold leading-none">−</span>
                                </button>
                                <button
                                    type="button"
                                    onClick={handleResetZoom}
                                    title="Ukuran Asli (100%)"
                                    className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-800 text-slate-200 hover:bg-slate-700 hover:text-white transition-colors"
                                >
                                    <RotateCcw className="h-3.5 w-3.5" />
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setIsLightboxOpen(false)}
                                    title="Tutup"
                                    className="ml-1 flex h-8 w-8 items-center justify-center rounded-lg bg-rose-600/80 text-white hover:bg-rose-600 transition-colors"
                                >
                                    <X className="h-4 w-4" />
                                </button>
                            </div>
                        </div>

                        {/* Image Viewer with Zoom */}
                        <div className="flex flex-1 items-center justify-center overflow-auto bg-slate-950 p-4 sm:p-6 min-h-[300px] max-h-[75vh]">
                            <img
                                src={imageUrl}
                                alt={title}
                                style={{
                                    transform: `scale(${zoomLevel})`,
                                    transition: 'transform 0.2s ease-out',
                                }}
                                className="max-h-[68vh] w-auto max-w-full rounded-lg object-contain shadow-sm"
                            />
                        </div>

                        {/* Footer Modal */}
                        <div className="flex items-center justify-between border-t border-slate-800 bg-slate-950/90 px-4 py-2 text-xs text-slate-400">
                            <span>Perbesaran: {Math.round(zoomLevel * 100)}%</span>
                            <span className="text-[11px] text-slate-500">
                                Klik di luar atau tombol silang untuk menutup
                            </span>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
