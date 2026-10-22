import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/layouts/public-layout';
import {
    Star,
    ExternalLink,
    Clock,
    ShieldCheck,
    Building2,
    ArrowLeft,
    Sparkles,
} from 'lucide-react';

export default function SurveyIkm() {
    const surveyUrl =
        'https://eskm.bmkg.go.id/survey/436010/0/1/2024-04/2024/0';

    return (
        <PublicLayout>
            <Head title="Survei Kepuasan Masyarakat (IKM) - Stasiun Meteorologi Maritim Yos Soedarso Ambon" />

            <div className="relative min-h-[calc(100vh-140px)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-950 overflow-hidden">

                <div className="relative z-10 w-full max-w-2xl">
                    <div className="rounded-lg border border-slate-800 bg-slate-900/80 p-6 sm:p-10 shadow-sm text-center">
                        
                        {/* Header Badges */}
                        <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
                            <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 px-3.5 py-1 text-xs font-semibold text-blue-400">
                                <Sparkles className="h-3.5 w-3.5 text-blue-400" />
                                e-SKM Resmi BMKG
                            </span>
                            <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-700 bg-slate-800 px-3.5 py-1 text-xs font-medium text-slate-300">
                                <Building2 className="h-3.5 w-3.5 text-slate-400" />
                                Kode UPT: 436010
                            </span>
                        </div>

                        {/* Rating Stars Graphic */}
                        <div className="flex items-center justify-center gap-1.5 text-amber-400 mb-4">
                            {[...Array(5)].map((_, i) => (
                                <Star
                                    key={i}
                                    className="h-6 w-6 sm:h-7 sm:w-7 fill-amber-400 animate-pulse"
                                    style={{ animationDelay: `${i * 150}ms` }}
                                />
                            ))}
                        </div>

                        {/* Title & Description */}
                        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight">
                            Survei Kepuasan Masyarakat (IKM)
                        </h1>
                        <p className="mt-2 text-sm sm:text-base font-medium text-blue-300">
                            Stasiun Meteorologi Kelas II Maritim Yos Soedarso Ambon
                        </p>
                        <p className="mt-4 text-xs sm:text-sm text-slate-300 leading-relaxed max-w-lg mx-auto">
                            Bantu kami meningkatkan kualitas pelayanan informasi dan jasa cuaca maritim dengan memberikan penilaian Anda melalui kuesioner resmi <strong>e-SKM BMKG</strong>.
                        </p>

                        {/* 3 Quick Features Info */}
                        <div className="grid grid-cols-3 gap-3 my-8 pt-6 border-t border-slate-800 text-slate-300">
                            <div className="flex flex-col items-center p-3 rounded-lg bg-slate-800/50 border border-slate-800">
                                <Clock className="h-5 w-5 text-blue-400 mb-1" />
                                <span className="text-[11px] sm:text-xs font-semibold">± 3 Menit</span>
                                <span className="text-[10px] text-slate-400">Pengisian Cepat</span>
                            </div>
                            <div className="flex flex-col items-center p-3 rounded-lg bg-slate-800/50 border border-slate-800">
                                <ShieldCheck className="h-5 w-5 text-emerald-400 mb-1" />
                                <span className="text-[11px] sm:text-xs font-semibold">Anonim</span>
                                <span className="text-[10px] text-slate-400">Data Terlindungi</span>
                            </div>
                            <div className="flex flex-col items-center p-3 rounded-lg bg-slate-800/50 border border-slate-800">
                                <Building2 className="h-5 w-5 text-amber-400 mb-1" />
                                <span className="text-[11px] sm:text-xs font-semibold">Langsung</span>
                                <span className="text-[10px] text-slate-400">Ke Sistem BMKG</span>
                            </div>
                        </div>

                        {/* Primary Action Button */}
                        <div className="space-y-3">
                            <a
                                href={surveyUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex w-full items-center justify-center gap-2.5 rounded-lg bg-blue-600 px-6 py-3.5 text-sm sm:text-base font-bold text-white shadow-sm transition-all hover:bg-blue-500 active:translate-y-0"
                            >
                                <span>Mulai Isi Survei di e-SKM BMKG</span>
                                <ExternalLink className="h-4 w-4" />
                            </a>

                            <div className="flex items-center justify-center gap-4 pt-2">
                                <Link
                                    href="/informasi"
                                    className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-400 hover:text-white transition-colors"
                                >
                                    <ArrowLeft className="h-3.5 w-3.5" />
                                    Pelayanan Informasi & Jasa
                                </Link>
                                <span className="text-slate-600">•</span>
                                <Link
                                    href="/"
                                    className="text-xs font-medium text-slate-400 hover:text-white transition-colors"
                                >
                                    Beranda
                                </Link>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </PublicLayout>
    );
}
