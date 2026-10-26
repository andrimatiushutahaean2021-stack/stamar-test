import { Head, Link, usePage } from '@inertiajs/react';
import { Spinner } from '@/components/ui/spinner';
import {
    AlertCircle,
    CheckCircle2,
    ShieldCheck,
    Sparkles,
    Building2,
    ArrowRight,
} from 'lucide-react';
import { useState } from 'react';

type Props = {
    status?: string;
    error?: string;
};

function GoogleIcon({ className = 'h-5 w-5' }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
            <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
        </svg>
    );
}

export default function Login({ status, error }: Props) {
    const [isGoogleRedirecting, setIsGoogleRedirecting] = useState(false);

    const { flash } = usePage<{
        flash?: {
            error?: string;
            success?: string;
            status?: string;
        };
    }>().props;

    const displayError = error || flash?.error;
    const displayStatus = status || flash?.status || flash?.success;

    const handleGoogleLogin = () => {
        setIsGoogleRedirecting(true);
        window.location.href = '/panel-stamar/auth/google';
    };

    return (
        <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#070b14] p-4 text-slate-100 selection:bg-blue-600 selection:text-white sm:p-6">
            <Head title="Login Administrator SSO - BMKG Stamar Ambon" />

            {/* Ambient Background Glowing Lights */}
            <div className="pointer-events-none absolute -top-32 -left-32 h-96 w-96 rounded-full bg-blue-600/20 blur-[140px]"></div>
            <div className="pointer-events-none absolute -right-32 -bottom-32 h-96 w-96 rounded-full bg-cyan-500/20 blur-[140px]"></div>
            <div className="pointer-events-none absolute top-1/2 left-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-600/10 blur-[160px]"></div>

            <div className="relative z-10 my-auto w-full max-w-md">
                {/* Header with BMKG Branding */}
                <div className="mb-8 text-center">
                    <Link
                        href="/"
                        className="group mb-5 inline-flex items-center justify-center gap-3.5"
                    >
                        <img
                            src="/images/logo-bmkg.png"
                            alt="Logo BMKG"
                            className="h-14 w-auto object-contain transition-transform duration-300 group-hover:scale-105 shrink-0"
                        />
                        <div className="text-left">
                            <span className="block text-sm font-extrabold tracking-tight text-white leading-tight sm:text-base">
                                Badan Meteorologi Klimatologi Dan Geofisika
                            </span>
                            <span className="mt-0.5 block text-xs font-medium text-slate-400 leading-tight">
                                Stasiun Meteorologi Maritim Kelas II Yos Soedarso Ambon
                            </span>
                        </div>
                    </Link>
                    <h1 className="text-2xl font-bold tracking-tight text-white">
                        Panel Administrasi
                    </h1>
                    <p className="mt-1.5 text-xs text-slate-400 sm:text-sm">
                        Autentikasi Terpadu Single Sign-On (SSO) Google
                    </p>
                </div>

                {/* Login Form Card */}
                <div className="rounded-3xl border border-slate-800/80 bg-slate-900/85 p-6 shadow-2xl shadow-black/70 backdrop-blur-2xl sm:p-8">
                    {/* Status Alert Banner */}
                    {displayStatus && (
                        <div className="mb-5 flex items-start gap-2.5 rounded-2xl border border-emerald-800/60 bg-emerald-950/70 p-3.5 text-xs font-medium text-emerald-300">
                            <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400 mt-0.5" />
                            <div className="flex-1 leading-relaxed">{displayStatus}</div>
                        </div>
                    )}

                    {/* Error Alert Banner */}
                    {displayError && (
                        <div className="mb-5 flex items-start gap-2.5 rounded-2xl border border-rose-800/60 bg-rose-950/70 p-3.5 text-xs font-medium text-rose-300">
                            <AlertCircle className="h-4 w-4 shrink-0 text-rose-400 mt-0.5" />
                            <div className="flex-1 leading-relaxed">{displayError}</div>
                        </div>
                    )}

                    {/* Google SSO Login Main Button */}
                    <div className="space-y-4">
                        <button
                            type="button"
                            onClick={handleGoogleLogin}
                            disabled={isGoogleRedirecting}
                            className="group relative flex w-full items-center justify-between gap-3.5 rounded-2xl border border-slate-700/80 bg-gradient-to-r from-slate-800/90 via-slate-800 to-slate-850 p-4 text-left shadow-xl transition-all duration-200 hover:border-blue-500/60 hover:from-slate-800 hover:to-blue-950/40 hover:shadow-blue-500/15 active:scale-[0.99] disabled:opacity-70 cursor-pointer"
                        >
                            <div className="flex items-center gap-3.5">
                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-900/90 border border-slate-700/80 shadow-sm transition-transform duration-200 group-hover:scale-105">
                                    {isGoogleRedirecting ? (
                                        <Spinner className="h-5 w-5 text-blue-400" />
                                    ) : (
                                        <GoogleIcon className="h-5 w-5" />
                                    )}
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-sm font-bold text-white group-hover:text-blue-100 transition-colors">
                                        Masuk dengan Akun Google
                                    </span>
                                    <span className="text-xs text-slate-400">
                                        Single Sign-On (SSO) BMKG
                                    </span>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="rounded-full bg-blue-500/15 px-2.5 py-0.5 text-[11px] font-semibold text-blue-400 border border-blue-500/25">
                                    SSO
                                </span>
                                <ArrowRight className="h-4 w-4 text-slate-500 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-blue-400" />
                            </div>
                        </button>

                        {/* Informational Security Notice Box */}
                        <div className="rounded-2xl border border-slate-800/90 bg-slate-950/50 p-4">
                            <div className="flex items-start gap-3">
                                <ShieldCheck className="h-4 w-4 shrink-0 text-emerald-400 mt-0.5" />
                                <div className="space-y-1">
                                    <p className="text-xs font-semibold text-slate-200">
                                        Akses Resmi Terpusat
                                    </p>
                                    <p className="text-[11px] leading-relaxed text-slate-400">
                                        Panel ini dilindungi oleh Google OAuth 2.0. Silakan masuk menggunakan akun Google Anda yang telah memiliki otorisasi administratif.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Back link */}
                    <div className="mt-6 border-t border-slate-800/80 pt-5 text-center">
                        <Link
                            href="/"
                            className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-400 transition-colors hover:text-cyan-400"
                        >
                            &larr; Kembali ke Website Publik
                        </Link>
                    </div>
                </div>

                {/* Footer security badge */}
                <div className="mt-4 text-center">
                    <p className="text-[11px] text-slate-500 flex items-center justify-center gap-1.5">
                        <Sparkles className="h-3 w-3 text-blue-400/70" />
                        Dilindungi Rate Limiting, Zero-Trust Architecture, & SSL 256-Bit
                    </p>
                </div>
            </div>
        </div>
    );
}
