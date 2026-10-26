<?php

use App\Http\Controllers\Admin\DocumentController;
use App\Http\Controllers\Auth\GoogleAuthController;
use App\Models\Document;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    $warning1Hari = Document::where('category', 'peringatan-dini')
        ->where(function ($q) {
            $q->where('period_type', '1-hari')
              ->orWhere('title', 'LIKE', '%1%hari%')
              ->orWhere(function ($sub) {
                  $sub->whereNotIn('file_type', ['mp4', 'webm', 'mov', 'ogg'])
                      ->where(function ($sq) {
                          $sq->whereNull('period_type')->orWhere('period_type', '!=', '3-hari');
                      })
                      ->where('title', 'NOT LIKE', '%3%hari%');
              });
        })
        ->whereNotIn('file_type', ['mp4', 'webm', 'mov', 'ogg'])
        ->orderByDesc('forecast_date')
        ->latest('id')
        ->first();

    $warning3Hari = Document::where('category', 'peringatan-dini')
        ->where(function ($q) {
            $q->where('period_type', '3-hari')
              ->orWhere('title', 'LIKE', '%3%hari%')
              ->orWhereIn('file_type', ['mp4', 'webm', 'mov', 'ogg']);
        })
        ->orderByDesc('forecast_date')
        ->orderByRaw("CASE WHEN file_type IN ('mp4', 'webm', 'mov', 'ogg') THEN 0 ELSE 1 END")
        ->latest('id')
        ->first();

    // Fallback Cerdas: Jika rilis 1-hari adalah status NO PD (Nihil Peringatan Dini)
    // dan pada tanggal tersebut forecaster tidak mengunggah berkas terpisah untuk 3-hari,
    // maka berkas NO PD 1-hari secara otomatis mengisi slide 3-hari agar kedua slide berstatus "Nihil / Aman".
    if ($warning1Hari) {
        $is1HariNoPd = str_contains(strtolower($warning1Hari->title ?? ''), 'nihil')
            || str_contains(strtolower($warning1Hari->title ?? ''), 'no pd')
            || preg_match('/(?:^|[^a-z0-9])(?:no[._\-\s]?pd|nopd|nihil)/i', $warning1Hari->file_path ?? '');

        $hasFresh3Hari = $warning3Hari
            && $warning3Hari->forecast_date >= $warning1Hari->forecast_date
            && $warning3Hari->id !== $warning1Hari->id;

        if ($is1HariNoPd && !$hasFresh3Hari) {
            $warning3Hari = clone $warning1Hari;
            $warning3Hari->period_type = '3-hari';
            $formattedDateStr = $warning1Hari->forecast_date ? date('d M Y', strtotime($warning1Hari->forecast_date)) : date('d M Y');
            $warning3Hari->title = "Peringatan Dini Gelombang Maluku 3 Hari Kedepan (Nihil / Kondisi Aman) - {$formattedDateStr}";
            $warning3Hari->description = "Rilis resmi BMKG: Kondisi dinamika gelombang perairan Maluku terpantau aman dan kondusif untuk 72 jam (3 hari) kedepan.";
        }
    }

    $warningDocs = Document::where('category', 'peringatan-dini')
        ->orderByDesc('forecast_date')
        ->latest('id')
        ->take(10)
        ->get();

    $latestProvinsiDocs = Document::where('category', 'provinsi')
        ->where('file_type', 'pdf')
        ->orderByDesc('forecast_date')
        ->latest('id')
        ->take(18)
        ->get();

    $latestPelabuhanDocs = Document::whereIn('category', ['pelabuhan', 'mfy'])
        ->where('file_type', 'pdf')
        ->orderByDesc('forecast_date')
        ->latest('id')
        ->take(37)
        ->get();

    $latestBuletinDocs = Document::where('category', 'buletin')
        ->where('file_type', 'pdf')
        ->orderByDesc('forecast_date')
        ->latest('id')
        ->take(8)
        ->get();

    // Ambil dokumen Cover / Sampul Infografis terbaru (Tab 2 / Prospek H+1 s/d H+4)
    // 1. Cover Infografis Perairan Provinsi Maluku
    $latestInfografisProv = Document::where('category', 'infografis')
        ->whereIn('file_type', ['png', 'jpg', 'jpeg', 'webp'])
        ->where(function ($q) {
            $q->where('region_code', 'COVER_PROV')
              ->orWhere('title', 'LIKE', '%Sampul%Provinsi%')
              ->orWhere('title', 'LIKE', '%Cover%Provinsi%')
              ->orWhere('file_path', 'LIKE', '%cover%prov%')
              ->orWhere('file_path', 'LIKE', '%sampul%prov%');
        })
        ->orderByDesc('forecast_date')
        ->latest('id')
        ->first();

    // Fallback jika belum ada berkas berlabel cover, ambil infografis provinsi dengan tanggal paling baru (Tab 2)
    if (!$latestInfografisProv) {
        $latestInfografisProv = Document::where('category', 'infografis')
            ->whereIn('file_type', ['png', 'jpg', 'jpeg', 'webp'])
            ->where(function ($q) {
                $q->where('region_code', 'LIKE', 'P_AH%')
                  ->orWhereBetween('region_number', [1, 18]);
            })
            ->orderByDesc('forecast_date')
            ->latest('id')
            ->first();
    }

    // 2. Cover Infografis Cuaca Pelabuhan Maluku
    $latestInfografisPel = Document::where('category', 'infografis')
        ->whereIn('file_type', ['png', 'jpg', 'jpeg', 'webp'])
        ->where(function ($q) {
            $q->where('region_code', 'COVER_PEL')
              ->orWhere('title', 'LIKE', '%Sampul%Pelabuhan%')
              ->orWhere('title', 'LIKE', '%Cover%Pelabuhan%')
              ->orWhere('file_path', 'LIKE', '%cover%pel%')
              ->orWhere('file_path', 'LIKE', '%sampul%pel%');
        })
        ->orderByDesc('forecast_date')
        ->latest('id')
        ->first();

    // Fallback jika belum ada berkas berlabel cover, ambil infografis pelabuhan dengan tanggal paling baru (Tab 2)
    if (!$latestInfografisPel) {
        $latestInfografisPel = Document::where('category', 'infografis')
            ->whereIn('file_type', ['png', 'jpg', 'jpeg', 'webp'])
            ->where(function ($q) {
                $q->where('region_code', 'LIKE', 'AH%')
                  ->where('region_code', 'NOT LIKE', 'P_AH%');
            })
            ->orderByDesc('forecast_date')
            ->latest('id')
            ->first();
    }

    $latestInfografisDocs = collect([$latestInfografisProv, $latestInfografisPel])->filter()->values();
    if ($latestInfografisDocs->isEmpty()) {
        $latestInfografisDocs = Document::where('category', 'infografis')
            ->whereIn('file_type', ['png', 'jpg', 'jpeg', 'webp'])
            ->orderByDesc('forecast_date')
            ->latest('id')
            ->take(2)
            ->get();
    }

    $recentDocs = Document::latest()->take(6)->get();

    return Inertia::render('welcome', [
        'warning1Hari' => $warning1Hari,
        'warning3Hari' => $warning3Hari,
        'warningDocs' => $warningDocs,
        'latestProvinsiDocs' => $latestProvinsiDocs,
        'latestPelabuhanDocs' => $latestPelabuhanDocs,
        'latestBuletinDocs' => $latestBuletinDocs,
        'latestInfografisDocs' => $latestInfografisDocs,
        'recentDocs' => $recentDocs,
    ]);
})->name('home');

