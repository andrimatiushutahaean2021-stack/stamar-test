import { BookOpen, FileText } from 'lucide-react';

interface Props {
    pdfUrl?: string;
    title: string;
    editionLabel?: string;
    className?: string;
}

export default function PdfCoverCanvas({
    title,
    editionLabel,
    className = '',
}: Props) {
    // Bersihkan judul berkas jika memiliki ekstensi .pdf di akhir
    const cleanTitle = title.replace(/\.pdf$/i, '');

    return (
        <div
            className={`relative flex flex-col justify-between overflow-hidden bg-gradient-to-b from-[#13223f] via-[#0d172c] to-[#070c17] p-5 text-white select-none ${className}`}
        >
            {/* Background subtle watermark & decor */}
            <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-blue-500/10 blur-2xl" />
            <div className="pointer-events-none absolute -left-8 -bottom-8 h-32 w-32 rounded-full bg-sky-500/10 blur-2xl" />

            {/* Header: Logo BMKG & Badge */}
            <div className="relative z-10 flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                    <img
                        src="/images/logo-bmkg.png"
                        alt="BMKG"
                        className="h-7 w-auto object-contain"
                        onError={(e) => {
                            (e.target as HTMLElement).style.display = 'none';
                        }}
                    />
                    <div className="flex flex-col text-left">
                        <span className="text-[10px] font-black tracking-widest text-sky-400 uppercase leading-tight">
                            BMKG MARITIM
                        </span>
                        <span className="text-[8px] font-medium text-slate-400 tracking-wider">
                            AMBON
                        </span>
                    </div>
                </div>
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-sky-500/10 text-sky-400">
                    <BookOpen className="h-3.5 w-3.5" />
                </div>
            </div>

            {/* Content: Badge & Title */}
            <div className="relative z-10 my-auto py-4 text-center">
                <div className="mb-2.5 inline-block rounded-full bg-sky-500/20 px-3 py-1 text-[10px] font-extrabold tracking-wider text-sky-300 uppercase border border-sky-500/30">
                    {editionLabel || 'BULETIN RESMI'}
                </div>
                <h4 className="text-sm font-black tracking-tight text-white line-clamp-3 leading-snug">
                    {cleanTitle}
                </h4>
                <p className="mt-2.5 text-[9px] text-slate-400 line-clamp-2">
                    Stasiun Meteorologi Maritim Kelas II Yos Soedarso Ambon
                </p>
            </div>

            {/* Footer: Metadata & Format */}
            <div className="relative z-10 flex items-center justify-between border-t border-white/10 pt-2.5 text-[9px] text-slate-400">
                <span className="font-semibold tracking-wide text-slate-300">
                    Format Dokumen: PDF
                </span>
                <div className="flex items-center gap-1 text-sky-400">
                    <FileText className="h-3.5 w-3.5" />
                </div>
            </div>
        </div>
    );
}
