import { Link } from '@inertiajs/react';
import { CloudRain, Menu, X, ChevronDown } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

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
            dropdown: ['Sejarah', 'Struktur Organisasi', 'Visi & Misi', 'Tugas dan Fungsi']
        },
        { 
            name: 'Prakiraan', 
            href: '#',
            dropdown: ['Cuaca Provinsi Maluku', 'Area Pelayanan', 'Area Penyebrangan', 'Area Pelabuhan', 'Prakiraan Wisata Bahari']
        },
        { name: 'Buletin', href: '#' },
        { name: 'Informasi', href: '#' },
        { name: 'Kontak', href: '#' },
    ];

    return (
        <div className="min-h-screen flex flex-col font-sans bg-background">
            
            {/* Running Text / Warning Banner */}
            <div className="bg-red-600 text-white text-xs font-semibold py-1.5 px-4 flex items-center z-[60] relative">
                <span className="whitespace-nowrap font-bold uppercase tracking-wider mr-4">Peringatan Dini:</span>
                <div className="overflow-hidden flex-grow relative h-4">
                    <div className="absolute whitespace-nowrap animate-[marquee_20s_linear_infinite] hover:animate-[marquee_20s_linear_infinite_paused] w-full">
                        WASPADA: Tinggi gelombang mencapai 2.5 - 4.0 meter (Berbahaya) di Perairan Kepulauan Tanimbar, Laut Banda, dan Laut Arafura bagian barat. Nelayan dan kapal tongkang diharap waspada!
                    </div>
                </div>
            </div>
            {/* Navbar */}
            <header 
                className={`fixed top-0 w-full z-50 transition-all duration-300 ${
                    isScrolled ? 'bg-background/80 backdrop-blur-md border-b shadow-sm' : 'bg-transparent'
                }`}
            >
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-20">
                        {/* Logo */}
                        <div className="flex-shrink-0 flex items-center gap-3">
                            <div className="h-10 w-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground shadow-lg">
                                <CloudRain className="h-6 w-6" />
                            </div>
                            <div className="flex flex-col">
                                <span className="font-bold text-lg leading-none tracking-tight">STAMAR AMBON</span>
                                <span className="text-xs text-muted-foreground font-medium">BMKG Maluku</span>
                            </div>
                        </div>

                        {/* Desktop Nav */}
                        <nav className="hidden md:flex space-x-1 items-center">
                            {navLinks.map((link, i) => (
                                <div key={i} className="relative group">
                                    <Link 
                                        href={link.href}
                                        className={`px-4 py-2 rounded-md text-sm font-medium transition-colors hover:text-primary hover:bg-muted/50 flex items-center gap-1 ${
                                            link.name === 'HOME' ? 'text-primary' : 'text-foreground'
                                        }`}
                                    >
                                        {link.name}
                                        {link.dropdown && <ChevronDown className="h-4 w-4 opacity-50 group-hover:rotate-180 transition-transform duration-200" />}
                                    </Link>
                                    
                                    {/* Simple CSS Dropdown */}
                                    {link.dropdown && (
                                        <div className="absolute top-full left-0 mt-2 w-48 rounded-md shadow-lg bg-popover ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-left">
                                            <div className="py-1">
                                                {link.dropdown.map((item, j) => (
                                                    <Link 
                                                        key={j} 
                                                        href="#" 
                                                        className="block px-4 py-2 text-sm text-popover-foreground hover:bg-muted hover:text-primary"
                                                    >
                                                        {item}
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                            <div className="ml-4">
                                <Button size="sm" className="rounded-full px-6">Login</Button>
                            </div>
                        </nav>

                        {/* Mobile Menu Button */}
                        <div className="md:hidden flex items-center">
                            <button 
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                className="text-foreground hover:text-primary p-2"
                            >
                                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden bg-background border-b shadow-lg animate-in slide-in-from-top-2">
                        <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3">
                            {navLinks.map((link, i) => (
                                <div key={i}>
                                    <Link 
                                        href={link.href}
                                        className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:text-primary hover:bg-muted"
                                    >
                                        {link.name}
                                    </Link>
                                    {link.dropdown && (
                                        <div className="pl-6 space-y-1">
                                            {link.dropdown.map((item, j) => (
                                                <Link 
                                                    key={j} 
                                                    href="#" 
                                                    className="block px-3 py-2 rounded-md text-sm text-muted-foreground hover:text-primary hover:bg-muted"
                                                >
                                                    {item}
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </header>

            {/* Main Content */}
            <main className="flex-grow pt-20">
                {children}
            </main>

            {/* Footer */}
            <footer className="bg-slate-900 text-slate-300 py-12 border-t border-slate-800">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div className="col-span-1 md:col-span-2">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="h-10 w-10 bg-primary/20 rounded-full flex items-center justify-center text-primary">
                                    <CloudRain className="h-6 w-6" />
                                </div>
                                <span className="font-bold text-xl text-white tracking-tight">STAMAR AMBON</span>
                            </div>
                            <p className="text-sm leading-relaxed max-w-md">
                                Stasiun Meteorologi Maritim Ambon merupakan UPT BMKG yang memberikan pelayanan informasi cuaca dan iklim maritim untuk wilayah perairan Maluku dan sekitarnya guna mendukung keselamatan pelayaran.
                            </p>
                        </div>
                        
                        <div>
                            <h4 className="text-white font-semibold mb-4 uppercase text-sm tracking-wider">Tautan Cepat</h4>
                            <ul className="space-y-2 text-sm">
                                <li><Link href="#" className="hover:text-primary transition-colors">Profil Stasiun</Link></li>
                                <li><Link href="#" className="hover:text-primary transition-colors">Prakiraan Cuaca</Link></li>
                                <li><Link href="#" className="hover:text-primary transition-colors">Buletin Maritim</Link></li>
                                <li><Link href="#" className="hover:text-primary transition-colors">Citra Satelit</Link></li>
                            </ul>
                        </div>
                        
                        <div>
                            <h4 className="text-white font-semibold mb-4 uppercase text-sm tracking-wider">Kontak Kami</h4>
                            <ul className="space-y-2 text-sm">
                                <li className="flex gap-2"><span>📍</span> Jl. Pattimura No.1, Ambon, Maluku</li>
                                <li className="flex gap-2"><span>📞</span> (0911) 123456</li>
                                <li className="flex gap-2"><span>✉️</span> stamar.ambon@bmkg.go.id</li>
                            </ul>
                        </div>
                    </div>
                    <div className="mt-12 pt-8 border-t border-slate-800 text-sm text-center">
                        <p>&copy; {new Date().getFullYear()} Stasiun Meteorologi Maritim Ambon - BMKG. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
