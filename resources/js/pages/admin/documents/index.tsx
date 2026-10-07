import { Head, useForm, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { useState } from 'react';
import { FileText, Trash2, Upload, File as FileIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Manajemen File',
        href: '/admin/documents',
    },
];

interface Document {
    id: number;
    title: string;
    description: string | null;
    file_path: string;
    file_type: string | null;
    file_size: string | null;
    created_at: string;
}

interface Props {
    documents: Document[];
}

export default function DocumentIndex({ documents }: Props) {
    const { data, setData, post, processing, errors, reset } = useForm({
        title: '',
        description: '',
        file: null as File | null,
    });

    const [isUploading, setIsUploading] = useState(false);

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.documents.store'), {
            onSuccess: () => {
                reset();
                setIsUploading(false);
            },
            preserveScroll: true,
        });
    };

    const deleteDocument = (id: number) => {
        if (confirm('Apakah Anda yakin ingin menghapus file ini?')) {
            router.delete(route('admin.documents.destroy', id), {
                preserveScroll: true,
            });
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Manajemen File" />

            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                <div className="flex flex-col md:flex-row gap-6">
                    {/* Upload Form */}
                    <div className="w-full md:w-1/3">
                        <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-6">
                            <h3 className="font-semibold leading-none tracking-tight mb-4 flex items-center gap-2">
                                <Upload className="h-5 w-5" /> Unggah File Baru
                            </h3>
                            <form onSubmit={submit} className="space-y-4">
                                <div>
                                    <Label htmlFor="title">Judul File</Label>
                                    <Input
                                        id="title"
                                        type="text"
                                        className="mt-1 block w-full"
                                        value={data.title}
                                        onChange={(e) => setData('title', e.target.value)}
                                        required
                                    />
                                    {errors.title && <p className="text-sm text-red-600 mt-1">{errors.title}</p>}
                                </div>

                                <div>
                                    <Label htmlFor="description">Deskripsi (Opsional)</Label>
                                    <Input
                                        id="description"
                                        type="text"
                                        className="mt-1 block w-full"
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                    />
                                    {errors.description && <p className="text-sm text-red-600 mt-1">{errors.description}</p>}
                                </div>

                                <div>
                                    <Label htmlFor="file">File PDF (Maks 10MB)</Label>
                                    <Input
                                        id="file"
                                        type="file"
                                        accept=".pdf"
                                        className="mt-1 block w-full cursor-pointer"
                                        onChange={(e) => setData('file', e.target.files ? e.target.files[0] : null)}
                                        required
                                    />
                                    {errors.file && <p className="text-sm text-red-600 mt-1">{errors.file}</p>}
                                </div>

                                <Button type="submit" disabled={processing} className="w-full">
                                    {processing ? 'Mengunggah...' : 'Unggah File'}
                                </Button>
                            </form>
                        </div>
                    </div>

                    {/* File List */}
                    <div className="w-full md:w-2/3">
                        <div className="rounded-xl border bg-card text-card-foreground shadow-sm overflow-hidden">
                            <div className="p-6 border-b">
                                <h3 className="font-semibold leading-none tracking-tight flex items-center gap-2">
                                    <FileText className="h-5 w-5" /> Daftar File
                                </h3>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm text-left">
                                    <thead className="text-xs text-muted-foreground uppercase bg-muted/50">
                                        <tr>
                                            <th className="px-6 py-3">Nama File</th>
                                            <th className="px-6 py-3">Tipe / Ukuran</th>
                                            <th className="px-6 py-3">Tanggal</th>
                                            <th className="px-6 py-3 text-right">Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {documents.length === 0 ? (
                                            <tr>
                                                <td colSpan={4} className="px-6 py-8 text-center text-muted-foreground">
                                                    Belum ada file yang diunggah.
                                                </td>
                                            </tr>
                                        ) : (
                                            documents.map((doc) => (
                                                <tr key={doc.id} className="border-b last:border-0 hover:bg-muted/50 transition-colors">
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center gap-3">
                                                            <div className="h-10 w-10 rounded bg-primary/10 flex items-center justify-center text-primary">
                                                                <FileIcon className="h-5 w-5" />
                                                            </div>
                                                            <div>
                                                                <p className="font-medium">{doc.title}</p>
                                                                {doc.description && <p className="text-xs text-muted-foreground">{doc.description}</p>}
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <span className="uppercase text-xs font-semibold px-2 py-1 bg-muted rounded-md mr-2">
                                                            {doc.file_type || 'N/A'}
                                                        </span>
                                                        <span className="text-muted-foreground">{doc.file_size}</span>
                                                    </td>
                                                    <td className="px-6 py-4 text-muted-foreground">
                                                        {new Date(doc.created_at).toLocaleDateString('id-ID')}
                                                    </td>
                                                    <td className="px-6 py-4 text-right">
                                                        <div className="flex justify-end gap-2">
                                                            <a
                                                                href={`/storage/${doc.file_path}`}
                                                                target="_blank"
                                                                rel="noreferrer"
                                                                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-3"
                                                            >
                                                                Buka
                                                            </a>
                                                            <Button
                                                                variant="destructive"
                                                                size="sm"
                                                                onClick={() => deleteDocument(doc.id)}
                                                            >
                                                                <Trash2 className="h-4 w-4" />
                                                            </Button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
