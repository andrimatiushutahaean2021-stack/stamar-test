<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Document;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class DocumentController extends Controller
{
    public function index(Request $request)
    {
        $documents = Document::latest()->get();

        $categoryCounts = [
            'all' => Document::count(),
            'peringatan-dini' => Document::where('category', 'peringatan-dini')->count(),
            'provinsi' => Document::where('category', 'provinsi')->count(),
            'buletin' => Document::where('category', 'buletin')->count(),
            'mfy' => Document::where('category', 'mfy')->count(),
            'bahari' => Document::where('category', 'bahari')->count(),
        ];

        return Inertia::render('admin/documents/index', [
            'documents' => $documents,
            'categoryCounts' => $categoryCounts,
            'currentCategory' => $request->query('category', 'all'),
            'initialAction' => $request->query('action', ''),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'category' => 'required|string|in:peringatan-dini,mfy,bahari,buletin,provinsi',
            'file' => 'required|file|mimes:pdf,png,jpg,jpeg,json|max:51200', // 50MB Max
            'description' => 'nullable|string|max:1000',
        ]);

        $category = $request->input('category', 'mfy');
        $file = $request->file('file');

        $originalName = $file->getClientOriginalName();
        $extension = $file->getClientOriginalExtension();
        $baseName = pathinfo($originalName, PATHINFO_FILENAME);
        $safeBaseName = preg_replace('/[^a-zA-Z0-9]/', '_', $baseName);
        $dateSuffix = date('dmY_His');
        $fileName = "{$safeBaseName}_{$dateSuffix}.{$extension}";

        // Simpan ke storage/app/public/{category}/
        $filePath = $file->storeAs($category, $fileName, 'public');
        $fileSize = $this->formatSizeUnits($file->getSize());

        Document::create([
            'title' => $request->title,
            'category' => $category,
            'description' => $request->description,
            'file_path' => $filePath,
            'file_type' => strtolower($extension),
            'file_size' => $fileSize,
        ]);

        return redirect()->back()->with('success', 'File berhasil diunggah ke kategori '.$this->getCategoryLabel($category).'.');
    }

    public function destroy(Document $document)
    {
        if (Storage::disk('public')->exists($document->file_path)) {
            Storage::disk('public')->delete($document->file_path);
        }

        $document->delete();

        return redirect()->back()->with('success', 'File berhasil dihapus dari sistem.');
    }

    private function getCategoryLabel($category)
    {
        return match ($category) {
            'peringatan-dini' => 'Peringatan Dini',
            'provinsi' => 'Prakiraan Cuaca Provinsi',
            'buletin' => 'Buletin Maritim',
            'mfy' => 'MFY',
            'bahari' => 'Wisata Bahari',
            default => 'Umum',
        };
    }

    private function formatSizeUnits($bytes)
    {
        if ($bytes >= 1073741824) {
            return number_format($bytes / 1073741824, 2).' GB';
        } elseif ($bytes >= 1048576) {
            return number_format($bytes / 1048576, 2).' MB';
        } elseif ($bytes >= 1024) {
            return number_format($bytes / 1024, 2).' KB';
        }

        return $bytes.' bytes';
    }
}
