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
            'files' => 'required|array|max:112',
            'files.*' => 'file|mimes:pdf,png,jpg,jpeg,mp4|max:114688', // 112MB per file
        ]);

        $category = $request->input('category', 'mfy');
        $files = $request->file('files');
        
        $maxTotalBytes = 112 * 1024 * 1024; // Total 112 MB
        $totalBytes = 0;
        foreach ($files as $file) {
            $totalBytes += $file->getSize();
        }

        if ($totalBytes > $maxTotalBytes) {
            $totalMbFormatted = round($totalBytes / (1024 * 1024), 2);
            $msg = "Total ukuran seluruh berkas ({$totalMbFormatted} MB) melebihi batas maksimal 112MB.";
            if ($request->wantsJson()) {
                return response()->json(['message' => $msg], 422);
            }
            return redirect()->back()->withErrors(['files' => $msg]);
        }

        $allowedMimes = [
            'application/pdf' => 'pdf',
            'image/png' => 'png',
            'image/jpeg' => 'jpg',
            'video/mp4' => 'mp4',
        ];

        $uploaded = [];
        $uploadedDocIds = [];
        $dateSuffix = date('dmY_His');

        foreach ($request->file('files') as $file) {
            // Verifikasi binary magic bytes (finfo)
            $finfo = new \finfo(FILEINFO_MIME_TYPE);
            $mimeType = $finfo->file($file->getRealPath());

            if (!array_key_exists($mimeType, $allowedMimes)) {
                $msg = "Berkas '{$file->getClientOriginalName()}' ditolak: Format tidak didukung. Format yang diizinkan hanya PNG, PDF, MP4, dan JPG.";
                if ($request->wantsJson()) {
                    return response()->json(['message' => $msg], 422);
                }
                return redirect()->back()->withErrors(['files' => $msg]);
            }

            // Tentukan ekstensi fisik berkas secara ketat dari MIME type resmi
            $safeExtension = $allowedMimes[$mimeType];
            if ($mimeType === 'image/jpeg') {
                $clientExt = strtolower($file->getClientOriginalExtension());
                if ($clientExt === 'jpeg' || $clientExt === 'jpg') {
                    $safeExtension = $clientExt;
                }
            }

            $originalName = $file->getClientOriginalName();
            $baseName = pathinfo($originalName, PATHINFO_FILENAME);
            $safeBaseName = preg_replace('/[^a-zA-Z0-9_-]/', '_', $baseName);
            $uniqueId = substr(uniqid(), -4);
            $fileName = "{$safeBaseName}_{$dateSuffix}_{$uniqueId}.{$safeExtension}";

            $regionNumber = null;
            $regionCode = null;
            $forecastDate = date('Y-m-d');
            $docTitle = $baseName;
            $periodType = 'weekly';
            $docCategory = $category;

            $lower = strtolower($baseName);

            // Cek cover resmi
            if (
                (str_contains($lower, 'cover') || str_contains($lower, 'sampul') || str_contains($lower, 'header') || str_contains($lower, 'slide'))
                && (str_contains($lower, 'prov') || str_contains($lower, 'pelabuhan') || str_contains($lower, 'port') || str_contains($lower, 'maritim'))
            ) {
                if (str_contains($lower, 'prov') || str_contains($lower, 'maritim')) {
                    $docCategory = 'provinsi';
                    $regionCode = 'COVER_PROV';
                    $regionNumber = 0;
                    $docTitle = 'Sampul Prakiraan Cuaca Maritim Wilayah Provinsi Maluku';
                } else {
                    $docCategory = 'pelabuhan';
                    $regionCode = 'COVER_PEL';
                    $regionNumber = 0;
                    $docTitle = 'Sampul Prakiraan Cuaca Pelabuhan Provinsi Maluku';
                }
            } elseif ($docCategory === 'peringatan-dini' || str_contains($lower, 'peringatan') || str_contains($lower, 'warning') || str_contains($lower, 'gelombang') || in_array($safeExtension, ['mp4']) || preg_match('/(?:^|[^a-zA-Z0-9])(?:no[._\-\s]?pd|nopd|nihil)/i', $baseName)) {
                $docCategory = 'peringatan-dini';
                $isExtVideo = in_array($safeExtension, ['mp4']);
                $isNoPd = (bool) preg_match('/(?:^|[^a-zA-Z0-9])(?:no[._\-\s]?pd|nopd|nihil)/i', $baseName);
                $nameWithoutDates = preg_replace('/(?:\d{4}[-_.]?\d{2}[-_.]?\d{2}|\d{2}[-_.]?\d{2}[-_.]?\d{4}|\d{6,8})/', '', $lower);
                $isThreeExplicit = preg_match('/(?:^|[^0-9])(?:3[\s_.-]*(?:hari|days?|h\b)?|tiga)(?:$|[^0-9])/i', $nameWithoutDates) || str_contains($lower, '72');

                if ($isNoPd) {
                    $periodType = ($isExtVideo || $isThreeExplicit) ? '3-hari' : '1-hari';
                    $periodLabel = ($periodType === '3-hari') ? '3 Hari Kedepan' : '1 Hari Kedepan';
                    $docTitle = "Peringatan Dini Gelombang Maluku {$periodLabel} (Nihil / Kondisi Aman) - " . date('d M Y');
                } else {
                    $periodType = ($isExtVideo || $isThreeExplicit) ? '3-hari' : '1-hari';
                    $periodLabel = ($periodType === '3-hari') ? '3 Hari Kedepan' : '1 Hari Kedepan';
                    $docTitle = "Peringatan Dini Gelombang Maluku {$periodLabel} - " . date('d M Y');
                }
            } elseif (preg_match('/(?:^|[^a-zA-Z0-9])(?:P[._\-\s]?AH)[._\-\s]?0*([1-9][0-9]?)(?:[._\-\s](\d{6,8}))?/i', $baseName, $m)) {
                $regionNumber = (int) $m[1];
                if ($regionNumber >= 1 && $regionNumber <= 18) {
                    $regionCode = sprintf('P_AH%03d', $regionNumber);
                    $docCategory = ($safeExtension === 'png') ? 'infografis' : 'provinsi';
                    $provList = \App\Http\Controllers\Admin\DocumentController::PROVINSI_LIST;
                    if (isset($provList[$regionNumber])) {
                        $prefix = ($safeExtension === 'png') ? 'Infografis ' : '';
                        $docTitle = $prefix . $provList[$regionNumber] . " - " . date('d M Y') . " ({$regionCode})";
                    }
                }
            } elseif (preg_match('/(?:^|[^a-zA-Z0-9_])(?<!P[._\-\s])AH[._\-\s]?0*([1-9][0-9]?)(?:[._\-\s](\d{6,8}))?/i', $baseName, $m)) {
                $regionNumber = (int) $m[1];
                if ($regionNumber >= 1 && $regionNumber <= 37) {
                    $regionCode = sprintf('AH%03d', $regionNumber);
                    $docCategory = ($safeExtension === 'png') ? 'infografis' : 'pelabuhan';
                    $pelabuhanList = \App\Http\Controllers\Admin\DocumentController::PELABUHAN_LIST;
                    if (isset($pelabuhanList[$regionNumber])) {
                        $prefix = ($safeExtension === 'png') ? 'Infografis ' : '';
                        $docTitle = $prefix . $pelabuhanList[$regionNumber] . " - " . date('d M Y') . " ({$regionCode})";
                    }
                }
            }

            // Simpan ke storage/app/public/{docCategory}/
            $path = $file->storeAs($docCategory, $fileName, 'public');

            // Daftarkan di Document model
            $created = Document::create([
                'title' => $docTitle,
                'category' => $docCategory,
                'region_number' => $regionNumber,
                'region_code' => $regionCode,
                'forecast_date' => $forecastDate,
                'period_type' => $periodType,
                'description' => "File {$docCategory} diunggah pada ".date('d-m-Y H:i'),
                'file_path' => $path,
                'file_type' => $safeExtension,
                'file_size' => $this->formatSizeUnits($file->getSize()),
            ]);

            $uploaded[] = $fileName;
            $uploadedDocIds[] = $created->id;
        }

        $purgedCount = 0;
        if ($request->boolean('purge_old') && !empty($uploadedDocIds)) {
            $activeDate = date('Y-m-d');
            $oldDocs = Document::where('category', $category)
                ->whereNotIn('id', $uploadedDocIds)
                ->where(function ($q) use ($activeDate) {
                    $q->whereDate('forecast_date', '<', $activeDate)
                      ->orWhere(function ($sub) use ($activeDate) {
                          $sub->whereNull('forecast_date')
                              ->whereDate('created_at', '<', $activeDate);
                      });
                })
                ->get();

            foreach ($oldDocs as $oldDoc) {
                if ($oldDoc->file_path && Storage::disk('public')->exists($oldDoc->file_path)) {
                    Storage::disk('public')->delete($oldDoc->file_path);
                }
                $oldDoc->delete();
                $purgedCount++;
            }
        }

        $purgeMsg = $purgedCount > 0 ? " serta membersihkan {$purgedCount} berkas hari sebelumnya." : '.';

        if ($request->wantsJson()) {
            return response()->json([
                'status' => 'success',
                'message' => count($uploaded).' file berhasil diunggah ke folder '.ucfirst($category).$purgeMsg,
                'files' => $uploaded,
            ]);
        }

        return redirect()->back()->with('success', count($uploaded).' file berhasil diunggah'.$purgeMsg);
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
