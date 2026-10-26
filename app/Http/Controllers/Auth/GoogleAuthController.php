<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Laravel\Socialite\Facades\Socialite;

class GoogleAuthController extends Controller
{
    /**
     * Mengarahkan pengguna ke halaman otentikasi Google OAuth.
     */
    public function redirect(): RedirectResponse
    {
        $clientId = config('services.google.client_id');
        $clientSecret = config('services.google.client_secret');

        if (empty($clientId) || empty($clientSecret)) {
            return redirect('/panel-stamar/login')->with(
                'error',
                'Kredensial Google OAuth (GOOGLE_CLIENT_ID & GOOGLE_CLIENT_SECRET) belum dikonfigurasi di file .env.'
            );
        }

        try {
            $driver = Socialite::driver('google');

            $restrictDomain = (bool) config('services.google.restrict_domain', false);
            $hostedDomain = config('services.google.hosted_domain');

            // Hanya sertakan parameter hd jika pembatasan domain diaktifkan
            if ($restrictDomain && ! empty($hostedDomain)) {
                $driver->with(['hd' => $hostedDomain]);
            }

            return $driver->redirect();
        } catch (\Throwable $e) {
            Log::error('Google OAuth Redirect Error: '.$e->getMessage());

            return redirect('/panel-stamar/login')->with(
                'error',
                'Gagal memulai sesi login Google SSO: '.$e->getMessage()
            );
        }
    }

    /**
     * Menerima callback setelah pengguna mengizinkan akses dari Google.
     */
    public function callback(Request $request): RedirectResponse
    {
        if ($request->has('error')) {
            return redirect('/panel-stamar/login')->with(
                'error',
                'Login dibatalkan oleh pengguna atau Google menolak permintaan otentikasi.'
            );
        }

        try {
            $googleUser = Socialite::driver('google')->user();
        } catch (\Throwable $e) {
            Log::error('Google OAuth Callback Error: '.$e->getMessage());

            return redirect('/panel-stamar/login')->with(
                'error',
                'Terjadi kesalahan saat memverifikasi akun Google: '.$e->getMessage()
            );
        }

        $email = strtolower(trim((string) $googleUser->getEmail()));
        $restrictDomain = config('services.google.restrict_domain', false);
        $allowedDomain = strtolower((string) config('services.google.hosted_domain', 'bmkg.go.id'));

        // Validasi pembatasan domain jika diaktifkan
        if ($restrictDomain && ! empty($allowedDomain)) {
            $domainSuffix = '@'.$allowedDomain;
            if (! str_ends_with($email, $domainSuffix)) {
                return redirect('/panel-stamar/login')->with(
                    'error',
                    "Akses ditolak. Hanya akun email resmi BMKG ({$domainSuffix}) yang diizinkan mengakses panel ini."
                );
            }
        }

        // Cari user berdasarkan google_id atau email yang terdaftar
        $user = User::where('google_id', $googleUser->getId())
            ->orWhere('email', $email)
            ->first();

        if ($user) {
            // Update data profil terbaru dari Google
            $user->google_id = $googleUser->getId();
            if ($googleUser->getAvatar()) {
                $user->avatar = $googleUser->getAvatar();
            }
            if (! $user->email_verified_at) {
                $user->email_verified_at = now();
            }
            $user->save();
        } else {
            // Jika user belum ada, buat akun baru
            $user = User::create([
                'name' => $googleUser->getName() ?: 'Administrator BMKG',
                'email' => $email,
                'google_id' => $googleUser->getId(),
                'avatar' => $googleUser->getAvatar(),
                'email_verified_at' => now(),
                'password' => Hash::make(Str::random(32)),
            ]);
        }

        // Sesi login diatur bertahan selama masa aktif session (3 hari / 4320 menit di .env)
        // Jika tidak diakses lebih dari 3 hari, sesi otomatis kedaluwarsa dan wajib login ulang
        Auth::login($user, remember: false);
        $request->session()->regenerate();

        return redirect()->intended('/admin/documents')->with(
            'success',
            'Berhasil login via Google SSO sebagai '.$user->name
        );
    }
}
