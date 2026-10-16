<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Document;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class DocumentController extends Controller
{
    public const PROVINSI_LIST = [
        1 => 'Perairan Utara P. Buru',
        2 => 'Perairan Selatan P. Buru',
        3 => 'Perairan Seram Bagian Barat',
        4 => 'Perairan P. Ambon - P. Lease',
        5 => 'Perairan Utara Maluku Tengah',
        6 => 'Perairan Selatan Maluku Tengah',
        7 => 'Perairan Seram Bagian Timur (Utara)',
        8 => 'Perairan Seram Bagian Timur (Selatan)',
        9 => 'Perairan Seram Bagian Timur (P. Gorong)',
        10 => 'Perairan Kep. Banda Neira',
        11 => 'Perairan Kep. Kai',
        12 => 'Perairan Utara Kep. Aru',
        13 => 'Perairan Selatan Kep. Aru',
        14 => 'Perairan Barat Kep. Tanimbar',
        15 => 'Perairan Timur Kep. Tanimbar',
        16 => 'Perairan Kep. Babar',
        17 => 'Perairan Kep. Sermata - Kep. Leti',
        18 => 'Perairan Wetar',
    ];

    public const PELABUHAN_LIST = [
        1 => 'Pelabuhan Yos Sudarso',
        2 => 'Pelabuhan Penyeberangan Galala',
        3 => 'Pelabuhan Penyeberangan Poka',
        4 => 'Pelabuhan Penyeberangan Hunimua (Liang)',
        5 => 'Pelabuhan Penyeberangan Wairiang (Kailolo)',
        6 => 'Pelabuhan Penyeberangan Umeputih (Kulur)',
        7 => 'Pelabuhan Penyeberangan Wahai',
        8 => 'Pelabuhan Penyeberangan Nalahia (Nusa Laut)',
        9 => 'Pelabuhan Penyeberangan Jazirah Salahutu (Waai)',
        10 => 'Pelabuhan Penyeberangan Amahai Ina Marina (Masohi)',
        11 => 'Pelabuhan Penyeberangan Namlea',
        12 => 'Pelabuhan Penyeberangan Teluk Bara',
        13 => 'Pelabuhan Penyeberangan Waipirit',
        14 => 'Pelabuhan Penyeberangan Waisala',
        15 => 'Pelabuhan Penyeberangan Wailey',
        16 => 'Pelabuhan Penyeberangan Air Nanang',
        17 => 'Pelabuhan Penyeberangan Geser',
        18 => 'Pelabuhan Penyeberangan Gorom',
        19 => 'Pelabuhan Penyeberangan Kesui - Pulau Kasiui',
        20 => 'Pelabuhan Penyeberangan Teor',
        21 => 'Pelabuhan Penyeberangan Ilwaki',
        22 => 'Pelabuhan Penyeberangan Lakor',
        23 => 'Pelabuhan Penyeberangan Wonreli (Kisar)',
        24 => 'Pelabuhan Penyeberangan Letwurung (Tepa)',
        25 => 'Pelabuhan Penyeberangan Sermata',
        26 => 'Pelabuhan Penyeberangan Tual',
        27 => 'Pelabuhan Penyeberangan Toyando',
        28 => 'Pelabuhan Penyeberangan Elat',
        29 => 'Pelabuhan Penyeberangan Dobo',
        30 => 'Pelabuhan Penyeberangan Benjina',
        31 => 'Pelabuhan Penyeberangan Dermaga Lamerang',
        32 => 'Pelabuhan Penyeberangan Tabarfane',
        33 => 'Pelabuhan Penyeberangan Saumlaki',
        34 => 'Pelabuhan Penyeberangan Larat',
        35 => 'Pelabuhan Penyeberangan Wunlah',
        36 => 'Pelabuhan Banda Neira',
        37 => 'Pelabuhan Tulehu',
    ];

    public function index(Request $request)
    {
        $documents = Document::latest()->get();

        $categoryCounts = [
            'all' => Document::count(),
            'peringatan-dini' => Document::where('category', 'peringatan-dini')->count(),
            'provinsi' => Document::where('category', 'provinsi')->count(),
            'buletin' => Document::where('category', 'buletin')->count(),
            'pelabuhan' => Document::whereIn('category', ['pelabuhan', 'mfy'])->count(),
            'bahari' => Document::where('category', 'bahari')->count(),
        ];

        return Inertia::render('admin/documents/index', [
            'documents' => $documents,
            'categoryCounts' => $categoryCounts,
            'currentCategory' => $request->query('category', 'all'),
            'initialAction' => $request->query('action', ''),
            'provinsiList' => self::PROVINSI_LIST,
            'pelabuhanList' => self::PELABUHAN_LIST,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'nullable|string|max:255',
            'category' => 'required|string|in:peringatan-dini,pelabuhan,mfy,bahari,buletin,provinsi',
            'files' => 'nullable|array|max:112',
            'files.*' => 'file|mimes:pdf,png,jpg,jpeg|mimetypes:application/pdf,image/png,image/jpeg|max:114688', // 112MB per file
            'file' => 'nullable',
            'description' => 'nullable|string|max:1000',
            'region_number' => 'nullable|integer',
            'forecast_date' => 'nullable|date',
            'period_type' => 'nullable|string|in:daily,weekly',
        ]);

        $files = [];
        if ($request->hasFile('files')) {
            $files = $request->file('files');
        } elseif ($request->hasFile('file')) {
            $single = $request->file('file');
            $files = is_array($single) ? $single : [$single];
        }

        if (empty($files)) {
            return redirect()->back()->withErrors(['file' => 'Wajib memilih minimal satu berkas file untuk diunggah.']);
        }

        if (count($files) > 112) {
            return redirect()->back()->withErrors(['file' => 'Maksimal 112 file yang dapat diunggah sekaligus.']);
        }

        $maxTotalBytes = 112 * 1024 * 1024; // Total 112 MB
        $totalBytes = 0;
        foreach ($files as $f) {
            $totalBytes += $f->getSize();
        }

        if ($totalBytes > $maxTotalBytes) {
            $totalMbFormatted = round($totalBytes / (1024 * 1024), 2);
            return redirect()->back()->withErrors(['file' => "Total ukuran seluruh berkas ({$totalMbFormatted} MB) melebihi batas maksimal 112MB."]);
        }

        $allowedMimes = [
            'application/pdf' => 'pdf',
            'image/png' => 'png',
            'image/jpeg' => 'jpg',
        ];

        $formCategory = $request->input('category', 'pelabuhan');
        $formRegionNumber = $request->input('region_number');
        $formForecastDate = $request->input('forecast_date');
        $formPeriodType = $request->input('period_type', 'daily');

        $uploadedCount = 0;
        $dateSuffix = date('dmY_His');

        foreach ($files as $index => $file) {
            // Verifikasi binary magic bytes (finfo)
            $finfo = new \finfo(FILEINFO_MIME_TYPE);
            $mimeType = $finfo->file($file->getRealPath());

            if (!array_key_exists($mimeType, $allowedMimes)) {
                return redirect()->back()->withErrors([
                    'file' => "Berkas '{$file->getClientOriginalName()}' ditolak: Tipe konten binary ({$mimeType}) tidak diizinkan demi keamanan server."
                ]);
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

            // Deteksi otomatis format AH (Provinsi) atau P_AH (Pelabuhan)
            $parsed = $this->parseForecastMetadata($baseName);

            $targetCategory = $formCategory;
            $regionNumber = $formRegionNumber ? (int) $formRegionNumber : null;
            $regionCode = null;
            $forecastDate = $formForecastDate ?: null;
            $periodType = $formPeriodType;

            if ($parsed) {
                $targetCategory = $parsed['category'];
                $regionNumber = $parsed['region_number'];
                $regionCode = $parsed['region_code'];
                if (!$forecastDate && $parsed['forecast_date']) {
                    $forecastDate = $parsed['forecast_date'];
                }
            } elseif ($regionNumber) {
                if ($targetCategory === 'pelabuhan' || $targetCategory === 'mfy') {
                    $regionCode = sprintf('AH%03d', $regionNumber);
                } elseif ($targetCategory === 'provinsi') {
                    $regionCode = sprintf('P_AH%03d', $regionNumber);
                }
            }

            // Default tanggal prakiraan ke hari ini jika cuaca perairan/pelabuhan dan belum diset
            if (!$forecastDate && in_array($targetCategory, ['provinsi', 'pelabuhan', 'mfy'])) {
                $forecastDate = date('Y-m-d');
            }

            // Tentukan nama/judul dokumen yang rapi dan seragam
            if (count($files) === 1 && $request->filled('title')) {
                $title = $request->input('title');
            } else {
                if (($targetCategory === 'pelabuhan' || $targetCategory === 'mfy') && $regionNumber && isset(self::PELABUHAN_LIST[$regionNumber])) {
                    $formattedDateStr = $forecastDate ? date('d M Y', strtotime($forecastDate)) : date('d M Y');
                    $title = self::PELABUHAN_LIST[$regionNumber] . " - {$formattedDateStr} ({$regionCode})";
                } elseif ($targetCategory === 'provinsi' && $regionNumber && isset(self::PROVINSI_LIST[$regionNumber])) {
                    $formattedDateStr = $forecastDate ? date('d M Y', strtotime($forecastDate)) : date('d M Y');
                    $title = self::PROVINSI_LIST[$regionNumber] . " - {$formattedDateStr} ({$regionCode})";
                } else {
                    $title = $originalName;
                }
            }

            $safeBaseName = preg_replace('/[^a-zA-Z0-9_-]/', '_', $baseName);
            $uniqueId = substr(uniqid(), -4);
            $fileName = "{$safeBaseName}_{$dateSuffix}_{$uniqueId}.{$safeExtension}";

            // Simpan ke storage/app/public/{targetCategory}/
            $filePath = $file->storeAs($targetCategory, $fileName, 'public');
            $fileSize = $this->formatSizeUnits($file->getSize());

            Document::create([
                'title' => $title,
                'category' => $targetCategory,
                'region_code' => $regionCode,
                'region_number' => $regionNumber,
                'forecast_date' => $forecastDate,
                'period_type' => $periodType,
                'description' => $request->input('description', null),
                'file_path' => $filePath,
                'file_type' => $safeExtension,
                'file_size' => $fileSize,
            ]);

            $uploadedCount++;
        }

        $categoryLabel = $this->getCategoryLabel($targetCategory);
        $message = $uploadedCount > 1
            ? "{$uploadedCount} file berhasil diunggah dan disinkronkan ke kategori {$categoryLabel}."
            : "Berkas berhasil diunggah dan disinkronkan ke kategori {$categoryLabel}.";

        return redirect()->back()->with('success', $message);
    }

    /**
     * Parse metadata dari format penamaan BMKG:
     * - P_AH001_ddmmyyyy.pdf -> Cuaca Provinsi (18 Wilayah, P_AH001 s/d P_AH018)
     * - AH001_ddmmyyyy.pdf -> Cuaca Pelabuhan (37 Titik, AH001 s/d AH037)
     */
     private function parseForecastMetadata(string $filename): ?array
     {
         // 1. Cek format Provinsi P_AH / P.AH... (1 sampai 18)
         if (preg_match('/^(?:P[._\-\s]?AH)[._\-\s]?0*([1-9][0-9]?)(?:[._\-\s](\d{6,8}))?/i', $filename, $matches)) {
             $regionNumber = (int) $matches[1];
             $regionCode = sprintf('P_AH%03d', $regionNumber);
             $forecastDate = isset($matches[2]) ? $this->parseDateString($matches[2]) : null;

             return [
                 'category' => 'provinsi',
                 'region_number' => $regionNumber,
                 'region_code' => $regionCode,
                 'forecast_date' => $forecastDate,
             ];
         }

         // 2. Cek format Pelabuhan AH / AH. / AH_... (1 sampai 37)
         if (preg_match('/^AH[._\-\s]?0*([1-9][0-9]?)(?:[._\-\s](\d{6,8}))?/i', $filename, $matches)) {
             $regionNumber = (int) $matches[1];
             $regionCode = sprintf('AH%03d', $regionNumber);
             $forecastDate = isset($matches[2]) ? $this->parseDateString($matches[2]) : null;

             return [
                 'category' => 'pelabuhan',
                 'region_number' => $regionNumber,
                 'region_code' => $regionCode,
                 'forecast_date' => $forecastDate,
             ];
         }

         return null;
     }

    private function parseDateString(?string $dateStr): ?string
    {
        if (!$dateStr) {
            return null;
        }

        // 8 digit: ddmmyyyy atau yyyymmdd
        if (strlen($dateStr) === 8) {
            $first4 = (int) substr($dateStr, 0, 4);
            $last4 = (int) substr($dateStr, 4, 4);

            // Cek jika YYYYMMDD (contoh: 20261012)
            if ($first4 >= 2020 && $first4 <= 2040) {
                $year = $first4;
                $month = (int) substr($dateStr, 4, 2);
                $day = (int) substr($dateStr, 6, 2);
                if (checkdate($month, $day, $year)) {
                    return sprintf('%04d-%02d-%02d', $year, $month, $day);
                }
            }

            // Cek jika DDMMYYYY (contoh: 12102026)
            if ($last4 >= 2020 && $last4 <= 2040) {
                $day = (int) substr($dateStr, 0, 2);
                $month = (int) substr($dateStr, 2, 2);
                $year = $last4;
                if (checkdate($month, $day, $year)) {
                    return sprintf('%04d-%02d-%02d', $year, $month, $day);
                }
            }
        }

        // 6 digit: DDMMYY (contoh: 121026)
        if (strlen($dateStr) === 6) {
            $day = (int) substr($dateStr, 0, 2);
            $month = (int) substr($dateStr, 2, 2);
            $year = 2000 + (int) substr($dateStr, 4, 2);
            if (checkdate($month, $day, $year)) {
                return sprintf('%04d-%02d-%02d', $year, $month, $day);
            }
        }

        return null;
    }

    public function destroy(Document $document)
    {
        if (Storage::disk('public')->exists($document->file_path)) {
            Storage::disk('public')->delete($document->file_path);
        }

        $document->delete();

        return redirect()->back()->with('success', 'File berhasil dihapus dari sistem.');
    }

    public function destroyBatch(Request $request)
    {
        $request->validate([
            'ids' => 'required|array|min:1',
            'ids.*' => 'integer|exists:documents,id',
        ]);

        $ids = $request->input('ids', []);
        $documents = Document::whereIn('id', $ids)->get();

        $deletedCount = 0;
        foreach ($documents as $doc) {
            if ($doc->file_path && Storage::disk('public')->exists($doc->file_path)) {
                Storage::disk('public')->delete($doc->file_path);
            }
            $doc->delete();
            $deletedCount++;
        }

        return redirect()->back()->with('success', "{$deletedCount} file berhasil dihapus sekaligus.");
    }

    public function destroyByCategory(Request $request)
    {
        $request->validate([
            'category' => 'required|string',
        ]);

        $category = $request->input('category');

        $query = Document::query();
        if ($category === 'all') {
            // Hapus semua dokumen
        } elseif ($category === 'pelabuhan') {
            $query->whereIn('category', ['pelabuhan', 'mfy']);
        } else {
            $query->where('category', $category);
        }

        $documents = $query->get();
        $deletedCount = 0;

        foreach ($documents as $doc) {
            if ($doc->file_path && Storage::disk('public')->exists($doc->file_path)) {
                Storage::disk('public')->delete($doc->file_path);
            }
            $doc->delete();
            $deletedCount++;
        }

        $label = $category === 'all' ? 'Semua Dokumen' : $this->getCategoryLabel($category);
        return redirect()->back()->with('success', "Seluruh file kategori '{$label}' ({$deletedCount} berkas) berhasil dibersihkan.");
    }

    private function getCategoryLabel($category)
    {
        return match ($category) {
            'peringatan-dini' => 'Peringatan Dini',
            'provinsi' => 'Prakiraan Cuaca Provinsi',
            'buletin' => 'Buletin Maritim',
            'pelabuhan', 'mfy' => 'Cuaca Pelabuhan',
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
