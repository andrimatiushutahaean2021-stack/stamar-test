import { Head } from '@inertiajs/react';
import PublicLayout from '@/layouts/public-layout';
import { useEffect, useMemo, useState } from 'react';
import {
    ChevronLeft,
    ChevronRight,
    Clock,
    ImageOff,
    MapPin,
    Maximize2,
    Palmtree,
    X,
} from 'lucide-react';

interface DocumentItem {
    id: number;
    title: string;
    category: string;
    forecast_date?: string;
    description?: string;
    file_path: string;
    file_type?: string;
    created_at: string;
}

interface Props {
    documents?: DocumentItem[];
}

/**
 * Daftar destinasi mengikuti halaman lama (stamar-ambon.bmkg.go.id).
 * Gambar dicocokkan dari judul/nama file: berisi nama destinasi (mis. "liang.png")
 * atau memakai penomoran lama "slideN" (slide1 = cover, slide2 = Liang, dst).
 */
const DESTINATIONS = [
    { key: 'liang', name: 'Pantai Liang', slide: 2 },
    { key: 'ora', name: 'Pantai Ora', slide: 3 },
    { key: 'morela', name: 'Pantai Morela', slide: 4 },
    { key: 'hukurila', name: 'Pantai Hukurila', slide: 5 },
    { key: 'natsepa', name: 'Pantai Natsepa', slide: 6 },
    { key: 'jikumerasa', name: 'Pantai Jikumerasa', slide: 7 },
] as const;

const COVER_KEYWORDS = ['cover', 'sampul'];
const IMAGE_TYPES = ['png', 'jpg', 'jpeg', 'webp'];
const BATCH_WINDOW_MS = 10 * 60 * 1000;

const isImage = (doc: DocumentItem) => {
    const ext = (doc.file_type || doc.file_path.split('.').pop() || '').toLowerCase();
    return IMAGE_TYPES.includes(ext);
};

const searchText = (doc: DocumentItem) =>
    `${doc.title} ${doc.file_path.split('/').pop() ?? ''}`.toLowerCase();

const slideNumber = (doc: DocumentItem) => {
    const m = searchText(doc).match(/slide[\s_-]*0*(\d+)(?!\d)/);
    return m ? Number(m[1]) : null;
};

const matchesWord = (text: string, word: string) =>
    new RegExp(`(^|[^a-z])${word}([^a-z]|$)`).test(text);

const prettyTitle = (doc: DocumentItem) =>
    doc.title.replace(/\.(png|jpe?g|webp)$/i, '').replace(/[_-]+/g, ' ');

const formatUpdated = (iso: string) =>
    new Date(iso).toLocaleString('id-ID', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    }) + ' WIT';

type Slide = { doc: DocumentItem; label: string };