Route::get('/pelabuhan', function () {
    $coverDocuments = Document::where(function ($q) {
            $q->where('region_code', 'COVER_PEL')
              ->orWhere('title', 'LIKE', '%Sampul Prakiraan Cuaca Pelabuhan%')
              ->orWhere('title', 'LIKE', '%Cover Prakiraan Cuaca Pelabuhan%');
        })
        ->orderByDesc('forecast_date')
        ->latest('id')
        ->get();

    $documents = Document::whereIn('category', ['pelabuhan', 'mfy'])
        ->where('file_type', 'pdf')
        ->orderByDesc('forecast_date')
        ->latest('id')
        ->get();

    return Inertia::render('pelabuhan', [
        'documents' => $documents,
        'coverDocuments' => $coverDocuments,
        'coverDocument' => $coverDocuments->first(),
    ]);
})->name('pelabuhan');
Route::redirect('/penyeberangan', 'https://maritim.bmkg.go.id/cuaca/rute')->name('penyeberangan');
Route::inertia('/sejarah', 'sejarah')->name('sejarah');
Route::inertia('/struktur', 'struktur')->name('struktur');
Route::inertia('/visimisi', 'visimisi')->name('visimisi');
Route::inertia('/tupoksi', 'tupoksi')->name('tupoksi');
Route::redirect('/tugas-fungsi', '/tupoksi');
Route::redirect('/tugas-dan-fungsi', '/tupoksi');
Route::inertia('/informasi', 'informasi')->name('informasi');
Route::redirect('/pelayanan_informasi', '/informasi');
Route::redirect('/pelayanan-informasi', '/informasi');
Route::redirect('/pelayanan-data', '/informasi');
Route::inertia('/survey-ikm', 'survey-ikm')->name('survey-ikm');
Route::redirect('/ikm', '/survey-ikm');
Route::redirect('/skm', '/survey-ikm');
Route::redirect('/eskm', '/survey-ikm');
Route::redirect('/survei-ikm', '/survey-ikm');

Route::get('/provinsi', function () {
    $coverDocuments = Document::where(function ($q) {
            $q->where('region_code', 'COVER_PROV')
              ->orWhere('title', 'LIKE', '%Sampul Prakiraan Cuaca Maritim Wilayah Provinsi%')
              ->orWhere('title', 'LIKE', '%Cover Prakiraan Cuaca Maritim Wilayah Provinsi%');
        })
        ->orderByDesc('forecast_date')
        ->latest('id')
        ->get();

    $documents = Document::where('category', 'provinsi')
        ->where('file_type', 'pdf')
        ->orderByDesc('forecast_date')
        ->latest('id')
        ->get();

    return Inertia::render('provinsi', [
        'documents' => $documents,
        'coverDocuments' => $coverDocuments,
        'coverDocument' => $coverDocuments->first(),
    ]);
})->name('provinsi');

