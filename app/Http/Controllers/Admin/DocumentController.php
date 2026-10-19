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
            'infografis' => Document::where('category', 'infografis')->count(),
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
            'category' => 'required|string|in:auto,infografis,peringatan-dini,pelabuhan,mfy,bahari,buletin,provinsi',
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

        $categoryCounts = [
            'all' => 0,
            'infografis' => 0,
            'pelabuhan' => 0,
            'provinsi' => 0,
            'bahari' => 0,
            'buletin' => 0,
            'peringatan-dini' => 0,
        ];

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

            // Deteksi otomatis format AH (Pelabuhan), P_AH (Provinsi), Wisata Bahari, Buletin, Peringatan Dini
            $parsed = $this->parseForecastMetadata($baseName, $safeExtension);

            if ($formCategory === 'auto') {
                $targetCategory = $parsed['category'] ?? ($safeExtension === 'pdf' ? 'pelabuhan' : 'infografis');
            } else {
                $targetCategory = $formCategory;
            }

            // Validasi khusus: Berkas Peringatan Dini saat ini wajib format PNG
            if ($targetCategory === 'peringatan-dini' && $safeExtension !== 'png') {
                return redirect()->back()->withErrors([
                    'file' => "Berkas '{$originalName}' ditolak: Format untuk Peta Peringatan Dini Gelombang saat ini wajib berformat gambar .PNG."
                ]);
            }

            // Validasi khusus: Berkas Infografis Cuaca saat ini wajib format PNG
            if ($targetCategory === 'infografis' && $safeExtension !== 'png') {
                return redirect()->back()->withErrors([
                    'file' => "Berkas '{$originalName}' ditolak: Format untuk Infografis Cuaca saat ini wajib berformat gambar .PNG."
                ]);
            }

            // Validasi khusus: Berkas Prakiraan Pelabuhan, Provinsi & Buletin wajib format PDF
            if (in_array($targetCategory, ['pelabuhan', 'mfy', 'provinsi', 'buletin']) && $safeExtension !== 'pdf') {
                $catLabel = $targetCategory === 'buletin' ? 'Buletin Maritim' : ($targetCategory === 'provinsi' ? 'Prakiraan Cuaca Provinsi' : 'Prakiraan Cuaca Pelabuhan');
                return redirect()->back()->withErrors([
                    'file' => "Berkas '{$originalName}' ditolak: Format untuk {$catLabel} wajib berformat dokumen .PDF."
                ]);
            }

            $regionNumber = $formRegionNumber ? (int) $formRegionNumber : null;
            $regionCode = null;
            $forecastDate = $formForecastDate ?: null;
            $periodType = $formPeriodType;

            if ($parsed) {
                if (!empty($parsed['region_number'])) {
                    $regionNumber = $parsed['region_number'];
                }
                if (!empty($parsed['region_code'])) {
                    $regionCode = $parsed['region_code'];
                }
                if (!$forecastDate && !empty($parsed['forecast_date'])) {
                    $forecastDate = $parsed['forecast_date'];
                }
            } elseif ($regionNumber) {
                if ($targetCategory === 'pelabuhan' || $targetCategory === 'mfy') {
                    $regionCode = sprintf('AH%03d', $regionNumber);
                } elseif ($targetCategory === 'provinsi') {
                    $regionCode = sprintf('P_AH%03d', $regionNumber);
                }
            }

            // Default tanggal prakiraan ke hari ini jika cuaca perairan/pelabuhan/infografis dan belum diset
            if (!$forecastDate && in_array($targetCategory, ['provinsi', 'pelabuhan', 'mfy', 'bahari', 'infografis', 'peringatan-dini'])) {
                $forecastDate = date('Y-m-d');
            }

            // Tentukan nama/judul dokumen yang rapi dan seragam
            if (count($files) === 1 && $request->filled('title') && $formCategory !== 'auto') {
                $title = $request->input('title');
            } else {
                if (($targetCategory === 'pelabuhan' || $targetCategory === 'mfy') && $regionNumber && isset(self::PELABUHAN_LIST[$regionNumber])) {
                    $formattedDateStr = $forecastDate ? date('d M Y', strtotime($forecastDate)) : date('d M Y');
                    $title = self::PELABUHAN_LIST[$regionNumber] . " - {$formattedDateStr} ({$regionCode})";
                } elseif ($targetCategory === 'provinsi' && $regionNumber && isset(self::PROVINSI_LIST[$regionNumber])) {
                    $formattedDateStr = $forecastDate ? date('d M Y', strtotime($forecastDate)) : date('d M Y');
                    $title = self::PROVINSI_LIST[$regionNumber] . " - {$formattedDateStr} ({$regionCode})";
                } elseif ($targetCategory === 'infografis') {
                    $formattedDateStr = $forecastDate ? date('d M Y', strtotime($forecastDate)) : date('d M Y');
                    if ($regionNumber && isset(self::PROVINSI_LIST[$regionNumber]) && $regionCode && str_starts_with($regionCode, 'P_AH')) {
                        $title = "Infografis " . self::PROVINSI_LIST[$regionNumber] . " - {$formattedDateStr} ({$regionCode})";
                    } elseif ($regionNumber && isset(self::PELABUHAN_LIST[$regionNumber]) && $regionCode && str_starts_with($regionCode, 'AH')) {
                        $title = "Infografis " . self::PELABUHAN_LIST[$regionNumber] . " - {$formattedDateStr} ({$regionCode})";
                    } else {
                        $title = "Infografis & Peta Cuaca - {$formattedDateStr}";
                    }
                } elseif ($targetCategory === 'peringatan-dini') {
                    $title = "Peta Peringatan Dini Gelombang - " . ($forecastDate ? date('d M Y', strtotime($forecastDate)) : date('d M Y'));
                } elseif ($targetCategory === 'bahari') {
                    // Beri judul rapi untuk slide / destinasi wisata bahari
                    $title = $originalName;
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
            $categoryKey = in_array($targetCategory, ['pelabuhan', 'mfy']) ? 'pelabuhan' : $targetCategory;
            if (isset($categoryCounts[$categoryKey])) {
                $categoryCounts[$categoryKey]++;
            }
        }

        // Susun pesan ringkasan sukses
        if ($formCategory === 'auto' || $uploadedCount > 1) {
            $breakdown = [];
            if ($categoryCounts['infografis'] > 0) $breakdown[] = "{$categoryCounts['infografis']} Infografis";
            if ($categoryCounts['pelabuhan'] > 0) $breakdown[] = "{$categoryCounts['pelabuhan']} Pelabuhan";
            if ($categoryCounts['provinsi'] > 0) $breakdown[] = "{$categoryCounts['provinsi']} Provinsi";
            if ($categoryCounts['bahari'] > 0) $breakdown[] = "{$categoryCounts['bahari']} Wisata Bahari";
            if ($categoryCounts['buletin'] > 0) $breakdown[] = "{$categoryCounts['buletin']} Buletin";
            if ($categoryCounts['peringatan-dini'] > 0) $breakdown[] = "{$categoryCounts['peringatan-dini']} Peringatan Dini";

            $detailStr = !empty($breakdown) ? ' (' . implode(', ', $breakdown) . ')' : '';
            $message = "Sukses! {$uploadedCount} berkas berhasil diproses otomatis dan diterbitkan{$detailStr}.";
        } else {
            $categoryLabel = $this->getCategoryLabel($targetCategory);
            $message = "Berkas berhasil diunggah dan disinkronkan ke kategori {$categoryLabel}.";
        }

        return redirect()->back()->with('success', $message);
    }

    /**
     * Parse metadata dari format penamaan BMKG:
     * - P_AH001_ddmmyyyy.pdf -> Cuaca Provinsi (18 Wilayah, P_AH001 s/d P_AH018)
     * - AH001_ddmmyyyy.pdf -> Cuaca Pelabuhan (37 Titik, AH001 s/d AH037)
     * - Slide / Destinasi Pantai -> Wisata Bahari (bahari)
     * - Buletin -> Buletin Maritim (buletin)
     * - Warning / Peringatan -> Peringatan Dini (peringatan-dini)
     */
    private function parseForecastMetadata(string $filename, ?string $extension = null): ?array
    {
        $lower = strtolower($filename);
        $ext = $extension ? strtolower($extension) : '';

        // 1. Cek Peringatan Dini Gelombang
        if (str_contains($lower, 'peringatan') || str_contains($lower, 'warning') || str_contains($lower, 'dini') || str_contains($lower, 'gelombang')) {
            preg_match('/(\d{6,8})/', $filename, $dateMatch);
            $forecastDate = isset($dateMatch[1]) ? $this->parseDateString($dateMatch[1]) : null;

            return [
                'category' => 'peringatan-dini',
                'region_number' => null,
                'region_code' => null,
                'forecast_date' => $forecastDate,
            ];
        }

        // 2. Cek format Provinsi P_AH / P.AH... (1 sampai 18)
        if (preg_match('/(?:^|[^a-zA-Z0-9])(?:P[._\-\s]?AH)[._\-\s]?0*([1-9][0-9]?)(?:[._\-\s](\d{6,8}))?/i', $filename, $matches)) {
            $regionNumber = (int) $matches[1];
            if ($regionNumber >= 1 && $regionNumber <= 18) {
                $regionCode = sprintf('P_AH%03d', $regionNumber);
                $forecastDate = isset($matches[2]) ? $this->parseDateString($matches[2]) : null;

                // Jika formatnya PNG, otomatis Infografis Cuaca Provinsi!
                $category = ($ext === 'png') ? 'infografis' : 'provinsi';

                return [
                    'category' => $category,
                    'region_number' => $regionNumber,
                    'region_code' => $regionCode,
                    'forecast_date' => $forecastDate,
                ];
            }
        }

        // 3. Cek format Pelabuhan AH / AH. / AH_... (1 sampai 37) (bukan P_AH)
        if (preg_match('/(?:^|[^a-zA-Z0-9_])(?<!P[._\-\s])AH[._\-\s]?0*([1-9][0-9]?)(?:[._\-\s](\d{6,8}))?/i', $filename, $matches)) {
            $regionNumber = (int) $matches[1];
            if ($regionNumber >= 1 && $regionNumber <= 37) {
                $regionCode = sprintf('AH%03d', $regionNumber);
                $forecastDate = isset($matches[2]) ? $this->parseDateString($matches[2]) : null;

                // Jika formatnya PNG, otomatis Infografis Cuaca Pelabuhan!
                $category = ($ext === 'png') ? 'infografis' : 'pelabuhan';

                return [
                    'category' => $category,
                    'region_number' => $regionNumber,
                    'region_code' => $regionCode,
                    'forecast_date' => $forecastDate,
                ];
            }
        }

        // 4. Cek format Wisata Bahari (slide1..slide7, atau nama destinasi pantai)
        $bahariKeywords = [
            'bahari', 'wisata', 'slide', 'pantai',
            'liang', 'ora', 'morela', 'hukurila', 'natsepa', 'jikumerasa',
            'sampul', 'cover'
        ];
        foreach ($bahariKeywords as $kw) {
            if (str_contains($lower, $kw)) {
                // Deteksi jika ada tanggal pada nama file
                preg_match('/(\d{6,8})/', $filename, $dateMatch);
                $forecastDate = isset($dateMatch[1]) ? $this->parseDateString($dateMatch[1]) : null;

                return [
                    'category' => 'bahari',
                    'region_number' => null,
                    'region_code' => null,
                    'forecast_date' => $forecastDate,
                ];
            }
        }

        // 5. Cek Buletin
        if (str_contains($lower, 'buletin') || str_contains($lower, 'bulletin')) {
            preg_match('/(\d{6,8})/', $filename, $dateMatch);
            $forecastDate = isset($dateMatch[1]) ? $this->parseDateString($dateMatch[1]) : null;

            return [
                'category' => 'buletin',
                'region_number' => null,
                'region_code' => null,
                'forecast_date' => $forecastDate,
            ];
        }

        // 6. Cek Infografis / Peta Cuaca
        $infografisKeywords = ['infografis', 'grafis', 'peta', 'infographic', 'map', 'rilis-harian', 'rilis_harian'];
        foreach ($infografisKeywords as $kw) {
            if (str_contains($lower, $kw)) {
                preg_match('/(\d{6,8})/', $filename, $dateMatch);
                $forecastDate = isset($dateMatch[1]) ? $this->parseDateString($dateMatch[1]) : null;

                return [
                    'category' => 'infografis',
                    'region_number' => null,
                    'region_code' => null,
                    'forecast_date' => $forecastDate,
                ];
            }
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
            'infografis' => 'Infografis & Peta Cuaca',
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