export default function WisataBahari({ documents = [] }: Props) {
    const { cover, destinationDocs, extras, latest } = useMemo(() => {
        // documents sudah urut terbaru dulu dari server
        const images = documents.filter(isImage);
        const used = new Set<number>();

        const pick = (predicate: (d: DocumentItem) => boolean) => {
            const found = images.find((d) => !used.has(d.id) && predicate(d));
            if (found) used.add(found.id);
            return found;
        };

        const destinationDocs = Object.fromEntries(
            DESTINATIONS.map((dest) => [
                dest.key,
                pick(
                    (d) =>
                        matchesWord(searchText(d), dest.key) ||
                        slideNumber(d) === dest.slide,
                ),
            ]),
        ) as Record<string, DocumentItem | undefined>;

        const cover = pick(
            (d) =>
                COVER_KEYWORDS.some((k) => searchText(d).includes(k)) ||
                slideNumber(d) === 1,
        );

        // Gambar lain dari unggahan terakhir yang tidak cocok dengan slot mana pun
        const latest = images[0];
        const extras = latest
            ? images.filter(
                  (d) =>
                      !used.has(d.id) &&
                      new Date(latest.created_at).getTime() -
                          new Date(d.created_at).getTime() <=
                          BATCH_WINDOW_MS,
              )
            : [];

        return { cover, destinationDocs, extras, latest };
    }, [documents]);

    // Urutan gambar untuk lightbox
    const slides: Slide[] = useMemo(
        () => [
            ...(cover ? [{ doc: cover, label: 'Prakiraan Wisata Bahari' }] : []),
            ...DESTINATIONS.flatMap((dest) => {
                const doc = destinationDocs[dest.key];
                return doc ? [{ doc, label: dest.name }] : [];
            }),
            ...extras.map((doc) => ({ doc, label: prettyTitle(doc) })),
        ],
        [cover, destinationDocs, extras],
    );

    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
    const [activeDest, setActiveDest] = useState<string | null>(null);

    const openDoc = (doc: DocumentItem) => {
        const idx = slides.findIndex((s) => s.doc.id === doc.id);
        if (idx >= 0) setLightboxIndex(idx);
    };

    const step = (delta: number) =>
        setLightboxIndex((i) =>
            i === null ? i : (i + delta + slides.length) % slides.length,
        );

    useEffect(() => {
        if (lightboxIndex === null) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setLightboxIndex(null);
            if (e.key === 'ArrowRight') step(1);
            if (e.key === 'ArrowLeft') step(-1);
        };
        document.body.style.overflow = 'hidden';
        window.addEventListener('keydown', onKey);
        return () => {
            document.body.style.overflow = '';
            window.removeEventListener('keydown', onKey);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [lightboxIndex, slides.length]);

    const active = lightboxIndex !== null ? slides[lightboxIndex] : null;
    const hasContent = slides.length > 0;

    return (
        <PublicLayout>
            <Head title="Prakiraan Cuaca Wisata Bahari - BMKG Stamar Ambon">
                <meta
                    name="description"
                    content="Prakiraan cuaca resmi destinasi wisata bahari Maluku: Pantai Liang, Ora, Morela, Hukurila, Natsepa, dan Jikumerasa dari Stasiun Meteorologi Maritim Ambon."
                />
            </Head>

            <div className="min-h-screen bg-slate-50 pb-24 dark:bg-[#0B1120]">
                {/* Hero */}
                <div className="relative overflow-hidden bg-slate-900 pt-12 pb-16 lg:pt-20 lg:pb-24">
                    <div className="pointer-events-none absolute top-0 left-1/4 h-96 w-96 rounded-full bg-emerald-500 opacity-40 mix-blend-screen blur-[128px]" />
                    <div className="pointer-events-none absolute right-1/4 bottom-0 h-96 w-96 rounded-full bg-blue-400 opacity-30 mix-blend-screen blur-[128px]" />

                    <div className="relative z-10 container mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
                        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-medium tracking-wide text-white uppercase ">
                            <Palmtree className="h-4 w-4 text-emerald-300" />
                            <span>{DESTINATIONS.length} Destinasi Wisata Bahari Maluku</span>
                        </div>
                        <h1 className="mb-4 text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-4xl">
                            Prakiraan Cuaca Wisata Bahari
                        </h1>
                        <p className="mx-auto max-w-2xl text-sm leading-relaxed text-slate-300 sm:text-base">
                            Periksa kondisi cuaca, angin, dan gelombang di destinasi
                            wisata bahari sebelum berangkat demi keselamatan
                            perjalanan Anda.
                        </p>
                        {latest && (
                            <p className="mt-6 inline-flex items-center gap-1.5 text-xs text-emerald-200">
                                <Clock className="h-3.5 w-3.5" />
                                Diperbarui {formatUpdated(latest.created_at)}
                            </p>
                        )}
                    </div>
                </div>

                <div className="relative z-20 container mx-auto -mt-8 max-w-7xl px-4 sm:px-6 lg:px-8">
                    {!hasContent ? (
                        <div className="mx-auto flex max-w-2xl flex-col items-center rounded-lg border border-slate-200 bg-white px-6 py-12 text-center shadow-sm dark:border-slate-700 dark:bg-slate-800">
                            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-400">
                                <ImageOff className="h-8 w-8" />
                            </div>
                            <h2 className="mb-2 text-lg font-bold text-slate-900 dark:text-white">
                                Belum ada prakiraan yang dirilis
                            </h2>
                            <p className="max-w-md text-sm text-slate-500 dark:text-slate-400">
                                Prakiraan wisata bahari akan tampil di sini setelah
                                dirilis oleh Stasiun Meteorologi Maritim Ambon.
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[240px_1fr] lg:gap-8">
                            {/* Navigasi destinasi: chip horizontal di HP, sidebar di desktop */}
                            <aside className="sticky top-20 z-30 -mx-4 border-b border-slate-200 bg-white/95 px-4 py-3 shadow-sm sm:-mx-6 sm:px-6 lg:top-28 lg:mx-0 lg:h-fit lg:rounded-lg lg:border lg:p-5 dark:border-slate-700 dark:bg-slate-800/95">
                                <h2 className="mb-3 hidden text-xs font-semibold tracking-wider text-slate-500 uppercase lg:block dark:text-slate-400">
                                    Pilih Destinasi
                                </h2>
                                <nav
                                    aria-label="Destinasi wisata bahari"
                                    className="flex snap-x gap-2 overflow-x-auto [scrollbar-width:none] lg:flex-col lg:gap-1 lg:overflow-visible [&::-webkit-scrollbar]:hidden"
                                >
                                    {DESTINATIONS.map((dest) => (
                                        <a
                                            key={dest.key}
                                            id={`nav-bahari-${dest.key}`}
                                            href={`#${dest.key}`}
                                            onClick={() => setActiveDest(dest.key)}
                                            className={`flex shrink-0 snap-start items-center gap-2 rounded-lg px-3.5 py-2 text-sm font-medium whitespace-nowrap transition-colors ${
                                                activeDest === dest.key
                                                    ? 'bg-emerald-600 text-white lg:bg-emerald-50 lg:text-emerald-700 dark:lg:bg-emerald-950/60 dark:lg:text-emerald-300'
                                                    : 'bg-slate-100 text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 lg:bg-transparent dark:bg-slate-700/60 dark:text-slate-200 dark:hover:bg-slate-700 lg:dark:bg-transparent'
                                            }`}
                                        >
                                            <MapPin className="hidden h-3.5 w-3.5 lg:block" />
                                            {dest.name.replace('Pantai ', '')}
                                        </a>
                                    ))}
                                </nav>
                            </aside>

                            <main className="flex flex-col gap-8">
                                {/* Cover */}
                                {cover && (
                                    <button
                                        id="bahari-cover"
                                        type="button"
                                        onClick={() => openDoc(cover)}
                                        className="group relative mx-auto w-full max-w-md overflow-hidden rounded-lg bg-white shadow-sm ring-1 ring-slate-200 transition-transform active:scale-[0.98] dark:bg-slate-800 dark:ring-slate-700"
                                    >
                                        <img
                                            src={`/storage/${cover.file_path}`}
                                            alt="Cover Prakiraan Wisata Bahari"
                                            className="aspect-[3/4] w-full bg-slate-200 object-cover dark:bg-slate-900"
                                        />
                                        <ZoomHint />
                                    </button>
                                )}

                                {/* Kartu destinasi (potret 3:4) */}
                                <div className="grid grid-cols-2 gap-3 sm:gap-6 md:grid-cols-3">
                                    {DESTINATIONS.map((dest) => {
                                        const doc = destinationDocs[dest.key];
                                        return (
                                            <div
                                                key={dest.key}
                                                id={dest.key}
                                                className="scroll-mt-40 lg:scroll-mt-28"
                                            >
                                                {doc ? (
                                                    <button
                                                        type="button"
                                                        onClick={() => openDoc(doc)}
                                                        className="group relative block w-full overflow-hidden rounded-lg bg-white text-left shadow-sm ring-1 ring-slate-200 transition-all hover:shadow-sm active:scale-[0.98] dark:bg-slate-800 dark:ring-slate-700"
                                                    >
                                                        <img
                                                            src={`/storage/${doc.file_path}`}
                                                            alt={`Prakiraan cuaca ${dest.name}`}
                                                            loading="lazy"
                                                            className="aspect-[3/4] w-full bg-slate-200 object-cover dark:bg-slate-900"
                                                        />
                                                        <ZoomHint />
                                                        <div className="truncate border-t border-slate-100 px-3 py-2.5 text-center text-sm font-semibold text-slate-800 dark:border-slate-700 dark:text-slate-100">
                                                            {dest.name}
                                                        </div>
                                                    </button>
                                                ) : (
                                                    <div className="overflow-hidden rounded-lg border border-dashed border-slate-300 bg-white/60 dark:border-slate-700 dark:bg-slate-800/40">
                                                        <div className="flex aspect-[3/4] flex-col items-center justify-center gap-2 p-4 text-center text-slate-400">
                                                            <ImageOff className="h-8 w-8" />
                                                            <span className="text-xs">
                                                                Prakiraan belum tersedia
                                                            </span>
                                                        </div>
                                                        <div className="truncate border-t border-dashed border-slate-300 px-3 py-2.5 text-center text-sm font-semibold text-slate-500 dark:border-slate-700">
                                                            {dest.name}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}

                                    {/* Gambar tambahan yang namanya tidak cocok dengan destinasi */}
                                    {extras.map((doc) => (
                                        <button
                                            key={doc.id}
                                            type="button"
                                            onClick={() => openDoc(doc)}
                                            className="group relative block w-full overflow-hidden rounded-lg bg-white text-left shadow-sm ring-1 ring-slate-200 transition-all hover:shadow-sm dark:bg-slate-800 dark:ring-slate-700"
                                        >
                                            <img
                                                src={`/storage/${doc.file_path}`}
                                                alt={prettyTitle(doc)}
                                                loading="lazy"
                                                className="aspect-[3/4] w-full bg-slate-200 object-cover dark:bg-slate-900"
                                            />
                                            <ZoomHint />
                                            <div className="truncate border-t border-slate-100 px-3 py-2.5 text-center text-sm font-semibold text-slate-800 capitalize dark:border-slate-700 dark:text-slate-100">
                                                {prettyTitle(doc)}
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </main>
                        </div>
                    )}
                </div>
            </div>

            {/* Lightbox */}
            {active && (
                <div
                    role="dialog"
                    aria-modal="true"
                    aria-label={active.label}
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/95 p-4 "
                    onClick={() => setLightboxIndex(null)}
                >
                    <button
                        type="button"
                        aria-label="Tutup"
                        className="absolute top-4 right-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
                        onClick={() => setLightboxIndex(null)}
                    >
                        <X className="h-6 w-6" />
                    </button>
                    {slides.length > 1 && (
                        <>
                            <button
                                type="button"
                                aria-label="Sebelumnya"
                                className="absolute left-2 z-10 rounded-full bg-white/10 p-2 text-white hover:bg-white/20 sm:left-4"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    step(-1);
                                }}
                            >
                                <ChevronLeft className="h-6 w-6" />
                            </button>
                            <button
                                type="button"
                                aria-label="Berikutnya"
                                className="absolute right-2 z-10 rounded-full bg-white/10 p-2 text-white hover:bg-white/20 sm:right-4"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    step(1);
                                }}
                            >
                                <ChevronRight className="h-6 w-6" />
                            </button>
                        </>
                    )}
                    <figure
                        className="flex max-h-full flex-col items-center"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <img
                            key={active.doc.id}
                            src={`/storage/${active.doc.file_path}`}
                            alt={active.label}
                            className="max-h-[80vh] max-w-[90vw] animate-in rounded-lg object-contain shadow-sm duration-200 zoom-in-95 fade-in"
                        />
                        <figcaption className="mt-3 text-center text-sm font-medium text-slate-200">
                            {active.label}
                            <span className="ml-2 text-slate-400">
                                {lightboxIndex! + 1} / {slides.length}
                            </span>
                        </figcaption>
                    </figure>
                </div>
            )}
        </PublicLayout>
    );
}

function ZoomHint() {
    return (
        <span className="pointer-events-none absolute top-3 right-3 flex items-center gap-1 rounded-full bg-black/60 px-2.5 py-1 text-[11px] font-medium text-white opacity-0 transition-opacity group-hover:opacity-100">
            <Maximize2 className="h-3 w-3" /> Perbesar
        </span>
    );
}
