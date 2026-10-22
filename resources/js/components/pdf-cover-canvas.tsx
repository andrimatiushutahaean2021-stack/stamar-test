import { useEffect, useRef, useState } from 'react';
import { BookOpen, FileText, Loader2 } from 'lucide-react';

interface Props {
    pdfUrl: string;
    title: string;
    editionLabel?: string;
    className?: string;
}

declare global {
    interface Window {
        pdfjsLib?: any;
    }
}

export default function PdfCoverCanvas({
    pdfUrl,
    title,
    editionLabel,
    className = '',
}: Props) {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [loading, setLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        let isMounted = true;
        let renderTask: any = null;

        const loadPdfPage = async () => {
            if (!pdfUrl || pdfUrl === '#') {
                if (isMounted) {
                    setLoading(false);
                    setHasError(true);
                }
                return;
            }

            try {
                // Tunggu pdfjsLib tersedia di window jika script masih memuat
                let attempts = 0;
                while (!window.pdfjsLib && attempts < 25) {
                    await new Promise((resolve) => setTimeout(resolve, 150));
                    attempts++;
                }

                if (!window.pdfjsLib) {
                    if (isMounted) {
                        setLoading(false);
                        setHasError(true);
                    }
                    return;
                }

                if (!window.pdfjsLib.GlobalWorkerOptions.workerSrc) {
                    window.pdfjsLib.GlobalWorkerOptions.workerSrc =
                        'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
                }

                const loadingTask = window.pdfjsLib.getDocument({
                    url: pdfUrl,
                    cMapUrl: 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/cmaps/',
                    cMapPacked: true,
                });

                const pdf = await loadingTask.promise;
                if (!isMounted) return;

                const page = await pdf.getPage(1);
                if (!isMounted || !canvasRef.current) return;

                const canvas = canvasRef.current;
                const context = canvas.getContext('2d');
                if (!context) return;

                // Tentukan skala tajam (high DPI 1.5x - 2.0x)
                const viewport = page.getViewport({ scale: 1.5 });
                canvas.width = viewport.width;
                canvas.height = viewport.height;

                renderTask = page.render({
                    canvasContext: context,
                    viewport: viewport,
                });

                await renderTask.promise;

                if (isMounted) {
                    setLoading(false);
                    setHasError(false);
                }
            } catch (err: any) {
                if (err?.name !== 'RenderingCancelledException' && isMounted) {
                    setLoading(false);
                    setHasError(true);
                }
            }
        };

        setLoading(true);
        setHasError(false);
        void loadPdfPage();

        return () => {
            isMounted = false;
            if (renderTask && renderTask.cancel) {
                renderTask.cancel();
            }
        };
    }, [pdfUrl]);

    return (
        <div className={`relative flex items-center justify-center overflow-hidden bg-slate-900 ${className}`}>
            {/* Canvas untuk merender halaman 1 asli dari PDF Buletin */}
            <canvas
                ref={canvasRef}
                className={`h-full w-full object-contain transition-opacity duration-500 ${
                    loading || hasError ? 'opacity-0' : 'opacity-100'
                }`}
            />

            {/* Loading Skeleton */}
            {loading && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900/90 text-slate-400 p-4 text-center">
                    <Loader2 className="h-7 w-7 animate-spin text-sky-400 mb-2" />
                    <span className="text-[11px] font-medium text-slate-300">
                        Memuat Cover Buletin...
                    </span>
                </div>
            )}

            {/* Fallback Magazine Cover jika PDF belum termuat atau error */}
            {!loading && hasError && (
                <div className="absolute inset-0 flex flex-col justify-between bg-gradient-to-b from-slate-800 via-slate-900 to-[#0c1424] p-5 text-white">
                    <div className="flex items-center justify-between border-b border-white/10 pb-3">
                        <div className="flex items-center gap-2">
                            <img
                                src="/images/logo-bmkg.png"
                                alt="BMKG"
                                className="h-7 w-auto object-contain"
                                onError={(e) => {
                                    (e.target as HTMLElement).style.display = 'none';
                                }}
                            />
                            <span className="text-[10px] font-bold tracking-widest text-sky-300 uppercase">
                                BMKG MARITIM
                            </span>
                        </div>
                        <BookOpen className="h-4 w-4 text-sky-400" />
                    </div>

                    <div className="my-auto py-4 text-center">
                        <div className="mb-2 inline-block rounded-full bg-sky-500/20 px-3 py-1 text-[11px] font-extrabold tracking-wider text-sky-300 uppercase">
                            {editionLabel || 'BULETIN RESMI'}
                        </div>
                        <h4 className="text-sm font-black tracking-tight text-white line-clamp-3">
                            {title}
                        </h4>
                        <p className="mt-2 text-[10px] text-slate-400">
                            Stasiun Meteorologi Maritim Kelas II Yos Soedarso Ambon
                        </p>
                    </div>

                    <div className="flex items-center justify-between border-t border-white/10 pt-2 text-[9px] text-slate-400">
                        <span>Format Dokumen: PDF</span>
                        <FileText className="h-3.5 w-3.5 text-slate-500" />
                    </div>
                </div>
            )}
        </div>
    );
}
