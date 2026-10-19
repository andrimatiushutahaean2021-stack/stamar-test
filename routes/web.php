<?php

use App\Http\Controllers\Admin\DocumentController;
use App\Models\Document;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    $warningDocs = Document::where('category', 'peringatan-dini')
        ->where('file_type', 'png')
        ->latest()
        ->take(5)
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
        ->latest()
        ->take(3)
        ->get();

    // Ambil 1 infografis provinsi dan 1 infografis pelabuhan terbaru
    $latestInfografisProv = Document::where('category', 'infografis')
        ->where('file_type', 'png')
        ->where(function ($q) {
            $q->where('region_code', 'LIKE', 'P_AH%')
              ->orWhereBetween('region_number', [1, 18]);
        })
        ->orderByDesc('forecast_date')
        ->latest('id')
        ->first();

    $latestInfografisPel = Document::where('category', 'infografis')
        ->where('file_type', 'png')
        ->where(function ($q) {
            $q->where('region_code', 'LIKE', 'AH%')
              ->where('region_code', 'NOT LIKE', 'P_AH%');
        })
        ->orderByDesc('forecast_date')
        ->latest('id')
        ->first();

    $latestInfografisDocs = collect([$latestInfografisProv, $latestInfografisPel])->filter()->values();
    if ($latestInfografisDocs->isEmpty()) {
        $latestInfografisDocs = Document::where('category', 'infografis')
            ->where('file_type', 'png')
            ->latest('id')
            ->take(4)
            ->get();
    }

    $recentDocs = Document::latest()->take(6)->get();

    return Inertia::render('welcome', [
        'warningDocs' => $warningDocs,
        'latestProvinsiDocs' => $latestProvinsiDocs,
        'latestPelabuhanDocs' => $latestPelabuhanDocs,
        'latestBuletinDocs' => $latestBuletinDocs,
        'latestInfografisDocs' => $latestInfografisDocs,
        'recentDocs' => $recentDocs,
    ]);
})->name('home');

Route::get('/pelabuhan', function () {
    $documents = Document::whereIn('category', ['pelabuhan', 'mfy'])
        ->where('file_type', 'pdf')
        ->orderByDesc('forecast_date')
        ->latest('id')
        ->get();

    return Inertia::render('pelabuhan', [
        'documents' => $documents,
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
    $documents = Document::where('category', 'provinsi')
        ->where('file_type', 'pdf')
        ->orderByDesc('forecast_date')
        ->latest('id')
        ->get();

    return Inertia::render('provinsi', [
        'documents' => $documents,
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
        ->latest()
        ->get();

    return Inertia::render('buletin', [
        'documents' => $documents,
    ]);
})->name('buletin');

Route::get('/infografis-provinsi', function () {
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
    ]);
})->name('infografis-provinsi');
Route::redirect('/infografis/provinsi', '/infografis-provinsi');
Route::redirect('/infografis-perairan', '/infografis-provinsi');

Route::get('/infografis-pelabuhan', function () {
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
Route::redirect('/admin', '/dashboard');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', function () {
        $recentDocuments = Document::latest()->take(8)->get();
        $totalDocuments = Document::count();
        $categoryCounts = [
            'infografis' => Document::where('category', 'infografis')->count(),
            'peringatan-dini' => Document::where('category', 'peringatan-dini')->count(),
            'provinsi' => Document::where('category', 'provinsi')->count(),
            'buletin' => Document::where('category', 'buletin')->count(),
            'pelabuhan' => Document::whereIn('category', ['pelabuhan', 'mfy'])->count(),
            'bahari' => Document::where('category', 'bahari')->count(),
        ];

        return Inertia::render('dashboard', [
            'recentDocuments' => $recentDocuments,
            'totalDocuments' => $totalDocuments,
            'categoryCounts' => $categoryCounts,
        ]);
    })->name('dashboard');
});

require __DIR__.'/settings.php';

Route::middleware(['auth', 'verified'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/documents', [DocumentController::class, 'index'])->name('documents.index');
    Route::post('/documents', [DocumentController::class, 'store'])->name('documents.store');
    Route::post('/documents/batch-delete', [DocumentController::class, 'destroyBatch'])->name('documents.destroy-batch');
    Route::post('/documents/clear-category', [DocumentController::class, 'destroyByCategory'])->name('documents.clear-category');
    Route::delete('/documents/{document}', [DocumentController::class, 'destroy'])->name('documents.destroy');
});
