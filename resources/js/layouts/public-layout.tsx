import { Link } from '@inertiajs/react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useState, useEffect } from 'react';

interface PublicLayoutProps {
    children: React.ReactNode;
}

export default function PublicLayout({ children }: PublicLayoutProps) {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'HOME', href: '/' },
        {
            name: 'Profil Stasiun',
            href: '#',
            dropdown: [
                { name: 'Sejarah', href: '/sejarah' },
                { name: 'Struktur Organisasi', href: '/struktur' },
                { name: 'Visi & Misi', href: '/visimisi' },
                { name: 'Tugas dan Fungsi', href: '/tupoksi' },
            ],
        },
        {
            name: 'Prakiraan',
            href: '#',
            dropdown: [
                { name: 'Cuaca Maluku (10 Kota/Kab)', href: '/cuaca-maluku' },
                { name: 'Cuaca Provinsi Maluku', href: '/provinsi' },
                { name: 'Area Pelabuhan', href: '/pelabuhan' },
                {
                    name: 'Area Penyeberangan',
                    href: 'https://maritim.bmkg.go.id/cuaca/rute',
                },
                { name: 'Prakiraan Wisata Bahari', href: '/wisata-bahari' },
                { name: 'Infografis Perairan Provinsi', href: '/infografis-provinsi' },
                { name: 'Infografis Pelabuhan', href: '/infografis-pelabuhan' },
            ],
        },
        {
            name: 'Infografis',
            href: '/infografis-provinsi',
            dropdown: [
                { name: 'Infografis Perairan Provinsi', href: '/infografis-provinsi' },
                { name: 'Infografis Pelabuhan', href: '/infografis-pelabuhan' },
            ],
        },
        { name: 'Buletin', href: '/buletin' },
        {
            name: 'Informasi',
            href: '/informasi',
            dropdown: [
                {
                    name: 'Pelayanan Informasi & Jasa',
                    href: '/informasi',
                },
                {
                    name: 'Survei IKM (Kepuasan Masyarakat)',
                    href: '/survey-ikm',
                },
                {
                    name: 'Citra Satelit Cuaca',
                    href: 'https://satelit.bmkg.go.id/',
                },
                {
                    name: 'Citra Radar Cuaca',
                    href: 'https://radar.bmkg.go.id/',
                },
                {
                    name: 'BMKG Ocean Forecast (OFS)',
                    href: 'https://maritim.bmkg.go.id/ofs/',
                },
            ],
        },
        { name: 'Kontak', href: '#footer' },
    ];

    return (
        <div className="flex min-h-screen flex-col bg-background font-sans min-w-[320px]">
            {/* Running Text / Welcome Banner */}
            <div className="relative z-[60] flex items-center bg-blue-900 border-b border-blue-800/40 px-4 py-1.5 text-xs font-medium text-slate-200 shadow-xs">
                <div className="flex items-center gap-1.5 mr-4 font-bold tracking-wider whitespace-nowrap uppercase text-blue-300">
                    <span className="flex h-2 w-2 rounded-full bg-blue-400 animate-pulse"></span>
                    <span>Selamat Datang</span>
                </div>
                <div className="relative h-4 flex-grow overflow-hidden">
                    <div className="absolute w-full animate-[marquee_25s_linear_infinite] whitespace-nowrap hover:animate-[marquee_25s_linear_infinite_paused] text-slate-300">
                        Selamat Datang di Website Resmi Stasiun Meteorologi Maritim Kelas II Yos Soedarso Ambon - Badan Meteorologi, Klimatologi, dan Geofisika (BMKG). Menyajikan informasi cuaca maritim, prakiraan perairan kepulauan Maluku, dan pelayanan data meteorologi terpercaya.
                    </div>
                </div>
            </div>
            {/* Navbar */}
            <header
                className={`sticky top-0 z-50 w-full transition-all duration-300 ${
                    isScrolled
                        ? 'border-b border-zinc-200 bg-background dark:border-zinc-800'
                        : 'border-b border-transparent bg-background'
                }`}
            >
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex h-20 items-center justify-between gap-2">
                        {/* Logo & Identitas Resmi BMKG */}
                        <Link href="/" className="flex flex-shrink items-center gap-2.5 sm:gap-3.5 group min-w-0 pr-2">
                            <img
                                src="/images/logo-bmkg.png"
                                alt="Logo BMKG"
                                className="h-10 sm:h-12 w-auto object-contain transition-transform shrink-0"
                            />
                            <div className="flex flex-col text-left min-w-0">
                                <span className="text-[11px] sm:text-sm lg:text-[15px] font-bold tracking-tight text-foreground leading-tight truncate sm:whitespace-normal">
                                    Badan Meteorologi Klimatologi Dan Geofisika
                                </span>
                                <span className="text-[9px] sm:text-xs font-medium text-slate-500 dark:text-slate-400 leading-tight mt-0.5 truncate sm:whitespace-normal">
                                    Stasiun Meteorologi Maritim Kelas II Yos Soedarso Ambon
                                </span>
                            </div>
                        </Link>

                        {/* Desktop Nav */}
                        <nav className="hidden items-center space-x-1 md:flex">
                            {navLinks.map((link, i) => (
                                <div key={i} className="group relative">
                                    <Link
                                        href={link.href}
                                        className={`flex items-center gap-1 rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-muted/50 hover:text-primary ${
                                            link.name === 'HOME'
                                                ? 'text-primary'
                                                : 'text-foreground'
                                        }`}
                                    >
                                        {link.name}
                                        {link.dropdown && (
                                            <ChevronDown className="h-4 w-4 opacity-50 transition-transform duration-200 group-hover:rotate-180" />
                                        )}
                                    </Link>

                                    {/* Simple CSS Dropdown */}
                                    {link.dropdown && (
                                        <div className="ring-opacity-5 invisible absolute top-full left-0 mt-2 w-48 origin-top-left transform rounded-md bg-popover opacity-0 shadow-sm ring-1 ring-black transition-all duration-200 group-hover:visible group-hover:opacity-100">
                                            <div className="py-1">
                                                {link.dropdown.map((item, j) =>
                                                    item.href.startsWith(
                                                        'http',
                                                    ) ? (
                                                        <a
                                                            key={j}
                                                            href={item.href}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="block px-4 py-2 text-sm text-popover-foreground hover:bg-muted hover:text-primary"
                                                        >
                                                            {item.name} ↗
                                                        </a>
                                                    ) : (
                                                        <Link
                                                            key={j}
                                                            href={item.href}
                                                            className="block px-4 py-2 text-sm text-popover-foreground hover:bg-muted hover:text-primary"
                                                        >
                                                            {item.name}
                                                        </Link>
                                                    ),
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}

                        </nav>

                        {/* Mobile Menu Button */}
                        <div className="flex items-center md:hidden">
                            <button
                                onClick={() =>
                                    setMobileMenuOpen(!mobileMenuOpen)
                                }
                                className="p-2 text-foreground hover:text-primary"
                            >
                                {mobileMenuOpen ? (
                                    <X className="h-6 w-6" />
                                ) : (
                                    <Menu className="h-6 w-6" />
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="animate-in border-b bg-background shadow-sm slide-in-from-top-2 md:hidden">
                        <div className="space-y-1 px-2 pt-2 pb-4 sm:px-3">
                            {navLinks.map((link, i) => (
                                <div key={i}>
                                    <Link
                                        href={link.href}
                                        className="block rounded-md px-3 py-2 text-base font-medium text-foreground hover:bg-muted hover:text-primary"
                                    >
                                        {link.name}
                                    </Link>
                                    {link.dropdown && (
                                        <div className="space-y-1 pl-6">
                                            {link.dropdown.map((item, j) =>
                                                item.href.startsWith('http') ? (
                                                    <a
                                                        key={j}
                                                        href={item.href}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="block rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-primary"
                                                    >
                                                        {item.name} ↗
                                                    </a>
                                                ) : (
                                                    <Link
                                                        key={j}
                                                        href={item.href}
                                                        className="block rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-primary"
                                                    >
                                                        {item.name}
                                                    </Link>
                                                ),
                                            )}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </header>

            {/* Main Content */}
            <main className="flex-grow">{children}</main>

            {/* Footer */}
            <footer id="footer" className="border-t border-slate-800 bg-slate-900 pt-16 pb-12 text-slate-300">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
                        {/* Kolom 1: Profil & Identitas Stasiun */}
                        <div className="space-y-4">
                            <Link href="/" className="flex items-center gap-3.5 group">
                                <img
                                    src="/images/logo-bmkg.png"
                                    alt="Logo BMKG"
                                    className="h-12 sm:h-13 w-auto object-contain transition-transform shrink-0"
                                />
                                <div className="flex flex-col text-left">
                                    <span className="text-sm sm:text-base font-bold tracking-tight text-white leading-tight">
                                        Badan Meteorologi Klimatologi Dan Geofisika
                                    </span>
                                    <span className="text-xs font-medium text-slate-400 leading-tight mt-0.5">
                                        Stasiun Meteorologi Maritim Kelas II Yos Soedarso Ambon
                                    </span>
                                </div>
                            </Link>
                            <p className="text-xs leading-relaxed text-slate-400">
                                Pusat penyedia informasi meteorologi maritim, keselamatan pelayaran perairan kepulauan Maluku, dan mitigasi bahaya gelombang tinggi laut.
                            </p>
                            <div className="pt-1">
                                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400">
                                    <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
                                    Pelayanan Operasional 24/7
                                </span>
                            </div>
                            <p className="pt-2 text-[11px] text-slate-500">
                                &copy; {new Date().getFullYear()} BMKG Stasiun Meteorologi Kelas II Maritim Yos Soedarso Ambon. Hak Cipta Dilindungi.
                            </p>
                        </div>

                        {/* Kolom 2: Layanan Informasi & Cuaca */}
                        <div>
                            <h4 className="mb-4 text-xs font-bold tracking-wider text-white uppercase border-b border-slate-800 pb-2">
                                Layanan & Prakiraan
                            </h4>
                            <ul className="space-y-2 text-xs">
                                <li>
                                    <Link href="/provinsi" className="transition-colors hover:text-white">
                                        Prakiraan Cuaca Provinsi
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/pelabuhan" className="transition-colors hover:text-white">
                                        Prakiraan Area Pelabuhan
                                    </Link>
                                </li>
                                <li>
                                    <a
                                        href="https://maritim.bmkg.go.id/cuaca/rute"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="transition-colors hover:text-white"
                                    >
                                        Prakiraan Rute Penyeberangan ↗
                                    </a>
                                </li>
                                <li>
                                    <Link href="/wisata-bahari" className="transition-colors hover:text-white">
                                        Prakiraan Wisata Bahari
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/infografis" className="transition-colors text-blue-400 hover:text-blue-300 font-semibold">
                                        Infografis Cuaca
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/cuaca-maluku" className="transition-colors text-blue-400 hover:text-blue-300 font-semibold">
                                        Cuaca 10 Kota / Kab. Maluku
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/buletin" className="transition-colors hover:text-white">
                                        Buletin Cuaca Maritim
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/informasi" className="transition-colors hover:text-white">
                                        Pelayanan Informasi & Jasa
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/survey-ikm" className="transition-colors hover:text-white">
                                        Survei IKM (e-SKM) ↗
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Kolom 3: Ekosistem Resmi BMKG */}
                        <div>
                            <h4 className="mb-4 text-xs font-bold tracking-wider text-white uppercase border-b border-slate-800 pb-2">
                                Ekosistem Resmi BMKG
                            </h4>
                            <ul className="space-y-2.5 text-xs text-slate-400">
                                <li>
                                    <a
                                        href="https://www.bmkg.go.id"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="transition-colors hover:text-blue-400 flex items-center justify-between"
                                    >
                                        <span>Portal BMKG Pusat</span>
                                        <span className="text-[10px] text-slate-500">bmkg.go.id ↗</span>
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="https://maritim.bmkg.go.id"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="transition-colors hover:text-blue-400 flex items-center justify-between"
                                    >
                                        <span>Dit. Meteorologi Maritim</span>
                                        <span className="text-[10px] text-slate-500">maritim ↗</span>
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="https://inatews.bmkg.go.id"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="transition-colors hover:text-blue-400 flex items-center justify-between"
                                    >
                                        <span>InaTEWS (Peringatan Dini Tsunami)</span>
                                        <span className="text-[10px] text-slate-500">inatews ↗</span>
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="https://cews.bmkg.go.id"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="transition-colors hover:text-blue-400 flex items-center justify-between"
                                    >
                                        <span>CEWS (Pusat Informasi Iklim)</span>
                                        <span className="text-[10px] text-slate-500">cews ↗</span>
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="https://balai4.bmkg.go.id"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="transition-colors hover:text-blue-400 flex items-center justify-between"
                                    >
                                        <span>BBMKG Wilayah IV Makassar</span>
                                        <span className="text-[10px] text-slate-500">balai4 ↗</span>
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="https://stmkg.ac.id"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="transition-colors hover:text-blue-400 flex items-center justify-between"
                                    >
                                        <span>STMKG Kemayoran</span>
                                        <span className="text-[10px] text-slate-500">stmkg.ac.id ↗</span>
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="https://satelit.bmkg.go.id"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="transition-colors hover:text-blue-400 flex items-center justify-between"
                                    >
                                        <span>Citra Satelit Himawari</span>
                                        <span className="text-[10px] text-slate-500">satelit ↗</span>
                                    </a>
                                </li>
                            </ul>
                        </div>

                        {/* Kolom 4: Aplikasi Mobile Info BMKG & Kontak */}
                        <div className="space-y-5">
                            <div>
                                <h4 className="mb-2 text-xs font-bold tracking-wider text-white uppercase border-b border-slate-800 pb-2">
                                    Aplikasi Mobile Info BMKG
                                </h4>
                                <p className="text-[11px] text-slate-400 mb-3">
                                    Akses info cuaca maritim, gempa bumi & tsunami real-time melalui smartphone Anda.
                                </p>
                                <div className="flex flex-col gap-2.5 pt-1">
                                    <a
                                        href="https://play.google.com/store/apps/details?id=com.Info_BMKG"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-block transition-transform hover:scale-[1.02] active:scale-[0.98] w-fit"
                                    >
                                        <img
                                            src="/images/google-play-badge.svg"
                                            alt="Temukan di Google Play"
                                            className="h-10 w-auto object-contain drop-shadow-xs"
                                        />
                                    </a>

                                    <a
                                        href="https://apps.apple.com/id/app/info-bmkg/id1114372539"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-block transition-transform hover:scale-[1.02] active:scale-[0.98] w-fit"
                                    >
                                        <img
                                            src="/images/app-store-badge.svg"
                                            alt="Unduh di App Store"
                                            className="h-10 w-auto object-contain drop-shadow-xs"
                                        />
                                    </a>
                                </div>
                            </div>

                            {/* Kontak Singkat */}
                            <div className="space-y-1.5 text-xs text-slate-400 pt-2 border-t border-slate-800">
                                <p className="flex items-center gap-2">
                                    <img src="/images/whatsapp.svg" alt="WA" className="h-4 w-4 shrink-0" />
                                    <a href="https://wa.me/6281296265822" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400">
                                        0812-9626-5822 (Operasional)
                                    </a>
                                </p>
                                <p className="flex items-center gap-2">
                                    <img src="/images/mail.svg" alt="Email" className="h-4 w-4 shrink-0" />
                                    <a href="mailto:stamar.ambon@bmkg.go.id" className="hover:text-white">
                                        stamar.ambon@bmkg.go.id
                                    </a>
                                </p>
                                
                                {/* Social Media Icons */}
                                <div className="flex items-center gap-2.5 pt-2">
                                    <a
                                        href="https://www.instagram.com/bmkg.maritim.ambon?xtok=MXZ2MjNhZXdqYzZsNg=="
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label="Instagram STAMAR Ambon"
                                        className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 transition hover:bg-blue-500/20"
                                    >
                                        <img src="/images/instagram.svg" alt="Instagram" className="h-4 w-4" />
                                    </a>
                                    <a
                                        href="https://www.tiktok.com/@bmkg.maritim.ambon?_r=1&_t=ZS-9Ag3qD0VOFc"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label="TikTok STAMAR Ambon"
                                        className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 transition hover:bg-slate-700"
                                    >
                                        <img src="/images/tiktok.svg" alt="TikTok" className="h-4 w-4" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
