import { Head, Link, useForm } from '@inertiajs/react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import {
    Eye,
    EyeOff,
    Lock,
    Mail,
    ShieldCheck,
    CloudRain,
    KeyRound,
} from 'lucide-react';
import { useState, FormEventHandler } from 'react';

type Props = {
    status?: string;
    canResetPassword?: boolean;
};

export default function Login({ status }: Props) {
    const [showPassword, setShowPassword] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        email: 'stamar.ambon@bmkg.go.id',
        password: '',
        remember: false,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post('/panel-stamar/login', {
            onFinish: () => reset('password'),
        });
    };

    return (
        <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#070b14] p-4 text-slate-100 selection:bg-blue-600 selection:text-white sm:p-6">
            <Head title="Login Administrator - BMKG Stamar Ambon" />

            {/* Ambient Background Glowing Lights */}
            <div className="pointer-events-none absolute -top-32 -left-32 h-96 w-96 rounded-full bg-blue-600/20 blur-[140px]"></div>
            <div className="pointer-events-none absolute -right-32 -bottom-32 h-96 w-96 rounded-full bg-cyan-500/20 blur-[140px]"></div>
            <div className="pointer-events-none absolute top-1/2 left-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-600/10 blur-[160px]"></div>

            <div className="relative z-10 my-auto w-full max-w-md">
                {/* Header with BMKG Branding */}
                <div className="mb-8 text-center">
                    <Link
                        href="/"
                        className="group mb-4 inline-flex items-center gap-3"
                    >
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-blue-400/30 bg-blue-600 text-white shadow-xl shadow-blue-600/30 transition-transform duration-300 group-hover:scale-105">
                            <CloudRain className="h-7 w-7" />
                        </div>
                        <div className="text-left">
                            <span className="block text-xl leading-tight font-extrabold tracking-tight text-white">
                                STAMAR AMBON
                            </span>
                            <span className="text-xs font-semibold tracking-wider text-cyan-400">
                                BMKG MALUKU
                            </span>
                        </div>
                    </Link>
                    <h1 className="text-2xl font-bold tracking-tight text-white">
                        Panel Administrasi
                    </h1>
                    <p className="mt-1.5 text-xs text-slate-400 sm:text-sm">
                        Masuk untuk mengelola data cuaca, berkas MFY, dan
                        dokumen maritim.
                    </p>
                </div>

                {/* Login Form Card */}
                <div className="rounded-3xl border border-slate-800/80 bg-slate-900/80 p-6 shadow-2xl shadow-black/60 backdrop-blur-2xl sm:p-8">
                    {status && (
                        <div className="mb-5 rounded-2xl border border-emerald-800 bg-emerald-950/60 p-3.5 text-center text-xs font-semibold text-emerald-300">
                            {status}
                        </div>
                    )}

                    <form onSubmit={submit} className="space-y-5">
                        {/* Email Input */}
                        <div className="space-y-2">
                            <Label
                                htmlFor="email"
                                className="text-xs font-semibold tracking-wider text-slate-300 uppercase"
                            >
                                Email Administrator
                            </Label>
                            <div className="relative">
                                <Mail className="absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-slate-500" />
                                <Input
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    onChange={(e) =>
                                        setData('email', e.target.value)
                                    }
                                    required
                                    autoFocus
                                    autoComplete="email"
                                    placeholder="stamar.ambon@bmkg.go.id"
                                    className="h-12 rounded-2xl border-slate-700/80 bg-slate-800/70 pl-10 text-sm text-white placeholder:text-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                                />
                            </div>
                            <InputError message={errors.email} />
                        </div>

                        {/* Password Input */}
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <Label
                                    htmlFor="password"
                                    className="text-xs font-semibold tracking-wider text-slate-300 uppercase"
                                >
                                    Password
                                </Label>
                            </div>
                            <div className="relative">
                                <Lock className="absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-slate-500" />
                                <Input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    value={data.password}
                                    onChange={(e) =>
                                        setData('password', e.target.value)
                                    }
                                    required
                                    autoComplete="current-password"
                                    placeholder="••••••••••••"
                                    className="h-12 rounded-2xl border-slate-700/80 bg-slate-800/70 pr-10 pl-10 text-sm text-white placeholder:text-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                                />
                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                    className="absolute top-1/2 right-3.5 -translate-y-1/2 p-1 text-slate-400 hover:text-white"
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-4 w-4" />
                                    ) : (
                                        <Eye className="h-4 w-4" />
                                    )}
                                </button>
                            </div>
                            <InputError message={errors.password} />
                        </div>

                        {/* Security Badge */}
                        <div className="flex items-center justify-end pt-1">
                            <span className="flex items-center gap-1.5 text-xs font-medium text-slate-400">
                                <ShieldCheck className="h-4 w-4 text-emerald-400" />{' '}
                                Sesi Terenkripsi & Aman
                            </span>
                        </div>

                        {/* Submit Button */}
                        <Button
                            type="submit"
                            disabled={processing}
                            className="mt-2 h-12 w-full gap-2 rounded-2xl bg-blue-600 text-sm font-bold text-white shadow-xl shadow-blue-600/30 transition-all hover:bg-blue-500"
                        >
                            {processing ? (
                                <>
                                    <Spinner className="h-4 w-4" />
                                    <span>Memverifikasi akun...</span>
                                </>
                            ) : (
                                <>
                                    <KeyRound className="h-4 w-4" />
                                    <span>Masuk ke Panel Admin &rarr;</span>
                                </>
                            )}
                        </Button>
                    </form>

                    {/* Back link */}
                    <div className="mt-6 border-t border-slate-800/80 pt-5 text-center">
                        <Link
                            href="/"
                            className="text-xs font-medium text-slate-400 transition-colors hover:text-cyan-400"
                        >
                            &larr; Kembali ke Website Publik
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