Route::get('/wisata-bahari', function () {
    $documents = Document::where('category', 'bahari')
        ->latest('id')
        ->take(50)
        ->get();

    return Inertia::render('wisata-bahari', [
        'documents' => $documents,
    ]);
})->name('wisata-bahari');
Route::redirect('/mfy', '/pelabuhan');

Route::get('/buletin', function () {
    $documents = Document::where('category', 'buletin')
        ->where('file_type', 'pdf')
        ->orderByDesc('forecast_date')
        ->latest('id')
        ->get();

    return Inertia::render('buletin', [
        'documents' => $documents,
    ]);
})->name('buletin');

Route::get('/infografis-provinsi', function () {
    $coverDocuments = Document::where(function ($q) {
            $q->where('region_code', 'COVER_PROV')
              ->orWhere('title', 'LIKE', '%Sampul Prakiraan Cuaca Maritim Wilayah Provinsi%')
              ->orWhere('title', 'LIKE', '%Cover Prakiraan Cuaca Maritim Wilayah Provinsi%');
        })
        ->orderByDesc('forecast_date')
        ->latest('id')
        ->get();

    $documents = Document::where('category', 'infografis')
        ->where(function ($q) {
            $q->where('region_code', 'LIKE', 'P_AH%')
              ->orWhereBetween('region_number', [1, 18]);
        })
        ->where('file_type', 'png')
        ->orderByDesc('forecast_date')
        ->latest('id')
        ->get();

    if ($documents->isEmpty()) {
        $documents = Document::where('category', 'infografis')
            ->where('file_type', 'png')
            ->latest('id')
            ->get();
    }

    return Inertia::render('infografis-provinsi', [
        'documents' => $documents,
        'coverDocuments' => $coverDocuments,
        'coverDocument' => $coverDocuments->first(),
    ]);
})->name('infografis-provinsi');
Route::redirect('/infografis/provinsi', '/infografis-provinsi');
Route::redirect('/infografis-perairan', '/infografis-provinsi');

Route::get('/infografis-pelabuhan', function () {
    $coverDocuments = Document::where(function ($q) {
            $q->where('region_code', 'COVER_PEL')
              ->orWhere('title', 'LIKE', '%Sampul Prakiraan Cuaca Pelabuhan%')
              ->orWhere('title', 'LIKE', '%Cover Prakiraan Cuaca Pelabuhan%');
        })
        ->orderByDesc('forecast_date')
        ->latest('id')
        ->get();

    $documents = Document::where('category', 'infografis')
        ->where(function ($q) {
            $q->where('region_code', 'LIKE', 'AH%')
              ->where('region_code', 'NOT LIKE', 'P_AH%');
        })
        ->where('file_type', 'png')
        ->orderByDesc('forecast_date')
        ->latest('id')
        ->get();

    if ($documents->isEmpty()) {
        $documents = Document::where('category', 'infografis')
            ->where('file_type', 'png')
            ->latest('id')
            ->get();
    }

    return Inertia::render('infografis-pelabuhan', [
        'documents' => $documents,
        'coverDocuments' => $coverDocuments,
        'coverDocument' => $coverDocuments->first(),
    ]);
})->name('infografis-pelabuhan');
Route::redirect('/infografis/pelabuhan', '/infografis-pelabuhan');

Route::redirect('/infografis', '/infografis-provinsi')->name('infografis');

Route::inertia('/cuaca-maluku', 'cuaca-maluku')->name('cuaca-maluku');
Route::redirect('/cuaca-kota', '/cuaca-maluku');

Route::inertia('/galeri', 'galeri')->name('galeri');
Route::redirect('/galeri-foto', '/galeri');

Route::inertia('/berita', 'berita')->name('berita');
Route::redirect('/siaran-pers', '/berita');

Route::redirect('/login', '/panel-stamar/login');
Route::redirect('/forgot-password', '/panel-stamar/forgot-password');
Route::redirect('/admin', '/admin/documents');
Route::redirect('/dashboard', '/admin/documents');

// Google SSO Authentication
Route::get('/panel-stamar/auth/google', [GoogleAuthController::class, 'redirect'])->name('auth.google.redirect');
Route::get('/panel-stamar/auth/google/callback', [GoogleAuthController::class, 'callback'])->name('auth.google.callback');

require __DIR__.'/settings.php';

Route::middleware(['auth', 'verified'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/documents', [DocumentController::class, 'index'])->name('documents.index');
    Route::post('/documents', [DocumentController::class, 'store'])->name('documents.store');
    Route::post('/documents/batch-delete', [DocumentController::class, 'destroyBatch'])->name('documents.destroy-batch');
    Route::post('/documents/clear-category', [DocumentController::class, 'destroyByCategory'])->name('documents.clear-category');
    Route::delete('/documents/{document}', [DocumentController::class, 'destroy'])->name('documents.destroy');
});
