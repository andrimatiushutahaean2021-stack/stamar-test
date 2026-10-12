<?php

namespace App\Http\Controllers;

use App\Models\Document;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class MfyUploadController extends Controller
{
    public function create()
    {
        return Inertia::render('mfy-upload');
    }

    public function store(Request $request)
    {
        $request->validate([
            'category' => 'nullable|string|in:peringatan-dini,mfy,bahari,buletin',
            'files' => 'required|array',
            'files.*' => 'file|mimes:pdf,png,jpg,jpeg,json|max:51200', // 50MB per file
        ]);

        $category = $request->input('category', 'mfy');
        $uploaded = [];
        $dateSuffix = date('dmY_His');

        foreach ($request->file('files') as $file) {
            $originalName = $file->getClientOriginalName();
            $extension = strtolower($file->getClientOriginalExtension());
            $baseName = pathinfo($originalName, PATHINFO_FILENAME);
            $safeBaseName = preg_replace('/[^a-zA-Z0-9]/', '_', $baseName);
            $fileName = "{$safeBaseName}_{$dateSuffix}.{$extension}";

            // Simpan ke storage/app/public/{category}/
            $path = $file->storeAs($category, $fileName, 'public');

            // Daftarkan di Document model
            Document::create([
                'title' => $baseName,
                'category' => $category,
                'description' => "File {$category} diunggah pada ".date('d-m-Y H:i'),
                'file_path' => $path,
                'file_type' => $extension,
                'file_size' => $this->formatSizeUnits($file->getSize()),
            ]);

            $uploaded[] = $fileName;
        }

        if ($request->wantsJson()) {
            return response()->json([
                'status' => 'success',
                'message' => count($uploaded).' file berhasil diunggah ke folder '.ucfirst($category).'.',
                'files' => $uploaded,
            ]);
        }

        return redirect()->back()->with('success', count($uploaded).' file berhasil diunggah.');
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
