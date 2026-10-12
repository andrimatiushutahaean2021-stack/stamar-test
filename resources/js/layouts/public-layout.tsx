import { Link } from '@inertiajs/react';
import { CloudRain, Menu, X, ChevronDown } from 'lucide-react';
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
                { name: 'Cuaca Provinsi Maluku', href: '/provinsi' },
                { name: 'Peta & Visual MFY', href: '/mfy' },
                { name: 'Area Pelabuhan', href: '/pelabuhan' },
                {
                    name: 'Area Penyeberangan',
                    href: 'https://maritim.bmkg.go.id/cuaca/rute',
                },
                { name: 'Prakiraan Wisata Bahari', href: '/wisata-bahari' },
            ],
        },
        { name: 'Buletin', href: '/buletin' },
        { name: 'Informasi', href: '#' },
        { name: 'Kontak', href: '#' },
    ];

    return (
        <div className="flex min-h-screen flex-col bg-background font-sans">
            {/* Running Text / Warning Banner */}
            <div className="relative z-[60] flex items-center bg-red-600 px-4 py-1.5 text-xs font-semibold text-white">
                <span className="mr-4 font-bold tracking-wider whitespace-nowrap uppercase">
                    Peringatan Dini:
                </span>
                <div className="relative h-4 flex-grow overflow-hidden">
                    <div className="absolute w-full animate-[marquee_20s_linear_infinite] whitespace-nowrap hover:animate-[marquee_20s_linear_infinite_paused]">
                        WASPADA: Tinggi gelombang mencapai 2.5 - 4.0 meter
                        (Berbahaya) di Perairan Kepulauan Tanimbar, Laut Banda,
                        dan Laut Arafura bagian barat. Nelayan dan kapal
                        tongkang diharap waspada!
                    </div>
                </div>
            </div>
            {/* Navbar */}
            <header
                className={`sticky top-0 z-50 w-full transition-all duration-300 ${
                    isScrolled
                        ? 'border-b bg-background/80 shadow-sm backdrop-blur-md'
                        : 'bg-transparent'
                }`}
            >
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex h-20 items-center justify-between">
                        {/* Logo */}
                        <div className="flex flex-shrink-0 items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg">
                                <CloudRain className="h-6 w-6" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-lg leading-none font-bold tracking-tight">
                                    STAMAR AMBON
                                </span>
                                <span className="text-xs font-medium text-muted-foreground">
                                    BMKG Maluku
                                </span>
                            </div>
                        </div>

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
                                        <div className="ring-opacity-5 invisible absolute top-full left-0 mt-2 w-48 origin-top-left transform rounded-md bg-popover opacity-0 shadow-lg ring-1 ring-black transition-all duration-200 group-hover:visible group-hover:opacity-100">
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
                    <div className="animate-in border-b bg-background shadow-lg slide-in-from-top-2 md:hidden">
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
            <footer className="border-t border-slate-800 bg-slate-900 py-12 text-slate-300">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
                        <div className="col-span-1 md:col-span-2">
                            <div className="mb-6 flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg">
                                    <CloudRain className="h-6 w-6" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-lg leading-none font-bold tracking-tight text-white">
                                        STAMAR AMBON
                                    </span>
                                    <span className="text-xs font-medium text-slate-400">
                                        Stasiun Meteorologi Kelas II Maritim Yos Soedarso Ambon
                                    </span>
                                </div>
                            </div>
                            <p className="mb-6 max-w-sm text-sm leading-relaxed text-slate-400">
                                Penyedia informasi meteorologi maritim resmi
                                untuk wilayah perairan Maluku, menjamin
                                keselamatan pelayaran dan aktivitas kelautan.
                            </p>
                            <p className="text-xs text-slate-500">
                                &copy; {new Date().getFullYear()} BMKG Stasiun
                                Meteorologi Kelas II Maritim Yos Soedarso Ambon. Hak Cipta Dilindungi.
                            </p>
                        </div>

                        <div>
                            <h4 className="mb-4 text-sm font-semibold tracking-wider text-white uppercase">
                                Layanan Informasi
                            </h4>
                            <ul className="space-y-2.5 text-sm">
                                <li>
                                    <Link
                                        href="/provinsi"
                                        className="transition-colors hover:text-primary"
                                    >
                                        Prakiraan Cuaca Provinsi
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/mfy"
                                        className="transition-colors hover:text-primary"
                                    >
                                        Peta & Visual MFY
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/pelabuhan"
                                        className="transition-colors hover:text-primary"
                                    >
                                        Prakiraan Area Pelabuhan
                                    </Link>
                                </li>
                                <li>
                                    <a
                                        href="https://maritim.bmkg.go.id/cuaca/rute"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="transition-colors hover:text-primary"
                                    >
                                        Prakiraan Rute Penyeberangan ↗
                                    </a>
                                </li>
                                <li>
                                    <Link
                                        href="/wisata-bahari"
                                        className="transition-colors hover:text-primary"
                                    >
                                        Prakiraan Wisata Bahari
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/buletin"
                                        className="transition-colors hover:text-primary"
                                    >
                                        Buletin Cuaca Maritim
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="mb-4 text-sm font-semibold tracking-wider text-white uppercase">
                                Kontak & Lokasi
                            </h4>
                            <div className="space-y-2 text-sm text-slate-400">
                                <p>Jl. Bandara Pattimura, Ambon, Maluku</p>
                                <p>Email: stamar.ambon@bmkg.go.id</p>
                                <p>Telepon: (0911) 311025</p>
                                <div className="pt-2">
                                    <span className="inline-block rounded-full border border-green-500/20 bg-green-500/10 px-3 py-1 text-xs font-medium text-green-400">
                                        Pelayanan Operasional 24/7
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
