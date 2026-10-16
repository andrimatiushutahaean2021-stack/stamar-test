<?php

use App\Http\Controllers\Admin\DocumentController;
use App\Models\Document;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    $warningDocs = Document::where('category', 'peringatan-dini')->latest()->take(5)->get();
    $recentDocs = Document::latest()->take(6)->get();

    return Inertia::render('welcome', [
        'warningDocs' => $warningDocs,
        'recentDocs' => $recentDocs,
    ]);
})->name('home');

Route::get('/pelabuhan', function () {
    $documents = Document::whereIn('category', ['pelabuhan', 'mfy'])
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
        ->orderByDesc('forecast_date')
        ->latest('id')
        ->get();

    return Inertia::render('provinsi', [
        'documents' => $documents,
    ]);
})->name('provinsi');

Route::inertia('/wisata-bahari', 'wisata-bahari')->name('wisata-bahari');
Route::redirect('/mfy', '/pelabuhan');

Route::get('/buletin', function () {
    $documents = Document::where('category', 'buletin')->latest()->get();

    return Inertia::render('buletin', [
        'documents' => $documents,
    ]);
})->name('buletin');

Route::redirect('/login', '/panel-stamar/login');
Route::redirect('/admin', '/dashboard');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', function () {
        $recentDocuments = Document::latest()->take(8)->get();
        $totalDocuments = Document::count();
        $categoryCounts = [
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
