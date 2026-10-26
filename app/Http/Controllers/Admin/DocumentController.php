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
        // Deteksi rinci kegagalan upload file dari PHP
        $uploadIssues = [];
        if (!empty($_FILES)) {
            foreach ($_FILES as $inputKey => $fileData) {
                if (isset($fileData['error'])) {
                    $errList = is_array($fileData['error']) ? $fileData['error'] : [$fileData['error']];
                    $nameList = is_array($fileData['name']) ? $fileData['name'] : [$fileData['name']];
                    foreach ($errList as $idx => $errCode) {
                        if ($errCode !== UPLOAD_ERR_OK && $errCode !== UPLOAD_ERR_NO_FILE) {
                            $fname = $nameList[$idx] ?? "Berkas #{$idx}";
                            $reason = match ($errCode) {
                                UPLOAD_ERR_INI_SIZE => "Ukuran berkas melebihi batas upload_max_filesize di php.ini (" . ini_get('upload_max_filesize') . ")",
                                UPLOAD_ERR_FORM_SIZE => "Melebihi batas MAX_FILE_SIZE formulir",
                                UPLOAD_ERR_PARTIAL => "Berkas hanya terunggah sebagian",
                                UPLOAD_ERR_NO_TMP_DIR => "Direktori temporary server tidak ditemukan",
                                UPLOAD_ERR_CANT_WRITE => "Server gagal menulis berkas ke disk",
                                UPLOAD_ERR_EXTENSION => "Proses unggah dihentikan oleh ekstensi PHP",
                                default => "Kode galat upload PHP: {$errCode}",
                            };
                            $uploadIssues[] = "{$fname}: {$reason}";
                        }
                    }
                }
            }
        }
        if (!empty($uploadIssues)) {
            return redirect()->back()->withErrors(['files' => implode(' • ', $uploadIssues)]);
        }
        $request->validate([
            'title' => 'nullable|string|max:255',
            'category' => 'required|string|in:auto,infografis,peringatan-dini,pelabuhan,mfy,bahari,buletin,provinsi',
            'files' => 'nullable|array|max:112',
            'files.*' => 'nullable',
            'file' => 'nullable',
            'description' => 'nullable|string|max:1000',
            'region_number' => 'nullable|integer',
            'forecast_date' => 'nullable|date',
            'period_type' => 'nullable|string|in:auto,daily,weekly,1-hari,3-hari',
            'purge_old' => 'nullable|boolean',
        ]);

        $files = [];
        if ($request->hasFile('files')) {
            $files = $request->file('files');
        } elseif ($request->hasFile('file')) {
            $single = $request->file('file');
            $files = is_array($single) ? $single : [$single];
        }

        if (empty($files)) {
            return redirect()->back()->withErrors(['files' => 'Wajib memilih minimal satu berkas file untuk diunggah.']);
        }

        // Validasi kesehatan berkas secara mendalam dan jelas
        foreach ($files as $idx => $f) {
            if (!$f instanceof \Illuminate\Http\UploadedFile) {
                return redirect()->back()->withErrors(['files' => "Berkas #{$idx} bukan objek berkas yang valid."]);
            }
            if (!$f->isValid()) {
                $errCode = $f->getError();
                $orig = $f->getClientOriginalName() ?: "Berkas #{$idx}";
                $reason = match ($errCode) {
                    UPLOAD_ERR_INI_SIZE => "Ukuran berkas melebihi batas upload_max_filesize di php.ini (" . ini_get('upload_max_filesize') . ")",
                    UPLOAD_ERR_FORM_SIZE => "Melebihi batas ukuran formulir",
                    UPLOAD_ERR_PARTIAL => "Berkas hanya terunggah sebagian",
                    UPLOAD_ERR_NO_TMP_DIR => "Direktori temporary server tidak ditemukan",
                    UPLOAD_ERR_CANT_WRITE => "Server gagal menulis berkas ke disk",
                    default => "Berkas gagal diproses (kode galat: {$errCode})",
                };
                return redirect()->back()->withErrors(['files' => "Berkas '{$orig}' gagal: {$reason}"]);
            }
        }

        if (count($files) > 112) {
            return redirect()->back()->withErrors(['files' => 'Maksimal 112 file yang dapat diunggah sekaligus.']);
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
            'video/mp4' => 'mp4',
        ];

        $formCategory = $request->input('category', 'pelabuhan');
        $formRegionNumber = $request->input('region_number');
        $formForecastDate = $request->input('forecast_date');
        $formPeriodType = $request->input('period_type', 'daily');

        $uploadedCount = 0;
        $dateSuffix = date('dmY_His');
        $uploadedDocIds = [];
        $categoryNewestDates = [];

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
                    'file' => "Berkas '{$file->getClientOriginalName()}' ditolak: Format tidak didukung. Format yang diizinkan hanya PNG, PDF, MP4, dan JPG."
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
                // Jika formCategory diset 'pelabuhan' atau 'provinsi', tapi berkasnya adalah gambar (.png/.jpg)
                // dan berformat AH atau P_AH, sistem otomatis mengalihkannya ke 'infografis' agar tidak ditolak sebagai PDF
                if (in_array($formCategory, ['pelabuhan', 'mfy', 'provinsi']) && in_array($safeExtension, ['png', 'jpg', 'jpeg'])) {
                    $targetCategory = 'infografis';
                } else {
                    $targetCategory = $formCategory;
                }
            }

            $regionNumber = $formRegionNumber ? (int) $formRegionNumber : null;
            $regionCode = null;
            $forecastDate = $formForecastDate ?: null;
            $periodType = $formPeriodType;

            if ($parsed) {
                if (isset($parsed['region_number'])) {
                    $regionNumber = $parsed['region_number'];
                }
                if (!empty($parsed['region_code'])) {
                    $regionCode = $parsed['region_code'];
                }
                if (!$forecastDate && !empty($parsed['forecast_date'])) {
                    $forecastDate = $parsed['forecast_date'];
                }
                if (!empty($parsed['period_type'])) {
                    $periodType = $parsed['period_type'];
                }
            } elseif ($regionNumber) {
                if ($targetCategory === 'pelabuhan' || $targetCategory === 'mfy') {
                    $regionCode = sprintf('AH%03d', $regionNumber);
                } elseif ($targetCategory === 'provinsi') {
                    $regionCode = sprintf('P_AH%03d', $regionNumber);
                }
            }

            // Validasi khusus: Berkas Peringatan Dini (1 Hari Gambar PNG/JPG, 3 Hari Video MP4, atau Dokumen PDF)
            if ($targetCategory === 'peringatan-dini' && !in_array($safeExtension, ['png', 'jpg', 'jpeg', 'mp4', 'pdf'])) {
                return redirect()->back()->withErrors([
                    'file' => "Berkas '{$originalName}' ditolak: Format untuk Peringatan Dini wajib berupa Gambar (.PNG/.JPG), Video (.MP4), atau Dokumen (.PDF)."
                ]);
            }

            // Validasi khusus: Berkas Infografis Cuaca saat ini wajib format PNG/JPG
            if ($targetCategory === 'infografis' && !in_array($safeExtension, ['png', 'jpg', 'jpeg'])) {
                return redirect()->back()->withErrors([
                    'file' => "Berkas '{$originalName}' ditolak: Format untuk Infografis Cuaca saat ini wajib berformat gambar (.PNG / .JPG)."
                ]);
            }

            // Validasi khusus: Berkas Prakiraan Pelabuhan, Provinsi & Buletin wajib format PDF (kecuali berkas Sampul/Cover resmi)
            if (in_array($targetCategory, ['pelabuhan', 'mfy', 'provinsi', 'buletin']) && $safeExtension !== 'pdf') {
                if (!in_array($regionCode, ['COVER_PROV', 'COVER_PEL'])) {
                    $catLabel = $targetCategory === 'buletin' ? 'Buletin Maritim' : ($targetCategory === 'provinsi' ? 'Prakiraan Cuaca Provinsi' : 'Prakiraan Cuaca Pelabuhan');
                    return redirect()->back()->withErrors([
                        'file' => "Berkas '{$originalName}' ditolak: Format untuk {$catLabel} wajib berformat dokumen .PDF (kecuali berkas Sampul/Cover resmi)."
                    ]);
                }
            }

            // Sesuaikan period_type jika peringatan dini
            if ($targetCategory === 'peringatan-dini') {
                $lowerName = strtolower($originalName);
                $isExtVideo = in_array($safeExtension, ['mp4']);
                $isNoPd = (bool) (
                    (!empty($parsed['is_no_pd'])) ||
                    preg_match('/(?:^|[^a-zA-Z0-9])(?:no[._\-\s]?pd|nopd|nihil(?:[._\-\s]?pd)?)/i', $baseName)
                );

                // Bersihkan string tanggal agar angka tanggal (seperti 20261023) tidak keliru dianggap indikator '3' hari atau '1' hari
                $nameWithoutDates = preg_replace('/(?:\d{4}[-_.]?\d{2}[-_.]?\d{2}|\d{2}[-_.]?\d{2}[-_.]?\d{4}|\d{6,8})/', '', $lowerName);
                $isThreeExplicit = preg_match('/(?:^|[^0-9])(?:3[\s_.-]*(?:hari|days?|h\b)?|tiga)(?:$|[^0-9])/i', $nameWithoutDates)
                    || str_contains($lowerName, '72');
                $isOneExplicit = preg_match('/(?:^|[^0-9])(?:1[\s_.-]*(?:hari|days?|h\b)?|satu)(?:$|[^0-9])/i', $nameWithoutDates)
                    || str_contains($lowerName, '24');

                // Jika diunggah bersamaan (lebih dari 1 berkas), atau form diset 'auto':
                // Deteksi otomatis masing-masing berkas secara presisi:
                // - File video atau eksplisit 3-hari => '3-hari'
                // - File NO PD / Nihil atau gambar 1-hari => '1-hari'
                if (count($files) > 1 || $formPeriodType === 'auto' || empty($formPeriodType)) {
                    if ($isNoPd) {
                        $periodType = ($isExtVideo || $isThreeExplicit) ? '3-hari' : '1-hari';
                    } elseif ($isExtVideo || $isThreeExplicit) {
                        $periodType = '3-hari';
                    } elseif ($isOneExplicit) {
                        $periodType = '1-hari';
                    } else {
                        // Default jika tidak ada angka: video adalah 3-hari, gambar adalah 1-hari
                        $periodType = $isExtVideo ? '3-hari' : '1-hari';
                    }
                } else {
                    // Jika berkas tunggal dan admin sengaja memilih opsi spesifik di form
                    if ($formPeriodType && in_array($formPeriodType, ['1-hari', '3-hari'])) {
                        $periodType = $formPeriodType;
                    } elseif (!empty($parsed['period_type'])) {
                        $periodType = $parsed['period_type'];
                    } elseif ($isNoPd) {
                        $periodType = ($isExtVideo || $isThreeExplicit) ? '3-hari' : '1-hari';
                    } elseif ($isExtVideo || $isThreeExplicit) {
                        $periodType = '3-hari';
                    } else {
                        $periodType = '1-hari';
                    }
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
                if (!empty($parsed['title'])) {
                    $title = $parsed['title'];
                } elseif ($regionCode === 'COVER_PROV') {
                    $title = 'Sampul Prakiraan Cuaca Maritim Wilayah Provinsi Maluku';
                } elseif ($regionCode === 'COVER_PEL') {
                    $title = 'Sampul Prakiraan Cuaca Pelabuhan Provinsi Maluku';
                } elseif (($targetCategory === 'pelabuhan' || $targetCategory === 'mfy') && $regionNumber && isset(self::PELABUHAN_LIST[$regionNumber])) {
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
                        $title = "Infografis Cuaca Maluku - {$formattedDateStr}";
                    }
                } elseif ($targetCategory === 'peringatan-dini') {
                    $isNoPd = (bool) (
                        (!empty($parsed['is_no_pd'])) ||
                        preg_match('/(?:^|[^a-zA-Z0-9])(?:no[._\-\s]?pd|nopd|nihil(?:[._\-\s]?pd)?)/i', $baseName)
                    );
                    $periodLabel = ($periodType === '3-hari') ? '3 Hari Kedepan' : '1 Hari Kedepan';
                    $formattedDateStr = $forecastDate ? date('d M Y', strtotime($forecastDate)) : date('d M Y');
                    if ($isNoPd) {
                        $title = "Peringatan Dini Gelombang Maluku {$periodLabel} (Nihil / Kondisi Aman) - {$formattedDateStr}";
                    } else {
                        $title = "Peringatan Dini Gelombang Maluku {$periodLabel} - {$formattedDateStr}";
                    }
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

            $docDescription = $request->input('description', null);
            if (!$docDescription && $targetCategory === 'peringatan-dini' && !empty($isNoPd)) {
                $docDescription = "Rilis resmi BMKG: Tidak ada potensi gelombang tinggi (kondisi tenang dan kondusif) untuk {$periodLabel}.";
            }

            $createdDoc = Document::create([
                'title' => $title,
                'category' => $targetCategory,
                'region_code' => $regionCode,
                'region_number' => $regionNumber,
                'forecast_date' => $forecastDate,
                'period_type' => $periodType,
                'description' => $docDescription,
                'file_path' => $filePath,
                'file_type' => $safeExtension,
                'file_size' => $fileSize,
            ]);

            $uploadedDocIds[] = $createdDoc->id;
            if ($forecastDate) {
                $categoryNewestDates[$targetCategory] = max($categoryNewestDates[$targetCategory] ?? '', $forecastDate);
            }

            $uploadedCount++;
            $categoryKey = in_array($targetCategory, ['pelabuhan', 'mfy']) ? 'pelabuhan' : $targetCategory;
            if (isset($categoryCounts[$categoryKey])) {
                $categoryCounts[$categoryKey]++;
            }
        }

        // Jika admin memilih opsi pembersihan berkas produk hari sebelumnya (purge_old)
        $purgedCount = 0;
        if ($request->boolean('purge_old')) {
            $touchedCategories = array_keys(array_filter($categoryCounts, fn($c) => $c > 0));
            foreach ($touchedCategories as $cat) {
                // Untuk kategori produk harian, peringatan dini, maupun wisata bahari
                $query = Document::query();
                if ($cat === 'pelabuhan') {
                    $query->whereIn('category', ['pelabuhan', 'mfy']);
                } else {
                    $query->where('category', $cat);
                }

                // Tentukan tanggal aktif terbaru dari kumpulan berkas yang baru diunggah
                $activeDate = $categoryNewestDates[$cat] 
                    ?? (clone $query)->whereIn('id', $uploadedDocIds)->whereNotNull('forecast_date')->max('forecast_date')
                    ?? date('Y-m-d');

                // Berkas produk yang tanggalnya lebih lama dari activeDate (hari/tanggal sebelumnya)
                $oldDocs = (clone $query)
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
            $purgeStr = $purgedCount > 0 ? " serta membersihkan {$purgedCount} berkas produk hari sebelumnya." : '.';
            $message = "Sukses! {$uploadedCount} berkas berhasil diproses otomatis dan diterbitkan{$detailStr}{$purgeStr}";
        } else {
            $categoryLabel = $this->getCategoryLabel($targetCategory);
            $purgeStr = $purgedCount > 0 ? " dan {$purgedCount} berkas produk hari sebelumnya telah dibersihkan." : '.';
            $message = "Berkas berhasil diunggah dan disinkronkan ke kategori {$categoryLabel}{$purgeStr}";
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

        // 0. Cek Berkas Sampul / Cover Rilis Cuaca Resmi (Provinsi & Pelabuhan)
        if (
            (str_contains($lower, 'cover') || str_contains($lower, 'sampul') || str_contains($lower, 'header') || str_contains($lower, 'slide'))
            && (str_contains($lower, 'prov') || str_contains($lower, 'pelabuhan') || str_contains($lower, 'port') || str_contains($lower, 'maritim'))
        ) {
            preg_match('/(\d{6,8})/', $filename, $dateMatch);
            $forecastDate = isset($dateMatch[1]) ? $this->parseDateString($dateMatch[1]) : date('Y-m-d');
            $isImage = in_array($ext, ['png', 'jpg', 'jpeg']);

            if (str_contains($lower, 'prov') || str_contains($lower, 'maritim')) {
                return [
                    'category' => $isImage ? 'infografis' : 'provinsi',
                    'region_number' => 0,
                    'region_code' => 'COVER_PROV',
                    'forecast_date' => $forecastDate,
                    'period_type' => 'weekly',
                    'title' => 'Sampul Prakiraan Cuaca Maritim Wilayah Provinsi Maluku',
                ];
            } else {
                return [
                    'category' => $isImage ? 'infografis' : 'pelabuhan',
                    'region_number' => 0,
                    'region_code' => 'COVER_PEL',
                    'forecast_date' => $forecastDate,
                    'period_type' => 'weekly',
                    'title' => 'Sampul Prakiraan Cuaca Pelabuhan Provinsi Maluku',
                ];
            }
        }

        // 1. Cek Peringatan Dini Gelombang (1 Hari Gambar / 3 Hari Video / NO PD)
        $isNoPd = (bool) preg_match('/(?:^|[^a-zA-Z0-9])(?:no[._\-\s]?pd|nopd|nihil(?:[._\-\s]?pd)?)/i', $filename);
        $isPd = str_contains($lower, 'peringatan')
            || str_contains($lower, 'warning')
            || str_contains($lower, 'dini')
            || str_contains($lower, 'gelombang')
            || in_array($ext, ['mp4'])
            || str_contains($lower, 'instagram')
            || $isNoPd;

        if ($isPd) {
            preg_match('/(\d{6,8})/', $filename, $dateMatch);
            $forecastDate = isset($dateMatch[1]) ? $this->parseDateString($dateMatch[1]) : null;

            // Bersihkan string tanggal agar angka tanggal (seperti 20261023) tidak keliru dianggap '3' hari atau '1' hari
            $nameWithoutDates = preg_replace('/(?:\d{4}[-_.]?\d{2}[-_.]?\d{2}|\d{2}[-_.]?\d{2}[-_.]?\d{4}|\d{6,8})/', '', $lower);
            $isThreeDays = in_array($ext, ['mp4'])
                || preg_match('/(?:^|[^0-9])(?:3[\s_.-]*(?:hari|days?|h\b)?|tiga)(?:$|[^0-9])/i', $nameWithoutDates)
                || str_contains($lower, '72');

            $periodType = ($isThreeDays && !$isNoPd) ? '3-hari' : '1-hari';

            return [
                'category' => 'peringatan-dini',
                'period_type' => $periodType,
                'region_number' => null,
                'region_code' => null,
                'forecast_date' => $forecastDate,
                'is_no_pd' => $isNoPd,
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
            $forecastDate = $this->parseBuletinDate($filename);

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

    private function parseBuletinDate(string $filename): ?string
    {
        $lower = strtolower($filename);
        $months = [
            'januari' => '01', 'january' => '01', 'jan' => '01',
            'februari' => '02', 'february' => '02', 'feb' => '02',
            'maret' => '03', 'march' => '03', 'mar' => '03',
            'april' => '04', 'apr' => '04',
            'mei' => '05', 'may' => '05',
            'juni' => '06', 'june' => '06', 'jun' => '06',
            'juli' => '07', 'july' => '07', 'jul' => '07',
            'agustus' => '08', 'august' => '08', 'ags' => '08', 'agu' => '08', 'aug' => '08',
            'september' => '09', 'sep' => '09', 'sept' => '09',
            'oktober' => '10', 'october' => '10', 'okt' => '10', 'oct' => '10',
            'november' => '11', 'nov' => '11',
            'desember' => '12', 'december' => '12', 'des' => '12', 'dec' => '12',
        ];

        // Cari tahun 4 digit (misal: 2025, 2026, dst)
        $year = null;
        if (preg_match('/\b(20[2-9]\d)\b/', $filename, $yMatch)) {
            $year = $yMatch[1];
        } else {
            $year = date('Y');
        }

        // Cari nama bulan dari kata kunci teks
        $month = null;
        foreach ($months as $name => $num) {
            if (preg_match('/\b' . preg_quote($name, '/') . '\b/i', $lower)) {
                $month = $num;
                break;
            }
        }

        // Jika nama bulan tidak ditemukan, deteksi nomor urut edisi (misal: 03. BULETIN atau 10. BULETIN)
        if (!$month && preg_match('/(?:^|[^0-9])0?([1-9]|1[0-2])(?:\.|\s|-|_)/', $filename, $mNumMatch)) {
            $month = sprintf('%02d', (int) $mNumMatch[1]);
        }

        if ($year && $month) {
            return "{$year}-{$month}-01";
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
            'infografis' => 'Infografis',
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
